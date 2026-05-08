# Web deployment runbook

Use this runbook to deploy the Doow marketing and blog app as the production
`@doow/web` Vercel project.

## Production target

The web app owns the public marketing and blog surface.

- Package: `@doow/web`
- Root directory: `apps/web`
- Domain: `www.doow.co`
- Install command: `cd ../.. && pnpm install --frozen-lockfile`
- Build command: `cd ../.. && pnpm --filter @doow/web build`
- Local config file: `apps/web/vercel.json`

## Required environment variables

Set these variables only on the web project. Do not copy docs-only variables
into the web project unless a future feature explicitly needs them.

- `NEXT_PUBLIC_SITE_URL=https://www.doow.co`
- `NEXT_PUBLIC_BLOB_BASE_URL`
- `NEXT_PUBLIC_DOOW_APP_BASE_URL`
- `NEXT_PUBLIC_POSTHOG_KEY`
- `NEXT_PUBLIC_POSTHOG_HOST`
- `BLOG_LIVE`
- `DOOW_API_BASE_URL`
- `CATALOG_ADMIN_KEY`
- `X_ADMIN_SECRET`

## Deployment steps

Run these checks before promoting a deployment:

1. Run `pnpm install --frozen-lockfile`.
2. Run `pnpm check:boundaries`.
3. Run `pnpm check:deployment`.
4. Run `pnpm --filter @doow/web build`.
5. Confirm the Vercel project root directory is `apps/web`.
6. Confirm the Vercel project uses the install and build commands above. The
   `cd ../..` prefix is required because Vercel executes commands from
   `apps/web`.
7. Assign `www.doow.co` to the web project.
8. Verify the preview and production deployment render `/`, `/blog`, and
   `/blog/search.json`.

## Acceptance checks

The deployment is ready when the build passes, canonical URLs use
`NEXT_PUBLIC_SITE_URL`, analytics variables are set only on the web app, and
`www.doow.co` resolves to the web project.
