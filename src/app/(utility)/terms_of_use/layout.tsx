import type { ReactNode } from "react";

import { Container } from "@/components/system";

export default function TermsOfUseLayout({ children }: { children: ReactNode }) {
  return (
    <Container className="py-16 md:py-24" data-layout-shell="legalReadableShell" variant="readable">
      {children}
    </Container>
  );
}
