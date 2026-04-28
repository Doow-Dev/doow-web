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
  initialSelectedCategoryId: "license-visibility",
  categories: [
    {
      id: "renewal-tracking",
      label: "Renewal Tracking",
      roleLabel: "Finance Lead",
      messages: buildThreadMessages("renewal-tracking", [
        [
          "Which apps are being used by same team?",
          "Slack and Teams are being used by same team. Try consolidating spend",
        ],
        [
          "Which apps are being used by same team?",
          "Slack and Teams are being used by same team. Try consolidating spend",
        ],
      ]),
    },
    {
      id: "license-visibility",
      label: "License Visibility",
      roleLabel: "Finance Lead",
      messages: buildThreadMessages("license-visibility", [
        [
          "Which apps are being used by same team?",
          "Slack and Teams are being used by same team. Try consolidating spend",
        ],
        [
          "Which apps are being used by same team?",
          "Slack and Teams are being used by same team. Try consolidating spend",
        ],
        [
          "Which apps are being used by same team?",
          "Slack and Teams are being used by same team. Try consolidating spend",
        ],
      ]),
    },
    {
      id: "contract-clarity",
      label: "Contract Clarity",
      roleLabel: "Finance Lead",
      messages: buildThreadMessages("contract-clarity", [
        [
          "Which apps are being used by same team?",
          "Slack and Teams are being used by same team. Try consolidating spend",
        ],
        [
          "Which apps are being used by same team?",
          "Slack and Teams are being used by same team. Try consolidating spend",
        ],
      ]),
    },
    {
      id: "usage-alignment",
      label: "Usage Alignment",
      roleLabel: "Finance Lead",
      messages: buildThreadMessages("usage-alignment", [
        [
          "Which apps are being used by same team?",
          "Slack and Teams are being used by same team. Try consolidating spend",
        ],
        [
          "Which apps are being used by same team?",
          "Slack and Teams are being used by same team. Try consolidating spend",
        ],
      ]),
    },
    {
      id: "subscription-control",
      label: "Subscription Control",
      roleLabel: "Finance Lead",
      messages: buildThreadMessages("subscription-control", [
        [
          "Which apps are being used by same team?",
          "Slack and Teams are being used by same team. Try consolidating spend",
        ],
        [
          "Which apps are being used by same team?",
          "Slack and Teams are being used by same team. Try consolidating spend",
        ],
      ]),
    },
  ],
} as const satisfies FaqSectionContent;
