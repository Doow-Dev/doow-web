import { blogUrl } from "@/lib/blog/config";
import { getPostsByTag } from "@/lib/blog/content";
import { buildBlogFeed, generateRssXml } from "@/lib/blog/rss";
import { formatTagLabel, normalizeTag } from "@/lib/blog/taxonomy";

type TagFeedRouteProps = {
  params: Promise<{
    tag: string;
  }>;
};

export async function GET(_request: Request, { params }: TagFeedRouteProps) {
  const { tag } = await params;
  const normalizedTag = normalizeTag(tag);
  const posts = await getPostsByTag(normalizedTag);

  if (posts.length === 0) {
    return new Response("Not found", { status: 404 });
  }

  const feed = buildBlogFeed(posts, `${formatTagLabel(normalizedTag)} - Doow Blog`, blogUrl(`/blog/tag/${normalizedTag}/rss.xml`));

  return new Response(generateRssXml(feed), {
    headers: {
      "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
}
