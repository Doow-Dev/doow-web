import { docsNavigationBySlug } from "./navigation";

export const DOCS_CONTENT_DIR = "content/docs";

export function docsPathForSlug(slug: string) {
  return slug === "index" ? "/" : `/${slug}`;
}

export function docsFilenameForSlug(slug: string) {
  return `${slug}.mdx`;
}

export function isDocsRouteSlug(slug: string) {
  return docsNavigationBySlug.has(slug);
}
