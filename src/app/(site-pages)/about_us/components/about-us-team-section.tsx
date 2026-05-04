import Link from "next/link";
import { FaLinkedinIn, FaXTwitter } from "react-icons/fa6";

import { SitePageSectionShell } from "@/app/(site-pages)/_components/site-page-section-shell";
import { aboutUsPageContent, type AboutUsTeamLinkContent, type AboutUsTeamLogoContent } from "@/app/(site-pages)/about_us/content";
import { Button } from "@/components/system";

function AboutUsTeamLogo({ logo }: { logo: AboutUsTeamLogoContent }) {
  if (logo.id === "about-us-team-logo-traqq") {
    return (
      <span className="about-us-team__logo about-us-team__logo--traqq">
        <span aria-hidden="true" className="about-us-team__logo-mark" />
        <span className="about-us-team__logo-label">{logo.label}</span>
      </span>
    );
  }

  if (logo.id === "about-us-team-logo-sytch") {
    return (
      <span className="about-us-team__logo about-us-team__logo--sytch" data-logo-id={logo.id}>
        <span className="about-us-team__logo-label">{logo.label}</span>
        <span className="about-us-team__logo-subcopy">by truffle</span>
      </span>
    );
  }

  return (
    <span className="about-us-team__logo about-us-team__logo--clerk" data-logo-id={logo.id}>
      <span aria-hidden="true" className="about-us-team__logo-clerk-dot" />
      <span className="about-us-team__logo-label">{logo.label}</span>
    </span>
  );
}

function AboutUsTeamLinkIcon({ platform }: Pick<AboutUsTeamLinkContent, "platform">) {
  if (platform === "linkedin") {
    return <FaLinkedinIn aria-hidden="true" size={14} />;
  }

  return <FaXTwitter aria-hidden="true" size={14} />;
}

export function AboutUsTeamSection() {
  const section = aboutUsPageContent.team;

  return (
    <section aria-labelledby="about-us-team-heading" className="about-us-team" id={section.id}>
      <SitePageSectionShell className="about-us-team__shell" section={section.id}>
        <div className="about-us-team__content">
          <div className="about-us-team__copy">
            <h2 className="about-us-team__title" id="about-us-team-heading">
              {section.title}
            </h2>
            <p className="about-us-team__description">{section.description}</p>
          </div>

          <div aria-label="Companies our team has worked with" className="about-us-team__logos" role="list">
            {section.logos.map((logo) => (
              <div className="about-us-team__logo-wrap" key={logo.id} role="listitem">
                <AboutUsTeamLogo logo={logo} />
              </div>
            ))}
          </div>

          <div className="about-us-team__links">
            {section.links.map((link) => (
              <Button asChild className="about-us-team__link-button" key={link.id} size="base" variant="secondary">
                <Link href={link.href} rel="noopener noreferrer" target="_blank">
                  <span className="about-us-team__link-icon-wrap">
                    <AboutUsTeamLinkIcon platform={link.platform} />
                  </span>
                  <span>{link.label}</span>
                </Link>
              </Button>
            ))}
          </div>
        </div>
      </SitePageSectionShell>
    </section>
  );
}
