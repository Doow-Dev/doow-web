import Image from "next/image";
import Link from "next/link";

import type { DoowAiActionSectionContent } from "../content";

export interface DoowAiActionSectionProps {
  section: DoowAiActionSectionContent;
}

export function DoowAiActionSection({ section }: DoowAiActionSectionProps) {
  const headingId = `doow-ai-${section.id}-heading`;

  return (
    <section
      aria-labelledby={headingId}
      className="doow-ai-action"
      data-figma-node-id={section.figmaNodeId}
      id={section.id}
    >
      <div aria-hidden="true" className="doow-ai-action__background">
        <Image
          alt=""
          className="doow-ai-action__background-image"
          height={section.background.height}
          quality={90}
          sizes="120vw"
          src={section.background.src}
          width={section.background.width}
        />
      </div>
      <div aria-hidden="true" className="doow-ai-action__overlay" />

      <div className="doow-ai-action__content">
        <div className="doow-ai-action__copy">
          <h2 className="doow-ai-action__title" id={headingId}>
            {section.heading}
          </h2>
          <p className="doow-ai-action__description max-md:text-body-sm-normal">{section.description}</p>
          <Link className="doow-ai-action__cta" href={section.cta.href}>
            <span className="doow-ai-action__cta-image-frame" aria-hidden="true">
              <Image
                alt=""
                className="doow-ai-action__cta-image"
                height={section.cta.image.height}
                src={section.cta.image.src}
                width={section.cta.image.width}
              />
            </span>
            <span className="doow-ai-action__cta-label">{section.cta.label}</span>
          </Link>
        </div>

        <div aria-label={`${section.heading} chat interface preview`} className="doow-ai-action__media" role="img">
          {/* TODO: Replace this static placeholder with the canonical video blob URL when it is published. */}
          <Image
            alt=""
            className="doow-ai-action__media-image"
            height={section.placeholder.height}
            src={section.placeholder.src}
            unoptimized
            width={section.placeholder.width}
          />
        </div>
      </div>
    </section>
  );
}
