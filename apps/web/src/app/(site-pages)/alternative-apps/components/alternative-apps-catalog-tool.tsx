"use client";

import {
  createElement,
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent,
} from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown, Search } from "lucide-react";

import type { AlternativeAppsPageContent } from "@/app/(site-pages)/alternative-apps/content";
import {
  getIntegrationAppGraphic,
  type IntegrationAppGraphicSource,
} from "@/components/custom/icons/integration-app-icon-registry";
import { CatalogBrowseShell, CatalogProviderCard, QueryErrorMessage, useInfiniteCatalog } from "@/components/layout/shared";
import { Skeleton } from "@/components/ui/skeleton";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { fetchJson } from "@/lib/rest/fetch-json";
import {
  alternativeAppsCatalogCategoryDisplayLimit,
  alternativeAppsCatalogResponseSchema,
  getAlternativeAppsCatalogApiUrl,
  type AlternativeAppsCatalogCategory,
  type AlternativeAppsCatalogItem,
  type AlternativeAppsCatalogLogoPreview,
  type AlternativeAppsCatalogResponse,
} from "@/lib/site/alternative-apps-catalog";
import { capCharacters } from "@/lib/text/cap-characters";

export interface AlternativeAppsCatalogToolProps {
  content: AlternativeAppsPageContent["catalog"];
  initialData: AlternativeAppsCatalogResponse;
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
  return `alternative-apps-catalog-category-${categoryId}`;
}

function getCategoryAppsPanelId(categoryId: string) {
  return `alternative-apps-catalog-category-apps-${categoryId}`;
}

function mergeCategoryItems(
  currentItemsByCategory: Record<string, AlternativeAppsCatalogItem[]>,
  items: readonly AlternativeAppsCatalogItem[],
) {
  if (!items.length) {
    return currentItemsByCategory;
  }

  let didChange = false;
  const nextItemsByCategory: Record<string, AlternativeAppsCatalogItem[]> = { ...currentItemsByCategory };

  items.forEach((item) => {
    const currentItems = nextItemsByCategory[item.categoryId] ?? [];

    if (currentItems.some((currentItem) => currentItem.id === item.id)) {
      return;
    }

    nextItemsByCategory[item.categoryId] = [...currentItems, item].sort((left, right) => left.name.localeCompare(right.name));
    didChange = true;
  });

  return didChange ? nextItemsByCategory : currentItemsByCategory;
}

function getPrimaryCategoryLabel(categoryLabel: string) {
  return categoryLabel.split(",")[0]?.trim() || categoryLabel;
}

function getNextCategoryIndex(currentIndex: number, total: number, direction: "next" | "previous") {
  if (direction === "next") {
    return (currentIndex + 1) % total;
  }

  return (currentIndex - 1 + total) % total;
}

function handleCategoryKeyDown(
  event: KeyboardEvent<HTMLButtonElement>,
  categories: readonly AlternativeAppsCatalogCategory[],
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

  const categoryRail = event.currentTarget.closest('[data-category-rail="alternative-apps-catalog"]');
  const controls = categoryRail
    ? Array.from(categoryRail.querySelectorAll<HTMLButtonElement>('[data-category-control="true"]'))
    : [];
  const nextCategory = categories[nextIndex];

  controls[nextIndex]?.focus();

  if (nextCategory) {
    onSelect(nextCategory.id);
  }
}

function AppGraphic({
  className,
  graphic,
  imageClassName,
  logoUrl,
  name,
}: {
  className?: string;
  graphic: IntegrationAppGraphicSource | null;
  imageClassName?: string;
  logoUrl?: string;
  name: string;
}) {
  if (logoUrl) {
    return (
      <Image
        alt=""
        aria-hidden="true"
        className={imageClassName ?? className}
        height={24}
        loader={passthroughImageLoader}
        src={logoUrl}
        unoptimized
        width={24}
      />
    );
  }

  if (graphic?.kind === "component") {
    return createElement(graphic.component, {
      "aria-hidden": true,
      className,
      focusable: "false",
    });
  }

  if (graphic?.kind === "asset") {
    return <Image alt="" aria-hidden="true" className={imageClassName ?? className} height={24} src={graphic.src} width={24} />;
  }

  return (
    <span aria-hidden="true" className="alternative-apps-catalog-card__logo-fallback">
      {getInitials(name)}
    </span>
  );
}

function AlternativePreviewLogo({ index, preview }: { index: number; preview: AlternativeAppsCatalogLogoPreview }) {
  const graphic = getIntegrationAppGraphic(...preview.logoHints, preview.name);

  return (
    <span
      aria-hidden="true"
      className="alternative-apps-catalog-card__preview-logo"
      style={{ "--alternative-apps-preview-index": index } as CSSProperties}
      title={preview.name}
    >
      <AppGraphic
        className="alternative-apps-catalog-card__preview-logo-svg"
        graphic={graphic}
        imageClassName="alternative-apps-catalog-card__preview-logo-image"
        logoUrl={preview.logoUrl}
        name={preview.name}
      />
    </span>
  );
}

