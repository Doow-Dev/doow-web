# Environment-variable runbook

Use this runbook when adding, removing, or changing deployment environment
variables for the web or docs app.

## Ownership rules

Each app owns its own deployment variables. Shared variables must be added only
when both apps directly consume them.

- Web owns `NEXT_PUBLIC_SITE_URL`, analytics, blob assets, app handoff, blog
  launch state, and catalog API variables.
- Docs owns `NEXT_PUBLIC_DOCS_SITE_URL`.
- Root `turbo.json` lists variables that can affect cached builds.

## Change process

Follow these steps for every environment-variable change:

1. Add the variable to the correct app `.env.example` file.
2. Add local-only guidance to the matching `.env.local.example` file when
   developers need it.
3. Add the variable to `turbo.json` `globalEnv` if it affects build output,
   routing, metadata, content, analytics, or API behavior.
4. Update the relevant deployment runbook.
5. Run `pnpm check:deployment`.
6. Run the app-specific build.
7. Set the variable in the correct Vercel project.
8. Verify preview and production deployments before removing the previous
   value.

## Canonical URL variables

Canonical URL variables are production-sensitive:

- `NEXT_PUBLIC_SITE_URL` must point to `https://www.doow.co`.
- `NEXT_PUBLIC_DOCS_SITE_URL` must point to `https://docs.doow.co`.

Do not swap these variables between apps. The deployment check guards the source
code references, but the final values must be verified in Vercel.
