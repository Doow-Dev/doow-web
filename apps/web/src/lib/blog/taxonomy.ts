import GithubSlugger from "github-slugger";

import type { Category, CategorySlug } from "./types";

export const CATEGORIES = {
  "finance-operations": {
    description: "Practical finance operations guidance for software spend and systems of record.",
    label: "Finance operations",
    slug: "finance-operations",
  },
  product: {
    description: "Product notes on visibility, governance, and workflow design.",
    label: "Product",
    slug: "product",
  },
  engineering: {
    description: "Engineering notes from the Doow product and platform team.",
    label: "Engineering",
    slug: "engineering",
  },
  company: {
    description: "Company updates and operating notes from Doow.",
    label: "Company",
    slug: "company",
  },
} as const satisfies Record<CategorySlug, Category>;

export const CATEGORY_SLUGS = Object.keys(CATEGORIES) as CategorySlug[];

export function isCategorySlug(value: string): value is CategorySlug {
  return CATEGORY_SLUGS.includes(value as CategorySlug);
}

export function getCategory(slug: CategorySlug) {
  return CATEGORIES[slug];
}

export function createHeadingSlugger() {
  return new GithubSlugger();
}

export function slugifyHeading(value: string) {
  const slugger = createHeadingSlugger();

  return slugger.slug(value);
}

export function slugifyTaxonomyValue(value: string) {
  const slugger = createHeadingSlugger();

  return slugger.slug(value.trim());
}

export function normalizeTag(tag: string) {
  return slugifyTaxonomyValue(tag);
}

export function formatTagLabel(tag: string) {
  return tag
    .split("-")
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}
