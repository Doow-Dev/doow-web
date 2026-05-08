import type { ReactNode } from "react";

import { Container } from "@/components/system";

export interface SitePageSectionShellProps {
  children: ReactNode;
  className?: string;
  section: string;
}

export function SitePageSectionShell({ children, className, section }: SitePageSectionShellProps) {
  return (
    <Container
      className={className}
      data-layout-shell="sitePageSectionShell"
      data-section={section}
      variant="landing"
    >
      {children}
    </Container>
  );
}
