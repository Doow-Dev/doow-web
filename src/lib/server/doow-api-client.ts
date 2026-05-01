import "server-only";

import { z } from "zod";

import { fetchJson } from "@/lib/rest/fetch-json";

const defaultDoowApiBaseUrl = "https://dev-api.doow.co";

type DoowApiSecret = "catalogAdminKey" | "adminSecret";

type DoowApiParamValue = boolean | number | string | null | undefined;

interface FetchDoowApiOptions<TData> {
  cache?: RequestCache;
  next?: NextFetchRequestConfig;
  params?: Record<string, DoowApiParamValue>;
  path: string;
  schema?: z.ZodType<TData>;
  secret?: DoowApiSecret;
  timeoutMs?: number;
}

function getDoowApiBaseUrl() {
  return (process.env.DOOW_API_BASE_URL ?? process.env.ALTERNATIVE_APPS_API_BASE_URL ?? defaultDoowApiBaseUrl).replace(
    /\/+$/,
    "",
  );
}

function getSecretHeader(secret: DoowApiSecret) {
  if (secret === "adminSecret") {
    const value = process.env.X_ADMIN_SECRET;

    if (!value) {
      throw new Error("X_ADMIN_SECRET is required for this Doow API request.");
    }

    return {
      name: "x-admin-secret",
      value,
    };
  }

  const value = process.env.CATALOG_ADMIN_KEY;

  if (!value) {
    throw new Error("CATALOG_ADMIN_KEY is required for catalog API requests.");
  }

  return {
    name: "x-admin-key",
    value,
  };
}

export function getDoowApiUrl(path: string, params: Record<string, DoowApiParamValue> = {}) {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  const url = new URL(`${getDoowApiBaseUrl()}${normalizedPath}`);

  Object.entries(params).forEach(([key, value]) => {
    if (value === null || typeof value === "undefined" || value === "") {
      return;
    }

    url.searchParams.set(key, String(value));
  });

  return url;
}

export async function fetchDoowApi<TData>({
  cache = "force-cache",
  next = { revalidate: 300 },
  params,
  path,
  schema,
  secret = "catalogAdminKey",
  timeoutMs = 10_000,
}: FetchDoowApiOptions<TData>) {
  const secretHeader = getSecretHeader(secret);

  return fetchJson<TData>(getDoowApiUrl(path, params), {
    init: {
      cache,
      headers: {
        [secretHeader.name]: secretHeader.value,
      },
      next,
    },
    schema,
    timeoutMs,
  });
}
