"use client";

import { QueryErrorMessage } from "@/components/layout/shared";

export function AlternativeAppDetailsEmptyState() {
  return (
    <QueryErrorMessage
      actionLabel="Retry"
      message="Could not load this app's alternatives. Please try again."
      onRetry={() => window.location.reload()}
      title="Alternatives unavailable"
    />
  );
}
