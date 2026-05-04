import type { Metadata } from "next";

import { AlternativeAppsFeaturedSection } from "@/app/(site-pages)/alternative-apps/components/alternative-apps-featured-section";
import { AlternativeAppsHeroCatalogSection } from "@/app/(site-pages)/alternative-apps/components/alternative-apps-hero-catalog-section";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.doow.co";
const alternativeAppsDescription = "Explore alternatives to your current stack and find the right tool for your team.";

export const metadata: Metadata = {
  title: "Alternative Apps",
  description: alternativeAppsDescription,
  openGraph: {
    title: "Alternative Apps | Doow",
    description: alternativeAppsDescription,
    url: `${siteUrl}/alternative-apps`,
    type: "website",
  },
};

export default function AlternativeAppsPage() {
  return (
    <>
      <AlternativeAppsHeroCatalogSection />
      <AlternativeAppsFeaturedSection />
    </>
  );
}
