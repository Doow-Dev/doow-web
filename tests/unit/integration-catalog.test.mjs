import assert from "node:assert/strict";
import fs from "node:fs";
import Module from "node:module";
import path from "node:path";
import { fileURLToPath } from "node:url";

import ts from "typescript";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, "..", "..");

function compileTypeScriptModule(mod, filename) {
  const source = fs.readFileSync(filename, "utf8");
  const output = ts.transpileModule(source, {
    compilerOptions: {
      esModuleInterop: true,
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2020,
    },
    fileName: filename,
  });
  mod._compile(output.outputText, filename);
}

const originalResolveFilename = Module._resolveFilename;

Module._resolveFilename = function resolveTypeScriptImports(request, parent, isMain, options) {
  if (request.startsWith("@/")) {
    const absolutePath = path.resolve(repoRoot, "src", request.slice(2));

    for (const candidate of [absolutePath, `${absolutePath}.ts`, `${absolutePath}.tsx`, `${absolutePath}.js`]) {
      if (fs.existsSync(candidate)) {
        return candidate;
      }
    }
  }

  if (request.startsWith(".") && parent?.filename) {
    const absolutePath = path.resolve(path.dirname(parent.filename), request);

    for (const candidate of [absolutePath, `${absolutePath}.ts`, `${absolutePath}.tsx`, `${absolutePath}.js`]) {
      if (fs.existsSync(candidate)) {
        return candidate;
      }
    }
  }

  return originalResolveFilename.call(this, request, parent, isMain, options);
};

Module._extensions[".ts"] = compileTypeScriptModule;
Module._extensions[".tsx"] = compileTypeScriptModule;

function loadTypeScriptModule(relativePath) {
  const filename = path.resolve(repoRoot, relativePath);
  const mod = new Module(filename);
  mod.filename = filename;
  mod.paths = Module._nodeModulePaths(path.dirname(filename));
  compileTypeScriptModule(mod, filename);

  return mod.exports;
}

async function runTest(name, callback) {
  try {
    await callback();
    console.log(`PASS ${name}`);
  } catch (error) {
    console.error(`FAIL ${name}`);
    throw error;
  }
}

const catalog = loadTypeScriptModule("src/lib/site/integration-catalog.ts");
const adapters = loadTypeScriptModule("src/lib/site/integration-catalog-adapters.ts");

const categoriesRaw = {
  data: [
    { category: "Accounting & Bookkeeping", count: 7 },
    { category: "IDENTITY_PROVIDER", count: 3 },
    { category: "HR, People & Payroll", count: 18 },
  ],
  total: 3,
};

const catalogRaw = {
  data: [
    {
      id: "integration-quickbooks",
      name: "QuickBooks",
      category: "Accounting & Bookkeeping",
      logo_url: "https://assets.example.test/quickbooks.svg",
      description: "Accounting software",
      website_url: "https://quickbooks.intuit.com",
      metered_vendor_id: "quickbooks",
    },
    {
      id: "integration-okta",
      name: "Okta",
      category: "IDENTITY_PROVIDER",
      logo_url: "https://assets.example.test/okta.svg",
      description: null,
      website_url: "https://www.okta.com/",
      metered_vendor_id: null,
    },
  ],
  nextCursor: null,
  skip: 0,
  take: 2,
  total: 2,
};

await runTest("integration catalog adapter maps backend categories and catalog response", async () => {
  const categories = adapters.transformIntegrationCatalogCategories(categoriesRaw);
  const response = adapters.transformIntegrationCatalogResponse({
    catalogRaw,
    categories,
    options: {
      categoryId: "accounting-and-bookkeeping",
      query: "quick",
    },
  });

  assert.equal(categories[0].id, "all");
  assert.equal(categories[0].count, 28);
  assert.equal(categories[1].id, "accounting-and-bookkeeping");
  assert.equal(categories[1].backendLabel, "Accounting & Bookkeeping");
  assert.equal(categories[1].label, "Accounting & Bookkeeping");
  assert.equal(categories[2].id, "identity-provider");
  assert.equal(categories[2].backendLabel, "IDENTITY_PROVIDER");
  assert.equal(categories[2].label, "Identity Provider");
  assert.equal(categories[3].id, "hr-people-and-payroll");
  assert.equal(categories[3].label, "HR, People & Payroll");
  assert.equal(adapters.getIntegrationCatalogCategoryLabel(categories, "identity-provider"), "IDENTITY_PROVIDER");
  assert.equal(response.selectedCategoryId, "accounting-and-bookkeeping");
  assert.equal(response.query, "quick");
  assert.equal(response.totalCount, 2);
  assert.equal(response.items[0].categoryId, "accounting-and-bookkeeping");
  assert.equal(response.items[0].categoryLabel, "Accounting & Bookkeeping");
  assert.equal(response.items[0].logoUrl, "https://assets.example.test/quickbooks.svg");
  assert.equal(response.items[0].websiteUrl, "https://quickbooks.intuit.com");
  assert.equal(response.items[0].meteredVendorId, "quickbooks");
  assert.equal(response.items[1].description, "Connect Okta with Doow to keep your systems in sync.");
  assert.doesNotThrow(() => catalog.integrationCatalogResponseSchema.parse(response));
});

await runTest("integration catalog URL keeps the public route params stable", async () => {
  const url = catalog.getIntegrationCatalogApiUrl({
    categoryId: "accounting-and-bookkeeping",
    query: "quickbooks",
  });

  assert.equal(url, "/api/site/integration-catalog?categoryId=accounting-and-bookkeeping&query=quickbooks");
});
