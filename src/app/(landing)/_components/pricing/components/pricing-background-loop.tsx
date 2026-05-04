"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useReducedMotion } from "motion/react";

import type { SiteAssetEntry } from "@/lib/assets/site";

const PRICING_BACKGROUND_FADE_INTERVAL_MS = 5000;

export interface PricingBackgroundLoopProps {
  backgrounds: readonly SiteAssetEntry[];
}

export function PricingBackgroundLoop({ backgrounds }: PricingBackgroundLoopProps) {
  const prefersReducedMotion = useReducedMotion() ?? false;
  const [activeIndex, setActiveIndex] = useState(0);
  const shouldAnimate = backgrounds.length > 1 && !prefersReducedMotion;
  const displayedIndex = shouldAnimate ? activeIndex : 0;

  useEffect(() => {
    if (!shouldAnimate) {
      return;
    }

    const intervalId = window.setInterval(() => {
      setActiveIndex((currentIndex) => (currentIndex + 1) % backgrounds.length);
    }, PRICING_BACKGROUND_FADE_INTERVAL_MS);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [backgrounds.length, shouldAnimate]);

  if (backgrounds.length === 0) {
    return null;
  }

  return (
    <div aria-hidden="true" className="pricing__backgrounds">
      <div className="pricing__background-track">
        {backgrounds.map((background, index) => (
          <div
            className={[
              "pricing__background-slide",
              shouldAnimate ? "pricing__background-slide--animated" : "",
            ]
              .filter(Boolean)
              .join(" ")}
            data-active={index === displayedIndex ? "true" : "false"}
            key={background.id}
          >
            <Image
              fill
              alt=""
              aria-hidden="true"
              className="pricing__background-image"
              loading={index === 0 ? "eager" : "lazy"}
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
