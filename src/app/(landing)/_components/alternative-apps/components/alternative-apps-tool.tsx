"use client";

import { useEffect, useRef, useState, useTransition } from "react";

import { Skeleton } from "@/components/ui/skeleton";
import { fetchJson } from "@/lib/rest/fetch-json";
import {
  alternativeAppsResponseSchema,
  getAlternativeAppsApiUrl,
  getDefaultAlternativeAppsApiUrl,
} from "@/lib/site/alternative-apps";

import type { AlternativeAppsResponse } from "../content";
import { AppSelectionPills } from "./app-selection-pills";
import { AlternativeAppsScroller } from "./alternative-app-scroller";
import { CurrentComparedAppPanel } from "./current-compared-app-panel";

export interface AlternativeAppsToolProps {
  initialData: AlternativeAppsResponse | null;
}

const comparisonPanelId = "alternative-apps-panel";

function AppSelectionPillsSkeleton() {
  return (
    <div aria-hidden="true" className="alternative-apps__pill-strip">
      <div className="alternative-apps__tablist" data-loading="true">
        {Array.from({ length: 5 }, (_, index) => (
          <span className="alternative-apps__tab alternative-apps__tab--skeleton" key={index}>
            <Skeleton className="alternative-apps-logo alternative-apps-logo--pill" />
            <Skeleton className="alternative-apps__tab-label-skeleton" />
          </span>
        ))}
      </div>
    </div>
  );
}

function AlternativeAppsComparisonSkeleton() {
  return (
    <div
      aria-hidden="true"
      className="alternative-apps-comparison alternative-apps-comparison--skeleton"
      id={comparisonPanelId}
    >
      <div className="alternative-apps-current">
        <div className="alternative-apps-current__summary">
          <Skeleton className="alternative-apps-logo alternative-apps-logo--panel" />

          <div className="alternative-apps-current__copy">
            <Skeleton className="alternative-apps-current__name-skeleton" />
            <Skeleton className="alternative-apps-current__meta-skeleton" />
          </div>
        </div>

        <div className="alternative-apps-current__metrics">
          {Array.from({ length: 2 }, (_, index) => (
            <div
              className={
                index === 0
                  ? "alternative-apps-current__metric alternative-apps-current__metric--annual"
                  : "alternative-apps-current__metric"
              }
              key={index}
            >
              <Skeleton className="alternative-apps-current__metric-label-skeleton" />
              <Skeleton className="alternative-apps-current__metric-value-skeleton" />
            </div>
          ))}
        </div>
      </div>

      <div className="alternative-apps-scroller">
        <div className="alternative-apps-scroller__intro">
          <Skeleton className="alternative-apps-scroller__title-skeleton" />
          <Skeleton className="alternative-apps-scroller__description-skeleton" />
        </div>

        <div className="alternative-apps-scroller__viewport">
          <ol className="alternative-apps-scroller__list">
            {Array.from({ length: 3 }, (_, index) => (
              <li className="alternative-apps-card alternative-apps-card--skeleton" key={index}>
                <div className="alternative-apps-card__header">
                  <Skeleton className="alternative-apps-logo alternative-apps-logo--panel" />
                  <div className="alternative-apps-card__copy">
                    <Skeleton className="alternative-apps-card__name-skeleton" />
                    <Skeleton className="alternative-apps-card__pricing-skeleton" />
                  </div>
                </div>
                <div aria-hidden="true" className="alternative-apps-card__divider" />
                <Skeleton className="alternative-apps-card__metrics-skeleton" />
                <div aria-hidden="true" className="alternative-apps-card__divider" />
                <Skeleton className="alternative-apps-card__insight-skeleton" />
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}

export function AlternativeAppsTool({ initialData }: AlternativeAppsToolProps) {
  const [data, setData] = useState(initialData);
  const [loadError, setLoadError] = useState("");
  const [isInitialLoading, setIsInitialLoading] = useState(!initialData);
  const [loadingAppId, setLoadingAppId] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const pendingAppIdRef = useRef<string | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);
  const responseCacheRef = useRef(
    new Map<string, AlternativeAppsResponse>(initialData ? [[initialData.selectedAppId, initialData]] : []),
  );

  useEffect(() => {
    return () => {
      abortControllerRef.current?.abort();
    };
  }, []);

  useEffect(() => {
    if (initialData) {
      return;
    }

    const controller = new AbortController();
    let isMounted = true;

    abortControllerRef.current = controller;
    setIsInitialLoading(true);
    setLoadError("");

    async function loadInitialData() {
      try {
        const nextData = await fetchJson<AlternativeAppsResponse>(getDefaultAlternativeAppsApiUrl(), {
          init: {
            signal: controller.signal,
          },
          schema: alternativeAppsResponseSchema,
        });

        responseCacheRef.current.set(nextData.selectedAppId, nextData);
        if (isMounted) {
          setData(nextData);
        }
      } catch (error) {
        if (error instanceof Error && error.name === "AbortError") {
          return;
        }

        if (isMounted) {
          setLoadError("We could not load the comparison right now. Please try again later.");
        }
      } finally {
        if (isMounted) {
          setIsInitialLoading(false);
        }
      }
    }

    void loadInitialData();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [initialData]);

  async function handleSelect(appId: string) {
    if (appId === data?.selectedAppId || pendingAppIdRef.current === appId) {
      return;
    }

    abortControllerRef.current?.abort();

    const cachedData = responseCacheRef.current.get(appId);

    if (cachedData) {
      setLoadError("");
      startTransition(() => {
        setData(cachedData);
      });
      return;
    }

    const controller = new AbortController();
    abortControllerRef.current = controller;
    pendingAppIdRef.current = appId;
    setLoadingAppId(appId);
    setLoadError("");

    try {
      const nextData = await fetchJson<AlternativeAppsResponse>(getAlternativeAppsApiUrl(appId), {
        init: {
          signal: controller.signal,
        },
        schema: alternativeAppsResponseSchema,
      });

      responseCacheRef.current.set(appId, nextData);
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
        setLoadingAppId(null);
      }
    }
  }

  const isLoadingComparison = Boolean(loadingAppId) || isPending;
  const selectedAppId = loadingAppId ?? data?.selectedAppId ?? "";
  const selectedTabId = selectedAppId ? `alternative-apps-tab-${selectedAppId}` : undefined;

  return (
    <div className="alternative-apps__tool" data-alternative-apps-root="true">
      {data ? (
        <AppSelectionPills
          onSelect={handleSelect}
          options={data.options}
          panelId={comparisonPanelId}
          selectedAppId={selectedAppId}
        />
      ) : (
        <AppSelectionPillsSkeleton />
      )}

      {data && !isLoadingComparison ? (
        <div
          aria-busy={false}
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
      ) : (
        <AlternativeAppsComparisonSkeleton />
      )}

      {loadError ? <p className="alternative-apps__error">{loadError}</p> : null}

      <p aria-live="polite" className="sr-only" role="status">
        {loadError || (isInitialLoading || isLoadingComparison ? "Loading alternative application comparison." : "")}
      </p>
    </div>
  );
}
