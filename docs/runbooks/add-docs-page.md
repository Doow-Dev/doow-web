# Add a docs page

Use this runbook when adding a page to `docs.doow.co`.

## Steps

1. Create `apps/docs/content/docs/<slug>.mdx`.
2. Add frontmatter with `title`, `description`, `slug`, `section`, `order`,
   `status`, and `updatedAt`.
3. Use one of the allowed `section` values: `start`, `guides`, `reference`, or
   `updates`.
4. Add the page to `apps/docs/src/lib/docs/navigation.ts` if it should appear in
   the docs sidebar or landing navigation.
5. Use approved MDX components from `apps/docs/src/components/docs/mdx-components.tsx`.
6. Run `pnpm --filter @doow/docs check:content`.
7. Run `pnpm --filter @doow/docs build` before deploy.

## Frontmatter template

```mdx
---
title: "Page title"
description: "Short description for metadata, search, and navigation."
slug: "page-slug"
section: "guides"
order: 10
status: "published"
updatedAt: "2026-05-08"
---
```

## Checks

The docs content check validates duplicate slugs, frontmatter, unsupported MDX
components, unsafe HTML, broken links, image references, redirects, search
records, and version metadata.
