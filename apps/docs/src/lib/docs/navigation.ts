import type { DocsNavItem, DocsSidebarGroup } from "./types";

export const docsNavigation = [
  {
    description: "Create the first clean path through Doow setup.",
    href: "/getting-started",
    label: "Getting started",
    section: "start",
    slug: "getting-started",
  },
  {
    description: "Use Doow for repeatable finance and operations workflows.",
    href: "/guides",
    label: "Guides",
    section: "guides",
    slug: "guides",
  },
  {
    description: "Review supported product surfaces, fields, and conventions.",
    href: "/reference",
    label: "Reference",
    section: "reference",
    slug: "reference",
  },
  {
    description: "Track product changes and documentation updates.",
    href: "/changelog",
    label: "Changelog",
    section: "updates",
    slug: "changelog",
  },
] as const satisfies DocsNavItem[];

export const docsSidebar: DocsSidebarGroup[] = [
  {
    label: "Get started",
    section: "start",
    items: [
      { href: "/getting-started", label: "Welcome", description: "Why Doow exists." },
      { href: "/quickstart", label: "Quickstart", description: "Ship a first review in 10 minutes.", badge: "new" },
      { href: "/workspace-setup", label: "Workspace setup", description: "Connect identity, billing, and roles." },
      { href: "/connect-data", label: "Connect data", description: "Plug into expense and SSO sources." },
      { href: "/invite-teammates", label: "Invite teammates", description: "Owners, reviewers, and viewers." },
    ],
  },
  {
    label: "Guides",
    section: "guides",
    items: [
      { href: "/guides", label: "Overview", description: "Repeatable finance and ops workflows." },
      { href: "/spend-reviews", label: "Spend reviews", description: "Run monthly software spend audits." },
      { href: "/vendor-renewals", label: "Vendor renewals", description: "Track renewals and negotiate windows." },
      { href: "/software-ownership", label: "Software ownership", description: "Map apps to owners and reviewers." },
      { href: "/approvals", label: "Approvals", description: "Wire purchase approvals end to end." },
      { href: "/reporting", label: "Reporting", description: "Export rollups for finance reviews." },
    ],
  },
  {
    label: "Reference",
    section: "reference",
    items: [
      { href: "/reference", label: "Overview", description: "Surfaces, fields, and conventions." },
      { href: "/product-surfaces", label: "Product surfaces", description: "Where data appears in the app." },
      { href: "/fields", label: "Fields", description: "Canonical field names and types." },
      { href: "/conventions", label: "Conventions", description: "Naming, casing, and slugs." },
      { href: "/permissions", label: "Permissions", description: "Roles, scopes, and access rules." },
      { href: "/webhooks", label: "Webhooks", description: "Events you can subscribe to.", badge: "beta" },
    ],
  },
  {
    label: "Updates",
    section: "updates",
    items: [
      { href: "/changelog", label: "Latest", description: "What shipped this week." },
      { href: "/changelog-archive", label: "By month", description: "Rollups archived by month." },
      { href: "/changelog-rss", label: "RSS feed", description: "Subscribe to release notes." },
    ],
  },
];

function hrefToSlug(href: string): string {
  return href === "/" ? "index" : href.slice(1);
}

const sidebarItems: DocsNavItem[] = docsSidebar.flatMap((group) =>
  group.items.map((item) => ({
    description: item.description ?? "",
    href: item.href,
    label: item.label,
    section: group.section,
    slug: hrefToSlug(item.href),
  })),
);

const knownSlugs = new Map<string, DocsNavItem>();
for (const item of [...docsNavigation, ...sidebarItems]) {
  knownSlugs.set(item.slug, item);
}

export const docsNavigationBySlug: ReadonlyMap<string, DocsNavItem> = knownSlugs;
