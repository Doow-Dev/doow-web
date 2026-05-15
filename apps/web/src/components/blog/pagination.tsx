import Link from "next/link";

type BlogPaginationProps = {
  basePath?: string;
  buildHref?: (page: number) => string;
  currentPage: number;
  label?: string;
  perPage: number;
  totalPages: number;
  totalPosts: number;
};

function defaultPageHref(basePath: string, page: number) {
  return page <= 1 ? basePath : `${basePath}/page/${page}`;
}

export function BlogPagination({
  basePath,
  buildHref,
  currentPage,
  label = "Blog pagination",
  perPage,
  totalPages,
  totalPosts,
}: BlogPaginationProps) {
  const pageHref = (page: number) => {
    if (buildHref) {
      return buildHref(page);
    }

    return defaultPageHref(basePath ?? "/blog", page);
  };
  if (totalPages <= 1) {
    return null;
  }

  const end = Math.min(currentPage * perPage, totalPosts);
  const start = totalPosts === 0 ? 0 : (currentPage - 1) * perPage + 1;
  const previousPage = currentPage - 1;
  const nextPage = currentPage + 1;

  return (
    <nav className="blog-pagination" aria-label={label}>
      <div className="blog-pagination__results" aria-label={`Showing ${start} to ${end} of ${totalPosts} results`}>
        <span>{start}</span>
        <span className="blog-pagination__separator" aria-hidden="true" />
        <span>
          {end} of {totalPosts} results
        </span>
      </div>
      <div className="blog-pagination__pages">
        <span className="blog-pagination__page-count">
          {currentPage} of {totalPages} pages
        </span>
        {currentPage > 1 ? (
          <Link className="blog-pagination__button" href={pageHref(previousPage)}>
            Prev
          </Link>
        ) : (
          <button className="blog-pagination__button" disabled type="button">
            Prev
          </button>
        )}
        {currentPage < totalPages ? (
          <Link className="blog-pagination__button" href={pageHref(nextPage)}>
            Next
          </Link>
        ) : (
          <button className="blog-pagination__button" disabled type="button">
            Next
          </button>
        )}
      </div>
    </nav>
  );
}
