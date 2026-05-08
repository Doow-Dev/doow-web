export type DocsSection = "start" | "guides" | "reference" | "updates";

export interface DocsTocItem {
  depth: 2 | 3;
  id: string;
  text: string;
}

export interface DocsPageFrontmatter {
  description: string;
  order: number;
  section: DocsSection;
  slug: string;
  status: "published" | "draft";
  title: string;
  updatedAt?: string;
}

export interface DocsPage extends DocsPageFrontmatter {
  body: string;
  canonicalPath: string;
  links: string[];
  toc: DocsTocItem[];
}

export interface DocsNavItem {
  description: string;
  href: string;
  label: string;
  section: DocsSection;
  slug: string;
}
