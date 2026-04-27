import type { LandingActionLink } from "@/app/(landing)/_components/shared";
import type { IntegrationAppStaticAsset } from "@/components/custom/icons/integration-app-icon-registry";

export interface IntegrationAppLogo {
  id: string;
  name: string;
  domain?: string;
  brandNameFallback?: string;
  logoAsset?: IntegrationAppStaticAsset;
}

export interface IntegrationProvider {
  id: string;
  name: string;
  regionLabel?: string;
  centerLogo?: IntegrationAppLogo;
  orbitApps: readonly IntegrationAppLogo[];
  description?: string;
}

export type IntegrationOrbitLayout = "topArc" | "bottomArc";

export interface IntegrationCardView {
  id: string;
  label: string;
  title: string;
  description: string;
  providers: readonly IntegrationProvider[];
  showProviderBrand?: boolean;
}

export interface IntegrationCard {
  id: string;
  initialViewId: string;
  orbitLayout: IntegrationOrbitLayout;
  views: readonly IntegrationCardView[];
}

export interface IntegrationsSectionContent {
  id: string;
  title: string;
  description: string;
  cta: LandingActionLink;
  maxVisibleOrbitApps: number;
  cards: readonly [IntegrationCard, IntegrationCard, IntegrationCard, IntegrationCard];
}

const plaidCenterLogo = {
  id: "plaid-center",
  name: "Plaid",
  domain: "plaid.com",
} as const satisfies IntegrationAppLogo;

export const bankingAndAccountingIntegrationCard = {
  id: "banking-and-accounting",
  initialViewId: "banking",
  orbitLayout: "topArc",
  views: [
    {
      id: "banking",
      label: "Banking",
      title: "Connect Banking",
      description: "We use Plaid to pull real-time SaaS transactions from USD corporate bank accounts",
      showProviderBrand: true,
      providers: [
        {
          id: "plaid",
          name: "Plaid",
          regionLabel: "USA",
          centerLogo: plaidCenterLogo,
          description: "We use Plaid to pull real-time SaaS transactions from USD corporate bank accounts",
          orbitApps: [
            {
              id: "citibank",
              name: "Citibank",
              domain: "citi.com",
            },
            {
              id: "wells-fargo",
              name: "Wells Fargo",
              domain: "wellsfargo.com",
            },
            {
              id: "bank-of-america",
              name: "Bank of America",
              domain: "bankofamerica.com",
            },
            {
              id: "chase",
              name: "Chase",
              domain: "chase.com",
            },
            {
              id: "ally-bank",
              name: "Ally",
              domain: "ally.com",
            },
            {
              id: "capital-one",
              name: "Capital One",
              domain: "capitalone.com",
            },
            {
              id: "pnc-bank",
              name: "PNC Bank",
              domain: "pnc.com",
            },
            {
              id: "td-bank",
              name: "TD Bank",
              domain: "td.com",
            },
            {
              id: "truist",
              name: "Truist",
              domain: "truist.com",
            },
            {
              id: "us-bank",
              name: "US Bank",
              domain: "usbank.com",
            },
          ],
        },
      ],
    },
    {
      id: "accounting",
      label: "Accounting",
      title: "Accounting",
      description: "Connect your accounting software to pull transaction and expenses data.",
      providers: [
        {
          id: "quickbooks-stack",
          name: "QuickBooks",
          centerLogo: {
            id: "quickbooks-center",
            name: "QuickBooks",
            domain: "quickbooks.intuit.com",
          },
          orbitApps: [
            {
              id: "netsuite",
              name: "NetSuite",
              domain: "netsuite.com",
            },
            {
              id: "quickbooks",
              name: "QuickBooks",
              domain: "quickbooks.intuit.com",
            },
            {
              id: "sage-accounting",
              name: "Sage",
              domain: "sage.com",
            },
            {
              id: "zoho-books-accounting",
              name: "Zoho Books",
              domain: "zoho.com",
              brandNameFallback: "Zoho Books",
            },
          ],
        },
        {
          id: "netsuite-stack",
          name: "NetSuite",
          centerLogo: {
            id: "netsuite-center",
            name: "NetSuite",
            domain: "netsuite.com",
          },
          orbitApps: [
            {
              id: "sage",
              name: "Sage",
              domain: "sage.com",
            },
            {
              id: "zoho-books",
              name: "Zoho Books",
              domain: "zoho.com",
              brandNameFallback: "Zoho Books",
            },
            {
              id: "netsuite-ledger",
              name: "NetSuite",
              domain: "netsuite.com",
            },
            {
              id: "quickbooks-ledger",
              name: "QuickBooks",
              domain: "quickbooks.intuit.com",
            },
          ],
        },
      ],
    },
  ],
} as const satisfies IntegrationCard;

