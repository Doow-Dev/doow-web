import type { LandingActionLink } from "@/app/(landing)/_components/shared";

export type AppLogoKey = "google" | "notion" | "salesforce" | "slack";

export interface AppSelectionOption {
  id: string;
  name: string;
  logoKey: AppLogoKey;
  logoHints?: readonly string[];
  logoUrl?: string;
}

export interface CurrentComparedApp {
  id: string;
  name: string;
  logoKey: AppLogoKey;
  logoHints?: readonly string[];
  logoUrl?: string;
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
  logoHints?: readonly string[];
  logoUrl?: string;
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
}

export const alternativeAppsSectionContent = {
  id: "alternative-apps",
  eyebrow: "SAAS INTELLIGENCE",
  titleLines: ["Are you overpaying", "for tools you already use?"],
  descriptionLines: [
    "Pick any tool below and see what smarter alternatives could",
    "save you, instantly.",
  ],
  analysisCta: {
    href: "/alternative-apps",
    label: "See full analysis in Doow",
  } satisfies LandingActionLink,
} as const satisfies AlternativeAppsSectionContent;
