import fs from "node:fs/promises";
import { builtinModules } from "node:module";
import path from "node:path";
import process from "node:process";

const repoRoot = process.cwd();
const workspaceRoots = ["apps", "packages"];
const sourceExtensions = new Set([".cjs", ".cts", ".js", ".jsx", ".mjs", ".mts", ".ts", ".tsx"]);
const ignoredDirectoryNames = new Set([
  ".next",
  ".turbo",
  "build",
  "coverage",
  "dist",
  "node_modules",
  "out",
  "public",
  "test-results",
]);
const builtins = new Set([...builtinModules, ...builtinModules.map((moduleName) => `node:${moduleName}`)]);

function toPosix(value) {
  return value.split(path.sep).join("/");
}

function readJson(filePath) {
  return fs.readFile(filePath, "utf8").then((value) => JSON.parse(value));
}

async function pathExists(filePath) {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function findWorkspacePackages() {
  const packages = [];

  for (const root of workspaceRoots) {
    const rootPath = path.join(repoRoot, root);

    if (!(await pathExists(rootPath))) {
      continue;
    }

    const entries = await fs.readdir(rootPath, { withFileTypes: true });

    for (const entry of entries) {
      if (!entry.isDirectory()) {
        continue;
      }

      const dir = path.join(rootPath, entry.name);
      const packageJsonPath = path.join(dir, "package.json");

      if (!(await pathExists(packageJsonPath))) {
        continue;
      }

      const packageJson = await readJson(packageJsonPath);

      packages.push({
        dir,
        isApp: root === "apps",
        isPackage: root === "packages",
        name: packageJson.name,
        packageJson,
        relDir: toPosix(path.relative(repoRoot, dir)),
      });
    }
  }

  return packages.sort((a, b) => a.relDir.localeCompare(b.relDir));
}

async function listSourceFiles(dir) {
  const files = [];

  async function walk(current) {
    const entries = await fs.readdir(current, { withFileTypes: true });

    for (const entry of entries) {
      const next = path.join(current, entry.name);

      if (entry.isDirectory()) {
        if (!ignoredDirectoryNames.has(entry.name)) {
          await walk(next);
        }

        continue;
      }

      if (entry.isFile() && sourceExtensions.has(path.extname(entry.name))) {
        files.push(next);
      }
    }
  }

  await walk(dir);

  return files.sort();
}

function stripComments(source) {
  return source
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/(^|[^:])\/\/.*$/gm, "$1");
}

function collectImportSpecifiers(source) {
  const stripped = stripComments(source);
  const specifiers = new Set();
  const patterns = [
    /\bimport\s+(?:type\s+)?(?:[^'"]*?\s+from\s+)?["']([^"']+)["']/g,
    /\bexport\s+(?:type\s+)?[^'"]*?\s+from\s+["']([^"']+)["']/g,
    /\bimport\s*\(\s*["']([^"']+)["']\s*\)/g,
    /\brequire\s*\(\s*["']([^"']+)["']\s*\)/g,
  ];

  for (const pattern of patterns) {
    for (const match of stripped.matchAll(pattern)) {
      specifiers.add(match[1]);
    }
  }

  return Array.from(specifiers).sort();
}

function getExternalPackageName(specifier) {
  if (specifier.startsWith("@/") || specifier.startsWith(".") || specifier.startsWith("/") || builtins.has(specifier)) {
    return null;
  }

  if (specifier.startsWith("@")) {
    const [scope, name] = specifier.split("/");
    return name ? `${scope}/${name}` : specifier;
  }

  return specifier.split("/")[0];
}

function declaredDependencies(packageJson) {
  return new Set([
    ...Object.keys(packageJson.dependencies ?? {}),
    ...Object.keys(packageJson.devDependencies ?? {}),
    ...Object.keys(packageJson.peerDependencies ?? {}),
    ...Object.keys(packageJson.optionalDependencies ?? {}),
  ]);
}

function containingWorkspace(filePath, packages) {
  const normalized = path.resolve(filePath);

  return packages
    .filter((workspace) => normalized === workspace.dir || normalized.startsWith(`${workspace.dir}${path.sep}`))
    .sort((a, b) => b.dir.length - a.dir.length)[0] ?? null;
}

function resolveRelativeImport(fromFile, specifier) {
  if (!specifier.startsWith(".")) {
    return null;
  }

  return path.resolve(path.dirname(fromFile), specifier);
}

function addEdge(graph, from, to) {
  if (!graph.has(from)) {
    graph.set(from, new Set());
  }

  graph.get(from).add(to);
}

function detectCycles(graph) {
  const cycles = [];
  const visiting = new Set();
  const visited = new Set();
  const stack = [];

  function visit(node) {
    if (visiting.has(node)) {
      const start = stack.indexOf(node);
      cycles.push([...stack.slice(start), node]);
      return;
    }

    if (visited.has(node)) {
      return;
    }

    visiting.add(node);
    stack.push(node);

    for (const next of graph.get(node) ?? []) {
      visit(next);
    }

    stack.pop();
    visiting.delete(node);
    visited.add(node);
  }

  for (const node of graph.keys()) {
    visit(node);
  }

  return cycles;
}

function formatLocation(filePath) {
  return toPosix(path.relative(repoRoot, filePath));
}

async function main() {
  const workspaces = await findWorkspacePackages();
  const byName = new Map(workspaces.map((workspace) => [workspace.name, workspace]));
  const errors = [];
  const graph = new Map(workspaces.map((workspace) => [workspace.name, new Set()]));

  for (const workspace of workspaces) {
    const dependencies = declaredDependencies(workspace.packageJson);
    const files = await listSourceFiles(workspace.dir);

    for (const file of files) {
      const source = await fs.readFile(file, "utf8");

      for (const specifier of collectImportSpecifiers(source)) {
        const externalPackage = getExternalPackageName(specifier);
        const relativeTarget = resolveRelativeImport(file, specifier);
        const targetWorkspace = externalPackage
          ? byName.get(externalPackage)
          : relativeTarget
            ? containingWorkspace(relativeTarget, workspaces)
            : null;

        if (externalPackage && !dependencies.has(externalPackage) && externalPackage !== workspace.name) {
          errors.push(`${formatLocation(file)} imports undeclared dependency "${externalPackage}"`);
        }

        if (targetWorkspace && targetWorkspace.name !== workspace.name) {
          addEdge(graph, workspace.name, targetWorkspace.name);

          if (workspace.isPackage && targetWorkspace.isApp) {
            errors.push(`${formatLocation(file)} imports app workspace "${targetWorkspace.name}" from package "${workspace.name}"`);
          }

          if (workspace.name === "@doow/web" && targetWorkspace.name === "@doow/docs") {
            errors.push(`${formatLocation(file)} imports @doow/docs from @doow/web`);
          }

          if (workspace.name === "@doow/docs" && targetWorkspace.name === "@doow/web") {
            errors.push(`${formatLocation(file)} imports @doow/web from @doow/docs`);
          }

          if (specifier.startsWith(".")) {
            errors.push(`${formatLocation(file)} reaches across workspace boundary with "${specifier}"`);
          }
        }
      }
    }
  }

  for (const cycle of detectCycles(graph)) {
    errors.push(`circular workspace dependency: ${cycle.join(" -> ")}`);
  }

  if (errors.length > 0) {
    console.error("Boundary check failed:");
    for (const error of errors) {
      console.error(`- ${error}`);
    }
    process.exitCode = 1;
    return;
  }

  console.log(`Boundary check passed for ${workspaces.length} workspaces.`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
