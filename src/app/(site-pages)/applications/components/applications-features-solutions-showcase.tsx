"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";

import { motion, useReducedMotion } from "motion/react";

import type {
  ApplicationsFeaturesSolutionsAppDetailMetricsCard,
  ApplicationsFeaturesSolutionsCard,
  ApplicationsFeaturesSolutionsMetricSummary,
  ApplicationsFeaturesSolutionsSectionContent,
  ApplicationsFeaturesSolutionsSpendLogo,
  ApplicationsFeaturesSolutionsUnderutilizedSpendCard,
} from "@/app/(site-pages)/applications/content/features-solutions-content";
import {
  ApplicationsDuplicateToolsIllustration,
  ApplicationsIllustrationWindowChrome,
} from "@/components/custom/illustrations/applications-illustrations";
import { GoogleAppIcon } from "@/components/custom/icons/google-app-icon";
import { NotionAppIcon } from "@/components/custom/icons/notion-app-icon";
import { SalesforceAppIcon } from "@/components/custom/icons/salesforce-app-icon";
import { SlackAppIcon } from "@/components/custom/icons/slack-app-icon";

const cardRevealEase = [0.22, 1, 0.36, 1] as const;
const cardHoverEase = [0.16, 1, 0.3, 1] as const;
const cardFadeDurationSeconds = 0.96;
const figureEaseDurationSeconds = 0.72;
const staggerStepSeconds = 0.12;
const underutilizedChartWidth = 303;
const underutilizedChartHeight = 123;
const underutilizedBarPositions = [
  { left: 41, top: 35 },
  { left: 100, top: 35 },
  { left: 170, top: 65 },
  { left: 240, top: 21 },
] as const;
const appDetailTrendLinePath =
  "M0 25.5C41 24.4 81 23.8 120 24.9C155 25.9 188 22.8 223 18.1C266 12.2 312 8.2 371 4.5";
const appDetailTrendAreaPath = `${appDetailTrendLinePath}V86H0V25.5Z`;
const countUpCurrencyFormatter = new Intl.NumberFormat("en-US", {
  currency: "USD",
  maximumFractionDigits: 2,
  minimumFractionDigits: 2,
  style: "currency",
});
const countUpIntegerFormatter = new Intl.NumberFormat("en-US", {
  maximumFractionDigits: 0,
});

const spendLogoMap = {
  google: GoogleAppIcon,
  notion: NotionAppIcon,
  salesforce: SalesforceAppIcon,
  slack: SlackAppIcon,
} as const satisfies Record<ApplicationsFeaturesSolutionsSpendLogo, typeof GoogleAppIcon>;

const overlapAppNamesMap = {
  asana: ["asana", "Asana"],
  notion: ["notion", "Notion"],
  slack: ["slack", "Slack"],
} as const;

function useLatchedInView(threshold: number) {
  const ref = useRef<HTMLDivElement>(null);
  const [hasEntered, setHasEntered] = useState(false);

  useEffect(() => {
    if (hasEntered) {
      return;
    }

    if (typeof window === "undefined") {
      return;
    }

    if (typeof window.IntersectionObserver === "undefined") {
      const frameId = window.requestAnimationFrame(() => {
        setHasEntered(true);
      });

      return () => {
        window.cancelAnimationFrame(frameId);
      };
    }

    const node = ref.current;

    if (!node) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && entry.intersectionRatio >= threshold) {
          setHasEntered(true);
          observer.disconnect();
        }
      },
      {
        threshold: [threshold],
      }
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, [hasEntered, threshold]);

  return { hasEntered, ref };
}

function formatCountUpValue(value: number, format: ApplicationsFeaturesSolutionsMetricSummary["format"]) {
  if (format === "currencyUsd") {
    return countUpCurrencyFormatter.format(value);
  }

  return countUpIntegerFormatter.format(value);
}

