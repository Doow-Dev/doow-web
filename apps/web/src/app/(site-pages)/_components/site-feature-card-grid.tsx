import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

export interface SiteFeatureCardGridItem {
  description: string;
  icon: ReactNode;
  id?: string;
  title: string;
  tone?: string;
}

export interface SiteFeatureCardGridClassNames {
  card?: string;
  copy?: string;
  description?: string;
  grid?: string;
  iconWrap?: string;
  title?: string;
}

export function SiteFeatureCardGrid({
  classNames,
  getCardProps,
  items,
}: {
  classNames?: SiteFeatureCardGridClassNames;
  getCardProps?: (item: SiteFeatureCardGridItem, index: number) => Record<string, string | undefined>;
  items: readonly SiteFeatureCardGridItem[];
}) {
  return (
    <ul className={cn("site-feature-card-grid", classNames?.grid)} role="list">
      {items.map((item, index) => {
        const cardProps = getCardProps?.(item, index) ?? {};

        return (
          <li
            className={cn("site-feature-card", classNames?.card)}
            data-tone={item.tone}
            key={item.id ?? `${item.title}-${index}`}
            {...cardProps}
          >
            <span aria-hidden="true" className={cn("site-feature-card__icon-wrap", classNames?.iconWrap)}>
              {item.icon}
            </span>
            <div className={cn("site-feature-card__copy", classNames?.copy)}>
              <h3 className={cn("site-feature-card__title", classNames?.title)}>{item.title}</h3>
              <p className={cn("site-feature-card__description", classNames?.description)}>{item.description}</p>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
