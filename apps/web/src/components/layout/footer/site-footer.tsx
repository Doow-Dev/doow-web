import { siteFooterBodyContent, type SiteFooterProps } from "./content";
import { SiteFooterBody } from "./site-footer-body";
import { SiteFooterPromoSection } from "./site-footer-promo";

export function SiteFooter({ promo, body = siteFooterBodyContent }: SiteFooterProps) {
  const promoKind = promo?.kind ?? "none";

  return (
    <div className="site-footer-stack" data-site-footer-promo-kind={promoKind}>
      {promo ? <SiteFooterPromoSection promo={promo} /> : null}
      <SiteFooterBody body={body} />
    </div>
  );
}
