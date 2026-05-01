import { z } from "zod";

export const alternativeAppsCatalogDefaultTake = 15;
export const alternativeAppsCatalogCategoryDisplayLimit = 48;

export interface AlternativeAppsCatalogLogoPreview {
  id: string;
  logoHints: readonly string[];
  logoUrl?: string;
  name: string;
}

export interface AlternativeAppsCatalogItem {
  alternativeCount: number;
  alternativeNames: readonly string[];
  alternativePreviewLogoHints: readonly (readonly string[])[];
  alternativePreviewLogos?: readonly AlternativeAppsCatalogLogoPreview[];
  categoryId: string;
  categoryLabel: string;
  description: string;
  href: string;
  id: string;
  keywords?: readonly string[];
  logoHints: readonly string[];
  logoUrl?: string;
  name: string;
  slug: string;
}

export interface AlternativeAppsCatalogCategory {
  count: number;
  id: string;
  label: string;
}

export interface AlternativeAppsCatalogResponse {
  categories: readonly AlternativeAppsCatalogCategory[];
  hasMore: boolean;
  items: readonly AlternativeAppsCatalogItem[];
  nextCursor: string | null;
  query: string;
  selectedCategoryId: string;
  take: number;
  totalCount: number;
}

export const alternativeAppsCatalogLogoPreviewSchema: z.ZodType<AlternativeAppsCatalogLogoPreview> = z.object({
  id: z.string().min(1),
  logoHints: z.array(z.string().min(1)).min(1),
  logoUrl: z.string().min(1).optional(),
  name: z.string().min(1),
});

export const alternativeAppsCatalogItemSchema: z.ZodType<AlternativeAppsCatalogItem> = z.object({
  alternativeCount: z.number().int().nonnegative(),
  alternativeNames: z.array(z.string().min(1)),
  alternativePreviewLogoHints: z.array(z.array(z.string().min(1)).min(1)),
  alternativePreviewLogos: z.array(alternativeAppsCatalogLogoPreviewSchema).optional(),
  categoryId: z.string().min(1),
  categoryLabel: z.string().min(1),
  description: z.string().min(1),
  href: z.string().min(1),
  id: z.string().min(1),
  keywords: z.array(z.string().min(1)).optional(),
  logoHints: z.array(z.string().min(1)).min(1),
  logoUrl: z.string().min(1).optional(),
  name: z.string().min(1),
  slug: z.string().min(1),
});

export const alternativeAppsCatalogCategorySchema: z.ZodType<AlternativeAppsCatalogCategory> = z.object({
  count: z.number().int().nonnegative(),
  id: z.string().min(1),
  label: z.string().min(1),
});

export const alternativeAppsCatalogResponseSchema: z.ZodType<AlternativeAppsCatalogResponse> = z.object({
  categories: z.array(alternativeAppsCatalogCategorySchema).min(1),
  hasMore: z.boolean(),
  items: z.array(alternativeAppsCatalogItemSchema),
  nextCursor: z.string().min(1).nullable(),
  query: z.string(),
  selectedCategoryId: z.string().min(1),
  take: z.number().int().positive(),
  totalCount: z.number().int().nonnegative(),
});

export function getAlternativeAppsCatalogApiUrl({
  categoryId = "all",
  cursor,
  query = "",
  take = alternativeAppsCatalogDefaultTake,
}: {
  categoryId?: string;
  cursor?: string | null;
  query?: string;
  take?: number;
} = {}) {
  const params = new URLSearchParams();

  if (categoryId && categoryId !== "all") {
    params.set("categoryId", categoryId);
  }

  if (query.trim()) {
    params.set("query", query.trim());
  }

  if (cursor) {
    params.set("cursor", cursor);
  }

  if (take > 0) {
    params.set("take", String(take));
  }

  const queryString = params.toString();

  return queryString ? `/api/site/alternative-apps/catalog?${queryString}` : "/api/site/alternative-apps/catalog";
}
