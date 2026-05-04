export type GlobalSiteNavAvailability = "live" | "planned";

export type GlobalSiteNavIcon =
  | "ceos"
  | "cfos"
  | "managers"
  | "employees"
  | "startups"
  | "enterprises";

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
      label: "Product",
      type: "menu",
      groups: [
        {
          id: "left-column",
          items: [
            {
              availability: "live",
              description: "Complete picture of your global finance lifecycle",
              href: "/#product",
              icon: "ceos",
              label: "For CEOs",
            },
            {
              availability: "live",
              description: "Manage team-level spend, policies and permissions",
              href: "/#finance-control",
              icon: "managers",
              label: "For Managers",
            },
            {
              availability: "live",
              description: "Financial solutions for growing businesses",
              href: "/#product",
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
              href: "/#finance-control",
              icon: "cfos",
              label: "For CFOs & Controllers",
            },
            {
              availability: "live",
              description: "Spend within set company limits, policies and be accountable",
              href: "/integrations",
              icon: "employees",
              label: "For Employees",
            },
            {
              availability: "live",
              description: "Comprehensive financial management for large organizations",
              href: "/integrations",
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
    href: "/signin",
    label: "Login",
  } satisfies GlobalSiteNavAction,
  signUp: {
    href: "/signin",
    label: "Sign Up",
  } satisfies GlobalSiteNavAction,
} as const satisfies GlobalSiteNavContent;
