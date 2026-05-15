export type ApplicationsProblemId =
  | "duplicate-tools"
  | "budgets-bleed"
  | "visibility-disappears"
  | "cost-spirals";

export type ApplicationsProblemIconKey = "stack" | "trash" | "eye-off" | "chart";

export type ApplicationsProblemIllustrationKey = ApplicationsProblemId;
export type ApplicationsProblemIllustrationStatus = "implemented" | "placeholder";

export interface ApplicationsProblemItem {
  id: ApplicationsProblemId;
  label: string;
  description: string;
  iconKey: ApplicationsProblemIconKey;
  illustrationKey: ApplicationsProblemIllustrationKey;
  illustrationStatus: ApplicationsProblemIllustrationStatus;
}

export interface ApplicationsProblemsSectionContent {
  id: string;
  title: string;
  description: string;
  panelTitle: string;
  defaultProblemId: ApplicationsProblemId;
  items: readonly ApplicationsProblemItem[];
}

export const applicationsProblemsContent = {
  id: "applications-problems",
  title: "When software sprawls unnoticed",
  description: "Tools multiply across teams faster than anyone tracks.",
  panelTitle: "How software sprawl quietly unfolds",
  defaultProblemId: "duplicate-tools",
  items: [
    {
      id: "duplicate-tools",
      label: "Duplicate Tools",
      description:
        "Different teams unknowingly buy and use the same tools, paying twice, solving the same problem twice, and drifting further apart without realizing it.",
      iconKey: "stack",
      illustrationKey: "duplicate-tools",
      illustrationStatus: "implemented",
    },
    {
      id: "budgets-bleed",
      label: "Budgets Quietly Bleed",
      description:
        "Budgets quietly bleed into redundant software, unused licenses, and overlapping workflows no one has time to untangle",
      iconKey: "trash",
      illustrationKey: "budgets-bleed",
      illustrationStatus: "placeholder",
    },
    {
      id: "visibility-disappears",
      label: "Visibility Disappears",
      description:
        "No one has a clear picture of what's being used, who owns it, or why it exists, decisions turn into guesswork.",
      iconKey: "eye-off",
      illustrationKey: "visibility-disappears",
      illustrationStatus: "implemented",
    },
    {
      id: "cost-spirals",
      label: "Cost Spirals",
      description:
        "What started as small, independent choices compounds into an expensive, unmanageable stack that leadership can't fully justify or control.",
      iconKey: "chart",
      illustrationKey: "cost-spirals",
      illustrationStatus: "implemented",
    },
  ],
} as const satisfies ApplicationsProblemsSectionContent;
