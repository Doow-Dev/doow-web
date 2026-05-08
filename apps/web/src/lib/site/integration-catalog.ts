import { z } from "zod";

export interface IntegrationCatalogCategory {
  backendLabel?: string;
  count: number;
  id: string;
  label: string;
}

export interface IntegrationCatalogItem {
  categoryId: string;
  categoryLabel: string;
  description: string;
  id: string;
  keywords?: readonly string[];
  logoUrl?: string;
  meteredVendorId?: string;
  name: string;
  websiteUrl?: string;
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
  categoryLabel: z.string().min(1),
  description: z.string().min(1),
  id: z.string().min(1),
  keywords: z.array(z.string().min(1)).optional(),
  logoUrl: z.string().min(1).optional(),
  meteredVendorId: z.string().min(1).optional(),
  name: z.string().min(1),
  websiteUrl: z.string().min(1).optional(),
});

export const integrationCatalogCategorySchema: z.ZodType<IntegrationCatalogCategory> = z.object({
  backendLabel: z.string().min(1).optional(),
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
