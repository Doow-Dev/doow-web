import type { ReactNode } from "react";
import type { Metadata } from "next";

import { SitePageSectionShell } from "@/app/(site-pages)/_components/site-page-section-shell";
import { SiteFaqSection } from "@/components/layout/faq";

import { DoowAiActionSection } from "./components/doow-ai-action-section";
import { DoowAiFeaturesSection } from "./components/doow-ai-features-section";
import { DoowAiHeroSection } from "./components/doow-ai-hero-section";
import { doowAiPageContent } from "./content";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.doow.co";

export const metadata: Metadata = {
  title: "Doow AI",
  description: "Learn how Doow AI helps finance teams explore spend, licenses, and renewals in plain language.",
  openGraph: {
    title: "Doow AI | Doow",
    description: "Learn how Doow AI helps finance teams explore spend, licenses, and renewals in plain language.",
    url: `${siteUrl}/doow-ai`,
    type: "website",
  },
};

function FaqShell({ children }: { children: ReactNode }) {
  return <SitePageSectionShell section="faq">{children}</SitePageSectionShell>;
}

export default function DoowAiPage() {
  return (
    <>
      <DoowAiHeroSection />
      {doowAiPageContent.actionSections.map((section) => (
        <DoowAiActionSection key={section.id} section={section} />
      ))}
      <DoowAiFeaturesSection content={doowAiPageContent.features} />
      <SiteFaqSection Shell={FaqShell} content={doowAiPageContent.faq} />
    </>
  );
}
