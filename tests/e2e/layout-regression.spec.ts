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

async function assertResponsiveGutter(locator: Locator, viewportWidth: number, variant: string) {
  const padding = await locator.evaluate((element) => {
    const styles = getComputedStyle(element);

    return {
      left: Number.parseFloat(styles.paddingLeft),
      right: Number.parseFloat(styles.paddingRight),
    };
  });

  expect(Math.abs(padding.left - padding.right)).toBeLessThanOrEqual(0.5);

      const zeroPaddingBreakpoint =
    {
      landing: 1120,
      landingWide: 1280,
      siteFooterPromo: 1408,
      siteFooterBody: 1216,
      landingFooterPromo: 1408,
      landingFooterBody: 1216,
      readable: 1024,
      utilityShell: 1024,
    }[variant] ?? 1024;

  if (viewportWidth >= zeroPaddingBreakpoint) {
    expect(padding.left).toBeLessThanOrEqual(0.5);
    expect(padding.right).toBeLessThanOrEqual(0.5);
    return;
  }

  expect(padding.left).toBeGreaterThanOrEqual(20);
  expect(padding.right).toBeGreaterThanOrEqual(20);
  expect(padding.left).toBeLessThanOrEqual(40);
  expect(padding.right).toBeLessThanOrEqual(40);
}

async function getRect(page: Page, selector: string) {
  return page.locator(selector).evaluate((element) => {
    const rect = element.getBoundingClientRect();

    return {
      bottom: rect.bottom,
      left: rect.left,
      right: rect.right,
      top: rect.top,
    };
  });
}

