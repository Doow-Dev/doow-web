import { siteAssetManifest } from "@/lib/assets/site";

import {
  applicationsHeroPillFieldContent,
  type ApplicationsHeroPillFieldContent,
} from "./hero-pills-content";

export interface ApplicationsHeroActionLink {
  href: string;
  label: string;
}

export interface ApplicationsHeroContent {
  id: string;
  eyebrow: string;
  title: {
    firstLine: string;
    secondLinePrefix: string;
    accent: string;
  };
  description: string;
  cta: ApplicationsHeroActionLink;
  foreground: (typeof siteAssetManifest)["applicationsHeroForeground"];
  pillField: ApplicationsHeroPillFieldContent;
}

export const applicationsHeroContent = {
  id: "applications-hero",
  eyebrow: "APPLICATION",
  title: {
    firstLine: "See every app your company",
    secondLinePrefix: "is",
    accent: "paying for",
  },
  description: "Discover tools your teams use, how often they're used, and where money might be slipping away.",
  cta: {
    href: "/signin",
    label: "Start Free Trial",
  } satisfies ApplicationsHeroActionLink,
  foreground: siteAssetManifest.applicationsHeroForeground,
  pillField: applicationsHeroPillFieldContent,
} as const satisfies ApplicationsHeroContent;
