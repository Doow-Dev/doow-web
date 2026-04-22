import type { ComponentPropsWithoutRef } from "react";

import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "badge-base",
  {
    variants: {
      variant: {
        accent: "badge-accent",
        muted: "badge-muted",
        neutral: "badge-neutral",
        overlay: "badge-overlay",
        faq: "badge-muted",
        saasIntelligence: "badge-saas-intelligence",
        current: "badge-comparison-current",
        bestFit: "badge-comparison-best-fit",
      },
    },
    defaultVariants: {
      variant: "accent",
    },
  }
);

export type BadgeVariant = NonNullable<VariantProps<typeof badgeVariants>["variant"]>;

export interface BadgeProps extends ComponentPropsWithoutRef<"span">, VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant, className }))} {...props} />;
}
