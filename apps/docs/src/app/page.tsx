import Link from "next/link";

import { DocsShell } from "@/components/docs/docs-shell";
import { docsNavigation } from "@/lib/docs/navigation";

export default function DocsIndexPage() {
  return (
    <DocsShell>
      <main className="docs-home" id="content">
        <div className="docs-home__intro">
          <p className="docs-kicker">Doow documentation</p>
          <h1>Build clean software spend workflows with Doow.</h1>
          <p>
            Start with the product basics, then move into guides, integration
            references, and release notes as the docs surface grows.
          </p>
        </div>
        <div className="docs-home__grid" aria-label="Documentation sections">
          {docsNavigation.map((item) => (
            <Link className="docs-card-link" href={item.href} key={item.href}>
              <span>{item.label}</span>
              <p>{item.description}</p>
            </Link>
          ))}
        </div>
      </main>
    </DocsShell>
  );
}
