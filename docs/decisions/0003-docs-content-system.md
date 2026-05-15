# 0003 Use an app-owned docs content system

## Status

Accepted.

## Context

The web app already uses MDX for blog content. Clerk's public docs repo is a
useful reference for app-owned MDX docs: content files sit close to the docs app,
while shared tooling keeps parsing, validation, and rendering behavior
consistent.

The docs app needs production governance from the start: redirects, stable
slugs, search records, version metadata, and validation that catches broken
content before deployment.

## Decision

Keep docs content in `apps/docs/content/docs`. Keep docs loader, routes,
navigation, redirects, search, versioning, and docs-specific schema in
`apps/docs/src/lib/docs`.

Use app-owned MDX files instead of placing docs pages in a shared package. Share
only the reusable MDX tooling and schema primitives.

## Consequences

Docs authors can change content and docs app behavior together. The docs app can
have stricter governance than the blog without forcing the blog to adopt the
same publication model.

The tradeoff is that blog and docs schemas are intentionally separate. Shared
packages should not become a generic content CMS.
