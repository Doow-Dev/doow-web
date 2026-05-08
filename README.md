# Doow monorepo

This repository contains the production Doow web surfaces and the shared
packages they depend on.

## Start here

Read these in order before making production changes:

1. `AGENTS.md`
2. `docs/architecture/README.md`
3. `docs/decisions/0001-use-monorepo.md`
4. `docs/decisions/0002-use-pnpm-turborepo.md`
5. `docs/decisions/0003-docs-content-system.md`
6. `docs/decisions/0004-mdx-package-boundaries.md`
7. `docs/decisions/0005-docs-search-and-versioning.md`
8. `docs/monorepo-implementation-sprints.md`

For landing-page rebuild work, also read `docs/rebuild/README.md`,
`docs/rebuild/roadmap.md`, and `docs/rebuild/acceptance-gates.md`.

## Workspace map

- `apps/web`: production marketing, blog, subscriptions, auth entry routes, and
  legal pages for `www.doow.co`.
- `apps/docs`: production documentation app for `docs.doow.co`.
- `packages/mdx`: shared MDX parsing and validation helpers.
- `packages/content-schemas`: shared Zod schema primitives for content.
- `packages/design-tokens`: shared design token exports.
- `packages/config`: shared config exports.
- `tools`: root verification scripts.
- `docs`: architecture docs, decisions, runbooks, deployment docs, and rebuild
  source-of-truth docs.

## Where to add work

Add web app code in `apps/web/src`. Add blog posts in
`apps/web/content/blog`. Add docs app code in `apps/docs/src`. Add docs pages in
`apps/docs/content/docs`. Add docs redirects in
`apps/docs/src/lib/docs/redirects.ts`.

Add shared MDX helpers in `packages/mdx/src` only when both apps need the
behavior. Add shared schema primitives in `packages/content-schemas/src`. Keep
app-specific schemas, navigation, routes, RSS, search, and redirects inside the
owning app.

## Development

Install with pnpm from the repo root:

```bash
pnpm install --frozen-lockfile
```

Run the web app:

```bash
pnpm dev
```

Run either app explicitly:

```bash
pnpm dev:web
pnpm dev:docs
```

## Root commands

- `pnpm dev`: start the web app.
- `pnpm dev:web`: start `@doow/web`.
- `pnpm dev:docs`: start `@doow/docs`.
- `pnpm build`: build all workspaces through Turborepo.
- `pnpm build:web`: build only `@doow/web`.
- `pnpm build:docs`: build only `@doow/docs`.
- `pnpm start`: start the built web app.
- `pnpm lint`: lint all workspaces through Turborepo.
- `pnpm typecheck`: typecheck all workspaces through Turborepo.
- `pnpm test`: run workspace tests through Turborepo.
- `pnpm check:content`: run blog and docs content governance checks.
- `pnpm check:boundaries`: validate workspace dependency boundaries.
- `pnpm check:deployment`: validate Vercel config and canonical URL wiring.
- `pnpm verify`: run the full production verification sequence.
- `pnpm check:blog:*`: run focused blog milestone checks.
- `pnpm test:e2e*`: run web Playwright checks.

## Deployment

The monorepo deploys as two independent Vercel projects:

- Web: `apps/web`, `@doow/web`, `www.doow.co`,
  `docs/deployment/web.md`.
- Docs: `apps/docs`, `@doow/docs`, `docs.doow.co`,
  `docs/deployment/docs.md`.

Use `docs/deployment/environment-variables.md` for environment changes and
`docs/deployment/rollback.md` for rollback steps.

## Content runbooks

- Add a docs page: `docs/runbooks/add-docs-page.md`
- Move a docs page: `docs/runbooks/move-docs-page.md`
- Add a docs redirect: `docs/runbooks/add-docs-redirect.md`
- Add a blog post: `docs/runbooks/add-blog-post.md`

## Production gate

Before shipping repo changes, run:

```bash
pnpm verify
```

For narrow content changes, also run the focused app check listed in the
runbook for that content type.
