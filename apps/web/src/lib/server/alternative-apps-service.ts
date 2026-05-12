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
import type { AlternativeAppDetailResponse } from "@/lib/site/alternative-app-details";
import { FetchJsonError } from "@/lib/rest/fetch-json";
import { fetchDoowApi } from "@/lib/server/doow-api-client";

export type AlternativeAppDetailsResult =
  | {
      details: AlternativeAppDetailResponse;
      status: "found";
    }
  | {
      status: "empty";
    }
  | {
      status: "not-found";
    };

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

export async function getAlternativeAppDetailsResponse(appId: string | undefined): Promise<AlternativeAppDetailsResult> {
  if (!appId) {
    return { status: "not-found" };
  }

  let raw;

  try {
    raw = await fetchDoowApi<unknown>({
      path: "/alternatives/catalog/hero",
      params: {
        source_app_id: appId,
        take: 1,
      },
    });
  } catch (error) {
    if (error instanceof FetchJsonError && error.status === 404) {
      return { status: "not-found" };
    }

    throw error;
  }

  const response = transformAlternativeAppDetailResponse(raw, appId);

  if (!response) {
    return { status: "empty" };
  }

  return {
    details: alternativeAppDetailResponseSchema.parse(response),
    status: "found",
  };
}
