# Claude working notes

Use `AGENTS.md` first. This repo is now a pnpm and Turborepo monorepo with two
production Next.js apps.

## Fast map

- Web app: `apps/web`
- Docs app: `apps/docs`
- Shared MDX helpers: `packages/mdx`
- Shared content schema primitives: `packages/content-schemas`
- Shared tokens: `packages/design-tokens`
- Deployment docs: `docs/deployment`
- Architecture docs: `docs/architecture`
- Decision records: `docs/decisions`
- Content runbooks: `docs/runbooks`

## Default checks

Use focused checks while iterating:

```bash
pnpm check:boundaries
pnpm check:deployment
pnpm --filter @doow/web build
pnpm --filter @doow/docs check:content
pnpm --filter @doow/docs build
```

Use the full gate before broad completion:

```bash
pnpm verify
```

## Boundaries

Keep app-owned behavior in the app that owns it. Extract to `packages/*` only
when both apps need the behavior and the code can be tested without a Next.js
app. Do not import between apps.

## Landing-page rebuild

For landing-page visual work, also read `docs/rebuild/README.md`,
`docs/rebuild/roadmap.md`, and `docs/rebuild/acceptance-gates.md`. That rebuild
still follows batch review, section review, Figma source of truth, and
mobile-first implementation.
