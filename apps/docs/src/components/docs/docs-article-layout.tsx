import { ArrowRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";

import type { DocsPage } from "@/lib/docs/types";

import { DocsShell } from "./docs-shell";
import { DocsToc } from "./docs-toc";
import { PageActions } from "./page-actions";

export function DocsArticleLayout({
  children,
  page,
}: {
  children: ReactNode;
  page: DocsPage;
}) {
  return (
    <DocsShell>
      <main className="docs-article" id="content">
        <article>
          <header className="docs-article__header">
            <div className="docs-page-meta">
              <p className="docs-kicker">{page.section}</p>
              {page.updatedAt ? <time dateTime={page.updatedAt}>Updated {page.updatedAt}</time> : null}
              <PageActions slug={page.slug} title={page.title} />
            </div>
            <h1>{page.title}</h1>
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
