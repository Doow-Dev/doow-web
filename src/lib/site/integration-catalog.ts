import { z } from "zod";

export interface IntegrationCatalogCategory {
  id: string;
  label: string;
  count: number;
}

export interface IntegrationCatalogItem {
  id: string;
  name: string;
  description: string;
  categoryId: string;
  logoHints: readonly string[];
  keywords?: readonly string[];
}

export interface IntegrationCatalogResponse {
  categories: readonly IntegrationCatalogCategory[];
  items: readonly IntegrationCatalogItem[];
  query: string;
  selectedCategoryId: string;
  totalCount: number;
}

export const integrationCatalogItemSchema: z.ZodType<IntegrationCatalogItem> = z.object({
  categoryId: z.string().min(1),
  description: z.string().min(1),
  id: z.string().min(1),
  keywords: z.array(z.string().min(1)).optional(),
  logoHints: z.array(z.string().min(1)).min(1),
  name: z.string().min(1),
});

export const integrationCatalogCategorySchema: z.ZodType<IntegrationCatalogCategory> = z.object({
  count: z.number().int().nonnegative(),
  id: z.string().min(1),
  label: z.string().min(1),
});

export const integrationCatalogResponseSchema: z.ZodType<IntegrationCatalogResponse> = z.object({
  categories: z.array(integrationCatalogCategorySchema).min(1),
  items: z.array(integrationCatalogItemSchema),
  query: z.string(),
  selectedCategoryId: z.string().min(1),
  totalCount: z.number().int().nonnegative(),
});

const integrationCatalogCategories = [
  { id: "all", label: "All Categories", count: 4544 },
  { id: "analytics-bi", label: "Analytics & BI", count: 34 },
  { id: "crm", label: "CRM", count: 18 },
  { id: "cloud-platforms", label: "Cloud Platforms", count: 34 },
  { id: "customer-experience", label: "Customer Experience", count: 34 },
  { id: "design-creative", label: "Design & Creative", count: 4 },
  { id: "developer-tools", label: "Developer Tools", count: 34 },
  { id: "finance", label: "Finance", count: 34 },
  { id: "human-resources", label: "Human Resources", count: 34 },
  { id: "iam-sso", label: "IAM & SSO", count: 23 },
  { id: "it-operations-itsm", label: "IT Operations & ITSM", count: 34 },
  { id: "infrastructure-data", label: "Infrastructure & Data", count: 34 },
  { id: "product-engineering", label: "Product & Engineering", count: 34 },
  { id: "productivity-collaboration", label: "Productivity & Collaboration", count: 34 },
  { id: "sales-marketing", label: "Sales & Marketing", count: 34 },
  { id: "security", label: "Security", count: 4 },
] as const satisfies readonly IntegrationCatalogCategory[];