function AlternativeAppsCatalogCard({ item }: { item: AlternativeAppsCatalogItem }) {
  const graphic = getIntegrationAppGraphic(...item.logoHints, item.name);
  const previews = (item.alternativePreviewLogos ?? []).slice(0, 3);
  const remainingAlternativeCount = Math.max(item.alternativeCount - previews.length, 0);
  const categoryLabel = getPrimaryCategoryLabel(item.categoryLabel);

  return (
    <CatalogProviderCard
      aria-label={`${item.name}, ${categoryLabel}, ${item.alternativeCount} alternatives`}
      footer={
        <span className="alternative-apps-catalog-card__alternatives">
          {previews.length ? (
            <span
              aria-hidden="true"
              className="alternative-apps-catalog-card__preview-stack"
              style={{ "--alternative-apps-preview-count": previews.length } as CSSProperties}
            >
              {previews.map((preview, index) => (
                <AlternativePreviewLogo index={index} key={`${item.id}-${preview.id}-${index}`} preview={preview} />
              ))}
            </span>
          ) : null}
          {remainingAlternativeCount > 0 ? (
            <span className="alternative-apps-catalog-card__alternative-count">+{remainingAlternativeCount}</span>
          ) : null}
        </span>
      }
      footerDivider
      footerLabel="Alternatives:"
      href={item.href}
      logo={
        <span aria-label={`${item.name} logo`} className="alternative-apps-catalog-card__logo" role="img">
          <AppGraphic
            className="alternative-apps-catalog-card__logo-svg"
            graphic={graphic}
            imageClassName="alternative-apps-catalog-card__logo-image"
            logoUrl={item.logoUrl}
            name={item.name}
          />
        </span>
      }
      meta={<span className="alternative-apps-catalog-card__category">{categoryLabel}</span>}
      namespace="alternative-apps-catalog"
      title={item.name}
      titleAs="span"
    />
  );
}

function AlternativeAppsCatalogSkeleton({ count = 12 }: { count?: number }) {
  return (
    <div aria-hidden="true" className="alternative-apps-catalog__grid" data-loading="true">
      {Array.from({ length: count }, (_, index) => (
        <div className="alternative-apps-catalog-card alternative-apps-catalog-card--skeleton" key={index}>
          <Skeleton className="alternative-apps-catalog-card__logo" />
          <span className="alternative-apps-catalog-card__copy">
            <Skeleton className="alternative-apps-catalog-card__title-skeleton" />
            <Skeleton className="alternative-apps-catalog-card__category-skeleton" />
            <span className="alternative-apps-catalog-card__divider" />
            <span className="alternative-apps-catalog-card__footer">
              <Skeleton className="alternative-apps-catalog-card__footer-label-skeleton" />
              <span className="alternative-apps-catalog-card__alternatives alternative-apps-catalog-card__alternatives--skeleton">
                <span
                  className="alternative-apps-catalog-card__preview-stack"
                  style={{ "--alternative-apps-preview-count": 3 } as CSSProperties}
                >
                  {Array.from({ length: 3 }, (_, logoIndex) => (
                    <Skeleton
                      className="alternative-apps-catalog-card__preview-logo alternative-apps-catalog-card__preview-logo--skeleton"
                      key={logoIndex}
                      style={{ "--alternative-apps-preview-index": logoIndex } as CSSProperties}
                    />
                  ))}
                </span>
                <Skeleton className="alternative-apps-catalog-card__alternative-count-skeleton" />
              </span>
            </span>
          </span>
        </div>
      ))}
    </div>
  );
}

function CappedCategoryLabel({ label }: { label: string }) {
  const cappedLabel = capCharacters(label, 20);
  const labelElement = <span className="alternative-apps-catalog__category-label">{cappedLabel.text}</span>;

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
  categories: readonly AlternativeAppsCatalogCategory[];
  categoryItemsById: Readonly<Record<string, readonly AlternativeAppsCatalogItem[]>>;
  expandedCategoryIds: ReadonlySet<string>;
  loadingCategoryIds: ReadonlySet<string>;
  onSelect: (categoryId: string) => void;
  onToggle: (category: AlternativeAppsCatalogCategory) => void;
  panelId: string;
  selectedCategoryId: string;
}

