import { NextResponse } from "next/server";

import { getAlternativeAppsCatalogResponse } from "@/lib/server/alternative-apps-service";
import { alternativeAppsCatalogDefaultTake } from "@/lib/site/alternative-apps-catalog";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const categoryId = searchParams.get("categoryId")?.trim() || "all";
  const cursor = searchParams.get("cursor")?.trim() || null;
  const featuredParam = searchParams.get("featured")?.trim().toLowerCase();
  const featured = featuredParam === "true" ? true : featuredParam === "false" ? false : undefined;
  const query = searchParams.get("query")?.trim() ?? "";
  const take = Number(searchParams.get("take") ?? alternativeAppsCatalogDefaultTake);
  let response;

  try {
    response = await getAlternativeAppsCatalogResponse({
      categoryId,
      cursor,
      featured,
      query,
      take: Number.isFinite(take) && take > 0 ? take : alternativeAppsCatalogDefaultTake,
    });
  } catch (error) {
    console.error("Alternative apps catalog API request failed.", error);

    return NextResponse.json(
      {
        error: "Alternative apps catalog is temporarily unavailable.",
      },
      {
        headers: {
          "Cache-Control": "no-store",
        },
        status: 504,
      },
    );
  }

  return NextResponse.json(response, {
    headers: {
      "Cache-Control": "public, max-age=0, s-maxage=300, stale-while-revalidate=60",
    },
  });
}
