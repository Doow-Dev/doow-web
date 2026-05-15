import type { FaqCategoryId, FaqSectionContent, FaqThreadMessage } from "@/components/layout/faq";

type FaqMessageCopy = readonly [speaker: FaqThreadMessage["speaker"], text: string, assistantLabel?: string];

function buildThreadMessages(categoryId: FaqCategoryId, messages: readonly FaqMessageCopy[]): FaqThreadMessage[] {
  return messages.map(([speaker, text, assistantLabel], index) => ({
    id: `${categoryId}-message-${index + 1}`,
    ...(assistantLabel ? { assistantLabel } : {}),
    speaker,
    text,
  }));
}

export const doowAiFaqContent = {
  initialSelectedCategoryId: "always-running",
  categories: [
    {
      id: "always-running",
      label: "Always Running",
      roleLabel: "Finance Lead",
      messages: buildThreadMessages("always-running", [
        ["user", "Do Derek and Mina only work when I ask questions?"],
        ["assistant", "No. I continuously analyse your financial data in the background.", "Derek"],
        ["assistant", "And I'm always scanning for patterns, anomalies, and hidden issues.", "Mina"],
        ["user", "So they're working even when I'm not in the platform?"],
        ["assistant", "Yes, your data is always being monitored.", "Derek"],
      ]),
    },
    {
      id: "automatic-detection",
      label: "Automatic Detection",
      roleLabel: "Finance Lead",
      messages: buildThreadMessages("automatic-detection", [
        ["user", "Will they actually catch problems without me looking for them?"],
        ["assistant", "Yes. I surface unusual spend, duplicate tools, and inefficiencies automatically.", "Mina"],
        ["user", "Without me setting anything up?"],
        ["assistant", "No setup needed, I look for what matters by default.", "Mina"],
        ["assistant", "And I quantify the impact so you know exactly what it costs.", "Derek"],
      ]),
    },
    {
      id: "smart-recommendations",
      label: "Smart Recommendations",
      roleLabel: "Finance Lead",
      messages: buildThreadMessages("smart-recommendations", [
        ["user", "Can Doow suggest ways to reduce our SaaS costs?"],
        ["assistant", "Doow AI: Yes. Doow recommends actions like consolidating tools or reducing licenses."],
        ["user", "Based on what?"],
        ["assistant", "Doow AI: Your actual usage, spend patterns, and team behaviour."],
        ["user", "So it's not generic advice?"],
        ["assistant", "Doow AI: Every recommendation is specific to your company."],
      ]),
    },
    {
      id: "context-awareness",
      label: "Context Awareness",
      roleLabel: "Finance Lead",
      messages: buildThreadMessages("context-awareness", [
        ["user", "Does Doow understand how our teams actually use tools?"],
        ["assistant", "Doow AI: Yes. Doow connects spend, usage, and team context together."],
        ["user", "So it knows who is using what and why?"],
        ["assistant", "Doow AI: Exactly. Every answer is grounded in real activity across your organisation."],
        ["user", "That means better decisions?"],
        ["assistant", "Doow AI: You're making decisions with full context, not guesswork."],
      ]),
    },
  ],
} as const satisfies FaqSectionContent;
