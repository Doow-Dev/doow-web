# Source Patterns

These are audited patterns to borrow deliberately. Do not use brand names as a
shortcut for taste.

## Diataxis

Source: https://diataxis.fr/

Pattern to borrow: organize documentation by user need, not by authoring
convenience. Separate tutorials, how-to guides, explanation, and reference.

Use in Doow:

- Classify every docs page before editing.
- Do not force a setup guide to also explain every concept.
- Do not force a reference page to behave like onboarding.

## Diataxis how-to guides

Source: https://diataxis.fr/how-to-guides/

Pattern to borrow: task guides are goal-oriented and action-focused.

Use in Doow:

- Provider pages should help the user connect, verify, and recover.
- Keep background detail short unless it directly affects the task.

## Clerk

Source: https://clerk.com/docs

Pattern to borrow: separate guides from reference and expose paths by user
goal, feature, and framework.

Use in Doow:

- Keep integration setup guidance separate from exact reference facts.
- Let the sidebar help users move from broad category to exact provider.

## Stytch

Source: https://stytch.com/docs/consumer-auth/overview

Pattern to borrow: overview pages route users from a broad product domain into
the exact task, model, or reference they need.

Use in Doow:

- `/integrations` should orient users before showing the provider catalog.
- Pages should make choices explicit before asking for technical setup.

## Stripe

Source: https://docs.stripe.com/api

Pattern to borrow: keep getting-started flows separate from precise API
reference. Make mode, version, object, and field facts explicit.

Use in Doow:

- Keep setup guides task-first.
- Put exact event shapes, config, permissions, and API details in reference-like
  sections or dedicated reference pages.

## Vercel

Source: https://vercel.com/docs

Pattern to borrow: overview pages can act as routing surfaces with get-started
paths, quick references, product areas, and deeper guides.

Use in Doow:

- Use hub pages to route, not merely introduce.
- Give users a short path to the most common next action.

## Firecrawl

Source: https://docs.firecrawl.dev/

Pattern to borrow: make docs useful to humans and AI agents with quickstarts,
copyable examples, API/SDK routes, raw docs, and `llms.txt`.

Use in Doow:

- Preserve AI-readable docs surfaces such as raw routes and `llms.txt`.
- Prefer copyable examples when setup requires code, payloads, or commands.
