# Prose Rules

The structural skill files keep a page from being broken. These rules keep a
page from being stiff, bloated, or AI-flavored.

Run these checks as the finishing pass before marking a docs change complete.

## Doow voice

Doow docs voice is clear, direct, calm, technical, and helpful. Not marketing
register. Not assistant-friendly chatter. Not pure reference deadpan.

Voice anchors:

- Stytch `stytch.com/docs/get-started/overview` for hub and orientation pages.
  Borrow the move where the page orients the reader before exposing the full
  catalog of options.
- Stripe `docs.stripe.com/api` for reference pages. Borrow the move where
  modes, versions, fields, requirements, and defaults are explicit and
  scannable rather than buried in narrative.

A Doow sentence sounds like:

```text
Doow reads token usage and request counts from your OpenAI organization.
```

Not like:

```text
Doow seamlessly leverages powerful OpenAI integration capabilities to
unlock comprehensive token usage insights across your organization.
```

If a sentence sounds proud of itself, rewrite it.

## First-sentence recipe

The opening sentence is the highest-leverage edit on every page. The recipe
depends on the page type. Page types are defined in `page-types.md`.

### How-to guide (provider setup, SDK setup, recovery)

```text
Connect [thing] to [outcome] in Doow.
```

Examples:

- "Connect OpenAI to bring model usage into Doow."
- "Connect Datadog to pull custom metrics and event counts into Doow."
- "Use the Node SDK when you want to emit usage events from your application."

### Decision guide (chooser pages, integrations hub)

```text
Use this page to [decision]. If unsure, start with [recommended path].
```

Examples:

- "Use this page to choose a usage source. If unsure, start with the direct
  provider API for your largest provider."
- "Use this page to decide what to connect first. If unsure, connect one usage
  source and one identity provider."

### Explanation (concept pages, "how X works")

```text
[Concept] is [definition]. It exists because [problem].
```

Examples:

- "An integration is a connection between Doow and a system you already use.
  It exists so Doow can read data instead of asking you to enter it by hand."
- "First sync is the initial pull Doow runs after you connect a source. It
  exists so the rest of the product has data to work with before scheduled
  syncs kick in."

### Reference (fields, events, permissions, limits)

```text
This page lists [exact thing]. Use it when [task].
```

Examples:

- "This page lists every field Doow imports from HRIS providers. Use it when
  mapping employee data to internal systems."
- "This page lists the webhook events Doow emits. Use it when wiring Doow into
  a downstream system."

## Paragraph rhythm

- One idea per paragraph.
- Lead with the outcome, not the setup.
- Cap paragraphs at four sentences. If you need more, split the section.
- Prefer specific nouns: "token usage and request counts" beats "data" or
  "usage information."
- Prefer concrete verbs: "import," "read," "verify," "match," "flag" beat
  "leverage," "utilize," "enable," "facilitate."
- Active voice. "Doow reads X" beats "X is read by Doow."

## Subtraction discipline

The hard rule:

> If a sentence does not help the reader choose, connect, verify, recover, or
> continue, cut it.

Those are the five reader jobs from the integration rhythm in
`doow-docs-patterns.md`. If a sentence does not advance one of them, it is
filler. Filler kills tasteful docs faster than any other failure mode.

Common cuttable patterns:

- Restating what the section heading already said.
- Praising the product ("Doow makes this easy").
- Explaining the obvious ("You will need an account").
- Repeating context the previous paragraph established.
- Hedging ("Note that you may want to consider...").

## Banned and suspicious phrases

These almost always signal weak thinking. Search the page for each one before
finishing.

Always cut:

- `just` (as in "just paste the key")
- `simply` (as in "simply navigate to settings")
- `easily` (as in "easily configure")
- `seamlessly`
- `powerful`
- `robust`
- `streamline`
- `leverage`
- `unlock`
- `utilize` (use "use")
- `comprehensive`
- `cutting-edge`
- `world-class`
- `best-in-class`

Needs justification (sometimes signals an actual option, sometimes filler):

- `you can` (often filler before an action verb. "You can connect..." -> "Connect...")
- `it is important to` (usually filler. State the thing.)
- `note that` (usually filler. State the thing.)
- `feel free to` (always filler.)

Run a final grep before commit:

```bash
LC_ALL=C rg -n "\b(just|simply|easily|seamlessly|powerful|robust|streamline|leverage|unlock|utilize|comprehensive)\b" apps/docs/content/docs
```

## Before and after

### Example 1: marketing register

Weak:

```text
You can simply connect OpenAI to seamlessly sync powerful usage insights
into Doow, unlocking comprehensive visibility across your organization.
```

Better:

```text
Connect OpenAI to import daily token usage, request counts, models, and
project data into Doow.
```

What changed: cut `simply`, `seamlessly`, `powerful`, `unlocking`,
`comprehensive`. Named the actual fields. Removed "You can" before the action
verb.

