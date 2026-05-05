import { getAllPosts } from "@/lib/blog/content";
import { buildSearchIndex } from "@/lib/blog/search";

export async function GET() {
  const posts = await getAllPosts();
  const index = buildSearchIndex(posts);

  return Response.json(index, {
    headers: {
      "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
    },
  });
}
