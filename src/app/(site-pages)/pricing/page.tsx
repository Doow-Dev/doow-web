import type { ReactNode } from "react";

import type { Metadata } from "next";

import { SitePageSectionShell } from "@/app/(site-pages)/_components/site-page-section-shell";
import { PricingPlansSection } from "@/app/(site-pages)/pricing/components/pricing-plans-section";
import { SiteFaqSection } from "@/components/layout/faq";
import { JsonLd, buildBreadcrumbJsonLd, buildFaqJsonLd, buildSiteMetadata, buildWebPageJsonLd, siteRouteSeo } from "@/lib/seo/site";

import { pricingPageContent } from "./content";

export const metadata: Metadata = buildSiteMetadata(siteRouteSeo.pricing);

function FaqShell({ children }: { children: ReactNode }) {
  return <SitePageSectionShell section="faq">{children}</SitePageSectionShell>;
}

export default function PricingPage() {
  const faqJsonLd = buildFaqJsonLd(pricingPageContent.faq);

  return (
    <>
      <JsonLd data={buildWebPageJsonLd(siteRouteSeo.pricing)} />
      <JsonLd data={buildBreadcrumbJsonLd([{ href: "/", label: "Home" }, { href: "/pricing", label: "Pricing" }])} />
      {faqJsonLd ? <JsonLd data={faqJsonLd} /> : null}
      <PricingPlansSection />
      <SiteFaqSection Shell={FaqShell} content={pricingPageContent.faq} />
    </>
  );
}
