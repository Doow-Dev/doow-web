import { blogUrl } from "@/lib/blog/config";
import { getPostsByCategory } from "@/lib/blog/content";
import { buildBlogFeed, generateRssXml } from "@/lib/blog/rss";
import { CATEGORIES, isCategorySlug } from "@/lib/blog/taxonomy";

type CategoryFeedRouteProps = {
  params: Promise<{
    category: string;
  }>;
};

export async function GET(_request: Request, { params }: CategoryFeedRouteProps) {
  const { category } = await params;

  if (!isCategorySlug(category)) {
    return new Response("Not found", { status: 404 });
  }

  const posts = await getPostsByCategory(category);
  const feed = buildBlogFeed(posts, `${CATEGORIES[category].label} - Doow Blog`, blogUrl(`/blog/category/${category}/rss.xml`));

  return new Response(generateRssXml(feed), {
    headers: {
      "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
}
