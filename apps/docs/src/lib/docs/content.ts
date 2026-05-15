import fs from "node:fs/promises";
import path from "node:path";

import {
  collectMarkdownLinks,
  extractHeadings,
  formatMdxValidationError,
  parseMdx,
  validateMarkdownImages,
  validateMarkdownLinks,
  validateMdxComponents,
} from "@doow/mdx";
import matter from "gray-matter";
import { cache } from "react";

import { allowedDocsHtmlElements, allowedDocsMdxComponents } from "./mdx-config";
import { docsNavigationBySlug } from "./navigation";
import { docsFilenamesForSlug, docsPathForSlug } from "./paths";
import { validateDocsFrontmatter } from "./schema";
import type { DocsPage, DocsTocItem } from "./types";

const DOCS_DIR = path.join(process.cwd(), "content", "docs");

function docsError(filename: string, field: string, message: string) {
  return new Error(`[docs] ${filename}: ${field} - ${message}`);
}

function parseDocsMdx(body: string, filename: string) {
  try {
    return parseMdx(body);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to parse MDX";

    throw docsError(filename, "body", message);
  }
}

function extractToc(tree: ReturnType<typeof parseDocsMdx>): DocsTocItem[] {
  return extractHeadings(tree, { depths: [2, 3] }).map((heading) => ({
    depth: heading.depth as 2 | 3,
    id: heading.id,
    text: heading.text,
  }));
}

export async function getDocsFiles() {
  async function walk(dir: string, prefix = ""): Promise<string[]> {
    const entries = await fs.readdir(dir, { withFileTypes: true });
    const files = await Promise.all(
      entries.map(async (entry) => {
        const relativePath = prefix ? `${prefix}/${entry.name}` : entry.name;
        const fullPath = path.join(dir, entry.name);

        if (entry.isDirectory()) {
          return walk(fullPath, relativePath);
        }

        if (entry.isFile() && entry.name.endsWith(".mdx")) {
          return [relativePath];
        }

        return [];
      }),
    );

    return files.flat();
  }

  return (await walk(DOCS_DIR)).sort();
}

export async function readDocsPage(filename: string): Promise<DocsPage> {
  const raw = await fs.readFile(path.join(DOCS_DIR, filename), "utf8");
  const parsed = matter(raw);
  const frontmatter = validateDocsFrontmatter(parsed.data, filename);
  const expectedFilenames = docsFilenamesForSlug(frontmatter.slug);
  const tree = parseDocsMdx(parsed.content, filename);
  const validationErrors: string[] = [];

  if (!expectedFilenames.includes(filename)) {
    validationErrors.push(`slug - expected ${expectedFilenames.join(" or ")} for slug "${frontmatter.slug}"`);
  }

  if (!docsNavigationBySlug.has(frontmatter.slug)) {
    validationErrors.push(`slug - "${frontmatter.slug}" is missing from docs navigation`);
  }

  validationErrors.push(
    ...validateMdxComponents(tree, {
      allowedHtmlElements: allowedDocsHtmlElements,
      allowedMdxComponents: allowedDocsMdxComponents,
      allowHeadingElements: true,
    }).map(formatMdxValidationError),
    ...validateMarkdownImages(tree, {
      invalidUrlMessage: "expected a docs-relative image path",
      validateUrl: (url) => !url.startsWith("/") && !/^https?:\/\//.test(url) && !url.includes(".."),
    }).map(formatMdxValidationError),
    ...validateMarkdownLinks(tree).map(formatMdxValidationError),
  );

  if (validationErrors.length > 0) {
    throw new Error(validationErrors.map((message) => `[docs] ${filename}: ${message}`).join("\n"));
  }

  return {
    ...frontmatter,
    body: parsed.content,
    canonicalPath: docsPathForSlug(frontmatter.slug),
    links: collectMarkdownLinks(tree).map((link) => link.url),
    sourcePath: filename,
    toc: extractToc(tree),
  };
}

async function readAllDocsPages() {
  const pages = await Promise.all((await getDocsFiles()).map(readDocsPage));

  return pages.sort((a, b) => {
    if (a.order !== b.order) {
      return a.order - b.order;
    }

    return a.title.localeCompare(b.title);
  });
}

export const getAllDocsPages = cache(async (options: { includeDrafts?: boolean } = {}) => {
  const pages = await readAllDocsPages();

  return pages
    .filter((page) => options.includeDrafts || page.status === "published");
});

export const getDocsPageBySlug = cache(async (slug: string) => {
  const pages = await getAllDocsPages();

  return pages.find((page) => page.slug === slug) ?? null;
});
