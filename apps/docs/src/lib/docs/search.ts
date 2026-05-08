import type { DocsPage } from "./types";

export interface DocsSearchRecord {
  description: string;
  path: string;
  section: string;
  title: string;
}

export function buildDocsSearchRecords(pages: DocsPage[]): DocsSearchRecord[] {
  return pages.map((page) => ({
    description: page.description,
    path: page.canonicalPath,
    section: page.section,
    title: page.title,
  }));
}

export function validateDocsSearchRecords(records: DocsSearchRecord[]) {
  const errors: string[] = [];
  const paths = new Set<string>();

  for (const record of records) {
    if (!record.path.startsWith("/")) {
      errors.push(`search - "${record.title}" path must be site-relative`);
    }

    if (paths.has(record.path)) {
      errors.push(`search - duplicate record path "${record.path}"`);
    }

    paths.add(record.path);

    if (!record.title.trim()) {
      errors.push(`search - "${record.path}" must include a title`);
    }

    if (!record.description.trim()) {
      errors.push(`search - "${record.path}" must include a description`);
    }
  }

  return errors;
}
