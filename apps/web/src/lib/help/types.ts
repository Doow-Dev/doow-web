export type HelpCategory =
  | "getting-started"
  | "integrations"
  | "billing"
  | "account"
  | "troubleshooting";

export interface HelpTocItem {
  depth: 2 | 3;
  id: string;
  text: string;
}

export interface HelpArticleFrontmatter {
  title: string;
  description: string;
  slug: string;
  category: HelpCategory;
  order: number;
  status: "published" | "draft";
  updatedAt?: string;
}

export interface HelpArticle extends HelpArticleFrontmatter {
  body: string;
  canonicalPath: string;
  sourcePath: string;
  toc: HelpTocItem[];
}

export interface HelpCategoryMeta {
  slug: HelpCategory;
  label: string;
  description: string;
}
