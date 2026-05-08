# Vercel project setup

Use this guide to create and verify the two production Vercel projects for the
Doow monorepo.

## Project matrix

| Project | Root directory | Install command | Build command | Domain |
| --- | --- | --- | --- | --- |
| `@doow/web` | `apps/web` | `pnpm install --frozen-lockfile` | `pnpm --filter @doow/web build` | `www.doow.co` |
| `@doow/docs` | `apps/docs` | `pnpm install --frozen-lockfile` | `pnpm --filter @doow/docs build` | `docs.doow.co` |

## Repo-owned checks

The repository enforces the deployment contract with:

- `apps/web/vercel.json`
- `apps/docs/vercel.json`
- `apps/web/.env.example`
- `apps/docs/.env.example`
- `tools/check-deployment-config.mjs`
- `pnpm check:deployment`

## External setup

These actions must be completed in Vercel or DNS:

1. Create or update the Vercel project for `@doow/web`.
2. Set the web root directory to `apps/web`.
3. Assign `www.doow.co` to the web project.
4. Create or update the Vercel project for `@doow/docs`.
5. Set the docs root directory to `apps/docs`.
6. Assign `docs.doow.co` to the docs project.
7. Set app-owned environment variables on the correct project.
8. Confirm DNS points each domain to the expected Vercel project.

## Verification

Run the following checks before considering the setup complete:

```bash
pnpm check:deployment
pnpm --filter @doow/web build
pnpm --filter @doow/docs build
pnpm verify
```

Then verify production routes:

- `https://www.doow.co/`
- `https://www.doow.co/blog`
- `https://docs.doow.co/getting-started`
- `https://docs.doow.co/search.json`
