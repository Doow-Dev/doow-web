import type { ComponentPropsWithoutRef } from "react";

import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../lib/utils";

const cardVariants = cva("surface-card", {
  variants: {
    padding: {
      sm: "p-4",
      md: "p-6",
      lg: "p-8",
    },
    tone: {
      default: "bg-card",
      subtle: "bg-secondary",
    },
  },
  defaultVariants: {
    padding: "md",
    tone: "default",
  },
});

export interface CardProps extends ComponentPropsWithoutRef<"div">, VariantProps<typeof cardVariants> {}

export function Card({ className, padding, tone, ...props }: CardProps) {
  return <div className={cn(cardVariants({ padding, tone, className }))} {...props} />;
}