for (const viewport of viewports) {
  test.describe(`landing layout @ ${viewport.name}`, () => {
    test.use({ viewport: { width: viewport.width, height: viewport.height } });

    test("keeps shell variants, spacing, and responsiveness stable", async ({ page }) => {
      await page.goto("/");

      const navbarShell = page.locator('[data-layout-shell="landingNavbarShell"]');
      const heroShell = page.locator('[data-layout-shell="landingHeroShell"]');
      const demoShell = page.locator('[data-section="demo"]');
      const featureShell = page.locator('[data-section="feature-split"]');
      const financeShell = page.locator('[data-section="finance-control"]');
      const alternativeAppsShell = page.locator('[data-section="alternative-apps"]');
      const doowAiShell = page.locator('[data-section="doow-ai"]');
      const pricingShell = page.locator('[data-section="pricing"]');
      const faqShell = page.locator('[data-section="faq"]');
      const integrationsShell = page.locator('[data-section="integrations"]');
      const integrationCards = page.locator("[data-integration-card-id]");
      const footerPromoShell = page.locator('[data-layout-shell="siteFooterPromoShell"]');
      const footerBodyShell = page.locator('[data-layout-shell="siteFooterBodyShell"]');
      const featureContentPanel = page.locator('[data-feature-split-panel="content"]');
      const featureStagePanel = page.locator('[data-feature-split-panel="stage"]');

      await assertNoHorizontalOverflow(page);
      await assertContainerVariant(navbarShell, "landingWide");
      await assertContainerVariant(heroShell, "landingWide");
      await assertContainerVariant(demoShell, "landing");
      await assertContainerVariant(featureShell, "landing");
      await assertContainerVariant(financeShell, "landing");
      await assertContainerVariant(alternativeAppsShell, "landing");
      await assertContainerVariant(doowAiShell, "landing");
      await assertContainerVariant(pricingShell, "landing");
      await assertContainerVariant(faqShell, "landing");
      await assertContainerVariant(integrationsShell, "landing");
      await assertContainerVariant(footerPromoShell, "siteFooterPromo");
      await assertContainerVariant(footerBodyShell, "siteFooterBody");

      await assertResponsiveGutter(navbarShell, viewport.width, "landingWide");
      await assertResponsiveGutter(heroShell, viewport.width, "landingWide");
      await assertResponsiveGutter(demoShell, viewport.width, "landing");
      await assertResponsiveGutter(featureShell, viewport.width, "landing");
      await assertResponsiveGutter(financeShell, viewport.width, "landing");
      await assertResponsiveGutter(alternativeAppsShell, viewport.width, "landing");
      await assertResponsiveGutter(doowAiShell, viewport.width, "landing");
      await assertResponsiveGutter(pricingShell, viewport.width, "landing");
      await assertResponsiveGutter(faqShell, viewport.width, "landing");
      await assertResponsiveGutter(integrationsShell, viewport.width, "landing");
      await assertResponsiveGutter(footerPromoShell, viewport.width, "siteFooterPromo");
      await assertResponsiveGutter(footerBodyShell, viewport.width, "siteFooterBody");
      await expect(integrationCards).toHaveCount(4);

      await expect(page.locator(".demo-section__intro")).toHaveCSS("border-left-style", "dashed");

      const featureBorderOwnership = await page.evaluate(() => {
        const shell = document.querySelector('[data-section="feature-split"]');
        const layout = document.querySelector('[data-feature-split-surface="layout"]');
        const contentPanel = document.querySelector('[data-feature-split-panel="content"]');
        const stagePanel = document.querySelector('[data-feature-split-panel="stage"]');

        if (
          !(shell instanceof HTMLElement) ||
          !(layout instanceof HTMLElement) ||
          !(contentPanel instanceof HTMLElement) ||
          !(stagePanel instanceof HTMLElement)
        ) {
          throw new Error("Feature split shell, surface, or panels were not found.");
        }

        const shellStyles = getComputedStyle(shell);
        const layoutStyles = getComputedStyle(layout);
        const layoutBefore = getComputedStyle(layout, "::before");
        const contentStyles = getComputedStyle(contentPanel, "::before");
        const stageStyles = getComputedStyle(stagePanel, "::before");

        return {
          shellBackground: shellStyles.backgroundColor,
          surfaceBackground: layoutStyles.backgroundColor,
          surfaceLeftWidth: Number.parseFloat(layoutBefore.borderLeftWidth),
          surfaceBottomWidth: Number.parseFloat(layoutBefore.borderBottomWidth),
          contentRightWidth: Number.parseFloat(contentStyles.borderRightWidth),
          contentBottomWidth: Number.parseFloat(contentStyles.borderBottomWidth),
          stageLeftWidth: Number.parseFloat(stageStyles.borderLeftWidth),
          stageBottomWidth: Number.parseFloat(stageStyles.borderBottomWidth),
        };
      });

      const heroRect = await getRect(page, "#hero");
      const demoRect = await getRect(page, ".demo-section");
      const featureRect = await getRect(page, "#product");
      const alternativeAppsRect = await getRect(page, "#alternative-apps");
      const doowAiRect = await getRect(page, "#doow-ai");
      const pricingRect = await getRect(page, "#pricing");
      const faqRect = await getRect(page, "#faq");
      const integrationsRect = await getRect(page, "#integrations");
      const integrationsShellRect = await getRect(page, '[data-section="integrations"]');
      const integrationsGridShellRect = await getRect(page, '[data-integration-grid-shell="true"]');
      const footerPromoRect = await getRect(page, ".site-footer-promo");
      const footerPromoCardRect = await getRect(page, ".site-footer-promo__card");
      const footerRect = await getRect(page, "footer#footer");
      const footerDashboardRect = await getRect(page, ".site-footer-promo__dashboard-frame");
      const footerBrandRect = await getRect(page, ".site-footer__brand");
      const demoIntroRect = await getRect(page, ".demo-section__intro");
      const featureSurfaceRect = await getRect(page, '[data-feature-split-surface="layout"]');

      expect(Math.abs(demoRect.top - heroRect.bottom)).toBeLessThanOrEqual(1);
      expect(Math.abs(featureRect.top - demoRect.bottom)).toBeLessThanOrEqual(1);
      expect(Math.abs(doowAiRect.top - alternativeAppsRect.bottom)).toBeLessThanOrEqual(1);
      expect(Math.abs(pricingRect.top - doowAiRect.bottom)).toBeLessThanOrEqual(1);
      expect(Math.abs(faqRect.top - pricingRect.bottom)).toBeLessThanOrEqual(1);
      expect(Math.abs(integrationsRect.top - faqRect.bottom)).toBeLessThanOrEqual(1);
      expect(Math.abs(footerPromoRect.top - integrationsRect.bottom)).toBeLessThanOrEqual(1);
      expect(integrationsGridShellRect.left).toBeGreaterThanOrEqual(integrationsShellRect.left - 1);
      expect(integrationsGridShellRect.right).toBeLessThanOrEqual(integrationsShellRect.right + 1);
      await expect(page.locator(".site-footer-stack")).toHaveAttribute("data-site-footer-promo-kind", "dashboard");
      await expect(page.locator("#doow-ai").getByRole("link", { name: "Learn more Doow AI" })).toHaveAttribute(
        "href",
        "/doow-ai"
      );

      const featureContentRect = await getRect(page, ".feature-split__content-column");
      const featureStageRect = await getRect(page, ".feature-split__stage");

      const integrationsLayout = await page.evaluate(() => {
        const grid = document.querySelector('[data-integration-grid="true"]');
        const gridShell = document.querySelector('[data-integration-grid-shell="true"]');
        const shell = document.querySelector('[data-section="integrations"]');
        const cards = Array.from(document.querySelectorAll("[data-integration-card-id]")).map((card) => {
          if (!(card instanceof HTMLElement)) {
            throw new Error("Integration card was not found.");
          }

          const rect = card.getBoundingClientRect();

          return {
            left: Math.round(rect.left),
            top: Math.round(rect.top),
          };
        });

        if (!(grid instanceof HTMLElement) || !(gridShell instanceof HTMLElement) || !(shell instanceof HTMLElement)) {
          throw new Error("Integrations shell, grid, or grid shell was not found.");
        }

        const gridStyles = getComputedStyle(grid);
        const shellStyles = getComputedStyle(shell);
        const shellRect = shell.getBoundingClientRect();
        const gridShellRect = gridShell.getBoundingClientRect();

        return {
          columnGap: Number.parseFloat(gridStyles.columnGap),
          gridShellWidth: Number(gridShellRect.width.toFixed(2)),
          rowGap: Number.parseFloat(gridStyles.rowGap),
          shellContentWidth: Number(
            (shellRect.width - Number.parseFloat(shellStyles.paddingLeft) - Number.parseFloat(shellStyles.paddingRight)).toFixed(
              2,
            ),
          ),
          uniqueLefts: Array.from(new Set(cards.map((card) => card.left))),
          uniqueTops: Array.from(new Set(cards.map((card) => card.top))),
        };
      });

      if (viewport.width >= 1024) {
        expect(featureBorderOwnership.surfaceLeftWidth).toBeLessThanOrEqual(0.5);
        expect(featureBorderOwnership.surfaceBottomWidth).toBeLessThanOrEqual(0.5);
        expect(featureBorderOwnership.contentRightWidth).toBeGreaterThanOrEqual(1);
        expect(featureBorderOwnership.contentBottomWidth).toBeLessThanOrEqual(0.5);
        expect(featureBorderOwnership.stageLeftWidth).toBeLessThanOrEqual(0.5);
        expect(featureBorderOwnership.stageBottomWidth).toBeLessThanOrEqual(0.5);
        await expect(featureStagePanel).toBeVisible();
        await expect(featureContentPanel).toHaveCSS("background-color", "rgb(250, 250, 250)");
        await expect(featureStagePanel).toHaveCSS("background-color", "rgb(255, 255, 255)");
        expect(featureStageRect.left).toBeGreaterThan(featureContentRect.left + 1);
      } else {
        expect(featureBorderOwnership.shellBackground).toBe("rgb(255, 255, 255)");
        expect(featureBorderOwnership.surfaceBackground).toBe("rgb(250, 250, 250)");
        expect(featureBorderOwnership.surfaceLeftWidth).toBeGreaterThanOrEqual(1);
        expect(featureBorderOwnership.surfaceBottomWidth).toBeLessThanOrEqual(0.5);
        expect(featureBorderOwnership.contentRightWidth).toBeLessThanOrEqual(0.5);
        expect(featureBorderOwnership.contentBottomWidth).toBeLessThanOrEqual(0.5);
        expect(featureBorderOwnership.stageLeftWidth).toBeLessThanOrEqual(0.5);
        expect(featureBorderOwnership.stageBottomWidth).toBeLessThanOrEqual(0.5);
        await expect(featureStagePanel).toBeHidden();
        expect(Math.abs(featureSurfaceRect.left - demoIntroRect.left)).toBeLessThanOrEqual(1);
        expect(Math.abs(featureSurfaceRect.right - demoIntroRect.right)).toBeLessThanOrEqual(1);
      }

      if (viewport.width >= 1216) {
        const footerPromoCardMinHeight = await page
          .locator(".site-footer-promo__card")
          .evaluate((element) => Number.parseFloat(getComputedStyle(element).minHeight));

        expect(Math.abs(footerPromoCardMinHeight - 808)).toBeLessThanOrEqual(1);
        expect(footerDashboardRect.bottom).toBeGreaterThan(footerRect.top + 1);
        expect(footerBrandRect.top - footerDashboardRect.bottom).toBeGreaterThanOrEqual(0);
        expect(footerBrandRect.top - footerDashboardRect.bottom).toBeLessThanOrEqual(24);
      } else {
        expect(Math.abs(footerDashboardRect.bottom - footerPromoCardRect.bottom)).toBeLessThanOrEqual(1);
        expect(footerDashboardRect.bottom).toBeLessThanOrEqual(footerRect.top + 1);
      }

      if (viewport.width >= 1280) {
        expect(integrationsLayout.uniqueLefts).toHaveLength(2);
        expect(integrationsLayout.uniqueTops).toHaveLength(2);
        expect(integrationsLayout.columnGap).toBeGreaterThanOrEqual(52);
        expect(integrationsLayout.rowGap).toBeGreaterThanOrEqual(50);
      } else {
        expect(integrationsLayout.uniqueLefts).toHaveLength(1);
        expect(integrationsLayout.uniqueTops).toHaveLength(4);
      }

      expect(Math.abs(integrationsLayout.gridShellWidth - integrationsLayout.shellContentWidth)).toBeLessThanOrEqual(1);
    });
  });

  test.describe(`utility layout @ ${viewport.name}`, () => {
    test.use({ viewport: { width: viewport.width, height: viewport.height } });

    const routeMatrix = [
      { path: "/privacy_policy", shell: "legalReadableShell", variant: "readable" },
      { path: "/terms_of_use", shell: "legalReadableShell", variant: "readable" },
    ] as const;

    for (const route of routeMatrix) {
      test(`${route.path} keeps the shared utility shell contract`, async ({ page }) => {
        await page.goto(route.path);

        const pageShell = page.locator('[data-layout-shell="utilityPageShell"]');
        const headerShell = page.locator('[data-layout-shell="utilityHeaderShell"]');
        const routeShell = page.locator(`[data-layout-shell="${route.shell}"]`);

        await assertNoHorizontalOverflow(page);
        await expect(pageShell).toHaveCount(1);
        await expect(headerShell).toHaveCount(1);
        await expect(routeShell).toHaveCount(1);

        await assertContainerVariant(headerShell, "utilityShell");
        await assertContainerVariant(routeShell, route.variant);

        await assertResponsiveGutter(headerShell, viewport.width, "utilityShell");
        await assertResponsiveGutter(routeShell, viewport.width, route.variant);
      });
    }
  });
}

