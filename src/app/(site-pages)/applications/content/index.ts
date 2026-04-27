import type { FaqSectionContent } from "@/components/layout/faq";
import { siteFooterPromoPresets, type SiteFooterPromo } from "@/components/layout/footer";

import {
  applicationsFeaturesSolutionsContent,
  type ApplicationsFeaturesSolutionsSectionContent,
} from "./features-solutions-content";
import { applicationsFaqContent } from "./faq-content";
import { applicationsHeroContent, type ApplicationsHeroContent } from "./hero-content";
import {
  applicationsProblemsContent,
  type ApplicationsProblemsSectionContent,
} from "./problems-content";

export interface ApplicationsPageContent {
  hero: ApplicationsHeroContent;
  problems: ApplicationsProblemsSectionContent;
  featuresSolutions: ApplicationsFeaturesSolutionsSectionContent;
  faq: FaqSectionContent;
  footerPromo: SiteFooterPromo;
}

export const applicationsPageContent = {
  hero: applicationsHeroContent,
  problems: applicationsProblemsContent,
  featuresSolutions: applicationsFeaturesSolutionsContent,
  faq: applicationsFaqContent,
  footerPromo: siteFooterPromoPresets.compactWithDescription,
} as const satisfies ApplicationsPageContent;
