import type { ReactNode } from "react";

import Image from "next/image";

import { BLOG_DETAIL_FIGMA_ASSETS } from "@/lib/blog/figma-assets";
import { blogUrl } from "@/lib/blog/config";
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
  const articleUrl = blogUrl(`/blog/${post.slug}`);
  const tags = post.tags.length ? post.tags.join(", ") : "finance operations, SaaS visibility";
  const prompt = `You are a finance-operations analyst helping a CEO/CFO understand a Doow blog post.

Context:
- Doow writes for finance and operations teams managing SaaS spend, renewals, vendors, and runway risk.
- Article title: ${post.title}
- Article category: ${post.category.label}
- Article tags: ${tags}
- Source URL: ${articleUrl}

Task:
Read the article from the source URL and turn it into an executive brief for a busy startup CEO/CFO.

Output in Markdown:
1. Executive summary: 3 tight sentences.
2. Core argument: what the article is really warning about.
3. Finance operations lessons: 4-6 practical bullets.
4. Action checklist: what the team should do this week.
5. Discussion questions: 3 questions to ask finance, ops, or department owners.

Constraints:
- Keep it specific to the article and the SaaS/runway context.
- Avoid generic productivity advice.
- If you cannot access the URL, say that clearly and ask me to paste the article text.`;

  return `${baseHref}?q=${encodeURIComponent(prompt)}`;
}

export function ArticleLayout({ authors, children, post, relatedPosts = [] }: ArticleLayoutProps) {
  const articleImage = post.image ?? (post.slug === "running-out-of-runway" ? BLOG_DETAIL_FIGMA_ASSETS.heroImage : undefined);
  const articleImageAlt = post.imageAlt ?? "Plane wreckage in a forest, illustrating startup runway risk.";

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

          <div className="blog-article__main" data-has-image={articleImage ? "true" : "false"}>
            {articleImage ? (
              <div className="blog-article__main-image">
                <Image
                  alt={articleImageAlt}
                  fill
                  priority
                  sizes="(min-width: 80rem) 53.1875rem, calc(100vw - 2rem)"
                  src={articleImage}
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
