import type { ReactNode } from "react";

import { Container } from "@/components/system";

export default function SignInLayout({ children }: { children: ReactNode }) {
  return (
    <Container className="section-shell" data-layout-shell="signInShell" variant="signIn">
      {children}
    </Container>
  );
}
