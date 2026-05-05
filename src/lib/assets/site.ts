import { assetUrl, videoAsset } from "@/lib/assets/blob";

export interface SiteAssetEntry {
  id: string;
  src: string;
  alt: string;
  width: number;
  height: number;
}

export interface SiteVideoEntry {
  id: string;
  src: string;
  mimeType: string;
}

const demoVideoSources = videoAsset("demo-placeholder-vid.mp4", "demo-poster.jpg");

export const siteAssetManifest = {
  heroBackground: {
    id: "hero-background",
    src: assetUrl("hero-bg_mobile.png"),
    alt: "",
    width: 1352,
    height: 902,
  },
  heroBackgroundCompact: {
    id: "hero-background-compact",
    src: assetUrl("sitting_with_laptop.png"),
    alt: "",
    width: 1352,
    height: 902,
  },
  demoFrame: {
    id: "demo-frame",
    src: assetUrl("gradient-frame.webp"),
    alt: "",
    width: 4096,
    height: 2341,
  },
  demoPoster: {
    id: "demo-poster",
    src: demoVideoSources.poster,
    alt: "",
    width: 2000,
    height: 1335,
  },
  demoVideo: {
    id: "demo-video",
    src: demoVideoSources.src,
    mimeType: "video/mp4",
  },
  doowAiComposite: {
    id: "doow-ai-composite",
    src: assetUrl("derek-and-mina.png"),
    alt: "",
    width: 1398,
    height: 576,
  },
  doowAiActionPlaceholder: {
    id: "doow-ai-action-placeholder",
    src: "/assets/images/doow-ai-placeholder.svg",
    alt: "",
    width: 821,
    height: 546,
  },
  doowAiDerekActionBackground: {
    id: "doow-ai-derek-action-background",
    src: assetUrl("derek-bg.webp"),
    alt: "",
    width: 1440,
    height: 959,
  },
  doowAiDerekCtaImage: {
    id: "doow-ai-derek-cta-image",
    src: assetUrl("derek.png"),
    alt: "",
    width: 22,
    height: 20,
  },
  doowAiMinaActionBackground: {
    id: "doow-ai-mina-action-background",
    src: assetUrl("mina-bg.webp"),
    alt: "",
    width: 1440,
    height: 959,
  },
  doowAiMinaCtaImage: {
    id: "doow-ai-mina-cta-image",
    src: assetUrl("mina.png"),
    alt: "",
    width: 22,
    height: 20,
  },
  faqBackgroundIllustration: {
    id: "faq-background-illustration",
    src: "/assets/illustrations/faq-background-illustration.svg",
    alt: "",
    width: 1821,
    height: 1451,
  },
  applicationsHeroBackground: {
    id: "applications-hero-background",
    src: "/assets/illustrations/applications-hero-bg.svg",
    alt: "",
    width: 1440,
    height: 664,
  },
  applicationsHeroForeground: {
    id: "applications-hero-foreground",
    src: assetUrl("person-holding-camera.png"),
    alt: "",
    width: 918,
    height: 557,
  },
  integrationsHeroIllustrationArt: {
    id: "integrations-hero-illustration-art",
    src: "/assets/illustrations/integrations-hero-art.svg",
    alt: "",
    width: 2182.29,
    height: 917.278,
  },
  integrationsHeroIllustrationMask: {
    id: "integrations-hero-illustration-mask",
    src: "/assets/illustrations/integrations-hero-mask.svg",
    alt: "",
    width: 2311.64,
    height: 781,
  },
  expensesHeroCard1: {
    id: "expenses-hero-card-1",
    src: assetUrl("expenses-hero-card-1.png"),
    alt: "",
    width: 294,
    height: 441,
  },
  expensesHeroCard2: {
    id: "expenses-hero-card-2",
    src: assetUrl("expenses-hero-card-2.png"),
    alt: "",
    width: 320,
    height: 480,
  },
  expensesHeroCard3: {
    id: "expenses-hero-card-3",
    src: assetUrl("expenses-hero-card-3.png"),
    alt: "",
    width: 320,
    height: 480,
  },
  expensesHeroCard4: {
    id: "expenses-hero-card-4",
    src: assetUrl("expenses-hero-card-4.png"),
    alt: "",
    width: 294,
    height: 441,
  },
  subscriptionsHeroDashboard: {
    id: "subscriptions-hero-dashboard",
    src: assetUrl("subscriptions-hero-dashboard.png"),
    alt: "",
    width: 847,
    height: 456,
  },
  subscriptionsRenewalsVisual: {
    id: "subscriptions-renewals-visual",
    src: assetUrl("subscriptions-renewals-visual.png"),
    alt: "",
    width: 368,
    height: 310,
  },
  subscriptionsRenewalsVideo: {
    id: "subscriptions-renewals-video",
    src: "/assets/illustrations/subscriptions-renewals-feature.mp4",
    mimeType: "video/mp4",
  },
  subscriptionsContractsVisual: {
    id: "subscriptions-contracts-visual",
    src: assetUrl("subscriptions-contracts-visual.png"),
    alt: "",
    width: 456,
    height: 353,
  },
  faqUserAvatar: {
    id: "faq-user-avatar",
    src: "/assets/icons/faq-user-avatar.png",
    alt: "",
    width: 32,
    height: 32,
  },
  integrationsUpwardArcOuter: {
    id: "integrations-upward-arc-outer",
    src: "/assets/integrations/upward-arc-outer.svg",
    alt: "",
    width: 474.4,
    height: 224.309,
  },
  integrationsUpwardChipBackplate: {
    id: "integrations-upward-chip-backplate",
    src: "/assets/integrations/upward-chip-backplate.svg",
    alt: "",
    width: 238.029,
    height: 238.029,
  },
  integrationsDownwardArcOuter: {
    id: "integrations-downward-arc-outer",
    src: "/assets/integrations/downward-arc-outer.svg",
    alt: "",
    width: 474.4,
    height: 226.691,
  },
  integrationsDownwardChipBackplate: {
    id: "integrations-downward-chip-backplate",
    src: "/assets/integrations/downward-chip-backplate.svg",
    alt: "",
    width: 238.661,
    height: 238.24,
  },
  integrationsDownwardChipBackplateAccent: {
    id: "integrations-downward-chip-backplate-accent",
    src: "/assets/integrations/downward-chip-backplate-accent.svg",
    alt: "",
    width: 238.661,
    height: 238.24,
  },
  pricingBackgrounds: [
    {
      id: "pricing-background-1",
      src: assetUrl("pricing-bg1.webp"),
      alt: "",
      width: 2752,
      height: 1536,
    },
    {
      id: "pricing-background-2",
      src: assetUrl("pricing-bg2.webp"),
      alt: "",
      width: 2752,
      height: 1536,
    },
    {
      id: "pricing-background-3",
      src: assetUrl("pricing-bg3.webp"),
      alt: "",
      width: 2752,
      height: 1536,
    },
  ],
  footerDashboard: {
    id: "footer-dashboard",
    src: assetUrl("DASHBOARD-SS.png"),
    alt: "Doow dashboard showing applications, subscriptions, users, and spend overview widgets.",
    width: 1059,
    height: 695,
  },
} as const satisfies {
  heroBackground: SiteAssetEntry;
  heroBackgroundCompact: SiteAssetEntry;
  demoFrame: SiteAssetEntry;
  demoPoster: SiteAssetEntry;
  demoVideo: SiteVideoEntry;
  doowAiComposite: SiteAssetEntry;
  doowAiActionPlaceholder: SiteAssetEntry;
  doowAiDerekActionBackground: SiteAssetEntry;
  doowAiDerekCtaImage: SiteAssetEntry;
  doowAiMinaActionBackground: SiteAssetEntry;
  doowAiMinaCtaImage: SiteAssetEntry;
  faqBackgroundIllustration: SiteAssetEntry;
  applicationsHeroBackground: SiteAssetEntry;
  applicationsHeroForeground: SiteAssetEntry;
  expensesHeroCard1: SiteAssetEntry;
  expensesHeroCard2: SiteAssetEntry;
  expensesHeroCard3: SiteAssetEntry;
  expensesHeroCard4: SiteAssetEntry;
  integrationsHeroIllustrationArt: SiteAssetEntry;
  integrationsHeroIllustrationMask: SiteAssetEntry;
  subscriptionsHeroDashboard: SiteAssetEntry;
  subscriptionsRenewalsVisual: SiteAssetEntry;
  subscriptionsRenewalsVideo: SiteVideoEntry;
  subscriptionsContractsVisual: SiteAssetEntry;
  faqUserAvatar: SiteAssetEntry;
  integrationsUpwardArcOuter: SiteAssetEntry;
  integrationsUpwardChipBackplate: SiteAssetEntry;
  integrationsDownwardArcOuter: SiteAssetEntry;
  integrationsDownwardChipBackplate: SiteAssetEntry;
  integrationsDownwardChipBackplateAccent: SiteAssetEntry;
  pricingBackgrounds: [SiteAssetEntry, SiteAssetEntry, SiteAssetEntry];
  footerDashboard: SiteAssetEntry;
};
