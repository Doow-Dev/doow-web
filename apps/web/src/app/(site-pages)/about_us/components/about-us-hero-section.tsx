import Link from "next/link";

import { SitePageSectionShell } from "@/app/(site-pages)/_components/site-page-section-shell";
import { aboutUsPageContent } from "@/app/(site-pages)/about_us/content";
import { Badge, Button } from "@/components/system";

export function AboutUsHeroSection() {
  const hero = aboutUsPageContent.hero;

  return (
    <section aria-labelledby="about-us-hero-heading" className="about-us-hero" id={hero.id}>
      <SitePageSectionShell className="about-us-hero__shell" section={hero.id}>
        <div className="about-us-hero__content">
          <Badge className="about-us-hero__badge" variant="muted">
            {hero.eyebrow}
          </Badge>

          <div className="about-us-hero__copy">
            <h1 className="about-us-hero__title" id="about-us-hero-heading">
              {hero.title}
            </h1>
            <p className="about-us-hero__description text-body-sm-normal">{hero.description}</p>
          </div>

          <Button asChild className="about-us-hero__cta" size="base" variant="primary">
            <Link href={hero.cta.href}>{hero.cta.label}</Link>
          </Button>
        </div>
      </SitePageSectionShell>
    </section>
  );
}
