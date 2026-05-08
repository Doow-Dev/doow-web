import type { ComponentType, ReactNode } from "react";

import Image from "next/image";
import Link from "next/link";
import { FaArrowDown } from "react-icons/fa";

import type { LandingHeroContent } from "../content";
import { HeroAnimatedAccent } from "./hero-animated-accent";
import { Button, CtaGroup } from "@/components/system";

function DemoArrowIcon() {
  return <FaArrowDown aria-hidden="true" className="size-3" />;
}

function HeroDemoPreviewThumb({ src }: Pick<LandingHeroContent["secondaryCtaPreview"], "src">) {
  return (
    <span className="hero-demo-preview">
      <Image fill alt="" aria-hidden="true" className="hero-demo-preview__image" quality={75} sizes="22px" src={src} />
      <span aria-hidden="true" className="hero-demo-preview__frame" />
    </span>
  );
}

export interface HeroContentProps {
  content: LandingHeroContent;
  Shell: ComponentType<{ children: ReactNode }>;
}

export function HeroContent({ content, Shell }: HeroContentProps) {
  return (
    <div className="hero-layout__content">
      <Shell>
        <div className="hero-content__frame">
          <div className="hero-copy">
            <div className="hero-title-frame mx-auto">
              <h1 className="hero-title">
                <span className="hero-title__line">{content.title.firstLine}</span>
                <span className="hero-title__line hero-title__line--accent">
                  <span>{content.title.secondLinePrefix}</span>
                  <span className="hero-title__accent-wrap">
                    <HeroAnimatedAccent words={content.title.accentWords} />
                  </span>
                </span>
              </h1>
            </div>

            <p className="hero-copy__lead text-body-sm-normal">{content.description}</p>

            <CtaGroup align="center" className="hero-copy__actions">
              <Button asChild size="base" variant="primary">
                <Link href={content.primaryCta.href}>{content.primaryCta.label}</Link>
              </Button>
              <Button
                asChild
                className="hero-copy__demo-button"
                leadingAdornment={<HeroDemoPreviewThumb src={content.secondaryCtaPreview.src} />}
                size="base"
                trailingAdornment={<DemoArrowIcon />}
                variant="secondary"
              >
                <Link href={content.secondaryCta.href}>{content.secondaryCta.label}</Link>
              </Button>
            </CtaGroup>
          </div>
        </div>
      </Shell>
    </div>
  );
}
