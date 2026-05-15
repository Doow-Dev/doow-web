import type { Metadata } from "next";

import { AlternativeAppsFeaturedSection } from "@/app/(site-pages)/alternative-apps/components/alternative-apps-featured-section";
import { AlternativeAppsHeroCatalogSection } from "@/app/(site-pages)/alternative-apps/components/alternative-apps-hero-catalog-section";
import { JsonLd, buildBreadcrumbJsonLd, buildSiteMetadata, buildWebPageJsonLd, siteRouteSeo } from "@/lib/seo/site";

export const metadata: Metadata = buildSiteMetadata(siteRouteSeo.alternativeApps);

export default function AlternativeAppsPage() {
  return (
    <>
      <JsonLd data={buildWebPageJsonLd(siteRouteSeo.alternativeApps)} />
      <JsonLd data={buildBreadcrumbJsonLd([{ href: "/", label: "Home" }, { href: "/alternative-apps", label: "Alternative Apps" }])} />
      <AlternativeAppsHeroCatalogSection />
      <AlternativeAppsFeaturedSection />
    </>
  );
}
