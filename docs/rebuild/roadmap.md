# Rebuild Roadmap

## Working Model

- Every batch ends with a review checkpoint.
- Every section ends with a review checkpoint.
- Shared foundations come before section implementation.
- No section moves forward until it clears the acceptance gates.

## Batch Sequence

### Batch 0. Preflight and standards lock
- Freeze the workflow, breakpoint matrix, review gates, performance budgets, and route policy in repo docs.
- Capture baseline repo facts and the Figma section registry.
- Status: completed, ready for review

### Batch 1. AI agent and repo guidance files
- Rewrite `SKILL.md` for this repo.
- Add shared AI guidance for Codex, Cursor, Claude, and Copilot.
- Add rebuild docs covering architecture, tokens, Figma workflow, content, and CDN policy.
- Status: completed, ready for review

### Batch 2. Legacy cleanup and route pruning
- Remove legacy landing sections and legacy landing-page-only assets or helpers.
- Keep `/about_us` as a site page, and prune `/contact_us` with a redirect.
- Preserve `/privacy_policy` and `/terms_of_use`, but detach them from the old landing-page shell. Sign-in and sign-up live in the external Doow app.
- Status: completed, ready for review

### Batch 3. Figma extraction and design-system foundation
- Snapshot the Figma variables and key component instances needed for the rebuild.
- Create token layers and the first shared primitives.
- Status: foundation landed, now refined in place as sections ship

### Batch 4. CDN and asset pipeline
- Introduce the CDN asset contract, manifest layer, and environment variables.
- Remove the assumption that `public/` is the home for landing-page media.
- Status: in progress

### Batch 5. Shared app shell, metadata, and quality harness
- Build and harden the new shell, metadata, global styles, test harness, and visual review surface.
- Status: in progress

### Batch 6 onward. Section implementation
- Navbar or header
- Hero
- Demo or video section
- Feature split
- Finance control feature section
- Alternative apps comparison
- Doow AI spotlight
- Pricing
- FAQ
- Remaining product-story sections in Figma order
- Integrations
- Footer
- Status: in progress

### Final batch. Cross-page polish and launch prep
- Run final validation on metadata, routing, CDN behavior, image handling, analytics, and launch readiness.
- Status: pending

## Review Rule

If the current slice is a batch or section, only that slice should be changed in the repo unless a small supporting change is required to keep it coherent.
