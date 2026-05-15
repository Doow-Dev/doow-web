import type { ReactNode } from "react";
import type { Metadata } from "next";

import { SitePageSectionShell } from "@/app/(site-pages)/_components/site-page-section-shell";
import { IntegrationsConnectionsSection } from "@/app/(site-pages)/integrations/components/integrations-connections-section";
import { IntegrationListSection } from "@/app/(site-pages)/integrations/components/integration-list-section";
import { IntegrationsHeroSection } from "@/app/(site-pages)/integrations/components/integrations-hero-section";
import { SiteFaqSection } from "@/components/layout/faq";
import { JsonLd, buildBreadcrumbJsonLd, buildFaqJsonLd, buildSiteMetadata, buildWebPageJsonLd, siteRouteSeo } from "@/lib/seo/site";

import { integrationsPageContent } from "./content";

export const metadata: Metadata = buildSiteMetadata(siteRouteSeo.integrations);

function FaqShell({ children }: { children: ReactNode }) {
  return <SitePageSectionShell section="faq">{children}</SitePageSectionShell>;
}

export default function IntegrationsPage() {
  const faqJsonLd = buildFaqJsonLd(integrationsPageContent.faq);

  return (
    <>
      <JsonLd data={buildWebPageJsonLd(siteRouteSeo.integrations)} />
      <JsonLd data={buildBreadcrumbJsonLd([{ href: "/", label: "Home" }, { href: "/integrations", label: "Integrations" }])} />
      {faqJsonLd ? <JsonLd data={faqJsonLd} /> : null}
      <IntegrationsHeroSection />
      <IntegrationListSection />
      <IntegrationsConnectionsSection />
      <SiteFaqSection Shell={FaqShell} content={integrationsPageContent.faq} />
    </>
  );
}
