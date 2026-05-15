"use client";

import { Children, useId, useMemo, useState, useSyncExternalStore } from "react";
import type { ReactNode } from "react";
import {
  Tabs as TabsRoot,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@doow/ui/ui/tabs";

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

  function activate(idx: number) {
    setOverride(idx);
    try {
      window.localStorage.setItem(storageKey, labels[idx] ?? String(idx));
    } catch {}
  }

  if (labels.length === 0) {
    return (
      <TabsRoot className="docs-tabs" defaultValue="content">
        <TabsContent className="docs-tabs__panel" value="content">
          {children}
        </TabsContent>
      </TabsRoot>
    );
  }

  const activeValue = String(active);

  return (
    <TabsRoot className="docs-tabs" onValueChange={(value) => activate(Number(value))} value={activeValue}>
      <TabsList className="docs-tabs__list">
        {labels.map((label, idx) => (
          <TabsTrigger
            className="docs-tabs__tab"
            id={`${groupId}-tab-${idx}`}
            key={label}
            value={String(idx)}
          >
            {label}
          </TabsTrigger>
        ))}
      </TabsList>
      {panels.map((panel, idx) => (
        <TabsContent
          aria-labelledby={`${groupId}-tab-${idx}`}
          className="docs-tabs__panel"
          id={`${groupId}-panel-${idx}`}
          key={idx}
          value={String(idx)}
        >
          {panel}
        </TabsContent>
      ))}
    </TabsRoot>
  );
}
