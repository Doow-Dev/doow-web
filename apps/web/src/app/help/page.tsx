import type { Metadata } from "next";
import Link from "next/link";

import { getAllHelpArticles } from "@/lib/help/content";
import { helpCategories } from "@/lib/help/navigation";
import { helpPathForCategory } from "@/lib/help/paths";
import { HelpShell } from "@/components/help/help-shell";
import { HelpSearch } from "@/components/help/help-search";

export const metadata: Metadata = {
  title: "Help Center",
};

export default async function HelpHomePage() {
  const articles = await getAllHelpArticles();

  const categoriesWithCount = helpCategories.map((cat) => ({
    ...cat,
    count: articles.filter((a) => a.category === cat.slug).length,
  }));

  return (
    <HelpShell articles={articles}>
      <div className="help-home">
        <div className="help-home__hero">
          <h1>How can we help?</h1>
          <p>Browse articles or search for answers to your questions.</p>
          <div className="help-home__search">
            <HelpSearch />
          </div>
        </div>
        <p className="help-home__categories-heading">Browse by topic</p>
        <div className="help-home__categories">
          {categoriesWithCount.map((cat) => (
            <Link
              className="help-category-card"
              href={helpPathForCategory(cat.slug)}
              key={cat.slug}
            >
              <strong>{cat.label}</strong>
              <p>{cat.description}</p>
              <span className="help-category-card__count">
                {cat.count} {cat.count === 1 ? "article" : "articles"}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </HelpShell>
  );
}
