import type { AlternativeRecommendation } from "../content";
import { ScrollThumbRail, useScrollThumb } from "@/components/layout/shared";

import { AlternativeAppCard } from "./alternative-app-card";

export interface AlternativeAppsScrollerProps {
  currentAppName: string;
  alternativesCount: number;
  alternatives: readonly AlternativeRecommendation[];
}

export function AlternativeAppsScroller({
  currentAppName,
  alternativesCount,
  alternatives,
}: AlternativeAppsScrollerProps) {
  const { contentRef, thumbState, viewportRef } = useScrollThumb<HTMLDivElement, HTMLOListElement>({
    orientation: "horizontal",
  });

  return (
    <div className="alternative-apps-scroller" data-alternative-apps-surface="scroller">
      <div className="alternative-apps-scroller__intro">
        <h3 className="alternative-apps-scroller__title">{currentAppName} alternatives</h3>
        <p className="alternative-apps-scroller__description">
          See how <strong>{currentAppName}</strong> compares to <strong>{alternativesCount}</strong> alternative apps you can
          switch to.
        </p>
      </div>

      <div
        aria-label={`${currentAppName} alternative applications`}
        className="alternative-apps-scroller__viewport scrollbar-hidden"
        ref={viewportRef}
        tabIndex={0}
      >
        <ol className="alternative-apps-scroller__list" ref={contentRef}>
          {alternatives.map((alternative) => (
            <AlternativeAppCard alternative={alternative} key={alternative.id} />
          ))}
        </ol>
      </div>

      <div aria-hidden="true" className="alternative-apps-scroller__rail-shell">
        <ScrollThumbRail
          className="alternative-apps-scroller__rail"
          hidden={thumbState.hidden}
          offsetPercentage={thumbState.offsetPercentage}
          sizePercentage={thumbState.sizePercentage}
        />
      </div>
    </div>
  );
}
