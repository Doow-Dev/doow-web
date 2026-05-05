# Blog launch operations

Use this runbook when preparing the Doow blog for launch or responding to a
production issue. The blog remains part of the existing landing site and uses
the same deployment flow.

## Ownership

Editorial owner: Doow Team.

The editorial owner maintains the content calendar, coordinates article review,
checks frontmatter compliance, manages blog image uploads, and owns broken-link
sweeps. If the editorial owner is unavailable, the founder decides whether to
pause publishing or assign a temporary owner.

## Search Console setup

Complete these steps before setting `BLOG_LIVE=true`:

1. Verify the `https://www.doow.co` property in Google Search Console.
2. Submit `https://www.doow.co/sitemap.xml`.
3. Inspect `/blog` and one article URL with URL Inspection.
4. Confirm the inspected URLs are crawlable and do not show `noindex`.
5. Set up alerts for crawl errors on `/blog/*` paths.
6. Submit launch articles individually for faster indexing.

## Bing Webmaster Tools setup

Complete the same launch checks in Bing Webmaster Tools:

1. Verify the `https://www.doow.co` property.
2. Submit `https://www.doow.co/sitemap.xml`.
3. Inspect `/blog` and one article URL.
4. Confirm crawlability after `BLOG_LIVE=true`.

## Rollback plan

The blog has one SEO kill switch and two content-level rollback paths.

Full SEO containment:

1. Set `BLOG_LIVE=false` in production environment variables.
2. Redeploy the site.
3. Confirm blog pages include `noindex, nofollow`.
4. Revert the deploy only if the route must stop responding entirely.

Broken post rollback:

1. Revert the offending post change.
2. Run `npm run build`.
3. Push the revert and wait for deployment.
4. For urgent containment, set `draft: true` on the post and deploy.

Image rollback:

1. Replace the corrupted CDN image under the same CDN-relative path.
2. Purge the CDN cache if needed.
3. Redeploy only if the MDX path or alt text changed.

## Incident response

| Symptom | Likely cause | First action |
| --- | --- | --- |
| Build fails after a content merge | Frontmatter or MDX validation error | Read the `[blog]` build error, then fix or revert the post |
| Article returns 404 | Slug mismatch or `draft: true` | Check the filename and draft flag |
| RSS feed misses a post | Draft content or stale deployment | Verify the draft flag and redeploy |
| Search Console reports `noindex` | `BLOG_LIVE` was not enabled | Confirm production env vars and redeploy |
| Lighthouse mobile score drops | Oversized media or layout shift | Audit article images and above-the-fold layout |

## Launch-day checklist

- `npm run lint` passes.
- `npm run typecheck` passes.
- `npm run build` passes.
- The latest `npm run check:blog:*` script passes against preview.
- Mobile Lighthouse and Core Web Vitals targets pass on preview.
- At least 3 real, non-draft posts are ready.
- `BLOG_LIVE=true` is set in production.
- Google Search Console sitemap is submitted.
- Bing Webmaster Tools sitemap is submitted.
- PostHog blog dashboard is ready.
- The editorial owner monitors the first 48 hours after launch.
