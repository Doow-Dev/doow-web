import { createElement, type ReactNode } from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";

import { CatalogCardDescription } from "./catalog-card-description";

export interface CatalogProviderCardProps {
  ariaLabel?: string;
  className?: string;
  description?: string;
  footer?: ReactNode;
  href?: string;
  logo: ReactNode;
  meta?: ReactNode;
  namespace: string;
  title: string;
  titleAs?: "h3" | "span";
}

export function CatalogProviderCard({
  ariaLabel,
  className,
  description,
  footer,
  href,
  logo,
  meta,
  namespace,
  title,
  titleAs = "h3",
}: CatalogProviderCardProps) {
  const rootClassName = cn(`${namespace}-card`, className);
  const descriptionElement = description ? (
    <CatalogCardDescription className={`${namespace}-card__description`} description={description} />
  ) : null;

  const content = (
    <>
      {logo}

      <div className={`${namespace}-card__copy`}>
        {createElement(titleAs, { className: `${namespace}-card__title` }, title)}
        {meta}
        {descriptionElement}
        {footer}
      </div>
    </>
  );

  if (href) {
    return (
      <Link aria-label={ariaLabel} className={rootClassName} href={href}>
        {content}
      </Link>
    );
  }

  return <article className={rootClassName}>{content}</article>;
}
