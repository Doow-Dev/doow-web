export interface SubscriptionsHeroMetric {
  label: string;
  tone?: "default" | "danger" | "success";
  value: string;
}

export interface SubscriptionsHeroSubscriptionCard {
  id: string;
  amountSpent: string;
  licenseCount: string;
  name: string;
  plan: string;
  showActions?: boolean;
  status: "active" | "inactive";
  subscriptionValue: string;
  underUtilizedSpend: string;
  utilizedSpend: string;
}

export interface SubscriptionsHeroContent {
  cta: {
    href: string;
    label: string;
  };
  description: string;
  eyebrow: string;
  id: string;
  metrics: readonly SubscriptionsHeroMetric[];
  subscriptions: readonly SubscriptionsHeroSubscriptionCard[];
  title: string;
}

export const subscriptionsHeroContent = {
  id: "subscriptions-hero",
  eyebrow: "SUSBSCRIPTION",
  title: "Keep every software subscription in one place",
  description: "Contracts, licenses, and renewals without spreadsheets.",
  cta: {
    href: "/signin",
    label: "Start Free Trial",
  },
  metrics: [
    {
      label: "Total Number of Subscriptions",
      value: "3",
    },
    {
      label: "Total Subscription Value",
      value: "$500,637.39",
    },
    {
      label: "Active Subscription",
      tone: "success",
      value: "2",
    },
    {
      label: "Inactive Subscription",
      tone: "danger",
      value: "1",
    },
  ] satisfies readonly SubscriptionsHeroMetric[],
  subscriptions: [
    {
      id: "enterprise-stack",
      name: "[Defined name of the contr...",
      plan: "Enterprise",
      status: "active",
      subscriptionValue: "$456,0000",
      amountSpent: "56,0000",
      licenseCount: "3",
      utilizedSpend: "$456,0000",
      underUtilizedSpend: "$4,000",
    },
    {
      id: "payg-1",
      name: "[PAYG 1]",
      plan: "PAYG",
      status: "inactive",
      subscriptionValue: "$456,0000",
      amountSpent: "56,0000",
      licenseCount: "3",
      utilizedSpend: "$456,0000",
      underUtilizedSpend: "$4,000",
    },
    {
      id: "defined-contract-2",
      name: "[Defined name of the contr...",
      plan: "Enterprise",
      status: "active",
      showActions: true,
      subscriptionValue: "$456,0000",
      amountSpent: "56,0000",
      licenseCount: "3",
      utilizedSpend: "$456,0000",
      underUtilizedSpend: "$4,000",
    },
  ] satisfies readonly SubscriptionsHeroSubscriptionCard[],
} as const satisfies SubscriptionsHeroContent;
