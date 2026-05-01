import { alternativeAppsPageContent } from "@/app/(site-pages)/alternative-apps/content";
import { Badge, Container } from "@/components/system";
import { getAlternativeAppsCatalogResponse } from "@/lib/server/alternative-apps-service";

import { AlternativeAppsCatalogTool } from "./alternative-apps-catalog-tool";

export async function AlternativeAppsHeroCatalogSection() {
  const { catalog, hero } = alternativeAppsPageContent;
  const initialData = await getAlternativeAppsCatalogResponse();

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

        <AlternativeAppsCatalogTool content={catalog} initialData={initialData} />
      </Container>
    </section>
  );
}
