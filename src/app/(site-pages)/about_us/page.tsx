import type { Metadata } from "next";

import { AboutUsHeroSection } from "@/app/(site-pages)/about_us/components/about-us-hero-section";
import { AboutUsPrinciplesSection } from "@/app/(site-pages)/about_us/components/about-us-principles-section";
import { AboutUsTeamSection } from "@/app/(site-pages)/about_us/components/about-us-team-section";
import { JsonLd, buildBreadcrumbJsonLd, buildSiteMetadata, buildWebPageJsonLd, siteRouteSeo } from "@/lib/seo/site";

export const metadata: Metadata = buildSiteMetadata(siteRouteSeo.aboutUs);

export default function AboutUsPage() {
  return (
    <>
      <JsonLd data={buildWebPageJsonLd(siteRouteSeo.aboutUs)} />
      <JsonLd data={buildBreadcrumbJsonLd([{ href: "/", label: "Home" }, { href: "/about_us", label: "About Us" }])} />
      <AboutUsHeroSection />
      <AboutUsPrinciplesSection />
      <AboutUsTeamSection />
    </>
  );
}
