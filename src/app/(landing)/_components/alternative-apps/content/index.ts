import type { LandingActionLink } from "@/app/(landing)/_components/shared";

export type AppLogoKey = "google" | "notion" | "salesforce" | "slack";

export interface AppSelectionOption {
  id: string;
  name: string;
  logoKey: AppLogoKey;
}

export interface CurrentComparedApp {
  id: string;
  name: string;
  logoKey: AppLogoKey;
  statusLabel: string;
  pricingModelLabel: string;
  rating: number;
  annualSpendUsd: number;
  wastedSpendUsd: number;
  seatCount: number;
}

export type AlternativeRecommendationInsightTone = "default" | "positive" | "negative" | "strong";

export interface AlternativeRecommendationInsightSegment {
  text: string;
  tone?: AlternativeRecommendationInsightTone;
}

export type AlternativeRecommendationCostTone = "positive" | "negative";

export interface AlternativeRecommendation {
  id: string;
  name: string;
  logoKey: AppLogoKey;
  pricingModelLabel: string;
  planLabel: string;
  badgeLabel?: string;
  averageSwitchCostUsd: number;
  averageSwitchCostTone: AlternativeRecommendationCostTone;
  seatCount: number;
  monthlySpendUsd: number;
  insight: readonly AlternativeRecommendationInsightSegment[];
}

export interface AlternativeAppsResponse {
  selectedAppId: string;
  options: readonly AppSelectionOption[];
  currentApp: CurrentComparedApp;
  alternativesCount: number;
  alternatives: readonly AlternativeRecommendation[];
}

export interface AlternativeAppsSectionContent {
  id: string;
  eyebrow: string;
  titleLines: readonly [string, string];
  descriptionLines: readonly [string, string];
  analysisCta: LandingActionLink;
  initialSelectedAppId: string;
}

const appSelectionOptions = [
  {
    id: "asana",
    name: "Asana",
    logoKey: "salesforce",
  },
  {
    id: "notion",
    name: "Notion",
    logoKey: "google",
  },
  {
    id: "slack",
    name: "Slack",
    logoKey: "notion",
  },
  {
    id: "zoom",
    name: "Zoom",
    logoKey: "google",
  },
  {
    id: "figma",
    name: "Figma",
    logoKey: "slack",
  },
] as const satisfies readonly AppSelectionOption[];

export const alternativeAppsSectionContent = {
  id: "alternative-apps",
  eyebrow: "SAAS INTELLIGENCE",
  titleLines: ["Are you overpaying", "for tools you already use?"],
  descriptionLines: [
    "Pick any tool below and see what smarter alternatives could",
    "save you, instantly.",
  ],
  analysisCta: {
    href: "https://dev.doow.co/",
    label: "See full analysis in Doow",
  } satisfies LandingActionLink,
  initialSelectedAppId: "asana",
} as const satisfies AlternativeAppsSectionContent;

