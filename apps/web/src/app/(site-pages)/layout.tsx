import type { ReactNode } from "react";

import "@/components/layout/shared/styles/index.css";
import "@/components/layout/faq/styles/index.css";
import "@/components/layout/footer/styles/index.css";

import { GlobalSiteNavbar } from "@/app/_components/global-site-navbar";
import { SiteFooterBody, siteFooterBodyContent } from "@/components/layout/footer";

export default function SitePagesLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-white text-foreground" data-layout-shell="utilityPageShell">
      <GlobalSiteNavbar />
      {children}
      <SiteFooterBody body={siteFooterBodyContent} />
    </div>
  );
}
