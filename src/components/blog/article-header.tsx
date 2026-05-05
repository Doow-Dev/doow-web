import Image from "next/image";
import Link from "next/link";
import type { IconType } from "react-icons";
import { FaGlobe, FaLinkedinIn, FaXTwitter } from "react-icons/fa6";

import { BLOG_DETAIL_FIGMA_ASSETS } from "@/lib/blog/figma-assets";
import type { Author, PostMeta } from "@/lib/blog/types";

import { formatBlogNumericDate, getAuthorLabel, getInitials } from "./format";

type ArticleHeaderProps = {
  authors?: Author[];
  post: PostMeta;
};

type AuthorSocialLink = {
  href: string;
  icon: IconType;
  label: string;
};

function getAuthorSocialLinks(author: Author): AuthorSocialLink[] {
  const socials = author.socials;

  if (!socials) {
    return [];
  }

  return [
    socials.linkedin
      ? {
          href: socials.linkedin,
          icon: FaLinkedinIn,
          label: `${author.name} on LinkedIn`,
        }
      : null,
    socials.x
      ? {
          href: socials.x,
          icon: FaXTwitter,
          label: `${author.name} on X`,
        }
      : null,
    socials.website
      ? {
          href: socials.website,
          icon: FaGlobe,
          label: `${author.name}'s website`,
        }
      : null,
  ].filter((link): link is AuthorSocialLink => link !== null);
}

export function ArticleHeader({ authors = [], post }: ArticleHeaderProps) {
  const visibleAuthors = authors.length > 0 ? authors : post.authors;
  const primaryAuthor = visibleAuthors[0];
  const primaryAuthorSocials = primaryAuthor ? getAuthorSocialLinks(primaryAuthor) : [];

  return (
    <header className="blog-article-header">
      <div className="blog-shell blog-article-header__inner">
        <div className="blog-article-header__meta-block">
          <nav className="blog-breadcrumb" aria-label="Breadcrumb">
            <Link href="/blog">Blog</Link>
            <span aria-hidden="true">/</span>
            <span>{post.category.label}</span>
          </nav>

          <p className="blog-article-header__date">
            <time dateTime={post.publishedAt}>{formatBlogNumericDate(post.publishedAt)}</time>
            <span aria-hidden="true">/</span>
            <span>{post.readingTime}</span>
          </p>
        </div>

        <div className="blog-article-header__copy">
          <h1>{post.title}</h1>
          <div className="blog-article-header__author">
            {primaryAuthor ? (
              <>
                <div className="blog-article-header__author-row">
                  <div className="blog-author-chip">
                    <Image
                      alt={primaryAuthor.avatarAlt ?? `${primaryAuthor.name} avatar`}
                      height={42}
                      src={primaryAuthor.avatar ?? BLOG_DETAIL_FIGMA_ASSETS.authorAvatar}
                      width={42}
                    />
                    <span className="blog-author-chip__body">
                      <strong>{getAuthorLabel(visibleAuthors)}</strong>
                      {primaryAuthor.role ? <small>{primaryAuthor.role}</small> : null}
                      {primaryAuthorSocials.length > 0 ? (
                        <span className="blog-author-chip__socials" aria-label={`${primaryAuthor.name} social links`}>
                          {primaryAuthorSocials.map(({ href, icon: Icon, label }) => (
                            <a aria-label={label} href={href} key={label} rel="noopener noreferrer" target="_blank">
                              <Icon aria-hidden="true" size={13} />
                            </a>
                          ))}
                        </span>
                      ) : null}
                    </span>
                  </div>
                </div>
              </>
            ) : (
              <div className="blog-author-chip">
                <span className="blog-author-chip__fallback" aria-hidden="true">
                  {getInitials("Doow")}
                </span>
                <span>
                  <strong>Doow</strong>
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
