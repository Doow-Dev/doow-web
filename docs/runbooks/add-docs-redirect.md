# Add a docs redirect

Use this runbook when an old docs URL should point to a new canonical URL.

## Steps

1. Open `apps/docs/src/lib/docs/redirects.ts`.
2. Add a redirect object with `from`, `to`, and `reason`.
3. Keep `from` and `to` as absolute paths that start with `/`.
4. Run `pnpm --filter @doow/docs docs:trace-redirects`.
5. Run `pnpm --filter @doow/docs check:content`.
6. Run `pnpm --filter @doow/docs build`.

## Example

```ts
{
  from: "/old-page",
  reason: "The guide moved to the setup section.",
  to: "/getting-started",
}
```

## Checks

The content check verifies that redirect targets resolve to known docs pages.
Use a clear reason so future agents know why the redirect exists.