function ApplicationsCountUpValue({
  active,
  className,
  durationMs = 900,
  format,
  value,
}: {
  active: boolean;
  className?: string;
  durationMs?: number;
  format: ApplicationsFeaturesSolutionsMetricSummary["format"];
  value: number;
}) {
  const prefersReducedMotion = useReducedMotion() ?? false;
  const [displayValue, setDisplayValue] = useState(() => (prefersReducedMotion || !active ? value : 0));

  useEffect(() => {
    if (prefersReducedMotion || !active) {
      return;
    }

    const startTime = performance.now();
    let frameId = 0;

    const tick = (timestamp: number) => {
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / durationMs, 1);
      const easedProgress = 1 - Math.pow(1 - progress, 3);

      setDisplayValue(value * easedProgress);

      if (progress < 1) {
        frameId = window.requestAnimationFrame(tick);
      }
    };

    frameId = window.requestAnimationFrame(tick);

    return () => {
      window.cancelAnimationFrame(frameId);
    };
  }, [active, durationMs, prefersReducedMotion, value]);

  const resolvedDisplayValue = prefersReducedMotion || !active ? value : displayValue;
  const roundedDisplayValue = format === "integer" ? Math.round(resolvedDisplayValue) : resolvedDisplayValue;
  const resolvedValueLabel = formatCountUpValue(roundedDisplayValue, format);

  return (
    <span className={className}>
      <span aria-hidden="true">{resolvedValueLabel}</span>
      <span className="sr-only">{formatCountUpValue(value, format)}</span>
    </span>
  );
}

function ApplicationsMetricDeltaArrow({ className, direction }: { className?: string; direction: "down" | "up" }) {
  const transform = direction === "up" ? "rotate(180 6 6)" : undefined;

  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      viewBox="0 0 12 12"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g transform={transform}>
        <path
          d="M6 9.25V2.75M6 9.25L3.75 7M6 9.25L8.25 7"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.25"
        />
      </g>
    </svg>
  );
}

function ApplicationsMetricSummaryCard({
  active,
  cardIndex,
  metric,
  prefersReducedMotion,
  replayToken,
}: {
  active: boolean;
  cardIndex: number;
  metric: ApplicationsFeaturesSolutionsMetricSummary;
  prefersReducedMotion: boolean;
  replayToken: number;
}) {
  return (
    <motion.div
      animate={
        active
          ? {
            opacity: 1,
            x: 0,
            y: 0,
          }
          : undefined
      }
      className="applications-features-solutions__metric-card"
      initial={
        prefersReducedMotion
          ? false
          : {
            opacity: 0,
            x: cardIndex === 0 ? -12 : 12,
            y: 10,
          }
      }
      transition={
        prefersReducedMotion
          ? { duration: 0 }
          : {
            delay: 0.34 + cardIndex * staggerStepSeconds,
            duration: figureEaseDurationSeconds,
            ease: cardRevealEase,
          }
      }
    >
      <div className="applications-features-solutions__metric-copy">
        <div className="applications-features-solutions__metric-label-row">
          <SlackAppIcon className="applications-features-solutions__metric-brand" />
          <span className="applications-features-solutions__metric-label">{metric.label}</span>
        </div>

        <ApplicationsCountUpValue
          active={active}
          className="applications-features-solutions__metric-value"
          durationMs={1100}
          format={metric.format}
          key={`${metric.id}-${replayToken}-${active ? "active" : "idle"}`}
          value={metric.value}
        />
      </div>

      <div className="applications-features-solutions__metric-delta" data-direction={metric.deltaDirection}>
        <span className="applications-features-solutions__metric-delta-badge">
          <ApplicationsMetricDeltaArrow
            className="applications-features-solutions__metric-delta-arrow"
            direction={metric.deltaDirection}
          />
        </span>
        <span className="applications-features-solutions__metric-delta-copy">{metric.deltaLabel}</span>
      </div>
    </motion.div>
  );
}

