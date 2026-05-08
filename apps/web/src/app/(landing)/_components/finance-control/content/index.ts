export type FinanceControlCardIcon = "eye" | "bill" | "office" | "loop" | "grayBulb";

export type FinanceControlCardTone = "default" | "subtle";

export interface FinanceControlCardContent {
  title: string;
  description: string;
  icon: FinanceControlCardIcon;
  tone: FinanceControlCardTone;
}

export interface FinanceControlSectionContent {
  id: string;
  title: string;
  description: string;
  cards: readonly FinanceControlCardContent[];
}

export const financeControlSectionContent = {
  id: "finance-control",
  title: "From discovery to cancellation—finance stays in control",
  description:
    "Doow manages the entire software lifecycle, ensuring every dollar is accounted for from the moment a tool is introduced to the day it's decommissioned.",
  cards: [
    {
      title: "First-Time Visibility",
      description: "For the first time, see every tool the company is paying for.",
      icon: "eye",
      tone: "subtle",
    },
    {
      title: "Clean billing, no surprises.",
      description: "Centralize your payments and never get caught off-guard again.",
      icon: "bill",
      tone: "default",
    },
    {
      title: "Offboarding gaps",
      description: "Enterprise-grade user management that finance controls.",
      icon: "office",
      tone: "subtle",
    },
    {
      title: "Make renewal decisions with data.",
      description: "Don't renew by default. Renew because you have the data to justify it.",
      icon: "loop",
      tone: "default",
    },
    {
      title: "Hold vendors accountable",
      description: "Track pricing changes, contract terms, and unexpected increases — all in one place.",
      icon: "office",
      tone: "subtle",
    },
    {
      title: "Usage insights that reveal waste",
      description: "Understand which tools are actually used, and which are silently draining budget.",
      icon: "grayBulb",
      tone: "default",
    },
  ] satisfies readonly FinanceControlCardContent[],
} as const satisfies FinanceControlSectionContent;
