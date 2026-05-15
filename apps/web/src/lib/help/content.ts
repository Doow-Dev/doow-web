import fs from "node:fs/promises";
import path from "node:path";

import { extractHeadings, parseMdx } from "@doow/mdx";
import matter from "gray-matter";
import { cache } from "react";

import { helpPathForArticle } from "./paths";
import { validateHelpFrontmatter } from "./schema";
import type { HelpArticle, HelpCategory, HelpTocItem } from "./types";

const HELP_DIR = path.join(process.cwd(), "content", "help");

function extractToc(tree: ReturnType<typeof parseMdx>): HelpTocItem[] {
  return extractHeadings(tree, { depths: [2, 3] }).map((h) => ({
    depth: h.depth as 2 | 3,
    id: h.id,
    text: h.text,
  }));
}

export async function getHelpFiles(): Promise<string[]> {
  const categories = await fs.readdir(HELP_DIR, { withFileTypes: true });
  const files: string[] = [];
  for (const cat of categories) {
    if (!cat.isDirectory()) continue;
    const entries = await fs.readdir(path.join(HELP_DIR, cat.name), { withFileTypes: true });
    for (const entry of entries) {
      if (entry.isFile() && entry.name.endsWith(".mdx")) {
        files.push(`${cat.name}/${entry.name}`);
      }
    }
  }
  return files.sort();
}

export async function readHelpArticle(filename: string): Promise<HelpArticle> {
  const raw = await fs.readFile(path.join(HELP_DIR, filename), "utf8");
  const parsed = matter(raw);
  const frontmatter = validateHelpFrontmatter(parsed.data, filename);
  const tree = parseMdx(parsed.content);
  const toc = extractToc(tree);
  const canonicalPath = helpPathForArticle(frontmatter.category, frontmatter.slug);

  return {
    ...frontmatter,
    body: parsed.content,
    canonicalPath,
    sourcePath: filename,
    toc,
  };
}

export const getAllHelpArticles = cache(async (): Promise<HelpArticle[]> => {
  const files = await getHelpFiles();
  const articles = await Promise.all(files.map(readHelpArticle));
  return articles
    .filter((a) => a.status === "published")
    .sort((a, b) => a.order - b.order);
});

export async function getHelpArticlesByCategory(category: HelpCategory): Promise<HelpArticle[]> {
  const all = await getAllHelpArticles();
  return all.filter((a) => a.category === category).sort((a, b) => a.order - b.order);
}

export async function getHelpArticle(
  category: HelpCategory,
  slug: string,
): Promise<HelpArticle | null> {
  const all = await getAllHelpArticles();
  return all.find((a) => a.category === category && a.slug === slug) ?? null;
}
