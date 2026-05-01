import type { ReactNode } from "react";

import "@/app/(site-pages)/alternative-apps/styles/index.css";

import { SiteFooterPromoSection } from "@/components/layout/footer";

import { alternativeAppsPageContent } from "./content";

export default function AlternativeAppsLayout({ children }: { children: ReactNode }) {
  const { footerPromo } = alternativeAppsPageContent;

  return (
    <>
      <main data-layout-shell="sitePageMain">{children}</main>
      <SiteFooterPromoSection promo={footerPromo} />
    </>
  );
}
