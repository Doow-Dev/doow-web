"use client";

import { createElement, useCallback, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  AlertTriangle,
  ArrowLeft,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  CircleHelp,
  Star,
} from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { BulbIcon, MenuIcon } from "@/components/custom/icons";
import {
  getIntegrationAppGraphic,
  type IntegrationAppGraphicSource,
} from "@/components/custom/icons/integration-app-icon-registry";
import { ScrollThumbRail, useScrollThumb } from "@/components/layout/shared";
import { Badge, Container } from "@/components/system";
import type {
  AlternativeAppDetailAlternative,
  AlternativeAppDetailComparisonCell,
  AlternativeAppDetailComparisonRow,
  AlternativeAppDetailComparisonSection,
  AlternativeAppDetailResponse,
} from "@/lib/site/alternative-app-details";
import { cn } from "@/lib/utils";

export interface AlternativeAppDetailsSectionProps {
  details: AlternativeAppDetailResponse;
}

type CostPeriod = "annual" | "quarterly" | "monthly";

const maxComparedAlternatives = 2;
const comparisonMotionTransition = {
  duration: 0.34,
  ease: [0.22, 1, 0.36, 1],
} as const;
const periodLabels: Record<CostPeriod, string> = {
  annual: "Annual",
  quarterly: "Quarterly",
  monthly: "Monthly",
};

const costPeriodRowLabels: Record<CostPeriod, string> = {
  annual: "Annual cost",
  quarterly: "Quarterly cost",
  monthly: "Monthly cost",
};

const comparisonThresholdDescriptions: Record<string, string> = {
  "annual-cost": "Total subscription cost for each app, shown for the selected billing period.",
  "year-net-saving": "Estimated savings over three years after migration and setup costs.",
  "team-fit-score": "How closely the app matches the teams, workflows, and usage patterns currently in place.",
  "adoption-risk": "Expected friction, training effort, and behavior change needed to move teams onto the alternative.",
  "user-satisfaction": "Available rating and review signal for team sentiment around the app.",
  "timeline-disruption": "Expected migration duration and disruption to normal workflows.",
  "setup-training": "One-time implementation, enablement, and training investment required.",
  "integration-coverage": "How much of the current integration and workflow surface is covered by the app.",
  "feature-match": "How closely the app matches current feature needs, including notable gaps or risks.",
  certifications: "Security, privacy, and compliance certifications available for each app.",
  "choose-this-if": "The conditions where keeping or switching to this app is likely to make sense.",
  "avoid-this-if": "The conditions where this app is likely to create cost, workflow, or adoption risk.",
};

function passthroughImageLoader({ src }: { src: string }) {
  return src;
}

function formatCurrencyUsd(value: number) {
  return new Intl.NumberFormat("en-US", {
    currency: "USD",
    maximumFractionDigits: 0,
    style: "currency",
  }).format(value);
}

function formatPublicCurrencyUsd(value: number) {
  return value > 0 ? formatCurrencyUsd(value) : "--";
}

function formatPublicCurrencyPeriod(value: number, period: "month" | "yr") {
  return value > 0 ? `${formatCurrencyUsd(value)}/${period}` : "Not available";
}

function formatSeatCount(value: number) {
  return `${value} ${value === 1 ? "seat" : "seats"}`;
}

function getInitials(name: string) {
  const words = name.trim().split(/\s+/).filter(Boolean);

  if (!words.length) {
    return "?";
  }

  if (words.length === 1) {
    return words[0].slice(0, 2).toUpperCase();
  }

  return `${words[0]?.[0] ?? ""}${words[1]?.[0] ?? ""}`.toUpperCase();
}

function AppGraphic({
  className,
  graphic,
  imageClassName,
  logoUrl,
  name,
}: {
  className?: string;
  graphic: IntegrationAppGraphicSource | null;
  imageClassName?: string;
  logoUrl?: string;
  name: string;
}) {
  if (logoUrl) {
    return (
      <Image
        alt=""
        aria-hidden="true"
        className={imageClassName ?? className}
        height={54}
        loader={passthroughImageLoader}
        src={logoUrl}
        unoptimized
        width={54}
      />
    );
  }

  if (graphic?.kind === "component") {
    return createElement(graphic.component, {
      "aria-hidden": true,
      className,
      focusable: "false",
    });
  }

  if (graphic?.kind === "asset") {
    return <Image alt="" aria-hidden="true" className={imageClassName ?? className} height={54} src={graphic.src} width={54} />;
  }

  return (
    <span aria-hidden="true" className="alternative-app-details-logo__fallback">
      {getInitials(name)}
    </span>
  );
}

