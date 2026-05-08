import type { ComponentType, ReactNode } from "react";

import Image from "next/image";
import Link from "next/link";

import { landingPageContent } from "@/app/(landing)/_components/landing-page-content";
import { Button, SectionHeading } from "@/components/system";

export interface DoowAiSectionProps {
  Shell: ComponentType<{ children: ReactNode }>;
}

export function DoowAiSection({ Shell }: DoowAiSectionProps) {
  const doowAi = landingPageContent.doowAi;

  return (
    <section aria-labelledby="doow-ai-heading" className="doow-ai" id={doowAi.id}>
      <Shell>
        <div className="doow-ai__layout">
          <SectionHeading
            align="center"
            className="doow-ai__heading"
            description={doowAi.description}
            descriptionVariant="md"
            eyebrow={doowAi.eyebrow}
            eyebrowVariant="muted"
            headingTag="h2"
            stackClassName="doow-ai__heading-stack"
            title={<span id="doow-ai-heading">{doowAi.title}</span>}
          />

          <Button asChild className="doow-ai__cta" size="base">
            <Link href={doowAi.cta.href}>{doowAi.cta.label}</Link>
          </Button>
        </div>
      </Shell>

      <div aria-hidden="true" className="doow-ai__visual-shell">
        <div className="doow-ai__visual-wrap">
          <Image
            alt=""
            className="doow-ai__visual-image"
            height={doowAi.illustration.height}
            quality={90}
            sizes="(min-width: 1440px) 1398px, (min-width: 1024px) 100vw, 135vw"
            src={doowAi.illustration.src}
            width={doowAi.illustration.width}
          />
        </div>
      </div>
    </section>
  );
}
