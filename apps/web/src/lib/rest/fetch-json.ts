import { z } from "zod";

export class FetchJsonError extends Error {
  readonly status: number;

  readonly statusText: string;

  readonly body: unknown;

  constructor(message: string, options: { status: number; statusText: string; body?: unknown }) {
    super(message);
    this.name = "FetchJsonError";
    this.status = options.status;
    this.statusText = options.statusText;
    this.body = options.body;
  }
}

interface FetchJsonOptions<TData> {
  init?: RequestInit;
  schema?: z.ZodType<TData>;
  timeoutMs?: number;
}

function mergeAbortSignals(signal: AbortSignal | null | undefined, timeoutMs: number | undefined) {
  if (!signal && !timeoutMs) {
    return {
      cleanup() {},
      signal: undefined,
    };
  }

  const controller = new AbortController();
  const externalSignal = signal ?? null;
  const timeoutId =
    typeof timeoutMs === "number"
      ? setTimeout(() => {
          controller.abort(new Error("Request timed out."));
        }, timeoutMs)
      : undefined;

  const onAbort = () => {
    controller.abort(externalSignal?.reason);
  };

  externalSignal?.addEventListener("abort", onAbort);

  return {
    cleanup() {
      if (typeof timeoutId === "number") {
        clearTimeout(timeoutId);
      }

      externalSignal?.removeEventListener("abort", onAbort);
    },
    signal: controller.signal,
  };
}

export async function fetchJson<TData>(
  input: RequestInfo | URL,
  { init, schema, timeoutMs = 10_000 }: FetchJsonOptions<TData> = {}
) {
  const { cleanup, signal } = mergeAbortSignals(init?.signal, timeoutMs);

  try {
    const response = await fetch(input, {
      ...init,
      headers: {
        Accept: "application/json",
        ...init?.headers,
      },
      signal,
    });

    let body: unknown;

    try {
      body = await response.json();
    } catch (error) {
      if (!response.ok) {
        throw new FetchJsonError("The request failed before a valid JSON response was returned.", {
          body: error,
          status: response.status,
          statusText: response.statusText,
        });
      }

      throw error;
    }

    if (!response.ok) {
      throw new FetchJsonError("The request returned an error response.", {
        body,
        status: response.status,
        statusText: response.statusText,
      });
    }

    if (!schema) {
      return body as TData;
    }

    return schema.parse(body);
  } finally {
    cleanup();
  }
}
