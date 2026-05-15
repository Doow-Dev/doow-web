import "server-only";

import {
  getIntegrationCatalogCategoryLabel,
  transformIntegrationCatalogCategories,
  transformIntegrationCatalogResponse,
} from "@/lib/site/integration-catalog-adapters";
import { integrationCatalogResponseSchema } from "@/lib/site/integration-catalog";
import { fetchDoowApi } from "@/lib/server/doow-api-client";

export async function getIntegrationCatalogResponse({
  categoryId = "all",
  query = "",
}: {
  categoryId?: string;
  query?: string;
} = {}) {
  const categoriesRaw = await fetchDoowApi<unknown>({
    path: "/integrations/catalog/categories",
  });
  const categories = transformIntegrationCatalogCategories(categoriesRaw);
  const category = getIntegrationCatalogCategoryLabel(categories, categoryId);
  const selectedCategoryId = category ? categoryId : "all";
  const catalogRaw = await fetchDoowApi<unknown>({
    path: "/integrations/catalog",
    params: {
      category,
      name: query.trim() || undefined,
    },
  });

  return integrationCatalogResponseSchema.parse(
    transformIntegrationCatalogResponse({
      catalogRaw,
      categories,
      options: {
        categoryId: selectedCategoryId,
        query,
      },
    }),
  );
}
