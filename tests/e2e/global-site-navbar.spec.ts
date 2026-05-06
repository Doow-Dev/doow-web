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

for (const viewport of viewports) {
  test.describe(`global navbar shell @ ${viewport.name}`, () => {
    test.use({ viewport: { width: viewport.width, height: viewport.height } });

    test("keeps the utility chrome sticky, layered, and inside the shell contract", async ({ page }) => {
      await page.goto("/privacy_policy");

      const pageShell = page.locator('[data-layout-shell="utilityPageShell"]');
      const headerShell = page.locator('[data-layout-shell="utilityHeaderShell"]');
      const routeShell = page.locator('[data-layout-shell="legalReadableShell"]');
      const navbarSurface = page.locator('[data-global-site-navbar-surface="true"]');

      await assertNoHorizontalOverflow(page);
      await expect(pageShell).toHaveCount(1);
      await expect(headerShell).toHaveCount(1);
      await expect(routeShell).toHaveCount(1);
      await assertContainerVariant(headerShell, "utilityShell");
      await assertContainerVariant(routeShell, "readable");
      await assertResponsiveGutter(headerShell, viewport.width, "utilityShell");
      await assertResponsiveGutter(routeShell, viewport.width, "readable");

      const beforeScroll = await navbarSurface.boundingBox();
      expect(beforeScroll).not.toBeNull();
      expect(beforeScroll!.y).toBeGreaterThanOrEqual(8);
      expect(beforeScroll!.y).toBeLessThanOrEqual(12);

      const initialContentClearance = await page.evaluate(() => {
        const surface = document.querySelector('[data-global-site-navbar-surface="true"]');
        const route = document.querySelector('[data-layout-shell="legalReadableShell"]');

        if (!(surface instanceof HTMLElement) || !(route instanceof HTMLElement)) {
          throw new Error("Navbar surface or utility route shell was not found.");
        }

        const surfaceRect = surface.getBoundingClientRect();
        const routeRect = route.getBoundingClientRect();

        return {
          routeTop: routeRect.top,
          surfaceBottom: surfaceRect.bottom,
        };
      });

      expect(initialContentClearance.routeTop).toBeGreaterThanOrEqual(initialContentClearance.surfaceBottom);

      await page.evaluate(() => window.scrollTo(0, 400));
      await page.waitForTimeout(100);

      const afterScroll = await navbarSurface.boundingBox();
      expect(afterScroll).not.toBeNull();
      expect(afterScroll!.y).toBeGreaterThanOrEqual(8);
      expect(afterScroll!.y).toBeLessThanOrEqual(12);

      const layering = await page.evaluate(() => {
        const surface = document.querySelector('[data-global-site-navbar-surface="true"]');
        const shell = document.querySelector('[data-global-site-navbar-shell="true"]');

        if (!(surface instanceof HTMLElement) || !(shell instanceof HTMLElement)) {
          throw new Error("Navbar surface or shell was not found.");
        }

        const rect = surface.getBoundingClientRect();
        const elementAtPoint = document.elementFromPoint(rect.left + rect.width / 2, rect.top + rect.height / 2);

        return {
          isLayeredAboveContent: Boolean(elementAtPoint && surface.contains(elementAtPoint)),
          zIndex: getComputedStyle(shell).zIndex,
        };
      });

      expect(layering.isLayeredAboveContent).toBeTruthy();
      expect(Number.parseInt(layering.zIndex, 10)).toBeGreaterThanOrEqual(90);
    });
  });
}

