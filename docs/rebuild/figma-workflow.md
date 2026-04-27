# Figma Workflow

## Core Principle

Use Figma MCP as the design input layer, not as final production code.

## Section Workflow

1. Identify the exact Figma node for the active section.
2. Pull the structured context for that node.
3. Pull the screenshot for visual comparison.
4. Pull only the variables, assets, and component instances needed for that section.
5. Promote repeatable values or variants into repo tokens and shared primitives.
6. Implement the active section immediately after the needed primitives exist.
7. Compare against the screenshot and pause for review before moving to the next section.

## Current Known Nodes

- root landing page: `580:1110`
- hero: `580:1111`
- demo or video section: `580:1167`
- feature split: `580:2094`
- integrations: `583:3592`
- footer: `583:3998`

## Constraints

- Figma MCP access is active.
- The current seat has hit tool-call limits during broader design-system searches.
- Extraction should therefore stay tightly scoped to the active section or primitive.

## Asset Handling

- Temporary MCP asset URLs are not production asset URLs.
- Approved images and SVGs must be exported and moved into the CDN-backed asset workflow before production use.
- If the canonical Azure Blob or Front Door URL is not available yet, a temporary local fallback may be used through the typed asset manifest, with an explicit TODO for later replacement.
