import { SitePageSectionShell } from "@/app/(site-pages)/_components/site-page-section-shell";
import { expensesPageContent } from "@/app/(site-pages)/expenses/content";
import { SectionHeading } from "@/components/system";

function ExpensesClarityCardIcon() {
  return (
    <svg
      aria-hidden="true"
      className="expenses-clarity__card-icon-svg"
      fill="none"
      viewBox="0 0 22 22"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        clipRule="evenodd"
        d="M4.83464 4.5C5.30678 3.87049 6.04775 3.5 6.83464 3.5H15.168C15.9549 3.5 16.6959 3.87049 17.168 4.5L19.168 7.16667C19.2762 7.31091 19.3347 7.48636 19.3347 7.66667V8.5C19.3347 9.34532 19.0192 10.1178 18.5013 10.7048V16C18.5013 17.3807 17.3821 18.5 16.0013 18.5H6.00131C4.6206 18.5 3.50131 17.3807 3.50131 16V10.7048C2.9834 10.1178 2.66797 9.34532 2.66797 8.5V7.66667C2.66797 7.48636 2.72646 7.31091 2.83464 7.16667L4.83464 4.5ZM5.16797 11.7281V16C5.16797 16.4602 5.54107 16.8333 6.00131 16.8333H8.50131V15.1667C8.50132 13.7859 9.6206 12.6667 11.0013 12.6667C12.3821 12.6667 13.5013 13.786 13.5013 15.1667V16.8333H16.0013C16.4616 16.8333 16.8347 16.4602 16.8347 16V11.7281C16.5682 11.7968 16.2889 11.8333 16.0013 11.8333C15.0058 11.8333 14.1121 11.3969 13.5013 10.7049C12.8906 11.3969 11.9969 11.8333 11.0013 11.8333C10.0058 11.8333 9.1121 11.3969 8.50131 10.7049C7.89052 11.3969 6.99689 11.8333 6.00131 11.8333C5.71372 11.8333 5.43444 11.7968 5.16797 11.7281Z"
        fill="currentColor"
        fillRule="evenodd"
      />
    </svg>
  );
}

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
                  <ExpensesClarityCardIcon />
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
