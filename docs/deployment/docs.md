# Docs deployment runbook

Use this runbook to deploy the Doow documentation app as the production
`@doow/docs` Vercel project.

## Production target

The docs app owns the documentation domain and content lifecycle.

- Package: `@doow/docs`
- Root directory: `apps/docs`
- Domain: `docs.doow.co`
- Install command: `cd ../.. && pnpm install --frozen-lockfile`
- Build command: `cd ../.. && pnpm --filter @doow/docs build`
- Local config file: `apps/docs/vercel.json`

## Required environment variables

Set these variables only on the docs project. The docs app must not receive web
analytics or catalog API secrets unless a future docs feature explicitly needs
them.

- `NEXT_PUBLIC_DOCS_SITE_URL=https://docs.doow.co`

## Deployment steps

Run these checks before promoting a deployment:

1. Run `pnpm install --frozen-lockfile`.
2. Run `pnpm check:boundaries`.
3. Run `pnpm check:deployment`.
4. Run `pnpm --filter @doow/docs check:content`.
5. Run `pnpm --filter @doow/docs build`.
6. Confirm the Vercel project root directory is `apps/docs`.
7. Confirm the Vercel project uses the install and build commands above. The
   `cd ../..` prefix is required because Vercel executes commands from
   `apps/docs`.
8. Assign `docs.doow.co` to the docs project.
9. Verify the preview and production deployment render `/getting-started`,
   `/reference`, and `/search.json`.

## Acceptance checks

The deployment is ready when the build passes, docs content governance passes,
canonical URLs use `NEXT_PUBLIC_DOCS_SITE_URL`, and `docs.doow.co` resolves to
the docs project.
