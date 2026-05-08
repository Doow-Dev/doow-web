export interface IntegrationsIntegrationListContent {
  id: string;
  title: string;
  description: string;
  initialCategoryId: string;
  searchPlaceholder: string;
}

export const integrationsIntegrationListContent = {
  id: "integration-list",
  title: "One Hub for Every Integration",
  description:
    "Link identity providers, HR systems, SaaS apps, and internal infrastructure so your data flows seamlessly across your entire stack.",
  initialCategoryId: "all",
  searchPlaceholder: "Search integrations",
} as const satisfies IntegrationsIntegrationListContent;
