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
      siteFooterPromo: 1408,
      siteFooterBody: 1216,
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

for (const viewport of viewports) {
  test.describe(`integrations page shell @ ${viewport.name}`, () => {
    test.use({ viewport: { width: viewport.width, height: viewport.height } });

    test("renders the shared navbar, hero, integration catalog, promo footer, and shared footer body without overflow", async ({ page }) => {
      await page.goto("/integrations");

      const pageShell = page.locator('[data-layout-shell="utilityPageShell"]');
      const headerShell = page.locator('[data-layout-shell="utilityHeaderShell"]');
      const heroShell = page.locator('[data-layout-shell="sitePageSectionShell"][data-section="integrations-hero"]');
      const integrationListShell = page.locator('[data-layout-shell="sitePageSectionShell"][data-section="integration-list"]');
      const connectionsShell = page.locator(
        '[data-layout-shell="sitePageSectionShell"][data-section="integrations-connections"]',
      );
      const faqShell = page.locator('[data-layout-shell="sitePageSectionShell"][data-section="faq"]');
      const footerPromoShell = page.locator('[data-layout-shell="siteFooterPromoShell"]');
      const footerBodyShell = page.locator('[data-layout-shell="siteFooterBodyShell"]');
      const navbarSurface = page.locator('[data-global-site-navbar-surface="true"]');

      await assertNoHorizontalOverflow(page);
      await expect(pageShell).toHaveCount(1);
      await expect(headerShell).toHaveCount(1);
      await expect(page.locator('[data-layout-shell="sitePageSectionShell"]')).toHaveCount(4);
      await expect(heroShell).toHaveCount(1);
      await expect(integrationListShell).toHaveCount(1);
      await expect(connectionsShell).toHaveCount(1);
      await expect(faqShell).toHaveCount(1);
      await expect(footerPromoShell).toHaveCount(1);
      await expect(footerBodyShell).toHaveCount(1);
      await expect(navbarSurface).toHaveCount(1);

      await assertContainerVariant(headerShell, "utilityShell");
      await assertContainerVariant(heroShell, "landing");
      await assertContainerVariant(integrationListShell, "siteFooterPromo");
      await assertContainerVariant(connectionsShell, "landing");
      await assertContainerVariant(faqShell, "landing");
      await assertContainerVariant(footerPromoShell, "siteFooterPromo");
      await assertContainerVariant(footerBodyShell, "siteFooterBody");

      await assertResponsiveGutter(headerShell, viewport.width, "utilityShell");
      await assertResponsiveGutter(heroShell, viewport.width, "landing");
      await assertResponsiveGutter(integrationListShell, viewport.width, "siteFooterPromo");
      await assertResponsiveGutter(connectionsShell, viewport.width, "landing");
      await assertResponsiveGutter(faqShell, viewport.width, "landing");
      await assertResponsiveGutter(footerPromoShell, viewport.width, "siteFooterPromo");
      await assertResponsiveGutter(footerBodyShell, viewport.width, "siteFooterBody");

      await expect(
        heroShell.getByRole("heading", { level: 1, name: "Connect the systems your company already uses" }),
      ).toBeVisible();
      await expect(
        heroShell.getByText("Bring identity, finance, and HR data together so everything stays up to date."),
      ).toBeVisible();
      await expect(heroShell.getByRole("link", { name: "Start Free Trial" })).toHaveAttribute(
        "href",
        "https://dev.doow.co/signup",
      );
      await expect(integrationListShell.getByRole("heading", { level: 2, name: "One Hub for Every Integration" })).toBeVisible();
      await expect(integrationListShell.getByRole("heading", { level: 3, name: "Browse Our Integration Catalog" })).toBeVisible();
      await expect(integrationListShell.getByRole("searchbox", { name: "Search integrations" })).toBeVisible();
      await expect(
        connectionsShell.getByRole("heading", {
          level: 2,
          name: "Connect Without Constraints . Fast, Simple, Secure",
        }),
      ).toBeVisible();
      await expect(
        connectionsShell.getByText(
          "Bring your financial and SaaS data into Doow from every source that matters. SSO providers, browsers, and banking systems. Without complex setup or engineering work.",
        ),
      ).toBeVisible();
      await expect(connectionsShell.getByRole("heading", { level: 3, name: "Connect Doow’s Browser Extension" })).toBeVisible();
      await expect(connectionsShell.getByRole("heading", { level: 3, name: "Connect SSO Providers" })).toBeVisible();
      await expect(connectionsShell.getByRole("heading", { level: 3, name: "Connect Banking" })).toBeVisible();
      await expect(connectionsShell.getByText("$118,400.00")).toBeVisible();

      const footerNavigation = page.getByRole("navigation", { name: "Footer navigation" });
      await expect(footerNavigation.getByRole("link", { name: "Integrations" })).toHaveAttribute("href", "/integrations");

      const sectionOrder = await page.evaluate(() => {
        const hero = document.querySelector("#integrations-hero");
        const integrationList = document.querySelector("#integration-list");
        const connections = document.querySelector("#integrations-connections");
        const faq = document.querySelector('[data-layout-shell="sitePageSectionShell"][data-section="faq"]');
        const promo = document.querySelector('[data-layout-shell="siteFooterPromoShell"]');
        const footer = document.querySelector('[data-layout-shell="siteFooterBodyShell"]');

        if (
          !(hero instanceof HTMLElement) ||
          !(integrationList instanceof HTMLElement) ||
          !(connections instanceof HTMLElement) ||
          !(faq instanceof HTMLElement) ||
          !(promo instanceof HTMLElement) ||
          !(footer instanceof HTMLElement)
        ) {
          throw new Error("Integrations route sections were not found in the expected order.");
        }

        return {
          heroVsIntegrationList: hero.compareDocumentPosition(integrationList),
          integrationListVsConnections: integrationList.compareDocumentPosition(connections),
          connectionsVsFaq: connections.compareDocumentPosition(faq),
          faqVsPromo: faq.compareDocumentPosition(promo),
          promoVsFooter: promo.compareDocumentPosition(footer),
        };
      });

      expect(sectionOrder.heroVsIntegrationList & 4).toBeTruthy();
      expect(sectionOrder.integrationListVsConnections & 4).toBeTruthy();
      expect(sectionOrder.connectionsVsFaq & 4).toBeTruthy();
      expect(sectionOrder.faqVsPromo & 4).toBeTruthy();
      expect(sectionOrder.promoVsFooter & 4).toBeTruthy();

      const cardLayout = await connectionsShell.locator(".integrations-connections-card").evaluateAll((cards) =>
        cards.map((card) => {
          const rect = card.getBoundingClientRect();

          return {
            bottom: rect.bottom,
            left: rect.left,
            right: rect.right,
            top: rect.top,
          };
        }),
      );

      for (const card of cardLayout) {
        expect(card.left).toBeGreaterThanOrEqual(-1);
        expect(card.right).toBeLessThanOrEqual(viewport.width + 1);
      }

      if (viewport.width >= 768) {
        expect(Math.abs(cardLayout[0].top - cardLayout[1].top)).toBeLessThanOrEqual(1);
        expect(cardLayout[2].top).toBeGreaterThan(cardLayout[0].bottom - 1);
      } else {
        expect(cardLayout[1].top).toBeGreaterThan(cardLayout[0].bottom - 1);
        expect(cardLayout[2].top).toBeGreaterThan(cardLayout[1].bottom - 1);
      }
    });
  });
}

