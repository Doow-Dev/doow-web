import type { ReactNode } from "react";

import "@/app/_components/terms-privacy.css";
import "@/components/layout/footer/styles/index.css";

import { UtilityRouteShell } from "@/app/_components/utility-page-shell";

export default function UtilityLayout({ children }: { children: ReactNode }) {
  return <UtilityRouteShell>{children}</UtilityRouteShell>;
}
