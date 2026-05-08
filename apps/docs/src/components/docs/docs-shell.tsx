import Link from "next/link";
import type { ReactNode } from "react";

import { docsNavigation } from "@/lib/docs/navigation";

export function DocsShell({ children }: { children: ReactNode }) {
  return (
    <div className="docs-shell">
      <header className="docs-topbar">
        <Link className="docs-brand" href="/">
          <span className="docs-brand__mark" aria-hidden="true" />
          <span>Doow Docs</span>
        </Link>
        <nav className="docs-topnav" aria-label="Primary documentation navigation">
          {docsNavigation.map((item) => (
            <Link href={item.href} key={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>
      </header>
      <div className="docs-shell__body">
        <aside className="docs-sidebar" aria-label="Documentation sections">
          <nav>
            {docsNavigation.map((item) => (
              <Link className="docs-sidebar__link" href={item.href} key={item.href}>
                <span>{item.label}</span>
                <small>{item.description}</small>
              </Link>
            ))}
          </nav>
        </aside>
        {children}
      </div>
    </div>
  );
}
