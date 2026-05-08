import { expect, test, type Locator, type Page } from "@playwright/test";

const viewports = [
  { name: "mobile-360", width: 360, height: 800 },
  { name: "mobile-390", width: 390, height: 844 },
  { name: "tablet-768", width: 768, height: 1024 },
  { name: "desktop-1024", width: 1024, height: 900 },
  { name: "desktop-1280", width: 1280, height: 960 },
  { name: "desktop-1440", width: 1440, height: 1024 },
] as const;

const featuresSectionSelector =
  '[data-layout-shell="sitePageSectionShell"][data-section="applications-features-solutions"]';
const featuresCardTitles = [
  "Finally know what you're paying for",
  "Spot tools doing the same job",
  "See which tools are barely used",
  "Understand each app in detail",
] as const;

async function assertNoHorizontalOverflow(page: Page) {
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
  expect(overflow).toBeLessThanOrEqual(1);
}

async function assertContainerVariant(locator: Locator, variant: string) {
  await expect(locator).toHaveAttribute("data-layout-container", "true");
  await expect(locator).toHaveAttribute("data-layout-variant", variant);
}

async function getGridTracks(locator: Locator) {
  return locator.evaluateAll((elements) => {
    const tolerance = 24;
    const lefts: number[] = [];
    const tops: number[] = [];

    for (const element of elements) {
      const rect = element.getBoundingClientRect();
      const left = Math.round(rect.left);
      const top = Math.round(rect.top);

      if (!lefts.some((existing) => Math.abs(existing - left) <= tolerance)) {
        lefts.push(left);
      }

      if (!tops.some((existing) => Math.abs(existing - top) <= tolerance)) {
        tops.push(top);
      }
    }

    lefts.sort((a, b) => a - b);
    tops.sort((a, b) => a - b);

    return { lefts, tops };
  });
}

for (const viewport of viewports) {
  test.describe(`applications page shell @ ${viewport.name}`, () => {
    test.use({ viewport: { width: viewport.width, height: viewport.height } });

    test("renders the shared navbar, page-owned promo, and shared footer body without overflow", async ({ page }) => {
      await page.goto("/applications");

      const pageShell = page.locator('[data-layout-shell="utilityPageShell"]');
      const headerShell = page.locator('[data-layout-shell="utilityHeaderShell"]');
      const heroShell = page.locator('[data-layout-shell="sitePageSectionShell"][data-section="applications-hero"]');
      const problemsShell = page.locator(
        '[data-layout-shell="sitePageSectionShell"][data-section="applications-problems"]'
      );
      const featuresShell = page.locator(featuresSectionSelector);
      const faqShell = page.locator('[data-layout-shell="sitePageSectionShell"][data-section="faq"]');
      const footerPromoShell = page.locator('[data-layout-shell="siteFooterPromoShell"]');
      const footerBodyShell = page.locator('[data-layout-shell="siteFooterBodyShell"]');
      const navbarSurface = page.locator('[data-global-site-navbar-surface="true"]');

      await assertNoHorizontalOverflow(page);
      await expect(pageShell).toHaveCount(1);
      await expect(headerShell).toHaveCount(1);
      await expect(page.locator('[data-layout-shell="sitePageSectionShell"]')).toHaveCount(4);
      await expect(heroShell).toHaveCount(1);
      await expect(problemsShell).toHaveCount(1);
      await expect(featuresShell).toHaveCount(1);
      await expect(faqShell).toHaveCount(1);
      await expect(footerPromoShell).toHaveCount(1);
      await expect(footerBodyShell).toHaveCount(1);
      await assertContainerVariant(headerShell, "utilityShell");
      await assertContainerVariant(heroShell, "landing");
      await assertContainerVariant(problemsShell, "landing");
      await assertContainerVariant(featuresShell, "landing");
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

      const sectionOrder = await page.evaluate(() => {
        const hero = document.querySelector("#applications-hero");
        const problems = document.querySelector("#applications-problems");
        const features = document.querySelector("#applications-features-solutions");
        const faq = document.querySelector('[data-layout-shell="sitePageSectionShell"][data-section="faq"]');
        const promo = document.querySelector('[data-layout-shell="siteFooterPromoShell"]');
        const footer = document.querySelector('[data-layout-shell="siteFooterBodyShell"]');

        if (
          !(hero instanceof HTMLElement) ||
          !(problems instanceof HTMLElement) ||
          !(features instanceof HTMLElement) ||
          !(faq instanceof HTMLElement) ||
          !(promo instanceof HTMLElement) ||
          !(footer instanceof HTMLElement)
        ) {
          throw new Error("Applications route sections were not found in the expected order.");
        }

        return {
          faqVsFooter: promo.compareDocumentPosition(footer),
          featuresVsFaq: features.compareDocumentPosition(faq),
          heroVsProblems: hero.compareDocumentPosition(problems),
          problemsVsFeatures: problems.compareDocumentPosition(features),
        };
      });

      expect(sectionOrder.heroVsProblems & 4).toBeTruthy();
      expect(sectionOrder.problemsVsFeatures & 4).toBeTruthy();
      expect(sectionOrder.featuresVsFaq & 4).toBeTruthy();
      expect(sectionOrder.faqVsFooter & 4).toBeTruthy();
    });
  });
}

