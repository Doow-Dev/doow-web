import type { DocsNavItem, DocsSidebarGroup } from "./types";

export const docsNavigation = [
  {
    description: "Connect usage, identity, HRIS, and accounting sources.",
    href: "/integrations",
    label: "Integrations",
    section: "integrations",
    slug: "integrations",
  },
] as const satisfies DocsNavItem[];

export const docsSidebar: DocsSidebarGroup[] = [
  {
    id: "integrations-overview",
    label: "Get started",
    section: "integrations",
    items: [
      { href: "/integrations", label: "Overview", description: "Choose what to connect." },
      { href: "/integrations/what-doow-needs", label: "What Doow needs", description: "Usage, organization, and financial data." },
      { href: "/integrations/choose-what-to-connect-first", label: "Choose what to connect first", description: "Pick the right first source." },
      { href: "/integrations/how-integrations-work", label: "How integrations work", description: "Connection, sync, pause, and disconnect." },
      { href: "/integrations/connect", label: "Connecting integrations", description: "Connect, pause, and disconnect sources." },
    ],
  },
  {
    id: "integrations-usage-data",
    label: "Usage data",
    section: "integrations",
    items: [
      { href: "/integrations/usage/choose-source", label: "Choose a usage source", description: "Pick Doow Agent, provider APIs, SDK, observability, or OTLP." },
      {
        href: "/integrations/usage/doow-agent",
        label: "Doow Agent",
        description: "Collect browser and desktop app usage.",
        items: [
          { href: "/integrations/usage/doow-agent/browser-agent", label: "Browser Agent", description: "Collect browser-based SaaS usage." },
        ],
      },
      {
        href: "/integrations/usage/direct-provider-apis",
        label: "Direct provider APIs",
        description: "Pull from usage and billing APIs.",
        items: [
          {
            label: "AI providers",
            items: [
              { href: "/integrations/usage/direct-provider-apis/openai", label: "OpenAI", description: "Token usage by model and project." },
              { href: "/integrations/usage/direct-provider-apis/anthropic", label: "Anthropic", description: "Token usage and cache metrics." },
              { href: "/integrations/usage/direct-provider-apis/groq", label: "Groq", description: "Input and output token rates." },
              { href: "/integrations/usage/direct-provider-apis/fireworks-ai", label: "Fireworks AI", description: "Prompt and cached token throughput." },
              { href: "/integrations/usage/direct-provider-apis/openrouter", label: "OpenRouter", description: "Usage by model and route." },
              { href: "/integrations/usage/direct-provider-apis/replicate", label: "Replicate", description: "Predictions and compute time." },
              { href: "/integrations/usage/direct-provider-apis/authress", label: "Authress", description: "API call usage by resource." },
            ],
          },
          {
            href: "/integrations/usage/cloud-platforms",
            label: "Cloud platforms",
            description: "Usage reported through cloud monitoring or billing.",
            items: [
              { href: "/integrations/usage/cloud-platforms/aws-bedrock", label: "AWS Bedrock", description: "CloudWatch and billing signals." },
              { href: "/integrations/usage/cloud-platforms/azure-openai", label: "Azure OpenAI", description: "Azure Monitor usage signals." },
              { href: "/integrations/usage/cloud-platforms/google-vertex", label: "Google Vertex AI", description: "Project and region usage." },
            ],
          },
        ],
      },
      {
        href: "/integrations/usage/instrumentation-sdk",
        label: "Instrumentation SDK",
        description: "Push usage events into Doow.",
        items: [
          { href: "/integrations/usage/instrumentation-sdk/nodejs", label: "Node.js SDK", description: "Batch and retry usage events." },
          { href: "/integrations/usage/instrumentation-sdk/sidecar", label: "Sidecar", description: "Collect events from non-Node services." },
          { href: "/integrations/usage/instrumentation-sdk/serverless", label: "Serverless", description: "Flush events from short-lived runtimes." },
          { href: "/integrations/usage/instrumentation-sdk/cli", label: "CLI / Daemon", description: "Pipe usage events from scripts." },
        ],
      },
      {
        href: "/integrations/usage/observability",
        label: "Observability",
        description: "Use metrics already collected elsewhere.",
        items: [
          {
            label: "Platform pull",
            items: [
              { href: "/integrations/usage/observability/datadog", label: "Datadog", description: "Custom metrics and events." },
              { href: "/integrations/usage/observability/newrelic", label: "New Relic", description: "Telemetry events and metric data." },
              { href: "/integrations/usage/observability/appsignal", label: "AppSignal", description: "Performance metric timeseries." },
              { href: "/integrations/usage/observability/sentry", label: "Sentry", description: "Error events and quota consumption." },
            ],
          },
          { href: "/integrations/usage/observability/otlp", label: "OTLP push", description: "Forward OpenTelemetry metrics." },
        ],
      },
    ],
  },
  {
    id: "integrations-organization-data",
    label: "Organization data",
    section: "integrations",
    items: [
      {
        label: "Identity providers",
        items: [
          { href: "/integrations/identity/google-workspace", label: "Google Workspace", description: "Users, groups, and app access." },
          { href: "/integrations/identity/microsoft-365", label: "Microsoft 365", description: "Users, groups, and app access." },
          { href: "/integrations/identity/okta", label: "Okta", description: "Users, groups, and assignments." },
          { href: "/integrations/identity/onelogin", label: "OneLogin", description: "Users, groups, and assignments." },
          { href: "/integrations/identity/zoho", label: "Zoho", description: "Zoho directory users and access." },
        ],
      },
      {
        href: "/integrations/hris",
        label: "HRIS",
        description: "Employee records and status.",
        items: [
          { href: "/integrations/hris/bamboohr", label: "BambooHR", description: "Departments and employment status." },
          { href: "/integrations/hris/gusto", label: "Gusto", description: "Employee records and status." },
          { href: "/integrations/hris/deel", label: "Deel", description: "Worker records and status." },
          { href: "/integrations/hris/zoho-people", label: "Zoho People", description: "Employee records and departments." },
        ],
      },
    ],
  },
  {
    id: "integrations-financial-data",
    label: "Financial data",
    section: "integrations",
    items: [
      { href: "/integrations/accounting", label: "Accounting", description: "Pull expenses and transaction data." },
    ],
  },
];

