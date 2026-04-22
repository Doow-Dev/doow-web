import type { ComponentType, ReactNode } from "react";

import Image from "next/image";

import { landingHeroContent } from "../content";
import { HeroContent } from "./hero-content";
import { HERO_BLUR_DATA_URL } from "@/lib/assets/blur-placeholders";

export interface HeroSectionProps {
  Shell: ComponentType<{ children: ReactNode }>;
}

export function HeroSection({ Shell }: HeroSectionProps) {
  const hero = landingHeroContent;

  return (
    <section aria-label="Doow landing hero" className="hero-surface" id="hero">
      <Image
        fill
        alt=""
        aria-hidden="true"
        blurDataURL={HERO_BLUR_DATA_URL}
        className="hero-media"
        placeholder="blur"
        priority
        quality={90}
        sizes="100vw"
        src={hero.background.src}
      />
      <div aria-hidden="true" className="hero-overlay" />

      <div className="hero-layout">
        <HeroContent content={hero} Shell={Shell} />
      </div>
    </section>
  );
}
