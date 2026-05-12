export type DocsSection = "integrations";

export interface DocsTocItem {
  depth: 2 | 3;
  id: string;
  text: string;
}

export interface DocsNextStep {
  title: string;
  href: string;
  description?: string;
}

export interface DocsPageFrontmatter {
  description: string;
  order: number;
  section: DocsSection;
  slug: string;
  status: "published" | "draft";
  title: string;
  updatedAt?: string;
  prerequisites?: string[];
  nextSteps?: DocsNextStep[];
}

export interface DocsPage extends DocsPageFrontmatter {
  body: string;
  canonicalPath: string;
  links: string[];
  sourcePath: string;
  toc: DocsTocItem[];
}

export interface DocsNavItem {
  description: string;
  href: string;
  label: string;
  section: DocsSection;
  slug: string;
}

export interface DocsSidebarLink {
  href?: string;
  label: string;
  description?: string;
  badge?: "new" | "beta";
  items?: DocsSidebarLink[];
}

export interface DocsSidebarGroup {
  id?: string;
  label: string;
  section: DocsSection;
  items: DocsSidebarLink[];
}
