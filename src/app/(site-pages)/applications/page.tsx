import type { ReactNode } from "react";

import type { Metadata } from "next";

import { SitePageSectionShell } from "@/app/(site-pages)/_components/site-page-section-shell";
import { ApplicationsFeaturesSolutionsSection } from "@/app/(site-pages)/applications/components/applications-features-solutions-section";
import { ApplicationsHeroSection } from "@/app/(site-pages)/applications/components/applications-hero-section";
import { ApplicationsProblemsSection } from "@/app/(site-pages)/applications/components/applications-problems-section";
import { SiteFaqSection } from "@/components/layout/faq";

import { applicationsPageContent } from "./content";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.doow.co";
const applicationsDescription =
  "See every app your company is paying for. Discover tools your teams use, how often they're used, and where money might be slipping away.";

export const metadata: Metadata = {
  title: "Applications",
  description: applicationsDescription,
  openGraph: {
    title: "Applications | Doow",
    description: applicationsDescription,
    url: `${siteUrl}/applications`,
    type: "website",
  },
};

function FaqShell({ children }: { children: ReactNode }) {
  return <SitePageSectionShell section="faq">{children}</SitePageSectionShell>;
}

export default function ApplicationsPage() {
  return (
    <>
      <ApplicationsHeroSection />
      <ApplicationsProblemsSection />
      <ApplicationsFeaturesSolutionsSection />
      <SiteFaqSection Shell={FaqShell} content={applicationsPageContent.faq} />
    </>
  );
}
