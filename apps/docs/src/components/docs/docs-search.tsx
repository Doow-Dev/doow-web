"use client";

import { Search, Sparkles, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";

import type { DocsSearchRecord } from "@/lib/docs/search";

type SearchMode = "search" | "ask";

export const DOCS_SEARCH_OPEN_EVENT = "docs:open-search";

export function dispatchDocsSearchOpen(mode: SearchMode = "search") {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(DOCS_SEARCH_OPEN_EVENT, { detail: { mode } }));
}

const noopSubscribe = () => () => {};
const getShortcutSnapshot = () => {
  const ua = typeof navigator !== "undefined" ? navigator.userAgent.toLowerCase() : "";
  return /mac|iphone|ipad|ipod/.test(ua) ? "⌘ K" : "Ctrl K";
};
const getShortcutServerSnapshot = () => "Ctrl K";

export function DocsSearch() {
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState<SearchMode>("search");
  const [query, setQuery] = useState("");
  const [records, setRecords] = useState<DocsSearchRecord[]>([]);
  const shortcut = useSyncExternalStore(noopSubscribe, getShortcutSnapshot, getShortcutServerSnapshot);
  const dialogRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    fetch("/search.json")
      .then((response) => (response.ok ? response.json() : []))
      .then((data: DocsSearchRecord[]) => setRecords(data))
      .catch(() => setRecords([]));
  }, []);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setMode("search");
        setIsOpen(true);
      }

      const target = event.target as HTMLElement | null;
      const isTyping =
        target?.tagName === "INPUT" ||
        target?.tagName === "TEXTAREA" ||
        target?.isContentEditable;

      if (!isTyping && event.key === "/") {
        event.preventDefault();
        setMode("search");
        setIsOpen(true);
      }

      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    function onOpen(event: Event) {
      const detail = (event as CustomEvent<{ mode?: SearchMode }>).detail;
      setMode(detail?.mode ?? "search");
      setIsOpen(true);
    }

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener(DOCS_SEARCH_OPEN_EVENT, onOpen);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener(DOCS_SEARCH_OPEN_EVENT, onOpen);
    };
  }, []);

  useEffect(() => {
    if (!isOpen) {
      triggerRef.current?.focus();
      return;
    }

    inputRef.current?.focus();
  }, [isOpen]);

  const results = useMemo(() => {
    const normalized = query.trim().toLowerCase();

    if (!normalized) {
      return records;
    }

    return records.filter((record) => {
      return [record.title, record.description, record.section, record.path]
        .join(" ")
        .toLowerCase()
        .includes(normalized);
    });
  }, [query, records]);

  const isAsk = mode === "ask";
  const placeholder = isAsk
    ? "Ask a question about Doow..."
    : "Search integrations...";
  const headerTitle = isAsk ? "Ask Doow Docs" : "Search Doow Docs";
  const headerHelp = isAsk
    ? "AI answers are coming soon. For now, ask via search and pick the closest doc."
    : "Use Enter to open a result, or Escape to close.";

  return (
    <>
      <button
        aria-haspopup="dialog"
        className="docs-search-trigger"
        onClick={() => {
          setMode("search");
          setIsOpen(true);
        }}
        ref={triggerRef}
        type="button"
      >
        <Search aria-hidden="true" size={16} />
        <span>Search docs</span>
        <kbd>{shortcut}</kbd>
      </button>
      {isOpen ? (
        <div
          aria-labelledby="docs-search-title"
          aria-modal="true"
          className="docs-search-modal"
          ref={dialogRef}
          role="dialog"
        >
          <button
            aria-label="Close search"
            className="docs-search-backdrop"
            onClick={() => setIsOpen(false)}
            type="button"
          />
          <div className="docs-search-panel" data-mode={mode}>
            <div className="docs-search-field">
              {isAsk ? <Sparkles aria-hidden="true" size={18} /> : <Search aria-hidden="true" size={18} />}
              <input
                aria-describedby="docs-search-help"
                onChange={(event) => setQuery(event.target.value)}
                placeholder={placeholder}
                ref={inputRef}
                type="search"
                value={query}
              />
              <button
                aria-label="Close search"
                className="docs-search-close"
                onClick={() => setIsOpen(false)}
                type="button"
              >
                <X aria-hidden="true" size={18} />
              </button>
            </div>
            <div className="docs-search-header">
              <h2 id="docs-search-title">{headerTitle}</h2>
              <p id="docs-search-help">{headerHelp}</p>
            </div>
            <div aria-live="polite" className="docs-search-results">
              {results.length > 0 ? (
                results.map((record) => (
                  <Link
                    className="docs-search-result"
                    href={record.path}
                    key={record.path}
                    onClick={() => setIsOpen(false)}
                  >
                    <span>{record.section}</span>
                    <strong>{record.title}</strong>
                    <small>{record.description}</small>
                  </Link>
                ))
              ) : (
                <div className="docs-search-empty">
                  <strong>No results found</strong>
                  <p>Try a provider, telemetry method, or integration family.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

export function DocsSidebarSearch() {
  return (
    <button
      className="docs-sidebar-search"
      onClick={() => dispatchDocsSearchOpen("search")}
      type="button"
    >
      <Search aria-hidden="true" size={14} />
      <span>Search sidebar...</span>
      <kbd>/</kbd>
    </button>
  );
}
