import type { ComponentType, ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";

import { SectionHeading } from "@/components/system";

import { siteFaqChrome } from "./constants";
import { FaqTool } from "./faq-tool";
import type { FaqSectionContent } from "./types";

export interface SiteFaqSectionProps {
  Shell: ComponentType<{ children: ReactNode }>;
  content: FaqSectionContent;
}

export function SiteFaqSection({ Shell, content }: SiteFaqSectionProps) {
  return (
    <section aria-labelledby="faq-heading" className="faq-section" id={siteFaqChrome.sectionId}>
      <Shell>
        <div className="faq-section__frame">
          <div aria-hidden="true" className="faq-section__background">
            <Image
              fill
              alt=""
              className="faq-section__background-image"
              sizes="100vw"
              src={siteFaqChrome.backgroundIllustration.src}
            />
          </div>

          <div className="faq-section__layout">
            <SectionHeading
              align="center"
              className="faq-section__heading"
              description={
                <>
                  {siteFaqChrome.descriptionPrefix}
                  <Link className="faq-section__contact-link" href={`mailto:${siteFaqChrome.contactEmail}`}>
                    {siteFaqChrome.contactEmail}
                  </Link>
                  {siteFaqChrome.descriptionSuffix}
                </>
              }
              descriptionClassName="faq-section__heading-description"
              eyebrow={siteFaqChrome.eyebrow}
              eyebrowVariant="faq"
              headingTag="h2"
              stackClassName="faq-section__heading-stack"
              title={<span id="faq-heading">{siteFaqChrome.title}</span>}
              titleClassName="faq-section__heading-title"
            />

            <FaqTool content={content} />
          </div>
        </div>
      </Shell>
    </section>
  );
}
