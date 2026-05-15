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

async function getOrbitSnapshot(card: Locator) {
  return card.evaluate((cardNode) => {
    return Array.from(cardNode.querySelectorAll<HTMLElement>(".integration-orbit-card__orbit-node")).map((orbitNode) => {
      const rect = orbitNode.getBoundingClientRect();
      const logo = orbitNode.querySelector<HTMLElement>(".integration-logo-graphic");

      return {
        left: Number(rect.left.toFixed(2)),
        opacity: Number.parseFloat(getComputedStyle(orbitNode).opacity),
        top: Number(rect.top.toFixed(2)),
        tooltip: logo?.getAttribute("data-tooltip") ?? "",
      };
    });
  });
}

function getMaxOrbitMovement(before: Awaited<ReturnType<typeof getOrbitSnapshot>>, after: Awaited<ReturnType<typeof getOrbitSnapshot>>) {
  return before.reduce((maxMovement, node, index) => {
    const nextNode = after[index];

    if (!nextNode) {
      return maxMovement;
    }

    const deltaX = nextNode.left - node.left;
    const deltaY = nextNode.top - node.top;
    const distance = Math.hypot(deltaX, deltaY);

    return Math.max(maxMovement, distance);
  }, 0);
}

async function moveMouseToLocatorCenter(page: Page, locator: Locator) {
  await locator.scrollIntoViewIfNeeded();

  const bounds = await locator.boundingBox();

  expect(bounds).not.toBeNull();

  await page.mouse.move(2, 2);
  await page.waitForTimeout(50);
  await page.mouse.move((bounds?.x ?? 0) + (bounds?.width ?? 0) / 2, (bounds?.y ?? 0) + (bounds?.height ?? 0) / 2);
}

