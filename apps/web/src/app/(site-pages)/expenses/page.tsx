import type { ReactNode } from "react";

import type { Metadata } from "next";

import { SitePageSectionShell } from "@/app/(site-pages)/_components/site-page-section-shell";
import { ExpensesClaritySection } from "@/app/(site-pages)/expenses/components/expenses-clarity-section";
import { ExpensesHeroSection } from "@/app/(site-pages)/expenses/components/expenses-hero-section";
import { ExpensesSpendSourcesSection } from "@/app/(site-pages)/expenses/components/expenses-spend-sources-section";
import { SiteFaqSection } from "@/components/layout/faq";

import { expensesPageContent } from "./content";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.doow.co";
const expensesDescription =
  "See where your software money actually goes across cards, banks, and accounting systems in one place.";

export const metadata: Metadata = {
  title: "Expenses",
  description: expensesDescription,
  openGraph: {
    title: "Expenses | Doow",
    description: expensesDescription,
    url: `${siteUrl}/expenses`,
    type: "website",
  },
};

function FaqShell({ children }: { children: ReactNode }) {
  return <SitePageSectionShell section="faq">{children}</SitePageSectionShell>;
}

export default function ExpensesPage() {
  return (
    <>
      <ExpensesHeroSection />
      <ExpensesSpendSourcesSection />
      <ExpensesClaritySection />
      <SiteFaqSection Shell={FaqShell} content={expensesPageContent.faq} />
    </>
  );
}
