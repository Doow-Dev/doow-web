import { NextResponse } from "next/server";

import { getAlternativeAppDetailsResponse } from "@/lib/server/alternative-apps-service";

export async function GET(_request: Request, context: { params: Promise<{ appId: string }> }) {
  const { appId } = await context.params;
  const result = await getAlternativeAppDetailsResponse(appId);

  if (result.status === "not-found") {
    return NextResponse.json(
      {
        error: "Unknown application id.",
      },
      {
        status: 404,
      },
    );
  }

  if (result.status === "empty") {
    return NextResponse.json(
      {
        error: "Application alternatives are temporarily unavailable.",
      },
      {
        status: 503,
      },
    );
  }

  return NextResponse.json(result.details, {
    headers: {
      "Cache-Control": "public, max-age=0, s-maxage=300, stale-while-revalidate=60",
    },
  });
}
