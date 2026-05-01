import type { ComponentType, SVGProps } from "react";

import { GrayBulbIcon } from "@/components/custom/icons/gray-bulb-icon";
import { ReflectionIcon } from "@/components/custom/icons/reflection-icon";
import { SecurityIcon } from "@/components/custom/icons/security-icon";

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

        <ul className="doow-ai-features__grid">
          {content.cards.map((card, index) => {
            const Icon = featureIcons[card.icon];

            return (
              <li className="doow-ai-features__card" data-tone={card.tone} key={`${card.title}-${index}`}>
                <span aria-hidden="true" className="doow-ai-features__icon-wrap">
                  <Icon className="doow-ai-features__icon" />
                </span>
                <div className="doow-ai-features__card-copy">
                  <h3 className="doow-ai-features__card-title">{card.title}</h3>
                  <p className="doow-ai-features__card-description">{card.description}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
