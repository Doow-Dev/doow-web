import "server-only";

import {
  transformAlternativeAppDetailResponse,
  transformAlternativeAppsCatalogResponse,
} from "@/lib/site/alternative-apps-adapters";
import { alternativeAppDetailResponseSchema } from "@/lib/site/alternative-app-details";
import {
  alternativeAppsCatalogDefaultTake,
  alternativeAppsCatalogResponseSchema,
} from "@/lib/site/alternative-apps-catalog";
import { fetchDoowApi } from "@/lib/server/doow-api-client";

export async function getAlternativeAppsCatalogResponse({
  categoryId = "all",
  cursor,
  featured,
  query = "",
  take = alternativeAppsCatalogDefaultTake,
}: {
  categoryId?: string;
  cursor?: string | null;
  featured?: boolean;
  query?: string;
  take?: number;
} = {}) {
  const category = categoryId === "all" ? undefined : categoryId;
  const [categoriesRaw, catalogRaw] = await Promise.all([
    fetchDoowApi<unknown>({
      path: "/alternatives/catalog/categories",
      timeoutMs: 20_000,
    }),
    fetchDoowApi<unknown>({
      path: "/alternatives/catalog",
      params: {
        category,
        cursor,
        featured,
        name: query.trim() || undefined,
        take,
      },
      timeoutMs: 20_000,
    }),
  ]);

  return alternativeAppsCatalogResponseSchema.parse(
    transformAlternativeAppsCatalogResponse({
      categoriesRaw,
      catalogRaw,
      options: {
        categoryId,
        cursor,
        query,
        take,
      },
    }),
  );
}

export async function getAlternativeAppDetailsResponse(appId: string | undefined) {
  if (!appId) {
    return null;
  }

  const raw = await fetchDoowApi<unknown>({
    path: "/alternatives/catalog/hero",
    params: {
      source_app_id: appId,
      take: 1,
    },
  });
  const response = transformAlternativeAppDetailResponse(raw, appId);

  return response ? alternativeAppDetailResponseSchema.parse(response) : null;
}
