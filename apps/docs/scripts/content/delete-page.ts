import fs from "node:fs/promises";
import path from "node:path";

import { getAllDocsPages } from "../../src/lib/docs/content";
import { docsPathForSlug, normalizeDocsSlug } from "../../src/lib/docs/paths";

const [slug] = process.argv.slice(2);

if (!slug) {
  throw new Error("Usage: pnpm docs:delete-page <slug>");
}

const normalizedSlug = normalizeDocsSlug(slug);
const targetPath = docsPathForSlug(normalizedSlug);
const pages = await getAllDocsPages({ includeDrafts: true });
const inboundLinks = pages
  .filter((page) => page.slug !== normalizedSlug)
  .filter((page) => page.links.some((link) => link === targetPath || link.startsWith(`${targetPath}#`)));
const targetPage = pages.find((page) => page.slug === normalizedSlug);

if (inboundLinks.length > 0) {
  throw new Error(
    `Cannot delete ${normalizedSlug}; inbound links exist from: ${inboundLinks.map((page) => page.slug).join(", ")}`,
  );
}

if (!targetPage) {
  throw new Error(`Cannot delete ${normalizedSlug}; page does not exist.`);
}

await fs.unlink(path.join(process.cwd(), "content", "docs", targetPage.sourcePath));

console.log(`Deleted docs page ${normalizedSlug}.`);
