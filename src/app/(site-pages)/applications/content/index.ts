import type { FaqSectionContent } from "@/components/layout/faq";
import { siteFooterPromoPresets, type SiteFooterPromo } from "@/components/layout/footer";

import { applicationsFaqContent } from "./faq-content";
import { applicationsHeroContent, type ApplicationsHeroContent } from "./hero-content";
import {
  applicationsProblemsContent,
  type ApplicationsProblemsSectionContent,
} from "./problems-content";

export interface ApplicationsPageContent {
  hero: ApplicationsHeroContent;
  problems: ApplicationsProblemsSectionContent;
  faq: FaqSectionContent;
  footerPromo: SiteFooterPromo;
}

export const applicationsPageContent = {
  hero: applicationsHeroContent,
  problems: applicationsProblemsContent,
  faq: applicationsFaqContent,
  footerPromo: siteFooterPromoPresets.compactWithDescription,
} as const satisfies ApplicationsPageContent;
