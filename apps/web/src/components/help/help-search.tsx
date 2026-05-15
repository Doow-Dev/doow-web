"use client";

import { Search, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";

import type { HelpSearchRecord } from "@/lib/help/search";

export const HELP_SEARCH_OPEN_EVENT = "help:open-search";

export function dispatchHelpSearchOpen() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(HELP_SEARCH_OPEN_EVENT));
}

const noopSubscribe = () => () => {};
const getShortcut = () => {
  const ua = typeof navigator !== "undefined" ? navigator.userAgent.toLowerCase() : "";
  return /mac|iphone|ipad|ipod/.test(ua) ? "⌘ K" : "Ctrl K";
};
const getShortcutServer = () => "Ctrl K";

export function HelpSearch() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [records, setRecords] = useState<HelpSearchRecord[]>([]);
  const shortcut = useSyncExternalStore(noopSubscribe, getShortcut, getShortcutServer);
  const inputRef = useRef<HTMLInputElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    fetch("/help/search.json")
      .then((r) => (r.ok ? r.json() : []))
      .then((data: HelpSearchRecord[]) => setRecords(data))
      .catch(() => setRecords([]));
  }, []);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsOpen(true);
      }
      const target = e.target as HTMLElement | null;
      const isTyping =
        target?.tagName === "INPUT" ||
        target?.tagName === "TEXTAREA" ||
        target?.isContentEditable;
      if (!isTyping && e.key === "/") {
        e.preventDefault();
        setIsOpen(true);
      }
      if (e.key === "Escape") setIsOpen(false);
    }

    function onOpen() {
      setIsOpen(true);
    }

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener(HELP_SEARCH_OPEN_EVENT, onOpen);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener(HELP_SEARCH_OPEN_EVENT, onOpen);
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
    const q = query.trim().toLowerCase();
    if (!q) return records;
    return records.filter((r) =>
      [r.title, r.description, r.category].join(" ").toLowerCase().includes(q),
    );
  }, [query, records]);

  return (
    <>
      <button
        aria-haspopup="dialog"
        className="help-search-trigger"
        onClick={() => setIsOpen(true)}
        ref={triggerRef}
        type="button"
      >
        <Search aria-hidden="true" size={16} />
        <span>Search help articles...</span>
        <kbd>{shortcut}</kbd>
      </button>
      {isOpen
        ? createPortal(
            <div
              aria-labelledby="help-search-title"
              aria-modal="true"
              className="help-search-modal"
              role="dialog"
            >
              <button
                aria-label="Close search"
                className="help-search-backdrop"
                onClick={() => setIsOpen(false)}
                type="button"
              />
              <div className="help-search-panel">
                <div className="help-search-field">
                  <Search aria-hidden="true" size={18} />
                  <input
                    aria-describedby="help-search-help"
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search help articles..."
                    ref={inputRef}
                    type="search"
                    value={query}
                  />
                  <button
                    aria-label="Close search"
                    className="help-search-close"
                    onClick={() => setIsOpen(false)}
                    type="button"
                  >
                    <X aria-hidden="true" size={18} />
                  </button>
                </div>
                <div className="help-search-header">
                  <h2 id="help-search-title">Search Help Center</h2>
                  <p id="help-search-help">Press Enter to open a result, Escape to close.</p>
                </div>
                <div aria-live="polite" className="help-search-results">
                  {results.length > 0 ? (
                    results.map((r) => (
                      <Link
                        className="help-search-result"
                        href={r.path}
                        key={r.path}
                        onClick={() => setIsOpen(false)}
                      >
                        <span>{r.category.replace(/-/g, " ")}</span>
                        <strong>{r.title}</strong>
                        <small>{r.description}</small>
                      </Link>
                    ))
                  ) : (
                    <div className="help-search-empty">
                      <strong>No results found</strong>
                      <p>Try different keywords or browse by category.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>,
            document.body,
          )
        : null}
    </>
  );
}

export function HelpSidebarSearch() {
  return (
    <button
      className="help-sidebar-search"
      onClick={() => dispatchHelpSearchOpen()}
      type="button"
    >
      <Search aria-hidden="true" size={14} />
      <span>Search...</span>
      <kbd>/</kbd>
    </button>
  );
}
