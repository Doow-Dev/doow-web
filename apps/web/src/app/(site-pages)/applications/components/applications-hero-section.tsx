import Image from "next/image";
import Link from "next/link";

import { SitePageSectionShell } from "@/app/(site-pages)/_components/site-page-section-shell";
import { applicationsPageContent } from "@/app/(site-pages)/applications/content";
import { ApplicationsHeroAnimatedPills } from "@/app/(site-pages)/applications/components/applications-hero-animated-pills";
import { Badge, Button } from "@/components/system";

export function ApplicationsHeroSection() {
  const hero = applicationsPageContent.hero;

  return (
    <section aria-labelledby="applications-hero-heading" className="applications-hero" id={hero.id}>
      <SitePageSectionShell className="applications-hero__shell" section={hero.id}>
        <div className="applications-hero__content">
          <Badge className="applications-hero__badge" variant="muted">
            {hero.eyebrow}
          </Badge>

          <div className="applications-hero__copy">
            <h1 className="applications-hero__title" id="applications-hero-heading">
              {hero.title.firstLine}{" "}
              <span className="applications-hero__title-accent-line text-gradient-site-page-hero">
                <span className="applications-hero__title-prefix">{hero.title.secondLinePrefix} </span>
                <span className="applications-hero__title-accent">{hero.title.accent}</span>
              </span>
            </h1>

            <p className="applications-hero__description text-body-sm-normal">{hero.description}</p>
          </div>

          <Button asChild className="applications-hero__cta" size="base" variant="primary">
            <Link href={hero.cta.href}>{hero.cta.label}</Link>
          </Button>
        </div>
      </SitePageSectionShell>

      <div aria-hidden="true" className="applications-hero__visual-shell">
        <ApplicationsHeroAnimatedPills field={hero.pillField} />

        <div className="applications-hero__foreground">
          <Image
            alt=""
            className="applications-hero__foreground-image"
            height={hero.foreground.height}
            priority
            quality={90}
            sizes="(min-width: 1440px) 918px, (min-width: 1024px) 64vw, (min-width: 768px) 70vw, calc(100vw - 24px)"
            src={hero.foreground.src}
            width={hero.foreground.width}
          />
        </div>

        <div className="applications-hero__fade" />
      </div>
    </section>
  );
}