for (const viewport of viewports) {
  test.describe(`applications features responsiveness @ ${viewport.name}`, () => {
    test.use({ viewport: { width: viewport.width, height: viewport.height } });

    test("keeps the features grid readable across breakpoints", async ({ page }) => {
      await page.goto("/applications");

      const featuresShell = page.locator(featuresSectionSelector);
      const cards = featuresShell.locator(".applications-features-solutions__card");

      await featuresShell.scrollIntoViewIfNeeded();
      await assertNoHorizontalOverflow(page);
      await expect(cards).toHaveCount(4);

      const tracks = await getGridTracks(cards);

      if (viewport.width < 1024) {
        expect(tracks.lefts).toHaveLength(1);
        expect(tracks.tops).toHaveLength(4);
      } else {
        expect(tracks.lefts).toHaveLength(2);
        expect(tracks.tops).toHaveLength(2);
      }

      for (const title of featuresCardTitles) {
        await expect(featuresShell.getByRole("heading", { level: 3, name: title })).toBeVisible();
      }
    });
  });
}

test.describe("applications problems section", () => {
  test.use({ viewport: { width: 1280, height: 960 } });

  test("renders the problems selector and updates the stage with click and keyboard input", async ({ page }) => {
    await page.goto("/applications");

    const problemsShell = page.locator('[data-layout-shell="sitePageSectionShell"][data-section="applications-problems"]');
    const panel = problemsShell.getByRole("tabpanel");
    const duplicateTab = problemsShell.getByRole("tab", { name: /Duplicate Tools/i });
    const budgetsTab = problemsShell.getByRole("tab", { name: /Budgets Quietly Bleed/i });
    const visibilityTab = problemsShell.getByRole("tab", { name: /Visibility Disappears/i });
    const costTab = problemsShell.getByRole("tab", { name: /Cost Spirals/i });

    await expect(problemsShell.getByRole("heading", { name: "When software sprawls unnoticed" })).toBeVisible();
    await expect(problemsShell.getByRole("heading", { name: "How software sprawl quietly unfolds" })).toBeVisible();
    await expect(problemsShell.getByRole("tab")).toHaveCount(4);
    await expect(duplicateTab).toHaveAttribute("aria-selected", "true");
    await expect(panel).toHaveAttribute("data-selected-problem-id", "duplicate-tools");
    await expect(panel.locator('[data-problem-illustration="duplicate-tools"]')).toBeVisible();
    await expect(panel.locator('[data-problem-illustration="duplicate-tools"][data-illustration-status="implemented"]')).toBeVisible();
    await expect(panel.locator('[data-problem-duplicate-app]')).toHaveCount(3);
    await expect(panel.locator('[data-problem-duplicate-node]')).toHaveCount(3);

    await duplicateTab.focus();
    await page.keyboard.press("ArrowDown");
    await expect(budgetsTab).toHaveAttribute("aria-selected", "true");
    await expect(panel).toHaveAttribute("data-selected-problem-id", "budgets-bleed");
    await expect(panel.locator('[data-problem-illustration="budgets-bleed"]')).toBeVisible();
    await expect(panel.locator('[data-problem-illustration="budgets-bleed"]')).toHaveAttribute(
      "data-illustration-status",
      "placeholder"
    );

    await visibilityTab.click();
    await expect(visibilityTab).toHaveAttribute("aria-selected", "true");
    await expect(panel).toHaveAttribute("data-selected-problem-id", "visibility-disappears");
    await expect(panel.locator('[data-problem-illustration="visibility-disappears"]')).toBeVisible();
    await expect(panel.locator('[data-problem-illustration="visibility-disappears"] [data-problem-avatar-slot]')).toHaveCount(
      27
    );
    await expect(
      panel.locator('[data-problem-illustration="visibility-disappears"] [data-problem-avatar-slot][data-state="muted"]')
    ).toHaveCount(9);

    await costTab.click();
    await expect(costTab).toHaveAttribute("aria-selected", "true");
    await expect(panel).toHaveAttribute("data-selected-problem-id", "cost-spirals");
    await expect(panel.locator('[data-problem-illustration="cost-spirals"]')).toBeVisible();
    await expect(panel.locator('[data-problem-illustration="cost-spirals"] [data-problem-cost-bar]')).toHaveCount(6);
    await expect(panel.locator('[data-problem-illustration="cost-spirals"] [data-problem-cost-marker]')).toHaveCount(5);
  });

  test("updates the problems stage when reduced motion is enabled", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/applications");

    const problemsShell = page.locator('[data-layout-shell="sitePageSectionShell"][data-section="applications-problems"]');
    const panel = problemsShell.getByRole("tabpanel");
    const visibilityTab = problemsShell.getByRole("tab", { name: /Visibility Disappears/i });

    await visibilityTab.click();
    await expect(visibilityTab).toHaveAttribute("aria-selected", "true");
    await expect(panel).toHaveAttribute("data-selected-problem-id", "visibility-disappears");
    await expect(panel.locator('[data-problem-illustration="visibility-disappears"]')).toBeVisible();
  });
});