test("alternative apps updates the comparison panel and opens the analysis CTA in a new tab", async ({ page }) => {
  await page.goto("/");

  const section = page.locator("#alternative-apps");
  const comparisonPanel = section.locator("#alternative-apps-panel");

  await expect(comparisonPanel).toContainText("Asana");
  await expect(comparisonPanel).toContainText("Trello");

  await section.locator("#alternative-apps-tab-notion").click();

  await expect(comparisonPanel).toContainText("Notion", { timeout: 10000 });
  await expect(comparisonPanel).toContainText("Coda", { timeout: 10000 });

  const [popup] = await Promise.all([
    page.waitForEvent("popup"),
    section.getByRole("link", { name: "See full analysis in Doow" }).click(),
  ]);

  await popup.waitForLoadState("domcontentloaded");
  await expect(popup).toHaveURL(/https:\/\/dev\.doow\.co\/?/);
  await popup.close();
});

test.describe("landing feature split interactions", () => {
  test.use({ viewport: { width: 1280, height: 960 } });

  test("renders four selectable items and swaps between the live point-one stage and placeholder stages", async ({ page }) => {
    await page.goto("/");

    const section = page.locator("#product");
    const panel = section.getByRole("tabpanel");
    const progressFill = section.locator('[data-progressive-split-progress-fill="true"]');
    const discoverTab = section.getByRole("tab", { name: /Discover every tool your team is using/i });
    const eliminateTab = section.getByRole("tab", { name: /Eliminate licenses nobody is using/i });
    const consolidateTab = section.getByRole("tab", { name: /Consolidate duplicate tools and cut overlap/i });

    await expect(section.getByRole("tab")).toHaveCount(4);
    await expect(discoverTab).toHaveAttribute("aria-selected", "true");
    await expect(panel).toHaveAttribute("data-feature-active-point-id", "discover");
    await expect(panel).toHaveAttribute("data-feature-stage-kind", "pointOne");
    await expect(panel.locator('[data-feature-point-one-stage="true"]')).toBeVisible();

    await discoverTab.focus();
    await page.keyboard.press("ArrowDown");

    await expect(eliminateTab).toHaveAttribute("aria-selected", "true");
    await expect(panel).toHaveAttribute("data-feature-active-point-id", "eliminate");
    await expect(panel).toHaveAttribute("data-feature-stage-kind", "placeholder");
    await expect(panel.locator('[data-progressive-split-placeholder="true"]')).toBeVisible();

    const progressBeforeClick = await progressFill.evaluate((element) => element.getBoundingClientRect().height);
    await consolidateTab.click();

    await expect(consolidateTab).toHaveAttribute("aria-selected", "true");
    await expect(panel).toHaveAttribute("data-feature-active-point-id", "consolidate");
    await expect(panel).toHaveAttribute("data-feature-stage-kind", "placeholder");
    await expect
      .poll(() => progressFill.evaluate((element) => element.getBoundingClientRect().height))
      .toBeGreaterThan(progressBeforeClick);
  });

  test("captures desktop wheel scroll to advance and releases at section boundaries", async ({ page }) => {
    await page.goto("/");

    const section = page.locator("#product");
    const stageSurface = section.locator(".feature-split__stage-surface");
    const tabs = section.getByRole("tab");
    const discoverTab = section.getByRole("tab", { name: /Discover every tool your team is using/i });
    const eliminateTab = section.getByRole("tab", { name: /Eliminate licenses nobody is using/i });
    const renewalsTab = section.getByRole("tab", { name: /Never get blindsided by a renewal again/i });
    const consolidateTab = section.getByRole("tab", { name: /Consolidate duplicate tools and cut overlap/i });

    await section.scrollIntoViewIfNeeded();
    await expect(tabs).toHaveCount(4);
    await expect(discoverTab).toHaveAttribute("aria-selected", "true");

    await stageSurface.evaluate((element) => element.scrollIntoView({ block: "center", inline: "nearest" }));
    await expect
      .poll(() =>
        stageSurface.evaluate((element) => {
          const rect = element.getBoundingClientRect();

          return rect.top >= 0 && rect.bottom <= window.innerHeight;
        }),
      )
      .toBe(true);

    await page.mouse.wheel(0, 380);
    await expect(eliminateTab).toHaveAttribute("aria-selected", "true");

    await page.mouse.wheel(0, 380);
    await expect(renewalsTab).toHaveAttribute("aria-selected", "true");

    await page.mouse.wheel(0, 380);
    await expect(consolidateTab).toHaveAttribute("aria-selected", "true");

    const beforeDownRelease = await page.evaluate(() => window.scrollY);
    await page.mouse.wheel(0, 500);
    await expect.poll(() => page.evaluate(() => window.scrollY)).toBeGreaterThan(beforeDownRelease);

    await stageSurface.evaluate((element) => element.scrollIntoView({ block: "center", inline: "nearest" }));
    await expect
      .poll(() =>
        stageSurface.evaluate((element) => {
          const rect = element.getBoundingClientRect();

          return rect.top >= 0 && rect.bottom <= window.innerHeight;
        }),
      )
      .toBe(true);

    await page.mouse.wheel(0, -380);
    await expect(renewalsTab).toHaveAttribute("aria-selected", "true");

    await discoverTab.click();
    await expect(discoverTab).toHaveAttribute("aria-selected", "true");

    const beforeUpRelease = await page.evaluate(() => window.scrollY);
    await page.mouse.wheel(0, -500);
    await expect.poll(() => page.evaluate(() => window.scrollY)).toBeLessThan(beforeUpRelease);
  });

  test("does not hijack wheel scroll when reduced motion is requested", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");

    const section = page.locator("#product");
    const discoverTab = section.getByRole("tab", { name: /Discover every tool your team is using/i });

    await section.scrollIntoViewIfNeeded();
    await expect(discoverTab).toHaveAttribute("aria-selected", "true");

    const beforeWheel = await page.evaluate(() => window.scrollY);
    await page.mouse.wheel(0, 500);

    await expect(discoverTab).toHaveAttribute("aria-selected", "true");
    await expect.poll(() => page.evaluate(() => window.scrollY)).toBeGreaterThan(beforeWheel);
  });
});

