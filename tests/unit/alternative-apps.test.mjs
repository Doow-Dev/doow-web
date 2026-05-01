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

const catalog = loadTypeScriptModule("src/lib/site/alternative-apps-catalog.ts");
const details = loadTypeScriptModule("src/lib/site/alternative-app-details.ts");
const adapters = loadTypeScriptModule("src/lib/site/alternative-apps-adapters.ts");
const textHelpers = loadTypeScriptModule("src/lib/text/cap-characters.ts");

const categoriesRaw = {
  data: [
    { category: "Project Management", count: 2 },
    { category: "CRM", count: 1 },
  ],
  total: 3,
};

const catalogRaw = {
  data: [
    {
      id: "source-jira",
      name: "Jira",
      logo_url: "https://assets.example.test/jira.png",
      category: "Project Management",
      description: "Issue tracker and project management tool",
      alternatives: [
        {
          id: "row-linear",
          alt_app_id: "alt-linear",
          alt_name: "Linear",
          alt_logo_url: "https://assets.example.test/linear.png",
          category: "Project Management",
        },
        {
          id: "row-asana",
          alt_app_id: "alt-asana",
          alt_name: "Asana",
          alt_logo_url: "https://assets.example.test/asana.png",
          category: "Project Management",
        },
      ],
    },
  ],
  nextCursor: "source-jira",
  skip: 0,
  take: 72,
  total: 20257,
};

const heroRaw = {
  data: [
    {
      top_recommendation: {
        alt_app_id: "alt-linear",
        alt_name: "Linear",
      },
      summary: "Linear is the strongest catalog alternative to evaluate for Jira.",
      currentApp: {
        name: "Jira",
        logoUrl: "https://assets.example.test/jira.png",
        rating: 4.3,
        licenseType: "SEAT",
        subscriptionType: "PAYG",
        monthlyCost: 15,
        annualCost: 180,
        pricingTiers: [
          {
            tier_name: "Standard",
            monthly_per_seat: 15,
            annual_total: 180,
          },
        ],
        teamFitScore: 80,
        teamFitNarrative: "Jira is strong for complex teams.",
        adoptionRisk: "low",
        reviewCount: 1200,
        integrationCount: 200,
        integrationCoveragePct: 95,
        integrationCoverageCopy: "Supports 200 native integrations.",
        featureOverlapPct: 100,
        certifications: ["SOC 2 Type II"],
      },
      alternatives: [
        {
          alt_app_id: "alt-linear",
          altName: "Linear",
          altLogoUrl: "https://assets.example.test/linear.png",
          rating: 4.6,
          estMonthlyCost: 10,
          estAnnualCost: 120,
          insight: {
            badgeLabel: "Best Fit",
          },
          financialImpact: {
            threeYearNetSaving: 80,
            migrationCostUsd: 100,
            migrationWeeks: 2,
            integrationCount: 100,
            teamFitScore: 85,
            chooseIf: "You prefer a cleaner UX",
            avoidIf: "You need deep Jira integrations",
            pricingTiers: [
              {
                tier_name: "Basic",
                monthly_per_seat: 10,
                annual_total: 120,
              },
            ],
          },
          teamFitNarrative: "A focused project management tool for engineering workflows.",
          adoptionRisk: "low",
          reviewCount: 240,
          migrationComplexity: "low",
          migrationNarrative: "Linear is a low-complexity migration.",
          integrationCoveragePct: 50,
          integrationCoverageCopy: "Supports 100 native integrations.",
          featureOverlapPct: 80,
          certifications: ["SOC 2 Type II"],
          featureRiskBullets: ["No time tracking"],
        },
      ],
      meta: {
        totalAlternatives: 1,
      },
    },
  ],
  nextCursor: null,
  take: 1,
  total: 1,
};

await runTest("alternative apps catalog adapter maps backend catalog response", async () => {
  const response = adapters.transformAlternativeAppsCatalogResponse({
    catalogRaw,
    categoriesRaw,
    options: {
      categoryId: "Project Management",
      query: "jira",
      take: 72,
    },
  });

  assert.equal(response.selectedCategoryId, "Project Management");
  assert.equal(response.query, "jira");
  assert.equal(response.take, 72);
  assert.equal(response.nextCursor, "source-jira");
  assert.equal(response.hasMore, true);
  assert.equal(response.totalCount, 20257);
  assert.equal(response.categories[0].id, "all");
  assert.equal(response.categories[0].count, 3);
  assert.equal(response.items[0].id, "source-jira");
  assert.equal(response.items[0].href, "/alternative-apps/source-jira");
  assert.equal(response.items[0].alternativeCount, 2);
  assert.equal(response.items[0].alternativePreviewLogos[0].id, "alt-linear");
  assert.equal(response.items[0].logoUrl, "https://assets.example.test/jira.png");
  assert.doesNotThrow(() => catalog.alternativeAppsCatalogResponseSchema.parse(response));
});

await runTest("alternative apps catalog URL keeps local route params stable", async () => {
  const url = catalog.getAlternativeAppsCatalogApiUrl({
    categoryId: "Project Management",
    cursor: "source-jira",
    query: "linear",
    take: 72,
  });

  assert.equal(
    url,
    "/api/site/alternative-apps/catalog?categoryId=Project+Management&query=linear&cursor=source-jira&take=72",
  );
});

await runTest("character capping helper preserves max display length", async () => {
  const capped = textHelpers.capCharacters("Communication Platform As A Service", 20);
  const uncapped = textHelpers.capCharacters("Finance", 20);

  assert.equal(capped.isCapped, true);
  assert.equal(capped.text.length, 20);
  assert.equal(capped.text, "Communication Pla...");
  assert.equal(uncapped.isCapped, false);
  assert.equal(uncapped.text, "Finance");
});

await runTest("alternative app details adapter maps backend hero response", async () => {
  const response = adapters.transformAlternativeAppDetailResponse(heroRaw, "source-jira");

  assert(response);
  assert.equal(response.app.name, "Jira");
  assert.equal(response.app.slug, "source-jira");
  assert.equal(response.catalogMode, "public");
  assert.equal(response.currentAppMetrics.annualSpendUsd, 180);
  assert.equal(response.currentAppMetrics.seatsAssignedLabel, "$180/yr");
  assert.equal(response.selectedAlternativeSlug, "alt-linear");
  assert.equal(response.alternatives[0].slug, "alt-linear");
  assert.equal(response.alternatives[0].badgeLabel, "Best Fit");
  assert(response.alternatives[0].comparisonSections.some((section) => section.title === "Financial Impact"));
  assert(response.comparisonSections.some((section) => section.title === "When This Makes Sense"));
  assert.doesNotThrow(() => details.alternativeAppDetailResponseSchema.parse(response));
});

await runTest("alternative app details adapter returns null for empty hero responses", async () => {
  const response = adapters.transformAlternativeAppDetailResponse({ data: [] }, "missing-source");

  assert.equal(response, null);
});
