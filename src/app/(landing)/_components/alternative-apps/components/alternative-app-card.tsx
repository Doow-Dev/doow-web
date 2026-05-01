import { Badge } from "@/components/system";
import { BulbIcon } from "@/components/custom/icons/bulb-icon";

import type { AlternativeRecommendation } from "../content";
import { AppLogoAvatar } from "./app-logo-avatar";
import { formatAnnualUsd, formatMonthlyUsd, formatSeatCount } from "./formatters";

export interface AlternativeAppCardProps {
  alternative: AlternativeRecommendation;
}

function ChevronDownMark() {
  return (
    <svg
      aria-hidden="true"
      className="alternative-apps-card__chevron"
      fill="none"
      viewBox="0 0 10 6"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M1 1L5 5L9 1" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.25" />
    </svg>
  );
}

export function AlternativeAppCard({ alternative }: AlternativeAppCardProps) {
  return (
    <li className="alternative-apps-card">
      <div className="alternative-apps-card__header">
        <AppLogoAvatar logoKey={alternative.logoKey} logoUrl={alternative.logoUrl} name={alternative.name} />

        <div className="alternative-apps-card__copy">
          <div className="alternative-apps-card__title-row">
            <h4 className="alternative-apps-card__name">{alternative.name}</h4>
            {alternative.badgeLabel ? <Badge variant="bestFit">{alternative.badgeLabel}</Badge> : null}
          </div>

          <div className="alternative-apps-card__pricing-row">
            <span className="alternative-apps-card__pricing-model">{alternative.pricingModelLabel}</span>
            <span
              aria-hidden="true"
              className="alternative-apps-card__separator alternative-apps-card__separator--pricing"
            >
              &bull;
            </span>
            <span className="alternative-apps-card__pricing-plan-row">
              <span className="alternative-apps-card__pricing-plan">{alternative.planLabel}</span>
              <ChevronDownMark />
            </span>
          </div>
        </div>
      </div>

      <div aria-hidden="true" className="alternative-apps-card__divider" />

      <div className="alternative-apps-card__metrics">
        <div className="alternative-apps-card__metric-primary">
          <span className="alternative-apps-card__metric-label">Avg. switch cost</span>
          <strong
            className="alternative-apps-card__metric-value"
            data-tone={alternative.averageSwitchCostTone}
          >
            {formatAnnualUsd(alternative.averageSwitchCostUsd)}
          </strong>
        </div>

        <div className="alternative-apps-card__metric-inline">
          <span className="alternative-apps-card__metric-meta">{formatSeatCount(alternative.seatCount)}</span>
          <span
            aria-hidden="true"
            className="alternative-apps-card__separator alternative-apps-card__separator--metric"
          >
            &bull;
          </span>
          <span className="alternative-apps-card__metric-meta alternative-apps-card__metric-meta--monthly">
            {formatMonthlyUsd(alternative.monthlySpendUsd)}
          </span>
          <ChevronDownMark />
        </div>
      </div>

      <div aria-hidden="true" className="alternative-apps-card__divider" />

      <div className="alternative-apps-card__insight">
        <BulbIcon className="alternative-apps-card__insight-icon" />

        <p className="alternative-apps-card__insight-copy">
          {alternative.insight.map((segment, index) => (
            <span
              className="alternative-apps-card__insight-segment"
              data-tone={segment.tone ?? "default"}
              key={`${alternative.id}-segment-${index}`}
            >
              {segment.text}
            </span>
          ))}
        </p>
      </div>
    </li>
  );
}
