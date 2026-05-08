import {
  alternativeAppDetailResponseSchema,
  type AlternativeAppDetailAlternative,
  type AlternativeAppDetailApp,
  type AlternativeAppDetailComparisonSection,
  type AlternativeAppDetailCurrentMetrics,
  type AlternativeAppDetailResponse,
  type AlternativeAppDetailTone,
  type AlternativeAppDetailSubscriptionTier,
} from "@/lib/site/alternative-app-details";
import {
  alternativeAppsCatalogCategoryDisplayLimit,
  alternativeAppsCatalogDefaultTake,
  alternativeAppsCatalogResponseSchema,
  type AlternativeAppsCatalogCategory,
  type AlternativeAppsCatalogItem,
  type AlternativeAppsCatalogLogoPreview,
} from "@/lib/site/alternative-apps-catalog";

interface CatalogTransformOptions {
  categoryId?: string;
  cursor?: string | null;
  query?: string;
  take?: number;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value && typeof value === "object" && !Array.isArray(value));
}

function recordsFromUnknown(value: unknown): Record<string, unknown>[] {
  if (Array.isArray(value)) {
    return value.filter(isRecord);
  }

  if (isRecord(value)) {
    return Object.values(value).flatMap(recordsFromUnknown);
  }

  return [];
}

function dataRecords(raw: unknown) {
  if (!isRecord(raw)) {
    return [];
  }

  return recordsFromUnknown(raw.data);
}

function stringField(record: Record<string, unknown>, keys: readonly string[]) {
  for (const key of keys) {
    const value = record[key];

    if (typeof value === "string" && value.trim()) {
      return value.trim();
    }
  }

  return undefined;
}

function nullableStringField(record: Record<string, unknown>, keys: readonly string[]) {
  for (const key of keys) {
    const value = record[key];

    if (value === null) {
      return null;
    }

    if (typeof value === "string" && value.trim()) {
      return value.trim();
    }
  }

  return undefined;
}

function numberField(record: Record<string, unknown>, keys: readonly string[]) {
  for (const key of keys) {
    const value = record[key];

    if (typeof value === "number" && Number.isFinite(value)) {
      return value;
    }

    if (typeof value === "string" && value.trim() && Number.isFinite(Number(value))) {
      return Number(value);
    }
  }

  return undefined;
}

function booleanHasValue<T>(value: T | null | undefined): value is T {
  return value !== null && typeof value !== "undefined";
}

function stringArrayField(record: Record<string, unknown>, keys: readonly string[]) {
  for (const key of keys) {
    const value = record[key];

    if (Array.isArray(value)) {
      const values = value.filter((item): item is string => typeof item === "string" && Boolean(item.trim()));

      if (values.length) {
        return values.map((item) => item.trim());
      }
    }
  }

  return [];
}

function recordArrayField(record: Record<string, unknown>, keys: readonly string[]) {
  for (const key of keys) {
    const value = record[key];

    if (Array.isArray(value)) {
      return value.filter(isRecord);
    }
  }

  return [];
}

function recordField(record: Record<string, unknown>, keys: readonly string[]) {
  for (const key of keys) {
    const value = record[key];

    if (isRecord(value)) {
      return value;
    }
  }

  return undefined;
}

function getResponseTotal(raw: unknown) {
  return isRecord(raw) ? numberField(raw, ["total"]) : undefined;
}

function getResponseTake(raw: unknown) {
  return isRecord(raw) ? numberField(raw, ["take"]) : undefined;
}

function getResponseNextCursor(raw: unknown) {
  if (!isRecord(raw)) {
    return null;
  }

  return nullableStringField(raw, ["nextCursor", "next_cursor"]) ?? null;
}

function logoHintsForName(name: string, ...extraHints: readonly (string | undefined)[]) {
  return [name, ...extraHints].filter((hint): hint is string => Boolean(hint?.trim())).map((hint) => hint.trim());
}

function formatCurrencyUsd(value: number) {
  return new Intl.NumberFormat("en-US", {
    currency: "USD",
    maximumFractionDigits: 0,
    style: "currency",
  }).format(value);
}

