"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import type { CSSProperties } from "react";
import { useReducedMotion } from "motion/react";

import type { SiteAssetEntry } from "@/lib/assets/site";

const PRICING_BACKGROUND_SLIDE_INTERVAL_MS = 9000;
const PRICING_BACKGROUND_SLIDE_DURATION_MS = 3200;

export interface PricingBackgroundLoopProps {
  backgrounds: readonly SiteAssetEntry[];
}

export function PricingBackgroundLoop({ backgrounds }: PricingBackgroundLoopProps) {
  const prefersReducedMotion = useReducedMotion() ?? false;
  const [activeIndex, setActiveIndex] = useState(0);
  const [isTransitionEnabled, setIsTransitionEnabled] = useState(true);
  const shouldAnimate = backgrounds.length > 1 && !prefersReducedMotion;
  const loopedBackgrounds =
    backgrounds.length === 0 ? [] : shouldAnimate ? [...backgrounds, backgrounds[0]] : backgrounds;
  const backgroundCount = loopedBackgrounds.length || 1;
  const displayedIndex = shouldAnimate ? activeIndex : 0;
  const trackTransitionEnabled = shouldAnimate && isTransitionEnabled;
  const translateOffset = loopedBackgrounds.length > 0 ? (displayedIndex * 100) / backgroundCount : 0;

  useEffect(() => {
    if (!shouldAnimate) {
      return;
    }

    const intervalId = window.setInterval(() => {
      setActiveIndex((currentIndex) => (currentIndex >= backgrounds.length ? currentIndex : currentIndex + 1));
    }, PRICING_BACKGROUND_SLIDE_INTERVAL_MS);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [backgrounds.length, shouldAnimate]);

  useEffect(() => {
    if (!shouldAnimate || activeIndex !== backgrounds.length) {
      return;
    }

    const resetTimeoutId = window.setTimeout(() => {
      setIsTransitionEnabled(false);
      setActiveIndex(0);
    }, PRICING_BACKGROUND_SLIDE_DURATION_MS + 80);

    return () => {
      window.clearTimeout(resetTimeoutId);
    };
  }, [activeIndex, backgrounds.length, shouldAnimate]);

  useEffect(() => {
    if (!shouldAnimate || isTransitionEnabled) {
      return;
    }

    const resetId = window.requestAnimationFrame(() => {
      setIsTransitionEnabled(true);
    });

    return () => {
      window.cancelAnimationFrame(resetId);
    };
  }, [isTransitionEnabled, shouldAnimate]);

  const handleTransitionEnd = () => {
    if (!shouldAnimate || activeIndex !== backgrounds.length) {
      return;
    }

    setIsTransitionEnabled(false);
    setActiveIndex(0);
  };

  const trackStyle = {
    "--pricing-background-count": backgroundCount,
    transform: `translate3d(-${translateOffset}%, 0, 0)`,
    transitionDuration: trackTransitionEnabled ? `${PRICING_BACKGROUND_SLIDE_DURATION_MS}ms` : "0ms",
  } as CSSProperties;

  if (backgrounds.length === 0) {
    return null;
  }

  return (
    <div aria-hidden="true" className="pricing__backgrounds">
      <div
        onTransitionEnd={handleTransitionEnd}
        className={[
          "pricing__background-track",
          shouldAnimate ? "pricing__background-track--animated" : "",
        ]
          .filter(Boolean)
          .join(" ")}
        style={trackStyle}
      >
        {loopedBackgrounds.map((background, index) => (
          <div className="pricing__background-slide" key={`${background.id}-${index}`}>
            <Image
              fill
              alt=""
              aria-hidden="true"
              className="pricing__background-image"
              loading={index < 2 ? "eager" : "lazy"}
              quality={80}
              sizes="100vw"
              src={background.src}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
