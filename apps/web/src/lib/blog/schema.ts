import {
  cdnRelativeAssetPathSchema,
  dateStringSchema,
  optionalAbsoluteUrlSchema,
  requiredStringSchema,
} from "@doow/content-schemas";
import { z } from "zod";

import { CATEGORY_SLUGS } from "./taxonomy";

const blogAssetPathSchema = cdnRelativeAssetPathSchema;

export const AuthorFrontmatterSchema = z
  .object({
    name: requiredStringSchema,
    slug: requiredStringSchema.optional(),
    role: requiredStringSchema.optional(),
    bio: requiredStringSchema,
    avatar: blogAssetPathSchema.optional(),
    avatarAlt: requiredStringSchema.optional(),
    socials: z
      .object({
        linkedin: optionalAbsoluteUrlSchema,
        website: optionalAbsoluteUrlSchema,
        x: optionalAbsoluteUrlSchema,
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
    title: requiredStringSchema,
    description: requiredStringSchema,
    publishedAt: dateStringSchema,
    updatedAt: dateStringSchema.optional(),
    authors: z.array(requiredStringSchema).min(1),
    category: z.enum(CATEGORY_SLUGS),
    tags: z.array(requiredStringSchema).default([]),
    draft: z.boolean().default(false),
    featured: z.boolean().default(false),
    image: blogAssetPathSchema.optional(),
    imageAlt: requiredStringSchema.optional(),
    canonicalUrl: optionalAbsoluteUrlSchema,
    related: z.array(requiredStringSchema).default([]),
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
  name: requiredStringSchema,
  slug: requiredStringSchema,
  role: requiredStringSchema.optional(),
});

const blogImageSchema = z.object({
  src: requiredStringSchema,
  alt: requiredStringSchema,
});

export const blogPostFrontmatterSchema = z.object({
  title: requiredStringSchema,
  excerpt: requiredStringSchema,
  date: dateStringSchema,
  updated: dateStringSchema.optional(),
  author: blogAuthorSchema,
  category: requiredStringSchema,
  tags: z.array(requiredStringSchema).default([]),
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
