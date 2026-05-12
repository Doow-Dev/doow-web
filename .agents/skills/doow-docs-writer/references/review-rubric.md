# Review Rubric

Use this before finishing a docs writing or review task.

## Reader path

- The first screen says what the page helps the reader do.
- The reader can tell whether the page is for them.
- The next action is visible without reading the whole page.
- The page does not expose the full catalog before orienting unsure users.

## Cognitive load

- Sections are short and scoped to one job.
- Background concepts appear only when needed for the task.
- Tables are used for comparison or reference, not as a substitute for
  decision design.
- Repeated context is removed or moved to a hub/explanation page.

## Task completion

- The page lists prerequisites before credential or setup steps.
- Setup steps are imperative and ordered.
- The page explains how to confirm success.
- The page includes recovery paths for likely failures.
- Next steps point to the next useful task.

## Product truth

- Product behavior is verified from repo code, existing docs, or product/backend
  input.
- Unknown claims are marked for verification, not guessed.
- SDK/API details include only confirmed package names, env vars, endpoints,
  auth headers, event shapes, retry, batching, shutdown, and permission
  behavior.

## MDX and governance

- Frontmatter matches `apps/docs/src/lib/docs/schema.ts`.
- Links are valid docs routes or external URLs.
- Components are in the allowed MDX set.
- The page belongs in `apps/docs/content/docs`; blog content stays in
  `apps/web/content/blog`.
- Run `pnpm --filter @doow/docs check:content` after docs content edits.
