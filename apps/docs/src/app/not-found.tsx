import Link from "next/link";

import { DocsShell } from "@/components/docs/docs-shell";

export default function NotFound() {
  return (
    <DocsShell>
      <main className="docs-empty" id="content">
        <p className="docs-kicker">404</p>
        <h1>That docs page is not published.</h1>
        <p>Use the docs navigation to return to an available section.</p>
        <Link className="docs-primary-link" href="/">
          Back to docs
        </Link>
      </main>
    </DocsShell>
  );
}
