import type { Metadata } from "next";

import { AboutBody, AboutSection, AboutTitle, AboutWrapper, LegalPageShell } from "@/app/_components/terms-privacy";
import { JsonLd, buildBreadcrumbJsonLd, buildSiteMetadata, buildWebPageJsonLd, siteRouteSeo } from "@/lib/seo/site";

export const metadata: Metadata = buildSiteMetadata(siteRouteSeo.termsOfUse);

export default function TermsOfUse() {
  return (
    <LegalPageShell lastUpdated="5 May 2026" title="Terms of Use">
      <JsonLd data={buildWebPageJsonLd(siteRouteSeo.termsOfUse)} />
      <JsonLd data={buildBreadcrumbJsonLd([{ href: "/", label: "Home" }, { href: "/terms_of_use", label: "Terms of Use" }])} />
      <AboutWrapper>
        <AboutSection>
          <AboutTitle>Introduction</AboutTitle>
          <AboutBody>
            This website is operated by Doow Inc. The terms &quot;we&quot;, &quot;us&quot;, and &quot;our&quot;
            refer to Doow Inc. Use of this website is subject to the following terms and conditions, which may
            change from time to time.
          </AboutBody>
          <AboutBody>
            Please read these Terms together with any other conditions, policies, or disclaimers provided on the
            website. Users of our website, including browsers, customers, merchants, and vendors, are all subject
            to these Terms.
          </AboutBody>
          <AboutBody>
            By accessing or using this website, you accept and agree to comply with these Terms and our Privacy
            Policy. If you do not agree, you are not authorized to use the website.
          </AboutBody>
        </AboutSection>

        <AboutSection>
          <AboutTitle>Acceptable Use</AboutTitle>
          <AboutBody>
            By agreeing to these Terms, you also agree to comply with the following acceptable-use requirements:
          </AboutBody>
          <AboutBody>
            <ul className="list-disc space-y-2 pl-5">
              <li>Use the website only for lawful purposes.</li>
              <li>Do not use it in any way that violates any local or international law or regulation.</li>
              <li>Do not use it in any way that is unlawful, fraudulent, abusive, or intended to intimidate.</li>
              <li>Do not upload, download, use, or re-use material that violates our content standards.</li>
              <li>Do not transmit unsolicited or unauthorized advertising or promotional material.</li>
              <li>
                Do not knowingly transmit or upload harmful code, including viruses, spyware, worms, Trojan
                horses, or similar software.
              </li>
            </ul>
          </AboutBody>
        </AboutSection>

        <AboutSection>
          <AboutTitle>Access to the Website</AboutTitle>
          <AboutBody>
            All hardware, software, telephone, and communications equipment or services required to access the
            internet and use this website are your responsibility. We are not responsible for any costs you incur
            while connecting to or using the site.
          </AboutBody>
        </AboutSection>

        <AboutSection>
          <AboutTitle>General Conditions</AboutTitle>
          <AboutBody>
            We reserve the right to refuse service to anyone at any time and for any reason. We may modify,
            suspend, or discontinue any part of the website, its content, features, or services without notice.
          </AboutBody>
          <AboutBody>
            By continuing to use the website, you agree to any future changes to these Terms. It is your
            responsibility to review them regularly.
          </AboutBody>
          <AboutBody>
            We will not be liable for any modification, suspension, or discontinuance of the website or any
            feature, service, or content offered through it.
          </AboutBody>
        </AboutSection>
      </AboutWrapper>
    </LegalPageShell>
  );
}
