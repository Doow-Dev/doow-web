import Image from "next/image";
import Link from "next/link";

import type { PostMeta } from "@/lib/blog/types";

import { formatBlogDate, getInitials } from "./format";

type ArticleCardProps = {
  featured?: boolean;
  variant?: "compact" | "featured";
  authorAvatarSrc?: string;
  authorName?: string;
  authorRole?: string;
  badges?: string[];
  dateLabel?: string;
  description?: string;
  href?: string;
  imageAlt?: string;
  imagePriority?: boolean;
  imageSrc?: string;
  post: PostMeta;
  readingTimeLabel?: string;
  showDate?: boolean;
  title?: string;
};

export function ArticleCard({
  authorAvatarSrc,
  authorName,
  authorRole,
  badges,
  dateLabel,
  description,
  featured = false,
  href,
  imageAlt,
  imagePriority = false,
  imageSrc,
  post,
  readingTimeLabel,
  showDate = true,
  title,
  variant,
}: ArticleCardProps) {
  const cardVariant = variant ?? (featured ? "featured" : "compact");
  const primaryAuthor = post.authors[0];
  const resolvedAuthorName = authorName ?? primaryAuthor?.name;
  const resolvedAuthorRole = authorRole ?? primaryAuthor?.role;
  const resolvedAvatarSrc = authorAvatarSrc ?? primaryAuthor?.avatar;
  const resolvedAvatarAlt =
    resolvedAvatarSrc && primaryAuthor?.avatarAlt ? primaryAuthor.avatarAlt : `${resolvedAuthorName ?? "Author"} avatar`;
  const resolvedBadges = badges ?? [post.category.label, readingTimeLabel ?? post.readingTime];
  const resolvedDescription = description ?? post.description;
  const resolvedHref = href ?? `/blog/${post.slug}`;
  const resolvedImageAlt = imageAlt ?? post.imageAlt ?? "";
  const resolvedImageSrc = imageSrc ?? post.image;
  const resolvedTitle = title ?? post.title;
  const resolvedDateLabel = dateLabel ?? formatBlogDate(post.publishedAt);
  const isFeatured = cardVariant === "featured";

  return (
    <article className="blog-card" data-featured={isFeatured ? "true" : undefined} data-variant={cardVariant}>
      <Link className="blog-card__link" href={resolvedHref}>
        <span className="blog-card__content">
          {isFeatured && showDate ? (
            <time className="blog-card__date" dateTime={post.publishedAt}>
              {resolvedDateLabel}
            </time>
          ) : null}

          <span className="blog-card__copy">
            <h2>{resolvedTitle}</h2>
            <p>{resolvedDescription}</p>
          </span>

          <span className="blog-card__footer">
            {resolvedAuthorName ? (
              <span className="blog-card__author">
                {resolvedAvatarSrc ? (
                  <Image alt={resolvedAvatarAlt} height={42} src={resolvedAvatarSrc} width={42} />
                ) : (
                  <span className="blog-card__author-fallback" aria-hidden="true">
                    {getInitials(resolvedAuthorName)}
                  </span>
                )}
                <span className="blog-card__author-text">
                  <span>{resolvedAuthorName}</span>
                  {resolvedAuthorRole ? <small>{resolvedAuthorRole}</small> : null}
                </span>
              </span>
            ) : null}
            {!isFeatured && showDate ? (
              <time className="blog-card__date" dateTime={post.publishedAt}>
                {resolvedDateLabel}
              </time>
            ) : null}
          </span>

          {isFeatured ? (
            <span className="blog-card__meta" aria-label="Article tags">
              {resolvedBadges.map((badge) => (
                <span className="blog-card__tag" key={badge}>
                  {badge}
                </span>
              ))}
            </span>
          ) : null}
        </span>

        {resolvedImageSrc ? (
          <span className="blog-card__media">
            <span className="blog-card__media-frame">
              <Image
                alt={resolvedImageAlt}
                fill
                priority={imagePriority}
                sizes={
                  cardVariant === "featured"
                    ? "(min-width: 64rem) 20rem, calc(100vw - 4.5rem)"
                    : "(min-width: 64rem) 17.75rem, calc(100vw - 3rem)"
                }
                src={resolvedImageSrc}
                style={{ objectFit: "cover" }}
              />
            </span>
          </span>
        ) : null}
      </Link>
    </article>
  );
}
