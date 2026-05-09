import { getAllDocsPages } from "@/lib/docs/content";

export const dynamic = "force-static";

const docsSiteUrl = process.env.NEXT_PUBLIC_DOCS_SITE_URL ?? "https://docs.doow.co";

export async function GET() {
  const pages = await getAllDocsPages();

  const lines: string[] = [
    "# Doow Docs",
    "",
    "> Production documentation for Doow setup, workflows, integrations, and releases.",
    "",
    `Site: ${docsSiteUrl}`,
    "",
    "## Pages",
    "",
  ];

  for (const page of pages) {
    const url = `${docsSiteUrl}${page.canonicalPath}`;
    lines.push(`- [${page.title}](${url}): ${page.description}`);
  }

  return new Response(lines.join("\n"), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=300, stale-while-revalidate=86400",
    },
  });
}
