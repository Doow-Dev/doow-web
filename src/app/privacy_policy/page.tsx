import React from "react";
import { AboutBody, AboutSection, AboutSubHeading, AboutTitle, TopSection } from "../_components/terms-privacy";
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
            subtitle="Updated: 3rd of April, 2023"
            icon={ <ShieldCheck className="h-8 w-8"/>} 
        />

        <MaxWidthWrapper className="relative py-28">
            <div className="w-full md:w-8/12 mx-auto">
                <AboutSection>
                    <AboutTitle>Introduction</AboutTitle>
                    <AboutBody>
                    It&apos;s important for you to know what data we collect from you and
                    how we use it, so you can make informed decisions about what you share.
                    </AboutBody>
                    <AboutBody>
                    The purpose of this Privacy Policy is to provide you with a
                    detailed explanation of how Doow collects, uses, and shares
                    information about you as well as your rights and choices regarding
                    such information.
                    </AboutBody>
                </AboutSection>
                <AboutSection>
                    <AboutSubHeading>The Data We Collect</AboutSubHeading>
                    <AboutBody>
                    We don’t require you to provide any personal information to visit
                    www.doow.co. However, when you’re on www.doow.co, we collect
                    personal information directly from you in a number of ways.
                    </AboutBody>
                    <AboutBody>
                    We may need the following information from you when you use
                    certain website features, such as joining our waitlist, accessing
                    specific content, or contacting us directly:
                    </AboutBody>
                    <AboutBody>
                    <ul className="list-disc ml-12 md:ml-6">
                        <li>Name, email address, postal address, and mobile number</li>
                        <li>Messages and requests sent to us via our contact us form</li>
                    </ul>
                    </AboutBody>

                    <AboutSubHeading>
                    Doow may automatically collect certain data when you visit and
                    interact with our website
                    </AboutSubHeading>
                    <AboutBody>
                    We are a team of dreamers, doers and professionals with an
                    outstanding record of building software in financial services and
                    other leading industries.
                    </AboutBody>
                    <AboutBody>
                    When you visit Doow, data may be collected automatically,
                    <ul>
                        <li>IP address of device</li>
                        <li>Type of browser and operating system</li>
                    </ul>
                    </AboutBody>
                    <AboutSubHeading>
                    Data we collect from other sources
                    </AboutSubHeading>
                    <AboutBody>
                    We may collect data about you from third-party sources (such as
                    social media and ad targeting platforms), including:
                    </AboutBody>
                    <AboutBody>
                    <ul className="list-disc ml-12 md:ml-6">
                        <li>
                        If you access third-party social media platforms (such as
                        Facebook or Twitter) through the Doow website, we may collect
                        your username and connections for those platforms.
                        </li>
                        <li>
                        Detailed information about user interactions with
                        advertisements, including view rates, ad click-through rates,
                        and conversion rates.
                        </li>
                        <li>
                        Demographic data, such as interests, gender, and age group
                        </li>
                    </ul>
                    </AboutBody>
                    <AboutBody>
                    In some cases, we may combine the information we collect with
                    information we obtain from third parties.
                    </AboutBody>
                </AboutSection>
                <AboutSection>
                    <AboutTitle>How We Use The Data We Collect</AboutTitle>
                    <AboutSubHeading>Email communications</AboutSubHeading>
                    <AboutBody>
                    We may use the information we collect to send you emails, such as
                    waitlist updates and messages about our features and products. You
                    will also receive newsletter updates if you are subscribed to our
                    email newsletters.
                    </AboutBody>
                    <AboutSubHeading>Offer products and services</AboutSubHeading>
                    <AboutBody>
                    We may use the information you provide to fulfill your product and
                    service requests. For example, your information may be used to
                    respond to customer support tickets or to allow you participate in
                    polls and surveys.
                    </AboutBody>
                    <AboutSubHeading>Information Sharing</AboutSubHeading>
                    <AboutBody>
                    Doow respects your privacy and shares user information only when
                    necessary. We will only make your data available to other websites
                    when:
                    </AboutBody>

                    <AboutBody>
                    <ul className="list-disc ml-12 md:ml-6">
                        <li>
                        Doow uses third parties for API integrations, database
                        management, analytics, marketing, data processing, and email
                        distribution. We only provide these third parties with your
                        information so that they can perform these tasks on our
                        behalf.
                        </li>
                        <li>
                        By emailing support@doow.co, you can request that we don’t
                        share your name, address, or other information with these
                        third parties.
                        </li>
                    </ul>
                    </AboutBody>
                    <AboutTitle>Confidentiality and Security</AboutTitle>
                    <AboutBody>
                    Your data will only be accessible to employees or service
                    providers who reasonably need it to provide products or services
                    to you. To protect your data from loss, misuse, and alteration, we
                    have also adopted industry-standard technical, physical, and
                    administrative procedures. We want you to feel confident using the
                    Doow website, but we can’t warrant the security of your
                    information.
                    </AboutBody>
                    <AboutTitle>Privacy Policy Changes</AboutTitle>
                    <AboutBody>
                    This privacy policy may be updated at any time to reflect changes
                    in our practices and product offerings. In the event that this
                    privacy policy is modified, we will update its effective date
                    below. Whenever we make any changes to how we handle your data, we
                    will place a prominent banner on our site or send you an email.
                    </AboutBody>
                </AboutSection>
            </div>
        </MaxWidthWrapper>

        {/* <div className="flex flex-col items-center">
            <div className="my-10 w-4/5 md:w-11/12 text-left bg-white p-12 md:p-6 rounded-xl">
            <AboutSection>
                <AboutTitle>Introduction</AboutTitle>
                <AboutBody>
                It&apos;s important for you to know what data we collect from you and
                how we use it, so you can make informed decisions about what you share.
                </AboutBody>
                <AboutBody>
                The purpose of this Privacy Policy is to provide you with a
                detailed explanation of how Doow collects, uses, and shares
                information about you as well as your rights and choices regarding
                such information.
                </AboutBody>
            </AboutSection>
            <AboutSection>
                <AboutSubHeading>The Data We Collect</AboutSubHeading>
                <AboutBody>
                We don’t require you to provide any personal information to visit
                www.doow.co. However, when you’re on www.doow.co, we collect
                personal information directly from you in a number of ways.
                </AboutBody>
                <AboutBody>
                We may need the following information from you when you use
                certain website features, such as joining our waitlist, accessing
                specific content, or contacting us directly:
                </AboutBody>
                <AboutBody>
                <ul className="list-disc ml-12 md:ml-6">
                    <li>Name, email address, postal address, and mobile number</li>
                    <li>Messages and requests sent to us via our contact us form</li>
                </ul>
                </AboutBody>

                <AboutSubHeading>
                Doow may automatically collect certain data when you visit and
                interact with our website
                </AboutSubHeading>
                <AboutBody>
                We are a team of dreamers, doers and professionals with an
                outstanding record of building software in financial services and
                other leading industries.
                </AboutBody>
                <AboutBody>
                When you visit Doow, data may be collected automatically,
                <ul>
                    <li>IP address of device</li>
                    <li>Type of browser and operating system</li>
                </ul>
                </AboutBody>
                <AboutSubHeading>
                Data we collect from other sources
                </AboutSubHeading>
                <AboutBody>
                We may collect data about you from third-party sources (such as
                social media and ad targeting platforms), including:
                </AboutBody>
                <AboutBody>
                <ul className="list-disc ml-12 md:ml-6">
                    <li>
                    If you access third-party social media platforms (such as
                    Facebook or Twitter) through the Doow website, we may collect
                    your username and connections for those platforms.
                    </li>
                    <li>
                    Detailed information about user interactions with
                    advertisements, including view rates, ad click-through rates,
                    and conversion rates.
                    </li>
                    <li>
                    Demographic data, such as interests, gender, and age group
                    </li>
                </ul>
                </AboutBody>
                <AboutBody>
                In some cases, we may combine the information we collect with
                information we obtain from third parties.
                </AboutBody>
            </AboutSection>

            <AboutSection>
                <AboutTitle>How We Use The Data We Collect</AboutTitle>
                <AboutSubHeading>Email communications</AboutSubHeading>
                <AboutBody>
                We may use the information we collect to send you emails, such as
                waitlist updates and messages about our features and products. You
                will also receive newsletter updates if you are subscribed to our
                email newsletters.
                </AboutBody>
                <AboutSubHeading>Offer products and services</AboutSubHeading>
                <AboutBody>
                We may use the information you provide to fulfill your product and
                service requests. For example, your information may be used to
                respond to customer support tickets or to allow you participate in
                polls and surveys.
                </AboutBody>
                <AboutSubHeading>Information Sharing</AboutSubHeading>
                <AboutBody>
                Doow respects your privacy and shares user information only when
                necessary. We will only make your data available to other websites
                when:
                </AboutBody>

                <AboutBody>
                <ul className="list-disc ml-12 md:ml-6">
                    <li>
                    Doow uses third parties for API integrations, database
                    management, analytics, marketing, data processing, and email
                    distribution. We only provide these third parties with your
                    information so that they can perform these tasks on our
                    behalf.
                    </li>
                    <li>
                    By emailing support@doow.co, you can request that we don’t
                    share your name, address, or other information with these
                    third parties.
                    </li>
                </ul>
                </AboutBody>
                <AboutTitle>Confidentiality and Security</AboutTitle>
                <AboutBody>
                Your data will only be accessible to employees or service
                providers who reasonably need it to provide products or services
                to you. To protect your data from loss, misuse, and alteration, we
                have also adopted industry-standard technical, physical, and
                administrative procedures. We want you to feel confident using the
                Doow website, but we can’t warrant the security of your
                information.
                </AboutBody>
                <AboutTitle>Privacy Policy Changes</AboutTitle>
                <AboutBody>
                This privacy policy may be updated at any time to reflect changes
                in our practices and product offerings. In the event that this
                privacy policy is modified, we will update its effective date
                below. Whenever we make any changes to how we handle your data, we
                will place a prominent banner on our site or send you an email.
                </AboutBody>
            </AboutSection>
            </div>
        </div> */}
        <Footer/>
    </div>
  );
}