import { NextResponse } from "next/server";

import { alternativeAppsSectionContent } from "@/app/(landing)/_components/alternative-apps/content";
import { getAlternativeAppsResponse, isAlternativeAppsAppId } from "@/lib/site/alternative-apps";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const appId = searchParams.get("appId")?.trim() ?? alternativeAppsSectionContent.initialSelectedAppId;

  if (!isAlternativeAppsAppId(appId)) {
    return NextResponse.json(
      {
        error: "Unknown application id.",
      },
      {
        status: 404,
      }
    );
  }

  const response = await getAlternativeAppsResponse(appId);

  return NextResponse.json(response, {
    headers: {
      "Cache-Control": "public, max-age=0, s-maxage=300, stale-while-revalidate=60",
    },
  });
}
