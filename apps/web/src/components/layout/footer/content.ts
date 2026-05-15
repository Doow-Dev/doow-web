import type { SiteAssetEntry } from "@/lib/assets/site";
import { siteAssetManifest } from "@/lib/assets/site";
import { doowAppLinks } from "@/lib/site/app-links";

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
  action?: "contactDialog";
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
  groups: readonly [SiteFooterLinkGroup, SiteFooterLinkGroup];
  addressLines: readonly [string, string, string];
  disclaimer: {
    title: string;
    paragraphs: readonly [string, string];
  };
  socialLinks: readonly [
    SiteFooterLink & { kind: "linkedin" },
    SiteFooterLink & { kind: "x" },
    SiteFooterLink & { kind: "email" },
  ];
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
      title: "Products",
      items: [
        { href: "/applications", label: "Applications" },
        { href: "/expenses", label: "Expenses" },
        { href: "/integrations", label: "Integrations" },
        { href: "/subscriptions", label: "Subscriptions" },
        { href: "/alternative-apps", label: "Alternative Apps" },
        { href: "/doow-ai", label: "Doow AI" },
      ],
    },
    {
      title: "Company",
      items: [
        { href: "/about_us", label: "About Us" },
        { href: "/privacy_policy", label: "Privacy Policy" },
        { href: "/terms_of_use", label: "Terms of Use" },
        { href: "#contact-us", label: "Contact", action: "contactDialog" },
        { href: doowAppLinks.login, label: "Login" },
      ],
    },
  ] satisfies readonly [SiteFooterLinkGroup, SiteFooterLinkGroup],
  addressLines: ["1007 N Orange St. 4th Floor,", "Wilmington, DE,", "United States"],
  disclaimer: {
    title: "Disclaimer",
    paragraphs: [
      "Doow Inc. is a financial technology company duly incorporated under the laws of Delaware, United States of America. Doow is not a bank. Doow offers all of its services in partnership with licensed banking and financial partners in their respective jurisdictions worldwide.",
      "All logos, trademarks and brand names belong to their respective owners. Using these brand items does not imply endorsement with Doow.",
    ],
  },
  socialLinks: [
    {
      href: "https://www.linkedin.com/company/doowbusiness/",
      kind: "linkedin",
      label: "LinkedIn",
      rel: "noopener noreferrer",
      target: "_blank",
    },
    {
      href: "https://x.com/Doowfinance",
      kind: "x",
      label: "X",
      rel: "noopener noreferrer",
      target: "_blank",
    },
    {
      href: "mailto:hello@doow.co",
      kind: "email",
      label: "Email Doow",
    },
  ],
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
      href: doowAppLinks.signUp,
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
      href: doowAppLinks.signUp,
      label: "Start Exploring Applications",
    },
  } satisfies SiteFooterPromo,
  expensesVisibility: {
    kind: "compactWithDescription",
    id: "site-footer-promo-expenses-visibility",
    title: "See where your software budget is going",
    description: "Track every SaaS payment across cards, banks, and accounting systems in one place.",
    cta: {
      href: doowAppLinks.signUp,
      label: "Track Expenses",
    },
  } satisfies SiteFooterPromo,
  compactHeadlineOnly: {
    kind: "compactHeadlineOnly",
    id: "site-footer-promo-compact-headline-only",
    title: "Stop Tracking Softwares Manually",
    cta: {
      href: doowAppLinks.signUp,
      label: "Manage Subscriptions",
    },
  } satisfies SiteFooterPromo,
  doowAiQuestions: {
    kind: "compactHeadlineOnly",
    id: "site-footer-promo-doow-ai-questions",
    title: "Ask questions about your company\u2019s software",
    cta: {
      href: doowAppLinks.signUp,
      label: "Open Doow AI",
    },
  } satisfies SiteFooterPromo,
} as const satisfies Record<string, SiteFooterPromo>;
