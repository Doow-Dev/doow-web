import type { FaqSectionContent } from "@/components/layout/faq";
import type { SiteFooterPromo } from "@/components/layout/footer";
import { doowAppLinks } from "@/lib/site/app-links";

import {
  integrationsConnectionsContent,
  type IntegrationsConnectionsContent,
} from "./connections-content";
import { integrationsFaqContent } from "./faq-content";
import { integrationsHeroContent, type IntegrationsHeroContent } from "./hero-content";
import {
  integrationsIntegrationListContent,
  type IntegrationsIntegrationListContent,
} from "./integration-list-content";

export interface IntegrationsPageContent {
  connections: IntegrationsConnectionsContent;
  hero: IntegrationsHeroContent;
  integrationList: IntegrationsIntegrationListContent;
  faq: FaqSectionContent;
  footerPromo: SiteFooterPromo;
}

const integrationsFooterPromo = {
  kind: "compactWithDescription",
  id: "integrations-footer-promo",
  title: "Connect the tools you already use",
  description: "Bring identity, finance, and HR data together so everything stays up to date.",
  cta: {
    href: doowAppLinks.signUp,
    label: "View Integrations",
  },
} as const satisfies SiteFooterPromo;

export const integrationsPageContent = {
  connections: integrationsConnectionsContent,
  hero: integrationsHeroContent,
  integrationList: integrationsIntegrationListContent,
  faq: integrationsFaqContent,
  footerPromo: integrationsFooterPromo,
} as const satisfies IntegrationsPageContent;

export {
  integrationsConnectionsContent,
  type IntegrationsConnectionsCard,
  type IntegrationsConnectionsCardId,
  type IntegrationsConnectionsContent,
} from "./connections-content";
export { integrationsFaqContent } from "./faq-content";
export { integrationsHeroContent, type IntegrationsHeroActionLink, type IntegrationsHeroContent } from "./hero-content";
export {
  integrationsIntegrationListContent,
  type IntegrationsIntegrationListContent,
} from "./integration-list-content";
