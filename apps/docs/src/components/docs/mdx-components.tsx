import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { Alert, AlertDescription, AlertTitle } from "@doow/ui/ui/alert";
import { Card as UiCard } from "@doow/ui/ui/card";
import {
  Tooltip as UiTooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@doow/ui/ui/tooltip";

import { CopyButton } from "./copy-button";
import { Tabs } from "./tabs";

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
    <Alert className="docs-callout" data-tone={tone}>
      <AlertTitle>{title ?? (tone === "warning" ? "Important" : "Note")}</AlertTitle>
      <AlertDescription>{children}</AlertDescription>
    </Alert>
  );
}

export function Steps({ children }: { children: ReactNode }) {
  return <UiCard className="docs-steps">{children}</UiCard>;
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
    <Link className="docs-mdx-card-link-shell" href={href}>
      <UiCard className="docs-mdx-card">{content}</UiCard>
    </Link>
  ) : (
    <UiCard className="docs-mdx-card">{content}</UiCard>
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
    <div className="docs-code-shell">
      <div className="docs-code-toolbar">
        <span>{language ?? "text"}</span>
        <CopyButton value={value} />
      </div>
      <pre className="docs-code-block" data-language={language}>
        <code>{value}</code>
      </pre>
    </div>
  );
}

export { Tabs };

export function Tooltip({
  children,
  label,
}: {
  children: ReactNode;
  label: string;
}) {
  return (
    <TooltipProvider>
      <UiTooltip>
        <TooltipTrigger asChild>
          <span className="docs-tooltip" tabIndex={0}>
            {children}
          </span>
        </TooltipTrigger>
        <TooltipContent>{label}</TooltipContent>
      </UiTooltip>
    </TooltipProvider>
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
