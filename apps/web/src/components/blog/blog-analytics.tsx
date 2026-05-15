"use client";

import type { ComponentPropsWithoutRef } from "react";

import Link from "next/link";
import { forwardRef, useEffect, useRef } from "react";

import { usePostHogTracking } from "@/lib/hooks/usePostHog";

type BlogAnalyticsProps = {
  category?: string;
  featuredCount?: number;
  postCount?: number;
  slug?: string;
  title?: string;
};

export function BlogIndexAnalytics({ featuredCount = 0, postCount = 0 }: BlogAnalyticsProps) {
  const { trackEvent } = usePostHogTracking();

  useEffect(() => {
    trackEvent("blog_index_viewed", {
      featured_count: featuredCount,
      post_count: postCount,
    });
  }, [featuredCount, postCount, trackEvent]);

  return null;
}

export function BlogArticleAnalytics({ category, slug, title }: BlogAnalyticsProps) {
  const { trackEvent } = usePostHogTracking();
  const sentThresholds = useRef({
    halfway: false,
    complete: false,
  });

  useEffect(() => {
    trackEvent("blog_article_viewed", {
      category,
      slug,
      title,
    });
  }, [category, slug, title, trackEvent]);

  useEffect(() => {
    function trackScrollDepth() {
      const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollableHeight <= 0 ? 1 : window.scrollY / scrollableHeight;

      if (!sentThresholds.current.halfway && progress >= 0.5) {
        sentThresholds.current.halfway = true;
        trackEvent("blog_article_scrolled_50", {
          category,
          slug,
          title,
        });
      }

      if (!sentThresholds.current.complete && progress >= 0.98) {
        sentThresholds.current.complete = true;
        trackEvent("blog_article_scrolled_100", {
          category,
          slug,
          title,
        });
      }
    }

    trackScrollDepth();
    window.addEventListener("scroll", trackScrollDepth, { passive: true });
    window.addEventListener("resize", trackScrollDepth);

    return () => {
      window.removeEventListener("scroll", trackScrollDepth);
      window.removeEventListener("resize", trackScrollDepth);
    };
  }, [category, slug, title, trackEvent]);

  return null;
}

export function BlogCategoryAnalytics({ category, postCount = 0 }: BlogAnalyticsProps) {
  const { trackEvent } = usePostHogTracking();

  useEffect(() => {
    trackEvent("blog_category_viewed", {
      category,
      post_count: postCount,
    });
  }, [category, postCount, trackEvent]);

  return null;
}

export function BlogTagAnalytics({ postCount = 0, slug }: BlogAnalyticsProps) {
  const { trackEvent } = usePostHogTracking();

  useEffect(() => {
    trackEvent("blog_tag_viewed", {
      post_count: postCount,
      tag: slug,
    });
  }, [postCount, slug, trackEvent]);

  return null;
}

type BlogCtaTrackingLinkProps = Omit<ComponentPropsWithoutRef<typeof Link>, "href"> & {
  href: string;
  label: string;
};

export const BlogCtaTrackingLink = forwardRef<HTMLAnchorElement, BlogCtaTrackingLinkProps>(
  ({ href, label, onClick, ...props }, ref) => {
    const { trackEvent } = usePostHogTracking();

    return (
      <Link
        href={href}
        onClick={(event) => {
          trackEvent("blog_cta_clicked", {
            href,
            label,
          });
          onClick?.(event);
        }}
        ref={ref}
        {...props}
      />
    );
  },
);

BlogCtaTrackingLink.displayName = "BlogCtaTrackingLink";
