import type { LandingActionLink } from "@/app/(landing)/_components/shared";
import { siteAssetManifest } from "@/lib/assets/site";

export interface PricingSectionContent {
  id: string;
  eyebrow: string;
  titleLines: readonly [string, string];
  description: string;
  cta: LandingActionLink;
  placeholderAnchorId: string;
  backgrounds: (typeof siteAssetManifest)["pricingBackgrounds"];
}

export const pricingSectionContent = {
  id: "pricing",
  eyebrow: "Pricing",
  titleLines: ["Choose a plan", "that fits your needs"],
  description: "Most teams save 10× their subscription cost in the first 90 days.",
  cta: {
    href: "#pricing-plans",
    label: "View Pricing Plans",
  } satisfies LandingActionLink,
  placeholderAnchorId: "pricing-plans",
  backgrounds: siteAssetManifest.pricingBackgrounds,
} as const satisfies PricingSectionContent;
