import {
  integrationCatalogResponseSchema,
  type IntegrationCatalogCategory,
  type IntegrationCatalogItem,
} from "@/lib/site/integration-catalog";

interface IntegrationCatalogTransformOptions {
  categoryId?: string;
  query?: string;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value && typeof value === "object" && !Array.isArray(value));
}

function dataRecords(raw: unknown) {
  if (!isRecord(raw) || !Array.isArray(raw.data)) {
    return [];
  }

  return raw.data.filter(isRecord);
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

function stringArrayField(record: Record<string, unknown>, keys: readonly string[]) {
  for (const key of keys) {
    const value = record[key];

    if (Array.isArray(value)) {
      return value.filter((item): item is string => typeof item === "string" && Boolean(item.trim()));
    }
  }

  return [];
}

function booleanHasValue<T>(value: T | null | undefined): value is T {
  return value !== null && typeof value !== "undefined";
}

function slugifyCategory(label: string) {
  const slug = label
    .trim()
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  return slug || "uncategorized";
}

function prettifyCategoryLabel(label: string) {
  return label
    .trim()
    .split(/[_\s-]+/)
    .filter(Boolean)
    .map((word) =>
      word.replace(/[a-z0-9]+/gi, (segment) => {
        if (/^[A-Z0-9]+$/.test(segment) && segment.length <= 4) {
          return segment;
        }

        return `${segment.charAt(0).toUpperCase()}${segment.slice(1).toLowerCase()}`;
      }),
    )
    .join(" ");
}

function categoryFromRaw(category: unknown) {
  if (typeof category === "string" && category.trim()) {
    const backendLabel = category.trim();

    return {
      count: 0,
      backendLabel,
      id: slugifyCategory(backendLabel),
      label: prettifyCategoryLabel(backendLabel),
    } satisfies IntegrationCatalogCategory;
  }

  if (!isRecord(category)) {
    return null;
  }

  const backendLabel = stringField(category, ["category", "label", "name", "value", "id"]);

  if (!backendLabel) {
    return null;
  }

  return {
    backendLabel,
    count: Math.max(0, Math.trunc(numberField(category, ["count", "total"]) ?? 0)),
    id: slugifyCategory(backendLabel),
    label: prettifyCategoryLabel(backendLabel),
  } satisfies IntegrationCatalogCategory;
}

export function transformIntegrationCatalogCategories(raw: unknown) {
  const rawCategories = isRecord(raw) && Array.isArray(raw.data) ? raw.data : [];
  const categories = rawCategories.map(categoryFromRaw).filter(booleanHasValue);
  const totalCount = categories.reduce((sum, category) => sum + category.count, 0);

  return [
    {
      count: totalCount,
      id: "all",
      label: "All Categories",
    },
    ...categories,
  ] satisfies readonly IntegrationCatalogCategory[];
}

export function getIntegrationCatalogCategoryLabel(
  categories: readonly IntegrationCatalogCategory[],
  categoryId: string | undefined,
) {
  if (!categoryId || categoryId === "all") {
    return undefined;
  }

  const category = categories.find((category) => category.id === categoryId);

  return category?.backendLabel ?? category?.label;
}

function transformIntegrationCatalogItem(item: Record<string, unknown>) {
  const id = stringField(item, ["id"]);
  const name = stringField(item, ["name"]);

  if (!id || !name) {
    return null;
  }

  const backendCategoryLabel = stringField(item, ["category"]) ?? "Uncategorized";
  const categoryLabel = prettifyCategoryLabel(backendCategoryLabel);
  const categoryId = slugifyCategory(backendCategoryLabel);
  const description =
    stringField(item, ["description"]) ?? `Connect ${name} with Doow to keep your systems in sync.`;
  const websiteUrl = stringField(item, ["website_url", "websiteUrl"]);
  const meteredVendorId = stringField(item, ["metered_vendor_id", "meteredVendorId"]);

  return {
    categoryId,
    categoryLabel,
    description,
    id,
    keywords: [categoryLabel, backendCategoryLabel, websiteUrl, meteredVendorId, ...stringArrayField(item, ["keywords"])].filter(
      booleanHasValue,
    ),
    logoUrl: stringField(item, ["logo_url", "logoUrl"]),
    meteredVendorId,
    name,
    websiteUrl,
  } satisfies IntegrationCatalogItem;
}

function responseTotal(raw: unknown) {
  return isRecord(raw) ? numberField(raw, ["total"]) : undefined;
}

export function transformIntegrationCatalogResponse({
  catalogRaw,
  categories,
  options = {},
}: {
  catalogRaw: unknown;
  categories: readonly IntegrationCatalogCategory[];
  options?: IntegrationCatalogTransformOptions;
}) {
  const selectedCategoryId =
    options.categoryId && categories.some((category) => category.id === options.categoryId) ? options.categoryId : "all";
  const items = dataRecords(catalogRaw).map(transformIntegrationCatalogItem).filter(booleanHasValue);

  return integrationCatalogResponseSchema.parse({
    categories,
    items,
    query: options.query?.trim() ?? "",
    selectedCategoryId,
    totalCount: Math.max(0, Math.trunc(responseTotal(catalogRaw) ?? items.length)),
  });
}