test.describe("landing feature split shell", () => {
  test("keeps the stage panel out of visual flow below desktop while preserving the shared shell markers", async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto("/");

    const section = page.locator("#product");
    const layout = section.locator('[data-feature-split-surface="layout"]');
    const contentPanel = section.locator('[data-feature-split-panel="content"]');
    const stagePanel = section.locator('[data-feature-split-panel="stage"]');
    const stagePanelStyles = await stagePanel.evaluate((element) => {
      const styles = getComputedStyle(element);

      return {
        clipPath: styles.clipPath,
        height: styles.height,
        position: styles.position,
        width: styles.width,
      };
    });

    await expect(layout).toBeVisible();
    await expect(contentPanel).toBeVisible();
    await expect(section.getByRole("tabpanel")).toHaveCount(1);
    expect(stagePanelStyles.position).toBe("absolute");
    expect(stagePanelStyles.width).toBe("1px");
    expect(stagePanelStyles.height).toBe("1px");
    expect(stagePanelStyles.clipPath).not.toBe("none");
  });

  test("renders the content and stage panels as a desktop split from 1024px upward", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 960 });
    await page.goto("/");

    const section = page.locator("#product");
    const contentPanel = section.locator('[data-feature-split-panel="content"]');
    const stagePanel = section.locator('[data-feature-split-panel="stage"]');
    const contentBox = await contentPanel.boundingBox();
    const stageBox = await stagePanel.boundingBox();

    await expect(contentPanel).toHaveCSS("background-color", "rgb(250, 250, 250)");
    await expect(stagePanel).toBeVisible();
    await expect(stagePanel).toHaveCSS("background-color", "rgb(255, 255, 255)");
    expect(contentBox).not.toBeNull();
    expect(stageBox).not.toBeNull();
    expect(stageBox!.x - contentBox!.x).toBeGreaterThan(100);
  });
});

