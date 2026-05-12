# Integrations docs content readiness audit

Date: 2026-05-11

## Purpose

This audit captures the current content-readiness state of the imported
integrations docs before we edit the docs pages themselves. The goal is to
check whether the docs help users complete real tasks, avoid cognitive
overload, and understand how each page fits into the broader integration
journey.

No implementation work is included in this document.

## Refined direction

The integrations docs must be guide-first, not reference-first.

Users may arrive at the docs without knowing what Doow needs, what
“integrations” means in this product, or which source they should connect.
The docs cannot start by assuming the user already knows they need “OpenAI,”
“HRIS,” “direct provider APIs,” or “observability.” The first job is to orient
the user, then help them choose, then guide them through setup.

The intended user journey is:

```txt
Confused user
└─ What does Doow need from me?
   └─ Doow needs usage data, organization data, and financial data.
      └─ What should I connect first?
         └─ Choose based on the outcome you want.
            └─ Pick the matching integration path.
               └─ Follow the provider-specific setup guide.
                  └─ Confirm the sync worked.
```

This means `/integrations` should behave as a decision guide, not a catalog.
The catalog is still useful, but it should come after orientation.

## Target guide structure

```txt
Integrations
├─ Start here
│  ├─ What Doow needs
│  ├─ Choose what to connect first
│  └─ How integrations work
├─ Usage data
│  ├─ Choose a usage data source
│  ├─ Direct provider APIs
│  ├─ Instrumentation SDK
│  └─ Observability
├─ Organization data
│  ├─ Identity providers
│  └─ HRIS
└─ Financial data
   └─ Accounting
```

The current imported pages should be upgraded into setup guides. They should
not be treated as dry reference pages. A user should be able to arrive at a
provider page with a goal and leave with a connected, verified integration.

## Current corpus

The live docs corpus now contains only the imported integrations content:

- 35 published MDX pages.
- 35 search records.
- Top-level docs route redirects to `/integrations`.
- The sidebar now reflects the source hierarchy:
  - Integrations.
  - Usage data.
  - Organization data.
  - Financial data.

## Current content tree

```txt
Integrations
├─ Overview
├─ Connecting integrations
├─ Usage data
│  ├─ Direct provider APIs
│  │  ├─ AI providers
│  │  │  ├─ OpenAI
│  │  │  ├─ Anthropic
│  │  │  ├─ Groq
│  │  │  ├─ Fireworks AI
│  │  │  ├─ OpenRouter
│  │  │  ├─ Replicate
│  │  │  └─ Authress
│  │  └─ Cloud platforms
│  │     ├─ AWS Bedrock
│  │     ├─ Azure OpenAI
│  │     └─ Google Vertex AI
│  ├─ Instrumentation SDK
│  │  ├─ Node.js SDK
│  │  ├─ Sidecar
│  │  ├─ Serverless
│  │  └─ CLI / Daemon
│  └─ Observability
│     ├─ Platform pull
│     │  ├─ Datadog
│     │  ├─ New Relic
│     │  ├─ AppSignal
│     │  └─ Sentry
│     └─ OTLP push
├─ Organization data
│  ├─ Identity providers
│  │  ├─ Google Workspace
│  │  ├─ Microsoft 365
│  │  ├─ Okta
│  │  ├─ OneLogin
│  │  └─ Zoho
│  └─ HRIS
│     ├─ BambooHR
│     ├─ Gusto
│     ├─ Deel
│     └─ Zoho People
└─ Financial data
   └─ Accounting
```

## Readiness verdict

The information architecture is now strong enough to support users. The content
itself is a useful base, but it is not fully production-ready as user guidance.

The current pages mostly explain what Doow reads and how to connect. They do
not consistently help users decide which integration path to choose, confirm
that a connection worked, understand what to do after setup, or recover from
common failures.

The main gap is not only missing detail. The main gap is missing orientation.
Users need a front door that answers:

- What data does Doow need?
- What should I connect first?
- Which connection path matches my goal?
- What does success look like after setup?

Overall readiness: **65-70%**.

## P0 issues

### Missing front-door orientation

The docs currently move too quickly from “Integrations” to lists of providers
and technical connection methods. That works for users who already know what
they want to connect, but it fails users who arrive with a broader question
such as:

- How does Doow get enough data to work?
- Do I start with OpenAI, Okta, BambooHR, accounting, or something else?
- What is the minimum useful setup?
- Which integration unlocks usage visibility?
- Which integration unlocks owner, department, or spend attribution?

The hub page needs to answer these questions before it presents the full
catalog.

### Missing task frame on most pages

Most provider pages explain credentials and setup steps, but they do not
consistently answer:

- When should I use this integration?
- What will I have after I complete this setup?
- Where will the data appear inside Doow?
- Who needs to perform this task?
- What access level do they need before starting?

Affected examples:

- `apps/docs/content/docs/integrations/usage/direct-provider-apis/openai.mdx`
- `apps/docs/content/docs/integrations/hris/bamboohr.mdx`
- `apps/docs/content/docs/integrations/accounting/index.mdx`

### Missing verification path after connection

Most provider pages end with `Disconnecting`. That is not the right user
journey ending. A user who just connected something needs to confirm that the
connection worked.

