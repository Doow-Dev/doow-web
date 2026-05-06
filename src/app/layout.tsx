import type { Metadata } from "next";
import { Inter, Sometype_Mono } from "next/font/google";

import "../styles/globals.css";
import "@/app/_components/global-site-navbar/styles/index.css";
import { cn } from "@/lib/utils";
import { PostHogProvider } from "@/lib/providers/PostHogProvider";
import { AppToaster } from "@/lib/components/AppToaster";
import { GoogleAnalytics } from "@/lib/components/GoogleAnalytics";
import {
  JsonLd,
  SITE_DEFAULT_DESCRIPTION,
  SITE_NAME,
  absoluteSiteUrl,
  buildOrganizationJsonLd,
  buildWebsiteJsonLd,
  getSiteOgImageUrl,
  siteUrl,
} from "@/lib/seo/site";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter-variable",
});

const sometypeMono = Sometype_Mono({
  subsets: ["latin"],
  display: "swap",
  weight: "500",
  variable: "--font-sometype-mono-variable",
});

const analyticsEnabled =
  process.env.NEXT_PUBLIC_ANALYTICS_ENABLED === "true" && Boolean(process.env.NEXT_PUBLIC_POSTHOG_KEY);

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DEFAULT_DESCRIPTION,
  alternates: {
    canonical: absoluteSiteUrl("/"),
  },
  openGraph: {
    title: SITE_NAME,
    description: SITE_DEFAULT_DESCRIPTION,
    images: [
      {
        alt: `${SITE_NAME} social preview`,
        height: 630,
        url: getSiteOgImageUrl(),
        width: 1200,
      },
    ],
    siteName: SITE_NAME,
    url: siteUrl,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    description: SITE_DEFAULT_DESCRIPTION,
    images: [getSiteOgImageUrl()],
    title: SITE_NAME,
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn("font-sans antialiased bg-background", inter.variable, sometypeMono.variable)}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <head>
        <link href="https://landingpageassests.blob.core.windows.net" rel="preconnect" />
        <link href="https://landingpageassests.blob.core.windows.net" rel="dns-prefetch" />
      </head>
      <body className="antialiased">
        <JsonLd data={buildOrganizationJsonLd()} />
        <JsonLd data={buildWebsiteJsonLd()} />
        <GoogleAnalytics />
        {analyticsEnabled ? <PostHogProvider>{children}</PostHogProvider> : children}
        <AppToaster />
      </body>
    </html>
  );
}
