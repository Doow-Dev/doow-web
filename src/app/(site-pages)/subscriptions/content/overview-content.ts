export type SubscriptionsOverviewVisual = "calendar" | "status" | "table" | "teams";

export interface SubscriptionsOverviewCard {
  description: string;
  title: string;
  visual: SubscriptionsOverviewVisual;
}

export interface SubscriptionsOverviewContent {
  cards: readonly SubscriptionsOverviewCard[];
  description: string;
  id: string;
  title: string;
}

export const subscriptionsOverviewContent = {
  id: "subscriptions-overview",
  title: "All Subscriptions in one place",
  description:
    "See every contract, license, and renewal in a single view so finance, procurement, and team leads are always working from the same subscription record.",
  cards: [
    {
      title: "Connect every team's stack",
      description: "Map each subscription to the teams and owners who rely on it.",
      visual: "teams",
    },
    {
      title: "Track how each app is used",
      description: "Spot active and inactive contracts before renewal decisions get made.",
      visual: "status",
    },
    {
      title: "Talk with renewal managers",
      description: "Keep negotiation and ownership notes beside the contract itself.",
      visual: "table",
    },
    {
      title: "Never miss renewal dates",
      description: "Use a single renewal timeline instead of scattered reminders.",
      visual: "calendar",
    },
  ] satisfies readonly SubscriptionsOverviewCard[],
} as const satisfies SubscriptionsOverviewContent;