test.describe("integrations connections section motion", () => {
  test.use({ viewport: { width: 1280, height: 960 } });

  test("enters view and replays the hovered card animation", async ({ page }) => {
    await page.goto("/integrations");

    const section = page.locator("#integrations-connections");
    const showcase = section.locator("[data-connections-active]");
    const browserCard = section.locator('[data-connections-card="browser-extension"]');
    const ssoCard = section.locator('[data-connections-card="sso-providers"]');

    await section.scrollIntoViewIfNeeded();
    await expect(showcase).toHaveAttribute("data-connections-active", "true");

    const browserReplayBefore = await browserCard.getAttribute("data-replay-token");
    const ssoReplayBefore = await ssoCard.getAttribute("data-replay-token");

    await browserCard.hover();

    await expect(browserCard).not.toHaveAttribute("data-replay-token", browserReplayBefore ?? "");
    await expect(ssoCard).toHaveAttribute("data-replay-token", ssoReplayBefore ?? "0");
  });

  test("renders the final state when reduced motion is preferred", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/integrations");

    const section = page.locator("#integrations-connections");

    await section.scrollIntoViewIfNeeded();
    await expect(section.locator("[data-connections-active]")).toHaveAttribute("data-connections-active", "true");
    await expect(section.getByText("$118,400.00")).toBeVisible();
    await expect(section.locator(".integrations-connections-toggle__handle")).toBeVisible();
  });
});

