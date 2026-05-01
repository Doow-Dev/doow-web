import { Badge } from "@/components/system";

import type { CurrentComparedApp } from "../content";
import { AppLogoAvatar } from "./app-logo-avatar";
import { formatCurrencyUsd, formatRating, formatSeatCount } from "./formatters";

export interface CurrentComparedAppPanelProps {
  currentApp: CurrentComparedApp;
}

function StarMark() {
  return (
    <svg
      aria-hidden="true"
      className="alternative-apps-current__rating-star"
      fill="currentColor"
      viewBox="0 0 16 16"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M8 1.033l1.74 3.525 3.892.566-2.816 2.746.665 3.876L8 9.915l-3.48 1.831.665-3.876L2.37 5.124l3.892-.566L8 1.033z" />
    </svg>
  );
}

export function CurrentComparedAppPanel({ currentApp }: CurrentComparedAppPanelProps) {
  return (
    <div className="alternative-apps-current" data-alternative-apps-surface="current">
      <div className="alternative-apps-current__summary">
        <AppLogoAvatar logoKey={currentApp.logoKey} logoUrl={currentApp.logoUrl} name={currentApp.name} />

        <div className="alternative-apps-current__copy">
          <div className="alternative-apps-current__title-row">
            <h3 className="alternative-apps-current__name">{currentApp.name}</h3>
            <Badge variant="current">{currentApp.statusLabel}</Badge>
          </div>

          <div className="alternative-apps-current__meta">
            <span className="alternative-apps-current__pricing-model">{currentApp.pricingModelLabel}</span>

            <span className="alternative-apps-current__rating">
              <StarMark />
              {formatRating(currentApp.rating)}
            </span>
          </div>
        </div>
      </div>

      <dl className="alternative-apps-current__metrics">
        <div className="alternative-apps-current__metric alternative-apps-current__metric--annual">
          <dt className="alternative-apps-current__metric-label">Annual Spend</dt>
          <dd className="alternative-apps-current__metric-value">{formatCurrencyUsd(currentApp.annualSpendUsd)}</dd>
        </div>

        <div className="alternative-apps-current__metric">
          <dt className="alternative-apps-current__metric-label">Seats</dt>
          <dd className="alternative-apps-current__metric-value">{formatSeatCount(currentApp.seatCount)}</dd>
        </div>
      </dl>
    </div>
  );
}
