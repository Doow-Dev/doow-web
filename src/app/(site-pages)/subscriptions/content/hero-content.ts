import { siteAssetManifest } from "@/lib/assets/site";

export interface SubscriptionsHeroContent {
  cta: {
    href: string;
    label: string;
  };
  dashboard: (typeof siteAssetManifest)["subscriptionsHeroDashboard"];
  description: string;
  eyebrow: string;
  id: string;
  illustration: {
    art: (typeof siteAssetManifest)["integrationsHeroIllustrationArt"];
    mask: (typeof siteAssetManifest)["integrationsHeroIllustrationMask"];
  };
  title: string;
}

export const subscriptionsHeroContent = {
  id: "subscriptions-hero",
  eyebrow: "SUBSCRIPTION",
  title: "Keep every software subscription in one place",
  description: "Contracts, licenses, and renewals without spreadsheets.",
  cta: {
    href: "/signin",
    label: "Start Free Trial",
  },
  dashboard: siteAssetManifest.subscriptionsHeroDashboard,
  illustration: {
    art: siteAssetManifest.integrationsHeroIllustrationArt,
    mask: siteAssetManifest.integrationsHeroIllustrationMask,
  },
} as const satisfies SubscriptionsHeroContent;
