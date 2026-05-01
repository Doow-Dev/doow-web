import { integrationsPageContent } from "@/app/(site-pages)/integrations/content";
import { Container } from "@/components/system";
import { getIntegrationCatalogResponse } from "@/lib/server/integration-catalog-service";

import { IntegrationListTool } from "./integration-list-tool";

export async function IntegrationListSection() {
  const integrationList = integrationsPageContent.integrationList;
  const initialData = await getIntegrationCatalogResponse({
    categoryId: integrationList.initialCategoryId,
  });

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

          <IntegrationListTool content={integrationList} initialData={initialData} />
        </div>
      </Container>
    </section>
  );
}
