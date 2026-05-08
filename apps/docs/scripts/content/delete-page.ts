import fs from "node:fs/promises";
import path from "node:path";

import { getAllDocsPages } from "../../src/lib/docs/content";

const [slug] = process.argv.slice(2);

if (!slug) {
  throw new Error("Usage: pnpm docs:delete-page <slug>");
}

const targetPath = `/${slug}`;
const pages = await getAllDocsPages({ includeDrafts: true });
const inboundLinks = pages
  .filter((page) => page.slug !== slug)
  .filter((page) => page.links.some((link) => link === targetPath || link.startsWith(`${targetPath}#`)));

if (inboundLinks.length > 0) {
  throw new Error(
    `Cannot delete ${slug}; inbound links exist from: ${inboundLinks.map((page) => page.slug).join(", ")}`,
  );
}

await fs.unlink(path.join(process.cwd(), "content", "docs", `${slug}.mdx`));

console.log(`Deleted docs page ${slug}.`);
