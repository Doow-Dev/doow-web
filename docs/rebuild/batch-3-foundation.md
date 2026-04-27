# Batch 3 Foundation

## Status

- Batch 3 started on `2026-04-15`
- Scope of this slice: Figma verification, token foundation, and first shared primitives
- Section implementation has now started with the hero surface slice on `/`

## Figma Verification

### Local desktop bridge

- Config entry present in `C:\Users\user\.codex\config.toml` under `[mcp_servers.figma_desktop]`
- Bridge endpoint: `http://127.0.0.1:3845/mcp`
- Direct HTTP probe results on `2026-04-15`:
  - `GET /mcp` responds immediately with `400 Bad Request`
  - MCP `initialize` succeeds with `200 OK`
  - reported server: `Figma Dev Mode MCP Server 1.0.0`
  - MCP `tools/list` does not return and times out, including after a `120s` wait
- Important updated note:
  - direct targeted `tools/call` requests do work for exact nodes
  - successful local extraction has now been confirmed for:
    - `get_metadata` on `580:1112`
    - `get_variable_defs` on `580:1112`
    - `get_screenshot` on `580:1112`
    - `get_design_context` on `580:1121` and `580:1129`
    - `get_metadata`, `get_variable_defs`, and `get_screenshot` on `580:1111`
    - `get_design_context` on `580:1132`, `580:1135`, `580:1138`, and `580:1139`

### Hosted Figma tools

- The Figma app tools are currently blocked by the Professional-plan View-seat tool-call limit
- Direct extraction attempts for `get_variable_defs`, `get_metadata`, and `get_screenshot` on root node `580:1110` all returned the seat-limit error on `2026-04-15`

## Usable Figma Evidence Right Now

From the rebuild docs and prior connected exploration:

- typography tokens are based on `Inter`
- foreground and background tokens exist in the file
- radius tokens exist in the file
- elevation and shadow values exist in the file
- button instances use the primary green surface
- root and section anchors remain:
  - root: `580:1110`
  - hero: `580:1111`
  - demo: `580:1167`
  - feature split: `580:2094`
  - integrations: `583:3592`
  - footer: `583:3998`

## Repo Source Of Truth Added In This Slice

- `src/styles/tokens/foundation.css`
- `src/styles/recipes/system.css`
- `src/styles/tokens/figma-evidence.ts`
- `src/components/system/`
- `docs/rebuild/header-nav-extraction.md`
- `docs/rebuild/hero-extraction.md`

## Important Note

- The Batch 3 implementation values are now mixed-confidence:
  - some are still provisional
  - some are now grounded in exact header extraction from the local desktop bridge
- hero frame size, screenshot, headline, lead-copy, and CTA button variants are now also grounded in direct local extraction
- the home route now uses the first real landing-page section instead of the temporary rebuild placeholder
- Replace the remaining provisional values with exact Figma exports section by section

## Next Action

1. Review the hero section implementation
2. Replace the temporary local hero asset fallback with the Azure Blob or Front Door URL when available
3. Start targeted extraction for the demo section only after hero sign-off
4. Continue section work only after the shared primitives remain stable
