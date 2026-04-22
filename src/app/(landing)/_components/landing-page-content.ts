import { landingHeaderContent, type LandingHeaderContent } from "./header";
import { landingHeroContent, type LandingHeroContent } from "./hero";
import { landingDemoVideoContent, type LandingDemoVideoContent } from "./demo-video";
import { alternativeAppsSectionContent, type AlternativeAppsSectionContent } from "./alternative-apps/content";
import { doowAiSectionContent, type DoowAiSectionContent } from "./doow-ai";
import { featureSplitSectionContent, type FeatureSplitSectionContent } from "./feature-split";
import { financeControlSectionContent, type FinanceControlSectionContent } from "./finance-control";
import { integrationsSectionContent, type IntegrationsSectionContent } from "./integrations";
import { pricingSectionContent, type PricingSectionContent } from "./pricing";
import { landingFaqContent } from "./faq/content/faq-content";
import type { FaqSectionContent } from "@/components/layout/faq";

export type LandingAlternativeAppsContent = AlternativeAppsSectionContent;
export type LandingDoowAiContent = DoowAiSectionContent;
export type LandingFeatureSplitContent = FeatureSplitSectionContent;
export type LandingFinanceControlContent = FinanceControlSectionContent;
export type LandingFaqSectionContent = FaqSectionContent;
export type LandingIntegrationsContent = IntegrationsSectionContent;
export type LandingPricingContent = PricingSectionContent;

export const landingPageContent = {
  header: landingHeaderContent,
  hero: landingHeroContent,
  demo: landingDemoVideoContent,
  alternativeApps: alternativeAppsSectionContent,
  doowAi: doowAiSectionContent,
  featureSplit: featureSplitSectionContent,
  financeControl: financeControlSectionContent,
  pricing: pricingSectionContent,
  faq: landingFaqContent,
  integrations: integrationsSectionContent,
} as const satisfies {
  header: LandingHeaderContent;
  hero: LandingHeroContent;
  demo: LandingDemoVideoContent;
  alternativeApps: LandingAlternativeAppsContent;
  doowAi: LandingDoowAiContent;
  featureSplit: LandingFeatureSplitContent;
  financeControl: LandingFinanceControlContent;
  pricing: LandingPricingContent;
  faq: LandingFaqSectionContent;
  integrations: LandingIntegrationsContent;
};
