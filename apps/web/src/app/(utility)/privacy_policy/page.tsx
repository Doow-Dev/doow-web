import type { Metadata } from "next";

import { AboutBody, AboutSection, AboutSubHeading, AboutTitle, AboutWrapper, LegalPageShell } from "@/app/_components/terms-privacy";
import { JsonLd, buildBreadcrumbJsonLd, buildSiteMetadata, buildWebPageJsonLd, siteRouteSeo } from "@/lib/seo/site";

export const metadata: Metadata = buildSiteMetadata(siteRouteSeo.privacyPolicy);

export default function PrivacyPolicy() {
  return (
    <LegalPageShell lastUpdated="15 May 2026" title="Privacy Policy">
      <JsonLd data={buildWebPageJsonLd(siteRouteSeo.privacyPolicy)} />
      <JsonLd data={buildBreadcrumbJsonLd([{ href: "/", label: "Home" }, { href: "/privacy_policy", label: "Privacy Policy" }])} />
      <AboutWrapper>
        <AboutSection>
          <AboutTitle>Introduction</AboutTitle>
          <AboutBody>
            It&apos;s important for you to know what data we collect from you and how we use it so you can make
            informed decisions about what you share.
          </AboutBody>
          <AboutBody>
            The purpose of this Privacy Policy is to provide a detailed explanation of how Doow collects, uses,
            and shares information about you, as well as your rights and choices regarding that information.
          </AboutBody>
        </AboutSection>

        <AboutSection>
          <AboutSubHeading>The Data We Collect</AboutSubHeading>
          <AboutBody>
            We don&apos;t require you to provide any personal information to visit `www.doow.co`. However, while
            you&apos;re on the site, we may collect personal information directly from you in a number of ways.
          </AboutBody>
          <AboutBody>
            We may need the following information from you when you use certain website features, such as joining
            our waitlist, accessing specific content, or contacting us directly:
          </AboutBody>
          <AboutBody>
            <ul className="list-disc space-y-2 pl-5">
              <li>Name, email address, postal address, and mobile number</li>
              <li>Messages and requests sent to us via our contact form</li>
            </ul>
          </AboutBody>

          <AboutSubHeading>Data collected automatically</AboutSubHeading>
          <AboutBody>
            When you visit Doow, we may automatically collect limited technical information such as your device IP
            address, browser type, and operating system.
          </AboutBody>

          <AboutSubHeading>Data we collect from other sources</AboutSubHeading>
          <AboutBody>
            We may also collect data about you from third-party sources such as social platforms and ad targeting
            services.
          </AboutBody>
          <AboutBody>
            <ul className="list-disc space-y-2 pl-5">
              <li>Social usernames and connections when you interact with those services through Doow</li>
              <li>Advertising engagement information such as view, click-through, and conversion rates</li>
              <li>Demographic information such as interests, gender, and age group</li>
            </ul>
          </AboutBody>
          <AboutBody>
            In some cases, we may combine information we collect directly with information obtained from third
            parties.
          </AboutBody>
        </AboutSection>

        <AboutSection>
          <AboutTitle>How We Use The Data We Collect</AboutTitle>
          <AboutSubHeading>Email communications</AboutSubHeading>
          <AboutBody>
            We may use the information we collect to send you emails, such as waitlist updates and messages about
            our features and products. You may also receive newsletter updates if you are subscribed to them.
          </AboutBody>

          <AboutSubHeading>Offer products and services</AboutSubHeading>
          <AboutBody>
            We may use the information you provide to fulfill product and service requests. For example, your
            information may be used to respond to support requests or allow you to participate in polls and
            surveys.
          </AboutBody>

          <AboutSubHeading>Information sharing</AboutSubHeading>
          <AboutBody>
            Doow respects your privacy and shares user information only when necessary to operate the website,
            provide services, or comply with legal obligations.
          </AboutBody>
          <AboutBody>
            <ul className="list-disc space-y-2 pl-5">
              <li>
                We may work with third parties for analytics, integrations, database management, marketing, data
                processing, and email distribution.
              </li>
              <li>
                By emailing `support@doow.co`, you can request that we do not share your name, address, or related
                information with those third parties where such a choice is available.
              </li>
            </ul>
          </AboutBody>

          <AboutSubHeading>Confidentiality and security</AboutSubHeading>
          <AboutBody>
            Your data is accessible only to employees or service providers who reasonably need it to provide
            products or services to you. We also use industry-standard technical, physical, and administrative
            procedures to help protect your data.
          </AboutBody>

          <AboutSubHeading>Privacy policy changes</AboutSubHeading>
          <AboutBody>
            This Privacy Policy may be updated from time to time to reflect changes in our practices and product
            offerings. When that happens, we will update the effective date and may also notify you through the
            site or by email when appropriate.
          </AboutBody>
        </AboutSection>

        <AboutSection>
          <AboutTitle>Google Workspace Data</AboutTitle>
          <AboutBody>
            When an organisation administrator connects their Google Workspace account to Doow, we access certain
            data from Google APIs solely to provide spend management and utilisation insights within that
            organisation&apos;s Doow account. This section explains exactly what we access, how we protect it, and
            how long we keep it.
          </AboutBody>

          <AboutSubHeading>What we access</AboutSubHeading>
          <AboutBody>
            <ul className="list-disc space-y-2 pl-5">
              <li>
                <strong>Directory data</strong> — basic user identity information (name, email address, admin
                status) from the Admin SDK Directory API, used to build an accurate employee roster and
                cross-reference it against SaaS application licences.
              </li>
              <li>
                <strong>OAuth token activity</strong> — audit log entries from the Admin Reports API showing
                which third-party applications employees have authorised with their Google accounts, used to
                detect shadow IT and unapproved spend.
              </li>
              <li>
                <strong>Workspace usage metrics</strong> — last SSO activity timestamps from the customer usage
                reports API, used to score licence utilisation and identify unused seats.
              </li>
            </ul>
          </AboutBody>
          <AboutBody>
            Access is strictly scoped to the domain of the organisation whose administrator completed the OAuth
            flow. Cross-tenant access is architecturally prevented; no data from any other Google Workspace
            domain is ever accessed or stored.
          </AboutBody>

          <AboutSubHeading>How we protect it</AboutSubHeading>
          <AboutBody>
            All OAuth tokens (access and refresh) are AES-encrypted before being stored in our database. Tokens
            are decrypted only at the point of use for scheduled API calls and are never logged or exposed.
            Google Workspace data is never sold, shared with, or made accessible to third parties; it is used
            solely to generate spend and utilisation insights within the connecting organisation&apos;s Doow
            account.
          </AboutBody>

          <AboutSubHeading>Data retention and deletion</AboutSubHeading>
          <AboutBody>
            Synced directory and activity data is retained for as long as the Google Workspace integration
            remains active. When an organisation administrator disconnects the integration:
          </AboutBody>
          <AboutBody>
            <ul className="list-disc space-y-2 pl-5">
              <li>
                All associated OAuth tokens are immediately revoked and permanently deleted from our systems at
                the moment of disconnection.
              </li>
              <li>
                All synced Google Workspace data (user records, activity data, usage metrics) is purged from
                our systems within 30 days of disconnection.
              </li>
            </ul>
          </AboutBody>
          <AboutBody>
            To request early deletion of your organisation&apos;s Google Workspace data, contact us at{" "}
            <a className="underline" href="mailto:support@doow.co">support@doow.co</a>.
          </AboutBody>
        </AboutSection>
      </AboutWrapper>
    </LegalPageShell>
  );
}