function hrefToSlug(href: string): string {
  return href === "/" ? "index" : href.slice(1);
}

function flattenSidebarLinks(items: readonly DocsSidebarGroup["items"][number][]): DocsSidebarGroup["items"][number][] {
  return items.flatMap((item) => [item, ...flattenSidebarLinks(item.items ?? [])]);
}

const sidebarItems: DocsNavItem[] = docsSidebar.flatMap((group) =>
  flattenSidebarLinks(group.items).flatMap((item) => item.href ? [{
    description: item.description ?? "",
    href: item.href,
    label: item.label,
    section: group.section,
    slug: hrefToSlug(item.href),
  }] : []),
);

const knownSlugs = new Map<string, DocsNavItem>();
for (const item of [...docsNavigation, ...sidebarItems]) {
  knownSlugs.set(item.slug, item);
}

export const docsNavigationBySlug: ReadonlyMap<string, DocsNavItem> = knownSlugs;

const flatSidebarOrder: { href: string; label: string }[] = docsSidebar.flatMap((group) =>
  flattenSidebarLinks(group.items).flatMap((item) => item.href ? [{ href: item.href, label: item.label }] : []),
);

export function getDocsPager(slug: string): {
  prev?: { href: string; label: string };
  next?: { href: string; label: string };
} {
  const href = slug === "index" ? "/" : `/${slug}`;
  const index = flatSidebarOrder.findIndex((entry) => entry.href === href);
  if (index === -1) return {};
  return {
    prev: index > 0 ? flatSidebarOrder[index - 1] : undefined,
    next: index < flatSidebarOrder.length - 1 ? flatSidebarOrder[index + 1] : undefined,
  };
}
