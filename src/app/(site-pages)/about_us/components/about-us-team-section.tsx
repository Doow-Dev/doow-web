import Image from "next/image";
import Link from "next/link";

import { SitePageSectionShell } from "@/app/(site-pages)/_components/site-page-section-shell";
import { aboutUsPageContent, type AboutUsTeamLogoContent } from "@/app/(site-pages)/about_us/content";
import { Button } from "@/components/system";

function AboutUsTeamLogo({ logo }: { logo: AboutUsTeamLogoContent }) {
  return (
    <span className="about-us-team__logo" data-logo-id={logo.id}>
      <Image alt={logo.label} className="about-us-team__logo-image" height={logo.height} src={logo.src} width={logo.width} />
    </span>
  );
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
                    <Image alt="" aria-hidden="true" height={link.iconHeight} src={link.iconSrc} width={link.iconWidth} />
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
