import fs from "node:fs/promises";
import path from "node:path";

import matter from "gray-matter";
import { toString } from "mdast-util-to-string";
import readingTime from "reading-time";
import { cache } from "react";
import remarkFrontmatter from "remark-frontmatter";
import remarkMdx from "remark-mdx";
import remarkParse from "remark-parse";
import { unified } from "unified";
import { visit } from "unist-util-visit";

import { getBlogCoverUrl, isBlogAssetPath } from "./assets";
import { getAllAuthors } from "./authors";
import { blogUrl } from "./config";
import { createHeadingSlugger, getCategory, normalizeTag } from "./taxonomy";
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

type MdxAttribute = {
  name?: string;
  type?: string;
  value?: unknown;
};

type MdxElementNode = {
  attributes?: MdxAttribute[];
  name?: string | null;
  type: string;
};

type MarkdownImageNode = {
  alt?: string | null;
  type: string;
  url?: string;
};

type MarkdownHeadingNode = {
  depth?: number;
  type: string;
};

type MarkdownParagraphNode = {
  type: string;
};

function postError(filename: string, field: string, message: string) {
  return new Error(`[blog] ${filename}: ${field} - ${message}`);
}

function parseMdx(body: string, filename: string) {
  try {
    return unified().use(remarkParse).use(remarkMdx).use(remarkFrontmatter, ["yaml"]).parse(body);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to parse MDX";

    throw postError(filename, "body", message);
  }
}

function getAttributeValue(node: MdxElementNode, name: string) {
  const attribute = node.attributes?.find((item) => item.type === "mdxJsxAttribute" && item.name === name);

  return typeof attribute?.value === "string" ? attribute.value : undefined;
}

function validateMdxElements(tree: ReturnType<typeof parseMdx>) {
  const errors: string[] = [];
  const explicitHeadingIds = new Set<string>();

  visit(tree, (node) => {
    const element = node as MdxElementNode;

    return element.type === "mdxJsxFlowElement" || element.type === "mdxJsxTextElement";
  }, (node) => {
    const element = node as MdxElementNode;
    const name = element.name;

    if (!name) {
      return;
    }

    for (const attribute of element.attributes ?? []) {
      if (attribute.type === "mdxJsxAttribute" && attribute.name && /^on[A-Z]/.test(attribute.name)) {
        errors.push(`${attribute.name} - inline event handlers are not supported in blog MDX`);
      }
    }

    if (/^[A-Z]/.test(name)) {
      if (!ALLOWED_MDX_COMPONENTS.has(name)) {
        errors.push(`${name} - unsupported MDX component`);
      }

      return;
    }

    if (UNSAFE_HTML_ELEMENTS.has(name)) {
      errors.push(`${name} - unsafe HTML tag is not supported in blog MDX`);

      return;
    }

    if (!ALLOWED_HTML_ELEMENTS.has(name) && !/^h[2-6]$/.test(name)) {
      errors.push(`${name} - unsupported HTML tag in blog MDX`);
    }

    if (/^h[2-6]$/.test(name)) {
      const id = getAttributeValue(element, "id");

      if (id) {
        if (explicitHeadingIds.has(id)) {
          errors.push(`id - duplicate explicit heading id "${id}"`);
        }

        explicitHeadingIds.add(id);
      }
    }
  });

  return errors;
}

function validateInlineImages(tree: ReturnType<typeof parseMdx>) {
  const errors: string[] = [];

  visit(tree, "image", (node) => {
    const image = node as MarkdownImageNode;

    if (!image.url) {
      errors.push("image - inline images must include a URL");
    }

    if (!image.alt?.trim()) {
      errors.push("imageAlt - inline images must include descriptive alt text");
    }

    if (image.url && !isBlogAssetPath(image.url)) {
      errors.push("image - expected a CDN-relative blog image path such as blog/covers/sample.jpg");
    }
  });

  return errors;
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

function extractToc(tree: ReturnType<typeof parseMdx>): BlogTocItem[] {
  const slugger = createHeadingSlugger();
  const toc: BlogTocItem[] = [];

  visit(tree, "heading", (node) => {
    const heading = node as MarkdownHeadingNode;

    if (heading.depth !== 2 && heading.depth !== 3) {
      return;
    }

    const text = toString(node).trim();

    if (!text) {
      return;
    }

    toc.push({
      depth: heading.depth,
      id: slugger.slug(text),
      text,
    });
  });

  return toc;
}

function extractExcerpt(tree: ReturnType<typeof parseMdx>, fallback: string) {
  let excerpt = "";

  visit(tree, "paragraph", (node) => {
    if (excerpt) {
      return;
    }

    const paragraph = node as MarkdownParagraphNode;
    const value = toString(paragraph).trim().replace(/\s+/g, " ");

    if (value) {
      excerpt = value;
    }
  });

  return excerpt || fallback;
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
  const tree = parseMdx(parsed.content, filename);
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

  validationErrors.push(...validateMdxElements(tree), ...validateInlineImages(tree));

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
