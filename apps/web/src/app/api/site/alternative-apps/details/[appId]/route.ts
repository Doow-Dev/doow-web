import { NextResponse } from "next/server";

import { getAlternativeAppDetailsResponse } from "@/lib/server/alternative-apps-service";

export async function GET(_request: Request, context: { params: Promise<{ appId: string }> }) {
  const { appId } = await context.params;
  const response = await getAlternativeAppDetailsResponse(appId);

  if (!response) {
    return NextResponse.json(
      {
        error: "Unknown application id.",
      },
      {
        status: 404,
      },
    );
  }

  return NextResponse.json(response, {
    headers: {
      "Cache-Control": "public, max-age=0, s-maxage=300, stale-while-revalidate=60",
    },
  });
}
