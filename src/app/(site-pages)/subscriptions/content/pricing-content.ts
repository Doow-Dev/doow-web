import { doowAppLinks } from "@/lib/site/app-links";

export interface SubscriptionsPricingFeature {
  label: string;
}

export interface SubscriptionsPricingPlan {
  cta: {
    href: string;
    label: string;
  };
  description: string;
  features: readonly SubscriptionsPricingFeature[];
  featureEyebrow: string;
  id: string;
  name: string;
  priceLabel?: string;
  priceSuffix?: string;
  tone: "basic" | "featured" | "enterprise";
}

export interface SubscriptionsPricingContent {
  billing: {
    annualDiscountLabel: string;
    monthlyLabel: string;
    yearlyLabel: string;
  };
  description: string;
  eyebrow: string;
  id: string;
  titleLines: readonly [string, string];
  plans: readonly [SubscriptionsPricingPlan, SubscriptionsPricingPlan, SubscriptionsPricingPlan];
}

export const subscriptionsPricingContent = {
  id: "subscriptions-pricing",
  eyebrow: "Pricing",
  titleLines: ["Choose a plan", "that fits your needs"],
  description: "Most teams save 10× their subscription cost in the first 90 days.",
  billing: {
    monthlyLabel: "Monthly",
    yearlyLabel: "Yearly",
    annualDiscountLabel: "-20%",
  },
  plans: [
    {
      id: "basic",
      name: "Basic",
      description: "For small teams getting their first clear view of SaaS spend.",
      priceLabel: "$49",
      priceSuffix: "/ Month",
      featureEyebrow: "Basic plan includes:",
      cta: {
        href: doowAppLinks.signUp,
        label: "Start 14 days free trial",
      },
      features: [
        { label: "Up to 3 users" },
        { label: "Renewal alerts (7-day notice)" },
        { label: "Inactive license detection" },
        { label: "Track up to 30 SaaS subscriptions" },
      ],
      tone: "basic",
    },
    {
      id: "pro",
      name: "Pro",
      description: "For growing teams who need full visibility and proactive cost control.",
      priceLabel: "$149",
      priceSuffix: "/ Month",
      featureEyebrow: "Everything in Basic, plus:",
      cta: {
        href: doowAppLinks.signUp,
        label: "Start 14 days free trial",
      },
      features: [
        { label: "Unlimited users" },
        { label: "Duplicate & overlap detection" },
        { label: "Smart alternative suggestions with savings estimates" },
        { label: "Renewal alerts (30-day + 7-day notice)" },
        { label: "Per-department spend breakdown" },
        { label: "Priority support" },
      ],
      tone: "featured",
    },
    {
      id: "enterprise",
      name: "Enterprise",
      description: "Customised to suit your needs.",
      featureEyebrow: "Enterprise support includes:",
      cta: {
        href: "mailto:contact@doow.co",
        label: "Contact sales",
      },
      features: [
        { label: "Multi-entity & multi-currency support" },
        { label: "Audit logs & compliance reporting" },
        { label: "Unlimited connected payment sources" },
      ],
      tone: "enterprise",
    },
  ] as const,
} as const satisfies SubscriptionsPricingContent;
