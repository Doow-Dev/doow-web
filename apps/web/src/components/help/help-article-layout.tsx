"use client";

import { MessageCircle } from "lucide-react";

import type { HelpArticle, HelpCategoryMeta } from "@/lib/help/types";
import { helpPathForCategory } from "@/lib/help/paths";

import { HelpToc } from "./help-toc";
import { openCrispChat } from "./crisp-chat";

export function HelpArticleHeader({
  article,
  category,
}: {
  article: HelpArticle;
  category: HelpCategoryMeta | undefined;
}) {
  return (
    <header className="help-article__header">
      <div className="help-breadcrumb" aria-label="Breadcrumb">
        <a href="/help">Help Center</a>
        <span aria-hidden="true" className="help-breadcrumb__sep">/</span>
        {category ? (
          <>
            <a href={helpPathForCategory(category.slug)}>{category.label}</a>
            <span aria-hidden="true" className="help-breadcrumb__sep">/</span>
          </>
        ) : null}
        <span>{article.title}</span>
      </div>
      <div className="help-page-meta">
        {category ? <p className="help-kicker">{category.label}</p> : null}
        {article.updatedAt ? (
          <time dateTime={article.updatedAt}>Updated {article.updatedAt}</time>
        ) : null}
      </div>
      <h1>{article.title}</h1>
      <p>{article.description}</p>
    </header>
  );
}

export function HelpRightRail({ article }: { article: HelpArticle }) {
  return (
    <aside className="help-right-rail" aria-label="Page tools">
      {article.toc.length > 0 ? (
        <section className="help-toc" aria-label="On this page">
          <p>On this page</p>
          <HelpToc items={article.toc} />
        </section>
      ) : null}
      <section className="help-rail-card" aria-label="Need more help?">
        <span>Support</span>
        <strong>Still need help?</strong>
        <p>Our support team is available to answer your questions.</p>
        <button
          className="help-rail-card__chat-btn"
          onClick={openCrispChat}
          type="button"
        >
          <MessageCircle aria-hidden="true" size={14} />
          Chat with us
        </button>
      </section>
    </aside>
  );
}
