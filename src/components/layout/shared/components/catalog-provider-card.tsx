import { createElement, type ReactNode } from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";

import { CatalogCardDescription } from "./catalog-card-description";

export interface CatalogProviderCardProps {
  ariaLabel?: string;
  className?: string;
  description?: string;
  footer?: ReactNode;
  footerDivider?: boolean;
  footerLabel?: ReactNode;
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
  footerDivider = false,
  footerLabel,
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
  const shouldUseStructuredFooter = Boolean(footer && (footerDivider || footerLabel));
  const footerElement = shouldUseStructuredFooter ? (
    <>
      {footerDivider ? <span aria-hidden="true" className={`${namespace}-card__divider`} /> : null}
      <div className={`${namespace}-card__footer`}>
        {footerLabel ? <span className={`${namespace}-card__footer-label`}>{footerLabel}</span> : null}
        {footer}
      </div>
    </>
  ) : (
    footer
  );

  const content = (
    <>
      {logo}

      <div className={`${namespace}-card__copy`}>
        {createElement(titleAs, { className: `${namespace}-card__title` }, title)}
        {meta}
        {descriptionElement}
        {footerElement}
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
