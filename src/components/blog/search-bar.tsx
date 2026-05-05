"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useId, useMemo, useRef, useState } from "react";

import { usePostHogTracking } from "@/lib/hooks/usePostHog";
import type { SearchEntry } from "@/lib/blog/search";

import { formatBlogNumericDate } from "./format";

const MAX_RESULTS = 6;

function searchableText(entry: SearchEntry) {
  return [entry.title, entry.description, entry.excerpt, entry.category, ...entry.tags].join(" ").toLowerCase();
}

export function BlogSearchBar() {
  const inputId = useId();
  const listboxId = useId();
  const router = useRouter();
  const { trackEvent } = usePostHogTracking();
  const cacheRef = useRef<SearchEntry[] | null>(null);
  const trackedQueryRef = useRef("");
  const [entries, setEntries] = useState<SearchEntry[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(-1);

  const results = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    if (!normalizedQuery) {
      return [];
    }

    return entries.filter((entry) => searchableText(entry).includes(normalizedQuery)).slice(0, MAX_RESULTS);
  }, [entries, query]);

  async function loadIndex() {
    if (cacheRef.current) {
      setEntries(cacheRef.current);
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("/blog/search.json");
      const data = (await response.json()) as SearchEntry[];

      cacheRef.current = data;
      setEntries(data);
    } finally {
      setIsLoading(false);
    }
  }

  function trackSearch() {
    const normalizedQuery = query.trim();

    if (!normalizedQuery || trackedQueryRef.current === normalizedQuery) {
      return;
    }

    trackedQueryRef.current = normalizedQuery;
    trackEvent("blog_search_used", {
      query: normalizedQuery,
      results_count: results.length,
    });
  }

  function openSearch() {
    void loadIndex();
    setIsOpen(true);
  }

  function selectResult(entry: SearchEntry) {
    trackEvent("blog_search_result_clicked", {
      query: query.trim(),
      slug: entry.slug,
    });
    router.push(`/blog/${entry.slug}`);
  }

  const showPanel = isOpen && query.trim().length > 0;
  const activeResult = activeIndex >= 0 ? results[activeIndex] : undefined;

  return (
    <div className="blog-search">
      <label className="sr-only" htmlFor={inputId}>
        Search blog articles
      </label>
      <input
        aria-activedescendant={activeResult ? `${listboxId}-${activeResult.slug}` : undefined}
        aria-autocomplete="list"
        aria-controls={listboxId}
        aria-expanded={showPanel}
        className="blog-search__input"
        id={inputId}
        onBlur={() => {
          window.setTimeout(() => setIsOpen(false), 120);
          trackSearch();
        }}
        onChange={(event) => {
          setQuery(event.target.value);
          setActiveIndex(-1);
          setIsOpen(true);
        }}
        onFocus={openSearch}
        onKeyDown={(event) => {
          if (event.key === "Escape") {
            setIsOpen(false);
            setActiveIndex(-1);
            return;
          }

          if (event.key === "ArrowDown") {
            event.preventDefault();
            setIsOpen(true);
            setActiveIndex((current) => Math.min(current + 1, results.length - 1));
            return;
          }

          if (event.key === "ArrowUp") {
            event.preventDefault();
            setActiveIndex((current) => Math.max(current - 1, 0));
            return;
          }

          if (event.key === "Enter") {
            trackSearch();

            if (activeResult) {
              event.preventDefault();
              selectResult(activeResult);
            }
          }
        }}
        placeholder="Search articles"
        role="combobox"
        type="search"
        value={query}
      />

      {showPanel ? (
        <div className="blog-search__panel" id={listboxId} role="listbox">
          {isLoading ? <p className="blog-search__empty">Loading articles...</p> : null}
          {!isLoading && results.length === 0 ? <p className="blog-search__empty">No results for {query.trim()}</p> : null}
          {!isLoading && results.length > 0
            ? results.map((entry, index) => (
                <Link
                  aria-selected={index === activeIndex}
                  className="blog-search__result"
                  href={`/blog/${entry.slug}`}
                  id={`${listboxId}-${entry.slug}`}
                  key={entry.slug}
                  onClick={() => selectResult(entry)}
                  role="option"
                >
                  <span>
                    <strong>{entry.title}</strong>
                    <small>{entry.category} / {formatBlogNumericDate(entry.publishedAt)}</small>
                  </span>
                </Link>
              ))
            : null}
        </div>
      ) : null}
    </div>
  );
}
