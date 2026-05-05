import type { Metadata } from "next";

import Link from "next/link";

import { ArticleCard, BlogIndexAnalytics, BlogPagination, BlogSearchBar } from "@/components/blog";
import { formatBlogNumericDate } from "@/components/blog/format";
import { Badge } from "@/components/system";
import {
  POSTS_PER_PAGE,
  getAllPostMeta,
  getPostsByCategory,
  getPostsByTag,
} from "@/lib/blog/content";
import { BLOG_INDEX_FIGMA_ASSETS } from "@/lib/blog/figma-assets";
import { blogUrl } from "@/lib/blog/config";
import { buildBreadcrumbJsonLd, buildCategoryMetadata, buildIndexMetadata, buildTagMetadata } from "@/lib/blog/seo";
import { CATEGORIES, formatTagLabel, isCategorySlug, normalizeTag } from "@/lib/blog/taxonomy";
import type { PostMeta } from "@/lib/blog/types";

type BlogIndexPageProps = {
  searchParams: Promise<{
    category?: string;
    tag?: string;
    page?: string;
  }>;
};

export async function generateMetadata({ searchParams }: BlogIndexPageProps): Promise<Metadata> {
  const params = await searchParams;
  const activeCategory = params.category && isCategorySlug(params.category) ? params.category : null;
  const activeTag = !activeCategory && params.tag ? normalizeTag(params.tag) : null;
  const currentPage = parsePage(params.page);
  const canonical = blogUrl(
    buildFilterHref({
      category: activeCategory ?? undefined,
      tag: activeTag ?? undefined,
      page: currentPage,
    }),
  );
  const metadata = activeCategory
    ? buildCategoryMetadata(CATEGORIES[activeCategory], currentPage)
    : activeTag
      ? buildTagMetadata(activeTag, currentPage)
      : buildIndexMetadata(currentPage);

  return {
    ...metadata,
    alternates: {
      ...metadata.alternates,
      canonical,
    },
    openGraph: metadata.openGraph
      ? {
          ...metadata.openGraph,
          url: canonical,
        }
      : metadata.openGraph,
  };
}

const BLOG_CATEGORY_FILTERS = [
  {
    href: "/blog",
    label: "All",
    slug: null as string | null,
  },
  ...Object.entries(CATEGORIES).map(([slug, category]) => ({
    href: `/blog?category=${slug}`,
    label: category.label,
    slug,
  })),
];

const BLOG_FIGMA_CARDS = [
  { author: "Isaac Ejeh", image: BLOG_INDEX_FIGMA_ASSETS.cards[0] },
  { author: "Alexander Ogunyemi", image: BLOG_INDEX_FIGMA_ASSETS.cards[1] },
  { author: "Isaac Ejeh", image: BLOG_INDEX_FIGMA_ASSETS.cards[2] },
  { author: "Isaac Ejeh", image: BLOG_INDEX_FIGMA_ASSETS.cards[3] },
  { author: "Isaac Ejeh", image: BLOG_INDEX_FIGMA_ASSETS.cards[4] },
  { author: "Isaac Ejeh", image: BLOG_INDEX_FIGMA_ASSETS.cards[5] },
  { author: "Isaac Ejeh", image: BLOG_INDEX_FIGMA_ASSETS.cards[6] },
  { author: "Isaac Ejeh", image: BLOG_INDEX_FIGMA_ASSETS.cards[0] },
  { author: "Isaac Ejeh", image: BLOG_INDEX_FIGMA_ASSETS.cards[1] },
];

function buildLibraryCard(post: PostMeta, index: number) {
  const card = BLOG_FIGMA_CARDS[index % BLOG_FIGMA_CARDS.length] ?? BLOG_FIGMA_CARDS[0];
  const fallbackImage =
    post.slug === "running-out-of-runway" ? BLOG_INDEX_FIGMA_ASSETS.latestArticle : card.image;

  return {
    ...card,
    author: post.authors[0]?.name ?? card.author,
    dateLabel: formatBlogNumericDate(post.publishedAt),
    description: post.excerpt,
    image: post.image ?? fallbackImage,
    imageAlt: post.imageAlt ?? `Doow blog card cover for ${post.title}.`,
    post,
    title: post.title,
  };
}

