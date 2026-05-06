import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const routes = [
  "/",
  "/applications",
  "/subscriptions",
  "/alternative-apps",
  "/blog",
  "/blog/running-out-of-runway",
  "/privacy_policy",
  "/terms_of_use",
] as const;

for (const route of routes) {
  test.describe(`accessibility ${route}`, () => {
    test.use({ viewport: { width: 390, height: 844 } });

    test("has no critical or serious axe violations on mobile", async ({ page }) => {
      await page.goto(route);

      const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"]).analyze();
      const blockingViolations = results.violations.filter((violation) =>
        violation.impact === "critical" || violation.impact === "serious"
      );

      expect(blockingViolations).toEqual([]);
    });
  });
}
