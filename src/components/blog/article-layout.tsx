import type { ReactNode } from "react";

import Image from "next/image";

import { BLOG_DETAIL_FIGMA_ASSETS } from "@/lib/blog/figma-assets";
import type { Author, Post, PostMeta } from "@/lib/blog/types";

import { BlogArticleAnalytics } from "./blog-analytics";
import { ArticleHeader } from "./article-header";
import { RelatedPosts } from "./related-posts";
import { TableOfContents } from "./table-of-contents";

type ArticleLayoutProps = {
  authors?: Author[];
  children: ReactNode;
  post: Post;
  relatedPosts?: PostMeta[];
};

function getAiHref(baseHref: string, post: Post) {
  const prompt = `Summarize this Doow article and pull out the finance operations lessons: ${post.title}`;

  return `${baseHref}?q=${encodeURIComponent(prompt)}`;
}

export function ArticleLayout({ authors, children, post, relatedPosts = [] }: ArticleLayoutProps) {
  return (
    <article className="blog-article" data-figma-detail="true">
      <BlogArticleAnalytics category={post.category.slug} slug={post.slug} title={post.title} />
      <ArticleHeader authors={authors} post={post} />

      <section className="blog-article__body">
        <div className="blog-article__layout">
          <aside className="blog-detail-rail" aria-label="Article tools">
            <TableOfContents toc={post.toc} />

            <section className="blog-detail-rail__section" aria-labelledby="blog-detail-ai-heading">
              <p id="blog-detail-ai-heading">Explore with AI</p>
              <div className="blog-detail-ai">
                {BLOG_DETAIL_FIGMA_ASSETS.ai.map((tool) => (
                  <a href={getAiHref(tool.href, post)} key={tool.label} rel="noopener noreferrer" target="_blank">
                    <Image alt="" height={16} src={tool.src} width={16} />
                    <span>{tool.label}</span>
                  </a>
                ))}
              </div>
            </section>
          </aside>

          <div className="blog-article__main" data-has-image={post.image ? "true" : "false"}>
            {post.image ? (
              <div className="blog-article__main-image">
                <Image
                  alt={post.imageAlt ?? ""}
                  fill
                  priority
                  sizes="(min-width: 80rem) 53.1875rem, calc(100vw - 2rem)"
                  src={post.image}
                  style={{ objectFit: "cover" }}
                />
              </div>
            ) : null}
            <div className="blog-prose" id="article-content">
              {children}
            </div>
          </div>
        </div>
      </section>

      <RelatedPosts posts={relatedPosts} />
    </article>
  );
}
