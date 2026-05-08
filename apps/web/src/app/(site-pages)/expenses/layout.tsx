import type { ReactNode } from "react";

import "@/app/(landing)/_components/integrations/styles/index.css";
import "@/app/(site-pages)/expenses/styles/index.css";

import { SiteFooterPromoSection } from "@/components/layout/footer";

import { expensesPageContent } from "./content";

export default function ExpensesLayout({ children }: { children: ReactNode }) {
  const { footerPromo } = expensesPageContent;

  return (
    <>
      <main data-layout-shell="sitePageMain">{children}</main>
      <SiteFooterPromoSection promo={footerPromo} />
    </>
  );
}
