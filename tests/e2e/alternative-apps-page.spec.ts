import { expect, test, type Page } from "@playwright/test";

const viewports = [
  { name: "mobile-360", width: 360, height: 800 },
  { name: "mobile-390", width: 390, height: 844 },
  { name: "tablet-768", width: 768, height: 1024 },
  { name: "desktop-1024", width: 1024, height: 900 },
  { name: "desktop-1280", width: 1280, height: 960 },
  { name: "desktop-1440", width: 1440, height: 1024 },
] as const;
const detailsAppId = "a4571cad-ae9b-4a72-a9a2-eba8597600b2";
const detailsAppPath = `/alternative-apps/${detailsAppId}`;
const detailsAppName = "Asana";
const detailsAlternativeCount = 6;

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

  test.describe(`alternative app details page @ ${viewport.name}`, () => {
    test.use({ viewport: { width: viewport.width, height: viewport.height } });

    test("uses the expanded detail shell without document overflow", async ({ page }) => {
      await page.goto(detailsAppPath);

      const shell = page.locator(".alternative-app-details__shell");
      const shellWidth = await shell.evaluate((element) => element.getBoundingClientRect().width);

      await assertNoHorizontalOverflow(page);
      expect(Math.abs(shellWidth - viewport.width * 0.96)).toBeLessThanOrEqual(2);
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
    await page.goto(detailsAppPath);

    await assertNoHorizontalOverflow(page);

    const details = page.locator(".alternative-app-details");

    await expect(page.getByRole("heading", { level: 1, name: `${detailsAppName} Alternatives` })).toBeVisible();
    await expect(page.getByRole("heading", { level: 2, name: `Should you replace ${detailsAppName}?` })).toBeVisible();
    await expect(page.getByLabel("Breadcrumb").getByRole("link", { name: "Applications" })).toHaveAttribute(
      "href",
      "/alternative-apps",
    );
    await expect(page.getByRole("heading", { level: 3, name: `${detailsAppName} alternatives`, exact: true })).toBeVisible();
    await expect(details.getByRole("button", { name: "View full details" })).toBeVisible();
    await expect(details.locator(".alternative-app-details-alternative-card")).toHaveCount(detailsAlternativeCount);

    await details.getByRole("button", { name: "View full details" }).click();

    await expect(details.getByRole("button", { name: "Close full details" })).toHaveCount(0);
    await expect(page.getByText("Financial Impact")).toBeVisible();
    await expect(page.getByText("Team Fit & Adoption")).toBeVisible();
    await expect(page.getByText("Migration & Implementation")).toBeVisible();
    await expect(page.getByText("Integrations & Technical Fit")).toBeVisible();
    await expect(page.getByText("Security & Compliance")).toBeVisible();
    await expect(page.getByText("When This Makes Sense")).toBeVisible();
    await expect(page.getByText(`Showing 2 of ${detailsAlternativeCount}`)).toBeVisible();
    await expect(page.getByText("SOC 2 Type II").first()).toBeVisible();
    await expect(page.getByRole("heading", { level: 2, name: "Your Questions, Answered" })).toHaveCount(0);
    await expect(page.locator('[data-layout-shell="siteFooterPromoShell"]')).toBeVisible();
    await expect(page.locator('[data-layout-shell="siteFooterBodyShell"]')).toBeVisible();
    await expect(details).toBeVisible();
  });

  test("updates comparison rows when scrolling to the next alternative", async ({ page }) => {
    await page.goto(detailsAppPath);

    const details = page.locator(".alternative-app-details");
    const comparison = details.locator(".alternative-app-details__comparison");
    const alternativesScroll = details.locator(".alternative-app-details__alternatives-scroll");
    await details.getByRole("button", { name: "View full details" }).click();

    await expect(details.getByText("-$2,856")).toBeVisible();
    await alternativesScroll.evaluate((element) => {
      const cards = Array.from(element.querySelectorAll<HTMLElement>(".alternative-app-details-alternative-card"));
      const firstCard = cards[0];
      const nextCard = cards[1];

      if (!firstCard || !nextCard) {
        throw new Error("Expected at least two alternative cards.");
      }

      element.scrollTo({ behavior: "auto", left: nextCard.offsetLeft - firstCard.offsetLeft });
    });
    await expect(comparison).toHaveAttribute(
      "data-selected-alternatives",
      /3b26f33a-1a79-44ed-9543-bec3b223a9d2,57eaa86a-a503-4cca-80ac-9550c3107232/,
    );
    await expect(details.getByText("-$11,883")).toBeVisible();
    await expect(details.getByText("-$2,856")).not.toBeVisible();

    await details.getByRole("button", { exact: true, name: "Annual" }).click();
    await details.getByRole("option", { name: "Monthly" }).click();
    await expect(details.getByText("$8", { exact: true })).toBeVisible();
  });

  test("updates comparison rows when scrolling the sticky alternative cards", async ({ page }) => {
    await page.goto(detailsAppPath);

    const details = page.locator(".alternative-app-details");
    const comparison = details.locator(".alternative-app-details__comparison");
    await details.getByRole("button", { name: "View full details" }).click();
    await page.evaluate(() => {
      const comparisonSection = document.querySelector<HTMLElement>(".alternative-app-details__comparison");

      if (!comparisonSection) {
        throw new Error("Expected comparison section to exist.");
      }

      window.scrollTo({ left: 0, top: comparisonSection.getBoundingClientRect().top + window.scrollY + 280 });
    });

    const stickyAlternatives = details.locator(".alternative-app-details__sticky-compact-alternatives");
    await expect(stickyAlternatives).toBeVisible();
    await expect(stickyAlternatives.locator(".alternative-app-details-compact-card")).toHaveCount(detailsAlternativeCount);

    await stickyAlternatives.evaluate((element) => {
      const cards = Array.from(element.querySelectorAll<HTMLElement>(".alternative-app-details-compact-card"));
      const firstCard = cards[0];
      const nextCard = cards[1];

      if (!firstCard || !nextCard) {
        throw new Error("Expected at least two sticky alternative cards.");
      }

      element.scrollTo({ behavior: "auto", left: nextCard.offsetLeft - firstCard.offsetLeft });
    });

    await expect(comparison).toHaveAttribute(
      "data-selected-alternatives",
      /3b26f33a-1a79-44ed-9543-bec3b223a9d2,57eaa86a-a503-4cca-80ac-9550c3107232/,
    );
    await expect(details.getByText("-$11,883")).toBeVisible();
  });

  test("keeps two compared alternatives while the card rail shows every alternative", async ({ page }) => {
    await page.goto(detailsAppPath);

    const details = page.locator(".alternative-app-details");
    const railCards = details.locator(".alternative-app-details-alternative-card");
    const comparison = details.locator(".alternative-app-details__comparison");

    await expect(railCards).toHaveCount(detailsAlternativeCount);
    await expect(details.locator('.alternative-app-details-alternative-card[aria-pressed="true"]')).toHaveCount(2);

    await details.getByRole("button", { name: "View full details" }).click();
    const initialSelection = await comparison.getAttribute("data-selected-alternatives");
    const initialSlugs = initialSelection?.split(",") ?? [];
    expect(initialSlugs).toHaveLength(2);

    await details.locator('.alternative-app-details-alternative-card[aria-pressed="false"]').first().click();
    await expect(details.locator('.alternative-app-details-alternative-card[aria-pressed="true"]')).toHaveCount(2);

    const nextSelection = await comparison.getAttribute("data-selected-alternatives");
    const nextSlugs = nextSelection?.split(",") ?? [];
    expect(nextSlugs).toHaveLength(2);
    expect(nextSlugs).not.toContain(initialSlugs[0]);
    expect(nextSlugs.join(",")).not.toBe(initialSlugs.join(","));
  });

  test("updates selected comparison when reduced motion is requested", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto(detailsAppPath);

    const details = page.locator(".alternative-app-details");

    await details.getByRole("button", { name: "View full details" }).click();
    await details.locator('.alternative-app-details-alternative-card[aria-pressed="false"]').first().click();

    await expect(details.locator('.alternative-app-details-alternative-card[aria-pressed="true"]')).toHaveCount(2);
    await expect(details.locator(".alternative-app-details__comparison")).toHaveAttribute(
      "data-selected-alternatives",
      /,/,
    );
  });
});
