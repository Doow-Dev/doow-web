import React from "react";
import { AboutBody, AboutSection, AboutSubHeading, AboutTitle, AboutWrapper, TopSection } from "../_components/terms-privacy";
import { Header } from "@/components/layout/header/Header";
import { Footer } from "@/components/layout/footer/Footer";
import { ShieldCheck } from "lucide-react";
import { MaxWidthWrapper } from "@/components/ui/max-width-wrapper";

export default function PrivacyPolicy() {
  return (
    <div className="w-full bg-doow_offwhite">
        <Header />
        <TopSection
            title="Privacy Policy"
            subtitle="Updated: 15th of May, 2026"
            icon={ <ShieldCheck className="h-8 w-8"/>}
        />

        <MaxWidthWrapper className="relative py-20">
            <AboutWrapper>

                <AboutSection>
                    <AboutTitle>Introduction</AboutTitle>
                    <AboutBody>
                    This Privacy Policy explains how Doow (&ldquo;Doow,&rdquo; &ldquo;we,&rdquo;
                    &ldquo;us,&rdquo; or &ldquo;our&rdquo;) collects, uses, stores, shares, and protects
                    information about you when you use our website at doow.co and our spend management
                    platform (collectively, the &ldquo;Service&rdquo;).
                    </AboutBody>
                    <AboutBody>
                    Please read this policy carefully. By using the Service, you acknowledge that you have
                    read and understood how we handle your data. If you have questions, contact us at{" "}
                    <a className="underline" href="mailto:privacy@doow.co">privacy@doow.co</a>.
                    </AboutBody>
                </AboutSection>

                <AboutSection>
                    <AboutTitle>Who We Are</AboutTitle>
                    <AboutBody>
                    Doow is a B2B SaaS spend management platform that helps organisations track, analyse,
                    and optimise their software subscriptions and employee SaaS usage. We are the data
                    controller for personal data collected through doow.co and the Doow platform.
                    </AboutBody>
                    <AboutBody>
                    <strong>Privacy contact:</strong>{" "}
                    <a className="underline" href="mailto:privacy@doow.co">privacy@doow.co</a>
                    <br />
                    <strong>General support:</strong>{" "}
                    <a className="underline" href="mailto:support@doow.co">support@doow.co</a>
                    </AboutBody>
                </AboutSection>

                <AboutSection>
                    <AboutTitle>Data We Collect</AboutTitle>
                    <AboutSubHeading>Data you provide directly</AboutSubHeading>
                    <AboutBody>
                    When you create an account, complete onboarding, or contact us, we collect:
                    </AboutBody>
                    <AboutBody>
                    <ul className="list-disc ml-12 md:ml-6 space-y-2">
                        <li>Identity data: first name, last name, email address, phone number, country, job title, and role</li>
                        <li>Account credentials: password (stored as a one-way bcrypt hash — never in plaintext)</li>
                        <li>Organisation details: business name, domain, website, and country of incorporation</li>
                        <li>
                        Financial verification (KYC/KYB): date of birth, nationality, residential address,
                        government-issued ID type and number, business registration numbers, director and
                        shareholder information, and supporting documents — collected only where required for
                        financial compliance
                        </li>
                        <li>Communications: messages you send us via our contact form or support channels</li>
                    </ul>
                    </AboutBody>

                    <AboutSubHeading>Data collected automatically</AboutSubHeading>
                    <AboutBody>
                    When you use the Service we automatically collect:
                    </AboutBody>
                    <AboutBody>
                    <ul className="list-disc ml-12 md:ml-6 space-y-2">
                        <li>Device and browser information: IP address, browser type, operating system, and device type</li>
                        <li>Usage data: pages visited, features used, session duration, and navigation patterns</li>
                        <li>
                        Authentication activity: login timestamps, login method, IP address, user agent, and
                        country — retained for security auditing
                        </li>
                        <li>
                        Performance and error data: application errors, response times, and request traces —
                        collected via Azure Application Insights and Sentry
                        </li>
                    </ul>
                    </AboutBody>

                    <AboutSubHeading>Data from connected integrations</AboutSubHeading>
                    <AboutBody>
                    When your organisation administrator connects a third-party integration, we access and
                    store data from that service. The specific data collected per integration is described in
                    the &ldquo;Connected Integrations&rdquo; section below.
                    </AboutBody>
                </AboutSection>

                <AboutSection>
                    <AboutTitle>How We Use Your Data</AboutTitle>
                    <AboutBody>
                    We use your data only for the purposes described below. Where GDPR applies, we have
                    identified the legal basis for each use.
                    </AboutBody>
                    <AboutBody>
                    <ul className="list-disc ml-12 md:ml-6 space-y-2">
                        <li>
                        <strong>To provide and operate the Service</strong> — processing your data is
                        necessary to fulfil our contract with you. This includes account management,
                        authentication, licence tracking, spend analysis, and generating utilisation reports.
                        </li>
                        <li>
                        <strong>To verify your identity and comply with financial regulations</strong> —
                        KYC and KYB data is processed on the basis of legal obligation where applicable,
                        and legitimate interests where fraud prevention is required.
                        </li>
                        <li>
                        <strong>To send service communications</strong> — transactional emails (password
                        resets, invitations, integration sync alerts) sent on the basis of contract
                        performance.
                        </li>
                        <li>
                        <strong>To improve the Service</strong> — aggregated, anonymised usage data
                        analysed on the basis of our legitimate interest in understanding how the product
                        is used.
                        </li>
                        <li>
                        <strong>To detect and prevent security threats</strong> — authentication logs and
                        error tracking retained on the basis of legitimate interest in keeping the Service
                        secure.
                        </li>
                        <li>
                        <strong>To power AI-assisted features</strong> — if you use Doow&apos;s AI chat
                        or insights features, your messages and relevant organisational context are
                        processed by LLM providers. See &ldquo;AI Features&rdquo; below.
                        </li>
                        <li>
                        <strong>To comply with legal obligations</strong> — where we are required to
                        retain or disclose data by law, regulation, or court order.
                        </li>
                    </ul>
                    </AboutBody>
                </AboutSection>

                <AboutSection>
                    <AboutTitle>How We Share Your Data</AboutTitle>
                    <AboutBody>
                    We do not sell your personal data. We share data only with the service providers listed
                    below, and only to the extent necessary for them to perform their function. All providers
                    are contractually required to handle data securely and only for the specified purpose.
                    </AboutBody>

                    <AboutSubHeading>Infrastructure and operations</AboutSubHeading>
                    <AboutBody>
                    <ul className="list-disc ml-12 md:ml-6 space-y-2">
                        <li>
                        <strong>Microsoft Azure</strong> — cloud hosting, file storage (documents, receipts,
                        avatars), and application performance monitoring. All data stored on Azure is
                        encrypted at rest and in transit.
                        </li>
                        <li>
                        <strong>Sentry</strong> — error tracking. Receives error context including request
                        IDs, member IDs, and organisation IDs when an application error occurs. No message
                        content or financial data is sent.
                        </li>
                    </ul>
                    </AboutBody>

                    <AboutSubHeading>Communications</AboutSubHeading>
                    <AboutBody>
                    <ul className="list-disc ml-12 md:ml-6 space-y-2">
                        <li>
                        <strong>ZeptoMail (Zoho)</strong> — transactional email delivery. Receives your
                        email address, name, and the content of service emails such as invitation links and
                        password reset codes.
                        </li>
                        <li>
                        <strong>Termii</strong> — SMS delivery for phone verification and two-factor
                        authentication codes. Receives your phone number and the one-time code.
                        </li>
                        <li>
                        <strong>Crisp</strong> — in-product chat support. If you contact us via the chat
                        widget, Crisp receives your name, email, and the content of your support
                        conversation.
                        </li>
                    </ul>
                    </AboutBody>

                    <AboutSubHeading>Payments and financial services</AboutSubHeading>
                    <AboutBody>
                    <ul className="list-disc ml-12 md:ml-6 space-y-2">
                        <li>
                        <strong>Stripe</strong> — card funding and payment processing. Receives payment
                        amounts and session tokens for completing top-up transactions. Stripe is PCI-DSS
                        certified; we do not store full card numbers.
                        </li>
                        <li>
                        <strong>Fincra</strong> — virtual account issuance and card transaction processing.
                        Receives organisation details and transaction metadata required for card operations.
                        </li>
                        <li>
                        <strong>Plaid</strong> — bank account linking and transaction sync where enabled.
                        Receives your banking credentials during the link flow and returns account details
                        and transactions. Plaid manages its own data handling under its privacy policy.
                        </li>
                    </ul>
                    </AboutBody>

                    <AboutSubHeading>Analytics</AboutSubHeading>
                    <AboutBody>
                    <ul className="list-disc ml-12 md:ml-6 space-y-2">
                        <li>
                        <strong>PostHog</strong> — product analytics. Collects anonymised event data about
                        how features are used. You can opt out by enabling Do Not Track in your browser or
                        by contacting{" "}
                        <a className="underline" href="mailto:privacy@doow.co">privacy@doow.co</a>.
                        </li>
                        <li>
                        <strong>Azure Application Insights</strong> — server-side performance telemetry.
                        Receives request metadata (path, latency, status code), error traces, and
                        identifiers for diagnosing issues.
                        </li>
                    </ul>
                    </AboutBody>

                    <AboutSubHeading>Legal disclosure</AboutSubHeading>
                    <AboutBody>
                    We may disclose your data where required by law, regulation, legal process, or
                    governmental request, or where necessary to protect the rights, property, or safety of
                    Doow, our users, or the public.
                    </AboutBody>
                </AboutSection>

                <AboutSection>
                    <AboutTitle>Connected Integrations</AboutTitle>
                    <AboutBody>
                    Doow&apos;s core value is derived from connecting your organisation&apos;s existing
                    tools. All integrations are authorised by a designated organisation administrator.
                    Individual end users cannot initiate or disconnect integrations. Data accessed via any
                    integration is scoped strictly to the authorising organisation&apos;s account.
                    </AboutBody>

                    <AboutSubHeading>Google Workspace</AboutSubHeading>
                    <AboutBody>
                    <ul className="list-disc ml-12 md:ml-6 space-y-2">
                        <li>
                        <strong>What we access:</strong> employee directory (name, email, admin status),
                        OAuth token activity reports (which third-party apps employees have authorised),
                        and workspace usage metrics (last SSO activity timestamps).
                        </li>
                        <li>
                        <strong>Why:</strong> to build an employee roster, detect shadow IT, and score
                        licence utilisation.
                        </li>
                        <li>
                        <strong>Token security:</strong> OAuth access and refresh tokens are AES-256
                        encrypted before being stored in our database. Tokens are decrypted only at the
                        point of use for scheduled syncs and are never logged.
                        </li>
                        <li>
                        <strong>Cross-tenant access:</strong> architecturally impossible — all queries are
                        scoped to the authorising administrator&apos;s domain only.
                        </li>
                        <li>
                        <strong>Retention:</strong> data is retained while the integration is active.
                        </li>
                        <li>
                        <strong>Deletion:</strong> when the integration is disconnected, all associated
                        OAuth tokens are immediately revoked and permanently deleted. All synced Google
                        Workspace data (user records, activity data, usage metrics) is purged from our
                        systems within 30 days.
                        </li>
                    </ul>
                    </AboutBody>

                    <AboutSubHeading>Identity providers (Microsoft Entra ID / Azure AD, Okta)</AboutSubHeading>
                    <AboutBody>
                    <ul className="list-disc ml-12 md:ml-6 space-y-2">
                        <li>
                        <strong>What we access:</strong> user directory (name, email, group memberships)
                        and authentication activity logs.
                        </li>
                        <li>
                        <strong>Why:</strong> to maintain an accurate employee roster and identify active
                        versus inactive users for licence utilisation scoring.
                        </li>
                        <li>
                        <strong>Retention and deletion:</strong> tokens are revoked immediately on
                        disconnection; synced data is purged within 30 days.
                        </li>
                    </ul>
                    </AboutBody>

                    <AboutSubHeading>HRIS integrations (Gusto, Deel, BambooHR, Zoho People)</AboutSubHeading>
                    <AboutBody>
                    <ul className="list-disc ml-12 md:ml-6 space-y-2">
                        <li>
                        <strong>What we access:</strong> employee records including name, email, job title,
                        employment status, department, hire date, and compensation data where provided.
                        </li>
                        <li>
                        <strong>Why:</strong> to map SaaS licence usage to employees and departments for
                        department-level spend and utilisation analysis.
                        </li>
                        <li>
                        <strong>Retention and deletion:</strong> synced employee records are retained while
                        the integration is active and purged within 30 days of disconnection.
                        </li>
                    </ul>
                    </AboutBody>

                    <AboutSubHeading>Banking integrations (Plaid)</AboutSubHeading>
                    <AboutBody>
                    <ul className="list-disc ml-12 md:ml-6 space-y-2">
                        <li>
                        <strong>What we access:</strong> bank account metadata (institution name, masked
                        account number, account type, balance) and transaction history (amount, merchant,
                        date, category).
                        </li>
                        <li>
                        <strong>Why:</strong> to identify SaaS-related expenses and reconcile them against
                        licence records for accurate spend tracking.
                        </li>
                        <li>
                        <strong>Retention and deletion:</strong> bank access tokens are revoked and
                        transaction data is purged within 30 days of disconnection.
                        </li>
                    </ul>
                    </AboutBody>

                    <AboutSubHeading>Accounting integrations (Xero and others)</AboutSubHeading>
                    <AboutBody>
                    <ul className="list-disc ml-12 md:ml-6 space-y-2">
                        <li>
                        <strong>What we access:</strong> expense records, GL account references, and
                        transaction data relevant to software spend.
                        </li>
                        <li>
                        <strong>Why:</strong> to reconcile accounting records with detected SaaS spend.
                        </li>
                        <li>
                        <strong>Retention and deletion:</strong> synced accounting data is purged within
                        30 days of disconnection.
                        </li>
                    </ul>
                    </AboutBody>
                </AboutSection>

                <AboutSection>
                    <AboutTitle>AI Features</AboutTitle>
                    <AboutBody>
                    Doow includes AI-assisted features (such as the Doow AI chat interface) powered by
                    large language model (LLM) providers. When you use these features:
                    </AboutBody>
                    <AboutBody>
                    <ul className="list-disc ml-12 md:ml-6 space-y-2">
                        <li>
                        Your messages and relevant organisational context (such as app names and spend
                        summaries) are sent to one or more LLM providers — which may include Anthropic
                        (Claude), OpenAI, or Google Gemini — for processing.
                        </li>
                        <li>
                        We do not send KYC/KYB documents, full financial records, or raw integration
                        tokens to LLM providers.
                        </li>
                        <li>
                        Chat history is stored in our systems and subject to the retention periods
                        described below.
                        </li>
                        <li>
                        Under the enterprise agreements we operate under, LLM providers do not use your
                        data to train their models.
                        </li>
                    </ul>
                    </AboutBody>
                </AboutSection>

                <AboutSection>
                    <AboutTitle>Cookies and Tracking Technologies</AboutTitle>
                    <AboutBody>
                    We use cookies and similar tracking technologies on doow.co and within the platform,
                    falling into three categories:
                    </AboutBody>
                    <AboutBody>
                    <ul className="list-disc ml-12 md:ml-6 space-y-2">
                        <li>
                        <strong>Strictly necessary cookies</strong> — required for authentication and
                        session management. These cannot be disabled without breaking core functionality.
                        They include HTTP-only, secure session tokens set at login.
                        </li>
                        <li>
                        <strong>Analytics cookies</strong> — set by PostHog to help us understand feature
                        usage and improve the product. These collect anonymised event data tied to a
                        pseudonymous session ID. You can opt out by enabling Do Not Track in your browser
                        or by contacting{" "}
                        <a className="underline" href="mailto:privacy@doow.co">privacy@doow.co</a>.
                        </li>
                        <li>
                        <strong>Performance monitoring</strong> — Azure Application Insights collects
                        server-side telemetry. This processes IP addresses and request metadata but does
                        not set a persistent browser cookie.
                        </li>
                    </ul>
                    </AboutBody>
                </AboutSection>

                <AboutSection>
                    <AboutTitle>Data Retention and Deletion</AboutTitle>
                    <AboutBody>
                    We retain data only for as long as necessary for the purposes described in this policy.
                    The following periods apply by data category:
                    </AboutBody>
                    <AboutBody>
                    <ul className="list-disc ml-12 md:ml-6 space-y-2">
                        <li>
                        <strong>Account data</strong> — retained for the lifetime of your active account.
                        On account closure, data is soft-deleted immediately and permanently purged within
                        90 days, unless legal retention obligations apply.
                        </li>
                        <li>
                        <strong>Integration data</strong> (Google Workspace, HRIS, banking, accounting,
                        identity providers) — retained while the integration is active. Tokens are revoked
                        immediately on disconnection; all synced data is purged within 30 days.
                        </li>
                        <li>
                        <strong>Session tokens</strong> — expire automatically after 3 days of inactivity
                        and are immediately revoked on logout.
                        </li>
                        <li>
                        <strong>Personal access tokens</strong> — expire on their configured expiry date
                        or when manually revoked.
                        </li>
                        <li>
                        <strong>Application usage insights</strong> — retained for 30 days, then
                        automatically deleted by a scheduled cleanup job.
                        </li>
                        <li>
                        <strong>Chat attachments</strong> — deleted automatically on a per-attachment
                        expiry schedule.
                        </li>
                        <li>
                        <strong>Sign-in activity logs</strong> — retained for 12 months for security
                        auditing.
                        </li>
                        <li>
                        <strong>KYC/KYB verification data</strong> — retained for the duration required
                        by applicable financial regulations, typically 5–7 years after the end of the
                        business relationship.
                        </li>
                        <li>
                        <strong>Financial transaction records</strong> — retained for the duration required
                        by applicable tax and financial regulations.
                        </li>
                    </ul>
                    </AboutBody>
                    <AboutBody>
                    To request early deletion of your data, contact{" "}
                    <a className="underline" href="mailto:privacy@doow.co">privacy@doow.co</a>. Requests
                    will be processed within 30 days, subject to any legal retention obligations.
                    </AboutBody>
                </AboutSection>

                <AboutSection>
                    <AboutTitle>Data Security</AboutTitle>
                    <AboutBody>
                    We implement industry-standard technical and organisational measures to protect your data:
                    </AboutBody>
                    <AboutBody>
                    <ul className="list-disc ml-12 md:ml-6 space-y-2">
                        <li>
                        <strong>Encryption in transit</strong> — all data between your browser and our
                        servers is encrypted using TLS.
                        </li>
                        <li>
                        <strong>Encryption at rest</strong> — sensitive fields including OAuth tokens and
                        integration credentials are encrypted using AES-256-CBC before being stored in our
                        database.
                        </li>
                        <li>
                        <strong>Password hashing</strong> — passwords are hashed using bcrypt and are
                        never stored in recoverable form.
                        </li>
                        <li>
                        <strong>Token hashing</strong> — session tokens and personal access tokens are
                        stored as one-way bcrypt hashes. The original token is never retained after issue.
                        </li>
                        <li>
                        <strong>Access controls</strong> — data is accessible only to employees and
                        service providers who require it to deliver the Service, with role-based access
                        control enforced throughout the platform.
                        </li>
                        <li>
                        <strong>Two-factor authentication</strong> — available for all user accounts via
                        authenticator app or TOTP.
                        </li>
                    </ul>
                    </AboutBody>
                    <AboutBody>
                    Despite these measures, no system is completely secure. In the event of a data breach
                    that affects your rights or freedoms, we will notify affected users and relevant
                    authorities as required by applicable law.
                    </AboutBody>
                </AboutSection>

                <AboutSection>
                    <AboutTitle>International Data Transfers</AboutTitle>
                    <AboutBody>
                    Doow operates globally. Your data may be processed in countries outside your own,
                    including the United States, where our service providers operate. These include
                    Microsoft Azure, Sentry, ZeptoMail, Termii, Stripe, Plaid, Anthropic, OpenAI, and
                    Google (for AI features).
                    </AboutBody>
                    <AboutBody>
                    Where personal data is transferred outside the European Economic Area (EEA) or the
                    United Kingdom, we ensure appropriate safeguards are in place — such as Standard
                    Contractual Clauses (SCCs) or adequacy decisions by the European Commission — in
                    accordance with GDPR requirements.
                    </AboutBody>
                    <AboutBody>
                    For questions about safeguards applied to your data, contact{" "}
                    <a className="underline" href="mailto:privacy@doow.co">privacy@doow.co</a>.
                    </AboutBody>
                </AboutSection>

                <AboutSection>
                    <AboutTitle>Your Rights</AboutTitle>
                    <AboutSubHeading>Rights under GDPR (EEA and UK users)</AboutSubHeading>
                    <AboutBody>
                    <ul className="list-disc ml-12 md:ml-6 space-y-2">
                        <li><strong>Right to access</strong> — request a copy of the personal data we hold about you.</li>
                        <li><strong>Right to rectification</strong> — request correction of inaccurate or incomplete data.</li>
                        <li>
                        <strong>Right to erasure</strong> — request deletion of your personal data, subject
                        to legal retention obligations.
                        </li>
                        <li>
                        <strong>Right to restrict processing</strong> — request that we limit how we use
                        your data in certain circumstances.
                        </li>
                        <li>
                        <strong>Right to data portability</strong> — receive your data in a structured,
                        machine-readable format.
                        </li>
                        <li>
                        <strong>Right to object</strong> — object to processing based on legitimate
                        interests, including for analytics purposes.
                        </li>
                        <li>
                        <strong>Right to withdraw consent</strong> — where processing is based on consent,
                        withdraw it at any time without affecting prior lawful processing.
                        </li>
                    </ul>
                    </AboutBody>

                    <AboutSubHeading>Rights under CCPA (California residents)</AboutSubHeading>
                    <AboutBody>
                    <ul className="list-disc ml-12 md:ml-6 space-y-2">
                        <li>Right to know what personal information we collect, use, disclose, and sell.</li>
                        <li>Right to delete personal information we have collected from you.</li>
                        <li>Right to opt out of the sale of personal information. We do not sell personal data.</li>
                        <li>Right to non-discrimination for exercising your privacy rights.</li>
                    </ul>
                    </AboutBody>

                    <AboutBody>
                    To exercise any of these rights, contact{" "}
                    <a className="underline" href="mailto:privacy@doow.co">privacy@doow.co</a>. We will
                    respond within 30 days. We may need to verify your identity before processing your
                    request.
                    </AboutBody>
                </AboutSection>

                <AboutSection>
                    <AboutTitle>Children&apos;s Privacy</AboutTitle>
                    <AboutBody>
                    The Doow Service is intended for use by organisations and their adult employees. We do
                    not knowingly collect personal data from anyone under the age of 16. If you believe we
                    have inadvertently collected data from a minor, please contact us at{" "}
                    <a className="underline" href="mailto:privacy@doow.co">privacy@doow.co</a> and we will
                    delete it promptly.
                    </AboutBody>
                </AboutSection>

                <AboutSection>
                    <AboutTitle>Changes to This Policy</AboutTitle>
                    <AboutBody>
                    We may update this Privacy Policy from time to time to reflect changes in our practices,
                    technology, legal requirements, or other factors. When we make material changes, we will
                    update the &ldquo;Last Updated&rdquo; date at the top of this page and, where
                    appropriate, notify you by email or via a notice within the platform.
                    </AboutBody>
                    <AboutBody>
                    Your continued use of the Service after any update constitutes acceptance of the revised
                    policy. We encourage you to review this page periodically.
                    </AboutBody>
                </AboutSection>

                <AboutSection>
                    <AboutTitle>Contact Us</AboutTitle>
                    <AboutBody>
                    If you have questions, concerns, or requests relating to this Privacy Policy or the
                    handling of your personal data, please contact us:
                    </AboutBody>
                    <AboutBody>
                    <ul className="list-disc ml-12 md:ml-6 space-y-2">
                        <li>
                        <strong>Privacy enquiries:</strong>{" "}
                        <a className="underline" href="mailto:privacy@doow.co">privacy@doow.co</a>
                        </li>
                        <li>
                        <strong>General support:</strong>{" "}
                        <a className="underline" href="mailto:support@doow.co">support@doow.co</a>
                        </li>
                    </ul>
                    </AboutBody>
                    <AboutBody>
                    If you are located in the EEA or UK and are not satisfied with our response, you have
                    the right to lodge a complaint with your local data protection authority.
                    </AboutBody>
                </AboutSection>

            </AboutWrapper>
        </MaxWidthWrapper>

        <Footer/>
    </div>
  );
}
