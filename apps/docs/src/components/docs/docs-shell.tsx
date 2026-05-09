import Link from "next/link";
import type { ReactNode } from "react";

import { docsNavigation, docsSidebar } from "@/lib/docs/navigation";

import { AskDocsButton } from "./ask-docs-button";
import { DocsSearch } from "./docs-search";
import { DocsSidebarNav, DocsTopNav } from "./docs-navigation";
import { ThemeToggle } from "./theme-toggle";

const repoUrl = process.env.NEXT_PUBLIC_DOCS_REPO_URL;

export function DocsShell({ children }: { children: ReactNode }) {
  return (
    <div className="docs-shell">
      <header className="docs-topbar">
        <div className="docs-topbar__inner">
          <Link className="docs-brand" href="/">
            <span className="docs-brand__mark" aria-hidden="true">D</span>
            <span>
              <strong>Doow</strong>
              <small>Docs</small>
            </span>
          </Link>
          <DocsSearch />
          <DocsTopNav items={docsNavigation} />
          <div className="docs-topbar__actions">
            <AskDocsButton />
            {repoUrl ? (
              <a aria-label="View repository on GitHub" className="docs-icon-link" href={repoUrl} rel="noopener noreferrer" target="_blank">
                <svg aria-hidden="true" fill="currentColor" height="16" viewBox="0 0 24 24" width="16" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.4 3-.405 1.02.005 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                </svg>
              </a>
            ) : null}
            <ThemeToggle />
            <a className="docs-app-link" href="https://dev.doow.co" rel="noopener noreferrer" target="_blank">
              Open app
            </a>
          </div>
        </div>
      </header>
      <div className="docs-shell__body">
        <aside className="docs-sidebar">
          <div className="docs-sidebar__panel">
            <div className="docs-sdk-card" aria-label="Current docs surface">
              <span>Documentation</span>
              <strong>Core docs</strong>
              <small>Setup, workflows, reference, and release notes.</small>
            </div>
            <DocsSidebarNav groups={docsSidebar} />
          </div>
        </aside>
        {children}
      </div>
    </div>
  );
}
