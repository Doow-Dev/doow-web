import type { Metadata } from "next";
import Script from "next/script";

import "@/styles/docs-globals.css";
import "@/styles/docs-sidebar-accordion.css";
import "@/styles/docs-layout-frame.css";
import "@/styles/docs-integrated.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://doow.co";

export const metadata: Metadata = {
  title: {
    default: "Doow Docs",
    template: "%s | Doow Docs",
  },
  description: "Production documentation for connecting Doow integrations.",
  metadataBase: new URL(`${siteUrl}/docs`),
  openGraph: {
    title: "Doow Docs",
    description: "Production documentation for connecting Doow integrations.",
    type: "website",
    url: `${siteUrl}/docs`,
  },
};

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Script
        dangerouslySetInnerHTML={{
          __html: `(() => { try { const s = localStorage.getItem("docs-theme"); const d = window.matchMedia("(prefers-color-scheme: dark)").matches; const t = s ?? (d ? "dark" : "light"); if (t === "dark") document.documentElement.classList.add("dark"); document.documentElement.dataset.theme = t; } catch {} })();`,
        }}
        id="docs-theme-init"
        strategy="beforeInteractive"
      />
      {children}
    </>
  );
}
