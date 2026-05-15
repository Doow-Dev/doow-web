import type { ReactNode } from "react";

import { SiteFooter } from "@/components/layout/footer";

export function LegalPageShell({
  children,
  lastUpdated,
  title,
}: {
  children: ReactNode;
  lastUpdated: string;
  title: string;
}) {
  return (
    <div className="legal-page" data-figma-node="1689:2511">
      <section aria-labelledby="legal-page-title" className="legal-page__primary">
        <div className="legal-page__hero">
          <div className="legal-page__updated" aria-label={`Last updated ${lastUpdated}`}>
            <p className="legal-page__updated-label">Last Updated</p>
            <p className="legal-page__updated-date">{lastUpdated}</p>
          </div>

          <h1 className="legal-page__title" id="legal-page-title">
            {title}
          </h1>
        </div>

        <div className="legal-page__content-band">
          <article className="legal-page__article">{children}</article>
        </div>
      </section>

      <div aria-hidden="true" className="legal-page__footer-spacer" />
      <SiteFooter />
    </div>
  );
}

export function AboutTitle({ children }: { children: ReactNode }) {
  return <h2 className="legal-page__section-title">{children}</h2>;
}

export function AboutSubHeading({ children }: { children: ReactNode }) {
  return <h3 className="legal-page__subheading">{children}</h3>;
}

export function AboutBody({ children }: { children: ReactNode }) {
  return <div className="legal-page__body">{children}</div>;
}

export function AboutSection({ children }: { children: ReactNode }) {
  return <section className="legal-page__section">{children}</section>;
}

export function AboutWrapper({ children }: { children: ReactNode }) {
  return <div className="legal-page__copy">{children}</div>;
}
