import Image from "next/image";
import Link from "next/link";

import { SitePageSectionShell } from "@/app/(site-pages)/_components/site-page-section-shell";
import { integrationsPageContent } from "@/app/(site-pages)/integrations/content";
import { Badge, Button } from "@/components/system";

export function IntegrationsHeroSection() {
  const hero = integrationsPageContent.hero;

  return (
    <section aria-labelledby="integrations-hero-heading" className="integrations-hero" id={hero.id}>
      <div aria-hidden="true" className="integrations-hero__bottom-gradient surface-gradient-integrations-bottom" />

      <div aria-hidden="true" className="integrations-hero__illustration">
        <div
          className="integrations-hero__illustration-mask"
          style={{
            WebkitMaskImage: `url("${hero.illustration.mask.src}")`,
            maskImage: `url("${hero.illustration.mask.src}")`,
          }}
        >
          <div className="integrations-hero__illustration-art">
            <Image
              alt=""
              className="integrations-hero__illustration-image"
              fill
              priority
              sizes="100vw"
              src={hero.illustration.art.src}
              style={{ objectFit: "fill" }}
              unoptimized
            />
          </div>
        </div>
      </div>

      <SitePageSectionShell className="integrations-hero__shell" section={hero.id}>
        <div className="integrations-hero__content">
          <Badge className="integrations-hero__badge" variant="muted">
            {hero.eyebrow}
          </Badge>

          <div className="integrations-hero__copy">
            <h1 className="integrations-hero__title" id="integrations-hero-heading">
              <span className="text-gradient-site-page-hero">{hero.title.gradient}</span> {hero.title.remainder}
            </h1>

            <p className="integrations-hero__description text-lead">{hero.description}</p>
          </div>

          <Button asChild className="integrations-hero__cta" size="base" variant="primary">
            <Link href={hero.cta.href}>{hero.cta.label}</Link>
          </Button>
        </div>
      </SitePageSectionShell>
    </section>
  );
}
