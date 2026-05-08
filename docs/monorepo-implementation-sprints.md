# Monorepo implementation sprints

Use this checklist to track the production monorepo and docs-system migration.
Mark each checkbox as the work lands. A sprint is complete only when its gate
checks pass.

## Locked decisions

These decisions are part of the implementation baseline. Change them only
through an architecture decision record.

- [x] Use `pnpm` workspaces and Turborepo.
- [x] Use `apps/web` for `www.doow.co`.
- [ ] Use `apps/docs` for `docs.doow.co`.
- [x] Move the current app into `apps/web`.
- [x] Move `content/blog` into `apps/web/content/blog`.
- [ ] Build a Doow-owned Clerk-style MDX system.
- [ ] Add `@doow/mdx` and `@doow/content-schemas` as production packages.
- [ ] Keep blog schemas and docs schemas app-owned.
- [ ] Use TypeScript source packages with Next.js `transpilePackages`.

## Sprint 0: Baseline and safety

Establish the current state before structural changes. Record existing failures
separately from migration failures.

### Tasks

- [ ] Create the `monorepo-docs-platform` branch or worktree.
- [ ] Run `npm run lint`.
- [ ] Run `npm run typecheck`.
- [ ] Run `npm run test:unit`.
- [ ] Run `npm run build`.
- [ ] Record known failures, including any `next/font/google` build issue.
- [ ] Confirm the current route inventory.
- [ ] Snapshot current blog behavior: content loading, RSS, search JSON,
  sitemap, redirects, and `BLOG_LIVE` noindex behavior.

### Gate

- [ ] Baseline checks are documented.
- [ ] Existing failures are separated from migration failures.

## Sprint 1: Root monorepo foundation

Introduce the monorepo shell and package-manager migration before moving the
current app.

### Tasks

- [x] Add `pnpm-workspace.yaml`.
- [x] Add `turbo.json`.
- [x] Add root `.npmrc`.
- [x] Convert root `package.json` into the monorepo coordinator.
- [x] Add root scripts: `dev`, `dev:web`, `dev:docs`, `build`, `build:web`,
  `build:docs`, `lint`, `typecheck`, `test`, `check:content`, and `verify`.
- [x] Add `packageManager` to the root `package.json`.
- [x] Generate `pnpm-lock.yaml`.
- [x] Remove `package-lock.json`.
- [x] Verify `pnpm install --frozen-lockfile` from a clean install.
- [x] Add Turbo env awareness for web, blog, analytics, and docs search env
  variables.

### Gate

- [x] `pnpm install --frozen-lockfile` works.
- [x] Root Turbo commands resolve.
- [x] No npm and pnpm lockfiles exist together.

## Sprint 2: Move current site to `apps/web`

Move the current Next.js app intact. Preserve behavior before extracting shared
packages or adding the docs app.

### Tasks

- [x] Create `apps/web`.
- [x] Move `src` into `apps/web/src`.
- [x] Move `content/blog` into `apps/web/content/blog`.
- [x] Move `public` into `apps/web/public`.
- [x] Move `scripts/check-blog` into the web app or update paths deliberately.
- [x] Move `tests` into the web app or update root test paths deliberately.
- [x] Move `next.config.ts`, `tsconfig.json`, `eslint.config.mjs`,
  `postcss.config.mjs`, and `playwright.config.ts` into `apps/web`.
- [x] Create `apps/web/package.json` as `@doow/web`.
- [x] Keep the `@/*` alias app-local to `apps/web/src/*`.
- [x] Ensure blog loading resolves from `apps/web/content/blog`.
- [x] Add web scripts: `dev`, `build`, `lint`, `typecheck`, `test:unit`,
  `test:e2e`, `check:content`, and `check:blog:launch`.
- [x] Update root scripts to call `@doow/web`.

### Gate

- [x] `pnpm --filter @doow/web lint` passes.
- [x] `pnpm --filter @doow/web typecheck` passes.
- [x] `pnpm --filter @doow/web test:unit` passes.
- [x] `pnpm --filter @doow/web build` passes or only has documented baseline
  failures.
- [x] Blog routes still work.

## Sprint 3: Shared package layer

Create the production shared package foundation. Extract only stable shared
contracts.

### Tasks

- [x] Create `packages/config` as `@doow/config`.
- [x] Create `packages/design-tokens` as `@doow/design-tokens`.
- [x] Create `packages/content-schemas` as `@doow/content-schemas`.
- [x] Add `asset-path.ts`, `date.ts`, `slug.ts`, `link.ts`, `seo.ts`, and
  `frontmatter-primitives.ts` to `@doow/content-schemas`.