test("pricing renders its content and resolves the in-page pricing plans anchor", async ({ page }) => {
  await page.goto("/");

  const section = page.locator("#pricing");
  const anchor = page.locator("#pricing-plans");
  const heading = section.locator(".pricing__heading-title");
  const description = section.locator(".pricing__heading-description");
  const layout = section.locator(".pricing__layout");

  await expect(section.locator(".badge-overlay")).toHaveText("Pricing");
  await expect(section.getByRole("heading", { name: "Choose a plan that fits your needs" })).toBeVisible();
  await expect(section).toContainText("Most teams save 10× their subscription cost in the first 90 days.");
  await expect(section.getByRole("link", { name: "View Pricing Plans" })).toBeVisible();
  await expect(heading).toHaveCSS("color", "rgb(255, 255, 255)");
  await expect(description).toHaveCSS("color", "rgb(235, 235, 235)");
  await expect(layout).toHaveCSS("padding-top", "79.2305px");

  const viewportSize = page.viewportSize();

  if (!viewportSize) {
    throw new Error("Viewport size was not available.");
  }

  const sectionHeight = await section.evaluate((element) => element.getBoundingClientRect().height);
  expect(Math.abs(sectionHeight - viewportSize.height)).toBeLessThanOrEqual(1.5);

  await section.getByRole("link", { name: "View Pricing Plans" }).click();

  await expect(page).toHaveURL(/#pricing-plans$/);
  await expect(anchor).toHaveCount(1);
});

test("footer renders the promo dashboard and mapped footer links", async ({ page }) => {
  await page.goto("/");

  const footerPromo = page.locator(".site-footer-promo");
  const footer = page.locator("footer#footer");
  const dashboardImage = footerPromo.getByRole("img", {
    name: "Doow dashboard showing applications, subscriptions, users, and spend overview widgets.",
  });

  await expect(footerPromo.getByRole("heading", { name: "Stop guessing what you're paying for." })).toBeVisible();
  await expect(footerPromo).toContainText("Start seeing it.");
  await expect(footerPromo.getByRole("link", { name: "Start 14 days free trial" })).toHaveAttribute(
    "href",
    "https://dev.doow.co/signup",
  );
  await expect(footerPromo).toContainText("Cancel anytime");
  await expect(dashboardImage).toBeVisible();

  await expect(footer.getByRole("link", { name: "Applications" })).toHaveAttribute("href", "/applications");
  await expect(footer.getByRole("link", { name: "Expenses" })).toHaveAttribute("href", /#finance-control$/);
  await expect(footer.getByRole("link", { name: "Integrations" })).toHaveAttribute("href", "/integrations");
  await expect(footer.getByRole("link", { name: "About Us" })).toHaveAttribute("href", "/");
  await expect(footer.getByRole("link", { name: "Contact Us" })).toHaveAttribute("href", /#faq$/);
  await expect(footer.getByRole("link", { name: "Privacy Policy" })).toHaveAttribute("href", "/privacy_policy");
  await expect(footer.getByRole("link", { name: "Terms of Use" })).toHaveAttribute("href", "/terms_of_use");
  await expect(footer.getByRole("link", { name: "Twitter (X)" })).toHaveAttribute("href", /https:\/\/x\.com\/?$/);
  await expect(footer.getByRole("link", { name: "GitHub" })).toHaveAttribute("href", /https:\/\/github\.com\/?$/);
  await expect(footer).toContainText("1007 N Orange St. 4th Floor,");
  await expect(footer).toContainText("© 2026 Doow");
});
