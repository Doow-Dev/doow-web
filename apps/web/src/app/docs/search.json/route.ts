import { buildDocsSearchRecords } from "@/lib/docs/search";
import { getAllDocsPages } from "@/lib/docs/content";

export const dynamic = "force-static";

export async function GET() {
  const records = buildDocsSearchRecords(await getAllDocsPages());

  return Response.json(records);
}
