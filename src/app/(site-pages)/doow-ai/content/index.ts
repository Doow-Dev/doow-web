import type { FaqSectionContent } from "@/components/layout/faq";
import type { SiteFooterPromo } from "@/components/layout/footer";
import type { SiteAssetEntry } from "@/lib/assets/site";
import { siteAssetManifest } from "@/lib/assets/site";
import { doowAppLinks } from "@/lib/site/app-links";

import { doowAiFaqContent } from "./faq-content";

interface DoowAiHeroActionLink {
  href: string;
  label: string;
  rel?: string;
  target?: string;
}

export interface DoowAiHeroContent {
  eyebrow: string;
  title: string;
  description: string;
  quote: string;
  cta: DoowAiHeroActionLink;
  illustration: SiteAssetEntry;
}

export interface DoowAiActionSectionContent {
  id: string;
  figmaNodeId: string;
  heading: string;
  description: string;
  cta: {
    href: string;
    label: string;
    image: SiteAssetEntry;
  };
  background: SiteAssetEntry;
  placeholder: SiteAssetEntry;
}

export type DoowAiFeatureCardIcon = "security" | "reliability" | "reflection";

export interface DoowAiFeatureCardContent {
  title: string;
  description: string;
  icon: DoowAiFeatureCardIcon;
  tone: "default" | "subtle";
}

export interface DoowAiFeatureSectionContent {
  id: string;
  figmaNodeId: string;
  title: string;
  description: string;
  cards: readonly DoowAiFeatureCardContent[];
}

export interface DoowAiPageContent {
  hero: DoowAiHeroContent;
  actionSections: readonly DoowAiActionSectionContent[];
  features: DoowAiFeatureSectionContent;
  faq: FaqSectionContent;
  footerPromo: SiteFooterPromo;
}

const doowAiHeroContent: DoowAiHeroContent = {
  eyebrow: "DOOW AI",
  title: "Derek & Mina",
  description: "CFOs best buddies. Built for modern finance.",
  quote:
    "Two complete finance operators. Same rigor. Same standards. Different energy. Derek finds the leak. Mina draws the shape. Both tell the truth.",
  cta: {
    href: doowAppLinks.getStarted,
    label: "Get Started",
  },
  illustration: siteAssetManifest.doowAiComposite,
};

const doowAiActionSections = [
  {
    id: "derek-in-action",
    figmaNodeId: "722:2140",
    heading: "See Derek in Action",
    description:
      "Derek doesn\u2019t just retrieve data\u2014he understands how money moves across your stack. Ask anything, and he traces patterns, surfaces waste, and guides you toward smarter decisions with clarity.",
    cta: {
      href: doowAppLinks.signUp,
      label: "Continue with Derek",
      image: siteAssetManifest.doowAiDerekCtaImage,
    },
    background: siteAssetManifest.doowAiDerekActionBackground,
    placeholder: siteAssetManifest.doowAiActionPlaceholder,
  },
  {
    id: "mina-in-action",
    figmaNodeId: "746:2659",
    heading: "See Mina in Action",
    description:
      "Mina moves through your stack like a living current\u2014connecting signals, revealing hidden patterns, and guiding each decision with quiet intuition.",
    cta: {
      href: doowAppLinks.signUp,
      label: "Continue with Mina",
      image: siteAssetManifest.doowAiMinaCtaImage,
    },
    background: siteAssetManifest.doowAiMinaActionBackground,
    placeholder: siteAssetManifest.doowAiActionPlaceholder,
  },
] as const satisfies readonly DoowAiActionSectionContent[];

const doowAiFeatureCardCopy = {
  security: {
    title: "Security",
    description:
      "Completely proprietary AI user data model compatible with all enterprise security systems, and familiar to all humans.",
    icon: "security",
  },
  reliability: {
    title: "Reliability",
    description:
      "Derek and Mina never sleep. They work continuously in the background, processing, tracking, and reconciling without downtime or manual intervention.",
    icon: "reliability",
  },
  reflection: {
    title: "Reflection",
    description: "Advanced execution loops that ensure Derek and Mina constantly reflect on work they're doing.",
    icon: "reflection",
  },
} as const satisfies Record<DoowAiFeatureCardIcon, Omit<DoowAiFeatureCardContent, "tone">>;

const doowAiFeatureContent = {
  id: "doow-ai-features",
  figmaNodeId: "772:4013",
  title: "A control that you can actually trust",
  description:
    "Built to operate with precision, security, and reliability \u2014 across every financial decision your business makes.",
  cards: [
    { ...doowAiFeatureCardCopy.security, tone: "subtle" },
    { ...doowAiFeatureCardCopy.reliability, tone: "subtle" },
    { ...doowAiFeatureCardCopy.reflection, tone: "default" },
    { ...doowAiFeatureCardCopy.security, tone: "subtle" },
    { ...doowAiFeatureCardCopy.reflection, tone: "default" },
    { ...doowAiFeatureCardCopy.reliability, tone: "subtle" },
    { ...doowAiFeatureCardCopy.reflection, tone: "default" },
    { ...doowAiFeatureCardCopy.security, tone: "subtle" },
    { ...doowAiFeatureCardCopy.reflection, tone: "default" },
  ],
} as const satisfies DoowAiFeatureSectionContent;

const doowAiFooterPromo = {
  kind: "compactHeadlineOnly",
  id: "doow-ai-footer-promo",
  title: "Ask questions about your company's software",
  cta: {
    href: "https://dev.doow.co/",
    label: "Open Doow AI",
    rel: "noopener noreferrer",
    target: "_blank",
  },
} as const satisfies SiteFooterPromo;

export const doowAiPageContent = {
  hero: doowAiHeroContent,
  actionSections: doowAiActionSections,
  features: doowAiFeatureContent,
  faq: doowAiFaqContent,
  footerPromo: doowAiFooterPromo,
} as const satisfies DoowAiPageContent;

export { doowAiFaqContent } from "./faq-content";
