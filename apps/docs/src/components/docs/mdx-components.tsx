import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

type CalloutTone = "note" | "warning" | "success";

function isExternalHref(href?: string) {
  return Boolean(href && /^(https?:)?\/\//.test(href));
}

function DocsLink({ children, href = "", ...props }: ComponentPropsWithoutRef<"a">) {
  if (isExternalHref(href)) {
    return (
      <a href={href} rel="noopener noreferrer" target="_blank" {...props}>
        {children}
      </a>
    );
  }

  if (href.startsWith("#") || /^[a-z][a-z0-9+.-]*:/i.test(href)) {
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

export function Callout({
  children,
  title,
  tone = "note",
}: {
  children: ReactNode;
  title?: string;
  tone?: CalloutTone;
}) {
  return (
    <aside className="docs-callout" data-tone={tone}>
      <strong>{title ?? (tone === "warning" ? "Important" : "Note")}</strong>
      <div>{children}</div>
    </aside>
  );
}

export function Steps({ children }: { children: ReactNode }) {
  return <div className="docs-steps">{children}</div>;
}

export function Card({
  children,
  href,
  title,
}: {
  children: ReactNode;
  href?: string;
  title: string;
}) {
  const content = (
    <>
      <strong>{title}</strong>
      <span>{children}</span>
    </>
  );

  return href ? (
    <Link className="docs-mdx-card" href={href}>
      {content}
    </Link>
  ) : (
    <div className="docs-mdx-card">{content}</div>
  );
}

export function Cards({ children }: { children: ReactNode }) {
  return <div className="docs-mdx-cards">{children}</div>;
}

export function CodeBlock({
  code,
  children,
  language,
}: {
  children?: ReactNode;
  code?: string;
  language?: string;
}) {
  const value = typeof code === "string" ? code : typeof children === "string" ? children : "";

  return (
    <pre className="docs-code-block" data-language={language}>
      <code>{value}</code>
    </pre>
  );
}

export function Tabs({
  children,
  items,
}: {
  children?: ReactNode;
  items?: string[] | string;
}) {
  const labels = Array.isArray(items)
    ? items
    : typeof items === "string"
      ? items.split(",").map((item) => item.trim()).filter(Boolean)
      : [];

  return (
    <div className="docs-tabs">
      {labels.length > 0 ? (
        <div className="docs-tabs__list" role="tablist">
          {labels.map((item, index) => (
            <span aria-selected={index === 0} key={item} role="tab">
              {item}
            </span>
          ))}
        </div>
      ) : null}
      <div className="docs-tabs__panel">{children}</div>
    </div>
  );
}

export function Tooltip({
  children,
  label,
}: {
  children: ReactNode;
  label: string;
}) {
  return (
    <span className="docs-tooltip" title={label}>
      {children}
    </span>
  );
}

function DocsTable({ children, ...props }: ComponentPropsWithoutRef<"table">) {
  return (
    <div className="docs-table-scroll">
      <table {...props}>{children}</table>
    </div>
  );
}

export const docsMdxComponents = {
  a: DocsLink,
  table: DocsTable,
  Callout,
  Card,
  Cards,
  CodeBlock,
  Steps,
  Tabs,
  Tooltip,
};
