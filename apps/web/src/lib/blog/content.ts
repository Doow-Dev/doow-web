import fs from "node:fs/promises";
import path from "node:path";

import {
  extractFirstParagraphText,
  extractHeadings,
  formatMdxValidationError,
  parseMdx,
  validateMarkdownImages,
  validateMdxComponents,
} from "@doow/mdx";
import matter from "gray-matter";
import readingTime from "reading-time";
import { cache } from "react";

import { getBlogCoverUrl, isBlogAssetPath } from "./assets";
import { getAllAuthors } from "./authors";
import { blogUrl } from "./config";
import { getCategory, normalizeTag } from "./taxonomy";
import { validatePostFrontmatter } from "./schema";
import type { Author, BlogTocItem, Post, PostMeta } from "./types";

const POSTS_DIR = path.join(process.cwd(), "content", "blog");
const ALLOWED_MDX_COMPONENTS = new Set(["CTA", "Callout", "Quote"]);
const ALLOWED_HTML_ELEMENTS = new Set(["br", "cite", "em", "strong", "sub", "sup"]);
export const POSTS_PER_PAGE = 9;
const UNSAFE_HTML_ELEMENTS = new Set([
  "embed",
  "form",
  "iframe",
  "link",
  "meta",
  "object",
  "script",
  "style",
]);

function postError(filename: string, field: string, message: string) {
  return new Error(`[blog] ${filename}: ${field} - ${message}`);
}

function parseBlogMdx(body: string, filename: string) {
  try {
    return parseMdx(body);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to parse MDX";

    throw postError(filename, "body", message);
  }
}

function normalizeTags(tags: string[]) {
  const seen = new Set<string>();
  const normalized: string[] = [];

  for (const tag of tags) {
    const value = normalizeTag(tag);

    if (!value || seen.has(value)) {
      continue;
    }

    seen.add(value);
    normalized.push(value);
  }

  return normalized;
}

function extractToc(tree: ReturnType<typeof parseBlogMdx>): BlogTocItem[] {
  return extractHeadings(tree, { depths: [2, 3] }).map((heading) => ({
    depth: heading.depth as 2 | 3,
    id: heading.id,
    text: heading.text,
  }));
}

function extractExcerpt(tree: ReturnType<typeof parseBlogMdx>, fallback: string) {
  return extractFirstParagraphText(tree) || fallback;
}

async function getPostFiles() {
  const entries = await fs.readdir(POSTS_DIR, { withFileTypes: true });

  return entries
    .filter((entry) => entry.isFile() && entry.name.endsWith(".mdx"))
    .map((entry) => entry.name)
    .sort();
}

function toPostMeta(post: Post): PostMeta {
  const { body, ...meta } = post;

  void body;
  return meta;
}

function paginatePosts(posts: PostMeta[], page: number, perPage = POSTS_PER_PAGE) {
  const offset = (page - 1) * perPage;

  return {
    currentPage: page,
    perPage,
    posts: posts.slice(offset, offset + perPage),
    totalPages: Math.ceil(posts.length / perPage),
    totalPosts: posts.length,
  };
}

