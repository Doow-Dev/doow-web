import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";

import { getAllHelpArticles, getHelpArticle } from "@/lib/help/content";
import { helpCategoriesBySlug } from "@/lib/help/navigation";
import { helpMdxOptions } from "@/lib/help/mdx-config";
import type { HelpCategory } from "@/lib/help/types";
import { HelpShell } from "@/components/help/help-shell";
import { HelpArticleHeader, HelpRightRail } from "@/components/help/help-article-layout";

type Props = { params: Promise<{ category: string; slug: string }> };

export async function generateStaticParams() {
  const articles = await getAllHelpArticles();
  return articles.map((a) => ({ category: a.category, slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category, slug } = await params;
  const article = await getHelpArticle(category as HelpCategory, slug);
  if (!article) return {};
  return {
    title: article.title,
    description: article.description,
  };
}

export default async function HelpArticlePage({ params }: Props) {
  const { category, slug } = await params;
  const article = await getHelpArticle(category as HelpCategory, slug);
  if (!article) notFound();

  const allArticles = await getAllHelpArticles();
  const categoryMeta = helpCategoriesBySlug.get(category as HelpCategory);

  return (
    <HelpShell articles={allArticles}>
      <div className="help-article">
        <article>
          <HelpArticleHeader article={article} category={categoryMeta} />
          <div className="help-prose">
            <MDXRemote options={helpMdxOptions} source={article.body} />
          </div>
        </article>
        <HelpRightRail article={article} />
      </div>
    </HelpShell>
  );
}
