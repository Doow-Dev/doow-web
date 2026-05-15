import type { FaqSectionContent } from "@/components/layout/faq";
import { siteFooterPromoPresets, type SiteFooterPromo } from "@/components/layout/footer";

import { pricingFaqContent } from "./faq-content";
import { pricingPlansContent, type PricingPlansContent } from "./plans-content";

export interface PricingPageContent {
  faq: FaqSectionContent;
  footerPromo: SiteFooterPromo;
  plans: PricingPlansContent;
}

export const pricingPageContent = {
  plans: pricingPlansContent,
  faq: pricingFaqContent,
  footerPromo: siteFooterPromoPresets.doowAiQuestions,
} as const satisfies PricingPageContent;