async function readPost(filename: string, authorsBySlug: Map<string, Author>, allSlugs: Set<string>): Promise<Post> {
  const slug = filename.replace(/\.mdx$/, "");
  const raw = await fs.readFile(path.join(POSTS_DIR, filename), "utf8");
  const parsed = matter(raw);
  const frontmatter = validatePostFrontmatter(parsed.data, filename);
  const tree = parseBlogMdx(parsed.content, filename);
  const validationErrors: string[] = [];
  const authors = frontmatter.authors.map((authorSlug) => {
    const author = authorsBySlug.get(authorSlug);

    if (!author) {
      validationErrors.push(`authors - unknown author slug "${authorSlug}"`);
    }

    return author;
  }).filter((author): author is Author => Boolean(author));

  if (frontmatter.image) {
    if (!isBlogAssetPath(frontmatter.image)) {
      validationErrors.push("image - expected a CDN-relative blog image path such as blog/covers/sample.jpg");
    }
  }

  for (const relatedSlug of frontmatter.related) {
    if (relatedSlug === slug) {
      validationErrors.push("related - a post cannot be related to itself");
    }

    if (!allSlugs.has(relatedSlug)) {
      validationErrors.push(`related - unknown related post slug "${relatedSlug}"`);
    }
  }

  validationErrors.push(
    ...validateMdxComponents(tree, {
      allowedHtmlElements: ALLOWED_HTML_ELEMENTS,
      allowedMdxComponents: ALLOWED_MDX_COMPONENTS,
      allowHeadingElements: true,
      unsafeHtmlElements: UNSAFE_HTML_ELEMENTS,
    }).map(formatMdxValidationError),
    ...validateMarkdownImages(tree, {
      invalidUrlMessage: "expected a CDN-relative blog image path such as blog/covers/sample.jpg",
      validateUrl: isBlogAssetPath,
    }).map(formatMdxValidationError),
  );

  if (validationErrors.length > 0) {
    throw new Error(validationErrors.map((message) => `[blog] ${filename}: ${message}`).join("\n"));
  }

  return {
    authors,
    body: parsed.content,
    canonicalUrl: frontmatter.canonicalUrl ?? blogUrl(`/blog/${slug}`),
    category: getCategory(frontmatter.category),
    description: frontmatter.description,
    draft: frontmatter.draft,
    excerpt: extractExcerpt(tree, frontmatter.description),
    featured: frontmatter.featured,
    image: frontmatter.image ? getBlogCoverUrl(frontmatter.image) : undefined,
    imageAlt: frontmatter.imageAlt,
    publishedAt: frontmatter.publishedAt,
    readingTime: readingTime(parsed.content).text,
    related: frontmatter.related,
    slug,
    tags: normalizeTags(frontmatter.tags),
    title: frontmatter.title,
    toc: extractToc(tree),
    updatedAt: frontmatter.updatedAt,
  };
}

async function readAllPosts() {
  const [files, authors] = await Promise.all([getPostFiles(), getAllAuthors()]);
  const allSlugs = new Set(files.map((filename) => filename.replace(/\.mdx$/, "")));
  const authorsBySlug = new Map(authors.map((author) => [author.slug, author]));
  const posts = await Promise.all(files.map((filename) => readPost(filename, authorsBySlug, allSlugs)));

  return posts.sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}

export const getAllPosts = cache(async (options: { includeDrafts?: boolean } = {}) => {
  const posts = await readAllPosts();

  return options.includeDrafts ? posts : posts.filter((post) => !post.draft);
});

export const getAllPostMeta = cache(async (options: { includeDrafts?: boolean } = {}) => {
  return (await getAllPosts(options)).map(toPostMeta);
});

export const getBlogSlugs = cache(async (options: { includeDrafts?: boolean } = {}) => {
  return (await getAllPosts(options)).map((post) => post.slug);
});

export const getPostBySlug = cache(async (slug: string, options: { includeDrafts?: boolean } = {}) => {
  const posts = await getAllPosts(options);

  return posts.find((post) => post.slug === slug) ?? null;
});

export const getPostsByCategory = cache(async (category: string) => {
  const posts = await getAllPostMeta();

  return posts.filter((post) => post.category.slug === category);
});

export const getPostsByTag = cache(async (tag: string) => {
  const normalizedTag = normalizeTag(tag);
  const posts = await getAllPostMeta();

  return posts.filter((post) => post.tags.includes(normalizedTag));
});

export const getPaginatedPosts = cache(async (page: number, perPage = POSTS_PER_PAGE) => {
  return paginatePosts(await getAllPostMeta(), page, perPage);
});

export const getPaginatedPostsByCategory = cache(async (category: string, page: number, perPage = POSTS_PER_PAGE) => {
  return paginatePosts(await getPostsByCategory(category), page, perPage);
});

export const getPaginatedPostsByTag = cache(async (tag: string, page: number, perPage = POSTS_PER_PAGE) => {
  return paginatePosts(await getPostsByTag(tag), page, perPage);
});

export const getAllTags = cache(async () => {
  const counts = new Map<string, number>();
  const posts = await getAllPostMeta();

  for (const post of posts) {
    for (const tag of post.tags) {
      counts.set(tag, (counts.get(tag) ?? 0) + 1);
    }
  }

  return Array.from(counts, ([tag, count]) => ({ tag, count })).sort((a, b) => {
    if (b.count !== a.count) {
      return b.count - a.count;
    }

    return a.tag.localeCompare(b.tag);
  });
});