function formatCurrencyOrUnavailable(value: number | undefined, { zeroIsUnavailable = true } = {}) {
  if (!Number.isFinite(value) || typeof value === "undefined" || (zeroIsUnavailable && value === 0)) {
    return "Not available";
  }

  return formatCurrencyUsd(value);
}

function formatPercent(value: number | undefined) {
  if (!Number.isFinite(value) || typeof value === "undefined") {
    return "Not available";
  }

  return `${Math.round(value)}%`;
}

function formatScore(value: number | undefined) {
  if (!Number.isFinite(value) || typeof value === "undefined") {
    return "Not available";
  }

  return `${Math.round(value)}/100`;
}

function annualPeriodValues(value: number | undefined) {
  if (!Number.isFinite(value) || typeof value === "undefined" || value === 0) {
    return undefined;
  }

  return {
    annual: formatCurrencyUsd(value),
    monthly: formatCurrencyUsd(value / 12),
    quarterly: formatCurrencyUsd(value / 4),
  };
}

function prettifyToken(value: string | undefined) {
  if (!value) {
    return undefined;
  }

  return value
    .toLowerCase()
    .split(/[_\s-]+/)
    .filter(Boolean)
    .map((word) => `${word.charAt(0).toUpperCase()}${word.slice(1)}`)
    .join(" ");
}

function pricingModelLabel(licenseType: string | undefined, subscriptionType: string | undefined) {
  const license = prettifyToken(licenseType);
  const subscription = prettifyToken(subscriptionType);

  if (license?.toLowerCase() === "seat") {
    return subscription ? `Seat-based ${subscription}` : "Seat-based";
  }

  return [license, subscription].filter(Boolean).join(" ") || "Public pricing";
}

function riskTone(value: string | undefined): AlternativeAppDetailTone {
  const normalized = value?.toLowerCase() ?? "";

  if (normalized.includes("high") || normalized.includes("risky")) {
    return "negative";
  }

  if (normalized.includes("medium") || normalized.includes("moderate")) {
    return "warning";
  }

  if (normalized.includes("low")) {
    return "positive";
  }

  return "neutral";
}

function percentTone(value: number | undefined): AlternativeAppDetailTone {
  if (!Number.isFinite(value) || typeof value === "undefined") {
    return "neutral";
  }

  if (value >= 80) {
    return "positive";
  }

  if (value >= 60) {
    return "warning";
  }

  return "negative";
}

function savingsTone(value: number | undefined): AlternativeAppDetailTone {
  if (!Number.isFinite(value) || typeof value === "undefined" || value === 0) {
    return "neutral";
  }

  return value > 0 ? "positive" : "negative";
}

function signedCurrency(value: number | undefined) {
  if (!Number.isFinite(value) || typeof value === "undefined" || value === 0) {
    return "Not available";
  }

  return `${value > 0 ? "+" : "-"}${formatCurrencyUsd(Math.abs(value))}`;
}

function categoryFromCategoryRecord(category: Record<string, unknown>) {
  const label =
    stringField(category, ["label", "category", "name", "value", "id"]) ??
    (Object.hasOwn(category, "category") ? "Uncategorized" : undefined);

  if (!label) {
    return null;
  }

  return {
    count: Math.max(0, Math.trunc(numberField(category, ["count", "appCount", "total"]) ?? 0)),
    id: label,
    label,
  } satisfies AlternativeAppsCatalogCategory;
}

export function transformAlternativeAppsCategories(raw: unknown, selectedCategoryId = "all") {
  const categoryValues = isRecord(raw) ? raw.data : undefined;
  const allCategories = Array.isArray(categoryValues)
    ? categoryValues
        .map((category) => {
          if (typeof category === "string" && category.trim()) {
            return {
              count: 0,
              id: category.trim(),
              label: category.trim(),
            } satisfies AlternativeAppsCatalogCategory;
          }

          return isRecord(category) ? categoryFromCategoryRecord(category) : null;
        })
        .filter(booleanHasValue)
    : [];
  const summedCount = allCategories.reduce((sum, category) => sum + category.count, 0);
  const selectedCategory =
    selectedCategoryId === "all" ? undefined : allCategories.find((category) => category.id === selectedCategoryId);
  const categories = [...allCategories]
    .sort((left, right) => right.count - left.count || left.label.localeCompare(right.label))
    .slice(0, alternativeAppsCatalogCategoryDisplayLimit);
  const visibleCategories =
    selectedCategory && !categories.some((category) => category.id === selectedCategory.id)
      ? [...categories, selectedCategory]
      : categories;

  return [
    {
      count: summedCount,
      id: "all",
      label: "All Categories",
    },
    ...visibleCategories,
  ] satisfies readonly AlternativeAppsCatalogCategory[];
}

