import type { ReactNode } from "react";

import { Badge, type BadgeVariant } from "@/components/system/badge";
import { cn } from "@/lib/utils";

export interface SectionHeadingProps {
  eyebrow?: string;
  eyebrowVariant?: BadgeVariant;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  scale?: "section" | "hero";
  headingTag?: "h1" | "h2" | "h3";
  className?: string;
  stackClassName?: string;
  titleClassName?: string;
  descriptionClassName?: string;
}

export function SectionHeading({
  eyebrow,
  eyebrowVariant = "accent",
  title,
  description,
  align = "left",
  scale = "section",
  headingTag,
  className,
  stackClassName,
  titleClassName,
  descriptionClassName,
}: SectionHeadingProps) {
  const isCentered = align === "center";
  const isHero = scale === "hero";
  const TitleTag = headingTag ?? (isHero ? "h1" : "h2");

  return (
    <div
      className={cn(
        "section-heading-shell",
        isCentered ? "items-center text-center" : "items-start text-left",
      className
      )}
    >
      {eyebrow ? <Badge variant={eyebrowVariant}>{eyebrow}</Badge> : null}
      <div className={cn(isHero ? "section-heading-stack-hero" : "section-heading-stack", stackClassName)}>
        <TitleTag
          className={cn(
            isHero ? "text-display-hero text-on-hero" : "text-section-title",
            isCentered && "mx-auto",
            titleClassName
          )}
        >
          {title}
        </TitleTag>
        {description ? (
          <p
            className={cn(
              isHero ? "measure-copy-hero text-lead-hero text-on-hero" : "measure-copy text-section-description",
              isCentered && "mx-auto",
              descriptionClassName
            )}
          >
            {description}
          </p>
        ) : null}
      </div>
    </div>
  );
}
