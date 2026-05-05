import type { Metadata } from "next";

import type { Author, Category, Post } from "@/lib/blog/types";

import { getBlogOgImageUrl } from "./assets";
import { BLOG_CONFIG, BLOG_LIVE, blogUrl } from "./config";
import { formatTagLabel } from "./taxonomy";

const robots = BLOG_LIVE ? { follow: true, index: true } : { follow: false, index: false };

export function safeJsonLd(data: unknown) {
  return JSON.stringify(data, null, 2).replace(/</g, "\\u003c");
}

function formatTitle(title: string) {
  return `${title} | ${BLOG_CONFIG.siteName}`;
}

function authorNames(authors: Author[]) {
  return authors.map((author) => author.name).join(", ");
}

function articleOgImage(post: Post) {
  return blogUrl(
    getBlogOgImageUrl({
      author: authorNames(post.authors),
      category: post.category.label,
      date: post.publishedAt,
      title: post.title,
    }),
  );
}

export function buildIndexMetadata(page?: number): Metadata {
  const title = page && page > 1 ? `Blog - Page ${page}` : "Blog";
  const url = page && page > 1 ? blogUrl(`/blog/page/${page}`) : blogUrl("/blog");
  const alternates: Metadata["alternates"] = {
    canonical: url,
  };

  if (!page || page === 1) {
    alternates.types = {
      "application/rss+xml": blogUrl(BLOG_CONFIG.feed.path),
    };
  }

  return {
    title,
    description: BLOG_CONFIG.description,
    alternates,
    openGraph: {
      title: formatTitle(title),
      description: BLOG_CONFIG.description,
      siteName: BLOG_CONFIG.siteName,
      type: "website",
      url,
    },
    robots,
    twitter: {
      card: "summary",
      description: BLOG_CONFIG.description,
      title: formatTitle(title),
    },
  };
}

export function buildArticleMetadata(post: Post): Metadata {
  const image = articleOgImage(post);
  const title = formatTitle(post.title);

  return {
    title: post.title,
    description: post.description,
    alternates: {
      canonical: post.canonicalUrl ?? blogUrl(`/blog/${post.slug}`),
    },
    authors: post.authors.map((author) => ({ name: author.name })),
    openGraph: {
      title,
      authors: post.authors.map((author) => author.name),
      description: post.description,
      images: [
        {
          alt: post.imageAlt ?? post.title,
          height: 630,
          url: image,
          width: 1200,
        },
      ],
      modifiedTime: post.updatedAt,
      publishedTime: post.publishedAt,
      siteName: BLOG_CONFIG.siteName,
      tags: post.tags,
      type: "article",
      url: blogUrl(`/blog/${post.slug}`),
    },
    robots,
    twitter: {
      card: "summary_large_image",
      description: post.description,
      images: [image],
      title,
    },
  };
}

export function buildBlogPostingJsonLd(post: Post) {
  const url = blogUrl(`/blog/${post.slug}`);

  return safeJsonLd({
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    author: post.authors.map((author) => ({
      "@type": "Person",
      name: author.name,
      url: `${BLOG_CONFIG.siteUrl}/blog/authors/${author.slug}`,
    })),
    dateModified: post.updatedAt ?? post.publishedAt,
    datePublished: post.publishedAt,
    description: post.description,
    headline: post.title,
    image: articleOgImage(post),
    keywords: post.tags,
    mainEntityOfPage: url,
    publisher: {
      "@type": "Organization",
      name: "Doow",
      url: BLOG_CONFIG.siteUrl,
    },
    url,
  });
}

export function buildAuthorJsonLd(author: Author) {
  return safeJsonLd({
    "@context": "https://schema.org",
    "@type": "Person",
    description: author.bio,
    image: author.avatar,
    jobTitle: author.role,
    name: author.name,
    url: blogUrl(`/blog/authors/${author.slug}`),
  });
}

export function buildBreadcrumbJsonLd(crumbs: { name: string; url: string }[]) {
  return safeJsonLd({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((crumb, index) => ({
      "@type": "ListItem",
      item: crumb.url,
      name: crumb.name,
      position: index + 1,
    })),
  });
}

export function buildCategoryMetadata(category: Category, page?: number): Metadata {
  const title = page && page > 1 ? `${category.label} - Page ${page}` : category.label;
  const categoryPath = page && page > 1 ? `/blog?category=${category.slug}&page=${page}` : `/blog?category=${category.slug}`;
  const url = blogUrl(categoryPath);

  return {
    title,
    description: category.description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: formatTitle(title),
      description: category.description,
      siteName: BLOG_CONFIG.siteName,
      type: "website",
      url,
    },
    robots,
  };
}

export function buildTagMetadata(tag: string, page?: number): Metadata {
  const label = formatTagLabel(tag);
  const title = page && page > 1 ? `${label} - Page ${page}` : label;
  const url = page && page > 1 ? blogUrl(`/blog/tag/${tag}/page/${page}`) : blogUrl(`/blog/tag/${tag}`);

  return {
    title,
    description: `Posts tagged ${label}.`,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: formatTitle(title),
      description: `Posts tagged ${label}.`,
      siteName: BLOG_CONFIG.siteName,
      type: "website",
      url,
    },
    robots,
  };
}
