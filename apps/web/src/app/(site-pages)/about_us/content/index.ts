import type { SiteFooterPromo } from "@/components/layout/footer";

import { aboutUsHeroContent, type AboutUsHeroContent } from "./hero-content";
import {
  aboutUsPrinciplesContent,
  type AboutUsPrincipleCardContent,
  type AboutUsPrinciplesContent,
} from "./principles-content";
import { aboutUsTeamContent, type AboutUsTeamContent, type AboutUsTeamLinkContent, type AboutUsTeamLogoContent } from "./team-content";

export interface AboutUsPageContent {
  footerPromo: SiteFooterPromo;
  hero: AboutUsHeroContent;
  principles: AboutUsPrinciplesContent;
  team: AboutUsTeamContent;
}

export const aboutUsPageContent = {
  footerPromo: {
    cta: {
      href: "/signin",
      label: "Get Started",
    },
    id: "site-footer-promo-about-us",
    kind: "compactHeadlineOnly",
    title: "Built for modern finance. See where all your spends are going",
  } satisfies SiteFooterPromo,
  hero: aboutUsHeroContent,
  principles: aboutUsPrinciplesContent,
  team: aboutUsTeamContent,
} as const satisfies AboutUsPageContent;

export type { AboutUsHeroContent, AboutUsPrincipleCardContent, AboutUsPrinciplesContent, AboutUsTeamContent, AboutUsTeamLinkContent, AboutUsTeamLogoContent };
