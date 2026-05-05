import type { ComponentType, SVGProps } from "react";

import { GrayBulbIcon } from "@/components/custom/icons/gray-bulb-icon";
import { ReflectionIcon } from "@/components/custom/icons/reflection-icon";
import { SecurityIcon } from "@/components/custom/icons/security-icon";
import { SiteFeatureCardGrid } from "@/app/(site-pages)/_components/site-feature-card-grid";

import type { DoowAiFeatureCardIcon, DoowAiFeatureSectionContent } from "../content";

const featureIcons: Record<DoowAiFeatureCardIcon, ComponentType<SVGProps<SVGSVGElement>>> = {
  reflection: ReflectionIcon,
  reliability: GrayBulbIcon,
  security: SecurityIcon,
};

export interface DoowAiFeaturesSectionProps {
  content: DoowAiFeatureSectionContent;
}

export function DoowAiFeaturesSection({ content }: DoowAiFeaturesSectionProps) {
  const headingId = `${content.id}-heading`;

  return (
    <section
      aria-labelledby={headingId}
      className="doow-ai-features"
      data-figma-node-id={content.figmaNodeId}
      id={content.id}
    >
      <div className="doow-ai-features__layout">
        <div className="doow-ai-features__heading">
          <h2 className="doow-ai-features__title" id={headingId}>
            {content.title}
          </h2>
          <p className="doow-ai-features__description">{content.description}</p>
        </div>

        <SiteFeatureCardGrid
          classNames={{
            card: "doow-ai-features__card",
            copy: "doow-ai-features__card-copy",
            description: "doow-ai-features__card-description",
            grid: "doow-ai-features__grid",
            iconWrap: "doow-ai-features__icon-wrap",
            title: "doow-ai-features__card-title",
          }}
          items={content.cards.map((card, index) => {
            const Icon = featureIcons[card.icon];

            return {
              description: card.description,
              icon: <Icon className="doow-ai-features__icon" />,
              id: `${card.title}-${index}`,
              title: card.title,
              tone: card.tone,
            };
          })}
        />
      </div>
    </section>
  );
}
