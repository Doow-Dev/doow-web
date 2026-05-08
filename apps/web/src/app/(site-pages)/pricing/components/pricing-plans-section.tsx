"use client";

import Link from "next/link";
import { useState } from "react";

import { SitePageSectionShell } from "@/app/(site-pages)/_components/site-page-section-shell";
import { pricingPageContent } from "@/app/(site-pages)/pricing/content";
import type { PricingPlanFeature } from "@/app/(site-pages)/pricing/content/plans-content";
import { Badge, Button } from "@/components/system";

type BillingCadence = "monthly" | "yearly";

function PricingFeatureList({ features }: { features: readonly PricingPlanFeature[] }) {
  return (
    <ul className="pricing-plans__features" role="list">
      {features.map((feature, index) => (
        <li className="pricing-plans__feature" key={`${feature.label}-${feature.emphasis ?? "plain"}-${index}`}>
          <span aria-hidden="true" className="pricing-plans__feature-icon">
            <svg fill="none" viewBox="0 0 18 18">
              <circle cx="9" cy="9" fill="currentColor" opacity="0.16" r="9" />
              <path d="m6 9 2 2 4-5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.4" />
            </svg>
          </span>
          <span>
            {feature.label}
            {feature.emphasis ? (
              <>
                {" "}
                <strong>{feature.emphasis}</strong>
              </>
            ) : null}
          </span>
        </li>
      ))}
    </ul>
  );
}

export function PricingPlansSection() {
  const pricing = pricingPageContent.plans;
  const [basicPlan, proPlan] = pricing.plans;
  const [billingCadence, setBillingCadence] = useState<BillingCadence>("yearly");

  return (
    <section aria-labelledby="pricing-plans-heading" className="pricing-plans" id={pricing.id}>
      <SitePageSectionShell className="pricing-plans__shell" section={pricing.id}>
        <div className="pricing-plans__heading">
          <Badge variant="muted">{pricing.eyebrow}</Badge>
          <div className="pricing-plans__heading-stack">
            <h1 className="pricing-plans__title" id="pricing-plans-heading">
              {pricing.title[0]}
              <br />
              {pricing.title[1]}
            </h1>
            <p className="pricing-plans__description">{pricing.description}</p>
          </div>
        </div>

        <div className="pricing-plans__billing-toggle" aria-label="Billing cadence">
          <button
            aria-pressed={billingCadence === "monthly"}
            className="pricing-plans__billing-option"
            data-active={billingCadence === "monthly"}
            onClick={() => setBillingCadence("monthly")}
            type="button"
          >
            {pricing.billingToggle.monthly}
          </button>
          <button
            aria-pressed={billingCadence === "yearly"}
            className="pricing-plans__billing-option"
            data-active={billingCadence === "yearly"}
            onClick={() => setBillingCadence("yearly")}
            type="button"
          >
            {pricing.billingToggle.yearly}
            <span className="pricing-plans__billing-discount">{pricing.billingToggle.discount}</span>
          </button>
        </div>

        <div className="pricing-plans__grid">
          {[basicPlan, proPlan].map((plan) => (
            <article className="pricing-plans__card" data-plan-tone={plan.tone} key={plan.id}>
              <div className="pricing-plans__card-gradient" aria-hidden="true" />
              <div className="pricing-plans__card-header">
                <h2 className="pricing-plans__plan-name">{plan.name}</h2>
                <p className="pricing-plans__plan-description">{plan.description}</p>
              </div>

              <div className="pricing-plans__price-row">
                <span className="pricing-plans__price">{plan.prices[billingCadence]}</span>
                <span className="pricing-plans__price-suffix">{plan.priceSuffix}</span>
              </div>

              <Button asChild className="pricing-plans__plan-cta" size="base" variant="secondary">
                <Link href={plan.cta.href}>{plan.cta.label}</Link>
              </Button>

              <div className="pricing-plans__divider" />
              <p className="pricing-plans__feature-eyebrow">{plan.eyebrow}</p>
              <PricingFeatureList features={plan.features} />
            </article>
          ))}

          <article className="pricing-plans__enterprise">
            <div className="pricing-plans__enterprise-card">
              <h2 className="pricing-plans__enterprise-title">{pricing.enterprise.name}</h2>
              <p className="pricing-plans__enterprise-description">{pricing.enterprise.description}</p>
              <Button asChild className="pricing-plans__enterprise-cta" size="base" variant="neutral">
                <Link href={pricing.enterprise.cta.href}>{pricing.enterprise.cta.label}</Link>
              </Button>
            </div>
            <PricingFeatureList features={pricing.enterprise.features} />
          </article>
        </div>
      </SitePageSectionShell>
    </section>
  );
}
