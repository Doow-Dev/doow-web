import { DocsShell } from "@/components/docs/docs-shell";

export default function DocsNotFound() {
  return (
    <DocsShell>
      <div className="docs-empty">
        <h1>Page not found</h1>
        <p>This documentation page does not exist or has been moved.</p>
      </div>
    </DocsShell>
  );
}