function AppLogo({
  className,
  logoClassName,
  name,
  hints,
  logoUrl,
}: {
  className?: string;
  hints: readonly string[];
  logoClassName?: string;
  logoUrl?: string;
  name: string;
}) {
  const graphic = getIntegrationAppGraphic(...hints, name);

  return (
    <span aria-label={`${name} logo`} className={cn("alternative-app-details-logo", className)} role="img">
      <AppGraphic
        className={cn("alternative-app-details-logo__svg", logoClassName)}
        graphic={graphic}
        imageClassName={cn("alternative-app-details-logo__image", logoClassName)}
        logoUrl={logoUrl}
        name={name}
      />
    </span>
  );
}

function CurrentAppLogo({ hints, logoUrl, name }: { hints: readonly string[]; logoUrl?: string; name: string }) {
  if (name.trim().toLowerCase() === "linear") {
    return (
      <span aria-label={`${name} logo`} className="alternative-app-details-logo alternative-app-details-logo--current" role="img">
        <span aria-hidden="true" className="alternative-app-details-current-card__linear-mark">
          <span />
          <span />
          <span />
          <span />
        </span>
      </span>
    );
  }

  return <AppLogo className="alternative-app-details-logo--current" hints={hints} logoUrl={logoUrl} name={name} />;
}

function RatingStars({ rating }: { rating: number }) {
  const rounded = Math.round(rating);

  return (
    <span aria-label={`${rating} out of 5 rating`} className="alternative-app-details-rating" role="img">
      {Array.from({ length: 5 }, (_, index) => (
        <Star
          aria-hidden="true"
          className="alternative-app-details-rating__star"
          data-filled={index < rounded ? "true" : "false"}
          fill="currentColor"
          key={index}
          strokeWidth={1.6}
        />
      ))}
    </span>
  );
}

function DetailMeta({ items }: { items: readonly string[] }) {
  return (
    <span className="alternative-app-details-meta">
      {items.map((item) => (
        <span className="alternative-app-details-meta__item" key={item}>
          {item}
        </span>
      ))}
    </span>
  );
}

function RecommendationCopy({
  alternative,
  currentAppName,
  currentAnnualSpendUsd,
  compact = false,
}: {
  alternative: AlternativeAppDetailAlternative;
  compact?: boolean;
  currentAnnualSpendUsd: number;
  currentAppName: string;
}) {
  const annualSavings = currentAnnualSpendUsd - alternative.averageSwitchCostUsd;
  const hasComparablePricing = currentAnnualSpendUsd > 0 && alternative.averageSwitchCostUsd > 0;
  const isSaving = annualSavings >= 0;

  if (!hasComparablePricing) {
    return (
      <>
        {alternative.name} has public catalog signals you can compare against {currentAppName} for pricing, fit, migration,
        integrations, and security.
      </>
    );
  }

  return (
    <>
      {alternative.name} is listed at an estimated{" "}
      <strong>{formatCurrencyUsd(alternative.averageSwitchCostUsd)}/year</strong>
      {compact ? ". " : ", "}
      which is{" "}
      <strong data-tone={isSaving ? "dark" : "danger"}>
        {formatCurrencyUsd(Math.abs(annualSavings))} {isSaving ? "less" : "more"}
      </strong>{" "}
      than {currentAppName}&apos;s public pricing baseline.
    </>
  );
}

function CurrentAppCard({ details, selectedAlternative }: { details: AlternativeAppDetailResponse; selectedAlternative: AlternativeAppDetailAlternative }) {
  const { app, currentAppMetrics } = details;
  const primaryTier = currentAppMetrics.subscriptionTiers[0];
  const hasAnnualCost = currentAppMetrics.annualSpendUsd > 0;
  const annualCostMeta = hasAnnualCost
    ? [
        formatSeatCount(currentAppMetrics.seatCount),
        currentAppMetrics.monthlyPriceUsd > 0 ? `${formatCurrencyUsd(currentAppMetrics.monthlyPriceUsd)}/month` : undefined,
      ]
        .filter(Boolean)
        .join(" / ")
    : "";
  const seatsAssignedValue = hasAnnualCost ? `${formatCurrencyUsd(currentAppMetrics.annualSpendUsd)}/yr` : "--";

  return (
    <article className="alternative-app-details-current-card">
      <div className="alternative-app-details-current-card__main">
        <div className="alternative-app-details-current-card__header">
          <div className="alternative-app-details-current-card__identity">
            <CurrentAppLogo hints={app.logoHints} logoUrl={app.logoUrl} name={app.name} />
            <div className="alternative-app-details-current-card__copy">
              <div className="alternative-app-details-current-card__title-row">
                <h3 className="alternative-app-details-current-card__title">{app.name}</h3>
                <Badge className="alternative-app-details-current-card__badge" variant="current">
                  Current
                </Badge>
              </div>
              <span className="alternative-app-details-meta">
                <span className="alternative-app-details-meta__item">{app.pricingModelLabel}</span>
                <span className="alternative-app-details-meta__item alternative-app-details-current-card__plan-label">
                  {primaryTier?.label ?? app.planLabel} ({app.priceLabel})
                  <ChevronDown aria-hidden="true" className="alternative-app-details-current-card__plan-icon" />
                </span>
              </span>
            </div>
          </div>

          <div className="alternative-app-details-current-card__rating">
            <span className="alternative-app-details-current-card__rating-value">{app.rating}/5</span>
            <RatingStars rating={app.rating} />
          </div>
        </div>

        <dl className="alternative-app-details-current-card__metrics">
          <div>
            <dt>Annual cost</dt>
            <dd>{formatPublicCurrencyUsd(currentAppMetrics.annualSpendUsd)}</dd>
            {annualCostMeta ? (
              <span className="alternative-app-details-current-card__metric-meta">{annualCostMeta}</span>
            ) : null}
          </div>
          <div data-tone="positive">
            <dt>Seats assigned</dt>
            <dd>{seatsAssignedValue}</dd>
            {hasAnnualCost ? (
              <span
                aria-label={`Average of ${formatSeatCount(currentAppMetrics.seatCount)}`}
                className="alternative-app-details-current-card__avatar"
                role="img"
              >
                <Image
                  alt=""
                  aria-hidden="true"
                  className="alternative-app-details-current-card__avatar-image"
                  height={32}
                  src="/assets/icons/user4.svg"
                  width={32}
                />
              </span>
            ) : null}
          </div>
        </dl>
      </div>

      <p className="alternative-app-details-current-card__insight">
        <BulbIcon aria-hidden="true" className="alternative-app-details-current-card__insight-icon" />
        <span className="alternative-app-details-current-card__insight-text">
          <RecommendationCopy
            alternative={selectedAlternative}
            currentAnnualSpendUsd={currentAppMetrics.annualSpendUsd}
            currentAppName={app.name}
          />{" "}
          This view uses public catalog pricing and market signals, not organization usage data.
        </span>
      </p>
    </article>
  );
}

