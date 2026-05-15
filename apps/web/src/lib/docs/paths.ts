import { docsNavigationBySlug } from "./navigation";

export const DOCS_CONTENT_DIR = "content/docs";

export function normalizeDocsSlug(slug: string) {
  return slug.replace(/^\/+|\/+$/g, "");
}

export function docsPathForSlug(slug: string) {
  const normalized = normalizeDocsSlug(slug);

  return normalized === "index" ? "/docs" : `/docs/${normalized}`;
}

export function docsFilenameForSlug(slug: string) {
  return `${normalizeDocsSlug(slug)}.mdx`;
}

export function docsIndexFilenameForSlug(slug: string) {
  return `${normalizeDocsSlug(slug)}/index.mdx`;
}

export function docsFilenamesForSlug(slug: string) {
  return [docsFilenameForSlug(slug), docsIndexFilenameForSlug(slug)];
}

export function docsSlugFromSegments(segments: string[] = []) {
  return normalizeDocsSlug(segments.join("/"));
}

export function docsRouteSegmentsForSlug(slug: string) {
  return normalizeDocsSlug(slug).split("/").filter(Boolean);
}

export function isDocsRouteSlug(slug: string) {
  return docsNavigationBySlug.has(normalizeDocsSlug(slug));
}
