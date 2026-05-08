import { SitePageSectionShell } from "@/app/(site-pages)/_components/site-page-section-shell";
import { ApplicationsProblemsTool } from "@/app/(site-pages)/applications/components/applications-problems-tool";
import { applicationsPageContent } from "@/app/(site-pages)/applications/content";

export function ApplicationsProblemsSection() {
  const problems = applicationsPageContent.problems;

  return (
    <section aria-labelledby="applications-problems-heading" className="applications-problems" id={problems.id}>
      <SitePageSectionShell className="applications-problems__shell" section={problems.id}>
        <ApplicationsProblemsTool content={problems} />
      </SitePageSectionShell>
    </section>
  );
}
