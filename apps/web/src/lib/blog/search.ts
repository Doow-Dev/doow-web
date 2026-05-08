import type { Post, PostMeta } from "./types";

export interface SearchEntry {
  category: string;
  description: string;
  excerpt: string;
  publishedAt: string;
  slug: string;
  tags: string[];
  title: string;
}

function compactText(value: string) {
  return value.replace(/\s+/g, " ").trim();
}

function stripMdx(value: string) {
  return compactText(
    value
      .replace(/^---[\s\S]*?---/, " ")
      .replace(/```[\s\S]*?```/g, " ")
      .replace(/<[^>]+>/g, " ")
      .replace(/!\[[^\]]*]\([^)]*\)/g, " ")
      .replace(/\[([^\]]+)]\([^)]*\)/g, "$1")
      .replace(/[#>*_`~|-]/g, " "),
  );
}

function excerptForPost(post: Post) {
  const source = stripMdx(post.body) || post.excerpt || post.description;

  return compactText(source).slice(0, 300);
}

function assertSearchEntry(entry: SearchEntry) {
  const required = [entry.slug, entry.title, entry.description, entry.category, entry.publishedAt, entry.excerpt];

  if (required.some((value) => !value)) {
    throw new Error(`[blog-search] Invalid search entry for ${entry.slug || "unknown post"}`);
  }
}

export function buildSearchIndex(posts: Post[]) {
  const entries = posts
    .filter((post) => !post.draft)
    .map((post) => {
      const entry: SearchEntry = {
        category: post.category.label,
        description: post.description,
        excerpt: excerptForPost(post),
        publishedAt: post.publishedAt,
        slug: post.slug,
        tags: post.tags,
        title: post.title,
      };

      assertSearchEntry(entry);

      return entry;
    });

  return entries;
}

export function searchEntryFromMeta(post: PostMeta): SearchEntry {
  const entry: SearchEntry = {
    category: post.category.label,
    description: post.description,
    excerpt: post.excerpt,
    publishedAt: post.publishedAt,
    slug: post.slug,
    tags: post.tags,
    title: post.title,
  };

  assertSearchEntry(entry);

  return entry;
}
