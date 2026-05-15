import { NextResponse } from "next/server";

import { buildHelpSearchIndex } from "@/lib/help/search";

export const dynamic = "force-static";

export async function GET() {
  const index = await buildHelpSearchIndex();
  return NextResponse.json(index);
}
