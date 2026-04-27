# Rebuild Handoff

## Current State

- Batch 0 completed
- Batch 1 completed
- Batch 2 completed and ready for review
- Batch 3 foundation landed and is now refined in place during section work
- Batch 4 CDN and asset-pipeline migration is in progress
- Batch 5 shared shells, metadata, and quality-harness work is in progress
- Batch 6 section implementation is active

## What Changed Most Recently

- The local `figma_desktop` bridge was rechecked from Codex.
- The bridge can complete MCP `initialize`, but it still hangs on `tools/list`.
- Targeted direct `tools/call` extraction now works through the local desktop bridge.
- Hosted Figma tool calls are currently blocked by the View-seat tool-call limit.
- The landing route now composes the implemented hero, demo, feature split, finance control, alternative apps, pricing, FAQ, integrations, and footer sections.
- Shared non-landing chrome now lives in `app/(site-pages)/layout.tsx`, with the global navbar plus the invariant footer body owned by the route-group layout.
- `/applications` and `/doow-ai` both live under `app/(site-pages)`.
- The Doow AI spotlight implementation exists under `src/app/(landing)/_components/doow-ai`, but the home route currently comments it out.
- The typed asset manifest now mixes CDN-backed assets with a few temporary local fallbacks that still need canonical blob or Front Door replacements.
- The current quality checks are mixed: `npm run typecheck` passes, `npm run test:unit` passes, `npm run lint` passes with warnings, and `npm run build` depends on live Google Fonts access because `src/app/layout.tsx` uses `next/font/google`.

## Figma MCP Status

- The local desktop-backed Figma MCP bridge is reachable at `http://127.0.0.1:3845/mcp`.
- Codex global config was updated in `C:\Users\user\.codex\config.toml` with:

```toml
[features]
rmcp_client = true

[mcp_servers.figma_desktop]
url = 'http://127.0.0.1:3845/mcp'
```

- In the fresh session on `2026-04-15`, the bridge responded successfully to MCP `initialize` and reported `Figma Dev Mode MCP Server 1.0.0`.
- The same session still timed out on MCP `tools/list`, including after a direct `120s` wait.
- Even with `tools/list` blocked, direct targeted `tools/call` requests now succeed for exact nodes.
- Hosted Figma app tools returned the Professional-plan View-seat tool-call-limit error for root-node extraction calls.

## Next Action

Resume from the current section-review and stabilization flow:

1. `AGENTS.md`
2. `docs/rebuild/README.md`
3. `docs/rebuild/handoff.md`
4. `docs/rebuild/implementation-plan.md`

Then continue with:

- decide whether the Doow AI spotlight should be mounted on `/` now or remain disabled and have the landing tests updated to match
- continue replacing the remaining local fallback assets with canonical blob or Front Door URLs
- keep the shared shell and validation docs accurate as build, lint, and test behavior changes
- continue section review and polish in Figma order only after the landing route and the quality harness agree on the active section set

## Recommended Restart Prompt

Use this to reopen cleanly:

```text
Read AGENTS.md, docs/rebuild/README.md, docs/rebuild/handoff.md, and docs/rebuild/implementation-plan.md first. The landing page and shared site-page shell are already implemented across multiple sections. Confirm whether the Doow AI spotlight should be active on `/`, keep the rebuild docs synced to the live route and validation state, and only continue section polish after the landing route and tests agree on the active section set.
```
