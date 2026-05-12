import { expect, test } from "@playwright/test";

const routes = [
  { path: "/", title: "SaaS Spend Visibility | Doow" },
  { path: "/applications", title: "Applications | Doow" },
  { path: "/subscriptions", title: "Subscriptions | Doow" },
  { path: "/alternative-apps", title: "Alternative Apps | Doow" },
  { path: "/privacy_policy", title: "Privacy Policy | Doow" },
  { path: "/terms_of_use", title: "Terms of Use | Doow" },
] as const;

function canonicalPattern(path: string) {
  return path === "/" ? /^https:\/\/www\.doow\.co\/?$/ : new RegExp(`${path}$`);
}

test.describe("site SEO metadata", () => {
  test.setTimeout(60_000);

  for (const route of routes) {
    test(`${route.path} exposes production metadata`, async ({ page }) => {
      await page.goto(route.path, { waitUntil: "domcontentloaded" });

      await expect(page).toHaveTitle(route.title);
      await expect(page.locator('meta[name="description"]')).toHaveAttribute("content", /.+/);
      await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", canonicalPattern(route.path));
      await expect(page.locator('meta[property="og:title"]')).toHaveAttribute("content", route.title);
      await expect(page.locator('meta[property="og:description"]')).toHaveAttribute("content", /.+/);
      await expect(page.locator('meta[property="og:url"]')).toHaveAttribute("content", canonicalPattern(route.path));
      await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute("content", "summary_large_image");
      await expect(page.locator('script[type="application/ld+json"]')).not.toHaveCount(0);
    });
  }

  test("blog routes remain noindex until BLOG_LIVE is enabled", async ({ page }) => {
    await page.goto("/blog", { waitUntil: "domcontentloaded" });

    await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", "noindex, nofollow");
  });

  test("auth links resolve to the external Doow app", async ({ page }) => {
    await page.goto("/", { waitUntil: "domcontentloaded" });

    await expect(page.getByRole("link", { name: "Login" }).first()).toHaveAttribute("href", /^https:\/\/dev\.doow\.co\/?$/);
    await expect(page.getByRole("link", { name: /start/i }).first()).toHaveAttribute("href", /^https:\/\/dev\.doow\.co\/signup$/);
  });

  test("footer Contact Us opens the dialog instead of navigating to a page", async ({ page }) => {
    await page.goto("/", { waitUntil: "domcontentloaded" });

    await page.getByRole("button", { name: /^contact$/i }).click();

    await expect(page.getByRole("dialog")).toBeVisible();
  });

  test("legacy contact route redirects without rendering a page", async ({ page }) => {
    const response = await page.goto("/contact_us");

    expect(response?.status()).toBeLessThan(400);
    await expect(page).toHaveURL(/\/$/);
  });
});
