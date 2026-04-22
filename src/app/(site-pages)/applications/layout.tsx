import type { ReactNode } from "react";

import { SiteFooterPromoSection } from "@/components/layout/footer";

import { applicationsPageContent } from "./content";

export default function ApplicationsLayout({ children }: { children: ReactNode }) {
  const { footerPromo } = applicationsPageContent;

  return (
    <>
      <main data-layout-shell="sitePageMain">{children}</main>
      <SiteFooterPromoSection promo={footerPromo} />
    </>
  );
}
