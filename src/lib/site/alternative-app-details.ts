import { z } from "zod";

export type AlternativeAppDetailTone = "neutral" | "positive" | "negative" | "warning";

export interface AlternativeAppDetailApp {
  categoryLabel: string;
  logoHints: readonly string[];
  logoUrl?: string;
  name: string;
  planLabel: string;
  priceLabel: string;
  pricingModelLabel: string;
  rating: number;
  slug: string;
}

export interface AlternativeAppDetailOverview {
  description: string;
  heading: string;
  shownCount: number;
  totalCount: number;
}

export interface AlternativeAppDetailCurrentMetrics {
  annualSpendUsd: number;
  monthlyPriceUsd: number;
  seatCount: number;
  seatsAssignedLabel: string;
  subscriptionTiers: readonly AlternativeAppDetailSubscriptionTier[];
  wastedSpendUsd: number;
}

export interface AlternativeAppDetailSubscriptionTier {
  annualCostUsd: number;
  label: string;
  monthlyPriceUsd: number;
  seatCount: number;
}

export interface AlternativeAppDetailAlternative {
  averageSwitchCostUsd: number;
  badgeLabel?: string;
  comparisonSections?: readonly AlternativeAppDetailComparisonSection[];
  logoHints: readonly string[];
  logoUrl?: string;
  monthlyPriceUsd: number;
  monthlySpendUsd: number;
  name: string;
  planLabel: string;
  pricingModelLabel: string;
  rating?: number;
  seatCount: number;
  slug: string;
  threeYearNetSavingUsd: number;
}

export interface AlternativeAppDetailComparisonCell {
  description?: string;
  details?: readonly string[];
  label?: string;
  periodValues?: {
    annual: string;
    monthly: string;
    quarterly: string;
  };
  pills?: readonly string[];
  tone?: AlternativeAppDetailTone;
  value: string;
}

export interface AlternativeAppDetailComparisonRow {
  alternative: AlternativeAppDetailComparisonCell;
  current: AlternativeAppDetailComparisonCell;
  id: string;
  label: string;
}

export interface AlternativeAppDetailComparisonSection {
  id: string;
  rows: readonly AlternativeAppDetailComparisonRow[];
  title: string;
}

export interface AlternativeAppDetailResponse {
  alternatives: readonly AlternativeAppDetailAlternative[];
  app: AlternativeAppDetailApp;
  catalogMode: "public";
  comparisonSections: readonly AlternativeAppDetailComparisonSection[];
  currentAppMetrics: AlternativeAppDetailCurrentMetrics;
  overview: AlternativeAppDetailOverview;
  selectedAlternativeSlug: string;
}

const comparisonCellSchema: z.ZodType<AlternativeAppDetailComparisonCell> = z.object({
  description: z.string().min(1).optional(),
  details: z.array(z.string().min(1)).optional(),
  label: z.string().min(1).optional(),
  periodValues: z
    .object({
      annual: z.string().min(1),
      monthly: z.string().min(1),
      quarterly: z.string().min(1),
    })
    .optional(),
  pills: z.array(z.string().min(1)).optional(),
  tone: z.enum(["neutral", "positive", "negative", "warning"]).optional(),
  value: z.string().min(1),
});

const comparisonRowSchema: z.ZodType<AlternativeAppDetailComparisonRow> = z.object({
  alternative: comparisonCellSchema,
  current: comparisonCellSchema,
  id: z.string().min(1),
  label: z.string().min(1),
});

const comparisonSectionSchema: z.ZodType<AlternativeAppDetailComparisonSection> = z.object({
  id: z.string().min(1),
  rows: z.array(comparisonRowSchema).min(1),
  title: z.string().min(1),
});

export const alternativeAppDetailResponseSchema: z.ZodType<AlternativeAppDetailResponse> = z.object({
  alternatives: z
    .array(
      z.object({
        averageSwitchCostUsd: z.number().nonnegative(),
        badgeLabel: z.string().min(1).optional(),
        comparisonSections: z.array(comparisonSectionSchema).optional(),
        logoHints: z.array(z.string().min(1)).min(1),
        logoUrl: z.string().min(1).optional(),
        monthlyPriceUsd: z.number().nonnegative(),
        monthlySpendUsd: z.number().nonnegative(),
        name: z.string().min(1),
        planLabel: z.string().min(1),
        pricingModelLabel: z.string().min(1),
        rating: z.number().nonnegative().optional(),
        seatCount: z.number().int().positive(),
        slug: z.string().min(1),
        threeYearNetSavingUsd: z.number(),
      }),
    )
    .min(1),
  app: z.object({
    categoryLabel: z.string().min(1),
    logoHints: z.array(z.string().min(1)).min(1),
    logoUrl: z.string().min(1).optional(),
    name: z.string().min(1),
    planLabel: z.string().min(1),
    priceLabel: z.string().min(1),
    pricingModelLabel: z.string().min(1),
    rating: z.number().nonnegative(),
    slug: z.string().min(1),
  }),
  catalogMode: z.literal("public"),
  comparisonSections: z.array(comparisonSectionSchema).min(1),
  currentAppMetrics: z.object({
    annualSpendUsd: z.number().nonnegative(),
    monthlyPriceUsd: z.number().nonnegative(),
    seatCount: z.number().int().positive(),
    seatsAssignedLabel: z.string().min(1),
    subscriptionTiers: z.array(
      z.object({
        annualCostUsd: z.number().nonnegative(),
        label: z.string().min(1),
        monthlyPriceUsd: z.number().nonnegative(),
        seatCount: z.number().int().positive(),
      }),
    ),
    wastedSpendUsd: z.number().nonnegative(),
  }),
  overview: z.object({
    description: z.string().min(1),
    heading: z.string().min(1),
    shownCount: z.number().int().nonnegative(),
    totalCount: z.number().int().positive(),
  }),
  selectedAlternativeSlug: z.string().min(1),
});

export function getAlternativeAppDetailsApiUrl(appId: string) {
  return `/api/site/alternative-apps/details/${encodeURIComponent(appId)}`;
}
