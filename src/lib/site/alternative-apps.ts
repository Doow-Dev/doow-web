import { z } from "zod";

import {
  alternativeAppsResponseByAppId,
  alternativeAppsSectionContent,
  type AlternativeAppsResponse,
  type AlternativeRecommendation,
  type AlternativeRecommendationInsightSegment,
  type AppSelectionOption,
  type CurrentComparedApp,
} from "@/app/(landing)/_components/alternative-apps/content";

const appSelectionOptionSchema: z.ZodType<AppSelectionOption> = z.object({
  id: z.string().min(1),
  logoKey: z.enum(["google", "notion", "salesforce", "slack"]),
  name: z.string().min(1),
});

const currentComparedAppSchema: z.ZodType<CurrentComparedApp> = z.object({
  annualSpendUsd: z.number().nonnegative(),
  id: z.string().min(1),
  logoKey: z.enum(["google", "notion", "salesforce", "slack"]),
  name: z.string().min(1),
  pricingModelLabel: z.string().min(1),
  rating: z.number().nonnegative(),
  seatCount: z.number().int().positive(),
  statusLabel: z.string().min(1),
  wastedSpendUsd: z.number().nonnegative(),
});

const alternativeRecommendationInsightSegmentSchema: z.ZodType<AlternativeRecommendationInsightSegment> = z.object({
  text: z.string().min(1),
  tone: z.enum(["default", "positive", "negative", "strong"]).optional(),
});

const alternativeRecommendationSchema: z.ZodType<AlternativeRecommendation> = z.object({
  averageSwitchCostTone: z.enum(["positive", "negative"]),
  averageSwitchCostUsd: z.number().nonnegative(),
  badgeLabel: z.string().min(1).optional(),
  id: z.string().min(1),
  insight: z.array(alternativeRecommendationInsightSegmentSchema).min(1),
  logoKey: z.enum(["google", "notion", "salesforce", "slack"]),
  monthlySpendUsd: z.number().nonnegative(),
  name: z.string().min(1),
  planLabel: z.string().min(1),
  pricingModelLabel: z.string().min(1),
  seatCount: z.number().int().positive(),
});

export const alternativeAppsResponseSchema: z.ZodType<AlternativeAppsResponse> = z.object({
  alternatives: z.array(alternativeRecommendationSchema).min(1),
  alternativesCount: z.number().int().positive(),
  currentApp: currentComparedAppSchema,
  options: z.array(appSelectionOptionSchema).min(1),
  selectedAppId: z.string().min(1),
});

export function getAlternativeAppsApiUrl(appId: string) {
  const params = new URLSearchParams({
    appId,
  });

  return `/api/site/alternative-apps?${params.toString()}`;
}

export function isAlternativeAppsAppId(
  appId: string | undefined
): appId is keyof typeof alternativeAppsResponseByAppId {
  return typeof appId === "string" && appId in alternativeAppsResponseByAppId;
}

export async function getAlternativeAppsResponse(appId?: string) {
  const selectedAppId = isAlternativeAppsAppId(appId) ? appId : alternativeAppsSectionContent.initialSelectedAppId;
  const response = alternativeAppsResponseByAppId[selectedAppId];

  return alternativeAppsResponseSchema.parse(response);
}
