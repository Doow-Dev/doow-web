import type { FaqSectionContent } from "@/components/layout/faq";
import { siteFooterPromoPresets, type SiteFooterPromo } from "@/components/layout/footer";

import { expensesClarityContent, type ExpensesClarityContent } from "./clarity-content";
import { expensesFaqContent } from "./faq-content";
import { expensesHeroContent, type ExpensesHeroContent } from "./hero-content";
import { expensesSpendSourcesContent, type ExpensesSpendSourcesContent } from "./spend-sources-content";

export interface ExpensesPageContent {
  hero: ExpensesHeroContent;
  spendSources: ExpensesSpendSourcesContent;
  clarity: ExpensesClarityContent;
  faq: FaqSectionContent;
  footerPromo: SiteFooterPromo;
}

export const expensesPageContent = {
  hero: expensesHeroContent,
  spendSources: expensesSpendSourcesContent,
  clarity: expensesClarityContent,
  faq: expensesFaqContent,
  footerPromo: siteFooterPromoPresets.expensesVisibility,
} as const satisfies ExpensesPageContent;
