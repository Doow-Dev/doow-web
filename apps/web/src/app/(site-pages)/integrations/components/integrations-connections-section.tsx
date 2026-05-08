import { integrationsPageContent } from "@/app/(site-pages)/integrations/content";
import { SitePageSectionShell } from "@/app/(site-pages)/_components/site-page-section-shell";

import { IntegrationsConnectionsShowcase } from "./integrations-connections-showcase";

export function IntegrationsConnectionsSection() {
  const connections = integrationsPageContent.connections;

  return (
    <section
      aria-labelledby="integrations-connections-heading"
      className="integrations-connections"
      id={connections.id}
    >
      <SitePageSectionShell className="integrations-connections__shell" section={connections.id}>
        <div className="integrations-connections__layout">
          <div className="integrations-connections__intro">
            <h2 className="integrations-connections__title" id="integrations-connections-heading">
              {connections.title}
            </h2>
            <p className="integrations-connections__description">{connections.description}</p>
          </div>

          <IntegrationsConnectionsShowcase content={connections} />
        </div>
      </SitePageSectionShell>
    </section>
  );
}