test.describe("integrations catalog interactions", () => {
  test.use({ viewport: { width: 1280, height: 960 } });

  test("filters by desktop category tabs and server-backed search", async ({ page }) => {
    await page.goto("/integrations");

    const section = page.locator("#integration-list");
    const panel = section.getByRole("tabpanel");

    await expect(panel).toContainText("Okta");
    await expect(panel).toContainText("QuickBooks");

    await section.getByRole("tab", { name: /Accounting & Bookkeeping/ }).click();
    await expect(panel).toContainText("QuickBooks", { timeout: 10000 });
    await expect(panel).toContainText("Xero");
    await expect(panel).not.toContainText("Slack");

    await section.getByRole("tab", { name: /All Categories/ }).click();
    await section.getByRole("searchbox", { name: "Search integrations" }).fill("okta");
    await expect(panel).toContainText("Okta", { timeout: 10000 });
    await expect(panel).not.toContainText("QuickBooks");

    await section.getByRole("searchbox", { name: "Search integrations" }).fill("not-a-real-provider");
    await expect(panel.getByText("No integrations found")).toBeVisible({ timeout: 10000 });
  });
});

test.describe("integrations catalog mobile category select", () => {
  test.use({ viewport: { width: 390, height: 844 } });

  test("uses the mobile select to switch categories", async ({ page }) => {
    await page.goto("/integrations");

    const section = page.locator("#integration-list");
    const panel = section.getByRole("tabpanel");

    await expect(section.locator("[data-integration-list-hydrated='true']")).toHaveCount(1);
    await section.getByLabel("Select integration category").selectOption("hr-people-and-payroll");
    await expect(panel).toContainText("Deel", { timeout: 10000 });
    await expect(panel).toContainText("BambooHR");
    await expect(panel).not.toContainText("QuickBooks");
  });
});

test.describe("integrations FAQ and footer content", () => {
  test.use({ viewport: { width: 1280, height: 960 } });

  test("renders the 5 integrations faq categories and updates the thread content", async ({ page }) => {
    await page.goto("/integrations");

    const faqShell = page.locator('[data-layout-shell="sitePageSectionShell"][data-section="faq"]');
    const panel = faqShell.getByRole("tabpanel");
    const compatibilityTab = faqShell.getByRole("tab", { name: "System Compatibility" });
    const setupSpeedTab = faqShell.getByRole("tab", { name: "Setup Speed" });
    const dataSyncTab = faqShell.getByRole("tab", { name: "Data Sync" });
    const flexibleConnectionsTab = faqShell.getByRole("tab", { name: "Flexible Connections" });

    await expect(faqShell.getByRole("tab")).toHaveCount(5);
    await expect(compatibilityTab).toHaveAttribute("aria-selected", "true");
    await expect(panel).toContainText("Will Doow actually work with the systems we already use?");

    await compatibilityTab.focus();
    await page.keyboard.press("ArrowRight");
    await expect(setupSpeedTab).toHaveAttribute("aria-selected", "true");
    await expect(panel).toContainText("How long does it take to get everything connected?");

    await dataSyncTab.click();
    await expect(dataSyncTab).toHaveAttribute("aria-selected", "true");
    await expect(panel).toContainText("Will our data stay updated automatically?");
    await expect(panel).toContainText("No manual work - your data stays current in real time.");

    await flexibleConnectionsTab.click();
    await expect(panel).toContainText("What if a tool we use isn't directly supported?");
    await expect(panel).toContainText("Yes. You can expand connections as your stack evolves.");
  });

  test("renders the integrations footer promo copy", async ({ page }) => {
    await page.goto("/integrations");

    const footerPromo = page.locator('[data-layout-shell="siteFooterPromoShell"]');

    await expect(footerPromo.getByRole("heading", { name: "Connect the tools you already use" })).toBeVisible();
    await expect(
      footerPromo.getByText("Bring identity, finance, and HR data together so everything stays up to date."),
    ).toBeVisible();
    await expect(footerPromo.getByRole("link", { name: "Get Started" })).toHaveAttribute(
      "href",
      "https://dev.doow.co/signup",
    );
  });
});