for (const viewport of viewports) {
  test.describe(`integrations geometry @ ${viewport.name}`, () => {
    test.use({ viewport: { width: viewport.width, height: viewport.height } });

    test("keeps default card content and decorative slots inside each frame", async ({ page }) => {
      await page.goto("/");

      await assertNoHorizontalOverflow(page);
      await expect(page.locator("[data-integration-card-id]")).toHaveCount(4);

      const cards = await page.evaluate(() => {
        const cardNodes = Array.from(document.querySelectorAll<HTMLElement>("[data-integration-card-id]"));

        return cardNodes.map((card) => {
          const cardRect = card.getBoundingClientRect();
          const copy = card.querySelector<HTMLElement>(".integration-orbit-card__copy");
          const description = card.querySelector<HTMLElement>(".integration-orbit-card__description");
          const tabs = card.querySelector<HTMLElement>('[role="tablist"]');
          const centerBrand = card.querySelector<HTMLElement>(".integration-orbit-card__center-brand-logo");
          const legacyBackplates = card.querySelectorAll(".integration-orbit-card__slot-backplate");
          const visibleSlots = Array.from(card.querySelectorAll<HTMLElement>(".integration-orbit-card__orbit-node")).filter(
            (slot) => Number.parseFloat(getComputedStyle(slot).opacity) >= 0.98,
          );

          const copyRect = copy?.getBoundingClientRect();
          const descriptionRect = description?.getBoundingClientRect();
          const centerBrandRect = centerBrand?.getBoundingClientRect();
          const tabsRect = tabs?.getBoundingClientRect();
          const logoSizes = visibleSlots.map((slot) => {
            const logo = slot.querySelector<HTMLElement>(".integration-orbit-card__slot-logo");
            const image = slot.querySelector<HTMLImageElement>(".integration-logo-graphic__image");
            const logoRect = logo?.getBoundingClientRect();
            const logoStyles = logo ? getComputedStyle(logo) : null;

            return {
              backgroundColor: logoStyles?.backgroundColor ?? "",
              borderTopWidth: logoStyles?.borderTopWidth ?? "",
              boxShadow: logoStyles?.boxShadow ?? "",
              height: Number((logoRect?.height ?? 0).toFixed(2)),
              src: image?.currentSrc ?? image?.src ?? "",
              tooltip: logo?.getAttribute("data-tooltip") ?? "",
              width: Number((logoRect?.width ?? 0).toFixed(2)),
            };
          });
          const slotPositions = visibleSlots.map((slot) => {
            const slotRect = slot.getBoundingClientRect();

            return {
              left: Number((slotRect.left - cardRect.left).toFixed(2)),
              top: Number((slotRect.top - cardRect.top).toFixed(2)),
            };
          });

          return {
            copyWidth: copyRect ? Number(copyRect.width.toFixed(2)) : null,
            copyWithinBounds:
              !copyRect ||
              (copyRect.left >= cardRect.left - 1 &&
                copyRect.right <= cardRect.right + 1 &&
                copyRect.top >= cardRect.top - 1 &&
                copyRect.bottom <= cardRect.bottom + 1),
            descriptionClearOfSlots:
              !descriptionRect ||
              visibleSlots.every((slot) => {
                const slotRect = slot.getBoundingClientRect();

                return (
                  slotRect.right <= descriptionRect.left - 1 ||
                  slotRect.left >= descriptionRect.right + 1 ||
                  slotRect.bottom <= descriptionRect.top - 1 ||
                  slotRect.top >= descriptionRect.bottom + 1
                );
              }),
            descriptionFontSize: description ? getComputedStyle(description).fontSize : null,
            descriptionWidth: descriptionRect ? Number(descriptionRect.width.toFixed(2)) : null,
            centerBrandCenterOffset:
              centerBrandRect == null
                ? null
                : Number(
                    Math.abs(
                      centerBrandRect.left + centerBrandRect.width / 2 - (cardRect.left + cardRect.width / 2),
                    ).toFixed(2),
                  ),
            id: card.dataset.integrationCardId,
            legacyBackplateCount: legacyBackplates.length,
            logoSizes,
            slotCount: visibleSlots.length,
            slotPositions,
            slotsWithinBounds: visibleSlots.every((slot) => {
              const slotRect = slot.getBoundingClientRect();

              return (
                slotRect.left >= cardRect.left - 1 &&
                slotRect.right <= cardRect.right + 1 &&
                slotRect.top >= cardRect.top - 1 &&
                slotRect.bottom <= cardRect.bottom + 1
              );
            }),
            tabRailWithinBounds:
              !tabsRect ||
              (tabsRect.left >= cardRect.left - 1 &&
                tabsRect.right <= cardRect.right + 1 &&
                tabsRect.top >= cardRect.top - 1 &&
                tabsRect.bottom <= cardRect.bottom + 1),
            tabLabelsWithinBounds: Array.from(card.querySelectorAll<HTMLElement>(".integration-orbit-card__tab")).every((tab) => {
              const styles = getComputedStyle(tab);

              return (
                tab.scrollWidth <= tab.clientWidth + 1 &&
                tab.scrollHeight <= tab.clientHeight + 1 &&
                styles.whiteSpace === "nowrap"
              );
            }),
          };
        });
      });

      const ssoDescriptionWidth =
        cards.find((card) => card.id === "sso")?.descriptionWidth ??
        (() => {
          throw new Error("The SSO integration card was not found.");
        })();
      const ssoCopyWidth =
        cards.find((card) => card.id === "sso")?.copyWidth ??
        (() => {
          throw new Error("The SSO integration copy block was not found.");
        })();
      const bankingCard =
        cards.find((card) => card.id === "banking-and-accounting") ??
        (() => {
          throw new Error("The Banking integration card was not found.");
        })();
      const ssoCard =
        cards.find((card) => card.id === "sso") ??
        (() => {
          throw new Error("The SSO integration card was not found.");
        })();

      for (const card of cards) {
        expect(card.id).toBeTruthy();
        expect(card.slotCount).toBe(4);
        expect(card.copyWithinBounds).toBeTruthy();
        expect(card.legacyBackplateCount).toBe(0);
        expect(card.logoSizes.every((logo) => logo.width === 34 && logo.height === 34)).toBeTruthy();
        expect(card.logoSizes.every((logo) => logo.tooltip.length > 0)).toBeTruthy();
        expect(
          card.logoSizes.every(
            (logo) =>
              logo.backgroundColor === "rgba(0, 0, 0, 0)" &&
              logo.borderTopWidth === "0px" &&
              logo.boxShadow === "none",
          ),
        ).toBeTruthy();
        expect(card.slotsWithinBounds).toBeTruthy();
        expect(card.tabRailWithinBounds).toBeTruthy();

        if (viewport.width >= 768 && viewport.width < 1024) {
          expect(card.descriptionClearOfSlots).toBeTruthy();
        }

        if (viewport.width < 1024) {
          expect(card.tabLabelsWithinBounds).toBeTruthy();
        }

        if (viewport.width >= 768 && viewport.width < 1024) {
          expect(card.descriptionFontSize).toBe("14px");
          expect(card.descriptionWidth).not.toBeNull();
          expect(card.descriptionWidth!).toBeGreaterThanOrEqual(224);
        }

        if (viewport.width >= 1024 && card.id === "banking-and-accounting") {
          expect(card.descriptionClearOfSlots).toBeTruthy();
        }

        if (viewport.width >= 1024) {
          expect(card.copyWidth).not.toBeNull();
          expect(card.descriptionWidth).not.toBeNull();
          expect(Math.abs(card.copyWidth! - ssoCopyWidth)).toBeLessThanOrEqual(1);
          expect(Math.abs(card.descriptionWidth! - ssoDescriptionWidth)).toBeLessThanOrEqual(1);
        }

        if (card.id === "banking-and-accounting" || card.id === "sso") {
          expect(card.slotPositions[0]!.left).toBeLessThan(card.slotPositions[1]!.left);
          expect(card.slotPositions[1]!.left).toBeLessThan(card.slotPositions[2]!.left);
          expect(card.slotPositions[2]!.left).toBeLessThan(card.slotPositions[3]!.left);
          expect(card.slotPositions[1]!.top).toBeLessThan(card.slotPositions[0]!.top);
          expect(card.slotPositions[2]!.top).toBeLessThan(card.slotPositions[3]!.top);
        }

        if (card.id === "hris" || card.id === "direct-integration") {
          expect(card.slotPositions[0]!.left).toBeLessThan(card.slotPositions[1]!.left);
          expect(card.slotPositions[1]!.left).toBeLessThan(card.slotPositions[2]!.left);
          expect(card.slotPositions[2]!.left).toBeLessThan(card.slotPositions[3]!.left);
          expect(card.slotPositions[0]!.top).toBeLessThan(card.slotPositions[1]!.top);
          expect(card.slotPositions[3]!.top).toBeLessThan(card.slotPositions[2]!.top);
        }

        if (card.id === "banking-and-accounting") {
          expect(card.centerBrandCenterOffset).not.toBeNull();
          expect(card.centerBrandCenterOffset).toBeLessThanOrEqual(1);
          expect(
            card.logoSizes
              .map((logo) => logo.src)
              .filter(Boolean)
              .every(
                (src) =>
                  src.includes("/_next/image?url=") &&
                  src.includes("landingpageassests.blob.core.windows.net%2Fimages%2F"),
              ),
          ).toBeTruthy();
        }
      }

      if (viewport.width >= 1024) {
        expect(Math.abs(ssoCard.slotPositions[1]!.top - bankingCard.slotPositions[1]!.top)).toBeLessThanOrEqual(1);
        expect(Math.abs(ssoCard.slotPositions[2]!.top - bankingCard.slotPositions[2]!.top)).toBeLessThanOrEqual(1);
      }
    });
  });
}

