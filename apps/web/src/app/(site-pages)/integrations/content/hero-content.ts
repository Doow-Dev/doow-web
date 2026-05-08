import { siteAssetManifest } from "@/lib/assets/site";
import { doowAppLinks } from "@/lib/site/app-links";

export interface IntegrationsHeroActionLink {
  href: string;
  label: string;
}

export interface IntegrationsHeroContent {
  id: string;
  eyebrow: string;
  title: {
    gradient: string;
    remainder: string;
  };
  description: string;
  cta: IntegrationsHeroActionLink;
  illustration: {
    art: (typeof siteAssetManifest)["integrationsHeroIllustrationArt"];
    mask: (typeof siteAssetManifest)["integrationsHeroIllustrationMask"];
  };
}

export const integrationsHeroContent = {
  id: "integrations-hero",
  eyebrow: "INTEGRATION",
  title: {
    gradient: "Connect the systems",
    remainder: "your company already uses",
  },
  description: "Bring identity, finance, and HR data together so everything stays up to date.",
  cta: {
    href: doowAppLinks.startFreeTrial,
    label: "Start Free Trial",
  } satisfies IntegrationsHeroActionLink,
  illustration: {
    art: siteAssetManifest.integrationsHeroIllustrationArt,
    mask: siteAssetManifest.integrationsHeroIllustrationMask,
  },
} as const satisfies IntegrationsHeroContent;
