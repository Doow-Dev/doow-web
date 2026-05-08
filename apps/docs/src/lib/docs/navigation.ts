import type { DocsNavItem } from "./types";

export const docsNavigation = [
  {
    description: "Create the first clean path through Doow setup.",
    href: "/getting-started",
    label: "Getting started",
    section: "start",
    slug: "getting-started",
  },
  {
    description: "Use Doow for repeatable finance and operations workflows.",
    href: "/guides",
    label: "Guides",
    section: "guides",
    slug: "guides",
  },
  {
    description: "Review supported product surfaces, fields, and conventions.",
    href: "/reference",
    label: "Reference",
    section: "reference",
    slug: "reference",
  },
  {
    description: "Track product changes and documentation updates.",
    href: "/changelog",
    label: "Changelog",
    section: "updates",
    slug: "changelog",
  },
] as const satisfies DocsNavItem[];

export const docsNavigationBySlug: ReadonlyMap<string, DocsNavItem> = new Map(
  docsNavigation.map((item) => [item.slug, item]),
);