function transformCatalogAlternativePreview(alternative: Record<string, unknown>, index: number) {
  const name = stringField(alternative, ["alt_name", "altName", "name"]) ?? `Alternative ${index + 1}`;
  const id = stringField(alternative, ["alt_app_id", "altAppId", "app_id", "appId", "id"]) ?? name;
  const logoUrl = stringField(alternative, ["alt_logo_url", "altLogoUrl", "logo_url", "logoUrl"]);

  return {
    id,
    logoHints: logoHintsForName(name),
    logoUrl,
    name,
  } satisfies AlternativeAppsCatalogLogoPreview;
}

function transformCatalogItem(app: Record<string, unknown>) {
  const id = stringField(app, ["id", "source_app_id", "sourceAppId"]);
  const name = stringField(app, ["name"]);

  if (!id || !name) {
    return null;
  }

  const categoryLabel = stringField(app, ["category"]) ?? "Uncategorized";
  const description = stringField(app, ["description"]) ?? `Compare public alternatives for ${name}.`;
  const alternatives = recordArrayField(app, ["alternatives"]);
  const alternativePreviewLogos = alternatives.slice(0, 4).map(transformCatalogAlternativePreview);
  const alternativeNames = alternatives
    .map((alternative) => stringField(alternative, ["alt_name", "altName", "name"]))
    .filter(booleanHasValue);

  return {
    alternativeCount: alternatives.length,
    alternativeNames,
    alternativePreviewLogoHints: alternativePreviewLogos.map((alternative) => alternative.logoHints),
    alternativePreviewLogos,
    categoryId: categoryLabel,
    categoryLabel,
    description,
    href: `/alternative-apps/${id}`,
    id,
    keywords: [description, ...alternativeNames].filter(booleanHasValue),
    logoHints: logoHintsForName(name),
    logoUrl: stringField(app, ["logo_url", "logoUrl"]),
    name,
    slug: id,
  } satisfies AlternativeAppsCatalogItem;
}

function deriveCategoriesFromItems(items: readonly AlternativeAppsCatalogItem[]) {
  const counts = new Map<string, number>();

  items.forEach((item) => {
    counts.set(item.categoryLabel, (counts.get(item.categoryLabel) ?? 0) + 1);
  });

  const categories = Array.from(counts.entries()).map(([label, count]) => ({
    count,
    id: label,
    label,
  }));

  return [
    {
      count: items.length,
      id: "all",
      label: "All Categories",
    },
    ...categories,
  ] satisfies readonly AlternativeAppsCatalogCategory[];
}

export function transformAlternativeAppsCatalogResponse({
  categoriesRaw,
  catalogRaw,
  options = {},
}: {
  categoriesRaw?: unknown;
  catalogRaw: unknown;
  options?: CatalogTransformOptions;
}) {
  const items = dataRecords(catalogRaw).map(transformCatalogItem).filter(booleanHasValue);
  const categories = categoriesRaw
    ? transformAlternativeAppsCategories(categoriesRaw, options.categoryId)
    : deriveCategoriesFromItems(items);
  const nextCursor = getResponseNextCursor(catalogRaw);
  const take = Math.trunc(getResponseTake(catalogRaw) ?? options.take ?? alternativeAppsCatalogDefaultTake);

  return alternativeAppsCatalogResponseSchema.parse({
    categories,
    hasMore: Boolean(nextCursor),
    items,
    nextCursor,
    query: options.query?.trim() ?? "",
    selectedCategoryId: options.categoryId?.trim() || "all",
    take,
    totalCount: Math.max(0, Math.trunc(getResponseTotal(catalogRaw) ?? items.length)),
  });
}

