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
          "Which renewals hit us in the next 45 days?",
          "Doow flags Salesforce, Zoom webinar, and Miro enterprise renewals due next month, with owners and estimated annualized spend attached to each one.",
        ],
        [
          "Can you show me which apps marketing and sales both expense separately?",
          "Marketing and sales overlap on HubSpot add-ons, Canva, and Loom. Consolidating them into shared workspace plans could remove duplicate spend without changing workflows.",
        ],
        [
          "Which subscriptions still have no owner assigned?",
          "Seven active subscriptions lack an accountable owner right now, led by Airtable, Typeform, and Dropbox Sign. Assigning owners is the fastest way to prevent silent auto-renewals.",
        ],
        [
          "Are there paid seats sitting unused this quarter?",
          "Yes. Doow sees inactive seat clusters in Figma, Asana, and Zoom Phone. Finance can reclaim 23 seats without affecting the teams that are still active in those tools.",
        ],
        [
          "Which annual commitments have the weakest adoption?",
          "Mural enterprise, a secondary BI workspace, and a legacy recording suite are all under 50% adoption. Those are the clearest candidates for renewal review before the next cycle.",
        ],
      ]),
    },
    {
      id: "cost-optimization",
      label: "Cost Optimization",
      roleLabel: "Finance Lead",
      messages: buildThreadMessages("cost-optimization", [
        [
          "Which apps are being used by same team?",
          "Slack and Teams are being used by same team. Try consolidating spend.",
        ],
        [
          "Where can we downgrade plans without breaking workflows?",
          "Notion enterprise can move 31 users to business, and Loom business can drop to starter for most of customer success. Those changes preserve core usage and reduce cost immediately.",
        ],
        [
          "Which contracts have the biggest savings opportunity before renewal?",
          "Salesforce, HubSpot, and Dropbox present the highest near-term savings. Together they represent about $68k in negotiable spend across the next two renewal cycles.",
        ],
        [
          "What is the fastest 30-day savings plan?",
          "Start by reclaiming unused seats in Zoom and Asana, then merge overlapping collaboration tools, then remove unused premium add-ons. That sequence creates the quickest savings with the least disruption.",
        ],
        [
          "What budget leakage is happening outside procurement?",
          "Card-paid tools in product and growth teams account for the biggest unmanaged spend. Doow groups them by team, vendor, and contract risk so finance can intervene before they scale further.",
        ],
      ]),
    },
    {
      id: "team-usage-insights",
      label: "Team & Usage Insights",
      roleLabel: "Admin",
      messages: buildThreadMessages("team-usage-insights", [
        [
          "Which teams use the most apps right now?",
          "Product and go-to-market use the broadest stack today. Product leans on design and issue-tracking tools, while sales and marketing create the highest vendor overlap.",
        ],
        [
          "Can I see tools that only one person still uses?",
          "Twelve subscriptions are effectively single-user tools. The most expensive are Mixpanel, Tableau creator seats, and premium recording add-ons that no longer have broad adoption.",
        ],
        [
          "Which teams added new tools this month?",
          "Customer success, recruiting, and design added the most new vendors in the last 30 days. Doow marks each one by owner, payment source, and approval status so admins can review fast.",
        ],
        [
          "Where is adoption dropping after rollout?",
          "Usage fell most in Mural, Loom enterprise, and Calendly team routing. Those are good candidates for seat trimming before their next renewal window opens.",
        ],
        [
          "Which managers should start a cleanup review first?",
          "The design ops, sales enablement, and recruiting managers each own clusters of low-usage tools. Starting there gives you the highest cleanup impact with the fewest stakeholders.",
        ],
      ]),
    },
    {
      id: "integrations-setup",
      label: "Integrations & Setup",
      roleLabel: "Integration Admin",
      messages: buildThreadMessages("integrations-setup", [
        [
          "How long does initial setup usually take?",
          "Most teams complete setup in under an hour. Connecting SSO, finance systems, and card feeds unlocks ownership, usage, and renewal tracking on the same day.",
        ],
        [
          "Which systems should we sync first?",
          "Start with Google Workspace or Microsoft 365, your finance system, and your card provider. That gives Doow the fastest path to users, spend, and vendor activity.",
        ],
        [
          "Do I need engineering support to keep integrations running?",
          "No dedicated engineering work is usually needed. Integration admins can manage permissions, refresh connections, and monitor sync health directly from the admin console.",
        ],
        [
          "What happens if an integration disconnects?",
          "Doow alerts the integration admin, preserves the last synced snapshot, and highlights which vendors or employee mappings may become stale until the connection is restored.",
        ],
        [
          "Can we stage rollout by workspace or legal entity?",
          "Yes. You can connect sources gradually, validate mappings per entity, and expand coverage in phases so setup stays controlled even in multi-brand or multi-region environments.",
        ],
      ]),
    },
    {
      id: "security-compliance",
      label: "Security & Compliance",
      roleLabel: "Admin",
      messages: buildThreadMessages("security-compliance", [
        [
          "Who can see spend and contract data?",
          "Access is role-based. Finance, procurement, and approved admins can view contract-level detail, while team leads can be limited to the app inventory that belongs to their teams.",
        ],
        [
          "Can Doow help with access reviews?",
          "Yes. Doow surfaces orphaned accounts, dormant admins, and vendors without a clear owner so quarterly access reviews are faster and more complete.",
        ],
        [
          "How do we track risky vendors?",
          "Vendors can be tagged by security status, missing documents, or policy exceptions. High-risk tools stay visible right alongside renewals, spend, and ownership data.",
        ],
        [
          "Does Doow support audit prep?",
          "It does. You can export vendor ownership, renewal logs, access evidence, and change history for finance, IT, and compliance reviews without rebuilding the trail manually.",
        ],
        [
          "Can terminated users stay tied to vendor history?",
          "Yes. Offboarded users can remain linked to historical vendor activity so audits and investigations still show who owned access, approved spend, and changed permissions over time.",
        ],
      ]),
    },
    {
      id: "reporting-finance-ops",
      label: "Reporting & Finance Ops",
      roleLabel: "Finance Lead",
      messages: buildThreadMessages("reporting-finance-ops", [
        [
          "Can I get a monthly spend summary by department?",
          "Yes. Doow rolls spend up by team, vendor, and category so finance ops can compare budget owners against actual software usage in one view.",
        ],
        [
          "Which vendors moved outside forecast this quarter?",
          "Salesforce, Zoom add-ons, and contractor tooling drove the largest variance. Doow separates approved growth from unplanned leakage so review meetings stay focused.",
        ],
        [
          "Can we prepare accruals for annual contracts in one view?",
          "Doow keeps contract value, renewal dates, billing cadence, and owners together so month-end accrual prep takes minutes instead of spreadsheet chasing.",
        ],
        [
          "What should finance review before board reporting?",
          "Focus on renewal exposure, realized savings, unused seat reductions, and net-new vendor growth. Those metrics show both spend control and operational risk clearly.",
        ],
        [
          "Can I export savings and renewal pipeline for month-end?",
          "Yes. Finance ops can export savings realized, pending negotiations, renewal exposure, and owner-level follow-ups so the month-end pack reflects current SaaS obligations.",
        ],
      ]),
    },
  ],
} as const satisfies FaqSectionContent;
