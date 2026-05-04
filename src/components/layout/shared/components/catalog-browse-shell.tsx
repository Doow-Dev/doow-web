import type { ReactNode, RefObject } from "react";

import { cn } from "@/lib/utils";

export interface CatalogBrowseShellProps {
  categoryRail: ReactNode;
  children: ReactNode;
  filters: ReactNode;
  hydrated?: boolean;
  isBusy?: boolean;
  namespace: string;
  panelId: string;
  resultsLabel: string;
  selectedTabId?: string;
  status: ReactNode;
  title: ReactNode;
  titleId?: string;
  viewportRef: RefObject<HTMLDivElement | null>;
}

export function CatalogBrowseShell({
  categoryRail,
  children,
  filters,
  hydrated,
  isBusy = false,
  namespace,
  panelId,
  resultsLabel,
  selectedTabId,
  status,
  title,
  titleId,
  viewportRef,
}: CatalogBrowseShellProps) {
  const hydrationDataAttribute = `data-${namespace}-hydrated`;
  const hydrationDataProps = {
    [hydrationDataAttribute]: hydrated ? "true" : "false",
  };
  const resultsRole = selectedTabId ? "tabpanel" : "region";

  return (
    <div
      className={cn("catalog-browse", namespace)}
      data-catalog-browse-hydrated={hydrated ? "true" : "false"}
      data-catalog-browse-namespace={namespace}
      {...hydrationDataProps}
    >
      <div className="catalog-browse__header">
        <h2 className="catalog-browse__title" id={titleId}>
          {title}
        </h2>

        <div className="catalog-browse__filters">{filters}</div>
      </div>

      <div className="catalog-browse__body">
        <div className="catalog-browse__category-rail">{categoryRail}</div>

        <div
          aria-label={selectedTabId ? undefined : resultsLabel}
          aria-busy={isBusy}
          aria-labelledby={selectedTabId}
          className="catalog-browse__results"
          id={panelId}
          role={resultsRole}
        >
          <div className="catalog-browse__results-scroll-region">
            <div
              aria-label={resultsLabel}
              className="catalog-browse__results-viewport"
              ref={viewportRef}
              tabIndex={0}
            >
              <div className="catalog-browse__results-content">{children}</div>
            </div>
          </div>
        </div>
      </div>

      {status}
    </div>
  );
}
