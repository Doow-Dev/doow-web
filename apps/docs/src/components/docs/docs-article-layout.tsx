import type { ReactNode } from "react";

import type { DocsPage } from "@/lib/docs/types";

import { DocsShell } from "./docs-shell";

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
            <p className="docs-kicker">{page.section}</p>
            <h1>{page.title}</h1>
            <p>{page.description}</p>
          </header>
          <div className="docs-prose">{children}</div>
        </article>
        <aside className="docs-toc" aria-label="On this page">
          <p>On this page</p>
          {page.toc.length > 0 ? (
            <nav>
              {page.toc.map((item) => (
                <a data-depth={item.depth} href={`#${item.id}`} key={item.id}>
                  {item.text}
                </a>
              ))}
            </nav>
          ) : null}
        </aside>
      </main>
    </DocsShell>
  );
}
