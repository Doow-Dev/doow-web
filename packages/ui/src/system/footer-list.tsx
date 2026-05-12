import Link from "next/link";

import { cn } from "../lib/utils";

export interface FooterListItem {
  href: string;
  label: string;
  rel?: string;
  target?: string;
}

export interface FooterListProps {
  title: string;
  items: readonly FooterListItem[];
  className?: string;
  titleClassName?: string;
  titleTag?: "h2" | "h3" | "p";
  listClassName?: string;
  linkClassName?: string;
}

export function FooterList({
  title,
  items,
  className,
  titleClassName,
  titleTag = "h2",
  listClassName,
  linkClassName,
}: FooterListProps) {
  const TitleTag = titleTag;

  return (
    <div className={cn("space-y-4", className)}>
      <TitleTag className={cn("footer-list-heading", titleClassName)}>{title}</TitleTag>
      <ul className={cn("space-y-3", listClassName)}>
        {items.map((item) => (
          <li key={item.href}>
            <Link className={cn("footer-link", linkClassName)} href={item.href} rel={item.rel} target={item.target}>
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
