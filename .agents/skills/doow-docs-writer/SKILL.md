---
name: doow-docs-writer
description: Use when writing, editing, reviewing, restructuring, or planning Doow docs pages, docs MDX, integrations guides, docs navigation, docs content quality, docs IA, or docs production-readiness work for docs.doow.co.
---

# Doow Docs Writer

Use this skill for Doow documentation work in `apps/docs`. It is scoped to
docs.doow.co, not blog posts, marketing pages, PRDs, or generic copywriting.

The goal is not "nice writing." The goal is a reader path from confusion to a
completed task, with product truth preserved.

## First pass

Before writing or editing:

1. Read the relevant docs page and nearby pages.
2. Check `apps/docs/src/lib/docs/navigation.ts` when IA or sidebar placement
   may change.
3. Check `apps/docs/src/lib/docs/schema.ts` before changing frontmatter.
4. Check `apps/docs/src/lib/docs/mdx-config.ts` and
   `apps/docs/src/components/docs/mdx-components.tsx` before using components.
5. If technical behavior is unclear, inspect source code or mark the claim as
   needing product/backend verification. Do not invent behavior.

## Classify the page

State the page type before drafting:

- **Tutorial**: teaches a learner through a safe path.
- **How-to guide**: helps a user complete a real task.
- **Explanation**: explains concepts, tradeoffs, or mental models.
- **Reference**: gives precise facts, fields, options, APIs, or limits.
- **Decision guide**: routes unsure users to the right next task.

Default classifications for Doow:

- Provider setup pages are how-to guides.
- `/integrations` and chooser pages are decision guides.
- SDK setup pages are how-to guides with reference-like facts.
- Concept pages such as "how integrations work" are explanations.
- API, config, field, or event-shape pages are references.

Read `references/page-types.md` when the page type is unclear.

## Define the reader job

Before editing, write a one-sentence working note for yourself:

```text
This page helps [reader] do [job] so they can [success state].
```

Also identify what the reader likely does not know yet. If that uncertainty is
high, orient them before listing providers, fields, or implementation details.

## Structure Doow integration docs

Use this rhythm for integration docs:

```text
Orient the user
-> help them choose
-> guide exact setup
-> prove the setup worked
-> help them recover from errors
-> tell them what to connect next
```

For integration-specific structures, read
`references/doow-docs-patterns.md`.

For integration strategy, page framing, headings, and production readiness,
read `references/connection-source-docs-dna.md`. Use it before sweeping
integration pages, hub pages, chooser pages, or source-category pages.

## Use approved MDX components

Doow docs currently allow:

`Callout`, `Steps`, `Card`, `Cards`, `CodeBlock`, `Tabs`, and `Tooltip`.

Use components to reduce cognitive load, not to decorate prose. Read
`references/mdx-components.md` before adding or replacing MDX components.

## Source patterns

Borrow exact patterns, not brand vibes. If you reference a source such as
Diataxis, Clerk, Stytch, Stripe, Vercel, Firecrawl, Ramp, Mercury, or Brex,
name the specific pattern being applied.

Read `references/source-patterns.md` when planning a docs architecture,
navigation, page-type, or quality pass.

## Review bar

Before finishing a docs change, run the review in
`references/review-rubric.md`. The minimum bar:

- The first screen explains why the reader is here.
- The next action is obvious.
- The page does not introduce unrelated concepts before the first useful step.
- Claims are product-true or explicitly marked for verification.
- The page tells the reader how to confirm success.
- The page gives recovery paths for common failures.
- Next steps point to the next useful task, not generic exploration.

## Finishing pass

Structure alone does not produce tasteful docs. After the structural review,
run the five prose checks from `references/prose-rules.md`:

1. First sentence matches the page-type recipe.
2. No banned phrases without justification.
3. Paragraph rhythm: one idea per paragraph, four sentences max.
4. Every sentence helps the reader choose, connect, verify, recover, or
   continue. Cut the rest.
5. Voice matches a Doow anchor (Stytch for hubs, Stripe for reference).

Use the thin-page detector in `references/prose-rules.md` when sweeping
existing pages for stubs.

## Verification

After changing docs content, run:

```bash
pnpm --filter @doow/docs check:content
```

For broader docs UI, navigation, or build-impacting changes, also run:

```bash
pnpm --filter @doow/docs build
```
