"use client";

import type { MotionValue } from "motion/react";
import { useEffect } from "react";
import { motion, useAnimationFrame, useMotionValue, useReducedMotion, useTransform } from "motion/react";

import type { IntegrationAppLogo } from "../content";
import { FIGMA_INTEGRATION_CARD_FRAME, type IntegrationCardVisualRecipe } from "../integration-card-visuals";
import { IntegrationOrbitChip } from "./integration-orbit-chip";
import {
  getOrbitAnchorProgresses,
  getOrbitAnimatedState,
  getOrbitEllipseFromSlots,
  getOrbitPointAtProgress,
} from "@/lib/site/integrations";

const ORBIT_HOVER_STEP_MS = 1800;

interface AnimatedOrbitNodeProps {
  app: IntegrationAppLogo;
  anchorProgresses: readonly number[];
  cardHeight: number;
  cardWidth: number;
  cardVariant: IntegrationCardVisualRecipe["cardVariant"];
  ellipse: ReturnType<typeof getOrbitEllipseFromSlots>;
  index: number;
  phase: MotionValue<number>;
  slotSizePx: number;
}

function AnimatedOrbitNode({
  app,
  anchorProgresses,
  cardHeight,
  cardWidth,
  cardVariant,
  ellipse,
  index,
  phase,
  slotSizePx,
}: AnimatedOrbitNodeProps) {
  const scaleX = cardWidth / FIGMA_INTEGRATION_CARD_FRAME.width;
  const scaleY = cardHeight / FIGMA_INTEGRATION_CARD_FRAME.height;
  const width = slotSizePx * scaleX;
  const height = slotSizePx * scaleY;
  const x = useTransform(phase, (latest) => {
    const orbitState = getOrbitAnimatedState(anchorProgresses, index, latest);
    const point = getOrbitPointAtProgress(orbitState.progress, ellipse, cardVariant);

    return point.x * scaleX - width / 2;
  });
  const y = useTransform(phase, (latest) => {
    const orbitState = getOrbitAnimatedState(anchorProgresses, index, latest);
    const point = getOrbitPointAtProgress(orbitState.progress, ellipse, cardVariant);

    return point.y * scaleY - height / 2;
  });
  const opacity = useTransform(phase, (latest) => getOrbitAnimatedState(anchorProgresses, index, latest).opacity);
  const zIndex = useTransform(opacity, (latest) => (latest > 0.05 ? 3 : 1));

  return (
    <motion.div
      aria-hidden="true"
      className="integration-orbit-card__orbit-node integration-orbit-card__orbit-node--animated"
      style={{
        height,
        left: 0,
        opacity,
        top: 0,
        width,
        x,
        y,
        zIndex,
      }}
    >
      <IntegrationOrbitChip app={app} className="integration-orbit-card__orbit-anchor" slotSizePx={slotSizePx} />
    </motion.div>
  );
}

export interface IntegrationOrbitAnimatedChipsProps {
  apps: readonly IntegrationAppLogo[];
  cardSize: {
    height: number;
    width: number;
  };
  isHovered: boolean;
  visualRecipe: IntegrationCardVisualRecipe;
}

export function IntegrationOrbitAnimatedChips({
  apps,
  cardSize,
  isHovered,
  visualRecipe,
}: IntegrationOrbitAnimatedChipsProps) {
  const prefersReducedMotion = useReducedMotion();
  const phase = useMotionValue(0);
  const slotSizePx = visualRecipe.visibleSlots[0]?.sizePx ?? 0;
  const shouldAnimate =
    isHovered &&
    !prefersReducedMotion &&
    apps.length > visualRecipe.visibleSlots.length &&
    cardSize.width > 0 &&
    cardSize.height > 0 &&
    slotSizePx > 0;

  const anchorProgresses = getOrbitAnchorProgresses(
    visualRecipe.visibleSlots,
    visualRecipe.cardVariant,
    apps.length,
    visualRecipe.visibleSlots.length,
  );
  const ellipse = getOrbitEllipseFromSlots(visualRecipe.visibleSlots, visualRecipe.cardVariant);

  useEffect(() => {
    phase.set(0);
  }, [apps, phase, shouldAnimate, visualRecipe.cardVariant]);

  useAnimationFrame((_, delta) => {
    if (!shouldAnimate || !delta) {
      return;
    }

    phase.set((phase.get() + delta / ORBIT_HOVER_STEP_MS) % apps.length);
  });

  if (!shouldAnimate) {
    return null;
  }

  return apps.map((app, index) => (
    <AnimatedOrbitNode
      anchorProgresses={anchorProgresses}
      app={app}
      cardHeight={cardSize.height}
      cardVariant={visualRecipe.cardVariant}
      cardWidth={cardSize.width}
      ellipse={ellipse}
      index={index}
      key={`${visualRecipe.cardVariant}-${apps.length}-${app.id}`}
      phase={phase}
      slotSizePx={slotSizePx}
    />
  ));
}