- [x] Create `packages/mdx` as `@doow/mdx`.
- [x] Add `parse.ts`, `headings.ts`, `validate-components.ts`,
  `validate-images.ts`, `validate-links.ts`, `code-blocks.ts`, and `errors.ts`
  to `@doow/mdx`.
- [x] Add Vitest for shared packages.
- [x] Add `transpilePackages` to `apps/web/next.config.ts`.
- [x] Keep blog schema in `apps/web/src/lib/blog/schema.ts`.
- [x] Reuse schema primitives from `@doow/content-schemas`.
- [x] Move only generic MDX helpers into `@doow/mdx`.

### Gate

- [x] `@doow/mdx` tests pass.
- [x] `@doow/content-schemas` tests pass.
- [x] Web blog behavior is unchanged.
- [x] `pnpm --filter @doow/web build` passes or only has documented baseline
  failures.

## Sprint 4: Docs app foundation

Create the production docs app with its own content model and MDX component map.

### Tasks

- [x] Create `apps/docs` as `@doow/docs`.
- [x] Add `apps/docs/src/app`.
- [x] Add `apps/docs/content/docs`.
- [x] Add `apps/docs/src/lib/docs`.
- [x] Add `apps/docs/src/components/docs`.
- [x] Add routes for `/`, `/getting-started`, `/guides`, `/reference`, and
  `/changelog`.
- [x] Add docs frontmatter schema.
- [x] Add docs MDX config.
- [x] Add docs manifest, sidebar, or navigation registry.
- [x] Add docs slug and path resolver.
- [x] Use `@doow/mdx` for parsing, table-of-contents extraction, image
  validation, link validation, and component validation.
- [x] Use `@doow/content-schemas` for shared primitives only.
- [x] Add docs MDX components: `Callout`, `Steps`, `Card`, `Cards`,
  `CodeBlock`, `Tabs`, and `Tooltip`.
- [x] Add docs layout with sidebar, top nav, article content, table of
  contents, and mobile nav.
- [x] Add `transpilePackages` to `apps/docs/next.config.ts`.

### Gate

- [x] `pnpm --filter @doow/docs dev` works.
- [x] `pnpm --filter @doow/docs build` passes.
- [x] A sample MDX docs page renders with a table of contents.
- [x] Approved docs MDX components render correctly.

## Sprint 5: Docs content governance

Add Clerk-style production content governance for docs.

### Tasks

- [x] Add frontmatter validation.
- [x] Add unsupported MDX component validation.
- [x] Add unsafe HTML validation.
- [x] Add inline event handler validation.
- [x] Add duplicate slug validation.
- [x] Add duplicate heading ID validation.
- [x] Add image path and alt text validation.
- [x] Add internal link validation.
- [x] Add `apps/docs/src/lib/docs/redirects.ts`.
- [x] Add redirect validation.
- [x] Add duplicate redirect detection.
- [x] Add redirect trace script.
- [x] Add content move tooling that creates redirects.
- [x] Add content delete tooling that validates links.
- [x] Add Doow-owned build-time docs search JSON.
- [x] Add docs search record validation.
- [x] Record the docs versioning decision as unversioned at launch.
- [x] Record the trigger for future versioning.

### Gate

- [x] `pnpm --filter @doow/docs check:content` passes.
- [x] Broken links fail content checks.
- [x] Unsupported MDX fails content checks.
- [x] Docs search JSON is generated and validated.

## Sprint 6: Boundary enforcement and CI

Make the monorepo rules enforceable in local checks and CI.

### Tasks

- [x] Add import boundary enforcement.
- [x] Block `apps/web` from importing `apps/docs`.
- [x] Block `apps/docs` from importing `apps/web`.
- [x] Block `packages/*` from importing `apps/*`.
- [x] Detect circular package dependencies.
- [x] Detect undeclared package dependencies.
- [x] Ensure apps list internal packages they use.
- [x] Add CI install with `pnpm install --frozen-lockfile`.
- [x] Add CI lint.
- [x] Add CI typecheck.
- [x] Add CI package tests.
- [x] Add CI web build.
- [x] Add CI docs build.
- [x] Add CI content checks.
- [x] Add CI boundary checks.
- [x] Add root `pnpm verify`.

### Gate

- [x] A fresh clone can install and verify.
- [x] CI fails on forbidden imports.
- [x] CI fails on invalid blog or docs MDX.

