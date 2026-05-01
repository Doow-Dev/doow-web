import "server-only";

import { unstable_cache } from "next/cache";

import { alternativeAppsResponseSchema } from "@/lib/site/alternative-apps";
import type {
  AlternativeAppsResponse,
  AlternativeRecommendation,
  AlternativeRecommendationInsightSegment,
  AppLogoKey,
} from "@/app/(landing)/_components/alternative-apps/content";
import type { AlternativeAppDetailAlternative } from "@/lib/site/alternative-app-details";
import type { AlternativeAppsCatalogItem } from "@/lib/site/alternative-apps-catalog";
import {
  getAlternativeAppDetailsResponse,
  getAlternativeAppsCatalogResponse,
} from "@/lib/server/alternative-apps-service";

const landingAlternativeAppsTake = 5;
const landingAlternativeRecommendationsTake = 4;
const landingAlternativeAppsRevalidateSeconds = 300;

export class LandingAlternativeAppsDataError extends Error {
  readonly status: number;

  constructor(message: string, status = 502) {
    super(message);
    this.name = "LandingAlternativeAppsDataError";
    this.status = status;
  }
}

const getCachedLandingCatalog = unstable_cache(
  async () =>
    getAlternativeAppsCatalogResponse({
      featured: true,
      take: landingAlternativeAppsTake,
    }),
  ["landing-alternative-apps-featured-catalog-v1"],
  {
    revalidate: landingAlternativeAppsRevalidateSeconds,
    tags: ["alternative-apps", "landing-alternative-apps"],
  },
);

const getCachedLandingDetails = unstable_cache(
  async (appId: string) => getAlternativeAppDetailsResponse(appId),
  ["landing-alternative-apps-details-v1"],
  {
    revalidate: landingAlternativeAppsRevalidateSeconds,
    tags: ["alternative-apps", "landing-alternative-apps"],
  },
);

function formatCurrencyUsd(value: number) {
  return new Intl.NumberFormat("en-US", {
    currency: "USD",
    maximumFractionDigits: 0,
    style: "currency",
  }).format(value);
}

function logoKeyForName(name: string): AppLogoKey {
  const normalized = name.toLowerCase();

  if (normalized.includes("slack")) {
    return "slack";
  }

  if (normalized.includes("notion")) {
    return "notion";
  }

  if (normalized.includes("salesforce")) {
    return "salesforce";
  }

  return "google";
}

function catalogItemToOption(item: AlternativeAppsCatalogItem) {
  return {
    id: item.id,
    logoHints: item.logoHints,
    logoKey: logoKeyForName(item.name),
    logoUrl: item.logoUrl,
    name: item.name,
  };
}

function recommendationInsight({
  alternative,
  currentAnnualSpendUsd,
  currentAppName,
}: {
  alternative: AlternativeAppDetailAlternative;
  currentAnnualSpendUsd: number;
  currentAppName: string;
}): AlternativeRecommendationInsightSegment[] {
  const annualSavings = currentAnnualSpendUsd - alternative.averageSwitchCostUsd;
  const hasComparablePricing = currentAnnualSpendUsd > 0 && alternative.averageSwitchCostUsd > 0;

  if (!hasComparablePricing) {
    return [
      {
        text: `${alternative.name} has public catalog signals you can compare against ${currentAppName} for pricing, fit, migration, integrations, and security.`,
      },
    ];
  }

  const isSaving = annualSavings >= 0;

  return [
    {
      text: `${alternative.name} is listed at an estimated `,
    },
    {
      text: `${formatCurrencyUsd(alternative.averageSwitchCostUsd)}/year`,
      tone: isSaving ? "positive" : "negative",
    },
    {
      text: ", which is ",
    },
    {
      text: formatCurrencyUsd(Math.abs(annualSavings)),
      tone: "strong",
    },
    {
      text: ` ${isSaving ? "less" : "more"} than ${currentAppName}'s public pricing baseline.`,
    },
  ];
}

function detailAlternativeToRecommendation({
  alternative,
  currentAnnualSpendUsd,
  currentAppName,
}: {
  alternative: AlternativeAppDetailAlternative;
  currentAnnualSpendUsd: number;
  currentAppName: string;
}): AlternativeRecommendation {
  return {
    averageSwitchCostTone:
      currentAnnualSpendUsd > 0 && alternative.averageSwitchCostUsd > currentAnnualSpendUsd ? "negative" : "positive",
    averageSwitchCostUsd: alternative.averageSwitchCostUsd,
    badgeLabel: alternative.badgeLabel,
    id: alternative.slug,
    insight: recommendationInsight({
      alternative,
      currentAnnualSpendUsd,
      currentAppName,
    }),
    logoHints: alternative.logoHints,
    logoKey: logoKeyForName(alternative.name),
    logoUrl: alternative.logoUrl,
    monthlySpendUsd: alternative.monthlySpendUsd,
    name: alternative.name,
    planLabel: alternative.planLabel,
    pricingModelLabel: alternative.pricingModelLabel,
    seatCount: alternative.seatCount,
  };
}

export async function getLandingAlternativeAppsResponse(appId?: string) {
  const catalog = await getCachedLandingCatalog();
  const options = catalog.items.map(catalogItemToOption);

  if (!options.length) {
    throw new LandingAlternativeAppsDataError("No alternative applications are available for the landing page.", 404);
  }

  const requestedAppId = appId?.trim();
  const selectedOption = requestedAppId
    ? options.find((option) => option.id === requestedAppId)
    : options[0];

  if (!selectedOption) {
    throw new LandingAlternativeAppsDataError("Unknown landing alternative application id.", 404);
  }

  const details = await getCachedLandingDetails(selectedOption.id);

  if (!details) {
    throw new LandingAlternativeAppsDataError("Alternative application comparison is unavailable.", 404);
  }

  const response = {
    alternatives: details.alternatives.slice(0, landingAlternativeRecommendationsTake).map((alternative) =>
      detailAlternativeToRecommendation({
        alternative,
        currentAnnualSpendUsd: details.currentAppMetrics.annualSpendUsd,
        currentAppName: details.app.name,
      }),
    ),
    alternativesCount: details.overview.totalCount,
    currentApp: {
      annualSpendUsd: details.currentAppMetrics.annualSpendUsd,
      id: details.app.slug,
      logoHints: details.app.logoHints,
      logoKey: logoKeyForName(details.app.name),
      logoUrl: details.app.logoUrl,
      name: details.app.name,
      pricingModelLabel: details.app.pricingModelLabel,
      rating: details.app.rating,
      seatCount: details.currentAppMetrics.seatCount,
      statusLabel: "Current",
      wastedSpendUsd: details.currentAppMetrics.wastedSpendUsd,
    },
    options,
    selectedAppId: selectedOption.id,
  } satisfies AlternativeAppsResponse;

  return alternativeAppsResponseSchema.parse(response);
}
