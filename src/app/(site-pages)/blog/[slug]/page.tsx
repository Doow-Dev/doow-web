import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";

import { ArticleLayout, blogMdxComponents } from "@/components/blog";
import { blogUrl } from "@/lib/blog/config";
import { getAllPostMeta, getBlogSlugs, getPostBySlug } from "@/lib/blog/content";
import { buildArticleMetadata, buildAuthorJsonLd, buildBlogPostingJsonLd, buildBreadcrumbJsonLd } from "@/lib/blog/seo";
import type { Post, PostMeta } from "@/lib/blog/types";

interface BlogArticlePageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return (await getBlogSlugs()).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: BlogArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return {};
  }

  return buildArticleMetadata(post);
}

function getRelatedPosts(post: Post, posts: PostMeta[]) {
  const postsBySlug = new Map(posts.map((item) => [item.slug, item]));
  const relatedPosts = post.related
    .map((relatedSlug) => postsBySlug.get(relatedSlug))
    .filter((item): item is PostMeta => item !== undefined && item.slug !== post.slug);
  const sameCategoryPosts = posts.filter((item) => item.slug !== post.slug && item.category.slug === post.category.slug);
  const displayPosts = relatedPosts.length > 0 ? [...relatedPosts, ...sameCategoryPosts] : sameCategoryPosts;
  const uniquePosts = displayPosts.filter((item, index, items) => items.findIndex((candidate) => candidate.slug === item.slug) === index);

  return uniquePosts.slice(0, 3);
}

export default async function BlogArticlePage({ params }: BlogArticlePageProps) {
  const { slug } = await params;
  const [post, posts] = await Promise.all([getPostBySlug(slug), getAllPostMeta()]);

  if (!post) {
    notFound();
  }

  return (
    <>
      <script
        dangerouslySetInnerHTML={{
          __html: buildBlogPostingJsonLd(post),
        }}
        type="application/ld+json"
      />
      <script
        dangerouslySetInnerHTML={{
          __html: buildBreadcrumbJsonLd([
            { name: "Blog", url: blogUrl("/blog") },
            { name: post.category.label, url: blogUrl(`/blog?category=${post.category.slug}`) },
            { name: post.title, url: blogUrl(`/blog/${post.slug}`) },
          ]),
        }}
        type="application/ld+json"
      />
      {post.authors.map((author) => (
        <script
          dangerouslySetInnerHTML={{
            __html: buildAuthorJsonLd(author),
          }}
          key={author.slug}
          type="application/ld+json"
        />
      ))}

      <ArticleLayout authors={post.authors} post={post} relatedPosts={getRelatedPosts(post, posts)}>
        <MDXRemote
          components={blogMdxComponents}
          options={{
            mdxOptions: {
              rehypePlugins: [
                rehypeSlug,
                [
                  rehypeAutolinkHeadings,
                  {
                    behavior: "wrap",
                    properties: {
                      ariaLabel: "Link to heading",
                      className: ["blog-heading-anchor"],
                    },
                  },
                ],
                [
                  rehypePrettyCode,
                  {
                    theme: "github-light",
                  },
                ],
              ],
              remarkPlugins: [remarkGfm],
            },
          }}
          source={post.body}
        />
      </ArticleLayout>
    </>
  );
}
