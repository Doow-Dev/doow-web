import { SitePageSectionShell } from "@/app/(site-pages)/_components/site-page-section-shell";
import { subscriptionsPageContent } from "@/app/(site-pages)/subscriptions/content";
import type { SubscriptionsOverviewVisual } from "@/app/(site-pages)/subscriptions/content/overview-content";
import { Card, SectionHeading } from "@/components/system";

function OverviewTeamsVisual() {
  const initials = ["AO", "UI", "NL", "PT", "FE", "PM", "FN", "SA"];

  return (
    <div className="subscriptions-overview__visual-frame subscriptions-overview__visual-frame--teams">
      <div className="subscriptions-overview__avatar-row">
        {initials.map((initial, index) => (
          <span className="subscriptions-overview__avatar" data-tone={index % 4} key={initial}>
            {initial}
          </span>
        ))}
      </div>
      <div className="subscriptions-overview__visual-bar" />
      <div className="subscriptions-overview__visual-footnote">Connected by team and function</div>
    </div>
  );
}

function OverviewStatusVisual() {
  const rows = [
    { label: "Slack", status: "Active" },
    { label: "Notion", status: "Active" },
    { label: "Webflow", status: "Review" },
  ];

  return (
    <div className="subscriptions-overview__visual-frame subscriptions-overview__visual-frame--status">
      {rows.map((row) => (
        <div className="subscriptions-overview__status-row" key={row.label}>
          <span>{row.label}</span>
          <span className="subscriptions-overview__status-pill">{row.status}</span>
        </div>
      ))}
    </div>
  );
}

function OverviewTableVisual() {
  const rows = [
    ["Owner", "Ops Team"],
    ["Seats", "32"],
    ["Spend", "$4,240"],
    ["Next Renewal", "18 Oct"],
  ];

  return (
    <div className="subscriptions-overview__visual-frame subscriptions-overview__visual-frame--table">
      {rows.map(([label, value]) => (
        <div className="subscriptions-overview__table-row" key={label}>
          <span>{label}</span>
          <strong>{value}</strong>
        </div>
      ))}
    </div>
  );
}

function OverviewCalendarVisual() {
  const days = Array.from({ length: 28 }, (_, index) => index + 1);

  return (
    <div className="subscriptions-overview__visual-frame subscriptions-overview__visual-frame--calendar">
      <div className="subscriptions-overview__calendar-top">
        <span>Renewals</span>
        <span className="subscriptions-overview__calendar-chip">3 upcoming</span>
      </div>
      <div className="subscriptions-overview__calendar-grid">
        {days.map((day) => (
          <span
            className="subscriptions-overview__calendar-day"
            data-accent={day === 7 || day === 18 || day === 24 ? "true" : undefined}
            key={day}
          >
            {day}
          </span>
        ))}
      </div>
    </div>
  );
}

function OverviewVisual({ visual }: { visual: SubscriptionsOverviewVisual }) {
  if (visual === "teams") {
    return <OverviewTeamsVisual />;
  }

  if (visual === "status") {
    return <OverviewStatusVisual />;
  }

  if (visual === "table") {
    return <OverviewTableVisual />;
  }

  return <OverviewCalendarVisual />;
}

export function SubscriptionsOverviewSection() {
  const section = subscriptionsPageContent.overview;

  return (
    <section aria-labelledby="subscriptions-overview-heading" className="subscriptions-overview" id={section.id}>
      <SitePageSectionShell className="subscriptions-overview__shell" section={section.id}>
        <div aria-hidden="true" className="subscriptions-overview__backdrop" />

        <SectionHeading
          align="center"
          className="subscriptions-overview__heading"
          description={section.description}
          descriptionClassName="subscriptions-overview__description"
          descriptionVariant="md"
          headingTag="h2"
          stackClassName="subscriptions-overview__heading-stack"
          title={<span id="subscriptions-overview-heading">{section.title}</span>}
          titleClassName="subscriptions-overview__title"
        />

        <div className="subscriptions-overview__grid">
          {section.cards.map((card) => (
            <Card className="subscriptions-overview__card" key={card.title} padding="md">
              <OverviewVisual visual={card.visual} />
              <div className="subscriptions-overview__card-copy">
                <h3 className="subscriptions-overview__card-title">{card.title}</h3>
                <p className="subscriptions-overview__card-description">{card.description}</p>
              </div>
            </Card>
          ))}
        </div>
      </SitePageSectionShell>
    </section>
  );
}
