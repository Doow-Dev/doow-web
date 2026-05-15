import type { ReactNode } from "react";
import type { Metadata } from "next";

import { SitePageSectionShell } from "@/app/(site-pages)/_components/site-page-section-shell";
import { SiteFaqSection } from "@/components/layout/faq";
import { JsonLd, buildBreadcrumbJsonLd, buildFaqJsonLd, buildSiteMetadata, buildWebPageJsonLd, siteRouteSeo } from "@/lib/seo/site";

import { DoowAiActionSection } from "./components/doow-ai-action-section";
import { DoowAiFeaturesSection } from "./components/doow-ai-features-section";
import { DoowAiHeroSection } from "./components/doow-ai-hero-section";
import { doowAiPageContent } from "./content";

export const metadata: Metadata = buildSiteMetadata(siteRouteSeo.doowAi);

function FaqShell({ children }: { children: ReactNode }) {
  return <SitePageSectionShell section="faq">{children}</SitePageSectionShell>;
}

export default function DoowAiPage() {
  const faqJsonLd = buildFaqJsonLd(doowAiPageContent.faq);

  return (
    <>
      <JsonLd data={buildWebPageJsonLd(siteRouteSeo.doowAi)} />
      <JsonLd data={buildBreadcrumbJsonLd([{ href: "/", label: "Home" }, { href: "/doow-ai", label: "Doow AI" }])} />
      {faqJsonLd ? <JsonLd data={faqJsonLd} /> : null}
      <DoowAiHeroSection />
      {doowAiPageContent.actionSections.map((section) => (
        <DoowAiActionSection key={section.id} section={section} />
      ))}
      <DoowAiFeaturesSection content={doowAiPageContent.features} />
      <SiteFaqSection Shell={FaqShell} content={doowAiPageContent.faq} />
    </>
  );
}
