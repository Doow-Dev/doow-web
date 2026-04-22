import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";

import "../styles/globals.css";
import "@/app/_components/global-site-navbar/styles/index.css";
import { cn } from "@/lib/utils";
import { PostHogProvider } from "@/lib/providers/PostHogProvider";
import { GoogleAnalytics } from "@/lib/components/GoogleAnalytics";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter-variable",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.doow.co";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Doow",
    template: "%s | Doow",
  },
  description: "Doow landing page rebuild in progress.",
  openGraph: {
    title: "Doow",
    description: "Doow landing page rebuild in progress.",
    url: siteUrl,
    type: "website",
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
      className={cn("font-sans antialiased bg-background", inter.variable)}
      suppressHydrationWarning
    >
      <head>
        <link href="https://landingpageassests.blob.core.windows.net" rel="preconnect" />
        <link href="https://landingpageassests.blob.core.windows.net" rel="dns-prefetch" />
      </head>
      <body className="antialiased">
        <GoogleAnalytics />
        <PostHogProvider>
          {children}
          <Toaster containerClassName="mt-4" position="top-center" />
        </PostHogProvider>
      </body>
    </html>
  );
}
