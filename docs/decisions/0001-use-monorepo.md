# 0001 Use a monorepo

## Status

Accepted.

## Context

Doow now has two production web surfaces: the marketing and blog app, and the
documentation app. The docs live on a different domain, but they share
repository concerns with the web app: MDX tooling, schema primitives, release
checks, deployment conventions, and agent operating rules.

Keeping those surfaces in separate repos would split shared contracts across
multiple places before the product has enough organizational complexity to
justify that cost.

## Decision

Use one monorepo with app workspaces under `apps/*` and shared package
workspaces under `packages/*`.

- `apps/web` owns `www.doow.co`, the landing page, subscriptions, auth routes,
  legal routes, and blog.
- `apps/docs` owns `docs.doow.co`, docs content, docs navigation, docs search,
  docs redirects, and docs content governance.
- `packages/*` owns reusable code that is genuinely shared by apps.

## Consequences

The monorepo lets one CI pipeline validate boundaries, shared packages, content,
and deployment configuration before either app ships. It also makes cross-app
refactors safer because package changes and app changes can land together.

The tradeoff is that ownership rules must be explicit. App-only code stays in
the app that owns it. Shared packages must stay generic and cannot import app
code.