function parsePage(value?: string) {
  const parsed = Number.parseInt(value ?? "1", 10);

  return Number.isFinite(parsed) && parsed > 0 ? parsed : 1;
}

function buildFilterHref(params: { category?: string; tag?: string; page?: number }) {
  const search = new URLSearchParams();

  if (params.category) search.set("category", params.category);
  if (params.tag) search.set("tag", params.tag);
  if (params.page && params.page > 1) search.set("page", String(params.page));

  const query = search.toString();

  return query ? `/blog?${query}` : "/blog";
}

export default async function BlogIndexPage({ searchParams }: BlogIndexPageProps) {
  const params = await searchParams;
  const activeCategory = params.category && isCategorySlug(params.category) ? params.category : null;
  const activeTag = !activeCategory && params.tag ? normalizeTag(params.tag) : null;
  const currentPage = parsePage(params.page);

  const [allPosts, filteredPosts] = await Promise.all([
    getAllPostMeta(),
    activeCategory
      ? getPostsByCategory(activeCategory)
      : activeTag
        ? getPostsByTag(activeTag)
        : getAllPostMeta(),
  ]);

  const latestPosts = allPosts.slice(0, 3);
  const totalPosts = filteredPosts.length;
  const totalPages = Math.max(1, Math.ceil(totalPosts / POSTS_PER_PAGE));
  const safePage = Math.min(currentPage, totalPages);
  const offset = (safePage - 1) * POSTS_PER_PAGE;
  const pagePosts = filteredPosts.slice(offset, offset + POSTS_PER_PAGE);

  const showLatest = !activeCategory && !activeTag && currentPage === 1 && latestPosts.length > 0;

  const activeFilterLabel = activeCategory
    ? CATEGORIES[activeCategory].label
    : activeTag
      ? formatTagLabel(activeTag)
      : null;

  const libraryLabel = activeCategory
    ? `${totalPosts === 1 ? "1 article" : `${totalPosts} articles`} in ${activeFilterLabel}`
    : activeTag
      ? `${totalPosts === 1 ? "1 article" : `${totalPosts} articles`} tagged ${activeFilterLabel?.toLowerCase()}`
      : "Blog article library";
  const breadcrumbItems = [
    { href: "/blog", label: "Blog" },
    ...(activeCategory ? [{ href: buildFilterHref({ category: activeCategory }), label: CATEGORIES[activeCategory].label }] : []),
    ...(activeTag ? [{ href: buildFilterHref({ tag: activeTag }), label: formatTagLabel(activeTag) }] : []),
    ...(safePage > 1 ? [{ href: buildFilterHref({ category: activeCategory ?? undefined, tag: activeTag ?? undefined, page: safePage }), label: `Page ${safePage}` }] : []),
  ];

  return (
    <section className="blog-index">
      {breadcrumbItems.length > 1 ? (
        <script
          dangerouslySetInnerHTML={{
            __html: buildBreadcrumbJsonLd(
              breadcrumbItems.map((item) => ({
                name: item.label,
                url: blogUrl(item.href),
              })),
            ),
          }}
          type="application/ld+json"
        />
      ) : null}
      <BlogIndexAnalytics featuredCount={allPosts.filter((post) => post.featured).length} postCount={allPosts.length} />

      <header className="blog-index__hero">
        <Badge className="blog-index__eyebrow" variant="muted">
          BLOG
        </Badge>
        <h1>Blog</h1>
        <p>Reporting and analysis for modern finance teams.</p>
      </header>

      {showLatest ? (
        <section className="blog-index__latest blog-shell" aria-labelledby="blog-latest-heading">
          <h2 id="blog-latest-heading">Latest Articles</h2>
          <div className="blog-index__latest-list">
            {latestPosts.map((post, index) => {
              const card = buildLibraryCard(post, index);

              return (
                <ArticleCard
                  authorAvatarSrc={post.authors[0]?.avatar ?? BLOG_INDEX_FIGMA_ASSETS.authorAvatar}
                  authorName={post.authors[0]?.name ?? card.author}
                  authorRole={post.authors[0]?.role ?? "Founder"}
                  badges={[index === 0 ? "Latest" : "Recent", post.category.label]}
                  dateLabel={formatBlogNumericDate(post.publishedAt)}
                  description={post.excerpt}
                  featured
                  imageAlt={post.imageAlt ?? `Doow blog cover for ${post.title}.`}
                  imagePriority={index === 0}
                  imageSrc={post.image ?? (index === 0 ? BLOG_INDEX_FIGMA_ASSETS.latestArticle : card.image)}
                  key={post.slug}
                  post={post}
                  title={post.title}
                  variant="featured"
                />
              );
            })}
          </div>
        </section>
      ) : null}

      <section className="blog-index__library" id="blog-library" aria-labelledby="blog-library-heading">
        <div className="blog-index__library-shell">
          <span className="sr-only" id="blog-library-heading">
            {libraryLabel}
          </span>

          {breadcrumbItems.length > 1 ? (
            <nav className="blog-breadcrumb blog-index__breadcrumb" aria-label="Breadcrumb">
              {breadcrumbItems.map((item, index) => {
                const isLast = index === breadcrumbItems.length - 1;

                return (
                  <span key={`${item.href}-${item.label}`}>
                    {index > 0 ? <span aria-hidden="true">/</span> : null}
                    {isLast ? <span>{item.label}</span> : <Link href={item.href}>{item.label}</Link>}
                  </span>
                );
              })}
            </nav>
          ) : null}

          <header className="blog-index__library-header">
            <BlogSearchBar />
            <div className="blog-category-strip" aria-label="Blog categories">
              {BLOG_CATEGORY_FILTERS.map((filter) => {
                const isActive = filter.slug === activeCategory || (filter.slug === null && !activeCategory && !activeTag);

                return (
                  <Link
                    aria-current={isActive ? "page" : undefined}
                    className="blog-category-pill"
                    data-active={isActive ? "true" : undefined}
                    href={filter.href}
                    key={filter.href}
                    scroll={false}
                  >
                    {filter.label}
                  </Link>
                );
              })}
            </div>
          </header>

          <div className="blog-index__library-content">
            <div className="blog-index__library-main">
              {pagePosts.length > 0 ? (
                <div className="blog-index__grid">
                  {pagePosts.map((post, index) => {
                    const card = buildLibraryCard(post, index);

                    return (
                      <ArticleCard
                        authorAvatarSrc={post.authors[0]?.avatar ?? BLOG_INDEX_FIGMA_ASSETS.authorAvatar}
                        authorName={card.author}
                        badges={["DOOW"]}
                        dateLabel={card.dateLabel}
                        description={card.description}
                        imageAlt={card.imageAlt}
                        imageSrc={card.image}
                        key={post.slug}
                        post={post}
                        title={card.title}
                        variant="compact"
                      />
                    );
                  })}
                </div>
              ) : (
                <p className="blog-index__empty">
                  {activeCategory
                    ? "No articles in this category yet."
                    : activeTag
                      ? "No articles with this tag yet."
                      : "No published articles yet."}
                </p>
              )}

              <BlogPagination
                buildHref={(page) =>
                  buildFilterHref({
                    category: activeCategory ?? undefined,
                    tag: activeTag ?? undefined,
                    page,
                  })
                }
                currentPage={safePage}
                perPage={POSTS_PER_PAGE}
                totalPages={totalPages}
                totalPosts={totalPosts}
              />
            </div>
          </div>
        </div>
      </section>
    </section>
  );
}
