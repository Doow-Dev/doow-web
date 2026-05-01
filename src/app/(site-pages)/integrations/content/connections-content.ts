export type IntegrationsConnectionsCardId = "browser-extension" | "sso-providers" | "banking";

export interface IntegrationsConnectionsMetric {
  label: string;
  value: string;
}

export interface IntegrationsConnectionsCard {
  accessibilitySummary: string;
  id: IntegrationsConnectionsCardId;
  title: string;
}

export interface IntegrationsConnectionsContent {
  bankingPillLabel: string;
  cards: readonly IntegrationsConnectionsCard[];
  description: string;
  id: string;
  metrics: readonly IntegrationsConnectionsMetric[];
  trackingLabel: string;
  trackingPillLabel: string;
  title: string;
  toDoowLabel: string;
}

export const integrationsConnectionsContent = {
  id: "integrations-connections",
  title: "Connect Without Constraints . Fast, Simple, Secure",
  description:
    "Bring your financial and SaaS data into Doow from every source that matters. SSO providers, browsers, and banking systems. Without complex setup or engineering work.",
  trackingPillLabel: "See what Doow is currently tracking",
  trackingLabel: "Track activities",
  bankingPillLabel: "Connect banking",
  toDoowLabel: "To Doow",
  metrics: [
    {
      label: "Total applications",
      value: "$118,400.00",
    },
    {
      label: "Average user hours",
      value: "142",
    },
  ],
  cards: [
    {
      id: "browser-extension",
      title: "Connect Doow’s Browser Extension",
      accessibilitySummary:
        "Browser extension tracking is shown with two metric cards and an activity toggle switched on.",
    },
    {
      id: "sso-providers",
      title: "Connect SSO Providers",
      accessibilitySummary:
        "SSO providers including Microsoft Entra, Google, Okta, and OneLogin connect toward a central hub.",
    },
    {
      id: "banking",
      title: "Connect Banking",
      accessibilitySummary: "Banking providers Plaid and Yapily send connection data toward Doow.",
    },
  ],
} as const satisfies IntegrationsConnectionsContent;
