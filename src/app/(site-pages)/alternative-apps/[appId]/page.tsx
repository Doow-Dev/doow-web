import type { Metadata } from "next";

import { AlternativeAppDetailsEmptyState } from "@/app/(site-pages)/alternative-apps/components/alternative-app-details-empty-state";
import { AlternativeAppDetailsSection } from "@/app/(site-pages)/alternative-apps/components/alternative-app-details-section";
import { Container } from "@/components/system";
import { getAlternativeAppDetailsResponse } from "@/lib/server/alternative-apps-service";
import {
  JsonLd,
  buildBreadcrumbJsonLd,
  buildSiteMetadata,
  buildWebPageJsonLd,
  siteRouteSeo,
  type SiteRouteSeo,
} from "@/lib/seo/site";

export async function generateMetadata({ params }: { params: Promise<{ appId: string }> }): Promise<Metadata> {
  const { appId } = await params;
  let details = null;

  try {
    details = await getAlternativeAppDetailsResponse(appId);
  } catch (error) {
    console.error("Alternative app details metadata failed to load.", error);
  }

  if (!details) {
    return {
      title: "Alternative App Not Found",
      robots: {
        follow: false,
        index: false,
      },
    };
  }

  const description = `Compare ${details.app.name} against alternative applications for spend, fit, migration, integrations, and security.`;
  const route = {
    title: `${details.app.name} Alternatives`,
    description,
    path: `/alternative-apps/${details.app.slug}`,
    ogCategory: "Alternative Apps",
  } satisfies SiteRouteSeo;

  return buildSiteMetadata(route);
}

export default async function AlternativeAppDetailsPage({ params }: { params: Promise<{ appId: string }> }) {
  const { appId } = await params;
  let details = null;

  try {
    details = await getAlternativeAppDetailsResponse(appId);
  } catch (error) {
    console.error("Alternative app details failed to load.", error);
    return (
      <section aria-label="Alternative application details" className="alternative-app-details">
        <Container className="alternative-app-details__shell" variant="siteFooterPromo">
          <AlternativeAppDetailsEmptyState />
        </Container>
      </section>
    );
  }

  if (!details) {
    return (
      <section aria-label="Alternative application details" className="alternative-app-details">
        <Container className="alternative-app-details__shell" variant="siteFooterPromo">
          <AlternativeAppDetailsEmptyState />
        </Container>
      </section>
    );
  }

  const route = {
    title: `${details.app.name} Alternatives`,
    description: `Compare ${details.app.name} against alternative applications for spend, fit, migration, integrations, and security.`,
    path: `/alternative-apps/${details.app.slug}`,
    ogCategory: "Alternative Apps",
  } satisfies SiteRouteSeo;

  return (
    <>
      <JsonLd data={buildWebPageJsonLd(route)} />
      <JsonLd
        data={buildBreadcrumbJsonLd([
          { href: "/", label: "Home" },
          { href: siteRouteSeo.alternativeApps.path, label: "Alternative Apps" },
          { href: route.path, label: `${details.app.name} Alternatives` },
        ])}
      />
      <AlternativeAppDetailsSection details={details} />
    </>
  );
}
