import { z } from "zod";

import { CATEGORY_SLUGS } from "./taxonomy";

const blogAssetPathSchema = z
  .string()
  .min(1)
  .refine((value) => !value.startsWith("/"), "must be a CDN-relative path, not a /public path")
  .refine((value) => !/^https?:\/\//.test(value), "must be a CDN-relative path, not an absolute URL")
  .refine((value) => !value.includes(".."), "must not traverse directories");

export const AuthorFrontmatterSchema = z
  .object({
    name: z.string().min(1),
    slug: z.string().min(1).optional(),
    role: z.string().min(1).optional(),
    bio: z.string().min(1),
    avatar: blogAssetPathSchema.optional(),
    avatarAlt: z.string().min(1).optional(),
    socials: z
      .object({
        linkedin: z.string().url().optional(),
        website: z.string().url().optional(),
        x: z.string().url().optional(),
      })
      .optional(),
  })
  .superRefine((value, ctx) => {
    if (value.avatar && !value.avatarAlt) {
      ctx.addIssue({
        code: "custom",
        message: "avatarAlt is required when avatar is present",
        path: ["avatarAlt"],
      });
    }
  });

export const PostFrontmatterSchema = z
  .object({
    title: z.string().min(1),
    description: z.string().min(1),
    publishedAt: z.string().date(),
    updatedAt: z.string().date().optional(),
    authors: z.array(z.string().min(1)).min(1),
    category: z.enum(CATEGORY_SLUGS),
    tags: z.array(z.string().min(1)).default([]),
    draft: z.boolean().default(false),
    featured: z.boolean().default(false),
    image: blogAssetPathSchema.optional(),
    imageAlt: z.string().min(1).optional(),
    canonicalUrl: z.string().url().optional(),
    related: z.array(z.string().min(1)).default([]),
  })
  .superRefine((value, ctx) => {
    if (value.image && !value.imageAlt) {
      ctx.addIssue({
        code: "custom",
        message: "imageAlt is required when image is present",
        path: ["imageAlt"],
      });
    }
  });

export type AuthorFrontmatter = z.infer<typeof AuthorFrontmatterSchema>;
export type PostFrontmatter = z.infer<typeof PostFrontmatterSchema>;

function formatZodIssues(filename: string, error: z.ZodError) {
  return error.issues
    .map((issue) => {
      const field = issue.path.length > 0 ? issue.path.join(".") : "frontmatter";

      return `[blog] ${filename}: ${field} - ${issue.message}`;
    })
    .join("\n");
}

export function validateAuthorFrontmatter(data: unknown, filename: string) {
  const result = AuthorFrontmatterSchema.safeParse(data);

  if (!result.success) {
    throw new Error(formatZodIssues(filename, result.error));
  }

  return result.data;
}

export function validatePostFrontmatter(data: unknown, filename: string) {
  const result = PostFrontmatterSchema.safeParse(data);

  if (!result.success) {
    throw new Error(formatZodIssues(filename, result.error));
  }

  return result.data;
}

const blogAuthorSchema = z.object({
  name: z.string().min(1),
  slug: z.string().min(1),
  role: z.string().min(1).optional(),
});

const blogImageSchema = z.object({
  src: z.string().min(1),
  alt: z.string().min(1),
});

export const blogPostFrontmatterSchema = z.object({
  title: z.string().min(1),
  excerpt: z.string().min(1),
  date: z.string().date(),
  updated: z.string().date().optional(),
  author: blogAuthorSchema,
  category: z.string().min(1),
  tags: z.array(z.string().min(1)).default([]),
  featuredImage: blogImageSchema.optional(),
});

export type BlogPostFrontmatter = z.infer<typeof blogPostFrontmatterSchema>;

export interface BlogHeading {
  depth: 2 | 3;
  id: string;
  text: string;
}

export interface BlogPost {
  content: string;
  frontmatter: BlogPostFrontmatter;
  headings: BlogHeading[];
  readingTime: string;
  slug: string;
}
