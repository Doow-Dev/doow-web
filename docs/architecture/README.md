# Monorepo architecture

Use these docs when deciding where code belongs in the Doow monorepo.

## Read order

1. `docs/architecture/app-boundaries.md`
2. `docs/architecture/package-boundaries.md`
3. `docs/architecture/mdx-content-governance.md`
4. `docs/architecture/deployment.md`
5. Relevant decision records in `docs/decisions/`

## Ownership summary

- `apps/web` owns the marketing site, blog, subscriptions, auth entry points,
  and legal pages.
- `apps/docs` owns the documentation site, docs content, docs routes, docs
  search, docs redirects, and docs content governance.
- `packages/mdx` owns generic MDX helpers.
- `packages/content-schemas` owns reusable content schema primitives.
- `packages/design-tokens` owns shared token exports.
- `packages/config` owns shared config exports.

If code belongs to one app, keep it in that app. Move code to `packages/*` only
after two apps need it and the code has no app-specific imports.
