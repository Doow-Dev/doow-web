import { Feed } from "feed";

import { BLOG_CONFIG, blogUrl } from "./config";
import type { PostMeta } from "./types";

function postUrl(post: PostMeta) {
  return blogUrl(`/blog/${post.slug}`);
}

export function buildBlogFeed(
  posts: PostMeta[],
  title: string = BLOG_CONFIG.feed.title,
  feedUrl: string = blogUrl(BLOG_CONFIG.feed.path),
) {
  const feed = new Feed({
    author: {
      email: BLOG_CONFIG.author.email,
      link: BLOG_CONFIG.siteUrl,
      name: BLOG_CONFIG.author.name,
    },
    copyright: BLOG_CONFIG.feed.copyright,
    description: BLOG_CONFIG.description,
    feedLinks: {
      rss: feedUrl,
    },
    id: blogUrl("/blog"),
    language: BLOG_CONFIG.feed.language,
    link: blogUrl("/blog"),
    title,
    updated: posts[0] ? new Date(posts[0].updatedAt ?? posts[0].publishedAt) : new Date(),
  });

  for (const post of posts) {
    const url = postUrl(post);

    feed.addItem({
      author: post.authors.map((author) => ({
        link: blogUrl(`/blog/authors/${author.slug}`),
        name: author.name,
      })),
      category: [
        {
          name: post.category.label,
        },
        ...post.tags.map((tag) => ({ name: tag })),
      ],
      date: new Date(post.updatedAt ?? post.publishedAt),
      description: post.excerpt || post.description,
      id: url,
      image: post.image,
      link: url,
      published: new Date(post.publishedAt),
      title: post.title,
    });
  }

  return feed;
}

export function generateRssXml(feed: Feed) {
  return feed.rss2();
}

export function generateAtomXml(feed: Feed) {
  return feed.atom1();
}
