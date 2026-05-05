export interface Author {
  avatar?: string;
  avatarAlt?: string;
  bio: string;
  name: string;
  role?: string;
  slug: string;
  socials?: {
    linkedin?: string;
    website?: string;
    x?: string;
  };
}

export type CategorySlug = "finance-operations" | "product" | "engineering" | "company";

export interface Category {
  description: string;
  label: string;
  slug: CategorySlug;
}

export interface BlogTocItem {
  depth: 2 | 3;
  id: string;
  text: string;
}

export interface Post {
  authors: Author[];
  body: string;
  canonicalUrl?: string;
  category: Category;
  description: string;
  draft: boolean;
  excerpt: string;
  featured: boolean;
  image?: string;
  imageAlt?: string;
  publishedAt: string;
  readingTime: string;
  related: string[];
  slug: string;
  tags: string[];
  title: string;
  toc: BlogTocItem[];
  updatedAt?: string;
}

export type PostMeta = Omit<Post, "body">;
