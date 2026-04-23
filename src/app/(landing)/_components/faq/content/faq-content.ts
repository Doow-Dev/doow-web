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

export const landingFaqContent = {
  initialSelectedCategoryId: "spend-visibility",
  categories: [
    {
      id: "spend-visibility",
      label: "Spend Visibility",
      roleLabel: "Finance Lead",
      messages: buildThreadMessages("spend-visibility", [
        [
          "Can Doow really pull all our SaaS spend into one place?",
          "Yes. Doow connects to your banks, cards, and tools to automatically detect every subscription.",
        ],
        [
          "Even ones teams bought on their own?",
          "Yes, including shadow IT and untracked expenses.",
        ],
        [
          "So I don't need spreadsheets anymore?",
          "No spreadsheets. You get a real-time, unified view of all SaaS spend.",
        ],
      ]),
    },
    {
      id: "usage-insights",
      label: "Usage Insights",
      roleLabel: "Finance Lead",
      messages: buildThreadMessages("usage-insights", [
        [
          "Can I tell which tools people are actually using?",
          "Yes. Doow tracks usage signals across your stack and flags inactive subscriptions.",
        ],
        [
          "So I can spot waste instantly?",
          "Exactly. You'll see which tools are underused or completely unused.",
        ],
        [
          "And I can act on it?",
          "You can review, notify teams, all in one place.",
        ],
      ]),
    },
    {
      id: "tool-overlap",
      label: "Tool Overlap",
      roleLabel: "Finance Lead",
      messages: buildThreadMessages("tool-overlap", [
        [
          "We probably have teams using different tools for the same job. Can Doow detect that?",
          "Yes. Doow identifies overlapping tools used by the same or similar teams.",
        ],
        [
          "So I can see where we're double-paying?",
          "Exactly. You'll get clear recommendations on where to consolidate.",
        ],
        [
          "Can I take action from there?",
          "Yes, you can align teams and reduce redundant spend directly by removing duplicated seats",
        ],
      ]),
    },
    {
      id: "renewal-alerts",
      label: "Renewal Alerts",
      roleLabel: "Finance Lead",
      messages: buildThreadMessages("renewal-alerts", [
        [
          "Can Doow warn me before subscriptions renew?",
          "Yes. You get advance alerts for upcoming renewals across all tools.",
        ],
        [
          "Even for tools I didn't know we had?",
          "Yes. Doow tracks all subscriptions, including hidden or forgotten ones.",
        ],
        [
          "Can I stop a renewal from there?",
          "You can review, notify stakeholders, before you're charged.",
        ],
      ]),
    },
    {
      id: "doow-cards",
      label: "Doow Cards",
      roleLabel: "Finance Lead",
      messages: buildThreadMessages("doow-cards", [
        [
          "Can Doow handle how we actually pay for SaaS tools?",
          "Yes. You can issue virtual Doow Cards for any subscription or team.",
        ],
        [
          "So instead of using random company cards?",
          "Exactly. Each card is tied to a tool, team, or purpose, fully tracked.",
        ],
        [
          "Can I control how those cards are used?",
          "You can set limits, assign owners, and monitor every transaction in real time.",
        ],
      ]),
    },
  ],
} as const satisfies FaqSectionContent;
