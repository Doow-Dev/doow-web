import React from "react";
import LandingNavBar from "../home/navbar/navbar.comp";
import { AboutBody, AboutSection, AboutTitle } from "./comps";
import styles from "./about.module.scss";
import { AboutUsLanding } from "./Landing/Landing";
import FooterHome from "../home/footer/footer.comp";
import { HomeFaq } from "../home/faq/faq";

export default function AboutUsView() {
  return (
    <div>
      <LandingNavBar />
      <AboutUsLanding />

      <div className={styles.container}>
        <div className={styles.content}>
          <AboutSection>
            <AboutTitle>The nightmare of company spend </AboutTitle>
            <AboutBody>Managing company spend is a nightmare!</AboutBody>
            <AboutBody>
              Banking accounts, corporate cards, reconciliation, accounting, and
              payroll are all siloed within disconnected systems that don't talk
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
              successfully. Let's work together to meet the unique financial
              needs of your business.
            </AboutBody>
          </AboutSection>
        </div>
      </div>
      <HomeFaq />
      <FooterHome />
    </div>
  );
}