## Sprint 7: Deployment setup

Deploy web and docs as independent production apps.

### Tasks

- [ ] Configure the Vercel project for `@doow/web`.
- [ ] Set web root directory to `apps/web`.
- [x] Set web install command to `pnpm install --frozen-lockfile`.
- [x] Set web build command to `pnpm --filter @doow/web build`.
- [ ] Assign `www.doow.co` to the web app.
- [ ] Configure the Vercel project for `@doow/docs`.
- [ ] Set docs root directory to `apps/docs`.
- [x] Set docs install command to `pnpm install --frozen-lockfile`.
- [x] Set docs build command to `pnpm --filter @doow/docs build`.
- [ ] Assign `docs.doow.co` to the docs app.
- [x] Split environment variables by app.
- [x] Add web deployment runbook.
- [x] Add docs deployment runbook.
- [x] Add rollback runbook.
- [x] Add environment-variable change runbook.
- [x] Verify web canonical URLs use `NEXT_PUBLIC_SITE_URL`.
- [x] Verify docs canonical URLs use `NEXT_PUBLIC_DOCS_SITE_URL`.

> **Sprint 7 status:** Repo-owned deployment configuration is complete. The
> remaining unchecked items require access to Vercel and DNS.

### Gate

- [ ] Web deploy preview works.
- [ ] Docs deploy preview works.
- [ ] Domains route to the correct apps.
- [x] Analytics and canonical config are not accidentally shared.

## Sprint 8: Documentation and agent operating rules

Make future monorepo work obvious for humans and agents.

### Tasks

- [x] Create `docs/decisions/0001-use-monorepo.md`.
- [x] Create `docs/decisions/0002-use-pnpm-turborepo.md`.
- [x] Create `docs/decisions/0003-docs-content-system.md`.
- [x] Create `docs/decisions/0004-mdx-package-boundaries.md`.
- [x] Create `docs/decisions/0005-docs-search-and-versioning.md`.
- [x] Add architecture docs for app boundaries.
- [x] Add architecture docs for package boundaries.
- [x] Add architecture docs for deployment.
- [x] Add architecture docs for MDX and content governance.
- [x] Add runbook for deploying web.
- [x] Add runbook for deploying docs.
- [x] Add runbook for adding a docs page.
- [x] Add runbook for moving a docs page.
- [x] Add runbook for adding a docs redirect.
- [x] Add runbook for adding a blog post.
- [x] Update `AGENTS.md`.
- [x] Update `CLAUDE.md`.
- [x] Update `SKILL.md`.
- [x] Update `README.md`.
- [x] Add the monorepo readup order for agents.

### Gate

- [x] A new agent can identify where to add web code.
- [x] A new agent can identify where to add docs code.
- [x] A new agent can identify where to add shared MDX helpers.
- [x] A new agent can identify where to add redirects.
- [x] Docs explain every root command and deployment path.

> **Sprint 8 status:** Complete. The monorepo now has architecture docs,
> decision records, runbooks, and updated root operating instructions for new
> agents and humans.

## Final acceptance checklist

The migration is complete only when every final acceptance check passes.

- [x] `pnpm install --frozen-lockfile` works from a clean clone.
- [x] `pnpm verify` passes.
- [x] `apps/web` builds and serves the current site.
- [x] `apps/docs` builds and serves the docs site.
- [x] Blog MDX works after moving into `apps/web`.
- [x] Docs MDX supports approved components and validation.
- [x] `@doow/mdx` is tested.
- [x] `@doow/content-schemas` is tested.
- [ ] Web and docs deploy independently.
- [x] Boundary rules fail invalid imports.
- [x] Docs search works.
- [x] Docs redirects work.
- [x] Docs sitemap works.
- [x] Docs canonical URLs work.
- [x] Agent docs and runbooks are updated.

> **Final acceptance status:** Repo-owned validation is complete. A fresh
> working-tree copy in `/tmp/doow-web-clean-check`, with local env files,
> `node_modules`, build output, and caches excluded, passed
> `pnpm install --frozen-lockfile` and `pnpm verify`. CI must repeat this after
> the migration is committed. Independent deployment still requires Vercel
> preview and domain validation for `www.doow.co` and `docs.doow.co`.

## Notes

- Do not mix landing-page visual redesign work into this migration.
- Keep blog and docs schemas separate.
- Share MDX tooling, not publication models.
- Keep `@/*` aliases app-local.
- Record any decision changes in `docs/decisions/` before implementation.
