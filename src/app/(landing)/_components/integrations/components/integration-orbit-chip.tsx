"use client";

import type { CSSProperties } from "react";

import { cn } from "@/lib/utils";

import type { IntegrationAppLogo } from "../content";
import { IntegrationLogoGraphic } from "./integration-logo";

const FIGMA_ORBIT_CHIP_SURFACE = {
  heightPx: 79.554,
  rotationDeg: -119.869,
  widthPx: 79.975,
} as const;

function getOrbitChipStyle(slotSizePx: number): CSSProperties {
  const width = (FIGMA_ORBIT_CHIP_SURFACE.widthPx / slotSizePx) * 100;
  const height = (FIGMA_ORBIT_CHIP_SURFACE.heightPx / slotSizePx) * 100;

  return {
    ["--integration-orbit-chip-surface-height" as const]: `${height}%`,
    ["--integration-orbit-chip-surface-rotation" as const]: `${FIGMA_ORBIT_CHIP_SURFACE.rotationDeg}deg`,
    ["--integration-orbit-chip-surface-width" as const]: `${width}%`,
  } as CSSProperties;
}

export interface IntegrationOrbitChipProps {
  app: IntegrationAppLogo;
  className?: string;
  slotSizePx: number;
}

export function IntegrationOrbitChip({ app, className, slotSizePx }: IntegrationOrbitChipProps) {
  return (
    <div className={cn("integration-orbit-chip", className)} style={getOrbitChipStyle(slotSizePx)}>
      <span aria-hidden="true" className="integration-orbit-chip__surface" />
      <IntegrationLogoGraphic app={app} className="integration-orbit-card__slot-logo integration-orbit-chip__logo" decorative />
    </div>
  );
}
