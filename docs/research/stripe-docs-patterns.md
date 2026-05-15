# Stripe docs patterns for Doow

Research date: 2026-05-14

Source docs visited:

- Quickstart guide index: https://docs.stripe.com/quickstarts
- Development environment quickstart:
  https://docs.stripe.com/get-started/development-environment
- Accept a payment guide:
  https://docs.stripe.com/payments/accept-a-payment?platform=web&ui=stripe-hosted
- Connect onboarding quickstart:
  https://docs.stripe.com/connect/onboarding/quickstart
- Hosted onboarding guide:
  https://docs.stripe.com/connect/custom/hosted-onboarding
- API reference: https://docs.stripe.com/api
- LLM index: https://docs.stripe.com/llms.txt

## What Stripe is doing

Stripe's docs bridge a large, complex product surface by routing the reader
before implementation starts.

The best Stripe pages do not assume the reader already knows the right product,
integration type, language, or implementation depth. They first help the reader
pick a path, then show the exact task.

Stripe also gives users exits when they are in the wrong place. Many pages
surface "Not a developer?" near the top. The API reference links back to the
development quickstart. Legacy pages mark themselves as legacy before the user
spends time on them.

## Pages and jobs

| Stripe page | Reader job | Pattern |
|---|---|---|
| Quickstarts index | Pick the right integration guide | Groups quickstarts by job: payments, platforms/marketplaces, developer resources |
| Development environment | Set up CLI and SDKs | Starts with "Not a developer?", then shows what the reader will learn |
| Accept a payment | Choose and implement one payment path | Gives integration effort, integration type, customization level, setup, verification, troubleshooting, testing, and next options |
| Connect onboarding quickstart | Build a platform onboarding flow | Uses configurable guide controls for frontend, backend, account model, onboarding method, dashboard access, charge type, fees, and liability |
| Hosted onboarding guide | Understand a specific onboarding flow | Marks legacy status at the top, explains when the page applies, then gives flow details |
| API reference | Look up exact API behavior | Stays reference-like while giving escape hatches for beginners and no-code users |
| `llms.txt` | Route AI agents through the docs | Lists important docs and gives LLM-specific integration instructions |

## How Stripe connects to customers

Stripe connects by reducing the reader's uncertainty before asking for work.

It asks, implicitly or explicitly:

- Are you a developer?
- Are you trying to choose a product or implement one?
- Do you want hosted UI, embedded UI, or advanced control?
- Which language and framework are you using?
- Are you in sandbox/test mode or live mode?
- Are you using the current model or legacy behavior?
- What does success look like after this step?

That is the useful pattern for Doow. Our docs should not assume the reader
already knows whether they need Doow Agent, provider APIs, SDK events,
observability, identity, HRIS, or accounting. The docs must help them choose
before asking them to connect.

## Strong patterns to borrow

### 1. Route before setup

Stripe's quickstarts index does not start with API theory. It lists concrete
jobs:

- accept payments
- create subscriptions
- build a hosted checkout page
- build a Connect integration
- set up webhooks

Doow equivalent:

- Connect a usage source
- Roll out Doow Agent to a pilot group
- Connect identity
- Connect HRIS
- Connect accounting
- Send usage events from your app
- Verify data is flowing

### 2. Add "wrong reader" exits

Stripe repeatedly shows "Not a developer?" near technical docs. This keeps
non-technical users from feeling stuck in code.

Doow equivalent:

- On SDK pages, add a path for admins: "Not writing code? Use a provider API,
  Doow Agent, observability integration, or ask an engineer to install the SDK."
- On agent rollout pages, add a path for engineers: "Need custom product
  events instead? Use the Instrumentation SDK."
- On provider pages, add a path for cases where provider APIs do not show
  enough activity: "Need browser or desktop activity? Use Doow Agent."

### 3. Start with integration characteristics

Stripe's payment guide shows useful properties before code:

- integration effort
- integration type
- UI customization level

Doow equivalent:

Each connection guide can expose:

- effort: low, medium, high
- access needed: Doow admin, provider admin, engineer, IT/security
- data freshness: real time, scheduled sync, event based, agent activity
- best for: provider usage, browser activity, desktop activity, custom events
- verify by: detail page, latest usage record, event log, app/user match

This would help the reader understand what they are choosing without turning
the page into a technical article.

### 4. Make guides configurable when paths diverge

Stripe's Connect quickstart changes based on frontend, backend, account model,
onboarding method, dashboard access, charge type, fee responsibility, and
negative balance liability.

Doow equivalent:

Most Doow pages should stay simple. But configurable guide controls may make
sense for:

- SDK language: Node, Python, serverless, sidecar, CLI
- Agent rollout: pilot, managed deployment, manual install
- Provider setup: direct API key, OAuth, cloud account, service account
- Environment: sandbox, staging, production

The pattern is not "make every page interactive." The pattern is "when the
setup truly changes by path, let the user choose before the steps."

### 5. Prove success before going deeper

Stripe's payment guide has "Confirm your endpoint," "Verify your integration,"
"Show a success page," "Handle post-payment events," and "Test your
integration." It does not stop at "paste this code."

Doow equivalent:

Every setup guide should include:

- what the user should see in Doow
- where to see it
- what record, user, app, account, project, or event should appear
- what to check if the page says connected but no data appears

For Doow Agent:

- one pilot user appears
- one expected browser or desktop app appears
- the integration detail page shows recent activity
- unresolved apps are visible for mapping, not silently dropped

### 6. Keep reference separate from onboarding

Stripe's API reference is dense, exact, and mode-aware. It explains API
version, authentication, errors, pagination, idempotency, metadata, request IDs,
connected account headers, and sandbox/live mode.

It is not pretending to be a quickstart.

Doow equivalent:

- Setup pages should stay task-first.
- Exact event schemas, API fields, permissions, config flags, sync intervals,
  and limits should live in reference-like sections or dedicated reference
  pages.
- Reference pages should still give escape hatches back to quickstarts.

### 7. Tell the truth early

Stripe marks legacy pages as legacy at the top. It also gives test/live mode
and API version information early in the API reference.

Doow equivalent:

- If a provider is beta, private, manual approval, workspace-gated, or not
  available for every customer, say so at the top.
- If Desktop Agent platform availability differs by workspace, say that before
  installation steps.
- If a guide assumes production access or a pilot rollout, say that before the
  first step.

### 8. Docs for humans and agents

Stripe supports "Copy for LLM," "View as Markdown," and `llms.txt`.

Doow equivalent:

- Keep raw/Markdown docs readable.
- Keep `llms.txt` current.
- Add agent instructions for which pages are guides, which are reference, and
  when to avoid inventing product behavior.

## What not to copy

Stripe's pages can become very dense because they support many products,
languages, and choices. Doow should not copy that density unless the user truly
needs it.

The configurable guide pattern is powerful, but it should be reserved for
places where the setup actually changes. Otherwise it adds cognitive load.

## Doow decisions from Stripe

- Add chooser pages before exact setup pages.
- Add wrong-reader exits near technical pages.
- Put integration characteristics before setup steps when users need to choose.
- Add first-success and verification sections to every setup guide.
- Keep API/reference facts separate from rollout/setup guidance.
- Say beta, legacy, private, or workspace-gated status at the top.
- Maintain `llms.txt`, raw docs, and clear AI-readable routing.

## Next comparison target

After Stripe, compare Stytch. Stytch should help us understand hub pages,
authentication-style concept routing, and how to orient users before the
catalog of implementation options.
