import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { ScrollArea } from "@doow/ui/ui/scroll-area";

import { helpCategories } from "@/lib/help/navigation";
import type { HelpArticle } from "@/lib/help/types";

import { CrispChat } from "./crisp-chat";
import { HelpSearch, HelpSidebarSearch } from "./help-search";
import { HelpSidebarNav } from "./help-navigation";
import { HelpThemeToggle } from "./help-theme-toggle";

function HelpBrand({ className }: { className?: string }) {
  return (
    <Link
      aria-label="Doow Help Center home"
      className={`help-brand ${className ?? ""}`.trim()}
      href="/help"
    >
      <span aria-hidden="true" className="help-brand__logo-wrap">
        <Image
          alt=""
          className="help-brand__logo help-brand__logo--light"
          height={40}
          priority
          src="/logos/doowFull.svg"
          width={129}
        />
        <Image
          alt=""
          className="help-brand__logo help-brand__logo--dark"
          height={22}
          priority
          src="/logos/doow-logo-white-full.svg"
          width={76}
        />
      </span>
      <span aria-hidden="true" className="help-brand__divider" />
      <span className="help-brand__label">Help Center</span>
    </Link>
  );
}

export function HelpShell({
  children,
  articles,
}: {
  children: ReactNode;
  articles: HelpArticle[];
}) {
  return (
    <div className="help-shell">
      <CrispChat />
      <aside className="help-sidebar">
        <HelpBrand className="help-brand--sidebar" />
        <div className="help-sidebar__panel">
          <HelpSidebarSearch />
          <ScrollArea className="help-sidebar__scroll-area" type="always">
            <HelpSidebarNav articles={articles} categories={helpCategories} />
          </ScrollArea>
        </div>
      </aside>
      <main className="help-main-pane">
        <header className="help-topbar">
          <div className="help-topbar__inner">
            <HelpBrand className="help-brand--mobile" />
            <HelpSearch />
            <div />
            <div className="help-topbar__actions">
              <HelpThemeToggle />
              <a
                className="help-app-link"
                href="https://dev.doow.co"
                rel="noopener noreferrer"
                target="_blank"
              >
                Open app
              </a>
            </div>
          </div>
        </header>
        <div className="help-shell__body">{children}</div>
      </main>
    </div>
  );
}
