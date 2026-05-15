import type { ReactNode } from "react";

import type { Metadata } from "next";

import { SitePageSectionShell } from "@/app/(site-pages)/_components/site-page-section-shell";
import { ApplicationsFeaturesSolutionsSection } from "@/app/(site-pages)/applications/components/applications-features-solutions-section";
import { ApplicationsHeroSection } from "@/app/(site-pages)/applications/components/applications-hero-section";
import { ApplicationsProblemsSection } from "@/app/(site-pages)/applications/components/applications-problems-section";
import { SiteFaqSection } from "@/components/layout/faq";
import { JsonLd, buildBreadcrumbJsonLd, buildFaqJsonLd, buildSiteMetadata, buildWebPageJsonLd, siteRouteSeo } from "@/lib/seo/site";

import { applicationsPageContent } from "./content";

export const metadata: Metadata = buildSiteMetadata(siteRouteSeo.applications);

function FaqShell({ children }: { children: ReactNode }) {
  return <SitePageSectionShell section="faq">{children}</SitePageSectionShell>;
}

export default function ApplicationsPage() {
  const faqJsonLd = buildFaqJsonLd(applicationsPageContent.faq);

  return (
    <>
      <JsonLd data={buildWebPageJsonLd(siteRouteSeo.applications)} />
      <JsonLd data={buildBreadcrumbJsonLd([{ href: "/", label: "Home" }, { href: "/applications", label: "Applications" }])} />
      {faqJsonLd ? <JsonLd data={faqJsonLd} /> : null}
      <ApplicationsHeroSection />
      <ApplicationsProblemsSection />
      <ApplicationsFeaturesSolutionsSection />
      <SiteFaqSection Shell={FaqShell} content={applicationsPageContent.faq} />
    </>
  );
}
