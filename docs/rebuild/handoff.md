# Rebuild Handoff

## Current State

- Batch 0 completed
- Batch 1 completed
- Batch 2 completed and ready for review
- Batch 3 is active under the section-first extraction and implementation flow

## What Changed Most Recently

- The local `figma_desktop` bridge was rechecked from Codex.
- The bridge can complete MCP `initialize`, but it still hangs on `tools/list`.
- Targeted direct `tools/call` extraction now works through the local desktop bridge.
- Header, hero text, hero CTA, variables, and screenshot evidence were extracted from the local bridge.
- Hosted Figma tool calls are currently blocked by the View-seat tool-call limit.
- Batch 3 foundation files were added for tokens, recipes, and shared system primitives.
- The home route now renders the first real hero section implementation instead of the temporary rebuild placeholder.
- A typed local asset manifest has been introduced so temporary local media can be swapped to Azure Blob or Front Door URLs later without hardcoded component changes.

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

Resume from the current section-first Batch 3 flow:

1. `AGENTS.md`
2. `docs/rebuild/README.md`
3. `docs/rebuild/handoff.md`
4. `docs/rebuild/implementation-plan.md`

Then continue with:

- review the implemented hero section first
- if changes are requested, iterate on the hero section only
- once hero is approved, continue using targeted direct node extraction for the next section
- keep media references flowing through the typed asset manifest until Azure Blob or Front Door URLs are available

## Recommended Restart Prompt

Use this to reopen cleanly:

```text
Read AGENTS.md, docs/rebuild/README.md, docs/rebuild/handoff.md, and docs/rebuild/implementation-plan.md first. Batches 0-2 are complete. Continue the section-first Batch 3 flow from the implemented hero section, review or refine it as needed, and then move to the next Figma section only after hero sign-off.
```
