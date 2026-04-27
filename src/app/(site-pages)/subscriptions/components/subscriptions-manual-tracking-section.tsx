import { SitePageSectionShell } from "@/app/(site-pages)/_components/site-page-section-shell";
import { subscriptionsPageContent } from "@/app/(site-pages)/subscriptions/content";
import { Card, SectionHeading } from "@/components/system";

function ManualTrackingIcon() {
  return (
    <svg
      aria-hidden="true"
      className="subscriptions-manual__item-icon-svg"
      fill="none"
      viewBox="0 0 18 18"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4.5 9.25L7.25 12L13.5 5.75"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.75"
      />
    </svg>
  );
}

function RenewalCalendar() {
  const weekLabels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const days = Array.from({ length: 30 }, (_, index) => index + 1);

  return (
    <div className="subscriptions-manual__calendar">
      <div className="subscriptions-manual__calendar-top">
        <span className="subscriptions-manual__calendar-month">October</span>
        <span className="subscriptions-manual__calendar-badge">Renewals</span>
      </div>

      <div className="subscriptions-manual__calendar-weekdays">
        {weekLabels.map((label) => (
          <span key={label}>{label}</span>
        ))}
      </div>

      <div className="subscriptions-manual__calendar-grid">
        {days.map((day) => (
          <span
            className="subscriptions-manual__calendar-day"
            data-highlight={day === 18 ? "primary" : day === 22 ? "accent" : undefined}
            key={day}
          >
            {day}
          </span>
        ))}
      </div>
    </div>
  );
}

export function SubscriptionsManualTrackingSection() {
  const section = subscriptionsPageContent.manualTracking;

  return (
    <section
      aria-labelledby="subscriptions-manual-tracking-heading"
      className="subscriptions-manual"
      id={section.id}
    >
      <SitePageSectionShell className="subscriptions-manual__shell" section={section.id}>
        <div className="subscriptions-manual__layout">
          <div className="subscriptions-manual__copy">
            <SectionHeading
              className="subscriptions-manual__heading"
              description={section.description}
              descriptionClassName="subscriptions-manual__description"
              descriptionVariant="md"
              headingTag="h2"
              stackClassName="subscriptions-manual__heading-stack"
              title={<span id="subscriptions-manual-tracking-heading">{section.title}</span>}
              titleClassName="subscriptions-manual__title"
            />

            <div className="subscriptions-manual__items">
              {section.items.map((item) => (
                <Card className="subscriptions-manual__item" key={item.title} padding="md">
                  <span aria-hidden="true" className="subscriptions-manual__item-icon">
                    <ManualTrackingIcon />
                  </span>
                  <div className="subscriptions-manual__item-copy">
                    <h3 className="subscriptions-manual__item-title">{item.title}</h3>
                    <p className="subscriptions-manual__item-description">{item.description}</p>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          <div className="subscriptions-manual__visual-wrap">
            <div className="subscriptions-manual__visual">
              <RenewalCalendar />
            </div>
            <div className="subscriptions-manual__visual-copy">
              <h3 className="subscriptions-manual__visual-title">{section.visualTitle}</h3>
              <p className="subscriptions-manual__visual-caption">{section.visualCaption}</p>
            </div>
          </div>
        </div>
      </SitePageSectionShell>
    </section>
  );
}