test.describe("global navbar interactions", () => {
  test("keeps the mobile navigation accessible and returns focus when dismissed", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/privacy_policy");

    const trigger = page.locator('[data-global-site-navbar-mobile-trigger="true"]');
    const dialog = page.locator('[data-global-site-navbar-mobile-content="true"]');
    const overlay = page.locator('[data-global-site-navbar-mobile-overlay="true"]');
    const productTrigger = page.locator('[data-global-site-navbar-mobile-product-trigger="true"]');
    const stickyShell = page.locator('[data-global-site-navbar-shell="true"]');

    await expect(trigger).toBeVisible();
    await expect(page.getByRole("link", { name: "Blog" })).toHaveCount(0);

    await trigger.click();
    await expect(dialog).toBeVisible();
    await expect(dialog.getByRole("link", { name: "Login" })).toHaveCount(0);

    const layerOrder = await page.evaluate(() => {
      const overlayElement = document.querySelector('[data-global-site-navbar-mobile-overlay="true"]');
      const shellElement = document.querySelector('[data-global-site-navbar-shell="true"]');

      if (!(overlayElement instanceof HTMLElement) || !(shellElement instanceof HTMLElement)) {
        throw new Error("Mobile overlay or sticky navbar shell was not found.");
      }

      const overlayZIndex = Number.parseInt(getComputedStyle(overlayElement).zIndex, 10);
      const shellZIndex = Number.parseInt(getComputedStyle(shellElement).zIndex, 10);

      return {
        overlayZIndex,
        shellZIndex,
      };
    });

    expect(layerOrder.overlayZIndex).toBeLessThan(layerOrder.shellZIndex);

    const overlayGeometry = await page.evaluate(() => {
      const overlayElement = document.querySelector('[data-global-site-navbar-mobile-overlay="true"]');
      const stickyShellElement = document.querySelector('[data-global-site-navbar-shell="true"]');

      if (!(overlayElement instanceof HTMLElement) || !(stickyShellElement instanceof HTMLElement)) {
        throw new Error("Mobile overlay or sticky navbar shell was not found.");
      }

      const overlayRect = overlayElement.getBoundingClientRect();
      const shellRect = stickyShellElement.getBoundingClientRect();

      return {
        overlayTop: overlayRect.top,
        shellBottom: shellRect.bottom,
      };
    });

    expect(overlayGeometry.overlayTop).toBeGreaterThanOrEqual(overlayGeometry.shellBottom - 2);
    await expect(overlay).toBeVisible();
    await expect(stickyShell).toBeVisible();

    await productTrigger.focus();
    await expect(productTrigger).toBeFocused();
    await page.keyboard.press("Space");
    await expect(page.locator('[data-global-site-navbar-mobile-product-content="true"]')).toBeVisible();
    await expect(page.locator('[data-global-site-navbar-menu-item="For CEOs"]')).toBeVisible();
    await expect(page.locator('[data-global-site-navbar-menu-item="Enterprises"]')).toBeVisible();
    await expect(
      page.locator('[data-global-site-navbar-mobile-product-content="true"] [data-global-site-navbar-menu-item="For Employees"]'),
    ).toHaveAttribute("href", "/integrations");
    await expect(
      page.locator('[data-global-site-navbar-mobile-product-content="true"] [data-global-site-navbar-menu-item="Enterprises"]'),
    ).toHaveAttribute("href", "/integrations");

    await page.mouse.click(12, 832);
    await expect(dialog).toBeHidden();

    await trigger.click();
    await expect(dialog).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(dialog).toBeHidden();
    await expect(trigger).toBeFocused();
  });

  test("opens the desktop product menu on hover and keyboard interaction", async ({ page }) => {
    await page.setViewportSize({ width: 1024, height: 900 });
    await page.goto("/privacy_policy");

    const productTrigger = page.locator('[data-global-site-navbar-product-trigger="true"]');
    const productContent = page.locator('[data-global-site-navbar-product-content="true"]');

    await expect(productTrigger).toBeVisible();
    await expect(page.getByRole("link", { name: "Pricing" })).toBeVisible();
    await expect(page.getByRole("link", { name: "Blog" })).toHaveCount(0);

    await productTrigger.hover();
    await expect(productContent).toBeVisible();
    await expect(page.locator('[data-global-site-navbar-menu-item="For CFOs & Controllers"]')).toBeVisible();
    await expect(productContent.locator('[data-global-site-navbar-menu-item="For Employees"]')).toHaveAttribute(
      "href",
      "/integrations",
    );
    await expect(productContent.locator('[data-global-site-navbar-menu-item="Enterprises"]')).toHaveAttribute(
      "href",
      "/integrations",
    );

    await page.mouse.move(0, 0);
    await page.waitForTimeout(120);

    await productTrigger.focus();
    await page.keyboard.press("Enter");
    await expect(productContent).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(productContent).toBeHidden();
  });
});
