import React from "react";
import { AboutBody, AboutSection, AboutWrapper, TopSection } from "../_components/terms-privacy";
import { Header } from "@/components/layout/header/Header";
import { Footer } from "@/components/layout/footer/Footer";
import { BriefcaseBusiness } from "lucide-react";
import { MaxWidthWrapper } from "@/components/ui/max-width-wrapper";

export default function AboutUs() {
  return (
    <div className="w-full bg-doow_offwhite">
        <Header/>
      <TopSection 
        title="See and manage every SaaS dollar from one place" 
        subtitle="Be the first to get early access when we launch beta!" 
        icon={<BriefcaseBusiness className="h-8 w-8" />}
      />

      <MaxWidthWrapper className="relative py-20">
        <AboutWrapper>
          <AboutSection>
              <AboutBody>
                Managing SaaS spend and subscription complexity shouldn’t feel like a guessing game. Today’s businesses run on dozens, if not hundreds, of cloud tools, each with its own billing, owners, renewals, usage patterns, and contracts. Without a central source of truth, teams struggle to understand what they’re paying for, who’s using what, and where opportunities to optimize actually are.
              </AboutBody>
              <AboutBody>
                That ends with Doow.
              </AboutBody>
              <AboutBody>
                Doow is building the first SaaS Intelligence platform that unifies every subscription, usage signal, owner, and renewal into one living system of insight. Instead of reconciling disconnected spreadsheets, card statements, and invoices every month, teams get a real-time view of what’s happening across the entire SaaS landscape. This means you not only see spend, you understand it, act on it, and make strategic decisions with confidence.
              </AboutBody>
              <AboutBody>
                We believe software should create visibility, not confusion. By combining automated discovery, usage insights, spend data, and renewal tracking, Doow empowers business leaders, from CEOs to finance and operations teams, to eliminate wasted spend, forecast with clarity, and drive smarter SaaS investments.
              </AboutBody>
              <AboutBody>
              Doow is built by a team with deep experience in finance, data, product, and engineering who’ve lived the pain of fragmented systems and unclear subscriptions. We’re here to replace manual guesswork with actionable intelligence, so your business can spend smarter, scale faster, and unlock the full value of every SaaS dollar.
              </AboutBody>
          </AboutSection>
        </AboutWrapper>
      </MaxWidthWrapper>
      <Footer/>
    </div>
  );
}