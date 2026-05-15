import { getAllHelpArticles } from "./content";

export interface HelpSearchRecord {
  title: string;
  description: string;
  category: string;
  path: string;
}

export async function buildHelpSearchIndex(): Promise<HelpSearchRecord[]> {
  const articles = await getAllHelpArticles();
  return articles.map((article) => ({
    title: article.title,
    description: article.description,
    category: article.category,
    path: article.canonicalPath,
  }));
}
