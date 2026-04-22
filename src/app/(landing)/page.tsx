import type { Metadata } from "next";
import type { ReactNode } from "react";

import { AlternativeAppsSection } from "@/app/(landing)/_components/alternative-apps";
import { DemoVideoSection } from "@/app/(landing)/_components/demo-video";
import { DoowAiSection } from "@/app/(landing)/_components/doow-ai";
import { landingPageContent } from "@/app/(landing)/_components/landing-page-content";
import { FinanceControlSection } from "@/app/(landing)/_components/finance-control";
import { FeatureSplitSection } from "@/app/(landing)/_components/feature-split";
import { HeroSection } from "@/app/(landing)/_components/hero";
import { IntegrationsSection } from "@/app/(landing)/_components/integrations";
import { PricingSection } from "@/app/(landing)/_components/pricing";
import { LandingSectionShell } from "@/app/(landing)/_components/shared";
import { SiteFaqSection } from "@/components/layout/faq";
import { SiteFooter, siteFooterPromoPresets } from "@/components/layout/footer";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.doow.co";

function HeroShell({ children }: { children: ReactNode }) {
  return (
    <LandingSectionShell className="hero-content" layoutShell="landingHeroShell" section="hero" variant="landingWide">
      {children}
    </LandingSectionShell>
  );
}

function DemoShell({ children }: { children: ReactNode }) {
  return (
    <LandingSectionShell className="demo-section__shell" layoutShell="landingSectionShell" section="demo" variant="landing">
      {children}
    </LandingSectionShell>
  );
}

function FeatureSplitShell({ children }: { children: ReactNode }) {
  return (
    <LandingSectionShell
      className="feature-split__shell"
      layoutShell="landingSectionShell"
      section="feature-split"
      variant="landing"
    >
      {children}
    </LandingSectionShell>
  );
}

function FinanceControlShell({ children }: { children: ReactNode }) {
  return (
    <LandingSectionShell
      className="finance-control__shell"
      layoutShell="landingSectionShell"
      section="finance-control"
      variant="landing"
    >
      {children}
    </LandingSectionShell>
  );
}

function AlternativeAppsShell({ children }: { children: ReactNode }) {
  return (
    <LandingSectionShell
      className="alternative-apps__shell"
      layoutShell="landingSectionShell"
      section="alternative-apps"
      variant="landing"
    >
      {children}
    </LandingSectionShell>
  );
}

function PricingShell({ children }: { children: ReactNode }) {
  return (
    <LandingSectionShell
      className="pricing__shell"
      layoutShell="landingSectionShell"
      section="pricing"
      variant="landing"
    >
      {children}
    </LandingSectionShell>
  );
}

function DoowAiShell({ children }: { children: ReactNode }) {
  return (
    <LandingSectionShell
      className="doow-ai__shell"
      layoutShell="landingSectionShell"
      section="doow-ai"
      variant="landing"
    >
      {children}
    </LandingSectionShell>
  );
}

function FaqShell({ children }: { children: ReactNode }) {
  return (
    <LandingSectionShell
      className="faq-section__shell"
      layoutShell="landingSectionShell"
      section="faq"
      variant="landing"
    >
      {children}
    </LandingSectionShell>
  );
}

function IntegrationsShell({ children }: { children: ReactNode }) {
  return (
    <LandingSectionShell
      className="integrations__shell"
      layoutShell="landingSectionShell"
      section="integrations"
      variant="landing"
    >
      {children}
    </LandingSectionShell>
  );
}

export const metadata: Metadata = {
  title: "Doow | SaaS Spend Visibility",
  description:
    "Doow helps finance teams see exactly where the money's going before it's gone \u2014 every subscription, renewal, and license in one place.",
  openGraph: {
    title: "Doow | SaaS Spend Visibility",
    description:
      "Doow helps finance teams see exactly where the money's going before it's gone \u2014 every subscription, renewal, and license in one place.",
    url: siteUrl,
    type: "website",
  },
};

export default function Home() {
  return (
    <>
      <HeroSection Shell={HeroShell} />
      <DemoVideoSection Shell={DemoShell} />
      <FeatureSplitSection Shell={FeatureSplitShell} />
      <FinanceControlSection Shell={FinanceControlShell} />
      <AlternativeAppsSection Shell={AlternativeAppsShell} />
      {/* <DoowAiSection Shell={DoowAiShell} /> */}
      <PricingSection Shell={PricingShell} />
      <SiteFaqSection Shell={FaqShell} content={landingPageContent.faq} />
      <IntegrationsSection Shell={IntegrationsShell} />
      <SiteFooter promo={siteFooterPromoPresets.landingDashboard} />
    </>
  );
}
