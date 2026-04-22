import type { ReactNode } from "react";

import { UtilityRouteShell } from "@/app/_components/utility-page-shell";

export default function UtilityLayout({ children }: { children: ReactNode }) {
  return <UtilityRouteShell>{children}</UtilityRouteShell>;
}
