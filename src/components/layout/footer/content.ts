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
        { href: "#finance-control", label: "Expenses" },
        { href: "/integrations", label: "Integrations" },
        { href: "#pricing", label: "Subscriptions" },
        { href: "#faq", label: "Doow AI" },
      ],
    },
    {
      title: "Company",
      items: [
        { href: "/", label: "About Us" },
        { href: "#faq", label: "Contact Us" },
        { href: "/privacy_policy", label: "Privacy Policy" },
        { href: "/terms_of_use", label: "Terms of Use" },
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
  compactHeadlineOnly: {
    kind: "compactHeadlineOnly",
    id: "site-footer-promo-compact-headline-only",
    title: "Stop Tracking Softwares Manually",
    cta: {
      href: "/signin",
      label: "Manage Subscriptions",
    },
  } satisfies SiteFooterPromo,
} as const satisfies Record<string, SiteFooterPromo>;
