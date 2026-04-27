import type { ReactNode } from "react";

import "@/app/(site-pages)/subscriptions/styles/index.css";

import { SiteFooterPromoSection } from "@/components/layout/footer";

import { subscriptionsPageContent } from "./content";

export default function SubscriptionsLayout({ children }: { children: ReactNode }) {
  const { footerPromo } = subscriptionsPageContent;

  return (
    <>
      <main data-layout-shell="sitePageMain">{children}</main>
      <SiteFooterPromoSection promo={footerPromo} />
    </>
  );
}
