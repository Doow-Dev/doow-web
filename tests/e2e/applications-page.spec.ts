import { expect, test, type Locator, type Page } from "@playwright/test";

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

async function assertContainerVariant(locator: Locator, variant: string) {
  await expect(locator).toHaveAttribute("data-layout-container", "true");
  await expect(locator).toHaveAttribute("data-layout-variant", variant);
}

for (const viewport of viewports) {
  test.describe(`applications page shell @ ${viewport.name}`, () => {
    test.use({ viewport: { width: viewport.width, height: viewport.height } });

    test("renders the shared navbar, page-owned promo, and shared footer body without overflow", async ({ page }) => {
      await page.goto("/applications");

      const pageShell = page.locator('[data-layout-shell="utilityPageShell"]');
      const headerShell = page.locator('[data-layout-shell="utilityHeaderShell"]');
      const faqShell = page.locator('[data-layout-shell="sitePageSectionShell"]');
      const footerPromoShell = page.locator('[data-layout-shell="siteFooterPromoShell"]');
      const footerBodyShell = page.locator('[data-layout-shell="siteFooterBodyShell"]');
      const navbarSurface = page.locator('[data-global-site-navbar-surface="true"]');

      await assertNoHorizontalOverflow(page);
      await expect(pageShell).toHaveCount(1);
      await expect(headerShell).toHaveCount(1);
      await expect(faqShell).toHaveCount(1);
      await expect(footerPromoShell).toHaveCount(1);
      await expect(footerBodyShell).toHaveCount(1);
      await assertContainerVariant(headerShell, "utilityShell");
      await assertContainerVariant(faqShell, "landing");
      await assertContainerVariant(footerPromoShell, "siteFooterPromo");
      await assertContainerVariant(footerBodyShell, "siteFooterBody");

      const beforeScroll = await navbarSurface.boundingBox();
      expect(beforeScroll).not.toBeNull();
      expect(beforeScroll!.y).toBeGreaterThanOrEqual(8);
      expect(beforeScroll!.y).toBeLessThanOrEqual(12);

      await page.evaluate(() => window.scrollTo(0, 900));
      await page.waitForTimeout(100);

      const afterScroll = await navbarSurface.boundingBox();
      expect(afterScroll).not.toBeNull();
      expect(afterScroll!.y).toBeGreaterThanOrEqual(8);
      expect(afterScroll!.y).toBeLessThanOrEqual(12);

      const footerOrder = await page.evaluate(() => {
        const promo = document.querySelector('[data-layout-shell="siteFooterPromoShell"]');
        const footer = document.querySelector('[data-layout-shell="siteFooterBodyShell"]');

        if (!(promo instanceof HTMLElement) || !(footer instanceof HTMLElement)) {
          throw new Error("Applications footer promo or footer body shell was not found.");
        }

        return promo.compareDocumentPosition(footer);
      });

      expect(footerOrder & 4).toBeTruthy();
    });
  });
}

test.describe("applications FAQ and footer content", () => {
  test.use({ viewport: { width: 1280, height: 960 } });

  test("renders the 5 applications faq categories and updates the thread content", async ({ page }) => {
    await page.goto("/applications");

    const panel = page.getByRole("tabpanel");
    const discoveryTab = page.getByRole("tab", { name: "App Discovery" });
    const ownershipTab = page.getByRole("tab", { name: "App Ownership" });
    const overlapTab = page.getByRole("tab", { name: "App Overlap" });
    const insightsTab = page.getByRole("tab", { name: "App Insights" });

    await expect(page.getByRole("tab")).toHaveCount(5);
    await expect(discoveryTab).toHaveAttribute("aria-selected", "true");
    await expect(panel).toContainText("Will Doow actually find all the apps my team is using?");

    await discoveryTab.focus();
    await page.keyboard.press("ArrowRight");
    await expect(ownershipTab).toHaveAttribute("aria-selected", "true");
    await expect(panel).toContainText("Can I see who owns each application?");

    await overlapTab.click();
    await expect(overlapTab).toHaveAttribute("aria-selected", "true");
    await expect(panel).toContainText("Can Doow show me apps that do the same thing?");
    await expect(panel).toContainText("Exactly. You\u2019ll get clear visibility into redundant tools.");

    await insightsTab.click();
    await expect(panel).toContainText("You can manage, optimise, any app directly from Doow.");
  });

  test("renders the applications footer promo copy and shared footer body", async ({ page }) => {
    await page.goto("/applications");

    const footerNavigation = page.getByRole("navigation", { name: "Footer navigation" });

    await expect(page.getByRole("heading", { name: "Stop guessing what you're paying for." })).toBeVisible();
    await expect(
      page.getByText("Get complete visibility into your SaaS stack and start saving money within minutes."),
    ).toBeVisible();
    await expect(page.getByRole("link", { name: "Start Exploring Applications" })).toBeVisible();
    await expect(footerNavigation).toBeVisible();
    await expect(footerNavigation.getByRole("link", { name: "Applications" })).toHaveAttribute("href", "/applications");
  });
});
