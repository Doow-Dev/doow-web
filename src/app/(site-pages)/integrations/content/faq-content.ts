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

export const integrationsFaqContent = {
  initialSelectedCategoryId: "system-compatibility",
  categories: [
    {
      id: "system-compatibility",
      label: "System Compatibility",
      roleLabel: "Finance Lead",
      messages: buildThreadMessages("system-compatibility", [
        [
          "Will Doow actually work with the systems we already use?",
          "Yes. Doow integrates with banks, accounting tools, and major SaaS providers.",
        ],
        [
          "What if we use a mix of different tools?",
          "That's expected. Doow is designed to unify data across fragmented systems.",
        ],
        [
          "So I don't need to change our setup?",
          "No changes needed, Doow fits into your existing stack.",
        ],
      ]),
    },
    {
      id: "setup-speed",
      label: "Setup Speed",
      roleLabel: "Finance Lead",
      messages: buildThreadMessages("setup-speed", [
        [
          "How long does it take to get everything connected?",
          "Most integrations are set up in minutes.",
        ],
        [
          "Even for banks and accounting tools?",
          "Yes. Secure connections are established quickly with guided setup.",
        ],
        [
          "So we can start seeing data immediately?",
          "You'll start getting visibility as soon as connections are live.",
        ],
      ]),
    },
    {
      id: "data-security",
      label: "Data Security",
      roleLabel: "Finance Lead",
      messages: buildThreadMessages("data-security", [
        [
          "Is it safe to connect our financial systems to Doow?",
          "Yes. All integrations use secure, encrypted connections.",
        ],
        [
          "Do you store sensitive banking credentials?",
          "No. Doow uses secure authentication methods and does not expose credentials.",
        ],
        [
          "So our financial data stays protected?",
          "Security and compliance are built into every connection.",
        ],
      ]),
    },
    {
      id: "data-sync",
      label: "Data Sync",
      roleLabel: "Finance Lead",
      messages: buildThreadMessages("data-sync", [
        [
          "Will our data stay updated automatically?",
          "Yes. Doow continuously syncs data across all connected systems.",
        ],
        [
          "So I don't have to refresh or upload anything?",
          "No manual work - your data stays current in real time.",
        ],
        [
          "Can I rely on it for accurate reporting?",
          "You always have an up-to-date and consistent view of your spend",
        ],
      ]),
    },
    {
      id: "flexible-connections",
      label: "Flexible Connections",
      roleLabel: "Finance Lead",
      messages: buildThreadMessages("flexible-connections", [
        [
          "What if a tool we use isn't directly supported?",
          "Doow can still detect spend through bank and transaction data.",
        ],
        [
          "So I won't lose visibility?",
          "You'll still see and track those expenses even without a direct integration.",
        ],
        [
          "Can we add more integrations over time?",
          "Yes. You can expand connections as your stack evolves.",
        ],
      ]),
    },
  ],
} as const satisfies FaqSectionContent;
