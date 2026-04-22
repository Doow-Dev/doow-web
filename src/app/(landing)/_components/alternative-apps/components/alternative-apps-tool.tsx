"use client";

import { useEffect, useRef, useState, useTransition } from "react";

import { fetchJson } from "@/lib/rest/fetch-json";
import { alternativeAppsResponseSchema, getAlternativeAppsApiUrl } from "@/lib/site/alternative-apps";

import type { AlternativeAppsResponse } from "../content";
import { AppSelectionPills } from "./app-selection-pills";
import { AlternativeAppsScroller } from "./alternative-app-scroller";
import { CurrentComparedAppPanel } from "./current-compared-app-panel";

export interface AlternativeAppsToolProps {
  initialData: AlternativeAppsResponse;
}

const comparisonPanelId = "alternative-apps-panel";

export function AlternativeAppsTool({ initialData }: AlternativeAppsToolProps) {
  const [data, setData] = useState(initialData);
  const [loadError, setLoadError] = useState("");
  const [isPending, startTransition] = useTransition();
  const pendingAppIdRef = useRef<string | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    return () => {
      abortControllerRef.current?.abort();
    };
  }, []);

  async function handleSelect(appId: string) {
    if (appId === data.selectedAppId || pendingAppIdRef.current === appId) {
      return;
    }

    abortControllerRef.current?.abort();

    const controller = new AbortController();
    abortControllerRef.current = controller;
    pendingAppIdRef.current = appId;
    setLoadError("");

    try {
      const nextData = await fetchJson<AlternativeAppsResponse>(getAlternativeAppsApiUrl(appId), {
        init: {
          cache: "no-store",
          signal: controller.signal,
        },
        schema: alternativeAppsResponseSchema,
      });

      startTransition(() => {
        setData(nextData);
      });
    } catch (error) {
      if (error instanceof Error && error.name === "AbortError") {
        return;
      }

      setLoadError("We could not update the comparison right now. Please try again.");
    } finally {
      if (pendingAppIdRef.current === appId) {
        pendingAppIdRef.current = null;
      }
    }
  }

  const selectedTabId = `alternative-apps-tab-${data.selectedAppId}`;

  return (
    <div className="alternative-apps__tool" data-alternative-apps-root="true">
      <AppSelectionPills
        onSelect={handleSelect}
        options={data.options}
        panelId={comparisonPanelId}
        selectedAppId={data.selectedAppId}
      />

      <div
        aria-busy={isPending}
        aria-labelledby={selectedTabId}
        className="alternative-apps-comparison"
        id={comparisonPanelId}
        role="tabpanel"
      >
        <CurrentComparedAppPanel currentApp={data.currentApp} />
        <AlternativeAppsScroller
          alternatives={data.alternatives}
          alternativesCount={data.alternativesCount}
          currentAppName={data.currentApp.name}
        />
      </div>

      <p aria-live="polite" className="sr-only" role="status">
        {loadError}
      </p>
    </div>
  );
}
