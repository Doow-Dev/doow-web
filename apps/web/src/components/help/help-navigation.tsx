"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { helpPathForArticle, helpPathForCategory } from "@/lib/help/paths";
import type { HelpArticle, HelpCategoryMeta } from "@/lib/help/types";

export function HelpSidebarNav({
  categories,
  articles,
}: {
  categories: HelpCategoryMeta[];
  articles: HelpArticle[];
}) {
  const pathname = usePathname();

  return (
    <nav className="help-sidebar-nav" aria-label="Help center navigation">
      {categories.map((cat) => {
        const catPath = helpPathForCategory(cat.slug);
        const catArticles = articles.filter((a) => a.category === cat.slug);
        const isCategoryActive =
          pathname === catPath || pathname.startsWith(`${catPath}/`);

        return (
          <div className="help-sidebar-nav__group" key={cat.slug}>
            <Link
              className="help-sidebar-nav__category"
              data-active={isCategoryActive ? "true" : undefined}
              href={catPath}
            >
              {cat.label}
            </Link>
            {catArticles.map((article) => {
              const articlePath = helpPathForArticle(article.category, article.slug);
              const isActive = pathname === articlePath;
              return (
                <Link
                  className="help-sidebar-nav__link"
                  data-active={isActive ? "true" : undefined}
                  href={articlePath}
                  key={article.slug}
                >
                  {article.title}
                </Link>
              );
            })}
          </div>
        );
      })}
    </nav>
  );
}
