import type { FaqSectionContent } from "@/components/layout/faq";
import { siteFooterPromoPresets, type SiteFooterPromo } from "@/components/layout/footer";

import { subscriptionsFaqContent } from "./faq-content";
import { subscriptionsHeroContent, type SubscriptionsHeroContent } from "./hero-content";
import {
  subscriptionsManualTrackingContent,
  type SubscriptionsManualTrackingContent,
} from "./manual-tracking-content";
import { subscriptionsOverviewContent, type SubscriptionsOverviewContent } from "./overview-content";
import { subscriptionsPricingContent, type SubscriptionsPricingContent } from "./pricing-content";

export interface SubscriptionsPageContent {
  faq: FaqSectionContent;
  footerPromo: SiteFooterPromo;
  hero: SubscriptionsHeroContent;
  manualTracking: SubscriptionsManualTrackingContent;
  overview: SubscriptionsOverviewContent;
  pricing: SubscriptionsPricingContent;
}

export const subscriptionsPageContent = {
  pricing: subscriptionsPricingContent,
  hero: subscriptionsHeroContent,
  manualTracking: subscriptionsManualTrackingContent,
  overview: subscriptionsOverviewContent,
  faq: subscriptionsFaqContent,
  footerPromo: siteFooterPromoPresets.compactHeadlineOnly,
} as const satisfies SubscriptionsPageContent;
