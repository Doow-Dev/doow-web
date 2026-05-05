import type { ReactNode } from "react";

import "@/app/(site-pages)/blog/styles/index.css";

import { SiteFooterPromoSection, siteFooterPromoPresets } from "@/components/layout/footer";

export default function BlogLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <main data-layout-shell="sitePageMain">{children}</main>
      <SiteFooterPromoSection promo={siteFooterPromoPresets.doowAiQuestions} />
    </>
  );
}
