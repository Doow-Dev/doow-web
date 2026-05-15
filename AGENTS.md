# Doow monorepo instructions

This repository is production software. Customers can use the shipped web and
docs surfaces, so treat migration, content, and route changes as launch-quality
work.

## Read order

Read these before changing files:

1. `README.md`
2. `docs/architecture/README.md`
3. `docs/architecture/app-boundaries.md`
4. `docs/architecture/package-boundaries.md`
5. `docs/architecture/mdx-content-governance.md`
6. `docs/architecture/deployment.md`
7. `docs/decisions/0001-use-monorepo.md`
8. `docs/decisions/0002-use-pnpm-turborepo.md`
9. `docs/decisions/0003-docs-content-system.md`
10. `docs/decisions/0004-mdx-package-boundaries.md`
11. `docs/decisions/0005-docs-search-and-versioning.md`
12. `SKILL.md`

For landing-page rebuild work, also read:

1. `docs/rebuild/README.md`
2. `docs/rebuild/roadmap.md`
3. `docs/rebuild/acceptance-gates.md`

## Monorepo ownership

- `apps/web` owns `www.doow.co`, the landing page, subscriptions, auth entry
  points, legal pages, blog routes, blog MDX, and web-only integrations.
- `apps/docs` owns `docs.doow.co`, docs routes, docs MDX, docs navigation, docs
  redirects, docs search, docs versioning, and docs content governance.
- `packages/mdx` owns generic MDX helpers shared by apps.
- `packages/content-schemas` owns reusable content schema primitives.
- `packages/design-tokens` owns shared token exports.
- `packages/config` owns shared config exports.

Apps must not import from each other. Shared packages must not import from
`apps/*`. The `@/*` alias is app-local.

## Where to make common changes

- Web UI or routes: `apps/web/src`
- Blog posts: `apps/web/content/blog`
- Blog checks: `apps/web/scripts/check-blog`
- Docs UI or routes: `apps/docs/src`
- Docs pages: `apps/docs/content/docs`
- Docs redirects: `apps/docs/src/lib/docs/redirects.ts`
- Docs search: `apps/docs/src/lib/docs/search.ts`
- Docs versioning: `apps/docs/src/lib/docs/versioning.ts`
- Shared MDX helpers: `packages/mdx/src`
- Shared schema primitives: `packages/content-schemas/src`
- Deployment config: `apps/web/vercel.json`, `apps/docs/vercel.json`, and
  `docs/deployment/`

## Root commands

- `pnpm dev`: start the web app.
- `pnpm dev:web`: start `@doow/web`.
- `pnpm dev:docs`: start `@doow/docs`.
- `pnpm build`: build all workspaces.
- `pnpm build:web`: build only the web app.
- `pnpm build:docs`: build only the docs app.
- `pnpm lint`: lint all workspaces.
- `pnpm typecheck`: typecheck all workspaces.
- `pnpm test`: run workspace tests.
- `pnpm check:content`: run blog and docs content checks.
- `pnpm check:boundaries`: validate workspace dependency boundaries.
- `pnpm check:deployment`: validate deployment config and canonical URLs.
- `pnpm verify`: run the full production verification sequence.

## Web route policy

Keep these web routes unless a later decision changes the policy:

- `/`
- `/subscriptions`
- `/signin`
- `/privacy_policy`
- `/terms_of_use`

Prune these legacy routes when the rebuild batch reaches route cleanup:

- `/about_us`
- `/contact_us`

Blog routes stay in `apps/web` and remain `noindex, nofollow` until
`BLOG_LIVE=true` is set in production.

## Docs route policy

Docs routes belong to `apps/docs`. Published docs URL changes require redirects
in `apps/docs/src/lib/docs/redirects.ts`.

Use the runbooks in `docs/runbooks/` for docs page additions, docs page moves,
docs redirects, and blog posts.

## Landing-page rebuild rules

- Work in batches, not as a one-shot rewrite.
- Stop after each batch for review.
- Stop after each section for review.
- Use Figma as the design source of truth.
- Implement mobile-first, even when only desktop Figma exists.
- Prefer static rendering, minimal client JavaScript, and strong accessibility.
- Do not keep old landing-page sections just because they already exist.
- Do not treat legacy `public` assets as long-term production assets.
- Do not hardcode Azure blob URLs throughout the codebase.

## Verification

Run focused checks for the workspace you touched. Before shipping a broad
change, run:

```bash
pnpm verify
```

Do not mark a non-trivial change complete if relevant checks are failing.
