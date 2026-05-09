import type { Metadata, Viewport } from "next";
import { Inter, Sometype_Mono } from "next/font/google";

import { ThemeScript } from "@/components/docs/theme-provider";
import "@/styles/globals.css";

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

const docsSiteUrl = process.env.NEXT_PUBLIC_DOCS_SITE_URL ?? "https://docs.doow.co";

export const metadata: Metadata = {
  metadataBase: new URL(docsSiteUrl),
  title: {
    default: "Doow Docs",
    template: "%s | Doow Docs",
  },
  description: "Production documentation for Doow setup, workflows, integrations, and releases.",
  openGraph: {
    title: "Doow Docs",
    description: "Production documentation for Doow setup, workflows, integrations, and releases.",
    type: "website",
    url: docsSiteUrl,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0b0f0e" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className={`${inter.variable} ${sometypeMono.variable}`} lang="en" suppressHydrationWarning>
      <head>
        <ThemeScript />
      </head>
      <body>{children}</body>
    </html>
  );
}