function AlternativeAppSelectionDropdown({
  alternatives,
  selectedSlugs,
  onSelectionChange,
}: {
  alternatives: readonly AlternativeAppDetailAlternative[];
  onSelectionChange: (selectedSlugs: string[]) => void;
  selectedSlugs: readonly string[];
}) {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    function handleDocumentClick(event: MouseEvent) {
      if (!dropdownRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    function handleScroll() {
      setIsOpen(false);
    }

    document.addEventListener("mousedown", handleDocumentClick);
    document.addEventListener("keydown", handleKeyDown);
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      document.removeEventListener("mousedown", handleDocumentClick);
      document.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isOpen]);

  function toggleAlternative(slug: string) {
    const isSelected = selectedSlugs.includes(slug);

    if (isSelected) {
      if (selectedSlugs.length <= 1) {
        return;
      }

      onSelectionChange(selectedSlugs.filter((selectedSlug) => selectedSlug !== slug));
      setIsOpen(false);
      return;
    }

    const nextSelection =
      selectedSlugs.length >= maxComparedAlternatives ? [...selectedSlugs.slice(1), slug] : [...selectedSlugs, slug];

    onSelectionChange(nextSelection);
    setIsOpen(false);
  }

  return (
    <div className="alternative-app-details-selection" ref={dropdownRef}>
      <button
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        className="alternative-app-details-selection__trigger"
        onClick={() => setIsOpen((open) => !open)}
        type="button"
      >
         <MenuIcon aria-hidden="true" />
        <span>
          Showing {selectedSlugs.length} of {alternatives.length}
        </span>
        <ChevronDown aria-hidden="true" />
      </button>

      {isOpen ? (
        <div className="alternative-app-details-selection__menu" role="listbox" aria-label="Select apps to compare">
          {alternatives.map((alternative) => {
            const isSelected = selectedSlugs.includes(alternative.slug);
            const isLocked = isSelected && selectedSlugs.length <= 1;

            return (
              <button
                aria-disabled={isLocked}
                aria-selected={isSelected}
                className="alternative-app-details-selection__option"
                data-state={isSelected ? "selected" : "unselected"}
                key={alternative.slug}
                onClick={() => toggleAlternative(alternative.slug)}
                role="option"
                type="button"
              >
                <span aria-hidden="true" className="alternative-app-details-selection__check">
                  {isSelected ? <Check /> : null}
                </span>
                <AppLogo
                  className="alternative-app-details-logo--dropdown"
                  hints={alternative.logoHints}
                  logoUrl={alternative.logoUrl}
                  name={alternative.name}
                />
                <span className="alternative-app-details-selection__option-name">{alternative.name}</span>
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}

function AlternativeCard({
  alternative,
  isRecommended,
  isSelected,
  reduceMotion,
  onActivate,
}: {
  alternative: AlternativeAppDetailAlternative;
  isRecommended: boolean;
  isSelected: boolean;
  onActivate: () => void;
  reduceMotion: boolean;
}) {
  return (
    <motion.button
      aria-label={isSelected ? `${alternative.name} is active in comparison` : `Scroll ${alternative.name} into comparison`}
      aria-pressed={isSelected}
      className="alternative-app-details-alternative-card"
      data-alternative-slug={alternative.slug}
      data-state={isSelected ? "active" : "idle"}
      layout={reduceMotion ? false : "position"}
      onClick={onActivate}
      transition={comparisonMotionTransition}
      type="button"
    >
      <span className="alternative-app-details-alternative-card__header">
        <AppLogo
          className="alternative-app-details-logo--sm"
          hints={alternative.logoHints}
          logoUrl={alternative.logoUrl}
          name={alternative.name}
        />
        <span className="alternative-app-details-alternative-card__copy">
          <span className="alternative-app-details-alternative-card__title-row">
            <span className="alternative-app-details-alternative-card__title">{alternative.name}</span>
            {isRecommended || alternative.badgeLabel ? (
              <Badge className="alternative-app-details-alternative-card__badge" variant="bestFit">
                {alternative.badgeLabel ?? "Best fit"}
              </Badge>
            ) : null}
          </span>
          <DetailMeta items={[alternative.pricingModelLabel, alternative.planLabel]} />
        </span>
      </span>

      <span className="alternative-app-details-alternative-card__divider" />

      <span className="alternative-app-details-alternative-card__metrics">
        <span>
          <span className="alternative-app-details-alternative-card__metric-label">Avg. switch cost</span>
          <strong>{formatPublicCurrencyPeriod(alternative.averageSwitchCostUsd, "yr")}</strong>
        </span>
        <span>
          <span className="alternative-app-details-alternative-card__metric-label">
            {alternative.seatCount} {alternative.seatCount === 1 ? "seat" : "seats"}
          </span>
          <strong>{formatPublicCurrencyPeriod(alternative.monthlySpendUsd, "month")}</strong>
        </span>
      </span>
    </motion.button>
  );
}

function CompactAppCard({
  alternative,
  currentAnnualSpendUsd,
  currentAppName,
  details,
  isCurrent = false,
  isRecommended = false,
  reduceMotion = false,
}: {
  alternative?: AlternativeAppDetailAlternative;
  currentAnnualSpendUsd?: number;
  currentAppName?: string;
  details?: AlternativeAppDetailResponse;
  isCurrent?: boolean;
  isRecommended?: boolean;
  reduceMotion?: boolean;
}) {
  const name = isCurrent ? details?.app.name : alternative?.name;
  const rating = isCurrent ? details?.app.rating : alternative?.rating;
  const hasRating = typeof rating === "number" && Number.isFinite(rating);
  const hints = isCurrent ? details?.app.logoHints : alternative?.logoHints;

  if (!name || !hints) {
    return null;
  }

  return (
    <motion.article
      className="alternative-app-details-compact-card"
      data-current={isCurrent ? "true" : "false"}
      layout={!reduceMotion}
      transition={comparisonMotionTransition}
    >
      <div className="alternative-app-details-compact-card__header">
        {isCurrent ? (
          <CurrentAppLogo hints={hints} logoUrl={details?.app.logoUrl} name={name} />
        ) : (
          <AppLogo
            className="alternative-app-details-logo--sm"
            hints={hints}
            logoUrl={alternative?.logoUrl}
            name={name}
          />
        )}
        <div>
          <div className="alternative-app-details-compact-card__title-row">
            <h3>{name}</h3>
            {isCurrent ? (
              <Badge className="alternative-app-details-current-card__badge" variant="current">
                Current
              </Badge>
            ) : null}
            {!isCurrent && isRecommended ? (
              <Badge className="alternative-app-details-alternative-card__badge" variant="bestFit">
                Best fit
              </Badge>
            ) : null}
          </div>
          <span className="alternative-app-details-compact-card__rating" data-empty={hasRating ? "false" : "true"}>
            {hasRating ? <Star aria-hidden="true" fill="currentColor" /> : null}
            {hasRating ? rating.toFixed(1) : "--"}
          </span>
        </div>
      </div>
      <p>
        {isCurrent && details ? (
          <>
            {details.app.name} is the current public pricing baseline for this comparison.
          </>
        ) : alternative && currentAnnualSpendUsd && currentAppName ? (
          <RecommendationCopy
            alternative={alternative}
            compact
            currentAnnualSpendUsd={currentAnnualSpendUsd}
            currentAppName={currentAppName}
          />
        ) : null}
      </p>
    </motion.article>
  );
}

function Cell({
  cell,
  motionKey,
  period,
  reduceMotion = false,
}: {
  cell: AlternativeAppDetailComparisonCell;
  motionKey?: string;
  period: CostPeriod;
  reduceMotion?: boolean;
}) {
  const value = cell.periodValues?.[period] ?? cell.value;
  const motionProps = motionKey
    ? {
        animate: { opacity: 1, x: 0 },
        exit: reduceMotion ? { opacity: 1, x: 0 } : { opacity: 0, x: -36 },
        initial: reduceMotion ? { opacity: 1, x: 0 } : { opacity: 0, x: 36 },
        layout: !reduceMotion,
        transition: comparisonMotionTransition,
      }
    : {
        layout: !reduceMotion,
        transition: comparisonMotionTransition,
      };

  return (
    <motion.div className="alternative-app-details-cell" data-tone={cell.tone ?? "neutral"} {...motionProps}>
      {cell.pills?.length ? (
        <div className="alternative-app-details-certifications">
          {cell.pills.map((pill) => (
            <span className="alternative-app-details-certification-pill" key={pill}>
              <CheckCircle2 aria-hidden="true" />
              {pill}
            </span>
          ))}
        </div>
      ) : (
        <>
          <p className="alternative-app-details-cell__value">{value}</p>
          {cell.label ? <p className="alternative-app-details-cell__label">{cell.label}</p> : null}
          {cell.description ? <p className="alternative-app-details-cell__description">{cell.description}</p> : null}
          {cell.details?.length ? (
            <ul className="alternative-app-details-cell__details">
              {cell.details.map((detail) => (
                <li key={detail}>
                  <AlertTriangle aria-hidden="true" className="alternative-app-details-cell__detail-icon" />
                  <span>{detail}</span>
                </li>
              ))}
            </ul>
          ) : null}
        </>
      )}
    </motion.div>
  );
}

function findAlternativeRow({
  alternative,
  row,
  section,
}: {
  alternative: AlternativeAppDetailAlternative;
  row: AlternativeAppDetailComparisonRow;
  section: AlternativeAppDetailComparisonSection;
}) {
  return alternative.comparisonSections
    ?.find((candidateSection) => candidateSection.id === section.id)
    ?.rows.find((candidateRow) => candidateRow.id === row.id);
}

function ComparisonThresholdHelp({ row }: { row: AlternativeAppDetailComparisonRow }) {
  const description =
    comparisonThresholdDescriptions[row.id] ?? `${row.label} describes how the current app and selected alternatives compare.`;

  return (
    <span className="alternative-app-details-threshold-help">
      <button aria-label={`${row.label}: ${description}`} type="button">
        <CircleHelp aria-hidden="true" />
      </button>
      <span className="alternative-app-details-threshold-help__tooltip" role="tooltip">
        {description}
      </span>
    </span>
  );
}

function CostPeriodDropdown({ period, setPeriod }: { period: CostPeriod; setPeriod: (period: CostPeriod) => void }) {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    function handleDocumentClick(event: MouseEvent) {
      if (!dropdownRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleDocumentClick);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handleDocumentClick);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  function selectPeriod(nextPeriod: CostPeriod) {
    setPeriod(nextPeriod);
    setIsOpen(false);
  }

  return (
    <div className="alternative-app-details-period-select" ref={dropdownRef}>
      <button
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        className="alternative-app-details-period-select__trigger"
        onClick={() => setIsOpen((open) => !open)}
        type="button"
      >
        <span>{periodLabels[period]}</span>
        <ChevronDown aria-hidden="true" />
      </button>

      {isOpen ? (
        <div className="alternative-app-details-period-select__menu" role="listbox" aria-label="Cost period">
          {Object.entries(periodLabels).map(([value, label]) => {
            const nextPeriod = value as CostPeriod;

            return (
              <button
                aria-selected={period === nextPeriod}
                className="alternative-app-details-period-select__option"
                data-state={period === nextPeriod ? "selected" : "unselected"}
                key={value}
                onClick={() => selectPeriod(nextPeriod)}
                role="option"
                type="button"
              >
                {label}
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}

function ComparisonSection({
  period,
  section,
  selectedAlternatives,
  setPeriod,
  reduceMotion,
}: {
  period: CostPeriod;
  reduceMotion: boolean;
  section: AlternativeAppDetailComparisonSection;
  selectedAlternatives: readonly AlternativeAppDetailAlternative[];
  setPeriod: (period: CostPeriod) => void;
}) {
  const [isExpanded, setIsExpanded] = useState(true);
  return (
    <section aria-labelledby={`alternative-app-detail-${section.id}`} className="alternative-app-details-comparison-section">
      <button
        aria-controls={`alternative-app-detail-panel-${section.id}`}
        aria-expanded={isExpanded}
        className="alternative-app-details-comparison-section__trigger"
        onClick={() => setIsExpanded((expanded) => !expanded)}
        type="button"
      >
        <span className="alternative-app-details-comparison-section__title" id={`alternative-app-detail-${section.id}`}>
          {section.title}
        </span>
        {isExpanded ? <ChevronUp aria-hidden="true" /> : <ChevronDown aria-hidden="true" />}
      </button>

      {isExpanded ? (
        <div
          className="alternative-app-details-comparison-section__table"
          id={`alternative-app-detail-panel-${section.id}`}
        >
          {section.rows.map((row) => (
            <div className="alternative-app-details-comparison-section__row" data-row-id={row.id} key={row.id}>
              <div className="alternative-app-details-comparison-section__label">
                <span className="alternative-app-details-comparison-section__label-text">
                  <span>{row.id === "annual-cost" ? costPeriodRowLabels[period] : row.label}</span>
                  <ComparisonThresholdHelp row={row} />
                </span>
                {row.id === "annual-cost" ? <CostPeriodDropdown period={period} setPeriod={setPeriod} /> : null}
              </div>
              <div className="alternative-app-details-comparison-section__data-row">
                <Cell cell={row.current} period={period} reduceMotion={reduceMotion} />
                <AnimatePresence initial={false} mode="sync">
                  {selectedAlternatives.map((alternative) => {
                    const matchedRow = findAlternativeRow({ alternative, row, section });

                    return (
                      <Cell
                        cell={matchedRow?.alternative ?? row.alternative}
                        key={`${section.id}-${row.id}-${alternative.slug}`}
                        motionKey={alternative.slug}
                        period={period}
                        reduceMotion={reduceMotion}
                      />
                    );
                  })}
                </AnimatePresence>
              </div>
            </div>
          ))}
        </div>
      ) : null}
    </section>
  );
}

export function AlternativeAppDetailsSection({ details }: AlternativeAppDetailsSectionProps) {
  const sentinelRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const reduceMotion = shouldReduceMotion ?? false;
  const {
    contentRef: alternativesContentRef,
    thumbState: alternativesThumbState,
    viewportRef: alternativesViewportRef,
  } = useScrollThumb<HTMLDivElement, HTMLDivElement>({
    minSizePercentage: 18,
    orientation: "horizontal",
  });
  const [selectedAlternativeSlugs, setSelectedAlternativeSlugs] = useState<string[]>(
    details.alternatives.slice(0, maxComparedAlternatives).map((alternative) => alternative.slug),
  );
  const [isSticky, setIsSticky] = useState(false);
  const [isFullDetailsOpen, setIsFullDetailsOpen] = useState(false);
  const [period, setPeriod] = useState<CostPeriod>("annual");

  useEffect(() => {
    const sentinel = sentinelRef.current;

    if (!sentinel) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry) {
          setIsSticky(!entry.isIntersecting);
        }
      },
      {
        root: null,
        rootMargin: "-96px 0px 0px 0px",
        threshold: 0,
      },
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);

  const selectedAlternatives = useMemo(
    () =>
      selectedAlternativeSlugs
        .map((slug) => details.alternatives.find((alternative) => alternative.slug === slug))
        .filter((alternative): alternative is AlternativeAppDetailAlternative => Boolean(alternative)),
    [details.alternatives, selectedAlternativeSlugs],
  );

  const primaryAlternative = selectedAlternatives[0] ?? details.alternatives[0];
  const recommendedAlternativeSlug =
    details.alternatives.reduce((best, alternative) =>
      alternative.threeYearNetSavingUsd > best.threeYearNetSavingUsd ? alternative : best,
    ).slug ?? details.alternatives[0]?.slug;

  const selectedStatus = useMemo(
    () => `${selectedAlternatives.map((alternative) => alternative.name).join(" and ")} selected for comparison.`,
    [selectedAlternatives],
  );

  const updateSelectedAlternatives = useCallback(
    function updateSelectedAlternatives(nextSlugs: string[]) {
      const normalizedSlugs = nextSlugs
        .filter((slug, index, slugs) => slugs.indexOf(slug) === index)
        .filter((slug) => details.alternatives.some((alternative) => alternative.slug === slug))
        .slice(-maxComparedAlternatives);

      if (!normalizedSlugs.length) {
        return;
      }

      setSelectedAlternativeSlugs((currentSlugs) =>
        currentSlugs.length === normalizedSlugs.length &&
        currentSlugs.every((slug, index) => slug === normalizedSlugs[index])
          ? currentSlugs
          : normalizedSlugs,
      );
    },
    [details.alternatives],
  );

  const scrollComparedAlternativesIntoView = useCallback(
    function scrollComparedAlternativesIntoView(nextSlugs: string[]) {
      const viewport = alternativesViewportRef.current;
      const content = alternativesContentRef.current;

      if (!viewport || !content || !nextSlugs.length) {
        return;
      }

      const cards = Array.from(content.querySelectorAll<HTMLElement>(".alternative-app-details-alternative-card"));
      const firstCard = cards[0];

      if (!firstCard) {
        return;
      }

      const firstSelectedIndex = cards.findIndex((card) => card.dataset.alternativeSlug === nextSlugs[0]);
      const maxStartIndex = Math.max(0, cards.length - maxComparedAlternatives);
      const startIndex = Math.min(maxStartIndex, Math.max(0, firstSelectedIndex));
      const targetCard = cards[startIndex];

      if (!targetCard) {
        return;
      }

      viewport.scrollTo({
        behavior: reduceMotion ? "auto" : "smooth",
        left: targetCard.offsetLeft - firstCard.offsetLeft,
      });
    },
    [reduceMotion],
  );

  const handleSelectionChange = useCallback(
    function handleSelectionChange(nextSlugs: string[]) {
      updateSelectedAlternatives(nextSlugs);
      scrollComparedAlternativesIntoView(nextSlugs.slice(-maxComparedAlternatives));
    },
    [scrollComparedAlternativesIntoView, updateSelectedAlternatives],
  );

  const syncSelectedAlternativesFromScroll = useCallback(() => {
    const viewport = alternativesViewportRef.current;
    const content = alternativesContentRef.current;

    if (!viewport || !content) {
      return;
    }

    const cards = Array.from(content.querySelectorAll<HTMLElement>(".alternative-app-details-alternative-card"));

    if (!cards.length) {
      return;
    }

    if (cards.length <= maxComparedAlternatives) {
      updateSelectedAlternatives(
        cards.map((card) => card.dataset.alternativeSlug).filter((slug): slug is string => Boolean(slug)),
      );
      return;
    }

    const firstCard = cards[0];
    const secondCard = cards[1];
    const cardStep = secondCard ? secondCard.offsetLeft - firstCard.offsetLeft : firstCard.offsetWidth;
    const maxStartIndex = Math.max(0, cards.length - maxComparedAlternatives);
    const startIndex = Math.min(maxStartIndex, Math.max(0, Math.round(viewport.scrollLeft / Math.max(1, cardStep))));
    const visibleSlugs = cards
      .slice(startIndex, startIndex + maxComparedAlternatives)
      .map((card) => card.dataset.alternativeSlug)
      .filter((slug): slug is string => Boolean(slug));

    updateSelectedAlternatives(visibleSlugs);
  }, [alternativesContentRef, alternativesViewportRef, updateSelectedAlternatives]);

  useEffect(() => {
    const viewport = alternativesViewportRef.current;
    const content = alternativesContentRef.current;

    if (!viewport || !content) {
      return;
    }

    let animationFrame = 0;
    const syncOnFrame = () => {
      cancelAnimationFrame(animationFrame);
      animationFrame = requestAnimationFrame(syncSelectedAlternativesFromScroll);
    };
    const resizeObserver = new ResizeObserver(syncOnFrame);

    syncSelectedAlternativesFromScroll();
    viewport.addEventListener("scroll", syncOnFrame, { passive: true });
    resizeObserver.observe(viewport);
    resizeObserver.observe(content);

    return () => {
      cancelAnimationFrame(animationFrame);
      viewport.removeEventListener("scroll", syncOnFrame);
      resizeObserver.disconnect();
    };
  }, [syncSelectedAlternativesFromScroll]);

  function scrollAlternativeIntoActivePair(index: number) {
    const viewport = alternativesViewportRef.current;
    const content = alternativesContentRef.current;

    if (!viewport || !content) {
      return;
    }

    const cards = Array.from(content.querySelectorAll<HTMLElement>(".alternative-app-details-alternative-card"));
    const currentStartIndex = Math.max(
      0,
      details.alternatives.findIndex((alternative) => alternative.slug === selectedAlternativeSlugs[0]),
    );
    const clickedIndex = Math.max(0, Math.min(index, cards.length - 1));
    const nextStartIndex =
      clickedIndex > currentStartIndex + 1
        ? clickedIndex - 1
        : clickedIndex < currentStartIndex
          ? clickedIndex
          : currentStartIndex;
    const card = cards[Math.min(Math.max(nextStartIndex, 0), Math.max(0, cards.length - maxComparedAlternatives))];

    if (!card) {
      return;
    }

    const firstCard = cards[0];

    viewport.scrollTo({
      behavior: reduceMotion ? "auto" : "smooth",
      left: firstCard ? card.offsetLeft - firstCard.offsetLeft : card.offsetLeft,
    });
  }

  return (
    <section aria-labelledby="alternative-app-details-heading" className="alternative-app-details">
      <Container className="alternative-app-details__shell" variant="siteFooterPromo">
        <div className="alternative-app-details__hero">
          <Badge className="alternative-app-details__eyebrow" variant="muted">
            ALTERNATIVE APPLICATIONS
          </Badge>
          <AppLogo
            className="alternative-app-details-logo--hero"
            hints={details.app.logoHints}
            logoUrl={details.app.logoUrl}
            name={details.app.name}
          />
          <h1 className="alternative-app-details__title" id="alternative-app-details-heading">
            {details.app.name} Alternatives
          </h1>
        </div>

        <div className="alternative-app-details__panel">
          <nav aria-label="Breadcrumb" className="alternative-app-details__breadcrumb">
            <Link href="/alternative-apps">Applications</Link>
            <ArrowLeft aria-hidden="true" className="alternative-app-details__breadcrumb-icon" />
            <span>{details.app.name}</span>
          </nav>

          <div className="alternative-app-details__detail-surface" data-sticky-active={isSticky && isFullDetailsOpen ? "true" : "false"}>
            <div ref={sentinelRef} aria-hidden="true" className="alternative-app-details__sticky-sentinel" />

            {isSticky && isFullDetailsOpen ? (
              <div className="alternative-app-details__sticky-compact-shell">
                <div
                  className="alternative-app-details__sticky-compact"
                  data-selected-count={selectedAlternatives.length}
                  data-visible="true"
                >
                  <div className="alternative-app-details__sticky-compact-intro">
                    <h2>{details.app.name} alternatives</h2>
                      <AlternativeAppSelectionDropdown
                        alternatives={details.alternatives}
                        selectedSlugs={selectedAlternativeSlugs}
                        onSelectionChange={handleSelectionChange}
                      />
                  </div>
                  <CompactAppCard details={details} isCurrent reduceMotion={reduceMotion} />
                  <div className="alternative-app-details__sticky-compact-alternatives">
                    <AnimatePresence initial={false} mode="sync">
                      {selectedAlternatives.map((alternative) => (
                        <CompactAppCard
                          alternative={alternative}
                          currentAnnualSpendUsd={details.currentAppMetrics.annualSpendUsd}
                          currentAppName={details.app.name}
                          isRecommended={alternative.slug === recommendedAlternativeSlug || alternative.badgeLabel === "Best fit"}
                          key={alternative.slug}
                          reduceMotion={reduceMotion}
                        />
                      ))}
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            ) : null}

            <div className="alternative-app-details__summary" aria-hidden={isSticky && isFullDetailsOpen ? "true" : undefined}>
              <div className="alternative-app-details__overview">
                <div className="alternative-app-details__overview-copy">
                  <h2>{details.overview.heading}</h2>
                  <p>{details.overview.description}</p>
                </div>
                <AlternativeAppSelectionDropdown
                  alternatives={details.alternatives}
                  selectedSlugs={selectedAlternativeSlugs}
                  onSelectionChange={handleSelectionChange}
                />
              </div>

              <div className="alternative-app-details__summary-grid">
                {primaryAlternative ? <CurrentAppCard details={details} selectedAlternative={primaryAlternative} /> : null}
                <div className="alternative-app-details__alternatives-panel">
                  <div className="alternative-app-details__alternatives-header">
                    <div>
                      <h3>{details.app.name} alternatives</h3>
                      <p>
                        See how {details.app.name} compares to {details.alternatives.length} alternative apps you can switch to.
                      </p>
                    </div>
                  </div>

                  <div className="alternative-app-details__alternatives-scroll" ref={alternativesViewportRef} tabIndex={0}>
                    <div
                      aria-label={`${details.app.name} alternatives`}
                      className="alternative-app-details__alternatives-list"
                      ref={alternativesContentRef}
                    >
                      {details.alternatives.map((alternative, index) => {
                        const isSelected = selectedAlternativeSlugs.includes(alternative.slug);

                        return (
                          <AlternativeCard
                            alternative={alternative}
                            isRecommended={alternative.slug === recommendedAlternativeSlug || alternative.badgeLabel === "Best fit"}
                            isSelected={isSelected}
                            key={alternative.slug}
                            onActivate={() => scrollAlternativeIntoActivePair(index)}
                            reduceMotion={reduceMotion}
                          />
                        );
                      })}
                    </div>
                  </div>
                  <div aria-hidden="true" className="alternative-app-details__alternatives-rail-shell">
                    <ScrollThumbRail
                      className="alternative-app-details__alternatives-rail"
                      hidden={alternativesThumbState.hidden}
                      offsetPercentage={alternativesThumbState.offsetPercentage}
                      orientation="horizontal"
                      sizePercentage={alternativesThumbState.sizePercentage}
                    />
                  </div>
                </div>
              </div>

              {!isFullDetailsOpen ? (
                <button
                  aria-expanded="false"
                  className="alternative-app-details__full-details-button"
                  onClick={() => setIsFullDetailsOpen(true)}
                  type="button"
                >
                  <span>View full details</span>
                  <ChevronDown aria-hidden="true" />
                </button>
              ) : null}
            </div>

            <p aria-live="polite" className="sr-only" role="status">
              {selectedStatus}
            </p>

            {isFullDetailsOpen ? (
              <div
                className="alternative-app-details__comparison"
                data-selected-count={selectedAlternatives.length}
                data-selected-alternatives={selectedAlternativeSlugs.join(",")}
              >
                {details.comparisonSections.map((section) => (
                  <ComparisonSection
                    key={section.id}
                    period={period}
                    reduceMotion={reduceMotion}
                    section={section}
                    selectedAlternatives={selectedAlternatives}
                    setPeriod={setPeriod}
                  />
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </Container>
    </section>
  );
}
