import type { ReactNode } from "react";

import "@/app/(site-pages)/integrations/styles/index.css";

import { SiteFooterPromoSection } from "@/components/layout/footer";

import { integrationsPageContent } from "./content";

export default function IntegrationsLayout({ children }: { children: ReactNode }) {
  const { footerPromo } = integrationsPageContent;

  return (
    <>
      <main data-layout-shell="sitePageMain">{children}</main>
      <SiteFooterPromoSection promo={footerPromo} />
    </>
  );
}
