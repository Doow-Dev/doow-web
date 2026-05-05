import type { ComponentPropsWithoutRef, ReactNode } from "react";

import { ArrowRight, CircleAlert, Info, Lightbulb, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/system";
import { blogAssetUrl } from "@/lib/blog/assets";

import { BlogCtaTrackingLink } from "./blog-analytics";

type CalloutType = "note" | "warning" | "insight" | "example";

const CALLOUT_COPY: Record<CalloutType, string> = {
  example: "Example",
  insight: "Insight",
  note: "Note",
  warning: "Warning",
};

const CALLOUT_ICONS = {
  example: Sparkles,
  insight: Lightbulb,
  note: Info,
  warning: CircleAlert,
};

function isExternalHref(href?: string) {
  return Boolean(href && /^(https?:)?\/\//.test(href));
}

function shouldUseNativeAnchor(href: string) {
  return href.startsWith("#") || /^[a-z][a-z0-9+.-]*:/i.test(href);
}

export function Callout({
  children,
  title,
  type = "note",
}: {
  children: ReactNode;
  title?: string;
  type?: CalloutType;
}) {
  const Icon = CALLOUT_ICONS[type] ?? CALLOUT_ICONS.note;

  return (
    <aside className="blog-callout" data-callout-type={type}>
      <span className="blog-callout__icon" aria-hidden="true">
        <Icon size={18} strokeWidth={2} />
      </span>
      <div className="blog-callout__body">
        <strong>{title ?? CALLOUT_COPY[type] ?? CALLOUT_COPY.note}</strong>
        <div>{children}</div>
      </div>
    </aside>
  );
}

export function Quote({ author, children }: { author?: string; children: ReactNode }) {
  return (
    <figure className="blog-pull-quote">
      <blockquote>{children}</blockquote>
      {author ? <figcaption>{author}</figcaption> : null}
    </figure>
  );
}

export function CTA({ children, href, label }: { children?: ReactNode; href: string; label: string }) {
  return (
    <aside className="blog-cta">
      {children ? <div className="blog-cta__copy">{children}</div> : null}
      <Button asChild size="md" variant="primary" trailingAdornment={<ArrowRight size={16} strokeWidth={2} />}>
        <BlogCtaTrackingLink href={href} label={label}>
          {label}
        </BlogCtaTrackingLink>
      </Button>
    </aside>
  );
}

function BlogLink({ children, href = "", ...props }: ComponentPropsWithoutRef<"a">) {
  if (isExternalHref(href)) {
    return (
      <a href={href} rel="noopener noreferrer" target="_blank" {...props}>
        {children}
      </a>
    );
  }

  if (shouldUseNativeAnchor(href)) {
    return (
      <a href={href} {...props}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} {...props}>
      {children}
    </Link>
  );
}

function BlogImage({ alt = "", height, src = "", width, ...props }: ComponentPropsWithoutRef<"img">) {
  const resolvedWidth = typeof width === "number" ? width : Number(width) || 1200;
  const resolvedHeight = typeof height === "number" ? height : Number(height) || 630;

  if (typeof src !== "string") {
    return null;
  }

  const resolvedSrc = src.startsWith("/") || isExternalHref(src) ? src : blogAssetUrl(src);

  return (
    <Image
      alt={alt}
      className="blog-mdx-image"
      height={resolvedHeight}
      loading="lazy"
      sizes="(min-width: 64rem) 46rem, calc(100vw - 2rem)"
      src={resolvedSrc}
      width={resolvedWidth}
      {...props}
    />
  );
}

function BlogTable({ children, ...props }: ComponentPropsWithoutRef<"table">) {
  return (
    <div className="blog-table-scroll">
      <table {...props}>{children}</table>
    </div>
  );
}

function BlogPre(props: ComponentPropsWithoutRef<"pre">) {
  return <pre className="blog-code-block" {...props} />;
}

function BlogCode(props: ComponentPropsWithoutRef<"code">) {
  return <code {...props} />;
}

export const blogMdxComponents = {
  a: BlogLink,
  blockquote: (props: ComponentPropsWithoutRef<"blockquote">) => <blockquote className="blog-blockquote" {...props} />,
  code: BlogCode,
  h2: (props: ComponentPropsWithoutRef<"h2">) => <h2 {...props} />,
  h3: (props: ComponentPropsWithoutRef<"h3">) => <h3 {...props} />,
  h4: (props: ComponentPropsWithoutRef<"h4">) => <h4 {...props} />,
  img: BlogImage,
  pre: BlogPre,
  table: BlogTable,
  Callout,
  CTA,
  Quote,
};
