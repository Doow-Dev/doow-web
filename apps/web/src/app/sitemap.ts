import type { MetadataRoute } from "next";

import { BLOG_LIVE, blogUrl } from "@/lib/blog/config";
import { getAllPostMeta, getAllTags } from "@/lib/blog/content";
import { getAllDocsPages } from "@/lib/docs/content";
import { POSTS_PER_PAGE } from "@/lib/blog/posts";
import { absoluteSiteUrl } from "@/lib/seo/site";

const STATIC_ROUTES = [
  "",
  "/about_us",
  "/alternative-apps",
  "/applications",
  "/doow-ai",
  "/expenses",
  "/integrations",
  "/pricing",
  "/privacy_policy",
  "/subscriptions",
  "/terms_of_use",
];

function paginatedEntries(basePath: string, totalPosts: number, priority: number) {
  const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE);

  return Array.from({ length: Math.max(0, totalPages - 1) }, (_, index) => ({
    changeFrequency: "monthly",
    lastModified: new Date(),
    priority,
    url: blogUrl(`${basePath}/page/${index + 2}`),
  })) satisfies MetadataRoute.Sitemap;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticEntries = STATIC_ROUTES.map((route) => ({
    changeFrequency: route === "" ? "weekly" : "monthly",
    lastModified: new Date(),
    priority: route === "" ? 1 : 0.7,
    url: absoluteSiteUrl(route || "/"),
  })) satisfies MetadataRoute.Sitemap;

  const docsPages = await getAllDocsPages();
  const docsEntries = docsPages.map((page) => ({
    changeFrequency: "monthly" as const,
    lastModified: page.updatedAt ? new Date(page.updatedAt) : new Date(),
    priority: 0.6,
    url: absoluteSiteUrl(page.canonicalPath),
  })) satisfies MetadataRoute.Sitemap;

  if (!BLOG_LIVE) {
    return [...staticEntries, ...docsEntries];
  }

  const blogIndexEntry = {
    changeFrequency: "weekly",
    lastModified: new Date(),
    priority: 0.8,
    url: blogUrl("/blog"),
  } satisfies MetadataRoute.Sitemap[number];

  const posts = await getAllPostMeta();
  const postEntries = posts.map((post) => ({
    changeFrequency: "monthly",
    lastModified: new Date(post.updatedAt ?? post.publishedAt),
    priority: 0.7,
    url: blogUrl(`/blog/${post.slug}`),
  })) satisfies MetadataRoute.Sitemap;

  const tags = await getAllTags();
  const tagEntries = tags.map(({ tag }) => ({
    changeFrequency: "monthly",
    lastModified: new Date(),
    priority: 0.5,
    url: blogUrl(`/blog/tag/${tag}`),
  })) satisfies MetadataRoute.Sitemap;

  const blogPaginationEntries = paginatedEntries("/blog", posts.length, 0.6);
  const tagPaginationEntries = tags.flatMap(({ count, tag }) => {
    return paginatedEntries(`/blog/tag/${tag}`, count, 0.4);
  });

  return [
    ...staticEntries,
    ...docsEntries,
    blogIndexEntry,
    ...postEntries,
    ...tagEntries,
    ...blogPaginationEntries,
    ...tagPaginationEntries,
  ];
}