Each connection page needs a section such as:

- Confirm the sync worked.
- Expected first sync time.
- Where to see imported data.
- What an empty result means.
- What to do if credentials are accepted but no data appears.

### SDK pages need technical validation before production trust

The SDK and instrumentation pages are the highest-risk content because they
include concrete package names, APIs, environment variables, wrappers, endpoint
behavior, event shape, retries, and shutdown behavior.

Affected pages:

- `apps/docs/content/docs/integrations/usage/instrumentation-sdk/nodejs.mdx`
- `apps/docs/content/docs/integrations/usage/instrumentation-sdk/serverless.mdx`
- `apps/docs/content/docs/integrations/usage/instrumentation-sdk/sidecar.mdx`
- `apps/docs/content/docs/integrations/usage/instrumentation-sdk/cli.mdx`

These pages are useful only if backend and SDK owners confirm every concrete
technical claim.

### Integrations hub is helpful but overloaded

The hub page has many links and tables. It helps discovery, but it does not
guide decisions strongly enough.

The page needs a clearer chooser:

- I am not sure what to connect first.
- I want to pull usage from a provider.
- I want to emit usage from my app.
- I already have metrics in Datadog or another observability platform.
- I want identity or employee context.
- I want finance-grade spend data.

Affected page:

- `apps/docs/content/docs/integrations/index.mdx`

### Connecting integrations page has too much packed into one flow

The connection overview is valuable, but it combines OAuth, client credentials,
HRIS, accounting, usage API keys, observability, pausing, syncing, and
disconnecting in one long page.

Affected page:

- `apps/docs/content/docs/integrations/connect.mdx`

This page needs stronger scannability, summaries, and links into the exact
provider pages users need.

## P1 issues

### Category overview pages are too thin

The overview pages need to do more than list sub-pages. They should explain how
to choose between available options and what tradeoffs each path has.

Affected pages:

- `apps/docs/content/docs/integrations/usage/direct-provider-apis/index.mdx`
- `apps/docs/content/docs/integrations/usage/observability/index.mdx`
- `apps/docs/content/docs/integrations/usage/instrumentation-sdk/index.mdx`

### No consistent page ending pattern

Most pages end with `Disconnecting`, `Notes`, or another operational detail.
Production docs should end by moving the user forward.

Recommended ending:

```txt
## Next steps

- Confirm the sync worked.
- Open the relevant Doow data view.
- Connect the next related source.
- Troubleshoot common setup issues.
```

### No troubleshooting sections

The docs are missing common recovery paths. Users will likely need help with:

- Invalid API key.
- Missing admin scope.
- Popup blocked.
- Empty sync result.
- Wrong organization or workspace.
- Revoked token.
- First sync still pending.
- Provider rate limits.
- Credential accepted but no usage data returned.

### Some language is still too internal

Terms such as `metered event ledger` may not map to a visible product concept.
If the user cannot see that term in Doow, the docs should use simpler product
language such as “usage events in Doow.”

### Accounting provider list may create trust risk

The accounting page lists several providers:

- QuickBooks Online.
- Xero.
- FreshBooks.
- NetSuite.
- Sage Intacct.
- Microsoft Dynamics 365 Business Central.

If all of these are live, the list is fine. If some are not live, the page can
mislead customers and should be tightened before publication.

## P2 polish

- Replace `e.g.` with “for example.”
- Add “provider UI may vary” notes where provider dashboards change often.
- Add “last verified” metadata or callouts for provider setup flows.
- Make navigation tables more decision-oriented.
- Add short prerequisites summaries near the top of every provider page.
- Standardize the names of common product areas, especially
  **Company Settings → Integrations** and **My connections**.

## Recommended provider page template

Each provider page should follow this structure:

```txt
Overview
Before you start
When to use this integration
What Doow reads
What Doow does not read
How to connect
Confirm the sync worked
Troubleshooting
Disconnecting
Next steps
```

The page should read as a setup guide. The user outcome is not “learn facts
about the provider.” The user outcome is “connect this source and confirm Doow
is receiving useful data.”

## Recommended SDK page template

Each instrumentation page should follow this structure:

```txt
Overview
Choose this method when
Before you start
Install or configure
Send a test event
Confirm the event arrived
Production checklist
Troubleshooting
Next steps
```

## Recommended implementation order

1. Rewrite `/integrations` as the front-door decision guide.
2. Add or reshape “What Doow needs” and “Choose what to connect first.”
3. Add a “recommended first setup” path for users who are not sure where to
   start.
4. Strengthen Usage data as a choice guide between provider APIs,
   instrumentation, observability, and OTLP.
5. Validate SDK and instrumentation claims with backend and SDK owners.
6. Add the missing confirmation and troubleshooting pattern across all pages.
7. Restructure `integrations/connect` for scan-first navigation.
8. Strengthen category overview pages so users can choose a path.
9. Apply the provider page template to all provider-specific pages.
10. Apply the SDK page template to SDK, sidecar, serverless, CLI, and OTLP
    pages.
11. Run content checks, typecheck, lint, and a browser review.

## Do not implement yet

This document is only the content readiness audit and rewrite plan. Do not edit
the live MDX pages until the team confirms the rewrite direction.
