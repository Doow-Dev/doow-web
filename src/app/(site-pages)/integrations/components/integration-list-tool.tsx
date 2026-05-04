"use client";

import type { KeyboardEvent } from "react";
import { useEffect, useMemo, useRef, useState, useTransition } from "react";
import Image from "next/image";
import { Search } from "lucide-react";

import type { IntegrationsIntegrationListContent } from "@/app/(site-pages)/integrations/content/integration-list-content";
import { CatalogBrowseShell, CatalogProviderCard, QueryErrorMessage } from "@/components/layout/shared";
import { Skeleton } from "@/components/ui/skeleton";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { fetchJson } from "@/lib/rest/fetch-json";
import {
  getIntegrationCatalogApiUrl,
  integrationCatalogResponseSchema,
  type IntegrationCatalogCategory,
  type IntegrationCatalogItem,
  type IntegrationCatalogResponse,
} from "@/lib/site/integration-catalog";
import { capCharacters } from "@/lib/text/cap-characters";

export interface IntegrationListToolProps {
  content: IntegrationsIntegrationListContent;
  initialData: IntegrationCatalogResponse;
}

function passthroughImageLoader({ src }: { src: string }) {
  return src;
}

function getInitials(name: string) {
  const words = name.trim().split(/\s+/).filter(Boolean);

  if (!words.length) {
    return "?";
  }

  if (words.length === 1) {
    return words[0].slice(0, 2).toUpperCase();
  }

  return `${words[0]?.[0] ?? ""}${words[1]?.[0] ?? ""}`.toUpperCase();
}

function getCategoryButtonId(categoryId: string) {
  return `integration-list-category-${categoryId}`;
}

function getRequestKey(categoryId: string, query: string) {
  return `${categoryId}::${query.trim()}`;
}

function getNextCategoryIndex(currentIndex: number, total: number, direction: "next" | "previous") {
  if (direction === "next") {
    return (currentIndex + 1) % total;
  }

  return (currentIndex - 1 + total) % total;
}

function handleCategoryKeyDown(
  event: KeyboardEvent<HTMLButtonElement>,
  categories: readonly IntegrationCatalogCategory[],
  index: number,
  onSelect: (categoryId: string) => void,
) {
  if (!["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "Home", "End"].includes(event.key)) {
    return;
  }

  event.preventDefault();

  let nextIndex = index;

  if (event.key === "ArrowRight" || event.key === "ArrowDown") {
    nextIndex = getNextCategoryIndex(index, categories.length, "next");
  }

  if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
    nextIndex = getNextCategoryIndex(index, categories.length, "previous");
  }

  if (event.key === "Home") {
    nextIndex = 0;
  }

  if (event.key === "End") {
    nextIndex = categories.length - 1;
  }

  const tablist = event.currentTarget.closest('[role="tablist"]');
  const tabs = tablist ? Array.from(tablist.querySelectorAll<HTMLButtonElement>('[role="tab"]')) : [];
  const nextCategory = categories[nextIndex];

  tabs[nextIndex]?.focus();

  if (nextCategory) {
    onSelect(nextCategory.id);
  }
}

function IntegrationCardLogo({ item }: { item: IntegrationCatalogItem }) {
  return (
    <span aria-label={`${item.name} logo`} className="integration-list-card__logo" role="img">
      {item.logoUrl ? (
        <Image
          alt=""
          aria-hidden="true"
          className="integration-list-card__logo-image"
          height={24}
          loader={passthroughImageLoader}
          src={item.logoUrl}
          unoptimized
          width={24}
        />
      ) : (
        <span aria-hidden="true" className="integration-list-card__logo-fallback">
          {getInitials(item.name)}
        </span>
      )}
    </span>
  );
}

function IntegrationCatalogCard({ item }: { item: IntegrationCatalogItem }) {
  return (
    <CatalogProviderCard
      description={item.description}
      logo={<IntegrationCardLogo item={item} />}
      namespace="integration-list"
      title={item.name}
    />
  );
}