function ApplicationsSpendVisibilityFigure({
  active,
  card,
  prefersReducedMotion,
  replayToken,
}: {
  active: boolean;
  card: Extract<ApplicationsFeaturesSolutionsCard, { kind: "spendVisibility" }>;
  prefersReducedMotion: boolean;
  replayToken: number;
}) {
  return (
    <div className="applications-features-solutions__figure-stage applications-features-solutions__figure-stage--spend">
      <motion.div
        animate={active ? { opacity: 1, y: 0 } : undefined}
        className="applications-features-solutions__window"
        initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
        transition={
          prefersReducedMotion
            ? { duration: 0 }
            : {
              delay: 0.2,
              duration: figureEaseDurationSeconds,
              ease: cardRevealEase,
            }
        }
      >
        <ApplicationsIllustrationWindowChrome className="applications-features-solutions__window-chrome" />

        <div className="applications-features-solutions__spend-rows">
          {card.rows.map((row, rowIndex) => {
            const Logo = spendLogoMap[row.logo];

            return (
              <motion.div
                animate={active ? { opacity: 1, x: 0, y: 0 } : undefined}
                className="applications-features-solutions__spend-row"
                initial={prefersReducedMotion ? false : { opacity: 0, x: -10, y: 6 }}
                key={`${row.appName}-${replayToken}`}
                transition={
                  prefersReducedMotion
                    ? { duration: 0 }
                    : {
                      delay: 0.32 + rowIndex * 0.1,
                      duration: 0.56,
                      ease: cardRevealEase,
                    }
                }
              >
                <div className="applications-features-solutions__spend-app">
                  <Logo className="applications-features-solutions__spend-logo" />
                  <span className="applications-features-solutions__spend-app-name">{row.appName}</span>
                </div>

                <div className="applications-features-solutions__spend-meta">
                  <span className="applications-features-solutions__spend-date">{row.date}</span>
                  <span className="applications-features-solutions__spend-amount">{row.amount}</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}

function ApplicationsOverlapDetectionFigure({
  active,
  card,
  hovered,
  prefersReducedMotion,
}: {
  active: boolean;
  card: Extract<ApplicationsFeaturesSolutionsCard, { kind: "overlapDetection" }>;
  hovered: boolean;
  prefersReducedMotion: boolean;
}) {
  return (
    <div className="applications-features-solutions__figure-stage applications-features-solutions__figure-stage--overlap">
      <motion.div
        animate={
          active
            ? {
              opacity: 1,
              scale: hovered ? 1.025 : 1,
              y: 0,
            }
            : undefined
        }
        className="applications-features-solutions__overlap-figure-motion"
        initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
        transition={
          prefersReducedMotion
            ? { duration: 0 }
            : {
              delay: 0.2,
              duration: hovered ? 0.42 : figureEaseDurationSeconds,
              ease: hovered ? cardHoverEase : cardRevealEase,
            }
        }
      >
        <ApplicationsDuplicateToolsIllustration
          apps={card.apps.map((app) => ({
            id: app,
            names: overlapAppNamesMap[app],
          }))}
          className="applications-features-solutions__duplicate-tools-surface"
          classNamePrefix=""
          nodes={card.departments.map((department) => ({
            iconKey: department.icon,
            id: department.id,
            label: department.label,
          }))}
        />
      </motion.div>
    </div>
  );
}

function ApplicationsUnderutilizedSpendFigure({
  active,
  card,
  prefersReducedMotion,
  replayToken,
}: {
  active: boolean;
  card: ApplicationsFeaturesSolutionsUnderutilizedSpendCard;
  prefersReducedMotion: boolean;
  replayToken: number;
}) {
  const barStyleMap = card.bars.map((bar, index) => {
    const position = underutilizedBarPositions[index];

    return {
      height: `${((bar.greenHeight + bar.orangeHeight) / underutilizedChartHeight) * 100}%`,
      left: `${(position.left / underutilizedChartWidth) * 100}%`,
      top: `${(position.top / underutilizedChartHeight) * 100}%`,
      width: `${(27 / underutilizedChartWidth) * 100}%`,
    } satisfies CSSProperties;
  });

  return (
    <div className="applications-features-solutions__figure-stage applications-features-solutions__figure-stage--utilization">
      <motion.div
        animate={active ? { opacity: 1, y: 0 } : undefined}
        className="applications-features-solutions__utilization-pill"
        initial={prefersReducedMotion ? false : { opacity: 0, y: 10 }}
        transition={
          prefersReducedMotion
            ? { duration: 0 }
            : {
              delay: 0.22,
              duration: figureEaseDurationSeconds,
              ease: cardRevealEase,
            }
        }
      >
        {card.pillLabel}
      </motion.div>

      <motion.div
        animate={active ? { opacity: 1, y: 0 } : undefined}
        className="applications-features-solutions__utilization-surface"
        initial={prefersReducedMotion ? false : { opacity: 0, y: 10 }}
        transition={
          prefersReducedMotion
            ? { duration: 0 }
            : {
              delay: 0.34,
              duration: 0.82,
              ease: cardRevealEase,
            }
        }
      >
        <div
          aria-hidden="true"
          className="applications-features-solutions__utilization-grid applications-features-solutions__utilization-grid--frame"
        />
        <div
          aria-hidden="true"
          className="applications-features-solutions__utilization-grid applications-features-solutions__utilization-grid--field"
        />

        <div aria-hidden="true" className="applications-features-solutions__utilization-bars">
          {card.bars.map((bar, barIndex) => (
            <motion.div
              animate={active ? { opacity: 1, scaleY: 1 } : undefined}
              className="applications-features-solutions__utilization-bar-group"
              initial={prefersReducedMotion ? false : { opacity: 0, scaleY: 0 }}
              key={`${bar.id}-${replayToken}`}
              style={barStyleMap[barIndex]}
              transition={
                prefersReducedMotion
                  ? { duration: 0 }
                  : {
                    delay: 0.44 + barIndex * 0.12,
                    duration: 0.72,
                    ease: cardRevealEase,
                  }
              }
            >
              <span
                className="applications-features-solutions__utilization-segment applications-features-solutions__utilization-segment--green"
                style={{ height: `${bar.greenHeight}px` }}
              />
              <motion.span
                animate={active ? { opacity: 1 } : undefined}
                className="applications-features-solutions__utilization-segment applications-features-solutions__utilization-segment--orange"
                initial={prefersReducedMotion ? false : { opacity: 0 }}
                style={{ height: `${bar.orangeHeight}px` }}
                transition={
                  prefersReducedMotion
                    ? { duration: 0 }
                    : {
                      delay: 0.58 + barIndex * 0.12,
                      duration: 0.46,
                      ease: cardRevealEase,
                    }
                }
              />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

function ApplicationsAppDetailMetricsFigure({
  active,
  card,
  prefersReducedMotion,
  replayToken,
}: {
  active: boolean;
  card: ApplicationsFeaturesSolutionsAppDetailMetricsCard;
  prefersReducedMotion: boolean;
  replayToken: number;
}) {
  return (
    <div className="applications-features-solutions__figure-stage applications-features-solutions__figure-stage--app-detail">
      <div className="applications-features-solutions__metric-grid">
        {card.metrics.map((metric, metricIndex) => (
          <ApplicationsMetricSummaryCard
            active={active}
            cardIndex={metricIndex}
            key={metric.id}
            metric={metric}
            prefersReducedMotion={prefersReducedMotion}
            replayToken={replayToken}
          />
        ))}
      </div>

      <motion.div
        animate={active ? { opacity: 1, scaleY: 1, y: 0 } : undefined}
        className="applications-features-solutions__trend-surface"
        initial={prefersReducedMotion ? false : { opacity: 0, scaleY: 0, y: 8 }}
        key={`trend-${replayToken}`}
        transition={
          prefersReducedMotion
            ? { duration: 0 }
            : {
              delay: 0.56,
              duration: 0.9,
              ease: cardRevealEase,
            }
        }
      >
        <motion.svg
          aria-hidden="true"
          animate={active ? { opacity: 1 } : undefined}
          className="applications-features-solutions__trend-graphic"
          fill="none"
          viewBox="0 0 371 86"
          initial={prefersReducedMotion ? false : { opacity: 0 }}
          preserveAspectRatio="none"
          transition={
            prefersReducedMotion
              ? { duration: 0 }
              : {
                delay: 0.62,
                duration: 0.72,
                ease: cardRevealEase,
              }
          }
          xmlns="http://www.w3.org/2000/svg"
        >
          <motion.path
            animate={active ? { opacity: 1 } : undefined}
            d={appDetailTrendAreaPath}
            fill="url(#applications-features-solutions-trend-fill)"
            initial={prefersReducedMotion ? false : { opacity: 0 }}
            transition={
              prefersReducedMotion
                ? { duration: 0 }
                : {
                  delay: 0.66,
                  duration: 0.62,
                  ease: cardRevealEase,
                }
            }
          />
          <motion.path
            animate={active ? { pathLength: 1 } : undefined}
            d={appDetailTrendLinePath}
            initial={prefersReducedMotion ? false : { pathLength: 0 }}
            stroke="rgba(20, 20, 20, 0.34)"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.2"
            transition={
              prefersReducedMotion
                ? { duration: 0 }
                : {
                  delay: 0.7,
                  duration: 1.02,
                  ease: cardRevealEase,
                }
            }
          />
          <defs>
            <linearGradient
              id="applications-features-solutions-trend-fill"
              x1="185.5"
              x2="185.5"
              y1="4"
              y2="86"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="rgba(20, 20, 20, 0.14)" />
              <stop offset="1" stopColor="rgba(20, 20, 20, 0.07)" />
            </linearGradient>
          </defs>
        </motion.svg>
      </motion.div>
    </div>
  );
}

function ApplicationsFeatureCardFigure({
  active,
  card,
  hovered,
  prefersReducedMotion,
  replayToken,
}: {
  active: boolean;
  card: ApplicationsFeaturesSolutionsCard;
  hovered: boolean;
  prefersReducedMotion: boolean;
  replayToken: number;
}) {
  if (card.kind === "spendVisibility") {
    return (
      <ApplicationsSpendVisibilityFigure
        active={active}
        card={card}
        prefersReducedMotion={prefersReducedMotion}
        replayToken={replayToken}
      />
    );
  }

  if (card.kind === "overlapDetection") {
    return (
      <ApplicationsOverlapDetectionFigure
        active={active}
        card={card}
        hovered={hovered}
        prefersReducedMotion={prefersReducedMotion}
      />
    );
  }

  if (card.kind === "underutilizedSpend") {
    return (
      <ApplicationsUnderutilizedSpendFigure
        active={active}
        card={card}
        prefersReducedMotion={prefersReducedMotion}
        replayToken={replayToken}
      />
    );
  }

  return (
    <ApplicationsAppDetailMetricsFigure
      active={active}
      card={card}
      prefersReducedMotion={prefersReducedMotion}
      replayToken={replayToken}
    />
  );
}

function ApplicationsFeatureCardShell({
  active,
  card,
  index,
  prefersReducedMotion,
}: {
  active: boolean;
  card: ApplicationsFeaturesSolutionsCard;
  index: number;
  prefersReducedMotion: boolean;
}) {
  const [hoverReplayKey, setHoverReplayKey] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const shouldReplayOnHover =
    card.kind === "spendVisibility" || card.kind === "underutilizedSpend" || card.kind === "appDetailMetrics";

  return (
    <motion.li
      animate={
        active
          ? {
            filter: "blur(0px)",
            opacity: 1,
            scale: 1,
            y: 0,
          }
          : undefined
      }
      className="applications-features-solutions__card"
      data-card-id={card.id}
      onHoverStart={() => {
        setIsHovered(true);

        if (!active || prefersReducedMotion || !shouldReplayOnHover) {
          return;
        }

        setHoverReplayKey((value) => value + 1);
      }}
      onHoverEnd={() => {
        setIsHovered(false);
      }}
      initial={
        prefersReducedMotion
          ? false
          : {
            filter: "blur(10px)",
            opacity: 0,
            scale: 0.992,
            y: 24,
          }
      }
      transition={
        prefersReducedMotion
          ? { duration: 0 }
          : {
            delay: index * 0.11,
            duration: cardFadeDurationSeconds,
            ease: cardRevealEase,
          }
      }
    >
      <div className="applications-features-solutions__card-body">
        <div aria-hidden="true" className="applications-features-solutions__card-figure">
          <ApplicationsFeatureCardFigure
            active={active}
            card={card}
            hovered={isHovered}
            prefersReducedMotion={prefersReducedMotion}
            replayToken={hoverReplayKey}
          />
        </div>

        <h3 className="applications-features-solutions__card-title">{card.title}</h3>
      </div>

      <p className="sr-only">{card.accessibilitySummary}</p>
    </motion.li>
  );
}

export interface ApplicationsFeaturesSolutionsShowcaseProps {
  cards: ApplicationsFeaturesSolutionsSectionContent["cards"];
}

export function ApplicationsFeaturesSolutionsShowcase({ cards }: ApplicationsFeaturesSolutionsShowcaseProps) {
  const prefersReducedMotion = useReducedMotion() ?? false;
  const { hasEntered, ref } = useLatchedInView(0.35);
  const isActive = prefersReducedMotion || hasEntered;

  return (
    <div className="applications-features-solutions__showcase" ref={ref}>
      <ul className="applications-features-solutions__grid">
        {cards.map((card, index) => (
          <ApplicationsFeatureCardShell
            active={isActive}
            card={card}
            index={index}
            key={card.id}
            prefersReducedMotion={prefersReducedMotion}
          />
        ))}
      </ul>
    </div>
  );
}
