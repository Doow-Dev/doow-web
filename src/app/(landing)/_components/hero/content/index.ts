import { siteAssetManifest } from "@/lib/assets/site";
import type { LandingActionLink } from "@/app/(landing)/_components/shared";

export interface LandingHeroContent {
  background: (typeof siteAssetManifest)["heroBackground"];
  secondaryCtaPreview: (typeof siteAssetManifest)["demoPoster"];
  title: {
    firstLine: string;
    secondLinePrefix: string;
    accentWords: readonly string[];
  };
  description: string;
  primaryCta: LandingActionLink;
  secondaryCta: LandingActionLink;
}

export const landingHeroContent = {
  background: siteAssetManifest.heroBackground,
  secondaryCtaPreview: siteAssetManifest.demoPoster,
  title: {
    firstLine: "How much are you wasting",
    secondLinePrefix: "on ",
    accentWords: ["SaaS", "compute", "storage", "tokens"],
  },
  description:
    "Doow helps finance teams see exactly where the money's going before it's gone. Every PAYG + enterprise contract — prepaid, seats, and metered licenses, all in one place.",
  primaryCta: {
    href: "/signin",
    label: "Start Free Trial",
  } satisfies LandingActionLink,
  secondaryCta: {
    href: "#demo",
    label: "Watch a Demo",
  } satisfies LandingActionLink,
} satisfies LandingHeroContent;
