import type { SiteAssetEntry } from "@/lib/assets/site";
import { siteAssetManifest } from "@/lib/assets/site";

export interface FooterActionLink {
  href: string;
  label: string;
  rel?: string;
  target?: string;
}

export interface SiteFooterLink {
  href: string;
  label: string;
  rel?: string;
  target?: string;
}

export interface SiteFooterLinkGroup {
  title: string;
  items: readonly SiteFooterLink[];
}

export type SiteFooterPromo =
  | {
      kind: "dashboard";
      id?: string;
      title: string;
      description: string;
      supportingText: string;
      cta: FooterActionLink;
      dashboard: SiteAssetEntry;
    }
  | {
      kind: "compactWithDescription";
      id?: string;
      title: string;
      description: string;
      cta: FooterActionLink;
    }
  | {
      kind: "compactHeadlineOnly";
      id?: string;
      title: string;
      cta: FooterActionLink;
    };

export interface SiteFooterBodyContent {
  id: string;
  title: string;
  navigationAriaLabel: string;
  groups: readonly [SiteFooterLinkGroup, SiteFooterLinkGroup, SiteFooterLinkGroup];
  addressLines: readonly [string, string, string];
  copyright: string;
}

export interface SiteFooterProps {
  promo?: SiteFooterPromo;
  body?: SiteFooterBodyContent;
}

export const siteFooterBodyContent = {
  id: "footer",
  title: "Doow footer navigation",
  navigationAriaLabel: "Footer navigation",
  groups: [
    {
      title: "Solutions",
      items: [
        { href: "/applications", label: "Applications" },
        { href: "/expenses", label: "Expenses" },
        { href: "/integrations", label: "Integrations" },
        { href: "/subscriptions", label: "Subscriptions" },
        { href: "/doow-ai", label: "Doow AI" },
      ],
    },
    {
      title: "Company",
      items: [
        { href: "/privacy_policy", label: "Privacy Policy" },
        { href: "/terms_of_use", label: "Terms of Use" },
        { href: "mailto:contact@doow.co", label: "Contact" },
        { href: "/signin", label: "Login" },
      ],
    },
    {
      title: "Company & Contact",
      items: [
        { href: "#pricing", label: "Contact Sales" },
        {
          href: "https://x.com",
          label: "Twitter (X)",
          rel: "noopener noreferrer",
          target: "_blank",
        },
      ],
    },
  ] satisfies readonly [SiteFooterLinkGroup, SiteFooterLinkGroup, SiteFooterLinkGroup],
  addressLines: ["1007 N Orange St. 4th Floor,", "Wilmington, DE,", "United States"],
  copyright: "\u00a9 2026 Doow",
} as const satisfies SiteFooterBodyContent;

export const siteFooterPromoPresets = {
  landingDashboard: {
    kind: "dashboard",
    id: "footer-promo",
    title: "Stop guessing what you're paying for.",
    description: "Start seeing it.",
    supportingText: "Cancel anytime",
    cta: {
      href: "/signin",
      label: "Start 14 days free trial",
    },
    dashboard: siteAssetManifest.footerDashboard,
  } satisfies SiteFooterPromo,
  compactWithDescription: {
    kind: "compactWithDescription",
    id: "site-footer-promo-compact-with-description",
    title: "Stop guessing what you're paying for.",
    description: "Get complete visibility into your SaaS stack and start saving money within minutes.",
    cta: {
      href: "/signin",
      label: "Start Exploring Applications",
    },
  } satisfies SiteFooterPromo,
  expensesVisibility: {
    kind: "compactWithDescription",
    id: "site-footer-promo-expenses-visibility",
    title: "See where your software budget is going",
    description: "Track every SaaS payment across cards, banks, and accounting systems in one place.",
    cta: {
      href: "/signin",
      label: "Track Expenses",
    },
  } satisfies SiteFooterPromo,
  compactHeadlineOnly: {
    kind: "compactHeadlineOnly",
    id: "site-footer-promo-compact-headline-only",
    title: "Stop Tracking Softwares Manually",
    cta: {
      href: "/signin",
      label: "Manage Subscriptions",
    },
  } satisfies SiteFooterPromo,
  doowAiQuestions: {
    kind: "compactHeadlineOnly",
    id: "site-footer-promo-doow-ai-questions",
    title: "Ask questions about your company\u2019s software",
    cta: {
      href: "/doow-ai",
      label: "Open Doow AI",
    },
  } satisfies SiteFooterPromo,
} as const satisfies Record<string, SiteFooterPromo>;