### Example 2: filler before the action

Weak:

```text
It is important to note that before you can connect Datadog, you will first
need to make sure that you have an API key with the appropriate scope.
```

Better:

```text
Before connecting Datadog, get an API key with read access to metrics.
```

What changed: cut `It is important to note that`, `you will first need to
make sure`, `appropriate`. Stated the requirement directly.

### Example 3: vague nouns

Weak:

```text
Doow can read various data and capabilities from your HR system to help
provide insights into your organization.
```

Better:

```text
Doow reads employee names, work emails, departments, job titles, employment
status, and start and end dates from your HRIS.
```

What changed: replaced `various data and capabilities` and `insights into
your organization` with the actual field list.

### Example 4: praising the product

Weak:

```text
Doow makes it incredibly easy to manage software spend through our intuitive
and powerful platform that streamlines your workflow.
```

Better:

```text
Doow groups software spend by vendor, owner, department, and contract so
finance can review it monthly.
```

What changed: cut all praise. Named the grouping dimensions. Named the user.
Named the cadence.

### Example 5: passive and abstract

Weak:

```text
After the integration has been successfully established, data will be
synchronized on a regular basis and made available within the platform.
```

Better:

```text
After you connect the integration, Doow syncs new data every hour and shows
it on the integration detail page.
```

What changed: active voice. Named the actor (Doow). Named the cadence (every
hour). Named the surface (integration detail page).

### Example 6: explanation drifting into reference

Weak:

```text
Integrations work by connecting Doow to external systems via secure OAuth
flows or API keys. Currently supported providers include BambooHR, Gusto,
Deel, Zoho People, Google Workspace, Microsoft 365, Okta, OneLogin, OpenAI,
Anthropic, Datadog, New Relic, AppSignal, Sentry, AWS Bedrock, Azure
OpenAI, and Google Vertex AI.
```

Better:

```text
An integration is a connection between Doow and a system you already use.
Doow reads data from that system on a schedule so you do not have to enter
it by hand.
```

(The provider list belongs on the integrations hub, not in the concept
explanation. Page type drift is the underlying bug.)

## Anti-pattern catalog

Do not do these. Each one shows up in AI-written docs.

- Do not open with feature lists. Open with what the page helps the reader
  do.
- Do not explain internals before the task. The reader wants to act, then
  understand.
- Do not hide required setup info in tooltips. Tooltips are for short
  definitions, not for hiding a required scope.
- Do not let a how-to guide turn into a reference dump. If a page accumulates
  more than two reference tables, split it.
- Do not use callouts as decoration. Each callout should warn, emphasize a
  success state, or capture a risk.
- Do not say "confirm it worked" without describing what visible success
  looks like. Vague verification is a tell that the writer did not test.
- Do not write next steps that point to generic exploration ("explore the
  docs"). Next steps should name the next task.
- Do not reference or compare to another skill, library, competitor's docs,
  or framework without inspecting the source first. Naming the specific
  pattern with the file location is allowed. Vibe-claims like "this is
  basically like X" are not. This rule is the prose-layer version of
  `source-patterns.md` "Borrow exact patterns, not brand vibes."

## Thin-page detector

A page is thin when it lacks the structure its page type promises. Use these
criteria when sweeping the docs.

### Provider setup page is thin if missing any of:

- When to use this
- What Doow reads
- What Doow does not read
- Before you start (prerequisites)
- Setup steps
- Confirm the sync worked (with a visible success state)
- Troubleshooting (with at least three rows)
- Disconnecting
- Next steps

### SDK or instrumentation page is thin if missing any of:

- When to use this method
- What this sends to Doow
- Install or configure
- Send a minimal test event
- Confirm Doow received it
- Production considerations
- Next steps

### Decision guide is thin if missing any of:

- What decision this page helps with (first paragraph)
- Recommendation for unsure users
- At least two outcome cards
- Next page to read for each outcome

### Explanation page is thin if missing any of:

- The concept stated and defined
- Why the concept exists (the problem it solves)
- How the parts relate
- Where to go next

### Reference page is thin if missing any of:

- What this reference covers (first paragraph)
- The fields, options, or events themselves
- Constraints and defaults
- At least one concrete example

A thin page should be marked for completion before merging, not published as
a stub.

## Finishing pass checklist

Run these five checks before marking a page complete. Each maps to a section
above.

1. First sentence matches the page-type recipe.
2. No banned phrases without justification. (Run the grep above.)
3. Paragraph rhythm holds: one idea per paragraph, four sentences max.
4. Every sentence helps the reader choose, connect, verify, recover, or
   continue. Cut the rest.
5. Voice matches a Doow anchor (Stytch for hubs, Stripe for reference).

If a check fails, fix the page before running `pnpm --filter @doow/docs
check:content`.
