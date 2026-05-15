import type { FaqCategoryId, FaqSectionContent, FaqThreadMessage } from "@/components/layout/faq";

type FaqExchangeCopy = readonly [question: string, answer: string];

function buildThreadMessages(categoryId: FaqCategoryId, exchanges: readonly FaqExchangeCopy[]): FaqThreadMessage[] {
  return exchanges.flatMap(([question, answer], index) => [
    {
      id: `${categoryId}-question-${index + 1}`,
      speaker: "user" as const,
      text: question,
    },
    {
      id: `${categoryId}-answer-${index + 1}`,
      speaker: "assistant" as const,
      text: answer,
    },
  ]);
}

export const expensesFaqContent = {
  initialSelectedCategoryId: "payment-mapping",
  interaction: {
    mode: "simulated",
    revealDelayMs: 320,
  },
  categories: [
    {
      id: "spend-sources",
      label: "Spend Sources",
      roleLabel: "Finance Lead",
      messages: buildThreadMessages("spend-sources", [
        [
          "Will Doow show expenses from more than just cards?",
          "Yes. Doow consolidates card purchases, bank transfers, invoices, and accounting records into one spend view.",
        ],
        [
          "So I don't need to hunt across systems anymore?",
          "Exactly. The goal is a single, searchable view of every software payment source.",
        ],
      ]),
    },
    {
      id: "payment-mapping",
      label: "Payment Mapping",
      roleLabel: "Finance Lead",
      messages: buildThreadMessages("payment-mapping", [
        [
          "Which apps are being used by same team?",
          "Slack and Teams are being used by same team. Try consolidating spend.",
        ],
        [
          "Can Doow connect a payment back to the right app?",
          "Yes. Doow maps each charge to the right app, owner, and context.",
        ],
        [
          "What if the vendor name is vague?",
          "Doow cleans vague vendor names so finance can reconcile spend.",
        ],
      ]),
    },
    {
      id: "hidden-spend",
      label: "Hidden Spend",
      roleLabel: "Finance Lead",
      messages: buildThreadMessages("hidden-spend", [
        [
          "How do I catch software spend that's slipping through?",
          "Doow surfaces expenses that live outside the usual card workflows, including bank payments and scattered accounting entries.",
        ],
        [
          "Can it help uncover duplicate or forgotten spend?",
          "Yes. Once all sources are unified, duplicate vendors and under-reviewed renewals become much easier to spot.",
        ],
      ]),
    },
    {
      id: "spend-breakdown",
      label: "Spend Breakdown",
      roleLabel: "Finance Lead",
      messages: buildThreadMessages("spend-breakdown", [
        [
          "Can I get a clearer breakdown of what we're paying for?",
          "You can see spend by source, vendor, and context so finance understands where money is actually going.",
        ],
        [
          "Does that help with renewal decisions too?",
          "Yes. Better spend visibility gives teams cleaner renewal conversations and fewer surprises.",
        ],
      ]),
    },
    {
      id: "expense-control",
      label: "Expense Control",
      roleLabel: "Finance Lead",
      messages: buildThreadMessages("expense-control", [
        [
          "How does this improve control, not just visibility?",
          "Once expenses are unified, finance can assign owners, investigate anomalies, and act before waste compounds.",
        ],
        [
          "So it becomes operational, not just reporting?",
          "Exactly. The page is about turning fragmented software spend into something finance can manage with confidence.",
        ],
      ]),
    },
  ],
} as const satisfies FaqSectionContent;
