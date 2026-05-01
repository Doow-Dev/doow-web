import type { ReactNode } from "react";

import "@/app/(site-pages)/pricing/styles/index.css";

import { SiteFooterPromoSection } from "@/components/layout/footer";

import { pricingPageContent } from "./content";

export default function PricingLayout({ children }: { children: ReactNode }) {
  const { footerPromo } = pricingPageContent;

  return (
    <>
      <main data-layout-shell="sitePageMain">{children}</main>
      <SiteFooterPromoSection promo={footerPromo} />
    </>
  );
}
