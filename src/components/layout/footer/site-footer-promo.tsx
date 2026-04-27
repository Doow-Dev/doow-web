import Image from "next/image";
import Link from "next/link";

import { Button, Container } from "@/components/system";
import { FOOTER_DASHBOARD_BLUR_DATA_URL } from "@/lib/assets/blur-placeholders";

import type { SiteFooterPromo as SiteFooterPromoContent } from "./content";

export interface SiteFooterPromoProps {
  promo: SiteFooterPromoContent;
}

export function SiteFooterPromoSection({ promo }: SiteFooterPromoProps) {
  const headingId = promo.id ? `${promo.id}-heading` : "site-footer-promo-heading";
  const isDashboard = promo.kind === "dashboard";

  return (
    <section
      aria-labelledby={headingId}
      className="site-footer-promo"
      data-site-footer-promo-kind={promo.kind}
      id={promo.id}
    >
      <Container
        className="site-footer-promo__shell"
        data-layout-shell="siteFooterPromoShell"
        data-section="footer-promo"
        variant="siteFooterPromo"
      >
        <div className="site-footer-promo__card" data-site-footer-promo-kind={promo.kind}>
          <div aria-hidden="true" className="site-footer-promo__gradient" />
          <div aria-hidden="true" className="site-footer-promo__grain" />
          <div aria-hidden="true" className="site-footer-promo__surface-outline" />

          <div className="site-footer-promo__copy">
            <h2 className="site-footer-promo__title" id={headingId}>
              {promo.title}
            </h2>

            {"description" in promo ? <p className="site-footer-promo__description">{promo.description}</p> : null}

            <Button asChild className="site-footer-promo__cta" size="md" variant="secondary">
              <Link href={promo.cta.href} rel={promo.cta.rel} target={promo.cta.target}>
                {promo.cta.label}
              </Link>
            </Button>

            {isDashboard ? <p className="site-footer-promo__supporting-text">{promo.supportingText}</p> : null}
          </div>

          {isDashboard ? (
            <div className="site-footer-promo__dashboard-frame">
              <Image
                alt={promo.dashboard.alt}
                blurDataURL={FOOTER_DASHBOARD_BLUR_DATA_URL}
                className="site-footer-promo__dashboard-image"
                height={promo.dashboard.height}
                placeholder="blur"
                quality={90}
                sizes="(min-width: 1408px) 1059px, (min-width: 1216px) calc(100vw - 157px), (min-width: 768px) calc(100vw - 48px), calc(100vw - 32px)"
                src={promo.dashboard.src}
                style={{ width: "100%", height: "auto" }}
                width={promo.dashboard.width}
              />
            </div>
          ) : null}
        </div>
      </Container>
    </section>
  );
}
