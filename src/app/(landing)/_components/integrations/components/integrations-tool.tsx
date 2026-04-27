"use client";

import type { IntegrationsSectionContent } from "../content";
import { IntegrationOrbitCard } from "./integration-orbit-card";

export interface IntegrationsToolProps {
  content: IntegrationsSectionContent;
}

export function IntegrationsTool({ content }: IntegrationsToolProps) {
  return (
    <div className="integrations__grid-shell" data-integration-grid-shell="true">
      <div className="integrations__grid" data-integration-grid="true">
        {content.cards.map((card) => (
          <IntegrationOrbitCard card={card} key={card.id} maxVisibleOrbitApps={content.maxVisibleOrbitApps} />
        ))}
      </div>
    </div>
  );
}
