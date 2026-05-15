import { isExternalUrl } from "@doow/content-schemas";

import { getAllDocsPages } from "./content";
import { docsNavigation } from "./navigation";
import { docsRedirects } from "./redirects";
import { buildDocsSearchRecords, validateDocsSearchRecords } from "./search";
import { docsVersioningDecision } from "./versioning";
import type { DocsPage } from "./types";

function withoutHash(path: string) {
  return path.split("#")[0] || path;
}

function isAllowedInternalLink(url: string, pagePaths: ReadonlySet<string>, redirectPaths: ReadonlySet<string>) {
  if (url.startsWith("#") || isExternalUrl(url)) {
    return true;
  }

  const path = withoutHash(url);

  return pagePaths.has(path) || redirectPaths.has(path);
}

function validateDuplicateSlugs(pages: DocsPage[]) {
  const errors: string[] = [];
  const seen = new Map<string, string>();

  for (const page of pages) {
    const filename = `${page.slug}.mdx`;
    const existing = seen.get(page.slug);

    if (existing) {
      errors.push(`slug - duplicate slug "${page.slug}" in ${existing} and ${filename}`);
    }

    seen.set(page.slug, filename);
  }

  return errors;
}

function validateDuplicateHeadingIds(pages: DocsPage[]) {
  const errors: string[] = [];

  for (const page of pages) {
    const seen = new Set<string>();

    for (const item of page.toc) {
      if (seen.has(item.id)) {
        errors.push(`${page.slug}: heading - duplicate heading id "${item.id}"`);
      }

      seen.add(item.id);
    }
  }

  return errors;
}

function validateInternalLinks(pages: DocsPage[]) {
  const pagePaths = new Set(["/", ...pages.map((page) => page.canonicalPath)]);
  const redirectPaths = new Set(docsRedirects.map((redirect) => redirect.from));
  const errors: string[] = [];

  for (const page of pages) {
    for (const link of page.links) {
      if (!isAllowedInternalLink(link, pagePaths, redirectPaths)) {
        errors.push(`${page.slug}: link - unresolved internal link "${link}"`);
      }
    }
  }

  return errors;
}

function validateRedirects(pages: DocsPage[]) {
  const pagePaths = new Set(["/", ...pages.map((page) => page.canonicalPath)]);
  const fromPaths = new Set<string>();
  const errors: string[] = [];

  for (const redirect of docsRedirects) {
    if (!redirect.from.startsWith("/") || !redirect.to.startsWith("/")) {
      errors.push(`redirect - "${redirect.from}" -> "${redirect.to}" must use site-relative paths`);
    }

    if (redirect.from === redirect.to) {
      errors.push(`redirect - "${redirect.from}" cannot redirect to itself`);
    }

    if (fromPaths.has(redirect.from)) {
      errors.push(`redirect - duplicate redirect source "${redirect.from}"`);
    }

    fromPaths.add(redirect.from);

    if (pagePaths.has(redirect.from)) {
      errors.push(`redirect - source "${redirect.from}" conflicts with a published docs page`);
    }

    if (!pagePaths.has(redirect.to) && !fromPaths.has(redirect.to)) {
      errors.push(`redirect - destination "${redirect.to}" does not match a published docs page`);
    }

    if (!redirect.reason.trim()) {
      errors.push(`redirect - "${redirect.from}" must include a reason`);
    }
  }

  return errors;
}

function validateNavigationCoverage(pages: DocsPage[]) {
  const slugs = new Set(pages.map((page) => page.slug));
  const errors: string[] = [];

  for (const item of docsNavigation) {
    if (!slugs.has(item.slug)) {
      errors.push(`navigation - missing page for slug "${item.slug}"`);
    }
  }

  return errors;
}

function validateVersioningDecision() {
  const errors: string[] = [];

  if (docsVersioningDecision.current !== "unversioned") {
    errors.push("versioning - launch decision must remain unversioned until a versioning trigger is met");
  }

  if (!docsVersioningDecision.futureTrigger.trim()) {
    errors.push("versioning - future versioning trigger must be documented");
  }

  return errors;
}

export async function runDocsContentGovernance() {
  const pages = await getAllDocsPages({ includeDrafts: true });
  const publishedPages = pages.filter((page) => page.status === "published");
  const errors = [
    ...validateDuplicateSlugs(pages),
    ...validateDuplicateHeadingIds(pages),
    ...validateInternalLinks(publishedPages),
    ...validateRedirects(publishedPages),
    ...validateNavigationCoverage(publishedPages),
    ...validateDocsSearchRecords(buildDocsSearchRecords(publishedPages)),
    ...validateVersioningDecision(),
  ];

  if (errors.length > 0) {
    throw new Error(errors.map((error) => `[docs] ${error}`).join("\n"));
  }

  return {
    pages: publishedPages,
    searchRecords: buildDocsSearchRecords(publishedPages),
  };
}
