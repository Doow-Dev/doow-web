import React from "react";
import { AboutBody, AboutSection, AboutTitle, TopSection } from "../_components/terms-privacy";
import { Header } from "@/components/layout/header/Header";
import { Footer } from "@/components/layout/footer/Footer";
import { ScrollText } from "lucide-react";
import { MaxWidthWrapper } from "@/components/ui/max-width-wrapper";

export default function TermsOfUse() {
  return (
    <div className="w-full bg-doow_offwhite">
        <Header/>
      <TopSection 
        title="Terms of Use" 
        subtitle="Updated: 3rd of April, 2023" 
        icon={<ScrollText className="h-8 w-8"/>}
      />

      <MaxWidthWrapper className="relative py-28">
        <div className="w-full md:w-9/12 text-left bg-white p-12 md:p-6 mx-auto rounded-xl">
          <AboutSection>
            <AboutTitle>Introduction</AboutTitle>
            <AboutBody>
              This website is operated by Doow Inc. The terms “we”, “us”, and
              “our” refer to Doow Inc. This website&apos;s use is subject to the
              following terms and conditions, which may change from time to time
              (the &apos;Terms&apos;).
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
              to access, use, or place any requests on our website if you do not
              agree with the Terms or our Privacy Policy.
            </AboutBody>
          </AboutSection>

          <AboutSection>
            <AboutTitle>Acceptable Use</AboutTitle>
            <AboutBody>
              By agreeing to the Terms, you agree to comply with our underlisted
              acceptable use:
              <ul className="list-disc pl-5 mt-2 space-y-2">
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
      </MaxWidthWrapper>

      {/* <div className="flex flex-col items-center">
        <div className="my-10 w-4/5 md:w-11/12 text-left bg-white p-12 md:p-6 rounded-xl">
          <AboutSection>
            <AboutTitle>Introduction</AboutTitle>
            <AboutBody>
              This website is operated by Doow Inc. The terms “we”, “us”, and
              “our” refer to Doow Inc. This website&apos;s use is subject to the
              following terms and conditions, which may change from time to time
              (the &apos;Terms&apos;).
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
              to access, use, or place any requests on our website if you do not
              agree with the Terms or our Privacy Policy.
            </AboutBody>
          </AboutSection>

          <AboutSection>
            <AboutTitle>Acceptable Use</AboutTitle>
            <AboutBody>
              By agreeing to the Terms, you agree to comply with our underlisted
              acceptable use:
              <ul className="list-disc pl-5 mt-2 space-y-2">
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
      </div> */}
      <Footer/>
    </div>
  );
}
