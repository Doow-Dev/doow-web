import type { ComponentType, ReactNode } from "react";
import Link from "next/link";

import { Button, SectionHeading } from "@/components/system";

import { pricingSectionContent } from "../content";
import { PricingBackgroundLoop } from "./pricing-background-loop";

export interface PricingSectionProps {
  Shell: ComponentType<{ children: ReactNode }>;
}

export function PricingSection({ Shell }: PricingSectionProps) {
  const pricing = pricingSectionContent;

  return (
    <>
      <section aria-labelledby="pricing-heading" className="pricing" id={pricing.id}>
        <PricingBackgroundLoop backgrounds={pricing.backgrounds} />

        <div aria-hidden="true" className="pricing__overlay" />

        <Shell>
          <div className="pricing__layout">
            <SectionHeading
              align="center"
              className="pricing__heading"
              description={<span className="pricing__description-copy">{pricing.description}</span>}
              descriptionClassName="pricing__heading-description"
              eyebrow={pricing.eyebrow}
              eyebrowVariant="overlay"
              headingTag="h2"
              stackClassName="pricing__heading-stack"
              title={
                <span className="pricing__heading-copy" id="pricing-heading">
                  {pricing.titleLines[0]}
                  <br />
                  {pricing.titleLines[1]}
                </span>
              }
              titleClassName="pricing__heading-title"
            />

            <Button asChild className="pricing__cta" size="base" variant="secondary">
              <Link href={pricing.cta.href}>{pricing.cta.label}</Link>
            </Button>
          </div>
        </Shell>
      </section>

      <div aria-hidden="true" className="pricing__plans-anchor" id={pricing.placeholderAnchorId} />
    </>
  );
}
