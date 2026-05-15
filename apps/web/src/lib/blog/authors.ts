import fs from "node:fs/promises";
import path from "node:path";

import matter from "gray-matter";
import { cache } from "react";

import { assertBlogAssetPath, getAuthorAvatarUrl } from "./assets";
import { validateAuthorFrontmatter } from "./schema";
import type { Author } from "./types";

const AUTHORS_DIR = path.join(process.cwd(), "content", "blog", "authors");

function authorError(filename: string, field: string, message: string) {
  return new Error(`[blog] ${filename}: ${field} - ${message}`);
}

async function getAuthorFiles() {
  const entries = await fs.readdir(AUTHORS_DIR, { withFileTypes: true });

  return entries
    .filter((entry) => entry.isFile() && entry.name.endsWith(".mdx"))
    .map((entry) => entry.name)
    .sort();
}

async function readAuthor(filename: string): Promise<Author> {
  const slug = filename.replace(/\.mdx$/, "");
  const raw = await fs.readFile(path.join(AUTHORS_DIR, filename), "utf8");
  const parsed = matter(raw);
  const frontmatter = validateAuthorFrontmatter(parsed.data, filename);
  const resolvedSlug = frontmatter.slug ?? slug;

  if (resolvedSlug !== slug) {
    throw authorError(filename, "slug", `must match author filename "${slug}"`);
  }

  if (frontmatter.avatar) {
    assertBlogAssetPath(frontmatter.avatar, filename, "avatar");
  }

  return {
    avatar: frontmatter.avatar ? getAuthorAvatarUrl(frontmatter.avatar) : undefined,
    avatarAlt: frontmatter.avatarAlt,
    bio: frontmatter.bio,
    name: frontmatter.name,
    role: frontmatter.role,
    slug: resolvedSlug,
    socials: frontmatter.socials,
  };
}

export const getAllAuthors = cache(async () => {
  const authors = await Promise.all((await getAuthorFiles()).map((filename) => readAuthor(filename)));
  const seen = new Set<string>();

  for (const author of authors) {
    if (seen.has(author.slug)) {
      throw authorError(`${author.slug}.mdx`, "slug", "duplicate author slug");
    }

    seen.add(author.slug);
  }

  return authors;
});

export const getAuthorBySlug = cache(async (slug: string) => {
  const authors = await getAllAuthors();

  return authors.find((author) => author.slug === slug) ?? null;
});
