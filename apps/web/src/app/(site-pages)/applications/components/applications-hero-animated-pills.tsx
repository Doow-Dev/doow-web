"use client";

import type { CSSProperties } from "react";
import { createElement } from "react";

import { motion, useReducedMotion } from "motion/react";

import type {
  ApplicationsHeroBrandPill,
  ApplicationsHeroPillFieldContent,
  ApplicationsHeroPillItem,
} from "@/app/(site-pages)/applications/content/hero-pills-content";
import { getIntegrationAppGraphic } from "@/components/custom/icons/integration-app-icon-registry";
import { Badge } from "@/components/system";

const INTRO_DURATION_MS = 920;
const INTRO_SETTLE_MS = 1350;
const INTRO_EASE = [0.22, 1, 0.36, 1] as const;
const FLOAT_EASE = [0.42, 0, 0.58, 1] as const;

interface ApplicationsHeroAnimatedPillsProps {
  field: ApplicationsHeroPillFieldContent;
}

function getScenePercent(value: number, total: number) {
  return `${(value / total) * 100}%`;
}

function getPillStyle(field: ApplicationsHeroPillFieldContent, pill: ApplicationsHeroPillItem) {
  return {
    height: getScenePercent(field.pillHeight, field.sceneHeight),
    left: getScenePercent(pill.x, field.sceneWidth),
    top: getScenePercent(pill.y - field.sceneTopOffset, field.sceneHeight),
    width: getScenePercent(pill.width, field.sceneWidth),
  } satisfies CSSProperties;
}

function ApplicationsHeroPillLogo({ pill }: { pill: ApplicationsHeroBrandPill }) {
  const graphic = getIntegrationAppGraphic(pill.logoKey, pill.label);

  if (!graphic) {
    return null;
  }

  const style = {
    height: `${pill.logoHeight}px`,
    width: `${pill.logoWidth}px`,
  } satisfies CSSProperties;

  if (graphic.kind === "component") {
    return createElement(graphic.component, {
      "aria-hidden": true,
      className: "applications-hero__pill-logo applications-hero__pill-logo--svg",
      focusable: "false",
      style,
    });
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      alt=""
      aria-hidden="true"
      className="applications-hero__pill-logo applications-hero__pill-logo--asset"
      draggable={false}
      loading="lazy"
      src={graphic.src}
      style={style}
    />
  );
}

function ApplicationsHeroAnimatedPill({
  field,
  pill,
  prefersReducedMotion,
}: {
  field: ApplicationsHeroPillFieldContent;
  pill: ApplicationsHeroPillItem;
  prefersReducedMotion: boolean;
}) {
  const pillGap = pill.kind === "brand" ? (pill.logoGap ?? 8) : 0;

  return (
    <motion.div
      aria-hidden="true"
      className="applications-hero__pill-item"
      data-mobile-hidden={pill.hideOnMobile ? "true" : "false"}
      initial={{ opacity: 0, scale: 0.985, y: 10 }}
      animate={{ opacity: pill.opacity, scale: 1, y: 0 }}
      style={getPillStyle(field, pill)}
      transition={
        prefersReducedMotion
          ? {
              duration: 0.24,
              ease: "easeOut",
            }
          : {
              delay: pill.introDelayMs / 1000,
              duration: INTRO_DURATION_MS / 1000,
              ease: INTRO_EASE,
            }
      }
    >
      <motion.div
        className="applications-hero__pill-float"
        // The idle motion begins only after the intro settles, keeping the entrance soft rather than busy.
        animate={
          !prefersReducedMotion
            ? {
                y: [0, pill.floatDistancePx * -1, 0, pill.floatDistancePx * 0.6, 0],
              }
            : undefined
        }
        transition={
          !prefersReducedMotion
            ? {
                delay: (INTRO_SETTLE_MS + pill.floatDelayMs) / 1000,
                duration: pill.floatDurationMs / 1000,
                ease: FLOAT_EASE,
                repeat: Number.POSITIVE_INFINITY,
              }
            : undefined
        }
      >
        <Badge
          className="applications-hero__pill-badge"
          style={
            {
              "--applications-hero-pill-gap":
                pill.kind === "brand"
                  ? `min(${pillGap}px, var(--applications-hero-pill-gap-cap, ${pillGap}px))`
                  : "0px",
            } as CSSProperties
          }
          variant="appLogoPill"
        >
          {pill.kind === "brand" ? <ApplicationsHeroPillLogo pill={pill} /> : null}
          <span className="applications-hero__pill-label">{pill.label}</span>
        </Badge>
      </motion.div>
    </motion.div>
  );
}

export function ApplicationsHeroAnimatedPills({ field }: ApplicationsHeroAnimatedPillsProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div aria-hidden="true" className="applications-hero__background">
      <div className="applications-hero__pill-field">
        {field.items.map((pill) => (
          <ApplicationsHeroAnimatedPill
            field={field}
            key={pill.id}
            pill={pill}
            prefersReducedMotion={Boolean(prefersReducedMotion)}
          />
        ))}
      </div>
    </div>
  );
}
