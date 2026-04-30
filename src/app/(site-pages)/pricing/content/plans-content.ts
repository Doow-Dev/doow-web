export interface PricingPlanFeature {
  label: string;
  emphasis?: string;
}

export interface PricingPlan {
  id: string;
  name: string;
  description: string;
  prices: {
    monthly: string;
    yearly: string;
  };
  priceSuffix?: string;
  cta: {
    href: string;
    label: string;
  };
  eyebrow: string;
  features: readonly PricingPlanFeature[];
  tone: "light" | "featured";
}

export interface PricingEnterprisePlan {
  id: string;
  name: string;
  description: string;
  cta: {
    href: string;
    label: string;
  };
  features: readonly PricingPlanFeature[];
}

export interface PricingPlansContent {
  id: string;
  eyebrow: string;
  title: readonly [string, string];
  description: string;
  billingToggle: {
    monthly: string;
    yearly: string;
    discount: string;
  };
  plans: readonly [PricingPlan, PricingPlan];
  enterprise: PricingEnterprisePlan;
}

export const pricingPlansContent = {
  id: "pricing-plans",
  eyebrow: "Pricing",
  title: ["Choose a plan", "that fits your needs"],
  description: "Most teams save 10\u00d7 their subscription cost in the first 90 days.",
  billingToggle: {
    monthly: "Monthly",
    yearly: "Yearly",
    discount: "-20%",
  },
  plans: [
    {
      id: "basic",
      name: "Basic",
      description: "For small teams getting their first clear view of SaaS spend.",
      prices: {
        monthly: "$61",
        yearly: "$49",
      },
      priceSuffix: "/ Month",
      cta: {
        href: "/signin",
        label: "Start 14 days free trial",
      },
      eyebrow: "Basic plan includes:",
      tone: "light",
      features: [
        { label: "Up to", emphasis: "3 users" },
        { label: "Renewal alerts", emphasis: "(7-day notice)" },
        { label: "Inactive license detection" },
        { label: "Track up to 30 SaaS subscriptions" },
        { label: "Track up to 30 SaaS subscriptions" },
        { label: "Track up to 30 SaaS subscriptions" },
        { label: "Track up to 30 SaaS subscriptions" },
        { label: "Track up to 30 SaaS subscriptions" },
      ],
    },
    {
      id: "pro",
      name: "Pro",
      description: "For growing teams who need full visibility and proactive cost control.",
      prices: {
        monthly: "$186",
        yearly: "$149",
      },
      priceSuffix: "/ Month",
      cta: {
        href: "/signin",
        label: "Start 14 days free trial",
      },
      eyebrow: "Everything in BASIC, plus:",
      tone: "featured",
      features: [
        { label: "Unlimited users" },
        { label: "Duplicate & overlap detection" },
        { label: "Smart alternative suggestions with savings estimates" },
        { label: "Renewal alerts (30-day + 7-day notice)" },
        { label: "Per-department spend breakdown" },
        { label: "Priority support" },
        { label: "Unlimited users" },
        { label: "Unlimited users" },
      ],
    },
  ],
  enterprise: {
    id: "enterprise",
    name: "Enterprise",
    description: "Customised to suit your needs.",
    cta: {
      href: "mailto:contact@doow.co",
      label: "Contact sales",
    },
    features: [
      { label: "Multi-entity & multi-currency support" },
      { label: "Audit logs & compliance reporting" },
      { label: "Unlimited connected payment sources" },
      { label: "Unlimited" },
    ],
  },
} as const satisfies PricingPlansContent;
