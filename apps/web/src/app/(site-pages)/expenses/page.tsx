import type { ReactNode } from "react";

import type { Metadata } from "next";

import { SitePageSectionShell } from "@/app/(site-pages)/_components/site-page-section-shell";
import { ExpensesClaritySection } from "@/app/(site-pages)/expenses/components/expenses-clarity-section";
import { ExpensesHeroSection } from "@/app/(site-pages)/expenses/components/expenses-hero-section";
import { ExpensesSpendSourcesSection } from "@/app/(site-pages)/expenses/components/expenses-spend-sources-section";
import { SiteFaqSection } from "@/components/layout/faq";
import { JsonLd, buildBreadcrumbJsonLd, buildFaqJsonLd, buildSiteMetadata, buildWebPageJsonLd, siteRouteSeo } from "@/lib/seo/site";

import { expensesPageContent } from "./content";

export const metadata: Metadata = buildSiteMetadata(siteRouteSeo.expenses);

function FaqShell({ children }: { children: ReactNode }) {
  return <SitePageSectionShell section="faq">{children}</SitePageSectionShell>;
}

export default function ExpensesPage() {
  const faqJsonLd = buildFaqJsonLd(expensesPageContent.faq);

  return (
    <>
      <JsonLd data={buildWebPageJsonLd(siteRouteSeo.expenses)} />
      <JsonLd data={buildBreadcrumbJsonLd([{ href: "/", label: "Home" }, { href: "/expenses", label: "Expenses" }])} />
      {faqJsonLd ? <JsonLd data={faqJsonLd} /> : null}
      <ExpensesHeroSection />
      <ExpensesSpendSourcesSection />
      <ExpensesClaritySection />
      <SiteFaqSection Shell={FaqShell} content={expensesPageContent.faq} />
    </>
  );
}
