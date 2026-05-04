import { alternativeAppsPageContent } from "@/app/(site-pages)/alternative-apps/content";
import { QueryErrorMessage } from "@/components/layout/shared";
import { Badge, Container } from "@/components/system";
import { getAlternativeAppsCatalogResponse } from "@/lib/server/alternative-apps-service";

import { AlternativeAppsCatalogTool } from "./alternative-apps-catalog-tool";

export async function AlternativeAppsHeroCatalogSection() {
  const { catalog, hero } = alternativeAppsPageContent;
  let initialData = null;

  try {
    initialData = await getAlternativeAppsCatalogResponse();
  } catch (error) {
    console.error("Alternative apps hero catalog failed to load initial data.", error);
  }

  return (
    <section aria-labelledby="alternative-apps-hero-heading" className="alternative-apps-page-hero" id={hero.id}>
      <Container className="alternative-apps-page-hero__shell" variant="siteFooterPromo">
        <div className="alternative-apps-page-hero__intro">
          <Badge className="alternative-apps-page-hero__eyebrow" variant="muted">
            {hero.eyebrow}
          </Badge>

          <div className="alternative-apps-page-hero__copy">
            <h1 className="alternative-apps-page-hero__title" id="alternative-apps-hero-heading">
              {hero.title}
            </h1>
            <p className="alternative-apps-page-hero__description">{hero.description}</p>
          </div>
        </div>

        {initialData ? (
          <AlternativeAppsCatalogTool content={catalog} initialData={initialData} />
        ) : (
          <div className="catalog-browse alternative-apps-catalog" data-catalog-browse-namespace="alternative-apps-catalog">
            <QueryErrorMessage
              message="We could not load the application catalog right now. Please try again later."
              title="Application catalog unavailable"
            />
          </div>
        )}
      </Container>
    </section>
  );
}