function pricingTiersFromRaw(rawTiers: readonly Record<string, unknown>[]) {
  return rawTiers
    .map((tier) => {
      const label = stringField(tier, ["tier_name", "tierName", "label", "name"]) ?? "Public plan";
      const monthlyPriceUsd = Math.max(0, numberField(tier, ["monthly_per_seat", "monthlyPerSeat", "monthlyPriceUsd"]) ?? 0);
      const annualCostUsd = Math.max(0, numberField(tier, ["annual_total", "annualTotal", "annualCostUsd"]) ?? monthlyPriceUsd * 12);

      return {
        annualCostUsd,
        label,
        monthlyPriceUsd,
        seatCount: 1,
      } satisfies AlternativeAppDetailSubscriptionTier;
    })
    .filter((tier) => tier.label);
}

function primaryTier(tiers: readonly AlternativeAppDetailSubscriptionTier[]) {
  return (
    tiers[0] ?? {
      annualCostUsd: 0,
      label: "Public pricing",
      monthlyPriceUsd: 0,
      seatCount: 1,
    }
  );
}

function planLabelFromTier(tier: AlternativeAppDetailSubscriptionTier) {
  return tier.monthlyPriceUsd > 0 ? `${tier.label} (${formatCurrencyUsd(tier.monthlyPriceUsd)}/month)` : tier.label;
}

