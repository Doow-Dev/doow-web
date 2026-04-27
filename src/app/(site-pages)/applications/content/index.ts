import type { FaqSectionContent } from "@/components/layout/faq";
import { siteFooterPromoPresets, type SiteFooterPromo } from "@/components/layout/footer";

import { applicationsFaqContent } from "./faq-content";
import { applicationsHeroContent, type ApplicationsHeroContent } from "./hero-content";

export interface ApplicationsPageContent {
  hero: ApplicationsHeroContent;
  faq: FaqSectionContent;
  footerPromo: SiteFooterPromo;
}

export const applicationsPageContent = {
  hero: applicationsHeroContent,
  faq: applicationsFaqContent,
  footerPromo: siteFooterPromoPresets.compactWithDescription,
} as const satisfies ApplicationsPageContent;
