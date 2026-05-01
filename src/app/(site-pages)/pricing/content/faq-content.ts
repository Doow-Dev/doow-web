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

const defaultQuestion = "Which apps are being used by same team?";
const defaultAnswer = "Slack and Teams are being used by same team. Try consolidating spend";

export const pricingFaqContent = {
  initialSelectedCategoryId: "cost-optimization",
  interaction: {
    mode: "simulated",
    revealDelayMs: 320,
  },
  categories: [
    {
      id: "spend-visibility",
      label: "Spend Visibility",
      roleLabel: "Finance Lead",
      messages: buildThreadMessages("spend-visibility", [
        [defaultQuestion, defaultAnswer],
        ["Can Doow show what each team is paying for?", "Yes. Doow gives finance one searchable view of team-level software spend."],
      ]),
    },
    {
      id: "cost-optimization",
      label: "Cost Optimization",
      roleLabel: "Finance Lead",
      messages: buildThreadMessages("cost-optimization", [
        [defaultQuestion, defaultAnswer],
        ["Can Doow help reduce duplicate tools?", "Yes. Doow highlights overlapping apps so teams can consolidate and reduce waste."],
        ["Will it surface savings opportunities?", "Doow shows renewal, usage, and overlap signals so finance can act before spend compounds."],
      ]),
    },
    {
      id: "team-usage-insights",
      label: "Team & Usage Insights",
      roleLabel: "Finance Lead",
      messages: buildThreadMessages("team-usage-insights", [
        [defaultQuestion, defaultAnswer],
        ["Can I see who is actually using paid tools?", "Yes. Doow connects apps to usage and ownership signals so inactive licenses are easier to spot."],
      ]),
    },
    {
      id: "integrations-setup",
      label: "Integrations & Setup",
      roleLabel: "Finance Lead",
      messages: buildThreadMessages("integrations-setup", [
        [defaultQuestion, defaultAnswer],
        ["How fast can we get started?", "Connect payment and app sources, then Doow starts organizing your software stack into one view."],
      ]),
    },
    {
      id: "security-compliance",
      label: "Security & Compliance",
      roleLabel: "Finance Lead",
      messages: buildThreadMessages("security-compliance", [
        [defaultQuestion, defaultAnswer],
        ["Can finance keep an audit trail?", "Enterprise plans include audit logs and reporting controls for compliance-ready finance operations."],
      ]),
    },
    {
      id: "reporting-finance-ops",
      label: "Reporting & Finance Ops",
      roleLabel: "Finance Lead",
      messages: buildThreadMessages("reporting-finance-ops", [
        [defaultQuestion, defaultAnswer],
        ["Can Doow support regular finance reviews?", "Yes. Doow turns subscriptions, renewals, and usage into finance-ready reporting views."],
      ]),
    },
  ],
} as const satisfies FaqSectionContent;
