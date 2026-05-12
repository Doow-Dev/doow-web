import { ArrowRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";

import { getDocsPager } from "@/lib/docs/navigation";
import type { DocsPage } from "@/lib/docs/types";

import { ArticlePager } from "./article-pager";
import { DocsShell } from "./docs-shell";
import { DocsToc } from "./docs-toc";
import { PageActions } from "./page-actions";
import { WasThisHelpful } from "./was-this-helpful";

const footerColumns = [
  {
    label: "Get started",
    links: [
      { label: "Integrations overview", href: "/integrations" },
      { label: "Connecting integrations", href: "/integrations/connect" },
      { label: "Accounting", href: "/integrations/accounting" },
    ],
  },
  {
    label: "Usage data",
    links: [
      { label: "Direct provider APIs", href: "/integrations/usage/direct-provider-apis" },
      { label: "Instrumentation SDK", href: "/integrations/usage/instrumentation-sdk" },
      { label: "Observability", href: "/integrations/usage/observability" },
    ],
  },
  {
    label: "Organization data",
    links: [
      { label: "Google Workspace", href: "/integrations/identity/google-workspace" },
      { label: "Microsoft 365", href: "/integrations/identity/microsoft-365" },
      { label: "HRIS overview", href: "/integrations/hris" },
    ],
  },
];

export function DocsArticleLayout({
  children,
  page,
}: {
  children: ReactNode;
  page: DocsPage;
}) {
  const { prev, next } = getDocsPager(page.slug);

  return (
    <DocsShell>
      <main className="docs-article" id="content">
        <article>
          <header className="docs-article__header">
            <div className="docs-page-meta">
              <p className="docs-kicker">{page.section}</p>
              {page.updatedAt ? <time dateTime={page.updatedAt}>Updated {page.updatedAt}</time> : null}
            </div>
            <div className="docs-article__title-row">
              <h1>{page.title}</h1>
              <PageActions slug={page.slug} title={page.title} />
            </div>
            <p>{page.description}</p>
            {page.prerequisites && page.prerequisites.length > 0 ? (
              <div className="docs-prereqs" aria-label="Prerequisites">
                <span>Prerequisites</span>
                <ul>
                  {page.prerequisites.map((item) => (
                    <li key={item}>
                      <CheckCircle2 aria-hidden="true" size={14} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </header>
          <div className="docs-prose">{children}</div>
          {page.nextSteps && page.nextSteps.length > 0 ? (
            <section className="docs-next-steps" aria-labelledby="docs-next-steps-heading">
              <h2 id="docs-next-steps-heading">Next steps</h2>
              <div className="docs-next-steps__grid">
                {page.nextSteps.map((step) => (
                  <Link className="docs-next-steps__card" href={step.href} key={step.href}>
                    <strong>{step.title}</strong>
                    {step.description ? <p>{step.description}</p> : null}
                    <span>
                      Open <ArrowRight aria-hidden="true" size={14} />
                    </span>
                  </Link>
                ))}
              </div>
            </section>
          ) : null}
          <WasThisHelpful slug={page.slug} />
          <ArticlePager prev={prev} next={next} />
          <section className="docs-home__footer docs-article__footer" aria-labelledby="docs-article-footer">
            <h2 className="sr-only" id="docs-article-footer">
              More resources
            </h2>
            <div className="docs-footer-grid">
              {footerColumns.map((col) => (
                <div className="docs-footer-col" key={col.label}>
                  <h3>{col.label}</h3>
                  <ul>
                    {col.links.map((link) => (
                      <li key={link.href}>
                        <Link href={link.href}>{link.label}</Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        </article>
        <aside className="docs-right-rail" aria-label="Page tools">
          <section className="docs-toc" aria-label="On this page">
            <p>On this page</p>
            <DocsToc items={page.toc} />
          </section>
          <section className="docs-rail-card" aria-label="Doow app">
            <span>Doow app</span>
            <strong>Ready to map software spend?</strong>
            <p>Open the app while you follow the docs.</p>
            <a href="https://dev.doow.co" rel="noopener noreferrer" target="_blank">
              Open app <ArrowRight aria-hidden="true" size={14} />
            </a>
          </section>
        </aside>
      </main>
    </DocsShell>
  );
}