test.describe("applications features and solutions section", () => {
  test.use({ viewport: { width: 1280, height: 960 } });

  test("renders the heading, copy, and four card captions with the expected heading hierarchy", async ({ page }) => {
    await page.goto("/applications");

    const featuresShell = page.locator(featuresSectionSelector);

    await featuresShell.scrollIntoViewIfNeeded();
    await expect(featuresShell.getByRole("heading", { level: 2, name: "Clarity for your entire software stack" })).toBeVisible();
    await expect(
      featuresShell.getByText(
        "Understand what you're paying for, what your teams use, and where money is quietly slipping away."
      )
    ).toBeVisible();
    await expect(featuresShell.locator(".applications-features-solutions__card")).toHaveCount(4);
    await expect(featuresShell.getByRole("heading", { level: 3 })).toHaveCount(4);

    for (const title of featuresCardTitles) {
      await expect(featuresShell.getByRole("heading", { level: 3, name: title })).toBeVisible();
    }

    await expect(featuresShell.getByRole("button")).toHaveCount(0);
    await expect(featuresShell.getByRole("link")).toHaveCount(0);
  });

  test("renders the final metric values immediately when reduced motion is enabled", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/applications");

    const featuresShell = page.locator(featuresSectionSelector);
    const visibleMetricValues = featuresShell.locator(
      ".applications-features-solutions__metric-value > span[aria-hidden='true']"
    );

    await featuresShell.scrollIntoViewIfNeeded();
    await expect(visibleMetricValues.nth(0)).toHaveText("$118,400.00");
    await expect(visibleMetricValues.nth(1)).toHaveText("142");
    await expect(featuresShell.getByText("5.2% vs prev month")).toHaveCount(2);
  });
});

test.describe("applications problems responsiveness", () => {
  test("hides the visual stage on tablet and removes the old decorative triangle", async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto("/applications");

    const problemsSection = page.locator("#applications-problems");
    const problemsShell = page.locator('[data-layout-shell="sitePageSectionShell"][data-section="applications-problems"]');
    const stagePanel = problemsShell.locator(".applications-problems__stage-panel");

    const afterContent = await problemsSection.evaluate((element) => getComputedStyle(element, "::after").content);
    const stagePanelStyles = await stagePanel.evaluate((element) => {
      const styles = getComputedStyle(element);

      return {
        clipPath: styles.clipPath,
        height: styles.height,
        position: styles.position,
        width: styles.width,
      };
    });

    expect(afterContent).toBe("none");
    expect(stagePanelStyles.position).toBe("absolute");
    expect(stagePanelStyles.width).toBe("1px");
    expect(stagePanelStyles.height).toBe("1px");
    expect(stagePanelStyles.clipPath).not.toBe("none");
  });

  test("keeps the shared split layout in a row at 1024px and shows the stage", async ({ page }) => {
    await page.setViewportSize({ width: 1024, height: 900 });
    await page.goto("/applications");

    const problemsSection = page.locator("#applications-problems");
    const problemsShell = page.locator('[data-layout-shell="sitePageSectionShell"][data-section="applications-problems"]');
    const contentPanel = problemsShell.locator(".applications-problems__content-panel");
    const stagePanel = problemsShell.locator(".applications-problems__stage-panel");
    const stage = problemsShell.locator(".applications-problems__stage");

    const afterContent = await problemsSection.evaluate((element) => getComputedStyle(element, "::after").content);
    const contentPanelBox = await contentPanel.boundingBox();
    const stagePanelBox = await stagePanel.boundingBox();
    const stageBox = await stage.boundingBox();

    expect(afterContent).toBe("none");
    expect(contentPanelBox).not.toBeNull();
    expect(stagePanelBox).not.toBeNull();
    expect(stageBox).not.toBeNull();
    expect(stagePanelBox!.x - contentPanelBox!.x).toBeGreaterThan(100);
  });
});

test.describe("applications FAQ and footer content", () => {
  test.use({ viewport: { width: 1280, height: 960 } });

  test("renders the 5 applications faq categories and updates the thread content", async ({ page }) => {
    await page.goto("/applications");

    const faqShell = page.locator('[data-layout-shell="sitePageSectionShell"][data-section="faq"]');
    const panel = faqShell.getByRole("tabpanel");
    const discoveryTab = faqShell.getByRole("tab", { name: "App Discovery" });
    const ownershipTab = faqShell.getByRole("tab", { name: "App Ownership" });
    const overlapTab = faqShell.getByRole("tab", { name: "App Overlap" });
    const insightsTab = faqShell.getByRole("tab", { name: "App Insights" });

    await expect(faqShell.getByRole("tab")).toHaveCount(5);
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
      page.getByText("Get complete visibility into your SaaS stack and start saving money within minutes.")
    ).toBeVisible();
    await expect(page.getByRole("link", { name: "Get Started" })).toBeVisible();
    await expect(footerNavigation).toBeVisible();
    await expect(footerNavigation.getByRole("link", { name: "Applications" })).toHaveAttribute("href", "/applications");
  });
});
