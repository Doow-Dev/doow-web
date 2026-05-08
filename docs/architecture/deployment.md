# Deployment architecture

The monorepo deploys as two independent Vercel projects from the same git repo.
Each project points at its app directory and runs a filtered pnpm build from the
workspace root.

## Projects

Web project:

- App: `@doow/web`
- Root directory: `apps/web`
- Domain: `www.doow.co`
- Config: `apps/web/vercel.json`
- Runbook: `docs/deployment/web.md`

Docs project:

- App: `@doow/docs`
- Root directory: `apps/docs`
- Domain: `docs.doow.co`
- Config: `apps/docs/vercel.json`
- Runbook: `docs/deployment/docs.md`

## Canonical URLs and sitemaps

Each app owns its canonical URL environment variable and sitemap route. Web uses
`NEXT_PUBLIC_SITE_URL` and `apps/web/src/app/sitemap.ts`. Docs uses
`NEXT_PUBLIC_DOCS_SITE_URL` and `apps/docs/src/app/sitemap.ts`.

## Config checks

`pnpm check:deployment` verifies the local Vercel config files, required
environment examples, and canonical URL wiring.

The deployment commands in each Vercel project must run from the monorepo root:

- install: `cd ../.. && pnpm install --frozen-lockfile`
- web build: `cd ../.. && pnpm --filter @doow/web build`
- docs build: `cd ../.. && pnpm --filter @doow/docs build`

## Environment split

Web and docs environment variables are intentionally separate. Do not copy web
analytics, catalog secrets, or blog flags into the docs project unless a future
feature explicitly requires them and the deployment check is updated.

Use `docs/deployment/environment-variables.md` for the environment change
process and `docs/deployment/rollback.md` for rollback steps.