function buildAlternativeComparisonSections({
  alternative,
  currentApp,
  currentMetrics,
}: {
  alternative: AlternativeAppDetailAlternative;
  currentApp: Record<string, unknown>;
  currentMetrics: AlternativeAppDetailCurrentMetrics;
}) {
  const financialImpact = recordField(alternativeRawBySlug.get(alternative.slug) ?? {}, ["financialImpact", "financial_impact"]);
  const currentRating = numberField(currentApp, ["rating"]);
  const currentReviewCount = numberField(currentApp, ["reviewCount", "review_count"]);
  const currentTeamFitScore = numberField(currentApp, ["teamFitScore", "team_fit_score"]);
  const currentFeatureOverlap = numberField(currentApp, ["featureOverlapPct", "feature_overlap_pct"]) ?? 100;
  const currentIntegrationCoverage = numberField(currentApp, ["integrationCoveragePct", "integration_coverage_pct"]);
  const alternativeRaw = alternativeRawBySlug.get(alternative.slug) ?? {};
  const migrationWeeks = numberField(financialImpact ?? alternativeRaw, ["migrationWeeks", "migration_weeks"]);
  const migrationCostUsd = numberField(financialImpact ?? alternativeRaw, ["migrationCostUsd", "migration_cost_usd"]);
  const teamFitScore = numberField(financialImpact ?? alternativeRaw, ["teamFitScore", "team_fit_score"]);
  const integrationCoveragePct = numberField(alternativeRaw, ["integrationCoveragePct", "integration_coverage_pct"]);
  const featureOverlapPct = numberField(alternativeRaw, ["featureOverlapPct", "feature_overlap_pct"]);
  const adoptionRisk = stringField(alternativeRaw, ["adoptionRisk", "adoption_risk"]) ?? "Not available";
  const featureRisks = stringArrayField(alternativeRaw, ["featureRiskBullets", "feature_risk_bullets"]);
  const certifications = stringArrayField(alternativeRaw, ["certifications"]);
  const chooseIf = stringField(financialImpact ?? alternativeRaw, ["chooseIf", "choose_if"]) ?? "Public catalog signals show a strong fit.";
  const avoidIf = stringField(financialImpact ?? alternativeRaw, ["avoidIf", "avoid_if"]) ?? "Your workflow depends on unavailable features.";
  const alternativeAnnualCost = alternative.averageSwitchCostUsd;
  const threeYearNetSaving = alternative.threeYearNetSavingUsd;

  return [
    {
      id: "financial-impact",
      title: "Financial Impact",
      rows: [
        {
          id: "annual-cost",
          label: "Annual cost",
          current: {
            value: formatCurrencyOrUnavailable(currentMetrics.annualSpendUsd),
            label: primaryTier(currentMetrics.subscriptionTiers).label,
            description: "Public catalog pricing. Organization spend is not included.",
            periodValues: annualPeriodValues(currentMetrics.annualSpendUsd),
          },
          alternative: {
            value: formatCurrencyOrUnavailable(alternativeAnnualCost),
            label: alternative.planLabel,
            description: "Public catalog pricing estimate.",
            periodValues: annualPeriodValues(alternativeAnnualCost),
            tone:
              alternativeAnnualCost > 0 && currentMetrics.annualSpendUsd > 0 && alternativeAnnualCost < currentMetrics.annualSpendUsd
                ? "positive"
                : "neutral",
          },
        },
        {
          id: "year-net-saving",
          label: "3-Year Net Saving",
          current: {
            value: "$0",
            description: "No migration in the current app baseline.",
          },
          alternative: {
            value: signedCurrency(threeYearNetSaving),
            description: migrationCostUsd ? `After ${formatCurrencyUsd(migrationCostUsd)} estimated migration cost.` : undefined,
            tone: savingsTone(threeYearNetSaving),
          },
        },
      ],
    },
    {
      id: "team-fit-adoption",
      title: "Team Fit & Adoption",
      rows: [
        {
          id: "team-fit-score",
          label: "Team Fit Score",
          current: {
            value: formatScore(currentTeamFitScore),
            description: stringField(currentApp, ["teamFitNarrative", "team_fit_narrative"]),
            tone: percentTone(currentTeamFitScore),
          },
          alternative: {
            value: formatScore(teamFitScore),
            description: stringField(alternativeRaw, ["teamFitNarrative", "team_fit_narrative", "teamFitHeadline", "team_fit_headline"]),
            tone: percentTone(teamFitScore),
          },
        },
        {
          id: "adoption-risk",
          label: "Adoption Risk",
          current: {
            value: stringField(currentApp, ["adoptionRisk", "adoption_risk"]) ?? "Not available",
            description: "Public adoption signal for the current app.",
            tone: riskTone(stringField(currentApp, ["adoptionRisk", "adoption_risk"])),
          },
          alternative: {
            value: adoptionRisk,
            description: stringField(alternativeRaw, ["migrationNarrative", "migration_narrative"]),
            tone: riskTone(adoptionRisk),
          },
        },
        {
          id: "user-satisfaction",
          label: "User satisfaction",
          current: {
            value: currentRating ? `${currentRating.toFixed(1)}/5.0` : "Not available",
            description: currentReviewCount ? `${Math.round(currentReviewCount)} reviews` : undefined,
          },
          alternative: {
            value: typeof alternative.rating === "number" ? `${alternative.rating.toFixed(1)}/5.0` : "Not available",
            description: numberField(alternativeRaw, ["reviewCount", "review_count"])
              ? `${Math.round(numberField(alternativeRaw, ["reviewCount", "review_count"]) ?? 0)} reviews`
              : undefined,
          },
        },
      ],
    },
    {
      id: "migration-implementation",
      title: "Migration & Implementation",
      rows: [
        {
          id: "timeline-disruption",
          label: "Timeline & Disruption",
          current: {
            value: "No migration needed",
          },
          alternative: {
            value: migrationWeeks ? `${migrationWeeks} ${migrationWeeks === 1 ? "week" : "weeks"}` : "Not available",
            label: prettifyToken(stringField(alternativeRaw, ["migrationComplexity", "migration_complexity"])),
            description: stringField(alternativeRaw, ["migrationNarrative", "migration_narrative"]),
            tone: riskTone(stringField(alternativeRaw, ["migrationComplexity", "migration_complexity"])),
          },
        },
        {
          id: "setup-training",
          label: "Setup & training",
          current: {
            value: "--",
          },
          alternative: {
            value: formatCurrencyOrUnavailable(migrationCostUsd),
            description: "Estimated one-time migration and setup effort.",
          },
        },
      ],
    },
    {
      id: "integrations-technical-fit",
      title: "Integrations & Technical Fit",
      rows: [
        {
          id: "integration-coverage",
          label: "Integration Coverage",
          current: {
            value: formatPercent(currentIntegrationCoverage),
            description: stringField(currentApp, ["integrationCoverageCopy", "integration_coverage_copy"]),
            tone: percentTone(currentIntegrationCoverage),
          },
          alternative: {
            value: formatPercent(integrationCoveragePct),
            description: stringField(alternativeRaw, ["integrationCoverageCopy", "integration_coverage_copy"]),
            tone: percentTone(integrationCoveragePct),
          },
        },
        {
          id: "feature-match",
          label: "Feature Match (%)",
          current: {
            value: formatPercent(currentFeatureOverlap),
            tone: percentTone(currentFeatureOverlap),
          },
          alternative: {
            value: formatPercent(featureOverlapPct),
            details: featureRisks,
            tone: percentTone(featureOverlapPct),
          },
        },
      ],
    },
    {
      id: "security-compliance",
      title: "Security & Compliance",
      rows: [
        {
          id: "certifications",
          label: "Certifications",
          current: {
            value: stringArrayField(currentApp, ["certifications"]).join(", ") || "Not available",
            pills: stringArrayField(currentApp, ["certifications"]),
            tone: stringArrayField(currentApp, ["certifications"]).length ? "positive" : "neutral",
          },
          alternative: {
            value: certifications.join(", ") || "Not available",
            pills: certifications,
            tone: certifications.length ? "positive" : "neutral",
          },
        },
      ],
    },
    {
      id: "when-this-makes-sense",
      title: "When This Makes Sense",
      rows: [
        {
          id: "choose-this-if",
          label: "Choose This If",
          current: {
            value: stringField(currentApp, ["chooseIf", "choose_if"]) ?? "You already standardize on this app.",
          },
          alternative: {
            value: chooseIf,
          },
        },
        {
          id: "avoid-this-if",
          label: "Avoid This If",
          current: {
            value: stringField(currentApp, ["avoidIf", "avoid_if"]) ?? "Public pricing or fit signals no longer match your needs.",
            tone: "warning",
          },
          alternative: {
            value: avoidIf,
            tone: "warning",
          },
        },
      ],
    },
  ] satisfies readonly AlternativeAppDetailComparisonSection[];
}

