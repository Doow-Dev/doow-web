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
    "instantly access the crucial details for every tool in your stack. From billing frequency to contract value, everything is clearly laid out so you never have to dig through emails again.",
  cards: [
    {
      title: "Know who actually uses licenses",
      description: "Map each subscription to the teams and owners who rely on it.",
      visual: "teams",
    },
    {
      title: "Track tools that charge by usage",
      description: "Monitor usage-based subscriptions before limits, storage, or API calls drive up costs.",
      visual: "status",
    },
    {
      title: "Track add-on and overages",
      description: "See add-ons, overages, mapped users, quantities, and total value in one compact table.",
      visual: "table",
    },
    {
      title: "Never miss renewal dates",
      description: "Use a single renewal timeline instead of scattered reminders.",
      visual: "calendar",
    },
  ] satisfies readonly SubscriptionsOverviewCard[],
} as const satisfies SubscriptionsOverviewContent;
