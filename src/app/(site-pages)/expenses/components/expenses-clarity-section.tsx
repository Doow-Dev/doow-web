import Image from "next/image";

import { SitePageCardIcon } from "@/app/(site-pages)/_components/site-page-card-icon";
import { SiteFeatureCardGrid } from "@/app/(site-pages)/_components/site-feature-card-grid";
import { SitePageSectionShell } from "@/app/(site-pages)/_components/site-page-section-shell";
import { expensesPageContent } from "@/app/(site-pages)/expenses/content";
import { SectionHeading } from "@/components/system";

const CLARITY_ILLUSTRATION_ART = "/assets/illustrations/integrations-hero-art.svg";
const CLARITY_ILLUSTRATION_MASK = "/assets/illustrations/integrations-hero-mask.svg";

export function ExpensesClaritySection() {
  const section = expensesPageContent.clarity;
  const cardCells = ["top-left", "top-right", "bottom-left", "bottom-right"] as const;

  return (
    <section aria-labelledby="expenses-clarity-heading" className="expenses-clarity" id={section.id}>
      <div aria-hidden="true" className="expenses-clarity__illustration">
        <div
          className="expenses-clarity__illustration-mask"
          style={{
            WebkitMaskImage: `url("${CLARITY_ILLUSTRATION_MASK}")`,
            maskImage: `url("${CLARITY_ILLUSTRATION_MASK}")`,
          }}
        >
          <div className="expenses-clarity__illustration-art">
            <Image
              alt=""
              className="expenses-clarity__illustration-image"
              fill
              sizes="100vw"
              src={CLARITY_ILLUSTRATION_ART}
              style={{ objectFit: "fill" }}
              unoptimized
            />
          </div>
        </div>
      </div>

      <SitePageSectionShell className="expenses-clarity__shell" section={section.id}>
        <div className="expenses-clarity__layout">
          <SectionHeading
            align="left"
            className="expenses-clarity__heading"
            description={section.description}
            descriptionVariant="md"
            descriptionClassName="expenses-clarity__description"
            headingTag="h2"
            stackClassName="expenses-clarity__heading-stack"
            titleClassName="expenses-clarity__title"
            title={<span id="expenses-clarity-heading">{section.title}</span>}
          />

          <SiteFeatureCardGrid
            classNames={{
              card: "expenses-clarity__card",
              copy: "expenses-clarity__card-copy",
              description: "expenses-clarity__card-description",
              grid: "expenses-clarity__grid",
              iconWrap: "expenses-clarity__icon-wrap",
              title: "expenses-clarity__card-title",
            }}
            getCardProps={(_card, index) => ({
              "data-cell": cardCells[index],
              "data-surface": index === 0 || index === section.cards.length - 1 ? "subtle" : "base",
            })}
            items={section.cards.map((card) => ({
              description: card.description,
              icon: <SitePageCardIcon className="expenses-clarity__card-icon-svg" />,
              id: card.title,
              title: card.title,
            }))}
          />
        </div>
      </SitePageSectionShell>
    </section>
  );
}
