export interface ExpensesClarityCardContent {
  title: string;
  description: string;
}

export interface ExpensesClarityContent {
  id: string;
  title: string;
  description: string;
  cards: readonly ExpensesClarityCardContent[];
}

export const expensesClarityContent = {
  id: "expenses-clarity",
  title: "Doow gives you a clear idea of what you are paying for",
  description:
    "Doow manages the entire software lifecycle, ensuring every dollar is accounted for from the moment a tool is introduced to the day it's decommissioned.",
  cards: [
    {
      title: "A clear idea of what we're paying for",
      description: "For the first time, see every tool the company is paying for.",
    },
    {
      title: "Connect payments to the right tool",
      description: "Centralize your payments and never get caught off-guard again.",
    },
    {
      title: "Catch unknown software spending",
      description: "Don't renew by default. Renew because you have the data to justify it.",
    },
    {
      title: "Keep invoices and records together",
      description: "For the first time, see every tool the company is paying for.",
    },
  ] satisfies readonly ExpensesClarityCardContent[],
} as const satisfies ExpensesClarityContent;
