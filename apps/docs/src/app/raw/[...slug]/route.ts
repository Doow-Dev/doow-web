import fs from "node:fs/promises";
import path from "node:path";

import { getAllDocsPages } from "@/lib/docs/content";
import { docsRouteSegmentsForSlug, docsSlugFromSegments } from "@/lib/docs/paths";

export const dynamic = "force-static";

export async function generateStaticParams() {
  return (await getAllDocsPages()).map((page) => ({ slug: docsRouteSegmentsForSlug(page.slug) }));
}

interface RouteContext {
  params: Promise<{ slug: string[] }>;
}

export async function GET(_request: Request, context: RouteContext) {
  const { slug } = await context.params;
  const routeSlug = docsSlugFromSegments(slug);
  const pages = await getAllDocsPages();
  const page = pages.find((entry) => entry.slug === routeSlug);

  if (!page) {
    return new Response("Not found", { status: 404 });
  }

  const raw = await fs.readFile(path.join(process.cwd(), "content", "docs", page.sourcePath), "utf8");

  return new Response(raw, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, max-age=300, stale-while-revalidate=86400",
    },
  });
}
