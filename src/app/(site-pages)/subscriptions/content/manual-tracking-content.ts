export interface SubscriptionsManualTrackingItem {
  description: string;
  title: string;
}

export interface SubscriptionsManualTrackingContent {
  description: string;
  id: string;
  items: readonly SubscriptionsManualTrackingItem[];
  title: string;
  visualCaption: string;
  visualTitle: string;
}

export const subscriptionsManualTrackingContent = {
  id: "subscriptions-manual-tracking",
  title: "Many teams track subscriptions manually",
  description:
    "Renewals, license counts, and contract details often live across calendars, notes, and spreadsheets. Doow keeps the whole renewal picture in one workflow.",
  items: [
    {
      title: "Renewal management",
      description: "Track every upcoming renewal without juggling spreadsheet reminders and separate calendar entries.",
    },
    {
      title: "License visibility",
      description: "See which plans are active, who owns them, and how many licenses are actually being used.",
    },
    {
      title: "Contract context",
      description: "Keep subscription value, spend history, and ownership tied to the same contract record.",
    },
  ] satisfies readonly SubscriptionsManualTrackingItem[],
  visualTitle: "Never miss renewal dates",
  visualCaption: "One view for the deadlines, value, and owners behind every subscription.",
} as const satisfies SubscriptionsManualTrackingContent;
