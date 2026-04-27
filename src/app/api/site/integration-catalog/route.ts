import { NextResponse } from "next/server";

import { getIntegrationCatalogResponse } from "@/lib/site/integration-catalog";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const categoryId = searchParams.get("categoryId")?.trim() || "all";
  const query = searchParams.get("query")?.trim() ?? "";
  const response = await getIntegrationCatalogResponse({ categoryId, query });

  return NextResponse.json(response, {
    headers: {
      "Cache-Control": "public, max-age=0, s-maxage=300, stale-while-revalidate=60",
    },
  });
}
