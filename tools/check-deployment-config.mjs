import fs from "node:fs/promises";
import path from "node:path";
import process from "node:process";

const repoRoot = process.cwd();

const expectedVercelProjects = [
  {
    app: "@doow/web",
    buildCommand: "cd ../.. && pnpm --filter @doow/web build",
    domain: "www.doow.co",
    envExample: "apps/web/.env.example",
    envVars: ["NEXT_PUBLIC_SITE_URL", "NEXT_PUBLIC_BLOB_BASE_URL", "NEXT_PUBLIC_DOOW_APP_BASE_URL"],
    installCommand: "cd ../.. && pnpm install --frozen-lockfile",
    rootDirectory: "apps/web",
    vercelConfig: "apps/web/vercel.json",
  },
  {
    app: "@doow/docs",
    buildCommand: "cd ../.. && pnpm --filter @doow/docs build",
    domain: "docs.doow.co",
    envExample: "apps/docs/.env.example",
    envVars: ["NEXT_PUBLIC_DOCS_SITE_URL"],
    installCommand: "cd ../.. && pnpm install --frozen-lockfile",
    rootDirectory: "apps/docs",
    vercelConfig: "apps/docs/vercel.json",
  },
];

async function readText(filePath) {
  return fs.readFile(path.join(repoRoot, filePath), "utf8");
}

async function readJson(filePath) {
  return JSON.parse(await readText(filePath));
}

function requireIncludes(errors, label, value, expected) {
  if (!value.includes(expected)) {
    errors.push(`${label} must include ${expected}`);
  }
}

const errors = [];

for (const project of expectedVercelProjects) {
  const config = await readJson(project.vercelConfig);
  const envExample = await readText(project.envExample);

  if (config.framework !== "nextjs") {
    errors.push(`${project.vercelConfig} must set framework to nextjs`);
  }

  if (config.installCommand !== project.installCommand) {
    errors.push(`${project.vercelConfig} installCommand must be "${project.installCommand}"`);
  }

  if (config.buildCommand !== project.buildCommand) {
    errors.push(`${project.vercelConfig} buildCommand must be "${project.buildCommand}"`);
  }

  for (const envVar of project.envVars) {
    requireIncludes(errors, project.envExample, envExample, `${envVar}=`);
  }
}

const webLayout = await readText("apps/web/src/app/layout.tsx");
const webBlogConfig = await readText("apps/web/src/lib/blog/config.ts");
const docsLayout = await readText("apps/docs/src/app/layout.tsx");
const docsConfig = await readText("apps/docs/next.config.ts");

requireIncludes(errors, "web root metadata", webLayout, "NEXT_PUBLIC_SITE_URL");
requireIncludes(errors, "web blog canonical config", webBlogConfig, "NEXT_PUBLIC_SITE_URL");
requireIncludes(errors, "docs root metadata", docsLayout, "NEXT_PUBLIC_DOCS_SITE_URL");
requireIncludes(errors, "docs deployment config", docsConfig, "NEXT_PUBLIC_DOCS_SITE_URL");

if (errors.length > 0) {
  console.error("Deployment config check failed:");
  for (const error of errors) {
    console.error(`- ${error}`);
  }
  process.exitCode = 1;
} else {
  console.log(`Deployment config check passed for ${expectedVercelProjects.length} Vercel projects.`);
}
