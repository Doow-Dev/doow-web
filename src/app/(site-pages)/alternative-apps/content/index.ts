import type { SiteFooterPromo } from "@/components/layout/footer";

export interface AlternativeAppsPageContent {
  catalog: {
    id: string;
    searchPlaceholder: string;
    title: string;
  };
  featured: {
    id: string;
    title: string;
  };
  footerPromo: SiteFooterPromo;
  hero: {
    description: string;
    eyebrow: string;
    id: string;
    title: string;
  };
}

export const alternativeAppsPageContent = {
  hero: {
    id: "alternative-apps-hero",
    eyebrow: "ALTERNATIVE APPLICATIONS",
    title: "Explore alternatives to your current stack",
    description: "Know the right tool for your team",
  },
  catalog: {
    id: "alternative-apps-catalog",
    title: "Browse Applications",
    searchPlaceholder: "Search applications",
  },
  featured: {
    id: "alternative-apps-featured",
    title: "Featured Applications",
  },
  footerPromo: {
    kind: "compactHeadlineOnly",
    id: "alternative-apps-footer-promo",
    title: "See more alternatives to the softwares you are paying for",
    cta: {
      href: "/signin",
      label: "Get Started",
    },
  },
} as const satisfies AlternativeAppsPageContent;