const alternativeRawBySlug = new Map<string, Record<string, unknown>>();

function transformDetailAlternative(alternative: Record<string, unknown>) {
  const name = stringField(alternative, ["altName", "alt_name", "name"]);
  const slug = stringField(alternative, ["alt_app_id", "altAppId", "app_id", "appId", "id"]);

  if (!name || !slug) {
    return null;
  }

  alternativeRawBySlug.set(slug, alternative);

  const financialImpact = recordField(alternative, ["financialImpact", "financial_impact"]);
  const rawTiers = recordArrayField(financialImpact ?? alternative, ["pricingTiers", "pricing_tiers"]);
  const tiers = pricingTiersFromRaw(rawTiers);
  const tier = primaryTier(tiers);
  const monthlyPriceUsd = Math.max(0, numberField(alternative, ["estMonthlyCost", "est_monthly_cost"]) ?? tier.monthlyPriceUsd);
  const annualCostUsd = Math.max(
    0,
    numberField(alternative, ["estAnnualCost", "est_annual_cost"]) ??
      numberField(recordField(alternative, ["switchCost", "switch_cost"]) ?? {}, ["amount"]) ??
      tier.annualCostUsd ??
      monthlyPriceUsd * 12,
  );

  return {
    averageSwitchCostUsd: annualCostUsd,
    badgeLabel: stringField(recordField(alternative, ["insight"]) ?? {}, ["badgeLabel", "badge_label"]),
    logoHints: logoHintsForName(name),
    logoUrl: stringField(alternative, ["altLogoUrl", "alt_logo_url", "logoUrl", "logo_url"]),
    monthlyPriceUsd,
    monthlySpendUsd: monthlyPriceUsd,
    name,
    planLabel: planLabelFromTier(tier),
    pricingModelLabel: monthlyPriceUsd > 0 ? "Seat-based" : "Public pricing",
    rating: numberField(alternative, ["rating"]),
    seatCount: 1,
    slug,
    threeYearNetSavingUsd: numberField(financialImpact ?? alternative, ["threeYearNetSaving", "three_year_net_saving"]) ?? 0,
  } satisfies AlternativeAppDetailAlternative;
}

