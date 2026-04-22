import type { ComponentType, ReactNode } from "react";
import Link from "next/link";

import { landingPageContent } from "@/app/(landing)/_components/landing-page-content";
import { Button, SectionHeading } from "@/components/system";
import { getAlternativeAppsResponse } from "@/lib/site/alternative-apps";

import { AlternativeAppsTool } from "./alternative-apps-tool";

export interface AlternativeAppsSectionProps {
  Shell: ComponentType<{ children: ReactNode }>;
}

export async function AlternativeAppsSection({ Shell }: AlternativeAppsSectionProps) {
  const alternativeApps = landingPageContent.alternativeApps;
  const initialData = await getAlternativeAppsResponse(alternativeApps.initialSelectedAppId);

  return (
    <section
      aria-labelledby="alternative-apps-heading"
      className="alternative-apps"
      id={alternativeApps.id}
    >
      <Shell>
        <div className="alternative-apps__layout">
          <SectionHeading
            align="center"
            className="alternative-apps__heading"
            description={
              <>
                {alternativeApps.descriptionLines[0]}
                <br />
                {alternativeApps.descriptionLines[1]}
              </>
            }
            descriptionClassName="alternative-apps__heading-description"
            eyebrow={alternativeApps.eyebrow}
            eyebrowVariant="saasIntelligence"
            headingTag="h2"
            stackClassName="alternative-apps__heading-stack"
            title={
              <span id="alternative-apps-heading">
                {alternativeApps.titleLines[0]}
                <br />
                {alternativeApps.titleLines[1]}
              </span>
            }
            titleClassName="alternative-apps__heading-title"
          />

          <AlternativeAppsTool initialData={initialData} />

          <div className="alternative-apps__cta">
            <Button asChild className="alternative-apps__cta-button">
              <Link href={alternativeApps.analysisCta.href} rel="noopener noreferrer" target="_blank">
                {alternativeApps.analysisCta.label}
              </Link>
            </Button>
          </div>
        </div>
      </Shell>
    </section>
  );
}
