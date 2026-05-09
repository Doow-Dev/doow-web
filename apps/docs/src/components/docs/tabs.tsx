"use client";

import { Children, useId, useMemo, useRef, useState, useSyncExternalStore } from "react";
import type { KeyboardEvent, ReactNode } from "react";

const STORAGE_PREFIX = "docs-tabs:";

function parseLabels(items?: string[] | string): string[] {
  if (Array.isArray(items)) return items;
  if (typeof items === "string") {
    return items
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
  }
  return [];
}

function subscribeStorage(callback: () => void) {
  if (typeof window === "undefined") return () => {};
  window.addEventListener("storage", callback);
  return () => window.removeEventListener("storage", callback);
}

function readStoredLabel(storageKey: string): string | null {
  if (typeof window === "undefined") return null;
  try {
    return window.localStorage.getItem(storageKey);
  } catch {
    return null;
  }
}

export function Tabs({
  children,
  id,
  items,
}: {
  children?: ReactNode;
  id?: string;
  items?: string[] | string;
}) {
  const labels = useMemo(() => parseLabels(items), [items]);
  const panels = useMemo(() => Children.toArray(children), [children]);
  const fallbackId = useId();
  const groupId = id ?? fallbackId;
  const storageKey = `${STORAGE_PREFIX}${groupId}`;

  const storedLabel = useSyncExternalStore(
    subscribeStorage,
    () => readStoredLabel(storageKey),
    () => null,
  );
  const storedIndex = storedLabel ? labels.findIndex((label) => label === storedLabel) : -1;

  const [override, setOverride] = useState<number | null>(null);
  const active = override ?? (storedIndex >= 0 ? storedIndex : 0);

  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

  function activate(idx: number) {
    setOverride(idx);
    try {
      window.localStorage.setItem(storageKey, labels[idx] ?? String(idx));
    } catch {}
  }

  function onKeyDown(event: KeyboardEvent<HTMLButtonElement>, idx: number) {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
    event.preventDefault();
    const dir = event.key === "ArrowRight" ? 1 : -1;
    const next = (idx + dir + labels.length) % labels.length;
    activate(next);
    tabRefs.current[next]?.focus();
  }

  if (labels.length === 0) {
    return <div className="docs-tabs"><div className="docs-tabs__panel">{children}</div></div>;
  }

  const activePanel = panels[active] ?? panels[0] ?? null;

  return (
    <div className="docs-tabs">
      <div className="docs-tabs__list" role="tablist">
        {labels.map((label, idx) => (
          <button
            aria-controls={`${groupId}-panel-${idx}`}
            aria-selected={idx === active}
            className="docs-tabs__tab"
            id={`${groupId}-tab-${idx}`}
            key={label}
            onClick={() => activate(idx)}
            onKeyDown={(event) => onKeyDown(event, idx)}
            ref={(el) => {
              tabRefs.current[idx] = el;
            }}
            role="tab"
            tabIndex={idx === active ? 0 : -1}
            type="button"
          >
            {label}
          </button>
        ))}
      </div>
      <div
        aria-labelledby={`${groupId}-tab-${active}`}
        className="docs-tabs__panel"
        id={`${groupId}-panel-${active}`}
        role="tabpanel"
      >
        {activePanel}
      </div>
    </div>
  );
}
