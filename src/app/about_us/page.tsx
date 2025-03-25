import React from "react";
import { AboutBody, AboutSection, AboutTitle, TopSection } from "../_components/terms-privacy";
import { Header } from "@/components/layout/header/Header";
import { Footer } from "@/components/layout/footer/Footer";
import { BriefcaseBusiness } from "lucide-react";
import { MaxWidthWrapper } from "@/components/ui/max-width-wrapper";

export default function AboutUs() {
  return (
    <div className="w-full bg-doow_offwhite">
        <Header/>
      <TopSection 
        title="Manage all your business finance in one place" 
        subtitle="Be the first to get early access when we launch beta!" 
        icon={<BriefcaseBusiness className="h-8 w-8" />}
      />

      <MaxWidthWrapper className="relative py-28">
        <div className="w-full md:w-9/12 text-left bg-white p-12 md:p-6 mx-auto rounded-xl">
          <AboutSection>
              <AboutTitle>The nightmare of company spend</AboutTitle>
              <AboutBody>
                  Managing company spend is a nightmare!.
              </AboutBody>
              <AboutBody>
                  Banking accounts, corporate cards, reconciliation, accounting, and
                  payroll are all siloed within disconnected systems that don&apos;t talk
                  to each other.
              </AboutBody>
              <AboutBody>
                  We wouldn’t be surprised if your finance team is constantly busy
                  across 10ish tools trying to keep track of where money is coming
                  from and going. This is where Doow comes in.
              </AboutBody>
              <AboutBody>
                Doow connects all your financial dots and platforms!
              </AboutBody>
          </AboutSection>

          <AboutSection>
            <AboutTitle>Doow is here!</AboutTitle>
            <AboutBody>
              At Doow, we’re renovating the way companies receive and spend
              money globally.
            </AboutBody>
            <AboutBody>
              Doow is an all-in-one business banking solution that integrates
              cross-border banking, corporate cards, FX, global payments, and
              spend management into a single platform.
            </AboutBody>
            <AboutBody>
              Our platform helps companies streamline their finance workflow so
              decision makers can easily analyze patterns and make data informed
              decisions in real time.
            </AboutBody>
          </AboutSection>

          <AboutSection>
            <AboutTitle>Who is building Doow?</AboutTitle>
            <AboutBody>
              We are a team of dreamers, doers and professionals with an
              outstanding record of building software in financial services and
              other leading industries.
            </AboutBody>
            <AboutBody>
              Our team members have a unique set of skills, experience and
              expertise across different fields, including finance, product,
              engineering, and design.
            </AboutBody>
            <AboutBody>
              We truly understand the challenges of building software solutions
              in financial services and we have the experience to navigate them
              successfully. Let&apos;s work together to meet the unique financial
              needs of your business.
            </AboutBody>
          </AboutSection>
        </div>
      </MaxWidthWrapper>
      <Footer/>
    </div>
  );
}