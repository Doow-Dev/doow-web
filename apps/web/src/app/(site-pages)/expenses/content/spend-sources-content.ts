export type ExpensesSpendSourceIcon = "cards" | "transfers" | "ledger";
export type ExpensesSpendSourceVisualId = "cards" | "banking" | "accounting";

export interface ExpensesSpendSourceItem {
  title: string;
  description: string;
  icon: ExpensesSpendSourceIcon;
  visualId: ExpensesSpendSourceVisualId;
}

export interface ExpensesSpendSourcesContent {
  defaultSelectedVisualId: ExpensesSpendSourceVisualId;
  id: string;
  title: string;
  description: string;
  items: readonly ExpensesSpendSourceItem[];
  visual: {
    title: string;
    subtitle: string;
    callout: string;
    summaryLabel: string;
    summaryValue: string;
  };
}

export const expensesSpendSourcesContent = {
  defaultSelectedVisualId: "cards",
  id: "expenses-spend-sources",
  title: "Software is paid for in many places.",
  description:
    "From corporate cards to bank transfers and accounting records, software spend is scattered everywhere. We unify it so nothing slips through the cracks.",
  items: [
    {
      title: "Corporate cards",
      description:
        "Track every SaaS purchase made with company cards and connect each charge to the team or workflow behind it.",
      icon: "cards",
      visualId: "cards",
    },
    {
      title: "Bank transfers",
      description:
        "Capture vendor payments made outside card rails so subscriptions and renewals no longer disappear into bank activity.",
      icon: "transfers",
      visualId: "banking",
    },
    {
      title: "Accounting tools",
      description:
        "Sync invoices, reimbursements, and recorded software expenses so finance gets a single source of truth for spend.",
      icon: "ledger",
      visualId: "accounting",
    },
  ] satisfies readonly ExpensesSpendSourceItem[],
  visual: {
    title: "doow.",
    subtitle: "Connected spend overview",
    callout: "Every payment source mapped back to the right software tool.",
    summaryLabel: "Unified sources",
    summaryValue: "Cards, banks, and accounting in one view",
  },
} as const satisfies ExpensesSpendSourcesContent;
