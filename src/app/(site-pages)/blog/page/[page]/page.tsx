import { notFound, permanentRedirect } from "next/navigation";

import { POSTS_PER_PAGE, getAllPostMeta } from "@/lib/blog/content";

type BlogPaginatedPageProps = {
  params: Promise<{
    page: string;
  }>;
};

export default async function BlogPaginatedRedirect({ params }: BlogPaginatedPageProps) {
  const { page } = await params;
  const pageNumber = Number.parseInt(page, 10);

  if (!Number.isFinite(pageNumber) || pageNumber < 1) {
    notFound();
  }

  const posts = await getAllPostMeta();
  const totalPages = Math.max(1, Math.ceil(posts.length / POSTS_PER_PAGE));

  if (pageNumber > totalPages) {
    notFound();
  }

  const target = page === "1" ? "/blog" : `/blog?page=${encodeURIComponent(page)}`;

  permanentRedirect(target);
}
