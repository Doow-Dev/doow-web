import type { ComponentPropsWithoutRef } from "react";

import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const containerVariants = cva("", {
  variants: {
    variant: {
      utilityShell: "container-shell-utility",
      landing: "container-shell-landing",
      landingWide: "container-shell-landing-wide",
      siteFooterPromo: "container-shell-site-footer-promo",
      siteFooterBody: "container-shell-site-footer-body",
      landingFooterPromo: "container-shell-site-footer-promo",
      landingFooterBody: "container-shell-site-footer-body",
      readable: "container-shell-readable",
      signIn: "container-shell-sign-in",
    },
  },
  defaultVariants: {
    variant: "utilityShell",
  },
});

export interface ContainerProps extends ComponentPropsWithoutRef<"div">, VariantProps<typeof containerVariants> {}

export function Container({ className, variant, ...props }: ContainerProps) {
  const resolvedVariant = variant ?? "utilityShell";

  return (
    <div
      className={cn(containerVariants({ variant: resolvedVariant }), className)}
      data-layout-container="true"
      data-layout-variant={resolvedVariant}
      {...props}
    />
  );
}
