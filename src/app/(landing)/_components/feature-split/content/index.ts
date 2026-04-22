export type FeaturePointId = "discover" | "eliminate" | "renewals" | "consolidate";

export type FeatureShowcaseFrame = "frame-1" | "frame-2" | "frame-3";

export type FeatureShowcaseStatus = "active" | "inactive";

export type FeatureShowcaseIconName = "department" | "google" | "notion" | "salesforce" | "slack";

export type FeatureShowcaseIconSource =
  | {
      kind: "component";
      name: FeatureShowcaseIconName;
    }
  | {
      kind: "asset";
      src: string;
      alt: string;
      fit?: "contain" | "cover";
    };

export interface FeatureUserAvatar {
  src: string;
  alt: string;
}

export interface FeaturePointContent {
  id: FeaturePointId;
  order: number;
  title: string;
  description: string;
  enabled: boolean;
}

export interface PointOneDepartmentRow {
  id: string;
  name: string;
  initials: string;
  color: string;
  userCount: number;
  applicationCount: number;
  usersDisplay: "avatars" | "placeholder";
  userAvatars?: readonly FeatureUserAvatar[];
}

export interface PointOneApplicationRow {
  id: string;
  name: string;
  icon: FeatureShowcaseIconSource;
  seatType: "Enterprise" | "Team" | "Pro";
  status: FeatureShowcaseStatus;
}

export interface PointOneFeatureContent {
  railLabel: string;
  railCount: number;
  title: string;
  subtitle: string;
  selectedDepartmentId: string;
  breadcrumbLabel: string;
  departments: readonly PointOneDepartmentRow[];
  applications: readonly PointOneApplicationRow[];
}

export interface FeatureSplitSectionContent {
  id: string;
  title: string;
  description: string;
  points: readonly FeaturePointContent[];
  defaultPointId: FeaturePointId;
  defaultFrame: FeatureShowcaseFrame;
  timings: {
    frameOneMs: number;
    frameTwoMs: number;
    frameThreeMs: number;
  };
  pointOne: PointOneFeatureContent;
}

const pointOneUserAvatars = [
  {
    src: "/assets/icons/user1.svg",
    alt: "",
  },
  {
    src: "/assets/icons/user2.svg",
    alt: "",
  },
  {
    src: "/assets/icons/user3.svg",
    alt: "",
  },
] as const satisfies readonly FeatureUserAvatar[];

export const featureSplitSectionContent = {
  id: "product",
  title: "Total visibility into every tool your team is using.",
  description:
    "Doow gives finance teams a clear view of every subscription, every renewal, and every wasted license in one place. You no longer have to pay twice for the same thing.",
  points: [
    {
      id: "discover",
      order: 1,
      title: "Discover every tool your team is using",
      description:
        "Uncover the apps employees are signing up for. Get a complete, real-time map of your SaaS stack, including the ones flying under the radar.",
      enabled: true,
    },
    {
      id: "eliminate",
      order: 2,
      title: "Eliminate licenses nobody is using",
      description:
        "See exactly which seats are inactive and which tools are underused. Identify subscriptions that no longer justify their cost and cut waste instantly.",
      enabled: false,
    },
    {
      id: "renewals",
      order: 3,
      title: "Never get blindsided by a renewal again",
      description:
        "Auto-renewals should not be a surprise. Get proactive alerts before charges hit, so you always have time to cancel, negotiate, or renew on your terms.",
      enabled: false,
    },
    {
      id: "consolidate",
      order: 4,
      title: "Consolidate duplicate tools and cut overlap",
      description:
        "Three teams, three project management tools, all on your bill. Spot redundant apps across departments and make confident consolidation decisions in one click.",
      enabled: false,
    },
  ] satisfies readonly FeaturePointContent[],
  defaultPointId: "discover",
  defaultFrame: "frame-1",
  timings: {
    frameOneMs: 1250,
    frameTwoMs: 1800,
    frameThreeMs: 2200,
  },
  pointOne: {
    railLabel: "Department",
    railCount: 99,
    title: "Departments",
    subtitle: "Visibility into your team",
    selectedDepartmentId: "engineering",
    breadcrumbLabel: "Engineering",
    departments: [
      {
        id: "product",
        name: "Product",
        initials: "PR",
        color: "#E3E1FF",
        userCount: 34,
        applicationCount: 34,
        usersDisplay: "placeholder",
      },
      {
        id: "engineering",
        name: "Engineering",
        initials: "EN",
        color: "#FDE68A",
        userCount: 67,
        applicationCount: 67,
        usersDisplay: "avatars",
        userAvatars: pointOneUserAvatars,
      },
      {
        id: "sales",
        name: "Sales",
        initials: "SA",
        color: "#A7F3D0",
        userCount: 8,
        applicationCount: 8,
        usersDisplay: "placeholder",
      },
      {
        id: "customer-support",
        name: "Customer Support",
        initials: "CS",
        color: "#BFDBFE",
        userCount: 12,
        applicationCount: 12,
        usersDisplay: "placeholder",
      },
      {
        id: "legal",
        name: "Legal",
        initials: "LG",
        color: "#D1FAE5",
        userCount: 54,
        applicationCount: 54,
        usersDisplay: "placeholder",
      },
      {
        id: "hr",
        name: "HR",
        initials: "HR",
        color: "#FDE68A",
        userCount: 12,
        applicationCount: 12,
        usersDisplay: "placeholder",
      },
      {
        id: "legal-ops",
        name: "Legal",
        initials: "LG",
        color: "#FDE68A",
        userCount: 54,
        applicationCount: 54,
        usersDisplay: "placeholder",
      },
    ] satisfies readonly PointOneDepartmentRow[],
    applications: [
      {
        id: "google",
        name: "Google",
        icon: {
          kind: "component",
          name: "google",
        },
        seatType: "Enterprise",
        status: "active",
      },
      {
        id: "notion-enterprise",
        name: "Notion Enterprise",
        icon: {
          kind: "component",
          name: "notion",
        },
        seatType: "Team",
        status: "inactive",
      },
      {
        id: "salesforce",
        name: "Salesforce",
        icon: {
          kind: "component",
          name: "salesforce",
        },
        seatType: "Pro",
        status: "inactive",
      },
      {
        id: "slack",
        name: "Slack",
        icon: {
          kind: "component",
          name: "slack",
        },
        seatType: "Pro",
        status: "active",
      },
      {
        id: "doow",
        name: "Doow",
        icon: {
          kind: "asset",
          src: "/favicon.ico",
          alt: "",
          fit: "contain",
        },
        seatType: "Team",
        status: "active",
      },
    ] satisfies readonly PointOneApplicationRow[],
  } satisfies PointOneFeatureContent,
} as const satisfies FeatureSplitSectionContent;
