"use client";

import { useCallback, useEffect, useRef, useState, useTransition, type RefObject } from "react";
import { z } from "zod";

import { fetchJson } from "@/lib/rest/fetch-json";

export interface InfiniteCatalogPageBase<TItem, TCategory> {
  categories: readonly TCategory[];
  hasMore?: boolean;
  items: readonly TItem[];
  nextCursor?: string | null;
  query: string;
  selectedCategoryId: string;
  totalCount: number;
}

interface UseInfiniteCatalogOptions<TPage extends InfiniteCatalogPageBase<TItem, TCategory>, TItem, TCategory> {
  debounceMs?: number;
  errorMessage: string;
  getItemKey: (item: TItem) => string;
  getPageUrl: (options: { categoryId: string; cursor?: string | null; query: string }) => string;
  initialData: TPage;
  rootRef: RefObject<HTMLElement | null>;
  schema: z.ZodType<TPage>;
}

function getRequestKey(categoryId: string, query: string) {
  return `${categoryId}::${query.trim().toLowerCase()}`;
}

function mergePages<TPage extends InfiniteCatalogPageBase<TItem, TCategory>, TItem, TCategory>({
  getItemKey,
  nextPage,
  previousPage,
}: {
  getItemKey: (item: TItem) => string;
  nextPage: TPage;
  previousPage: TPage;
}) {
  const seenKeys = new Set(previousPage.items.map(getItemKey));
  const nextItems = nextPage.items.filter((item) => {
    const key = getItemKey(item);

    if (seenKeys.has(key)) {
      return false;
    }

    seenKeys.add(key);
    return true;
  });

  return {
    ...nextPage,
    categories: nextPage.categories.length ? nextPage.categories : previousPage.categories,
    items: [...previousPage.items, ...nextItems],
  };
}

export function useInfiniteCatalog<TPage extends InfiniteCatalogPageBase<TItem, TCategory>, TItem, TCategory>({
  debounceMs = 220,
  errorMessage,
  getItemKey,
  getPageUrl,
  initialData,
  rootRef,
  schema,
}: UseInfiniteCatalogOptions<TPage, TItem, TCategory>) {
  const [data, setData] = useState(initialData);
  const [selectedCategoryId, setSelectedCategoryId] = useState(initialData.selectedCategoryId);
  const [searchQuery, setSearchQuery] = useState(initialData.query);
  const [loadError, setLoadError] = useState("");
  const [isHydrated, setIsHydrated] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [pageVersion, setPageVersion] = useState(0);
  const [retryVersion, setRetryVersion] = useState(0);
  const [, startTransition] = useTransition();
  const abortControllerRef = useRef<AbortController | null>(null);
  const loadMoreRef = useRef<HTMLDivElement>(null);
  const resolvedRequestKeyRef = useRef(getRequestKey(initialData.selectedCategoryId, initialData.query));
  const pendingRequestKeyRef = useRef<string | null>(null);
  const loadingMoreCursorRef = useRef<string | null>(null);
  const failedRequestRef = useRef<{ kind: "refresh"; requestKey: string } | { kind: "loadMore" } | null>(null);

  useEffect(() => {
    setIsHydrated(true);

    return () => {
      abortControllerRef.current?.abort();
    };
  }, []);

  const loadMore = useCallback(async () => {
    if (isRefreshing || isLoadingMore || !data.nextCursor || data.hasMore === false) {
      return;
    }

    const cursor = data.nextCursor;

    if (loadingMoreCursorRef.current === cursor) {
      return;
    }

    loadingMoreCursorRef.current = cursor;
    setIsLoadingMore(true);
    setLoadError("");
    failedRequestRef.current = null;

    try {
      const nextPage = await fetchJson<TPage>(
        getPageUrl({
          categoryId: selectedCategoryId,
          cursor,
          query: searchQuery.trim(),
        }),
        {
          init: {
            cache: "no-store",
          },
          schema,
        },
      );

      startTransition(() => {
        setData((previousPage) => mergePages({ getItemKey, nextPage, previousPage }) as TPage);
      });
      failedRequestRef.current = null;
    } catch {
      setLoadError(errorMessage);
      failedRequestRef.current = { kind: "loadMore" };
    } finally {
      if (loadingMoreCursorRef.current === cursor) {
        loadingMoreCursorRef.current = null;
      }

      setIsLoadingMore(false);
    }
  }, [
    data.hasMore,
    data.nextCursor,
    errorMessage,
    getItemKey,
    getPageUrl,
    isLoadingMore,
    isRefreshing,
    schema,
    searchQuery,
    selectedCategoryId,
    startTransition,
  ]);

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
      loadingMoreCursorRef.current = null;
      setIsRefreshing(true);
      setLoadError("");
      failedRequestRef.current = null;

      try {
        const nextPage = await fetchJson<TPage>(
          getPageUrl({
            categoryId: selectedCategoryId,
            query: trimmedQuery,
          }),
          {
            init: {
              cache: "no-store",
              signal: controller.signal,
            },
            schema,
          },
        );

        startTransition(() => {
          setData(nextPage);
          setPageVersion((version) => version + 1);
        });
        resolvedRequestKeyRef.current = requestKey;
        failedRequestRef.current = null;
      } catch (error) {
        if (error instanceof Error && error.name === "AbortError") {
          return;
        }

        setLoadError(errorMessage);
        failedRequestRef.current = { kind: "refresh", requestKey };
      } finally {
        if (pendingRequestKeyRef.current === requestKey) {
          pendingRequestKeyRef.current = null;
          setIsRefreshing(false);
        }
      }
    }, debounceMs);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [debounceMs, errorMessage, getPageUrl, retryVersion, schema, searchQuery, selectedCategoryId, startTransition]);

  useEffect(() => {
    const sentinel = loadMoreRef.current;

    if (!sentinel || !data.nextCursor || data.hasMore === false) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          loadMore();
        }
      },
      {
        root: rootRef.current,
        rootMargin: "96px 0px",
        threshold: 0,
      },
    );

    observer.observe(sentinel);

    return () => {
      observer.disconnect();
    };
  }, [data.hasMore, data.nextCursor, loadMore, rootRef]);

  const selectCategory = useCallback((categoryId: string) => {
    setSelectedCategoryId((currentCategoryId) => (currentCategoryId === categoryId ? currentCategoryId : categoryId));
  }, []);

  const retryLastRequest = useCallback(() => {
    const failedRequest = failedRequestRef.current;

    if (!failedRequest) {
      return;
    }

    if (failedRequest.kind === "loadMore") {
      void loadMore();
      return;
    }

    resolvedRequestKeyRef.current = "";
    pendingRequestKeyRef.current = null;
    setRetryVersion((version) => version + 1);
  }, [loadMore]);

  return {
    data,
    isHydrated,
    isLoading: isRefreshing,
    isLoadingMore,
    loadError,
    loadMore,
    loadMoreRef,
    pageVersion,
    searchQuery,
    selectedCategoryId,
    setSearchQuery,
    setSelectedCategoryId: selectCategory,
    retryLastRequest,
  };
}
