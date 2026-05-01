import { siteAssetManifest, type SiteAssetEntry } from "@/lib/assets/site";

export type SubscriptionsManualTrackingVisualId = "renewals" | "licenses" | "contracts";

export interface SubscriptionsManualTrackingItem {
  description: string;
  title: string;
  visualCaption: string;
  visualId: SubscriptionsManualTrackingVisualId;
  visualImage?: SiteAssetEntry;
  visualTitle: string;
}

export interface SubscriptionsManualTrackingContent {
  defaultSelectedVisualId: SubscriptionsManualTrackingVisualId;
  description: string;
  id: string;
  items: readonly SubscriptionsManualTrackingItem[];
  title: string;
}

export const subscriptionsManualTrackingContent = {
  defaultSelectedVisualId: "licenses",
  id: "subscriptions-manual-tracking",
  title: "Many teams track subscriptions manually",
  description: "But as tools grow, manual tracking becomes unmanageable",
  items: [
    {
      title: "Renewals get missed",
      description:
        "Capture software payments made directly from your bank accounts so no subscription or vendor slips outside your visibility.",
      visualId: "renewals",
      visualTitle: "Know which licenses are active",
      visualCaption: "Keep usage, owners, and plan counts close to the subscription record.",
    },
    {
      title: "License multiplies uncontrollably",
      description:
        "Track every SaaS purchase made with company cards. Instantly see which tools are being paid for, by whom, and which teams are using them.",
      visualId: "licenses",
      visualImage: siteAssetManifest.subscriptionsRenewalsVisual,
      visualTitle: "Never miss renewal dates",
      visualCaption: "One view for the deadlines, value, and owners behind every subscription.",
    },
    {
      title: "Contracts become scattered",
      description: "Sync with your accounting system to surface software spend buried in invoices, reimbursements, and recorded expenses.",
      visualId: "contracts",
      visualImage: siteAssetManifest.subscriptionsContractsVisual,
      visualTitle: "Keep contract context together",
      visualCaption: "Connect value, renewal timing, and ownership before decisions get scattered.",
    },
  ] satisfies readonly SubscriptionsManualTrackingItem[],
} as const satisfies SubscriptionsManualTrackingContent;
