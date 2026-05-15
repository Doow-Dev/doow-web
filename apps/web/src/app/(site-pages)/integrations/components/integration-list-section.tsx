import { integrationsPageContent } from "@/app/(site-pages)/integrations/content";
import { QueryErrorMessage } from "@/components/layout/shared";
import { Container } from "@/components/system";
import { getIntegrationCatalogResponse } from "@/lib/server/integration-catalog-service";

import { IntegrationListTool } from "./integration-list-tool";

export async function IntegrationListSection() {
  const integrationList = integrationsPageContent.integrationList;
  let initialData = null;

  try {
    initialData = await getIntegrationCatalogResponse({
      categoryId: integrationList.initialCategoryId,
    });
  } catch (error) {
    console.error("Integration catalog failed to load initial data.", error);
  }

  return (
    <section
      aria-labelledby="integration-list-heading"
      className="integration-list"
      id={integrationList.id}
    >
      <Container
        className="integration-list__shell"
        data-layout-shell="sitePageSectionShell"
        data-section={integrationList.id}
        variant="siteFooterPromo"
      >
        <div className="integration-list__layout">
          <div className="integration-list__intro">
            <h2 className="integration-list__title" id="integration-list-heading">
              {integrationList.title}
            </h2>
            <p className="integration-list__description">{integrationList.description}</p>
          </div>

          {initialData ? (
            <IntegrationListTool content={integrationList} initialData={initialData} />
          ) : (
            <div className="catalog-browse integration-list" data-catalog-browse-namespace="integration-list">
              <QueryErrorMessage
                message="We could not load the integration catalog right now. Please try again later."
                title="Integration catalog unavailable"
              />
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
