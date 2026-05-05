import Image from "next/image";

import { SitePageSectionShell } from "@/app/(site-pages)/_components/site-page-section-shell";
import { expensesPageContent } from "@/app/(site-pages)/expenses/content";
import { Badge } from "@/components/system";

export function ExpensesHeroSection() {
  const hero = expensesPageContent.hero;

  return (
    <section aria-labelledby="expenses-hero-heading" className="expenses-hero" id={hero.id}>
      <SitePageSectionShell className="expenses-hero__shell" section={hero.id}>
        <div className="expenses-hero__content">
          <Badge className="expenses-hero__badge" variant="muted">
            {hero.eyebrow}
          </Badge>

          <div className="expenses-hero__copy">
            <h1 className="expenses-hero__title" id="expenses-hero-heading">
              {hero.title.prefix} <span className="expenses-hero__title-accent">{hero.title.accent}</span>
            </h1>

            <p className="expenses-hero__description text-body-sm-normal">
              {hero.description.beforeBreak}
              <br />
              {hero.description.afterBreak}
            </p>
          </div>
        </div>
      </SitePageSectionShell>

      <div aria-hidden="true" className="expenses-hero__collage">
        {hero.cards.map((card) => (
          <div className="expenses-hero__card" data-tone={card.tone} key={card.id}>
            <div className="expenses-hero__card-tag">{card.accent}</div>
            <div className="expenses-hero__card-image-wrap">
              <Image
                alt=""
                className="expenses-hero__card-image"
                fill
                priority
                sizes="(min-width: 1024px) 320px, (min-width: 768px) 24vw, 44vw"
                src={card.asset.src}
              />
            </div>
          </div>
        ))}
      </div>

      <div aria-hidden="true" className="expenses-hero__divider" />
    </section>
  );
}
