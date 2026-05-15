import { notFound, permanentRedirect } from "next/navigation";

import { POSTS_PER_PAGE, getPostsByTag } from "@/lib/blog/content";

type BlogTagPagePaginatedProps = {
  params: Promise<{
    tag: string;
    page: string;
  }>;
};

export default async function BlogTagPaginatedRedirect({ params }: BlogTagPagePaginatedProps) {
  const { tag, page } = await params;
  const pageNumber = Number.parseInt(page, 10);

  if (!Number.isFinite(pageNumber) || pageNumber < 1) {
    notFound();
  }

  const posts = await getPostsByTag(tag);
  const totalPages = Math.max(1, Math.ceil(posts.length / POSTS_PER_PAGE));

  if (pageNumber > totalPages) {
    notFound();
  }

  const search = new URLSearchParams({ tag });

  if (page !== "1") {
    search.set("page", page);
  }

  permanentRedirect(`/blog?${search.toString()}`);
}
