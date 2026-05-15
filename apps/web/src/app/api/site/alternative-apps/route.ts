import { NextResponse } from "next/server";

import {
  getLandingAlternativeAppsResponse,
  LandingAlternativeAppsDataError,
} from "@/lib/server/landing-alternative-apps-service";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const appId = searchParams.get("appId")?.trim();

  try {
    const response = await getLandingAlternativeAppsResponse(appId);

    return NextResponse.json(response, {
      headers: {
        "Cache-Control": "public, max-age=0, s-maxage=300, stale-while-revalidate=60",
      },
    });
  } catch (error) {
    const status = error instanceof LandingAlternativeAppsDataError ? error.status : 502;

    return NextResponse.json(
      {
        error:
          status === 404
            ? "Alternative application comparison is unavailable."
            : "Alternative applications are temporarily unavailable.",
      },
      {
        status,
      },
    );
  }
}