function IntegrationListSkeleton({ count = 15 }: { count?: number }) {
  return (
    <div aria-hidden="true" className="integration-list-grid" data-loading="true">
      {Array.from({ length: count }, (_, index) => (
        <div className="integration-list-card integration-list-card--skeleton" key={index}>
          <Skeleton className="integration-list-card__logo integration-list-card__logo--skeleton" />
          <div className="integration-list-card__copy">
            <Skeleton className="integration-list-card__title-skeleton" />
            <Skeleton className="integration-list-card__line-skeleton" />
            <Skeleton className="integration-list-card__line-skeleton integration-list-card__line-skeleton--short" />
          </div>
        </div>
      ))}
    </div>
  );
}

function CappedCategoryLabel({ label }: { label: string }) {
  const cappedLabel = capCharacters(label, 20);
  const labelElement = <span className="integration-list__category-label">{cappedLabel.text}</span>;

  if (!cappedLabel.isCapped) {
    return labelElement;
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>{labelElement}</TooltipTrigger>
        <TooltipContent>{label}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

interface CategoryRailProps {
  categories: readonly IntegrationCatalogCategory[];
  panelId: string;
  selectedCategoryId: string;
  onSelect: (categoryId: string) => void;
}

function CategoryRail({ categories, onSelect, panelId, selectedCategoryId }: CategoryRailProps) {
  return (
    <div aria-label="Browse integrations by category" className="integration-list__category-rail" role="tablist">
      {categories.map((category, index) => {
        const isSelected = category.id === selectedCategoryId;

        return (
          <div className="integration-list__category-group" key={category.id}>
            <div className="integration-list__category-row" data-state={isSelected ? "active" : "inactive"}>
              <button
                aria-label={`${category.label} ${category.count}`}
                aria-controls={panelId}
                aria-selected={isSelected}
                className="integration-list__category-filter-button"
                data-category-control="true"
                id={getCategoryButtonId(category.id)}
                onClick={() => onSelect(category.id)}
                onKeyDown={(event) => handleCategoryKeyDown(event, categories, index, onSelect)}
                role="tab"
                tabIndex={isSelected ? 0 : -1}
                type="button"
              >
                <CappedCategoryLabel label={category.label} />
                <span className="integration-list__category-count">{category.count}</span>
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

interface CategorySelectProps {
  categories: readonly IntegrationCatalogCategory[];
  selectedCategoryId: string;
  onSelect: (categoryId: string) => void;
}

function CategorySelect({ categories, onSelect, selectedCategoryId }: CategorySelectProps) {
  return (
    <label className="integration-list__mobile-category">
      <span className="sr-only">Select integration category</span>
      <select
        className="integration-list__mobile-select"
        onChange={(event) => onSelect(event.target.value)}
        value={selectedCategoryId}
      >
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.label} ({category.count})
          </option>
        ))}
      </select>
    </label>
  );
}

export function IntegrationListTool({ content, initialData }: IntegrationListToolProps) {
  const [data, setData] = useState(initialData);
  const [selectedCategoryId, setSelectedCategoryId] = useState(initialData.selectedCategoryId);
  const [searchQuery, setSearchQuery] = useState(initialData.query);
  const [loadError, setLoadError] = useState("");
  const [isHydrated, setIsHydrated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [retryVersion, setRetryVersion] = useState(0);
  const [, startTransition] = useTransition();
  const abortControllerRef = useRef<AbortController | null>(null);
  const resolvedRequestKeyRef = useRef(getRequestKey(initialData.selectedCategoryId, initialData.query));
  const pendingRequestKeyRef = useRef<string | null>(null);
  const failedRequestKeyRef = useRef<string | null>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const panelId = "integration-list-panel";
  const selectedCategory = useMemo(
    () => data.categories.find((category) => category.id === selectedCategoryId) ?? data.categories[0],
    [data.categories, selectedCategoryId],
  );
  const selectedTabId = selectedCategory ? getCategoryButtonId(selectedCategory.id) : undefined;

  useEffect(() => {
    setIsHydrated(true);

    return () => {
      abortControllerRef.current?.abort();
    };
  }, []);

  useEffect(() => {
    const trimmedQuery = searchQuery.trim();
    const requestKey = getRequestKey(selectedCategoryId, trimmedQuery);

    if (requestKey === resolvedRequestKeyRef.current || requestKey === pendingRequestKeyRef.current) {
      return;
    }

    const timeoutId = window.setTimeout(async () => {
      abortControllerRef.current?.abort();

      const controller = new AbortController();
      abortControllerRef.current = controller;
      pendingRequestKeyRef.current = requestKey;
      setIsLoading(true);
      setLoadError("");
      failedRequestKeyRef.current = null;

      try {
        const nextData = await fetchJson<IntegrationCatalogResponse>(
          getIntegrationCatalogApiUrl({
            categoryId: selectedCategoryId,
            query: trimmedQuery,
          }),
          {
            init: {
              cache: "no-store",
              signal: controller.signal,
            },
            schema: integrationCatalogResponseSchema,
          },
        );

        startTransition(() => {
          setData(nextData);
        });
        resolvedRequestKeyRef.current = requestKey;
        failedRequestKeyRef.current = null;
      } catch (error) {
        if (error instanceof Error && error.name === "AbortError") {
          return;
        }

        setLoadError("We could not update the integration catalog right now. Please try again.");
        failedRequestKeyRef.current = requestKey;
      } finally {
        if (pendingRequestKeyRef.current === requestKey) {
          pendingRequestKeyRef.current = null;
          setIsLoading(false);
        }
      }
    }, 220);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [retryVersion, searchQuery, selectedCategoryId, startTransition]);

  useEffect(() => {
    const viewport = viewportRef.current;

    if (!viewport) {
      return;
    }

    viewport.scrollTop = 0;
  }, [data.items, viewportRef]);

  function handleCategorySelect(categoryId: string) {
    if (categoryId === selectedCategoryId) {
      return;
    }

    setSelectedCategoryId(categoryId);
  }

  function handleRetry() {
    if (!failedRequestKeyRef.current) {
      return;
    }

    resolvedRequestKeyRef.current = "";
    pendingRequestKeyRef.current = null;
    setRetryVersion((version) => version + 1);
  }

  return (
    <CatalogBrowseShell
      categoryRail={
        <CategoryRail
          categories={data.categories}
          onSelect={handleCategorySelect}
          panelId={panelId}
          selectedCategoryId={selectedCategoryId}
        />
      }
      filters={
        <>
          <CategorySelect
            categories={data.categories}
            onSelect={handleCategorySelect}
            selectedCategoryId={selectedCategoryId}
          />

          <label className="integration-list__search">
            <span className="sr-only">Search integrations</span>
            <Search aria-hidden="true" className="integration-list__search-icon" strokeWidth={1.8} />
            <input
              className="integration-list__search-input"
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder={content.searchPlaceholder}
              type="search"
              value={searchQuery}
            />
          </label>
        </>
      }
      hydrated={isHydrated}
      isBusy={isLoading}
      namespace="integration-list"
      panelId={panelId}
      resultsLabel="Integration catalog results"
      selectedTabId={selectedTabId}
      status={
        <p aria-live="polite" className="sr-only" role="status">
          {loadError || `${data.totalCount} integrations shown.`}
        </p>
      }
      title="Browse Our Integration Catalog"
      viewportRef={viewportRef}
    >
      {loadError ? (
        <QueryErrorMessage
          actionLabel="Retry"
          message={loadError}
          onRetry={handleRetry}
          title="Integration catalog unavailable"
        />
      ) : isLoading ? (
        <IntegrationListSkeleton />
      ) : data.items.length ? (
        <div className="integration-list-grid">
          {data.items.map((item) => (
            <IntegrationCatalogCard item={item} key={item.id} />
          ))}
        </div>
      ) : (
        <div className="integration-list__empty">
          <p className="integration-list__empty-title">No integrations found</p>
          <p className="integration-list__empty-copy">Try another search or category.</p>
        </div>
      )}
    </CatalogBrowseShell>
  );
}
