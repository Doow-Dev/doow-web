import { doowAppLinks } from "@/lib/site/app-links";

export type GlobalSiteNavAvailability = "live" | "planned";

export type GlobalSiteNavIcon =
  | "applications"
  | "ceos"
  | "cfos"
  | "doowAi"
  | "expenses"
  | "integrations"
  | "managers"
  | "employees"
  | "subscriptions"
  | "startups"
  | "enterprises"
  | "alternatives";

export interface GlobalSiteNavAction {
  activeMatchPaths?: readonly string[];
  href: string;
  label: string;
}

export interface GlobalSiteNavMenuItem {
  activeMatchPaths?: readonly string[];
  availability: GlobalSiteNavAvailability;
  description: string;
  href?: string;
  icon: GlobalSiteNavIcon;
  label: string;
}

export interface GlobalSiteNavDropdownGroup {
  id: string;
  items: readonly GlobalSiteNavMenuItem[];
  title?: string;
}

export interface GlobalSiteNavLinkEntry {
  activeMatchPaths?: readonly string[];
  availability: GlobalSiteNavAvailability;
  href: string;
  label: string;
  type: "link";
}

export interface GlobalSiteNavMenuEntry {
  availability: GlobalSiteNavAvailability;
  groups: readonly GlobalSiteNavDropdownGroup[];
  label: string;
  type: "menu";
}

export type GlobalSiteNavEntry = GlobalSiteNavLinkEntry | GlobalSiteNavMenuEntry;

export interface GlobalSiteNavContent {
  login: GlobalSiteNavAction;
  primaryNavigation: readonly GlobalSiteNavEntry[];
  signUp: GlobalSiteNavAction;
}

export const globalSiteNavContent = {
  primaryNavigation: [
    {
      availability: "live",
      label: "Solutions",
      type: "menu",
      groups: [
        {
          id: "left-column",
          items: [
            {
              availability: "live",
              description: "Discover tools your teams use, how often they're used, and where money might be...",
              href: "/applications",
              icon: "applications",
              label: "Applications",
            },
            {
              availability: "live",
              description: "Every SaaS payment across cards, banks, and accounting systems in one place.",
              href: "/expenses",
              icon: "expenses",
              label: "Expenses",
            },
            {
              availability: "live",
              description: "CFOs best buddies. Built for modern finance.",
              href: "/doow-ai",
              icon: "doowAi",
              label: "Doow AI",
            },
          ],
        },
        {
          id: "right-column",
          items: [
            {
              availability: "live",
              description: "Bring identity, finance, and HR data together so everything stays up to date.",
              href: "/integrations",
              icon: "integrations",
              label: "Integrations",
            },
            {
              availability: "live",
              description: "Contracts, licenses, and renewals without spreadsheets.",
              href: "/subscriptions",
              icon: "subscriptions",
              label: "Subscriptions",
            },
            {
              availability: "live",
              description: "Discover and compare alternative apps for your business",
              href: "/alternative-apps",
              icon: "alternatives",
              label: "Alternative Apps",
            },
          ],
        },
      ],
    },
    {
      availability: "live",
      label: "Built for",
      type: "menu",
      groups: [
        {
          id: "left-column",
          items: [
            {
              availability: "live",
              description: "Complete picture of your global finance lifecycle",
              icon: "ceos",
              label: "For CEOs",
            },
            {
              availability: "live",
              description: "Manage team-level spend, policies and permissions",
              icon: "managers",
              label: "For Managers",
            },
            {
              availability: "live",
              description: "Financial solutions for growing businesses",
              icon: "startups",
              label: "Startups",
            },
          ],
        },
        {
          id: "right-column",
          items: [
            {
              availability: "live",
              description: "Boost financial growth with real-time data and decisioning insights",
              icon: "cfos",
              label: "For CFOs & Controllers",
            },
            {
              availability: "live",
              description: "Spend within set company limits, policies and be accountable",
              icon: "employees",
              label: "For Employees",
            },
            {
              availability: "live",
              description: "Comprehensive financial management for large organizations",
              icon: "enterprises",
              label: "Enterprises",
            },
          ],
        },
      ],
    },
    {
      availability: "live",
      href: "/pricing",
      label: "Pricing",
      type: "link",
    },
    {
      availability: "live",
      href: "/blog",
      label: "Blog",
      type: "link",
    },
  ] satisfies readonly GlobalSiteNavEntry[],
  login: {
    activeMatchPaths: ["/signin"],
    href: doowAppLinks.login,
    label: "Login",
  } satisfies GlobalSiteNavAction,
  signUp: {
    href: doowAppLinks.signUp,
    label: "Sign Up",
  } satisfies GlobalSiteNavAction,
} as const satisfies GlobalSiteNavContent;
