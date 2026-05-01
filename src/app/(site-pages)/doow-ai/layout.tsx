import type { ReactNode } from "react";

import "@/app/(site-pages)/doow-ai/styles/index.css";

import { SiteFooterPromoSection } from "@/components/layout/footer";

import { doowAiPageContent } from "./content";

export default function DoowAiLayout({ children }: { children: ReactNode }) {
  const { footerPromo } = doowAiPageContent;

  return (
    <>
      <main data-layout-shell="sitePageMain">{children}</main>
      <SiteFooterPromoSection promo={footerPromo} />
    </>
  );
}
