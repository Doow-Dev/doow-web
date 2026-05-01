import { expect, test, type Page } from "@playwright/test";

const viewports = [
  { name: "mobile-360", width: 360, height: 800 },
  { name: "mobile-390", width: 390, height: 844 },
  { name: "tablet-768", width: 768, height: 1024 },
  { name: "desktop-1024", width: 1024, height: 900 },
  { name: "desktop-1280", width: 1280, height: 960 },
  { name: "desktop-1440", width: 1440, height: 1024 },
] as const;

async function assertNoHorizontalOverflow(page: Page) {
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
  expect(overflow).toBeLessThanOrEqual(1);
}

for (const viewport of viewports) {
  test.describe(`alternative apps page @ ${viewport.name}`, () => {
    test.use({ viewport: { width: viewport.width, height: viewport.height } });

    test("renders the hero and catalog without horizontal overflow", async ({ page }) => {
      await page.goto("/alternative-apps");

      const section = page.locator("#alternative-apps-hero");
      const catalog = page.locator(".alternative-apps-catalog");

      await assertNoHorizontalOverflow(page);
      await expect(section.getByText("ALTERNATIVE APPLICATIONS")).toBeVisible();
      await expect(
        section.getByRole("heading", { level: 1, name: "Explore alternatives to your current stack" }),
      ).toBeVisible();
      await expect(section.getByText("Know the right tool for your team")).toBeVisible();
      await expect(catalog.getByRole("heading", { level: 2, name: "Browse Applications" })).toBeVisible();
      await expect(catalog.getByRole("searchbox", { name: "Search applications" })).toBeVisible();
      await expect(page.getByRole("heading", { level: 2, name: "Your Questions, Answered" })).toHaveCount(0);
      await expect(catalog.getByRole("link", { name: /Asana, Product Management/ })).toHaveAttribute(
        "href",
        "/alternative-apps/asana",
      );

      if (viewport.width >= 1280) {
        await expect(catalog.getByRole("button", { name: /All Categories/ })).toBeVisible();
        await expect(catalog.getByRole("button", { name: /Product Management/ })).toBeVisible();
      } else {
        await expect(catalog.getByLabel("Select application category")).toBeVisible();
      }

      const cards = catalog.locator(".alternative-apps-catalog-card");
      const cardCount = await cards.count();
      expect(cardCount).toBeGreaterThan(0);

      const cardLayout = await cards.evaluateAll((items) =>
        items.map((item) => {
          const rect = item.getBoundingClientRect();

          return {
            left: rect.left,
            right: rect.right,
          };
        }),
      );

      for (const card of cardLayout) {
        expect(card.left).toBeGreaterThanOrEqual(-1);
        expect(card.right).toBeLessThanOrEqual(viewport.width + 1);
      }
    });
  });
}

test.describe("alternative apps catalog interactions", () => {
  test.use({ viewport: { width: 1280, height: 960 } });

  test("filters through the REST-backed catalog search", async ({ page }) => {
    await page.goto("/alternative-apps");

    const catalog = page.locator(".alternative-apps-catalog");
    const search = catalog.getByRole("searchbox", { name: "Search applications" });

    await expect(catalog).toHaveAttribute("data-alternative-apps-catalog-hydrated", "true");
    await expect(catalog.getByRole("link", { name: /Asana, Product Management/ })).toBeVisible();

    await search.fill("mattermost");
    await expect(catalog.getByRole("link", { name: /Slack, Team Communication/ })).toBeVisible({ timeout: 10000 });
    await expect(catalog.getByText("1 applications shown.")).toBeAttached();
    await expect(catalog.getByRole("link", { name: /Asana, Product Management/ })).not.toBeVisible();

    await search.fill("not-a-real-application");
    await expect(catalog.getByText("No applications found")).toBeVisible({ timeout: 10000 });
  });

  test("filters through the category panel", async ({ page }) => {
    await page.goto("/alternative-apps");

    const catalog = page.locator(".alternative-apps-catalog");

    await catalog.getByRole("button", { name: /Finance/ }).click();

    await expect(catalog.getByRole("link", { name: /QuickBooks, Finance/ })).toBeVisible({ timeout: 10000 });
    await expect(catalog.getByRole("link", { name: /Asana, Product Management/ })).not.toBeVisible();
    await expect(catalog.getByText("1 applications shown.")).toBeAttached();
  });
});

test.describe("alternative apps mobile catalog interactions", () => {
  test.use({ viewport: { width: 390, height: 844 } });

  test("filters through the mobile category select", async ({ page }) => {
    await page.goto("/alternative-apps");

    const catalog = page.locator(".alternative-apps-catalog");
    const categorySelect = catalog.getByLabel("Select application category");

    await expect(catalog).toHaveAttribute("data-alternative-apps-catalog-hydrated", "true");
    await categorySelect.selectOption("finance");

    await expect(catalog.getByText("1 applications shown.")).toBeAttached();
    await expect(catalog.getByRole("link", { name: /QuickBooks, Finance/ })).toBeVisible({ timeout: 10000 });
    await expect(catalog.getByRole("link", { name: /Asana, Product Management/ })).not.toBeVisible();
  });
});

test.describe("alternative app details page", () => {
  test.use({ viewport: { width: 1280, height: 960 } });

  test("renders the comparison section, promo, and footer without overflow", async ({ page }) => {
    await page.goto("/alternative-apps/linear");

    await assertNoHorizontalOverflow(page);

    const details = page.locator(".alternative-app-details");

    await expect(page.getByRole("heading", { level: 1, name: "Linear Alternatives" })).toBeVisible();
    await expect(page.getByRole("heading", { level: 2, name: "Should you replace Linear?" })).toBeVisible();
    await expect(page.getByLabel("Breadcrumb").getByRole("link", { name: "Applications" })).toHaveAttribute(
      "href",
      "/alternative-apps",
    );
    await expect(page.getByRole("heading", { level: 3, name: "Linear alternatives", exact: true })).toBeVisible();
    await expect(page.getByText("Financial Impact")).toBeVisible();
    await expect(page.getByText("Team Fit & Adoption")).toBeVisible();
    await expect(page.getByText("Migration & Implementation")).toBeVisible();
    await expect(page.getByText("Integrations & Technical Fit")).toBeVisible();
    await expect(page.getByText("Security & Compliance")).toBeVisible();
    await expect(page.getByText("When This Makes Sense")).toBeVisible();
    await expect(page.getByText("Showing 2 of 108")).toBeVisible();
    await expect(page.getByText("SOC 2 Type II").first()).toBeVisible();
    await expect(page.getByRole("heading", { level: 2, name: "Your Questions, Answered" })).toHaveCount(0);
    await expect(page.locator('[data-layout-shell="siteFooterPromoShell"]')).toBeVisible();
    await expect(page.locator('[data-layout-shell="siteFooterBodyShell"]')).toBeVisible();
    await expect(details).toBeVisible();
  });

  test("updates comparison rows when selecting another alternative", async ({ page }) => {
    await page.goto("/alternative-apps/linear");

    const details = page.locator(".alternative-app-details");

    await expect(details.getByText("+$62,598")).toBeVisible();
    await details.getByRole("button", { name: /Asana/ }).click();
    await expect(details.getByText("+$29,812")).toBeVisible();
    await expect(details.getByText("+$62,598")).not.toBeVisible();

    await details.getByLabel("Cost period").selectOption("monthly");
    await expect(details.getByText("$1,842")).toBeVisible();
  });
});