function transformCurrentApp(currentApp: Record<string, unknown>, sourceAppId: string) {
  const name = stringField(currentApp, ["name"]) ?? "Current app";
  const rawTiers = recordArrayField(currentApp, ["pricingTiers", "pricing_tiers"]);
  const subscriptionTiers = pricingTiersFromRaw(rawTiers);
  const tier = primaryTier(subscriptionTiers);
  const monthlyPriceUsd = Math.max(0, numberField(currentApp, ["monthlyCost", "monthly_cost"]) ?? tier.monthlyPriceUsd);
  const annualSpendUsd = Math.max(0, numberField(currentApp, ["annualCost", "annual_cost"]) ?? tier.annualCostUsd ?? monthlyPriceUsd * 12);

  return {
    app: {
      categoryLabel: stringField(currentApp, ["category", "categoryLabel"]) ?? "Alternative Applications",
      logoHints: logoHintsForName(name),
      logoUrl: stringField(currentApp, ["logoUrl", "logo_url"]),
      name,
      planLabel: tier.label,
      priceLabel: monthlyPriceUsd > 0 ? `${formatCurrencyUsd(monthlyPriceUsd)}/month` : "Public pricing",
      pricingModelLabel: pricingModelLabel(
        stringField(currentApp, ["licenseType", "license_type"]),
        stringField(currentApp, ["subscriptionType", "subscription_type"]),
      ),
      rating: numberField(currentApp, ["rating"]) ?? 0,
      slug: sourceAppId,
    } satisfies AlternativeAppDetailApp,
    metrics: {
      annualSpendUsd,
      monthlyPriceUsd,
      seatCount: 1,
      seatsAssignedLabel: annualSpendUsd > 0 ? `${formatCurrencyUsd(annualSpendUsd)}/yr` : "--",
      subscriptionTiers,
      wastedSpendUsd: 0,
    } satisfies AlternativeAppDetailCurrentMetrics,
  };
}

export function transformAlternativeAppDetailResponse(raw: unknown, sourceAppId: string) {
  const hero = dataRecords(raw)[0];

  if (!hero) {
    return null;
  }

  alternativeRawBySlug.clear();

  const currentAppRaw = recordField(hero, ["currentApp", "current_app"]) ?? {};
  const { app, metrics } = transformCurrentApp(currentAppRaw, sourceAppId);
  const alternatives = recordArrayField(hero, ["alternatives"]).map(transformDetailAlternative).filter(booleanHasValue);

  if (!alternatives.length) {
    return null;
  }

  const alternativesWithComparison = alternatives.map((alternative) => ({
    ...alternative,
    comparisonSections: buildAlternativeComparisonSections({
      alternative,
      currentApp: currentAppRaw,
      currentMetrics: metrics,
    }),
  }));
  const topRecommendation = recordField(hero, ["top_recommendation", "topRecommendation"]);
  const selectedAlternativeSlug =
    stringField(topRecommendation ?? {}, ["alt_app_id", "altAppId"]) ??
    alternativesWithComparison.find((alternative) => alternative.badgeLabel)?.slug ??
    alternativesWithComparison[0].slug;
  const selectedAlternative =
    alternativesWithComparison.find((alternative) => alternative.slug === selectedAlternativeSlug) ?? alternativesWithComparison[0];
  const totalAlternatives =
    numberField(recordField(hero, ["meta"]) ?? {}, ["totalAlternatives", "total_alternatives"]) ?? alternativesWithComparison.length;
  const response = {
    alternatives: alternativesWithComparison,
    app,
    catalogMode: "public",
    comparisonSections: selectedAlternative.comparisonSections,
    currentAppMetrics: metrics,
    overview: {
      description:
        stringField(hero, ["summary"]) ??
        `Compare public pricing, fit, migration, integrations, and security signals across ${alternativesWithComparison.length} alternatives.`,
      heading: `Should you replace ${app.name}?`,
      shownCount: alternativesWithComparison.length,
      totalCount: Math.max(1, Math.trunc(totalAlternatives)),
    },
    selectedAlternativeSlug: selectedAlternative.slug,
  } satisfies AlternativeAppDetailResponse;

  return alternativeAppDetailResponseSchema.parse(response);
}
