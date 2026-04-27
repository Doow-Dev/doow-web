export type ApplicationsFeaturesSolutionsCardId =
  | "spend-visibility"
  | "overlap-detection"
  | "underutilized-spend"
  | "app-detail-metrics";

export type ApplicationsFeaturesSolutionsDepartmentIcon = "code" | "design" | "dollar";
export type ApplicationsFeaturesSolutionsSpendLogo = "google" | "notion" | "salesforce" | "slack";
export type ApplicationsFeaturesSolutionsOverlapApp = "asana" | "notion" | "slack";
export type ApplicationsFeaturesSolutionsMetricValueFormat = "currencyUsd" | "integer";

export interface ApplicationsFeaturesSolutionsSpendRow {
  amount: string;
  appName: string;
  date: string;
  logo: ApplicationsFeaturesSolutionsSpendLogo;
}

export interface ApplicationsFeaturesSolutionsDepartmentNode {
  icon: ApplicationsFeaturesSolutionsDepartmentIcon;
  id: "design" | "engineering" | "marketing";
  label: string;
}

export interface ApplicationsFeaturesSolutionsBarGroup {
  greenHeight: number;
  id: string;
  orangeHeight: number;
}

export interface ApplicationsFeaturesSolutionsMetricSummary {
  deltaDirection: "down" | "up";
  deltaLabel: string;
  format: ApplicationsFeaturesSolutionsMetricValueFormat;
  id: "total-saas-spend" | "total-users";
  label: string;
  value: number;
}

interface ApplicationsFeaturesSolutionsBaseCard {
  accessibilitySummary: string;
  id: ApplicationsFeaturesSolutionsCardId;
  title: string;
}

export interface ApplicationsFeaturesSolutionsSpendVisibilityCard extends ApplicationsFeaturesSolutionsBaseCard {
  kind: "spendVisibility";
  rows: readonly ApplicationsFeaturesSolutionsSpendRow[];
}

export interface ApplicationsFeaturesSolutionsOverlapDetectionCard extends ApplicationsFeaturesSolutionsBaseCard {
  apps: readonly ApplicationsFeaturesSolutionsOverlapApp[];
  departments: readonly ApplicationsFeaturesSolutionsDepartmentNode[];
  kind: "overlapDetection";
}

export interface ApplicationsFeaturesSolutionsUnderutilizedSpendCard extends ApplicationsFeaturesSolutionsBaseCard {
  bars: readonly ApplicationsFeaturesSolutionsBarGroup[];
  kind: "underutilizedSpend";
  pillLabel: string;
}

export interface ApplicationsFeaturesSolutionsAppDetailMetricsCard extends ApplicationsFeaturesSolutionsBaseCard {
  kind: "appDetailMetrics";
  metrics: readonly ApplicationsFeaturesSolutionsMetricSummary[];
}

export type ApplicationsFeaturesSolutionsCard =
  | ApplicationsFeaturesSolutionsSpendVisibilityCard
  | ApplicationsFeaturesSolutionsOverlapDetectionCard
  | ApplicationsFeaturesSolutionsUnderutilizedSpendCard
  | ApplicationsFeaturesSolutionsAppDetailMetricsCard;

export interface ApplicationsFeaturesSolutionsSectionContent {
  cards: readonly ApplicationsFeaturesSolutionsCard[];
  description: string;
  id: string;
  title: string;
}

export const applicationsFeaturesSolutionsContent = {
  cards: [
    {
      accessibilitySummary:
        "A spending overview lists Google Workspace on February 28 for $12,488, Salesforce CRM on March 12 for $2,500, Notion Enterprise on March 15 for $14,308, and Slack on April 20 for $1,488.",
      id: "spend-visibility",
      kind: "spendVisibility",
      rows: [
        {
          amount: "$12,488",
          appName: "Google Workspace",
          date: "Feb 28",
          logo: "google",
        },
        {
          amount: "$2,500",
          appName: "Salesforce CRM",
          date: "Mar 12",
          logo: "salesforce",
        },
        {
          amount: "$14,308",
          appName: "Notion Enterprise",
          date: "Mar 15",
          logo: "notion",
        },
        {
          amount: "$1,488",
          appName: "Slack",
          date: "Apr 20",
          logo: "slack",
        },
      ] satisfies readonly ApplicationsFeaturesSolutionsSpendRow[],
      title: "Finally know what you're paying for",
    } satisfies ApplicationsFeaturesSolutionsSpendVisibilityCard,
    {
      accessibilitySummary:
        "An overlap view groups Slack, Notion, and Asana above three department nodes labeled Design, Marketing, and Engineering to show when different teams use tools that solve the same job.",
      apps: ["slack", "notion", "asana"] satisfies readonly ApplicationsFeaturesSolutionsOverlapApp[],
      departments: [
        {
          icon: "design",
          id: "design",
          label: "Design",
        },
        {
          icon: "dollar",
          id: "marketing",
          label: "Marketing",
        },
        {
          icon: "code",
          id: "engineering",
          label: "Engineering",
        },
      ] satisfies readonly ApplicationsFeaturesSolutionsDepartmentNode[],
      id: "overlap-detection",
      kind: "overlapDetection",
      title: "Spot tools doing the same job",
    } satisfies ApplicationsFeaturesSolutionsOverlapDetectionCard,
    {
      accessibilitySummary:
        "A utilization chart compares four application groups, showing green utilized spend above orange underutilized spend so the least-used tools stand out immediately.",
      bars: [
        {
          greenHeight: 14,
          id: "group-1",
          orangeHeight: 50,
        },
        {
          greenHeight: 54,
          id: "group-2",
          orangeHeight: 10,
        },
        {
          greenHeight: 24,
          id: "group-3",
          orangeHeight: 10,
        },
        {
          greenHeight: 68,
          id: "group-4",
          orangeHeight: 10,
        },
      ] satisfies readonly ApplicationsFeaturesSolutionsBarGroup[],
      id: "underutilized-spend",
      kind: "underutilizedSpend",
      pillLabel: "Utilized versus Underutilized Spend",
      title: "See which tools are barely used",
    } satisfies ApplicationsFeaturesSolutionsUnderutilizedSpendCard,
    {
      accessibilitySummary:
        "App detail metrics show total SaaS spend of $118,400.00 trending up 5.2 percent versus the previous month, alongside total users of 142 trending down 5.2 percent versus the previous month.",
      id: "app-detail-metrics",
      kind: "appDetailMetrics",
      metrics: [
        {
          deltaDirection: "up",
          deltaLabel: "5.2% vs prev month",
          format: "currencyUsd",
          id: "total-saas-spend",
          label: "Total Saas Spend",
          value: 118400,
        },
        {
          deltaDirection: "down",
          deltaLabel: "5.2% vs prev month",
          format: "integer",
          id: "total-users",
          label: "Total Users",
          value: 142,
        },
      ] satisfies readonly ApplicationsFeaturesSolutionsMetricSummary[],
      title: "Understand each app in detail",
    } satisfies ApplicationsFeaturesSolutionsAppDetailMetricsCard,
  ] satisfies readonly ApplicationsFeaturesSolutionsCard[],
  description: "Understand what you're paying for, what your teams use, and where money is quietly slipping away.",
  id: "applications-features-solutions",
  title: "Clarity for your entire software stack",
} as const satisfies ApplicationsFeaturesSolutionsSectionContent;
