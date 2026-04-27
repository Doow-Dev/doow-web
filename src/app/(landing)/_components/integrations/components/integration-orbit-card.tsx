"use client";

import type { CSSProperties, KeyboardEvent, ReactNode } from "react";
import { useEffect, useId, useRef, useState } from "react";

import { useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

import {
  FIGMA_INTEGRATION_CARD_FRAME,
  getIntegrationCardVisualRecipe,
  type IntegrationCenterBrandRecipe,
  type IntegrationCopyFrameRecipe,
  type IntegrationOrbitSlotRecipe,
  type IntegrationTabRailRecipe,
} from "../integration-card-visuals";
import type { IntegrationAppLogo, IntegrationCard, IntegrationCardView } from "../content";
import { IntegrationOrbitAnimatedChips } from "./integration-orbit-animated-chips";
import { IntegrationLogoGraphic } from "./integration-logo";
import { IntegrationOrbitChip } from "./integration-orbit-chip";

function toPercent(value: number, base: number) {
  return (value / base) * 100;
}

function getVisibleOrbitSummary(apps: readonly IntegrationAppLogo[], maxVisibleOrbitApps: number) {
  return apps.slice(0, maxVisibleOrbitApps).map((app) => app.name);
}

function getOrbitNodeStyle(slot: IntegrationOrbitSlotRecipe): CSSProperties {
  return {
    height: `${toPercent(slot.sizePx, FIGMA_INTEGRATION_CARD_FRAME.height)}%`,
    left: `${toPercent(slot.leftPx, FIGMA_INTEGRATION_CARD_FRAME.width)}%`,
    top: `${toPercent(slot.topPx, FIGMA_INTEGRATION_CARD_FRAME.height)}%`,
    width: `${toPercent(slot.sizePx, FIGMA_INTEGRATION_CARD_FRAME.width)}%`,
  };
}

function getNextIndex(currentIndex: number, total: number, direction: "next" | "previous") {
  if (direction === "next") {
    return (currentIndex + 1) % total;
  }

  return (currentIndex - 1 + total) % total;
}

function handleViewKeyDown(
  event: KeyboardEvent<HTMLButtonElement>,
  views: readonly IntegrationCardView[],
  index: number,
  onSelect: (viewId: string) => void,
) {
  if (!["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "Home", "End"].includes(event.key)) {
    return;
  }

  event.preventDefault();

  const tablist = event.currentTarget.closest('[role="tablist"]');
  const tabs = tablist ? Array.from(tablist.querySelectorAll<HTMLButtonElement>('[role="tab"]')) : [];

  if (!tabs.length) {
    return;
  }

  let nextIndex = index;

  if (event.key === "ArrowRight" || event.key === "ArrowDown") {
    nextIndex = getNextIndex(index, tabs.length, "next");
  }

  if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
    nextIndex = getNextIndex(index, tabs.length, "previous");
  }

  if (event.key === "Home") {
    nextIndex = 0;
  }

  if (event.key === "End") {
    nextIndex = tabs.length - 1;
  }

  tabs[nextIndex]?.focus();

  const nextView = views[nextIndex];

  if (nextView) {
    onSelect(nextView.id);
  }
}

function renderDescription(text: string, emphasis?: ReactNode): ReactNode {
  if (!emphasis) {
    return text;
  }

  if (typeof emphasis !== "string") {
    return emphasis;
  }

  const emphasisIndex = text.indexOf(emphasis);

  if (emphasisIndex === -1) {
    return text;
  }

  const prefix = text.slice(0, emphasisIndex);
  const suffix = text.slice(emphasisIndex + emphasis.length);

  return (
    <>
      {prefix}
      <span className="integration-orbit-card__description-emphasis">{emphasis}</span>
      {suffix}
    </>
  );
}

function getResolvedDescriptionEmphasis(
  descriptionEmphasis: NonNullable<ReturnType<typeof getIntegrationCardVisualRecipe>>["descriptionEmphasis"],
  activeProviderName: string,
) {
  if (!descriptionEmphasis) {
    return undefined;
  }

  if (descriptionEmphasis.mode === "providerName") {
    return activeProviderName;
  }

  return descriptionEmphasis.text;
}

function getArcShellStyle(visualRecipe: NonNullable<ReturnType<typeof getIntegrationCardVisualRecipe>>): CSSProperties {
  return {
    height: `${toPercent(visualRecipe.arcFrame.heightPx, FIGMA_INTEGRATION_CARD_FRAME.height)}%`,
    left: `${toPercent(visualRecipe.arcFrame.leftPx, FIGMA_INTEGRATION_CARD_FRAME.width)}%`,
    top: `${toPercent(visualRecipe.arcFrame.topPx, FIGMA_INTEGRATION_CARD_FRAME.height)}%`,
    transform: visualRecipe.arcFrame.rotationDeg ? `rotate(${visualRecipe.arcFrame.rotationDeg}deg)` : undefined,
    width: `${toPercent(visualRecipe.arcFrame.widthPx, FIGMA_INTEGRATION_CARD_FRAME.width)}%`,
  };
}

function getArcArtStyle(visualRecipe: NonNullable<ReturnType<typeof getIntegrationCardVisualRecipe>>): CSSProperties {
  return {
    height: `${(visualRecipe.arcFrame.artHeightPx / visualRecipe.arcFrame.heightPx) * 100}%`,
  };
}

function getCopyStyle(visualRecipe: NonNullable<ReturnType<typeof getIntegrationCardVisualRecipe>>): CSSProperties {
  return {
    left: "50%",
    top: `${toPercent(visualRecipe.copyFrame.topPx, FIGMA_INTEGRATION_CARD_FRAME.height)}%`,
    transform: "translateX(-50%)",
    width: `${toPercent(visualRecipe.copyFrame.widthPx, FIGMA_INTEGRATION_CARD_FRAME.width)}%`,
  };
}

function getDescriptionStyle(copyFrame: IntegrationCopyFrameRecipe): CSSProperties {
  return {
    maxWidth: `${toPercent(copyFrame.descriptionWidthPx, copyFrame.widthPx) * 100}%`,
  };
}

function getCenterBrandStyle(centerBrand: IntegrationCenterBrandRecipe): CSSProperties {
  return {
    gap: `${centerBrand.gapPx}px`,
    left: "50%",
    top: `${toPercent(centerBrand.topPx, FIGMA_INTEGRATION_CARD_FRAME.height)}%`,
    transform: "translateX(-50%)",
  };
}

function getCenterBrandLogoStyle(centerBrand: IntegrationCenterBrandRecipe): CSSProperties {
  return {
    height: `${centerBrand.logoSizePx}px`,
  };
}

function getTabRailStyle(tabRail: IntegrationTabRailRecipe): CSSProperties {
  return {
    bottom: `${toPercent(tabRail.bottomPx, FIGMA_INTEGRATION_CARD_FRAME.height)}%`,
    gap: `${tabRail.gapPx}px`,
    height: `${toPercent(tabRail.heightPx, FIGMA_INTEGRATION_CARD_FRAME.height)}%`,
    padding: `${tabRail.paddingPx}px`,
    width: `${toPercent(tabRail.widthPx, FIGMA_INTEGRATION_CARD_FRAME.width)}%`,
  };
}

export interface IntegrationOrbitCardProps {
  card: IntegrationCard;
  className?: string;
  enableHoverOrbitAnimation?: boolean;
  hideTabs?: boolean;
  maxVisibleOrbitApps: number;
  onViewChange?: (viewId: string) => void;
  viewId?: string;
}

export function IntegrationOrbitCard({
  card,
  className,
  enableHoverOrbitAnimation = true,
  hideTabs = false,
  maxVisibleOrbitApps,
  onViewChange,
  viewId,
}: IntegrationOrbitCardProps) {
  const visualRecipe = getIntegrationCardVisualRecipe(card.id);

  if (!visualRecipe) {
    throw new Error(`Missing integration visual recipe for card "${card.id}".`);
  }

  const cardRef = useRef<HTMLElement>(null);
  const [uncontrolledActiveViewId, setUncontrolledActiveViewId] = useState(card.initialViewId);
  const [cardSize, setCardSize] = useState<{ height: number; width: number }>({
    height: FIGMA_INTEGRATION_CARD_FRAME.height,
    width: FIGMA_INTEGRATION_CARD_FRAME.width,
  });
  const [isHovered, setIsHovered] = useState(false);
  const contentId = useId();
  const prefersReducedMotion = useReducedMotion();
  const activeViewId = viewId ?? uncontrolledActiveViewId;
  const activeView = card.views.find((view) => view.id === activeViewId) ?? card.views[0];
  const activeProvider = activeView.providers[0];
  const shouldShowTabs = !hideTabs && card.views.length > 1 && Boolean(visualRecipe.tabRail);

  if (!activeProvider) {
    throw new Error(`Missing default provider for integration card "${card.id}".`);
  }

  const resolvedMaxVisibleOrbitApps = Math.min(maxVisibleOrbitApps, visualRecipe.visibleSlots.length);
  const visibleOrbitApps = activeProvider.orbitApps.slice(0, resolvedMaxVisibleOrbitApps);
  const canAnimateOrbit =
    enableHoverOrbitAnimation &&
    !prefersReducedMotion &&
    isHovered &&
    activeProvider.orbitApps.length > resolvedMaxVisibleOrbitApps;
  const panelId = shouldShowTabs ? `${contentId.replace(/:/g, "")}-${card.id}-panel` : undefined;
  const headingId = `${contentId.replace(/:/g, "")}-${card.id}-heading`;
  const activeTabId = `${contentId.replace(/:/g, "")}-${card.id}-tab-${activeView.id}`;
  const summary = `${activeView.title}${activeProvider.name ? ` via ${activeProvider.name}` : ""}: ${getVisibleOrbitSummary(
    activeProvider.orbitApps,
    resolvedMaxVisibleOrbitApps,
  ).join(", ")}.`;
  const descriptionText = activeProvider.description ?? activeView.description;
  const descriptionEmphasis = getResolvedDescriptionEmphasis(visualRecipe.descriptionEmphasis, activeProvider.name);

  useEffect(() => {
    const cardNode = cardRef.current;

    if (!cardNode || typeof ResizeObserver === "undefined") {
      return undefined;
    }

    const updateCardSize = () => {
      const nextRect = cardNode.getBoundingClientRect();

      setCardSize((currentSize) => {
        const nextHeight = Number(nextRect.height.toFixed(2));
        const nextWidth = Number(nextRect.width.toFixed(2));

        if (currentSize.height === nextHeight && currentSize.width === nextWidth) {
          return currentSize;
        }

        return {
          height: nextHeight,
          width: nextWidth,
        };
      });
    };

    updateCardSize();

    const resizeObserver = new ResizeObserver(() => {
      updateCardSize();
    });

    resizeObserver.observe(cardNode);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  function handleViewSelect(nextViewId: string) {
    const nextView = card.views.find((view) => view.id === nextViewId) ?? card.views[0];

    if (viewId === undefined) {
      setUncontrolledActiveViewId(nextView.id);
    }

    onViewChange?.(nextView.id);
  }

  function handleHoverStart() {
    setIsHovered(true);
  }

  function handleHoverEnd() {
    setIsHovered(false);
  }

  return (
    <article
      aria-labelledby={headingId}
      className={cn("integration-orbit-card", className)}
      data-card-variant={visualRecipe.cardVariant}
      data-integration-card-id={card.id}
      onMouseEnter={enableHoverOrbitAnimation ? handleHoverStart : undefined}
      onMouseLeave={enableHoverOrbitAnimation ? handleHoverEnd : undefined}
      onMouseOver={enableHoverOrbitAnimation ? handleHoverStart : undefined}
      ref={cardRef}
    >
      <div aria-hidden="true" className="integration-orbit-card__arc-shell" style={getArcShellStyle(visualRecipe)}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt=""
          className="integration-orbit-card__arc-art"
          draggable={false}
          src={visualRecipe.arcFrame.asset.src}
          style={getArcArtStyle(visualRecipe)}
        />
      </div>

      {canAnimateOrbit ? (
        <IntegrationOrbitAnimatedChips
          apps={activeProvider.orbitApps}
          cardSize={cardSize}
          isHovered={isHovered}
          visualRecipe={visualRecipe}
        />
      ) : (
        visibleOrbitApps.map((app, index) => {
          const slot = visualRecipe.visibleSlots[index];

          if (!slot) {
            return null;
          }

          return (
            <div
              aria-hidden="true"
              className="integration-orbit-card__orbit-node"
              data-slot-id={slot.id}
              key={`${activeView.id}-${activeProvider.id}-${app.id}`}
              style={getOrbitNodeStyle(slot)}
            >
              <IntegrationOrbitChip app={app} className="integration-orbit-card__orbit-anchor" slotSizePx={slot.sizePx} />
            </div>
          );
        })
      )}

      <div className="integration-orbit-card__body">
        {visualRecipe.centerBrand && activeView.showProviderBrand && activeProvider.centerLogo ? (
          <div className="integration-orbit-card__center-brand" style={getCenterBrandStyle(visualRecipe.centerBrand)}>
            <IntegrationLogoGraphic
              app={activeProvider.centerLogo}
              className="integration-orbit-card__center-brand-logo"
              style={getCenterBrandLogoStyle(visualRecipe.centerBrand)}
            />
          </div>
        ) : null}

        <div
          aria-labelledby={shouldShowTabs ? activeTabId : headingId}
          className="integration-orbit-card__copy"
          id={panelId}
          role={shouldShowTabs ? "tabpanel" : undefined}
          style={getCopyStyle(visualRecipe)}
        >
          <h3 className="integration-orbit-card__title" id={headingId}>
            {activeView.title}
          </h3>
          <p className="integration-orbit-card__description" style={getDescriptionStyle(visualRecipe.copyFrame)}>
            {renderDescription(descriptionText, descriptionEmphasis)}
          </p>
        </div>
      </div>

      {shouldShowTabs && visualRecipe.tabRail ? (
        <div
          aria-label={`${activeView.title} views`}
          className="integration-orbit-card__tabs"
          role="tablist"
          style={getTabRailStyle(visualRecipe.tabRail)}
        >
          {card.views.map((view, index) => {
            const isActive = view.id === activeView.id;
            const tabId = `${contentId.replace(/:/g, "")}-${card.id}-tab-${view.id}`;

            return (
              <button
                aria-controls={panelId}
                aria-selected={isActive}
                className={cn("integration-orbit-card__tab", isActive && "integration-orbit-card__tab--active")}
                id={tabId}
                key={view.id}
                onClick={() => handleViewSelect(view.id)}
                onKeyDown={(event) => handleViewKeyDown(event, card.views, index, handleViewSelect)}
                role="tab"
                tabIndex={isActive ? 0 : -1}
                type="button"
              >
                {view.label}
              </button>
            );
          })}
        </div>
      ) : null}

      <p className="sr-only">{summary}</p>
    </article>
  );
}
