import type { ReactNode } from "react";

import type { Metadata } from "next";

import { SitePageSectionShell } from "@/app/(site-pages)/_components/site-page-section-shell";
import { SubscriptionsHeroSection } from "@/app/(site-pages)/subscriptions/components/subscriptions-hero-section";
import { SubscriptionsManualTrackingSection } from "@/app/(site-pages)/subscriptions/components/subscriptions-manual-tracking-section";
import { SubscriptionsOverviewSection } from "@/app/(site-pages)/subscriptions/components/subscriptions-overview-section";
import { SiteFaqSection } from "@/components/layout/faq";
import { JsonLd, buildBreadcrumbJsonLd, buildFaqJsonLd, buildSiteMetadata, buildWebPageJsonLd, siteRouteSeo } from "@/lib/seo/site";

import { subscriptionsPageContent } from "./content";

export const metadata: Metadata = buildSiteMetadata(siteRouteSeo.subscriptions);

function FaqShell({ children }: { children: ReactNode }) {
  return <SitePageSectionShell section="faq">{children}</SitePageSectionShell>;
}

export default function SubscriptionsPage() {
  const faqJsonLd = buildFaqJsonLd(subscriptionsPageContent.faq);

  return (
    <>
      <JsonLd data={buildWebPageJsonLd(siteRouteSeo.subscriptions)} />
      <JsonLd data={buildBreadcrumbJsonLd([{ href: "/", label: "Home" }, { href: "/subscriptions", label: "Subscriptions" }])} />
      {faqJsonLd ? <JsonLd data={faqJsonLd} /> : null}
      <SubscriptionsHeroSection />
      <SubscriptionsManualTrackingSection />
      <SubscriptionsOverviewSection />
      <SiteFaqSection Shell={FaqShell} content={subscriptionsPageContent.faq} />
    </>
  );
}
