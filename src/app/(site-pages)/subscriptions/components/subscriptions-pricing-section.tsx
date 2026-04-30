import Link from "next/link";
import { Check } from "lucide-react";

import { SitePageSectionShell } from "@/app/(site-pages)/_components/site-page-section-shell";
import { subscriptionsPageContent } from "@/app/(site-pages)/subscriptions/content";
import type { SubscriptionsPricingPlan } from "@/app/(site-pages)/subscriptions/content/pricing-content";
import { Button, SectionHeading } from "@/components/system";

function PlanFeatureList({
  features,
  tone,
}: Pick<SubscriptionsPricingPlan, "features" | "tone">) {
  return (
    <ul className="subscriptions-pricing__feature-list">
      {features.map((feature) => (
        <li className="subscriptions-pricing__feature-item" data-tone={tone} key={feature.label}>
          <span aria-hidden="true" className="subscriptions-pricing__feature-icon">
            <Check size={10} strokeWidth={2.4} />
          </span>
          <span>{feature.label}</span>
        </li>
      ))}
    </ul>
  );
}

function PlanCard({ plan }: { plan: SubscriptionsPricingPlan }) {
  const isEnterprise = plan.tone === "enterprise";
  const isFeatured = plan.tone === "featured";

  return (
    <article className="subscriptions-pricing__plan-card" data-plan-tone={plan.tone}>
      <div className="subscriptions-pricing__plan-surface">
        <div className="subscriptions-pricing__plan-intro">
          <h2 className="subscriptions-pricing__plan-name">{plan.name}</h2>
          <p className="subscriptions-pricing__plan-description">{plan.description}</p>
        </div>

        {plan.priceLabel ? (
          <div className="subscriptions-pricing__plan-price-row">
            <span className="subscriptions-pricing__plan-price">{plan.priceLabel}</span>
            <span className="subscriptions-pricing__plan-price-suffix">{plan.priceSuffix}</span>
          </div>
        ) : null}

        <Button
          asChild
          className="subscriptions-pricing__plan-cta"
          size="base"
          variant={isEnterprise ? "neutral" : "secondary"}
        >
          <Link href={plan.cta.href}>{plan.cta.label}</Link>
        </Button>

        {!isEnterprise ? <div aria-hidden="true" className="subscriptions-pricing__plan-divider" /> : null}

        <div className="subscriptions-pricing__plan-features">
          {!isEnterprise ? (
            <p className="subscriptions-pricing__feature-eyebrow">{plan.featureEyebrow}</p>
          ) : null}
          <PlanFeatureList features={plan.features} tone={isFeatured ? "featured" : plan.tone} />
        </div>
      </div>
    </article>
  );
}

export function SubscriptionsPricingSection() {
  const pricing = subscriptionsPageContent.pricing;
  const [basicPlan, featuredPlan, enterprisePlan] = pricing.plans;

  return (
    <section aria-labelledby="subscriptions-pricing-heading" className="subscriptions-pricing" id={pricing.id}>
      <SitePageSectionShell className="subscriptions-pricing__shell" section={pricing.id}>
        <div className="subscriptions-pricing__layout">
          <SectionHeading
            align="center"
            className="subscriptions-pricing__heading"
            description={pricing.description}
            descriptionClassName="subscriptions-pricing__heading-description"
            descriptionVariant="md"
            eyebrow={pricing.eyebrow}
            eyebrowVariant="muted"
            headingTag="h1"
            stackClassName="subscriptions-pricing__heading-stack"
            title={
              <span id="subscriptions-pricing-heading">
                {pricing.titleLines[0]}
                <br />
                {pricing.titleLines[1]}
              </span>
            }
            titleClassName="subscriptions-pricing__heading-title"
          />

          <div aria-label="Billing interval" className="subscriptions-pricing__billing" role="group">
            <span className="subscriptions-pricing__billing-option" data-selected="false">
              {pricing.billing.monthlyLabel}
            </span>
            <span className="subscriptions-pricing__billing-option" data-selected="true">
              <span>{pricing.billing.yearlyLabel}</span>
              <span className="subscriptions-pricing__billing-discount">{pricing.billing.annualDiscountLabel}</span>
            </span>
          </div>

          <div className="subscriptions-pricing__plans-grid">
            <PlanCard plan={basicPlan} />
            <PlanCard plan={featuredPlan} />
            <PlanCard plan={enterprisePlan} />
          </div>
        </div>
      </SitePageSectionShell>
    </section>
  );
}
