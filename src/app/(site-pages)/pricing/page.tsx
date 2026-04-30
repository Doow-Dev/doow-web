import type { ReactNode } from "react";

import type { Metadata } from "next";

import { SitePageSectionShell } from "@/app/(site-pages)/_components/site-page-section-shell";
import { PricingPlansSection } from "@/app/(site-pages)/pricing/components/pricing-plans-section";
import { SiteFaqSection } from "@/components/layout/faq";

import { pricingPageContent } from "./content";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.doow.co";
const pricingDescription = "Choose the Doow plan that fits your team and start finding SaaS savings faster.";

export const metadata: Metadata = {
  title: "Pricing",
  description: pricingDescription,
  openGraph: {
    title: "Pricing | Doow",
    description: pricingDescription,
    url: `${siteUrl}/pricing`,
    type: "website",
  },
};

function FaqShell({ children }: { children: ReactNode }) {
  return <SitePageSectionShell section="faq">{children}</SitePageSectionShell>;
}

export default function PricingPage() {
  return (
    <>
      <PricingPlansSection />
      <SiteFaqSection Shell={FaqShell} content={pricingPageContent.faq} />
    </>
  );
}
