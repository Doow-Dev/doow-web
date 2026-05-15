import Link from "next/link";

import { Button } from "@/components/system";
import { BLOG_DETAIL_FIGMA_ASSETS } from "@/lib/blog/figma-assets";
import type { PostMeta } from "@/lib/blog/types";

import { ArticleCard } from "./article-card";

type RelatedPostsProps = {
  posts: PostMeta[];
};

export function RelatedPosts({ posts }: RelatedPostsProps) {
  const visiblePosts = posts.slice(0, 3);

  if (visiblePosts.length === 0) {
    return null;
  }

  return (
    <section className="blog-related" aria-labelledby="blog-related-heading">
      <div className="blog-related__inner">
        <h2 id="blog-related-heading">Continue Reading</h2>
        <div className="blog-related__grid">
          {visiblePosts.map((post, index) => (
            <ArticleCard
              authorAvatarSrc={post.authors[0]?.avatar ?? BLOG_DETAIL_FIGMA_ASSETS.authorAvatar}
              authorName={post.authors[0]?.name}
              description={post.description}
              imageAlt={post.imageAlt ?? `Related Doow blog article cover ${index + 1}.`}
              imageSrc={post.image ?? BLOG_DETAIL_FIGMA_ASSETS.related[index % BLOG_DETAIL_FIGMA_ASSETS.related.length]}
              key={post.slug}
              post={post}
              showDate={false}
              variant="compact"
            />
          ))}
        </div>
        <Button asChild className="blog-related__button" size="base" variant="secondary">
          <Link href="/blog">View all</Link>
        </Button>
      </div>
    </section>
  );
}
