import type { ReactNode } from "react";

import { SitePageSectionShell } from "@/app/(site-pages)/_components/site-page-section-shell";
import { SiteFaqSection } from "@/components/layout/faq";

import { applicationsPageContent } from "./content";

function FaqShell({ children }: { children: ReactNode }) {
  return <SitePageSectionShell section="faq">{children}</SitePageSectionShell>;
}

export default function ApplicationsPage() {
  return <SiteFaqSection Shell={FaqShell} content={applicationsPageContent.faq} />;
}
