import type { ReactNode } from "react";

import { Container, type ContainerProps } from "@/components/system";

type LandingSectionVariant = Extract<
  NonNullable<ContainerProps["variant"]>,
  "landing" | "landingWide"
>;

export interface LandingSectionShellProps {
  children: ReactNode;
  className?: string;
  layoutShell: "landingHeroShell" | "landingSectionShell";
  section:
    | "hero"
    | "demo"
    | "feature-split"
    | "finance-control"
    | "alternative-apps"
    | "doow-ai"
    | "pricing"
    | "faq"
    | "integrations";
  variant: LandingSectionVariant;
}

export function LandingSectionShell({ children, className, layoutShell, section, variant }: LandingSectionShellProps) {
  return (
    <Container className={className} data-layout-shell={layoutShell} data-section={section} variant={variant}>
      {children}
    </Container>
  );
}
