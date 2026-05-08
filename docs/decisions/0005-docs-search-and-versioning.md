# 0005 Build docs search and versioning into the docs app

## Status

Accepted.

## Context

Docs need a stable content lifecycle before launch. Users must be able to find
pages, old links must keep working, and version metadata must not drift from
published content.

External search or hosted docs platforms can be added later, but the launch
system must work from the repo and pass CI.

## Decision

Generate docs search data from the docs content loader and expose it at
`/search.json`. Keep version metadata and redirect definitions in the docs app.
Validate those records through `pnpm check:content`.

Redirects live in `apps/docs/src/lib/docs/redirects.ts`. Search helpers live in
`apps/docs/src/lib/docs/search.ts`. Versioning helpers live in
`apps/docs/src/lib/docs/versioning.ts`.

## Consequences

Docs search, redirects, and version metadata are testable without external
services. A deployment cannot pass content governance if those records are
broken.

The tradeoff is that richer hosted search can wait until usage demands it. If a
hosted search provider is added, the repo-owned `/search.json` remains the
canonical indexing source unless a new decision record replaces this one.
