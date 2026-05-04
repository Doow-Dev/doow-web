import Link from "next/link";

import { DoowLogo } from "@/components/custom/icons/doow_logo";
import { EmailIcon } from "@/components/custom/icons/email-icon";
import { LinkedInIcon } from "@/components/custom/icons/linkedin-icon";
import { XIcon } from "@/components/custom/icons/x-icon";
import { Container, FooterList } from "@/components/system";

import { ContactUsDialog } from "./contact-us-dialog";
import type { SiteFooterBodyContent } from "./content";

export interface SiteFooterBodyProps {
  body: SiteFooterBodyContent;
}

export function SiteFooterBody({ body }: SiteFooterBodyProps) {
  const [productsGroup, companyGroup] = body.groups;
  const headingId = `${body.id}-heading`;

  return (
    <footer aria-labelledby={headingId} className="site-footer" id={body.id}>
      <Container
        className="site-footer__shell"
        data-layout-shell="siteFooterBodyShell"
        data-section="footer-body"
        variant="siteFooterBody"
      >
        <div className="site-footer__layout">
          <h2 className="sr-only" id={headingId}>
            {body.title}
          </h2>

          <div className="site-footer__brand">
            <DoowLogo height={22} imageClassName="site-footer__logo" priority={false} width={77} />
          </div>

          <div aria-hidden="true" className="site-footer__divider" />

          <div className="site-footer__main">
            <nav aria-label={body.navigationAriaLabel} className="site-footer__nav">
              <FooterList
                className="site-footer__group"
                items={productsGroup.items}
                linkClassName="site-footer__link"
                listClassName="site-footer__list"
                title={productsGroup.title}
                titleClassName="site-footer__group-title"
                titleTag="p"
              />

              <div className="site-footer__group">
                <p className="site-footer__group-title">{companyGroup.title}</p>
                <ul className="site-footer__list">
                  {companyGroup.items.map((item) => (
                    <li key={item.href}>
                      {item.action === "contactDialog" ? (
                        <ContactUsDialog triggerClassName="site-footer__link" triggerLabel={item.label} />
                      ) : (
                        <Link className="site-footer__link" href={item.href} rel={item.rel} target={item.target}>
                          {item.label}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </nav>

            <section aria-labelledby={`${body.id}-contact-heading`} className="site-footer__contact">
              <h3 className="site-footer__group-title" id={`${body.id}-contact-heading`}>
                Contact
              </h3>

              <address className="site-footer__address">
                {body.addressLines.map((line) => (
                  <p key={line}>{line}</p>
                ))}
              </address>
            </section>

            <section aria-labelledby={`${body.id}-disclaimer-heading`} className="site-footer__disclaimer">
              <h3 className="site-footer__disclaimer-title" id={`${body.id}-disclaimer-heading`}>
                {body.disclaimer.title}
              </h3>

              <div className="site-footer__disclaimer-copy">
                {body.disclaimer.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </section>
          </div>

          <div aria-hidden="true" className="site-footer__divider" />

          <div className="site-footer__bottom">
            <p className="site-footer__copyright">{body.copyright}</p>

            <ul aria-label="Social links" className="site-footer__social-list">
              {body.socialLinks.map((link) => (
                <li key={link.kind}>
                  <Link
                    aria-label={link.label}
                    className="site-footer__social-link"
                    href={link.href}
                    rel={link.rel}
                    target={link.target}
                  >
                    {link.kind === "linkedin" ? <LinkedInIcon /> : null}
                    {link.kind === "x" ? <XIcon /> : null}
                    {link.kind === "email" ? <EmailIcon /> : null}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </footer>
  );
}
