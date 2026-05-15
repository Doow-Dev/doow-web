import { AlertCircle, RefreshCw } from "lucide-react";

import { cn } from "@/lib/utils";

export interface QueryErrorMessageProps {
  actionLabel?: string;
  className?: string;
  message: string;
  onRetry?: () => void;
  title?: string;
}

export function QueryErrorMessage({
  actionLabel = "Try again",
  className,
  message,
  onRetry,
  title = "Could not load this data",
}: QueryErrorMessageProps) {
  return (
    <div className={cn("query-error-message", className)} role="alert">
      <span aria-hidden="true" className="query-error-message__icon">
        <AlertCircle className="query-error-message__icon-svg" strokeWidth={1.9} />
      </span>

      <div className="query-error-message__copy">
        <p className="query-error-message__title">{title}</p>
        <p className="query-error-message__description">{message}</p>
      </div>

      {onRetry ? (
        <button className="query-error-message__action" onClick={onRetry} type="button">
          <RefreshCw aria-hidden="true" className="query-error-message__action-icon" strokeWidth={1.9} />
          <span>{actionLabel}</span>
        </button>
      ) : null}
    </div>
  );
}
