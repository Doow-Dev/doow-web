import React from "react";
import LandingNavBar from "../home/navbar/navbar.comp";
import styles from "./styles.module.scss";
import FooterHome from "../home/footer/footer.comp";
import { HomeFaq } from "../home/faq/faq";
import { TopSection, AboutSection, AboutTitle, AboutBody } from "./comps";

export default function TermsOfServicesView() {
  return (
    <div>
      <LandingNavBar />

      <TopSection title={"Terms of Use"} subtitle={""} />
      <div className={styles.container}>
        <div className={styles.content}>
          <AboutSection>
            <AboutTitle>Introduction </AboutTitle>
            <AboutBody>
              This website is operated by Doow Inc. The terms “we”, “us”, and
              “our” refer to Doow Inc. This website's use is subject to the
              following terms and conditions, which may change from time to time
              (the "Terms").
            </AboutBody>
            <AboutBody>
              It is important that you carefully read the Terms together with
              any other terms, conditions, policies, or disclaimers provided on
              our website. Users of our website, including browsers, customers,
              merchants, and/or vendors, are subject to these Terms.
            </AboutBody>
            <AboutBody>
              You accept and agree to comply with the Terms and our Privacy
              Policy if you access and use this website. You are not authorized
              to access, use or place any requests on our website if you do not
              agree with the Terms or our Privacy Policy.
            </AboutBody>
          </AboutSection>

          <AboutSection>
            <AboutTitle>Acceptable Use</AboutTitle>
            <AboutBody>
              By agreeing to the Terms, you agree to comply with our underlisted
              acceptable use:
              <ul>
                <li>
                  Use of our website is only permitted for lawful purposes. You
                  shall not use our website:
                </li>
                <li>
                  In any manner that violates any applicable local or
                  international law or regulation.
                </li>
                <li>
                  In any manner that is unlawful or fraudulent. To intimidate,
                  bully, insult, or humiliate anyone.
                </li>
                <li>
                  To upload, download, use, or re-use any material that violates
                  our content standards.
                </li>
                <li>
                  To transmit any unsolicited or unauthorized advertising or
                  promotional material (spam).
                </li>
                <li>
                  To knowingly transmit, send or upload any material containing
                  viruses, adwareTrojan horses, worms, spyware, or any other
                  program that is harmful to the operation of any computer
                  software or hardware.
                </li>
                {/* <li></li> */}
              </ul>
            </AboutBody>
          </AboutSection>

          <AboutSection>
            <AboutTitle>Access to the Website</AboutTitle>
            <AboutBody>
              All hardware, software, telephone, and other communications
              equipment and/or services required to connect to the internet and
              access our website are your responsibility. We are not responsible
              for any internet or telephone charges you incur as a result of
              connecting to the internet or accessing our website.
            </AboutBody>
          </AboutSection>

          <AboutSection>
            <AboutTitle>General Conditions</AboutTitle>
            <AboutBody>
              At any time, for any reason, we reserve the right to refuse
              service to anyone. We reserve the right to modify the website at
              any time, including terminating, changing, suspending, or
              discontinuing any aspect of it. Our website may be subject to
              additional rules or limitations. By continuing to visit our
              website or use its services, you agree to any future changes to
              these terms. It’s important you review the Terms regularly. You
              agree that we will not be liable for any modification, suspension,
              or discontinuance of our website or any service, content, feature,
              or product offered through it.
            </AboutBody>
          </AboutSection>
        </div>
      </div>
      <HomeFaq />
      <FooterHome />
    </div>
  );
}
