import type { ReactNode } from "react";

import "@/app/(site-pages)/about_us/styles/index.css";

import { SiteFooterPromoSection } from "@/components/layout/footer";

import { aboutUsPageContent } from "./content";

export default function AboutUsLayout({ children }: { children: ReactNode }) {
  const { footerPromo } = aboutUsPageContent;

  return (
    <>
      <main className="about-us-page-main" data-layout-shell="sitePageMain">
        {children}
      </main>
      <SiteFooterPromoSection promo={footerPromo} />
    </>
  );
}
