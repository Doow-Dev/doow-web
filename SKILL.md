---
name: doow-monorepo
description: Use this skill when working in the Doow production monorepo. It covers app boundaries, package boundaries, MDX governance, deployment paths, root commands, landing-page rebuild rules, and the checks required before work can be marked complete.
---

# Doow monorepo

The repo is a production pnpm and Turborepo monorepo. It contains the web app,
the docs app, and shared packages that both apps can use.

## Read order

1. `AGENTS.md`
2. `docs/architecture/README.md`
3. `docs/architecture/app-boundaries.md`
4. `docs/architecture/package-boundaries.md`
5. `docs/architecture/mdx-content-governance.md`
6. `docs/architecture/deployment.md`
7. Relevant files in `docs/decisions/`

For landing-page rebuild work, also read `docs/rebuild/README.md`,
`docs/rebuild/roadmap.md`, and `docs/rebuild/acceptance-gates.md`.

## Workspace ownership

`apps/web` owns `www.doow.co`: landing page, subscriptions, auth entry routes,
legal pages, blog routes, blog MDX, web metadata, web analytics, and web-only
integrations.

`apps/docs` owns `docs.doow.co`: docs pages, docs UI, docs navigation, docs
redirects, docs search, docs versioning, and docs content governance.

`packages/mdx` owns generic MDX helpers. `packages/content-schemas` owns shared
schema primitives. `packages/design-tokens` owns shared token exports.
`packages/config` owns shared config exports.

## Boundary rules

- Apps do not import from each other.
- Shared packages do not import from `apps/*`.
- `@/*` aliases are app-local.
- App-specific schemas, navigation, routes, RSS, search, redirects, and
  publication models stay in the owning app.
- Extract code into `packages/*` only when multiple workspaces need it and the
  API is generic.

## Content rules

Blog content lives in `apps/web/content/blog`. Use
`docs/runbooks/add-blog-post.md` for blog changes.

Docs content lives in `apps/docs/content/docs`. Use these runbooks for docs
changes:

- `docs/runbooks/add-docs-page.md`
- `docs/runbooks/move-docs-page.md`
- `docs/runbooks/add-docs-redirect.md`

Published docs URL moves require redirects in
`apps/docs/src/lib/docs/redirects.ts`.

## Deployment rules

Web deploys from `apps/web` to `www.doow.co`. Docs deploys from `apps/docs` to
`docs.doow.co`. Use the runbooks in `docs/deployment/` before changing Vercel
settings or environment variables.

Run `pnpm check:deployment` after deployment config changes.

## Root command surface

- `pnpm dev`
- `pnpm dev:web`
- `pnpm dev:docs`
- `pnpm build`
- `pnpm build:web`
- `pnpm build:docs`
- `pnpm lint`
- `pnpm typecheck`
- `pnpm test`
- `pnpm check:content`
- `pnpm check:boundaries`
- `pnpm check:deployment`
- `pnpm verify`

Use `README.md` for the meaning of each command.

## Landing-page rebuild rules

Landing-page rebuild work still follows the original production workflow:

- Work in batches.
- Stop after each batch and section for review.
- Use Figma as the design source of truth.
- Build mobile-first.
- Prefer static rendering and minimal client JavaScript.
- Do not preserve legacy sections or assets unless the rebuild docs explicitly
  retain them.

## Completion gate

Run focused checks for the workspace you changed. For broad or cross-workspace
changes, run:

```bash
pnpm verify
```

Do not claim completion while relevant checks fail.
