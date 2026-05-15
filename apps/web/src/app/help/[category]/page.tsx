import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";

import { getAllHelpArticles, getHelpArticlesByCategory } from "@/lib/help/content";
import { helpCategoriesBySlug } from "@/lib/help/navigation";
import { helpPathForArticle } from "@/lib/help/paths";
import type { HelpCategory } from "@/lib/help/types";
import { HelpShell } from "@/components/help/help-shell";

type Props = { params: Promise<{ category: string }> };

export async function generateStaticParams() {
  const { helpCategories } = await import("@/lib/help/navigation");
  return helpCategories.map((cat) => ({ category: cat.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  const cat = helpCategoriesBySlug.get(category as HelpCategory);
  if (!cat) return {};
  return {
    title: cat.label,
    description: cat.description,
  };
}

export default async function HelpCategoryPage({ params }: Props) {
  const { category } = await params;
  const cat = helpCategoriesBySlug.get(category as HelpCategory);
  if (!cat) notFound();

  const [allArticles, catArticles] = await Promise.all([
    getAllHelpArticles(),
    getHelpArticlesByCategory(category as HelpCategory),
  ]);

  if (catArticles.length === 0) notFound();

  return (
    <HelpShell articles={allArticles}>
      <div className="help-category-home">
        <nav aria-label="Breadcrumb" className="help-breadcrumb">
          <a href="/help">Help Center</a>
          <span aria-hidden="true" className="help-breadcrumb__sep">/</span>
          <span>{cat.label}</span>
        </nav>
        <div className="help-category-home__header">
          <h1>{cat.label}</h1>
          <p>{cat.description}</p>
        </div>
        <div className="help-category-home__articles">
          {catArticles.map((article) => (
            <Link
              className="help-article-card"
              href={helpPathForArticle(article.category, article.slug)}
              key={article.slug}
            >
              <strong>{article.title}</strong>
              <p>{article.description}</p>
              <span className="help-article-card__arrow">
                Read article <ArrowRight aria-hidden="true" size={12} />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </HelpShell>
  );
}
