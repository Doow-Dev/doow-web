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

export const subscriptionsFaqContent = {
  initialSelectedCategoryId: "renewal-tracking",
  categories: [
    {
      id: "renewal-tracking",
      label: "Renewal Tracking",
      roleLabel: "Finance Lead",
      messages: buildThreadMessages("renewal-tracking", [
        [
          "Can Doow warn me before a subscription renews?",
          "Yes. Doow gives advance visibility into renewal dates, owners, and contract value before you're charged again.",
        ],
        [
          "Even for tools that were bought outside procurement?",
          "Yes. Hidden and team-purchased subscriptions are still tracked once Doow detects them.",
        ],
      ]),
    },
    {
      id: "license-visibility",
      label: "License Visibility",
      roleLabel: "Finance Lead",
      messages: buildThreadMessages("license-visibility", [
        [
          "Will I be able to see how many licenses we actually have?",
          "Yes. Each subscription record can show plan count, ownership, status, and whether the contract is still actively used.",
        ],
        [
          "So we can catch inactive subscriptions too?",
          "Exactly. Doow helps teams spot inactive or under-used plans before renewal time.",
        ],
      ]),
    },
    {
      id: "contract-clarity",
      label: "Contract Clarity",
      roleLabel: "Finance Lead",
      messages: buildThreadMessages("contract-clarity", [
        [
          "Can contract details live with the subscription instead of in separate docs?",
          "Yes. Subscription value, spend, owners, and renewal context stay together in one record.",
        ],
        [
          "That means less spreadsheet chasing?",
          "Yes. Doow replaces scattered renewal notes with one place to manage the contract lifecycle.",
        ],
      ]),
    },
    {
      id: "usage-alignment",
      label: "Usage Alignment",
      roleLabel: "Finance Lead",
      messages: buildThreadMessages("usage-alignment", [
        [
          "Can I compare usage with what we're paying for?",
          "Yes. Doow helps teams line up subscription cost with activity and ownership so decisions are easier to justify.",
        ],
        [
          "So finance can challenge waste with context?",
          "Exactly. You can review utilization before renewals instead of after overspending.",
        ],
      ]),
    },
    {
      id: "subscription-control",
      label: "Subscription Control",
      roleLabel: "Finance Lead",
      messages: buildThreadMessages("subscription-control", [
        [
          "Is this just visibility, or can we actually manage subscriptions from here?",
          "It's operational too. Doow gives teams one system for renewals, contract clarity, ownership, and action.",
        ],
        [
          "So subscriptions become easier to govern?",
          "Yes. The goal is to move subscription management out of fragile manual trackers and into a shared workflow.",
        ],
      ]),
    },
  ],
} as const satisfies FaqSectionContent;
