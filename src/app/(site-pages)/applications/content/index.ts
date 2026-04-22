import type { FaqSectionContent } from "@/components/layout/faq";
import { siteFooterPromoPresets, type SiteFooterPromo } from "@/components/layout/footer";

import { applicationsFaqContent } from "./faq-content";

export interface ApplicationsPageContent {
  faq: FaqSectionContent;
  footerPromo: SiteFooterPromo;
}

export const applicationsPageContent = {
  faq: applicationsFaqContent,
  footerPromo: siteFooterPromoPresets.compactWithDescription,
} as const satisfies ApplicationsPageContent;