test.describe("integrations interactions", () => {
  test.describe.configure({ mode: "serial" });
  test.use({ viewport: { width: 1280, height: 960 } });

  test("keeps banking tabs keyboard operable and swaps the panel content", async ({ page }) => {
    test.slow();
    await page.goto("/");

    const bankingCard = page.locator('[data-integration-card-id="banking-and-accounting"]');
    const bankingTab = bankingCard.locator('[role="tab"]').nth(0);
    const accountingTab = bankingCard.locator('[role="tab"]').nth(1);
    const title = bankingCard.locator(".integration-orbit-card__title");

    await bankingCard.scrollIntoViewIfNeeded();

    await expect(bankingTab).toHaveAttribute("aria-selected", "true");
    await expect(accountingTab).toHaveAttribute("aria-selected", "false");
    await expect(title).toHaveText("Connect Banking");

    await bankingTab.focus();
    await page.keyboard.press("ArrowRight");

    await expect(accountingTab).toHaveAttribute("aria-selected", "true");
    await expect(title).toHaveText("Accounting");

    await page.keyboard.press("ArrowLeft");

    await expect(bankingTab).toHaveAttribute("aria-selected", "true");
    await expect(title).toHaveText("Connect Banking");
  });

  test("shows the provider name tooltip when hovering an orbit logo", async ({ page }) => {
    test.slow();
    await page.goto("/");

    const ssoCard = page.locator('[data-integration-card-id="sso"]');
    const firstLogo = ssoCard.locator(".integration-orbit-card__slot-logo").first();

    await ssoCard.scrollIntoViewIfNeeded();
    await firstLogo.hover();
    await expect
      .poll(() =>
        page.evaluate(() => {
          const ssoCardNode = document.querySelector('[data-integration-card-id="sso"]');
          const element = ssoCardNode?.querySelector<HTMLElement>(".integration-orbit-card__slot-logo");

          return element?.matches(":hover") ?? false;
        }),
      )
      .toBe(true);
    await page.waitForTimeout(200);

    const tooltipState = await page.evaluate(() => {
      const ssoCardNode = document.querySelector('[data-integration-card-id="sso"]');
      const element = ssoCardNode?.querySelector<HTMLElement>(".integration-orbit-card__slot-logo");

      if (!element) {
        return null;
      }

      const afterStyles = window.getComputedStyle(element, "::after");

      return {
        content: afterStyles.content,
        hovered: element.matches(":hover"),
        opacity: afterStyles.opacity,
        tooltip: element.getAttribute("data-tooltip"),
      };
    });

    if (!tooltipState) {
      throw new Error("The SSO tooltip target could not be found.");
    }

    expect(tooltipState.hovered).toBe(true);
    expect(tooltipState.tooltip).toBe("Google Workspace");
    expect(tooltipState.content).toContain("Google Workspace");
  });

  test("animates cards that currently have hidden providers when hovered", async ({ page }) => {
    test.slow();
    await page.goto("/");

    const bankingCard = page.locator('[data-integration-card-id="banking-and-accounting"]');
    const directCard = page.locator('[data-integration-card-id="direct-integration"]');
    const ssoCard = page.locator('[data-integration-card-id="sso"]');

    await moveMouseToLocatorCenter(page, bankingCard);
    await expect.poll(() => bankingCard.locator(".integration-orbit-card__orbit-node").count()).toBe(9);

    const bankingBefore = await getOrbitSnapshot(bankingCard);
    await page.waitForTimeout(900);
    const bankingAfter = await getOrbitSnapshot(bankingCard);
    const bankingMovement = getMaxOrbitMovement(bankingBefore, bankingAfter);

    expect(bankingMovement).toBeGreaterThan(6);
    expect(bankingAfter.filter((node) => node.opacity > 0.05).length).toBeLessThanOrEqual(5);

    await moveMouseToLocatorCenter(page, directCard);
    await expect.poll(() => directCard.locator(".integration-orbit-card__orbit-node").count()).toBe(5);

    const directBefore = await getOrbitSnapshot(directCard);
    await page.waitForTimeout(900);
    const directAfter = await getOrbitSnapshot(directCard);
    const directMovement = getMaxOrbitMovement(directBefore, directAfter);

    expect(directMovement).toBeGreaterThan(6);
    expect(directAfter.filter((node) => node.opacity > 0.05).length).toBeLessThanOrEqual(5);

    await moveMouseToLocatorCenter(page, ssoCard);
    await expect.poll(() => ssoCard.locator(".integration-orbit-card__orbit-node").count()).toBe(5);

    const ssoBefore = await getOrbitSnapshot(ssoCard);
    await page.waitForTimeout(900);
    const ssoAfter = await getOrbitSnapshot(ssoCard);
    const ssoMovement = getMaxOrbitMovement(ssoBefore, ssoAfter);

    expect(ssoMovement).toBeGreaterThan(5);
    expect(ssoAfter.filter((node) => node.opacity > 0.05).length).toBeLessThanOrEqual(5);
  });
});
