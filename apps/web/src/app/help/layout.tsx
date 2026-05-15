import type { Metadata } from "next";
import Script from "next/script";

import "@/styles/help-globals.css";
import "@/styles/help-layout-frame.css";
import "@/styles/help-integrated.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://doow.co";

export const metadata: Metadata = {
  title: {
    default: "Help Center",
    template: "%s | Doow Help",
  },
  description: "Answers to common questions about Doow — setup, integrations, billing, and more.",
  metadataBase: new URL(`${siteUrl}/help`),
  openGraph: {
    title: "Doow Help Center",
    description: "Answers to common questions about Doow — setup, integrations, billing, and more.",
    type: "website",
    url: `${siteUrl}/help`,
  },
};

export default function HelpLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Script
        dangerouslySetInnerHTML={{
          __html: `(() => { try { const s = localStorage.getItem("docs-theme"); const d = window.matchMedia("(prefers-color-scheme: dark)").matches; const t = s ?? (d ? "dark" : "light"); if (t === "dark") document.documentElement.classList.add("dark"); document.documentElement.dataset.theme = t; } catch {} })();`,
        }}
        id="help-theme-init"
        strategy="beforeInteractive"
      />
      {children}
    </>
  );
}
