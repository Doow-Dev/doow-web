import type { ComponentType, ReactNode } from "react";
import Link from "next/link";

import { landingPageContent } from "@/app/(landing)/_components/landing-page-content";
import { Button, SectionHeading } from "@/components/system";

import { IntegrationsTool } from "./integrations-tool";

export interface IntegrationsSectionProps {
  Shell: ComponentType<{ children: ReactNode }>;
}

export function IntegrationsSection({ Shell }: IntegrationsSectionProps) {
  const integrations = landingPageContent.integrations;

  return (
    <section aria-labelledby="integrations-heading" className="integrations" id={integrations.id}>
      <Shell>
        <div className="integrations__layout">
          <SectionHeading
            align="center"
            className="integrations__heading"
            description={integrations.description}
            descriptionClassName="integrations__heading-description"
            headingTag="h2"
            stackClassName="integrations__heading-stack"
            title={<span id="integrations-heading">{integrations.title}</span>}
            titleClassName="text-shadow-none"
          />

          <div className="integrations__cta">
            <Button asChild className="integrations__cta-button">
              <Link href={integrations.cta.href}>{integrations.cta.label}</Link>
            </Button>
          </div>

          <IntegrationsTool content={integrations} />
        </div>
      </Shell>
    </section>
  );
}
