import { SitePageCardIcon } from "@/app/(site-pages)/_components/site-page-card-icon";
import { SitePageSectionShell } from "@/app/(site-pages)/_components/site-page-section-shell";
import { expensesPageContent } from "@/app/(site-pages)/expenses/content";
import { SectionHeading } from "@/components/system";

export function ExpensesClaritySection() {
  const section = expensesPageContent.clarity;
  const cardCells = ["top-left", "top-right", "bottom-left", "bottom-right"] as const;

  return (
    <section aria-labelledby="expenses-clarity-heading" className="expenses-clarity" id={section.id}>
      <SitePageSectionShell className="expenses-clarity__shell" section={section.id}>
        <div aria-hidden="true" className="expenses-clarity__backdrop" />

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

          <ul className="expenses-clarity__grid" role="list">
            {section.cards.map((card, index) => (
              <li
                className="expenses-clarity__card"
                data-cell={cardCells[index]}
                data-surface={index === 0 || index === section.cards.length - 1 ? "subtle" : "base"}
                key={card.title}
              >
                <span aria-hidden="true" className="expenses-clarity__icon-wrap">
                  <SitePageCardIcon className="expenses-clarity__card-icon-svg" />
                </span>
                <div className="expenses-clarity__card-copy">
                  <h3 className="expenses-clarity__card-title">{card.title}</h3>
                  <p className="expenses-clarity__card-description">{card.description}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </SitePageSectionShell>
    </section>
  );
}
