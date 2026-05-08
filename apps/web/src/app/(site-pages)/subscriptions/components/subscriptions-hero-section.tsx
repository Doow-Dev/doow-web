import Image from "next/image";
import Link from "next/link";

import { SitePageSectionShell } from "@/app/(site-pages)/_components/site-page-section-shell";
import { subscriptionsPageContent } from "@/app/(site-pages)/subscriptions/content";
import { Badge, Button } from "@/components/system";

export function SubscriptionsHeroSection() {
  const hero = subscriptionsPageContent.hero;

  return (
    <section aria-labelledby="subscriptions-hero-heading" className="subscriptions-hero" id={hero.id}>
      <div aria-hidden="true" className="subscriptions-hero__color-gradient" />

      <div aria-hidden="true" className="subscriptions-hero__illustration">
        <div
          className="subscriptions-hero__illustration-mask"
          style={{
            WebkitMaskImage: `url("${hero.illustration.mask.src}")`,
            maskImage: `url("${hero.illustration.mask.src}")`,
          }}
        >
          <div className="subscriptions-hero__illustration-art">
            <Image
              alt=""
              className="subscriptions-hero__illustration-image"
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

      <SitePageSectionShell className="subscriptions-hero__shell" section={hero.id}>
        <div className="subscriptions-hero__content">
          <Badge className="subscriptions-hero__badge" variant="muted">
            {hero.eyebrow}
          </Badge>

          <div className="subscriptions-hero__copy">
            <h1 className="subscriptions-hero__title" id="subscriptions-hero-heading">
              {hero.title}
            </h1>
            <p className="subscriptions-hero__description text-body-sm-normal">{hero.description}</p>
          </div>

          <Button asChild className="subscriptions-hero__cta" size="base" variant="primary">
            <Link href={hero.cta.href}>{hero.cta.label}</Link>
          </Button>
        </div>
      </SitePageSectionShell>

      <div aria-hidden="true" className="subscriptions-hero__dashboard-shell">
        <Image
          alt=""
          className="subscriptions-hero__dashboard-image"
          height={hero.dashboard.height}
          priority
          sizes="(min-width: 1024px) 847px, calc(100vw - 24px)"
          src={hero.dashboard.src}
          unoptimized
          width={hero.dashboard.width}
        />
      </div>
    </section>
  );
}
