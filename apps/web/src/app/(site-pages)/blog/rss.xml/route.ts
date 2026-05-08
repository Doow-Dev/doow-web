import { getAllPostMeta } from "@/lib/blog/content";
import { buildBlogFeed, generateRssXml } from "@/lib/blog/rss";

export async function GET() {
  const posts = await getAllPostMeta();
  const feed = buildBlogFeed(posts);

  return new Response(generateRssXml(feed), {
    headers: {
      "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
}
