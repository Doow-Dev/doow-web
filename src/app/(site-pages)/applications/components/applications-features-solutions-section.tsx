import { SitePageSectionShell } from "@/app/(site-pages)/_components/site-page-section-shell";
import { ApplicationsFeaturesSolutionsShowcase } from "@/app/(site-pages)/applications/components/applications-features-solutions-showcase";
import { applicationsPageContent } from "@/app/(site-pages)/applications/content";
import { SectionHeading } from "@/components/system";

export function ApplicationsFeaturesSolutionsSection() {
  const featuresSolutions = applicationsPageContent.featuresSolutions;

  return (
    <section
      aria-labelledby="applications-features-solutions-heading"
      className="applications-features-solutions"
      id={featuresSolutions.id}
    >
      <SitePageSectionShell className="applications-features-solutions__shell" section={featuresSolutions.id}>
          <SectionHeading
            align="center"
            className="applications-features-solutions__heading"
            description={featuresSolutions.description}
            descriptionClassName="applications-features-solutions__heading-description"
            descriptionVariant="md"
            headingTag="h2"
            title={
              <span id="applications-features-solutions-heading">
                Clarity for your entire
                <br />
                software stack
              </span>
            }
            titleClassName="applications-features-solutions__heading-title"
          />

          <ApplicationsFeaturesSolutionsShowcase cards={featuresSolutions.cards} />
      </SitePageSectionShell>
    </section>
  );
}
