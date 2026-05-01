import { SitePageSectionShell } from "@/app/(site-pages)/_components/site-page-section-shell";
import { SubscriptionsOverviewShowcase } from "@/app/(site-pages)/subscriptions/components/subscriptions-overview-showcase";
import { subscriptionsPageContent } from "@/app/(site-pages)/subscriptions/content";
import { SectionHeading } from "@/components/system";

export function SubscriptionsOverviewSection() {
  const section = subscriptionsPageContent.overview;

  return (
    <section aria-labelledby="subscriptions-overview-heading" className="subscriptions-overview" id={section.id}>
      <SitePageSectionShell className="subscriptions-overview__shell" section={section.id}>
        <SectionHeading
          align="center"
          className="subscriptions-overview__heading"
          description={section.description}
          descriptionClassName="subscriptions-overview__description"
          descriptionVariant="md"
          headingTag="h2"
          stackClassName="subscriptions-overview__heading-stack"
          title={
            <span id="subscriptions-overview-heading">
              All Subscriptions in one
              <br />
              place
            </span>
          }
          titleClassName="subscriptions-overview__title"
        />

        <SubscriptionsOverviewShowcase cards={section.cards} />
      </SitePageSectionShell>
    </section>
  );
}
