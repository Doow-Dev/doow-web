# Deployment rollback runbook

Use this runbook when a web or docs deployment needs to be reverted quickly.

## Rollback decision

Rollback is appropriate when production has broken routing, missing critical
content, incorrect canonical URLs, failed authentication handoff, broken docs
navigation, or a customer-visible regression that cannot be fixed immediately.

## Web rollback

Use the Vercel deployment history for the `@doow/web` project.

1. Identify the last healthy production deployment for `www.doow.co`.
2. Promote or restore that deployment in Vercel.
3. Verify `/`, `/blog`, `/blog/rss.xml`, and `/blog/search.json`.
4. Run `pnpm --filter @doow/web build` locally against the rollback commit when
   a follow-up hotfix is needed.
5. Record the incident and rollback deployment URL in the release notes or
   project memory.

## Docs rollback

Use the Vercel deployment history for the `@doow/docs` project.

1. Identify the last healthy production deployment for `docs.doow.co`.
2. Promote or restore that deployment in Vercel.
3. Verify `/getting-started`, `/reference`, and `/search.json`.
4. Run `pnpm --filter @doow/docs check:content` locally before shipping any
   follow-up docs fix.
5. Record any moved pages or redirects that need to be preserved after the
   rollback.

## After rollback

Run `pnpm verify` before shipping the corrective commit. If the issue involved
configuration drift, also run `pnpm check:deployment`.
