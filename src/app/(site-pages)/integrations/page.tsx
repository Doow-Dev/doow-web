import type { ReactNode } from "react";
import type { Metadata } from "next";

import { SitePageSectionShell } from "@/app/(site-pages)/_components/site-page-section-shell";
import { IntegrationsConnectionsSection } from "@/app/(site-pages)/integrations/components/integrations-connections-section";
import { IntegrationListSection } from "@/app/(site-pages)/integrations/components/integration-list-section";
import { IntegrationsHeroSection } from "@/app/(site-pages)/integrations/components/integrations-hero-section";
import { SiteFaqSection } from "@/components/layout/faq";

import { integrationsPageContent } from "./content";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.doow.co";
const integrationsDescription = "Bring identity, finance, and HR data together so everything stays up to date.";

export const metadata: Metadata = {
  title: "Integrations",
  description: integrationsDescription,
  openGraph: {
    title: "Integrations | Doow",
    description: integrationsDescription,
    url: `${siteUrl}/integrations`,
    type: "website",
  },
};

function FaqShell({ children }: { children: ReactNode }) {
  return <SitePageSectionShell section="faq">{children}</SitePageSectionShell>;
}

export default function IntegrationsPage() {
  return (
    <>
      <IntegrationsHeroSection />
      <IntegrationListSection />
      <IntegrationsConnectionsSection />
      <SiteFaqSection Shell={FaqShell} content={integrationsPageContent.faq} />
    </>
  );
}
