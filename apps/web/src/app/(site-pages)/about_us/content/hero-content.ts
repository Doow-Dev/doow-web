import { doowAppLinks } from "@/lib/site/app-links";

export interface AboutUsHeroContent {
  cta: {
    href: string;
    label: string;
  };
  description: string;
  eyebrow: string;
  id: string;
  title: string;
}

export const aboutUsHeroContent = {
  cta: {
    href: doowAppLinks.getStarted,
    label: "Get Started",
  },
  description:
    "Doow is built by a team of finance, product, and engineering professionals who've lived the pain of surprised renewals, fragmented data systems, and clunky spreadsheets. We're here to replace manual guesswork with actionable intelligence, so your business can cut waste, spend smarter, and make every SaaS dollar count.",
  eyebrow: "ABOUT US",
  id: "about-us-hero",
  title: "Built for modern Finance and Procurement teams",
} as const satisfies AboutUsHeroContent;
