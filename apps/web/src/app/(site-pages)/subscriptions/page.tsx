import type { ReactNode } from "react";

import type { Metadata } from "next";

import { SitePageSectionShell } from "@/app/(site-pages)/_components/site-page-section-shell";
import { SubscriptionsHeroSection } from "@/app/(site-pages)/subscriptions/components/subscriptions-hero-section";
import { SubscriptionsManualTrackingSection } from "@/app/(site-pages)/subscriptions/components/subscriptions-manual-tracking-section";
import { SubscriptionsOverviewSection } from "@/app/(site-pages)/subscriptions/components/subscriptions-overview-section";
import { SiteFaqSection } from "@/components/layout/faq";

import { subscriptionsPageContent } from "./content";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.doow.co";
const subscriptionsDescription =
  "Keep contracts, licenses, and renewals in one place with clearer subscription visibility and governance.";

export const metadata: Metadata = {
  title: "Subscriptions",
  description: subscriptionsDescription,
  openGraph: {
    title: "Subscriptions | Doow",
    description: subscriptionsDescription,
    url: `${siteUrl}/subscriptions`,
    type: "website",
  },
};

function FaqShell({ children }: { children: ReactNode }) {
  return <SitePageSectionShell section="faq">{children}</SitePageSectionShell>;
}

export default function SubscriptionsPage() {
  return (
    <>
      <SubscriptionsHeroSection />
      <SubscriptionsManualTrackingSection />
      <SubscriptionsOverviewSection />
      <SiteFaqSection Shell={FaqShell} content={subscriptionsPageContent.faq} />
    </>
  );
}
