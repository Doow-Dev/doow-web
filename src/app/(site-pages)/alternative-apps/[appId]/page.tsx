import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { AlternativeAppDetailsSection } from "@/app/(site-pages)/alternative-apps/components/alternative-app-details-section";
import { getAlternativeAppDetailsResponse } from "@/lib/server/alternative-apps-service";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.doow.co";

export async function generateMetadata({ params }: { params: Promise<{ appId: string }> }): Promise<Metadata> {
  const { appId } = await params;
  const details = await getAlternativeAppDetailsResponse(appId);

  if (!details) {
    return {
      title: "Alternative App Not Found",
    };
  }

  const description = `Compare ${details.app.name} against alternative applications for spend, fit, migration, integrations, and security.`;

  return {
    title: `${details.app.name} Alternatives`,
    description,
    openGraph: {
      title: `${details.app.name} Alternatives | Doow`,
      description,
      url: `${siteUrl}/alternative-apps/${details.app.slug}`,
      type: "website",
    },
  };
}

export default async function AlternativeAppDetailsPage({ params }: { params: Promise<{ appId: string }> }) {
  const { appId } = await params;
  const details = await getAlternativeAppDetailsResponse(appId);

  if (!details) {
    notFound();
  }

  return <AlternativeAppDetailsSection details={details} />;
}
