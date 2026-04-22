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

export const applicationsFaqContent = {
  initialSelectedCategoryId: "app-discovery",
  categories: [
    {
      id: "app-discovery",
      label: "App Discovery",
      roleLabel: "Finance Lead",
      messages: buildThreadMessages("app-discovery", [
        [
          "Will Doow actually find all the apps my team is using?",
          "Yes. Doow detects applications across bank transactions, receipts, and direct integrations.",
        ],
        [
          "Even tools teams signed up for on their own?",
          "Yes,  including shadow IT and untracked subscriptions.",
        ],
        [
          "So nothing slips through?",
          "You get a complete, continuously updated inventory of every app in use.",
        ],
      ]),
    },
    {
      id: "app-ownership",
      label: "App Ownership",
      roleLabel: "Finance Lead",
      messages: buildThreadMessages("app-ownership", [
        [
          "Can I see who owns each application?",
          "Yes. Every app can be assigned to a team or individual owner.",
        ],
        [
          "What if no one currently owns it?",
          "Doow flags unassigned apps so you can quickly assign accountability.",
        ],
        [
          "Why does that matter?",
          "Ownership ensures every tool is reviewed, justified, and properly managed.",
        ],
      ]),
    },
    {
      id: "app-usage-and-activity",
      label: "App Usage and Activity",
      roleLabel: "Finance Lead",
      messages: buildThreadMessages("app-usage-and-activity", [
        [
          "Can I tell which apps are actually being used?",
          "Yes. Doow tracks activity signals to show how actively each app is used.",
        ],
        [
          "So I can spot tools people forgot about?",
          "Exactly. You\u2019ll see underused and inactive apps instantly.",
        ],
        [
          "Can I act on that?",
          "You can review usage",
        ],
      ]),
    },
    {
      id: "app-overlap",
      label: "App Overlap",
      roleLabel: "Finance Lead",
      messages: buildThreadMessages("app-overlap", [
        [
          "Can Doow show me apps that do the same thing?",
          "Yes. Doow groups similar tools and highlights overlaps across teams.",
        ],
        [
          "So I can see where we\u2019re double-paying?",
          "Exactly. You\u2019ll get clear visibility into redundant tools.",
        ],
      ]),
    },
    {
      id: "app-insights",
      label: "App Insights",
      roleLabel: "Finance Lead",
      messages: buildThreadMessages("app-insights", [
        [
          "Can I get a clear breakdown of each app\u2019s cost and value?",
          "Yes. Each app includes spend, usage, renewal dates, and assigned owner.",
        ],
        [
          "So I can evaluate if it\u2019s worth keeping?",
          "Exactly. You get full context to decide what stays or goes.",
        ],
        [
          "And take action immediately?",
          "You can manage, optimise, any app directly from Doow.",
        ],
      ]),
    },
  ],
} as const satisfies FaqSectionContent;
