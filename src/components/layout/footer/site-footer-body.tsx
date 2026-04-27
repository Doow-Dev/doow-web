import { DoowLogo } from "@/components/custom/icons/doow_logo";
import { Container, FooterList } from "@/components/system";

import type { SiteFooterBodyContent } from "./content";

export interface SiteFooterBodyProps {
  body: SiteFooterBodyContent;
}

export function SiteFooterBody({ body }: SiteFooterBodyProps) {
  const [solutionsGroup, companyGroup, contactGroup] = body.groups;
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

          <nav aria-label={body.navigationAriaLabel} className="site-footer__nav">
            <FooterList
              className="site-footer__group"
              items={solutionsGroup.items}
              linkClassName="site-footer__link"
              listClassName="site-footer__list"
              title={solutionsGroup.title}
              titleClassName="site-footer__group-title"
              titleTag="p"
            />

            <FooterList
              className="site-footer__group"
              items={companyGroup.items}
              linkClassName="site-footer__link"
              listClassName="site-footer__list"
              title={companyGroup.title}
              titleClassName="site-footer__group-title"
              titleTag="p"
            />

            <div className="site-footer__group">
              <FooterList
                items={contactGroup.items}
                linkClassName="site-footer__link"
                listClassName="site-footer__list"
                title={contactGroup.title}
                titleClassName="site-footer__group-title"
                titleTag="p"
              />

              <address className="site-footer__address">
                {body.addressLines.map((line) => (
                  <p key={line}>{line}</p>
                ))}
              </address>
            </div>
          </nav>

          <div aria-hidden="true" className="site-footer__divider" />

          <p className="site-footer__copyright">{body.copyright}</p>
        </div>
      </Container>
    </footer>
  );
}
