# Move a docs page

Use this runbook when changing a docs page slug or URL.

## Steps

1. Run the move script from the docs workspace:

```bash
pnpm --filter @doow/docs docs:move-page <old-slug> <new-slug>
```

2. Review the new file in `apps/docs/content/docs/<new-slug>.mdx`.
3. Review the redirect that was added to `apps/docs/src/lib/docs/redirects.ts`.
4. Update `apps/docs/src/lib/docs/navigation.ts` if the page appears in docs
   navigation.
5. Update any internal links that should point directly to the new canonical
   URL.
6. Run `pnpm --filter @doow/docs docs:trace-redirects`.
7. Run `pnpm --filter @doow/docs check:content`.
8. Run `pnpm --filter @doow/docs build`.

## Rule

Never move a published docs page without leaving a redirect. Old docs links are
part of the production surface.