export const integrationsSectionContent = {
  id: "integrations",
  title: "Connect Doow to the tools you already use",
  description:
    "Seamlessly integrate with your existing stack — from finance and procurement to communication and workflows. Explore all available integrations in one place.",
  cta: {
    href: "/integrations",
    label: "See all integrations",
  } satisfies LandingActionLink,
  maxVisibleOrbitApps: 4,
  cards: [
    bankingAndAccountingIntegrationCard,
    {
      id: "sso",
      initialViewId: "sso",
      orbitLayout: "topArc",
      views: [
        {
          id: "sso",
          label: "SSO",
          title: "SSO",
          description:
            "Integrate with your identity/SSO provider to pull user profiles and the apps they use within Your Company",
          providers: [
            {
              id: "identity-stack",
              name: "Identity",
              orbitApps: [
                {
                  id: "google-workspace",
                  name: "Google Workspace",
                  domain: "google.com",
                },
                {
                  id: "okta",
                  name: "Okta",
                  domain: "okta.com",
                },
                {
                  id: "one-login",
                  name: "OneLogin",
                  domain: "onelogin.com",
                },
                {
                  id: "entra",
                  name: "Microsoft Entra ID",
                  domain: "microsoft.com",
                  brandNameFallback: "Microsoft Entra ID",
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: "hris",
      initialViewId: "hris",
      orbitLayout: "bottomArc",
      views: [
        {
          id: "hris",
          label: "HRIS",
          title: "HRIS",
          description:
            "Connect your HRIS software to pull employee data in order to manage automated onboarding and offboarding of seats across ",
          providers: [
            {
              id: "hris-stack",
              name: "HRIS",
              orbitApps: [
                {
                  id: "deel",
                  name: "Deel",
                  domain: "deel.com",
                },
                {
                  id: "gusto",
                  name: "Gusto",
                  domain: "gusto.com",
                },
                {
                  id: "zoho-people",
                  name: "Zoho People",
                  domain: "zoho.com",
                  brandNameFallback: "Zoho People",
                },
                {
                  id: "bamboohr",
                  name: "BambooHR",
                  domain: "bamboohr.com",
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: "direct-integration",
      initialViewId: "direct",
      orbitLayout: "bottomArc",
      views: [
        {
          id: "direct",
          label: "Direct Integration",
          title: "Direct Integration",
          description: "Connect directly to the tools your team already uses.",
          providers: [
            {
              id: "workspace-stack",
              name: "Direct integrations",
              orbitApps: [
                {
                  id: "slack",
                  name: "Slack",
                  domain: "slack.com",
                },
                {
                  id: "notion",
                  name: "Notion",
                  domain: "notion.so",
                },
                {
                  id: "obsidian",
                  name: "Obsidian",
                  domain: "obsidian.md",
                },
                {
                  id: "microsoft-entra-id",
                  name: "Microsoft Entra ID",
                  domain: "microsoft.com",
                  brandNameFallback: "Microsoft Entra ID",
                },
                {
                  id: "airtable",
                  name: "Airtable",
                  domain: "airtable.com",
                },
              ],
            },
          ],
        },
      ],
    },
  ],
} as const satisfies IntegrationsSectionContent;
