import Link from "next/link";
import Image from "next/image";
import type { ReactNode } from "react";
import { ScrollArea } from "@doow/ui/ui/scroll-area";

import { docsNavigation, docsSidebar } from "@/lib/docs/navigation";

import { AskDocsButton } from "./ask-docs-button";
import { DocsSearch, DocsSidebarSearch } from "./docs-search";
import { DocsSidebarNav, DocsTopNav } from "./docs-navigation";
import { ThemeToggle } from "./theme-toggle";

const repoUrl = process.env.NEXT_PUBLIC_DOCS_REPO_URL;

function DocsBrand({ className }: { className?: string }) {
  return (
    <Link className={`docs-brand ${className ?? ""}`.trim()} href="/" aria-label="Doow Docs home">
      <span className="docs-brand__logo-wrap" aria-hidden="true">
        <Image
          alt=""
          className="docs-brand__logo docs-brand__logo--light"
          height={40}
          priority
          src="/logos/doowFull.svg"
          width={129}
        />
        <Image
          alt=""
          className="docs-brand__logo docs-brand__logo--dark"
          height={22}
          priority
          src="/logos/doow-logo-white-full.svg"
          width={76}
        />
      </span>
      <span className="docs-brand__divider" aria-hidden="true" />
      <span className="docs-brand__docs">Docs</span>
    </Link>
  );
}

export function DocsShell({ children }: { children: ReactNode }) {
  return (
    <div className="docs-shell">
      <aside className="docs-sidebar">
        <DocsBrand className="docs-brand--sidebar" />
        <div className="docs-sidebar__panel">
          <div className="docs-sdk-card" aria-label="Current docs surface">
            <span>Integration docs</span>
            <strong>Usage, identity, HRIS</strong>
            <small>Connect the systems Doow reads to map usage and spend.</small>
          </div>
          <DocsSidebarSearch />
          <ScrollArea className="docs-sidebar__scroll-area" type="always">
            <DocsSidebarNav groups={docsSidebar} />
          </ScrollArea>
        </div>
      </aside>
      <main className="docs-main-pane">
        <header className="docs-topbar">
          <div className="docs-topbar__inner">
            <DocsBrand className="docs-brand--mobile" />
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
          {children}
        </div>
      </main>
    </div>
  );
}
