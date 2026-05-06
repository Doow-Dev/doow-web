import Image from "next/image";
import Link from "next/link";

import { Button, SectionHeading } from "@/components/system";

import { doowAiPageContent } from "../content";

export function DoowAiHeroSection() {
  const { hero } = doowAiPageContent;

  return (
    <section aria-labelledby="doow-ai-hero-heading" className="doow-ai-hero">
      <div className="doow-ai-hero__content">
        <SectionHeading
          align="center"
          className="doow-ai-hero__heading"
          description={hero.description}
          descriptionClassName="doow-ai-hero__description max-md:text-body-sm-normal"
          descriptionVariant="md"
          eyebrow={hero.eyebrow}
          eyebrowVariant="muted"
          headingTag="h1"
          stackClassName="doow-ai-hero__heading-stack"
          title={<span id="doow-ai-hero-heading">{hero.title}</span>}
          titleClassName="doow-ai-hero__title"
        />
      </div>

      <div aria-hidden="true" className="doow-ai-hero__visual">
        <div className="doow-ai-hero__image-wrap">
          <Image
            priority
            alt=""
            className="doow-ai-hero__image"
            height={hero.illustration.height}
            quality={90}
            sizes="(min-width: 1440px) 1398px, (min-width: 1024px) 96vw, (min-width: 768px) 120vw, 165vw"
            src={hero.illustration.src}
            width={hero.illustration.width}
          />
          <span className="doow-ai-hero__visual-overlay" />
        </div>
      </div>

      <div className="doow-ai-hero__outro">
        <p className="doow-ai-hero__quote max-md:text-body-sm-normal">{hero.quote}</p>

        <Button asChild className="doow-ai-hero__cta" size="base">
          <Link href={hero.cta.href} rel={hero.cta.rel} target={hero.cta.target}>
            {hero.cta.label}
          </Link>
        </Button>
      </div>
    </section>
  );
}
