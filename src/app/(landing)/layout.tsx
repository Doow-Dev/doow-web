import type { ReactNode } from "react";

import "@/app/(landing)/_components/header/styles/index.css";
import "@/app/(landing)/_components/hero/styles/index.css";
import "@/app/(landing)/_components/demo-video/styles/index.css";
import "@/app/(landing)/_components/feature-split/styles/index.css";
import "@/app/(landing)/_components/finance-control/styles/index.css";
import "@/app/(landing)/_components/alternative-apps/styles/index.css";
import "@/app/(landing)/_components/doow-ai/styles/index.css";
import "@/app/(landing)/_components/pricing/styles/index.css";
import "@/app/(landing)/_components/integrations/styles/index.css";
import "@/components/layout/shared/styles/index.css";
import "@/components/layout/faq/styles/index.css";
import "@/components/layout/footer/styles/index.css";

import { landingPageContent } from "@/app/(landing)/_components/landing-page-content";
import { LandingNavbar } from "@/app/(landing)/_components/header";

export default function LandingLayout({ children }: { children: ReactNode }) {
  const { header } = landingPageContent;

  return (
    <div className="landing-page" data-layout-shell="landingPageShell">
      <LandingNavbar content={header} />
      <main className="landing-page__main" data-layout-shell="landingPageMain">{children}</main>
    </div>
  );
}
