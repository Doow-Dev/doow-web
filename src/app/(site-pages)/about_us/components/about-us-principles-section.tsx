import { BookOpenText, Lightbulb, Route, RotateCcw } from "lucide-react";

import { SitePageSectionShell } from "@/app/(site-pages)/_components/site-page-section-shell";
import { aboutUsPageContent, type AboutUsPrincipleCardContent } from "@/app/(site-pages)/about_us/content";

function AboutUsPrincipleIcon({ icon }: Pick<AboutUsPrincipleCardContent, "icon">) {
  switch (icon) {
    case "lightbulb":
      return <Lightbulb aria-hidden="true" className="about-us-principles__icon-svg" strokeWidth={2.1} />;
    case "route":
      return <Route aria-hidden="true" className="about-us-principles__icon-svg" strokeWidth={2.1} />;
    case "rotate":
      return <RotateCcw aria-hidden="true" className="about-us-principles__icon-svg" strokeWidth={2.1} />;
    case "book":
      return <BookOpenText aria-hidden="true" className="about-us-principles__icon-svg" strokeWidth={2.1} />;
    default:
      return null;
  }
}

export function AboutUsPrinciplesSection() {
  const section = aboutUsPageContent.principles;

  return (
    <section aria-labelledby="about-us-principles-heading" className="about-us-principles" id={section.id}>
      <SitePageSectionShell className="about-us-principles__shell" section={section.id}>
        <h2 className="sr-only" id="about-us-principles-heading">
          About Doow principles
        </h2>

        <div className="about-us-principles__grid" role="list">
          {section.cards.map((card) => (
            <article
              className="site-feature-card about-us-principles__card"
              data-tone={card.tone}
              key={card.id}
              role="listitem"
            >
              <div className="site-feature-card__icon-wrap about-us-principles__icon">
                <AboutUsPrincipleIcon icon={card.icon} />
              </div>

              <div className="about-us-principles__copy">
                <h3 className="about-us-principles__card-title">{card.title}</h3>
                <p className="about-us-principles__card-description">{card.description}</p>
              </div>
            </article>
          ))}
        </div>
      </SitePageSectionShell>
    </section>
  );
}
