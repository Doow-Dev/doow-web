import Link from "next/link";

import { getAllHelpArticles } from "@/lib/help/content";
import { HelpShell } from "@/components/help/help-shell";

export default async function HelpNotFound() {
  const articles = await getAllHelpArticles();

  return (
    <HelpShell articles={articles}>
      <div className="help-not-found">
        <h1>Page not found</h1>
        <p>The article you&apos;re looking for doesn&apos;t exist or has been moved.</p>
        <Link href="/help">Back to Help Center</Link>
      </div>
    </HelpShell>
  );
}
