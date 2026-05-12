import type { LandingActionLink } from "@/app/(landing)/_components/shared";
import { siteAssetManifest } from "@/lib/assets/site";

export interface DoowAiSectionContent {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  cta: LandingActionLink;
  illustration: (typeof siteAssetManifest)["doowAiComposite"];
}

export const doowAiSectionContent = {
  id: "doow-ai",
  eyebrow: "DOOW AI",
  title: "Derek & Mina",
  description: "CFOs best buddies. Built for modern finance.",
  cta: {
    href: "/doow-ai",
    label: "Learn more about Doow AI",
  } satisfies LandingActionLink,
  illustration: siteAssetManifest.doowAiComposite,
} as const satisfies DoowAiSectionContent;
