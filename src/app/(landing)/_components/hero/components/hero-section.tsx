import type { ComponentType, ReactNode } from "react";

import { getImageProps } from "next/image";

import { landingHeroContent } from "../content";
import { HeroContent } from "./hero-content";
import { HERO_BLUR_DATA_URL } from "@/lib/assets/blur-placeholders";
import type { SiteAssetEntry } from "@/lib/assets/site";

export interface HeroSectionProps {
  Shell: ComponentType<{ children: ReactNode }>;
}

interface HeroBackgroundProps {
  compactBackground: SiteAssetEntry;
  desktopBackground: SiteAssetEntry;
}

function HeroBackground({ compactBackground, desktopBackground }: HeroBackgroundProps) {
  const commonImageProps = {
    alt: "",
    className: "hero-media",
    decoding: "async" as const,
    fill: true,
    fetchPriority: "high" as const,
    loading: "eager" as const,
    placeholder: "blur" as const,
    quality: 80,
    sizes: "100vw",
  };
  const {
    props: { srcSet: desktopSrcSet, sizes: desktopSizes },
  } = getImageProps({
    ...commonImageProps,
    blurDataURL: HERO_BLUR_DATA_URL,
    src: desktopBackground.src,
  });
  const { props: compactImageProps } = getImageProps({
    ...commonImageProps,
    blurDataURL: HERO_BLUR_DATA_URL,
    src: compactBackground.src,
  });

  return (
    <picture>
      <source media="(min-width: 1025px)" sizes={desktopSizes} srcSet={desktopSrcSet} />
      <img {...compactImageProps} alt="" />
    </picture>
  );
}

export function HeroSection({ Shell }: HeroSectionProps) {
  const hero = landingHeroContent;

  return (
    <section aria-label="Doow landing hero" className="hero-surface" id="hero">
      <HeroBackground compactBackground={hero.compactBackground} desktopBackground={hero.background} />
      <div aria-hidden="true" className="hero-overlay" />

      <div className="hero-layout">
        <HeroContent content={hero} Shell={Shell} />
      </div>
    </section>
  );
}
