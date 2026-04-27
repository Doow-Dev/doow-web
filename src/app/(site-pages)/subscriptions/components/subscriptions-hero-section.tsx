import { ArrowUpRight, Building2, MousePointer2, Pencil } from "lucide-react";
import Link from "next/link";

import { SitePageSectionShell } from "@/app/(site-pages)/_components/site-page-section-shell";
import { subscriptionsPageContent } from "@/app/(site-pages)/subscriptions/content";
import { Badge, Button } from "@/components/system";

function SubscriptionsDashboardMetric({
  label,
  tone = "default",
  value,
}: {
  label: string;
  tone?: "default" | "danger" | "success";
  value: string;
}) {
  return (
    <div className="subscriptions-hero__metric">
      <span className="subscriptions-hero__metric-label">{label}</span>
      <span className="subscriptions-hero__metric-value" data-tone={tone}>
        {value}
      </span>
    </div>
  );
}

function SubscriptionsStatusPill({ status }: { status: "active" | "inactive" }) {
  return (
    <span className="subscriptions-hero__status-pill" data-status={status}>
      {status === "active" ? "Active" : "Inactive"}
    </span>
  );
}

function SubscriptionsDashboardCard({
  amountSpent,
  licenseCount,
  name,
  plan,
  showActions,
  status,
  subscriptionValue,
  underUtilizedSpend,
  utilizedSpend,
}: {
  amountSpent: string;
  licenseCount: string;
  name: string;
  plan: string;
  showActions?: boolean;
  status: "active" | "inactive";
  subscriptionValue: string;
  underUtilizedSpend: string;
  utilizedSpend: string;
}) {
  return (
    <article className="subscriptions-hero__subscription-card" data-has-actions={showActions ? "true" : "false"}>
      <div className="subscriptions-hero__subscription-card-top">
        <div className="subscriptions-hero__subscription-card-title-row">
          <span aria-hidden="true" className="subscriptions-hero__subscription-card-mark">
            <Building2 size={13} strokeWidth={1.9} />
          </span>
          <h2 className="subscriptions-hero__subscription-card-name">{name}</h2>
        </div>

        {showActions ? (
          <div aria-hidden="true" className="subscriptions-hero__subscription-card-actions">
            <span className="subscriptions-hero__subscription-card-action">
              <Pencil size={13} strokeWidth={1.9} />
            </span>
            <span className="subscriptions-hero__subscription-card-action">
              <ArrowUpRight size={13} strokeWidth={1.9} />
            </span>
          </div>
        ) : null}
      </div>

      <div className="subscriptions-hero__subscription-card-tags">
          <span className="subscriptions-hero__plan-pill">{plan}</span>
          <SubscriptionsStatusPill status={status} />
      </div>

      <dl className="subscriptions-hero__subscription-stats">
        <div className="subscriptions-hero__subscription-stat">
          <dt>Subscription Value</dt>
          <dd>{subscriptionValue}</dd>
        </div>
        <div className="subscriptions-hero__subscription-stat">
          <dt>Amount Spent</dt>
          <dd>{amountSpent}</dd>
        </div>
        <div className="subscriptions-hero__subscription-stat">
          <dt>No of License Plan</dt>
          <dd>{licenseCount}</dd>
        </div>
        <div className="subscriptions-hero__subscription-stat">
          <dt>Utilized Spend</dt>
          <dd data-tone="success">{utilizedSpend}</dd>
        </div>
        <div className="subscriptions-hero__subscription-stat">
          <dt>Under-utilized Spend</dt>
          <dd data-tone="danger">{underUtilizedSpend}</dd>
        </div>
      </dl>

      {showActions ? (
        <span aria-hidden="true" className="subscriptions-hero__subscription-card-cursor">
          <MousePointer2 size={15} strokeWidth={1.9} />
        </span>
      ) : null}
    </article>
  );
}

export function SubscriptionsHeroSection() {
  const hero = subscriptionsPageContent.hero;

  return (
    <section aria-labelledby="subscriptions-hero-heading" className="subscriptions-hero" id={hero.id}>
      <div aria-hidden="true" className="subscriptions-hero__backdrop" />

      <SitePageSectionShell className="subscriptions-hero__shell" section={hero.id}>
        <div className="subscriptions-hero__content">
          <Badge className="subscriptions-hero__badge" variant="muted">
            {hero.eyebrow}
          </Badge>

          <div className="subscriptions-hero__copy">
            <h1 className="subscriptions-hero__title" id="subscriptions-hero-heading">
              {hero.title}
            </h1>
            <p className="subscriptions-hero__description text-body-sm-normal">{hero.description}</p>
          </div>

          <Button asChild className="subscriptions-hero__cta" size="base" variant="primary">
            <Link href={hero.cta.href}>{hero.cta.label}</Link>
          </Button>
        </div>
      </SitePageSectionShell>

      <div aria-hidden="true" className="subscriptions-hero__dashboard-shell">
        <div className="subscriptions-hero__dashboard">
          <div className="subscriptions-hero__window-chrome">
            <span />
            <span />
            <span />
          </div>

          <div className="subscriptions-hero__metrics">
            {hero.metrics.map((metric) => (
              <SubscriptionsDashboardMetric key={metric.label} label={metric.label} tone={metric.tone} value={metric.value} />
            ))}
          </div>

          <div className="subscriptions-hero__subscription-grid">
            {hero.subscriptions.map((subscription) => (
              <SubscriptionsDashboardCard key={subscription.id} {...subscription} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