const integrationCatalogItems = [
  {
    id: "okta",
    name: "Okta",
    categoryId: "iam-sso",
    description: "Connect with Okta to enable secure, seamless sign-in.",
    logoHints: ["okta"],
    keywords: ["identity", "sso", "security"],
  },
  {
    id: "netsuite",
    name: "NetSuite",
    categoryId: "finance",
    description: "Connect NetSuite to sync accounting and expense data.",
    logoHints: ["netsuite"],
    keywords: ["accounting", "erp", "expenses"],
  },
  {
    id: "quickbooks",
    name: "QuickBooks",
    categoryId: "finance",
    description: "Connect QuickBooks to sync accounting and expense data.",
    logoHints: ["quickbooks"],
    keywords: ["accounting", "expenses", "finance"],
  },
  {
    id: "sage",
    name: "Sage",
    categoryId: "finance",
    description: "Connect Sage to sync financial and expense data.",
    logoHints: ["sage"],
    keywords: ["accounting", "finance", "ledger"],
  },
  {
    id: "plaid",
    name: "Plaid",
    categoryId: "finance",
    description: "Connect Plaid to pull real-time bank and transaction data.",
    logoHints: ["plaid"],
    keywords: ["banking", "transactions", "spend"],
  },
  {
    id: "google-workspace",
    name: "Google Workspace",
    categoryId: "productivity-collaboration",
    description: "Connect Google Workspace to map accounts, teams, and app access.",
    logoHints: ["google workspace", "google"],
    keywords: ["collaboration", "email", "identity"],
  },
  {
    id: "slack",
    name: "Slack",
    categoryId: "productivity-collaboration",
    description: "Connect Slack to understand workspace activity and ownership.",
    logoHints: ["slack"],
    keywords: ["collaboration", "messaging", "teams"],
  },
  {
    id: "notion",
    name: "Notion",
    categoryId: "productivity-collaboration",
    description: "Connect Notion to track workspace usage and collaboration.",
    logoHints: ["notion"],
    keywords: ["docs", "workspace", "knowledge"],
  },
  {
    id: "deel",
    name: "Deel",
    categoryId: "human-resources",
    description: "Connect Deel to sync employee, contractor, and onboarding data.",
    logoHints: ["deel"],
    keywords: ["hris", "employees", "onboarding"],
  },
  {
    id: "gusto",
    name: "Gusto",
    categoryId: "human-resources",
    description: "Connect Gusto to keep employee records and app access aligned.",
    logoHints: ["gusto"],
    keywords: ["hris", "payroll", "employees"],
  },
  {
    id: "bamboohr",
    name: "BambooHR",
    categoryId: "human-resources",
    description: "Connect BambooHR to automate onboarding and offboarding workflows.",
    logoHints: ["bamboohr", "bamboo"],
    keywords: ["hris", "employees", "lifecycle"],
  },
  {
    id: "onelogin",
    name: "OneLogin",
    categoryId: "iam-sso",
    description: "Connect OneLogin to sync users, groups, and sign-in activity.",
    logoHints: ["onelogin"],
    keywords: ["identity", "sso", "access"],
  },
  {
    id: "microsoft-entra-id",
    name: "Microsoft Entra ID",
    categoryId: "iam-sso",
    description: "Connect Microsoft Entra ID to manage identity and app access.",
    logoHints: ["microsoft entra id", "windows"],
    keywords: ["identity", "sso", "microsoft"],
  },
  {
    id: "zoho-books",
    name: "Zoho Books",
    categoryId: "finance",
    description: "Connect Zoho Books to reconcile subscription and expense records.",
    logoHints: ["zoho books", "zoho"],
    keywords: ["accounting", "finance", "books"],
  },
  {
    id: "asana",
    name: "Asana",
    categoryId: "product-engineering",
    description: "Connect Asana to map projects, owners, and team workflows.",
    logoHints: ["asana"],
    keywords: ["projects", "workflows", "teams"],
  },
  {
    id: "authress",
    name: "Authress",
    categoryId: "security",
    description: "Connect Authress to understand authorization and access patterns.",
    logoHints: ["authress"],
    keywords: ["security", "authorization", "access"],
  },
] as const satisfies readonly IntegrationCatalogItem[];

function normalizeCatalogText(value: string) {
  return value.trim().toLowerCase();
}

function getCategory(categoryId: string | undefined) {
  return integrationCatalogCategories.find((category) => category.id === categoryId);
}

function itemMatchesQuery(item: IntegrationCatalogItem, query: string) {
  if (!query) {
    return true;
  }

  const category = getCategory(item.categoryId);
  const haystack = [item.name, item.description, category?.label, ...(item.keywords ?? [])]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

  return haystack.includes(query);
}

export function getIntegrationCatalogApiUrl({
  categoryId = "all",
  query = "",
}: {
  categoryId?: string;
  query?: string;
}) {
  const params = new URLSearchParams();

  if (categoryId && categoryId !== "all") {
    params.set("categoryId", categoryId);
  }

  if (query.trim()) {
    params.set("query", query.trim());
  }

  const queryString = params.toString();

  return queryString ? `/api/site/integration-catalog?${queryString}` : "/api/site/integration-catalog";
}

export function isIntegrationCatalogCategoryId(categoryId: string | undefined) {
  return Boolean(categoryId && getCategory(categoryId));
}

export async function getIntegrationCatalogResponse({
  categoryId = "all",
  query = "",
}: {
  categoryId?: string;
  query?: string;
} = {}) {
  const selectedCategoryId = isIntegrationCatalogCategoryId(categoryId) ? categoryId : "all";
  const normalizedQuery = normalizeCatalogText(query);
  const items = integrationCatalogItems.filter((item) => {
    const matchesCategory = selectedCategoryId === "all" || item.categoryId === selectedCategoryId;

    return matchesCategory && itemMatchesQuery(item, normalizedQuery);
  });

  return integrationCatalogResponseSchema.parse({
    categories: integrationCatalogCategories,
    items,
    query: query.trim(),
    selectedCategoryId,
    totalCount: items.length,
  });
}