function CategoryRail({
  categories,
  categoryItemsById,
  expandedCategoryIds,
  loadingCategoryIds,
  onSelect,
  onToggle,
  panelId,
  selectedCategoryId,
}: CategoryRailProps) {
  return (
    <div
      aria-label="Browse alternative applications by category"
      className="alternative-apps-catalog__category-rail"
      data-category-rail="alternative-apps-catalog"
    >
      {categories.map((category, index) => {
        const isSelected = category.id === selectedCategoryId;
        const isExpandable = category.id !== "all";
        const isExpanded = isExpandable && expandedCategoryIds.has(category.id);
        const appsPanelId = getCategoryAppsPanelId(category.id);
        const categoryItems = categoryItemsById[category.id] ?? [];

        return (
          <div className="alternative-apps-catalog__category-group" data-expanded={isExpanded ? "true" : "false"} key={category.id}>
            <div
              className="alternative-apps-catalog__category-row"
              data-state={isSelected ? "active" : "inactive"}
              data-expandable={isExpandable ? "true" : "false"}
            >
              <button
                aria-label={`${category.label} ${category.count}`}
                aria-current={isSelected ? "true" : undefined}
                aria-controls={panelId}
                className="alternative-apps-catalog__category-filter-button"
                data-category-control="true"
                id={getCategoryButtonId(category.id)}
                onClick={() => onSelect(category.id)}
                onKeyDown={(event) => handleCategoryKeyDown(event, categories, index, onSelect)}
                type="button"
              >
                <CappedCategoryLabel label={category.label} />
                <span className="alternative-apps-catalog__category-count">{category.count}</span>
              </button>
              {isExpandable ? (
                <button
                  aria-controls={appsPanelId}
                  aria-expanded={isExpanded}
                  aria-label={`${isExpanded ? "Collapse" : "Expand"} ${category.label}`}
                  className="alternative-apps-catalog__category-toggle-button"
                  onClick={() => onToggle(category)}
                  type="button"
                >
                  <ChevronDown
                    aria-hidden="true"
                    className="alternative-apps-catalog__category-chevron"
                    data-expanded={isExpanded ? "true" : "false"}
                    strokeWidth={2}
                  />
                </button>
              ) : null}
            </div>

            {isExpanded ? (
              <div
                aria-label={`Applications in ${category.label}`}
                className="alternative-apps-catalog__category-apps"
                id={appsPanelId}
              >
                {categoryItems.map((item) => (
                  <Link
                    aria-label={`View ${item.name} alternatives`}
                    className="alternative-apps-catalog__category-app-link"
                    href={item.href}
                    key={`${category.id}-${item.id}`}
                  >
                    {item.name}
                  </Link>
                ))}
                {loadingCategoryIds.has(category.id) ? (
                  <span className="alternative-apps-catalog__category-app-status">Loading apps...</span>
                ) : null}
              </div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}

interface CategorySelectProps {
  categories: readonly AlternativeAppsCatalogCategory[];
  onSelect: (categoryId: string) => void;
  selectedCategoryId: string;
}

function CategorySelect({ categories, onSelect, selectedCategoryId }: CategorySelectProps) {
  return (
    <label className="alternative-apps-catalog__mobile-category">
      <span className="sr-only">Select application category</span>
      <select
        className="alternative-apps-catalog__mobile-select"
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

export function AlternativeAppsCatalogTool({ content, initialData }: AlternativeAppsCatalogToolProps) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const loadingCategoryIdsRef = useRef(new Set<string>());
  const [categoryItemsById, setCategoryItemsById] = useState<Record<string, AlternativeAppsCatalogItem[]>>(() =>
    mergeCategoryItems({}, initialData.items),
  );
  const [expandedCategoryIds, setExpandedCategoryIds] = useState<Set<string>>(() => new Set());
  const [loadingCategoryIds, setLoadingCategoryIds] = useState<Set<string>>(() => new Set());
  const getPageUrl = useCallback(
    ({ categoryId, cursor, query }: { categoryId: string; cursor?: string | null; query: string }) =>
      getAlternativeAppsCatalogApiUrl({
        categoryId,
        cursor,
        query,
      }),
    [],
  );
  const {
    data,
    isHydrated,
    isLoading,
    isLoadingMore,
    loadError,
    loadMoreRef,
    pageVersion,
    searchQuery,
    selectedCategoryId,
    setSearchQuery,
    setSelectedCategoryId,
    retryLastRequest,
  } = useInfiniteCatalog<AlternativeAppsCatalogResponse, AlternativeAppsCatalogItem, AlternativeAppsCatalogCategory>({
    errorMessage: "We could not update the application catalog right now. Please try again.",
    getItemKey: (item) => item.id,
    getPageUrl,
    initialData,
    rootRef: viewportRef,
    schema: alternativeAppsCatalogResponseSchema,
  });
  const panelId = `${content.id}-panel`;
  useEffect(() => {
    const viewport = viewportRef.current;

    if (!viewport) {
      return;
    }

    viewport.scrollTop = 0;
  }, [pageVersion, viewportRef]);

  useEffect(() => {
    setCategoryItemsById((currentItemsByCategory) => mergeCategoryItems(currentItemsByCategory, data.items));
  }, [data.items]);

  const preloadCategoryApps = useCallback(
    async (category: AlternativeAppsCatalogCategory) => {
      if (category.id === "all" || loadingCategoryIdsRef.current.has(category.id)) {
        return;
      }

      const cachedItems = categoryItemsById[category.id] ?? [];

      if (category.count > 0 && cachedItems.length >= category.count) {
        return;
      }

      loadingCategoryIdsRef.current.add(category.id);
      setLoadingCategoryIds((currentIds) => new Set(currentIds).add(category.id));

      try {
        const response = await fetchJson<AlternativeAppsCatalogResponse>(
          getAlternativeAppsCatalogApiUrl({
            categoryId: category.id,
            take: Math.min(Math.max(category.count, 1), alternativeAppsCatalogCategoryDisplayLimit),
          }),
          {
            init: {
              cache: "no-store",
            },
            schema: alternativeAppsCatalogResponseSchema,
          },
        );

        setCategoryItemsById((currentItemsByCategory) => mergeCategoryItems(currentItemsByCategory, response.items));
      } catch {
        // The result grid remains the primary catalog surface; a failed sidebar prefetch should not block browsing.
      } finally {
        loadingCategoryIdsRef.current.delete(category.id);
        setLoadingCategoryIds((currentIds) => {
          const nextIds = new Set(currentIds);

          nextIds.delete(category.id);

          return nextIds;
        });
      }
    },
    [categoryItemsById],
  );

  useEffect(() => {
    data.categories
      .filter((category) => expandedCategoryIds.has(category.id))
      .forEach((category) => {
        void preloadCategoryApps(category);
      });
  }, [data.categories, expandedCategoryIds, preloadCategoryApps]);

  function handleCategorySelect(categoryId: string) {
    if (categoryId === selectedCategoryId) {
      return;
    }

    setSelectedCategoryId(categoryId);
  }

  function handleCategoryToggle(category: AlternativeAppsCatalogCategory) {
    const isCurrentlyExpanded = expandedCategoryIds.has(category.id);

    setExpandedCategoryIds((currentIds) => {
      const nextIds = new Set(currentIds);

      if (nextIds.has(category.id)) {
        nextIds.delete(category.id);
      } else {
        nextIds.add(category.id);
      }

      return nextIds;
    });

    if (!isCurrentlyExpanded) {
      void preloadCategoryApps(category);
    }
  }

  return (
    <CatalogBrowseShell
      categoryRail={
        <CategoryRail
          categories={data.categories}
          categoryItemsById={categoryItemsById}
          expandedCategoryIds={expandedCategoryIds}
          loadingCategoryIds={loadingCategoryIds}
          onSelect={handleCategorySelect}
          onToggle={handleCategoryToggle}
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

          <label className="alternative-apps-catalog__search">
            <span className="sr-only">{content.searchPlaceholder}</span>
            <Search aria-hidden="true" className="alternative-apps-catalog__search-icon" strokeWidth={1.8} />
            <input
              className="alternative-apps-catalog__search-input"
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder={content.searchPlaceholder}
              type="search"
              value={searchQuery}
            />
          </label>
        </>
      }
      hydrated={isHydrated}
      isBusy={isLoading || isLoadingMore}
      namespace="alternative-apps-catalog"
      panelId={panelId}
      resultsLabel="Alternative application catalog results"
      status={
        <p
          aria-live="polite"
          className="sr-only"
          role="status"
        >
          {loadError || `${data.totalCount} applications shown.`}
        </p>
      }
      title={content.title}
      titleId={`${content.id}-heading`}
      viewportRef={viewportRef}
    >
      {loadError ? (
        <QueryErrorMessage
          actionLabel="Retry"
          message={loadError}
          onRetry={retryLastRequest}
          title="Application catalog unavailable"
        />
      ) : isLoading ? (
        <AlternativeAppsCatalogSkeleton />
      ) : data.items.length ? (
        <div className="alternative-apps-catalog__grid">
          {data.items.map((item) => (
            <AlternativeAppsCatalogCard item={item} key={item.id} />
          ))}
        </div>
      ) : (
        <div className="alternative-apps-catalog__empty">
          <p className="alternative-apps-catalog__empty-title">No applications found</p>
          <p className="alternative-apps-catalog__empty-copy">Try another search or category.</p>
        </div>
      )}
      {isLoadingMore ? (
        <div className="alternative-apps-catalog__load-more">
          <AlternativeAppsCatalogSkeleton count={6} />
        </div>
      ) : null}
      {data.nextCursor ? (
        <div aria-hidden="true" className="alternative-apps-catalog__load-more-sentinel" ref={loadMoreRef} />
      ) : null}
    </CatalogBrowseShell>
  );
}
