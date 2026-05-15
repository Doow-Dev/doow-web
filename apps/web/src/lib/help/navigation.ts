import type { HelpCategoryMeta } from "./types";

export const helpCategories: HelpCategoryMeta[] = [
  {
    slug: "getting-started",
    label: "Getting started",
    description: "Set up your workspace, invite your team, and connect your first integration.",
  },
  {
    slug: "integrations",
    label: "Integrations",
    description: "Connect usage, identity, and financial data sources to Doow.",
  },
  {
    slug: "billing",
    label: "Billing & plans",
    description: "Understand your invoice, change plans, and manage payment details.",
  },
  {
    slug: "account",
    label: "Account & settings",
    description: "Manage team members, notifications, and workspace preferences.",
  },
  {
    slug: "troubleshooting",
    label: "Troubleshooting",
    description: "Fix sync issues, missing data, and common errors.",
  },
];

export const helpCategoriesBySlug = new Map(
  helpCategories.map((c) => [c.slug, c]),
);
