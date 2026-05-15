import type { ComponentType, ReactNode } from "react";

import { landingDemoVideoContent } from "../content";
import { DemoVideoLightbox } from "./demo-video-lightbox";
import { SectionHeading } from "@/components/system";

export interface DemoVideoSectionProps {
  Shell: ComponentType<{ children: ReactNode }>;
}

export function DemoVideoSection({ Shell }: DemoVideoSectionProps) {
  const demo = landingDemoVideoContent;

  return (
    <section aria-labelledby="demo-heading" className="demo-section">
      <Shell>
        <div className="demo-section__intro surface-subtle border-dashed-sides">
          <SectionHeading
            align="center"
            className="demo-section__heading"
            description={demo.description}
            descriptionClassName="max-w-full"
            headingTag="h2"
            title={<span id="demo-heading">{demo.title}</span>}
            titleClassName="max-w-full"
          />
        </div>

        <DemoVideoLightbox content={demo} />

        <div aria-hidden="true" className="demo-section__footer surface-subtle border-dashed-sides" />
      </Shell>
    </section>
  );
}