export const alternativeAppsResponseByAppId = {
  asana: {
    selectedAppId: "asana",
    options: appSelectionOptions,
    currentApp: {
      id: "asana",
      name: "Asana",
      logoKey: "salesforce",
      statusLabel: "Current",
      pricingModelLabel: "Seat based",
      rating: 4.3,
      annualSpendUsd: 38400,
      wastedSpendUsd: 4320,
      seatCount: 80,
    },
    alternativesCount: 13,
    alternatives: [
      {
        id: "trello",
        name: "Trello",
        logoKey: "google",
        pricingModelLabel: "Hybrid",
        planLabel: "Starter ($10/user/month)",
        badgeLabel: "Best fit",
        averageSwitchCostUsd: 25650,
        averageSwitchCostTone: "positive",
        seatCount: 62,
        monthlySpendUsd: 600,
        insight: [
          {
            text: "Trello covers your team's project management needs at ",
          },
          {
            text: "$25,650/year",
            tone: "positive",
          },
          {
            text: ", which is ",
          },
          {
            text: "$30,000",
            tone: "strong",
          },
          {
            text: " less than Asana. Your teams primarily use task lists and assignments, which Trello handles well.",
          },
        ],
      },
      {
        id: "linear",
        name: "Linear",
        logoKey: "salesforce",
        pricingModelLabel: "Usage-based",
        planLabel: "Basic ($45/month)",
        averageSwitchCostUsd: 125650,
        averageSwitchCostTone: "negative",
        seatCount: 62,
        monthlySpendUsd: 2650,
        insight: [
          {
            text: "Linear costs ",
          },
          {
            text: "$70,000/year",
            tone: "negative",
          },
          {
            text: " more than Asana and is built for engineering workflows. But your teams are mostly non-technical ",
          },
          {
            text: "(9/10 teams)",
            tone: "strong",
          },
          {
            text: ", so it is not a fit.",
          },
        ],
      },
      {
        id: "clickup",
        name: "ClickUp",
        logoKey: "notion",
        pricingModelLabel: "Usage-based",
        planLabel: "Basic ($45/month)",
        averageSwitchCostUsd: 98650,
        averageSwitchCostTone: "negative",
        seatCount: 62,
        monthlySpendUsd: 2280,
        insight: [
          {
            text: "ClickUp would still cost ",
          },
          {
            text: "$58,000/year",
            tone: "negative",
          },
          {
            text: " more than Asana once your migration and training overhead are included.",
          },
        ],
      },
    ] satisfies readonly AlternativeRecommendation[],
  },
  notion: {
    selectedAppId: "notion",
    options: appSelectionOptions,
    currentApp: {
      id: "notion",
      name: "Notion",
      logoKey: "google",
      statusLabel: "Current",
      pricingModelLabel: "Hybrid",
      rating: 4.5,
      annualSpendUsd: 28800,
      wastedSpendUsd: 3648,
      seatCount: 64,
    },
    alternativesCount: 11,
    alternatives: [
      {
        id: "coda",
        name: "Coda",
        logoKey: "slack",
        pricingModelLabel: "Hybrid",
        planLabel: "Starter ($12/user/month)",
        badgeLabel: "Best fit",
        averageSwitchCostUsd: 21420,
        averageSwitchCostTone: "positive",
        seatCount: 58,
        monthlySpendUsd: 580,
        insight: [
          {
            text: "Coda reduces your documentation spend to ",
          },
          {
            text: "$21,420/year",
            tone: "positive",
          },
          {
            text: " while keeping the collaboration workflows your teams already rely on.",
          },
        ],
      },
      {
        id: "slab",
        name: "Slab",
        logoKey: "salesforce",
        pricingModelLabel: "Seat based",
        planLabel: "Pro ($20/user/month)",
        averageSwitchCostUsd: 32240,
        averageSwitchCostTone: "negative",
        seatCount: 64,
        monthlySpendUsd: 1280,
        insight: [
          {
            text: "Slab becomes ",
          },
          {
            text: "$3,440/year",
            tone: "negative",
          },
          {
            text: " more expensive than Notion once you account for editor seats and admin controls.",
          },
        ],
      },
      {
        id: "tettra",
        name: "Tettra",
        logoKey: "notion",
        pricingModelLabel: "Seat based",
        planLabel: "Team ($8/user/month)",
        averageSwitchCostUsd: 24680,
        averageSwitchCostTone: "positive",
        seatCount: 52,
        monthlySpendUsd: 416,
        insight: [
          {
            text: "Tettra is cheaper at ",
          },
          {
            text: "$24,680/year",
            tone: "positive",
          },
          {
            text: ", but you would lose database-heavy workflows that product and ops still need.",
          },
        ],
      },
    ] satisfies readonly AlternativeRecommendation[],
  },
  slack: {
    selectedAppId: "slack",
    options: appSelectionOptions,
    currentApp: {
      id: "slack",
      name: "Slack",
      logoKey: "notion",
      statusLabel: "Current",
      pricingModelLabel: "Seat based",
      rating: 4.2,
      annualSpendUsd: 49800,
      wastedSpendUsd: 6120,
      seatCount: 92,
    },
    alternativesCount: 9,
    alternatives: [
      {
        id: "mattermost",
        name: "Mattermost",
        logoKey: "google",
        pricingModelLabel: "Hybrid",
        planLabel: "Starter ($7/user/month)",
        badgeLabel: "Best fit",
        averageSwitchCostUsd: 30840,
        averageSwitchCostTone: "positive",
        seatCount: 76,
        monthlySpendUsd: 532,
        insight: [
          {
            text: "Mattermost would bring your collaboration spend down to ",
          },
          {
            text: "$30,840/year",
            tone: "positive",
          },
          {
            text: " and still supports the channels and message history most teams use daily.",
          },
        ],
      },
      {
        id: "discord",
        name: "Discord",
        logoKey: "salesforce",
        pricingModelLabel: "Usage-based",
        planLabel: "Basic ($40/month)",
        averageSwitchCostUsd: 55200,
        averageSwitchCostTone: "negative",
        seatCount: 92,
        monthlySpendUsd: 4600,
        insight: [
          {
            text: "Discord looks inexpensive up front, but moderation tooling and support gaps create ",
          },
          {
            text: "$5,400/year",
            tone: "negative",
          },
          {
            text: " in extra operating cost for your finance and IT teams.",
          },
        ],
      },
      {
        id: "twist",
        name: "Twist",
        logoKey: "slack",
        pricingModelLabel: "Seat based",
        planLabel: "Pro ($8/user/month)",
        averageSwitchCostUsd: 35620,
        averageSwitchCostTone: "positive",
        seatCount: 68,
        monthlySpendUsd: 544,
        insight: [
          {
            text: "Twist saves money at ",
          },
          {
            text: "$35,620/year",
            tone: "positive",
          },
          {
            text: ", but async-only communication may slow incident response for support and sales.",
          },
        ],
      },
    ] satisfies readonly AlternativeRecommendation[],
  },
  zoom: {
    selectedAppId: "zoom",
    options: appSelectionOptions,
    currentApp: {
      id: "zoom",
      name: "Zoom",
      logoKey: "google",
      statusLabel: "Current",
      pricingModelLabel: "Usage-based",
      rating: 4.1,
      annualSpendUsd: 22440,
      wastedSpendUsd: 2520,
      seatCount: 51,
    },
    alternativesCount: 8,
    alternatives: [
      {
        id: "around",
        name: "Around",
        logoKey: "slack",
        pricingModelLabel: "Hybrid",
        planLabel: "Starter ($10/user/month)",
        badgeLabel: "Best fit",
        averageSwitchCostUsd: 18420,
        averageSwitchCostTone: "positive",
        seatCount: 44,
        monthlySpendUsd: 420,
        insight: [
          {
            text: "Around lowers meeting spend to ",
          },
          {
            text: "$18,420/year",
            tone: "positive",
          },
          {
            text: " and keeps the lightweight meeting workflow your remote teams already follow.",
          },
        ],
      },
      {
        id: "webex",
        name: "Webex",
        logoKey: "salesforce",
        pricingModelLabel: "Seat based",
        planLabel: "Business ($19/user/month)",
        averageSwitchCostUsd: 27600,
        averageSwitchCostTone: "negative",
        seatCount: 51,
        monthlySpendUsd: 807,
        insight: [
          {
            text: "Webex lands at ",
          },
          {
            text: "$27,600/year",
            tone: "negative",
          },
          {
            text: " once advanced security and webinar add-ons are included, so it does not reduce your cost base.",
          },
        ],
      },
      {
        id: "loom",
        name: "Loom",
        logoKey: "notion",
        pricingModelLabel: "Usage-based",
        planLabel: "Team ($15/user/month)",
        averageSwitchCostUsd: 20160,
        averageSwitchCostTone: "positive",
        seatCount: 38,
        monthlySpendUsd: 570,
        insight: [
          {
            text: "Loom saves money at ",
          },
          {
            text: "$20,160/year",
            tone: "positive",
          },
          {
            text: ", but it only works if most meetings can become async updates.",
          },
        ],
      },
    ] satisfies readonly AlternativeRecommendation[],
  },
  figma: {
    selectedAppId: "figma",
    options: appSelectionOptions,
    currentApp: {
      id: "figma",
      name: "Figma",
      logoKey: "slack",
      statusLabel: "Current",
      pricingModelLabel: "Seat based",
      rating: 4.6,
      annualSpendUsd: 31680,
      wastedSpendUsd: 3960,
      seatCount: 72,
    },
    alternativesCount: 10,
    alternatives: [
      {
        id: "penpot",
        name: "Penpot",
        logoKey: "google",
        pricingModelLabel: "Hybrid",
        planLabel: "Starter ($11/user/month)",
        badgeLabel: "Best fit",
        averageSwitchCostUsd: 23840,
        averageSwitchCostTone: "positive",
        seatCount: 54,
        monthlySpendUsd: 495,
        insight: [
          {
            text: "Penpot trims design-tool spend to ",
          },
          {
            text: "$23,840/year",
            tone: "positive",
          },
          {
            text: " while still covering collaborative design reviews and developer handoff.",
          },
        ],
      },
      {
        id: "sketch",
        name: "Sketch",
        logoKey: "salesforce",
        pricingModelLabel: "Seat based",
        planLabel: "Business ($20/user/month)",
        averageSwitchCostUsd: 34200,
        averageSwitchCostTone: "negative",
        seatCount: 60,
        monthlySpendUsd: 1200,
        insight: [
          {
            text: "Sketch pushes annual cost to ",
          },
          {
            text: "$34,200/year",
            tone: "negative",
          },
          {
            text: " once cloud collaboration and workspace seats are included.",
          },
        ],
      },
      {
        id: "lunacy",
        name: "Lunacy",
        logoKey: "notion",
        pricingModelLabel: "Usage-based",
        planLabel: "Basic ($14/month)",
        averageSwitchCostUsd: 26780,
        averageSwitchCostTone: "positive",
        seatCount: 48,
        monthlySpendUsd: 620,
        insight: [
          {
            text: "Lunacy can save money at ",
          },
          {
            text: "$26,780/year",
            tone: "positive",
          },
          {
            text: ", but your design systems team would lose mature multiplayer workflows.",
          },
        ],
      },
    ] satisfies readonly AlternativeRecommendation[],
  },
} as const satisfies Record<string, AlternativeAppsResponse>;
