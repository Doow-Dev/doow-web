# Ramp docs patterns for Doow

Research date: 2026-05-14

Source docs visited:

- Ramp Developer API shell: https://docs.ramp.com/developer-api/
- Ramp machine-readable index: https://docs.ramp.com/llms.txt
- Ramp welcome guide export: https://docs.ramp.com/llms-guides/introduction.txt
- Ramp quickstart guide export: https://docs.ramp.com/llms-guides/getting-started.txt
- Ramp authorization guide export: https://docs.ramp.com/llms-guides/authorization.txt
- Ramp bill payments guide export: https://docs.ramp.com/llms-guides/bill-payments.txt
- Ramp partner integrations guide export: https://docs.ramp.com/llms-guides/build-with-ramp.txt
- Ramp sandbox guide export: https://docs.ramp.com/llms-guides/sandbox.txt
- Ramp help article for accessing the Developer API:
  https://support.ramp.com/hc/en-us/articles/46681939909907-Accessing-the-Developer-API

## What Ramp is doing

Ramp bridges the gap between product, admin, developer, partner, and AI-agent
users by separating the surfaces they need.

The help center page handles the admin path: what the Developer API is, where
to create an app in the Ramp dashboard, which grant type and scopes to choose,
how sandbox differs from production, and where to get support.

The developer docs handle implementation depth: quickstart, authorization,
product guides, use cases, conventions, API reference, OpenAPI, and machine
readable exports.

The `llms.txt` surface is explicit about how agents should read Ramp docs. It
tells agents not to scrape the JavaScript shell and points them to guide
exports, API exports, full exports, and OpenAPI. This is not an afterthought;
it is part of the docs architecture.

## Pages and jobs

| Ramp page | Reader job | Pattern |
|---|---|---|
| Help article: Accessing the Developer API | Admin wants credentials and a support path | Starts inside the product UI: Settings / Developer / create app / choose scopes / copy credentials |
| `llms.txt` | AI agent or developer needs the right docs source | Gives routing rules for guides, API reference, OpenAPI, and full exports |
| Welcome | Reader needs to know where to start | Splits docs into use cases, products, conventions, and reference |
| Quickstart | Developer needs first success | Assumes admin access, creates app credentials, requests token, calls Transactions API |
| Authorization | Developer needs permission model | Explains flows, scopes, token security, errors, and role constraints |
| Sandbox | Developer needs safe testing | Separates sandbox and production URLs, credentials, and test actions |
| Bill Payments | Developer needs to build a real workflow | Starts with the outcome, success state, prerequisites, scopes, verification, edge cases, and next resources |
| Partner Integrations | Partner needs to launch publicly | Defines responsibilities, review phases, support ownership, security expectations, and documentation expectations |

## How Ramp connects to customers

Ramp does not assume one reader.

It speaks to:

- the admin who can create apps and approve access
- the developer who needs tokens, scopes, API calls, and errors
- the partner who needs review, security, launch, and support expectations
- the AI agent that needs machine-readable docs
- the customer support path when something is unclear

This is the main lesson for Doow. Our docs should not collapse every reader
into "developer." Some Doow pages are for admins choosing what to connect.
Some are for engineers wiring an SDK. Some are for security or IT reviewing an
agent rollout. Some are for AI agents reading `llms.txt`.

## Strong patterns to borrow

### 1. Separate access from implementation

Ramp does not bury "create credentials" inside an API reference. The help
article gives admins a clear in-product path:

1. Go to the Developer area.
2. Create an app.
3. Choose grant type.
4. Choose scopes.
5. Copy credentials.
6. Continue to token generation.

Doow equivalent:

- Docs should have a clear "Before rollout" or "Before connecting" section for
  each integration family.
- The page should say who needs admin access, where in Doow or the provider UI
  to go, which scopes/permissions are needed, and what artifact the reader
  should leave with.

### 2. Start guides with a first success state

Ramp quickstart says the reader will create an access token and retrieve
transaction data. That is a concrete finish line.

Doow equivalent:

- Browser Agent: "By the end, one pilot user should show recent browser
  activity in Doow."
- Desktop Agent: "By the end, one pilot user should show recent desktop app
  activity in Doow."
- Provider API: "By the end, Doow should show the latest usage records for the
  provider account."
- SDK: "By the end, Doow should receive one test usage event from your app."

### 3. Make sandbox and production impossible to confuse

Ramp repeats that sandbox and production have different base URLs and
credentials. It also explains that sandbox is separate, not a mode inside
production.

Doow equivalent:

- If Doow has staging, sandbox, test credentials, demo data, or customer pilot
  environments, each relevant guide should say exactly which environment the
  reader is using.
- Do not let a setup page leave the reader guessing whether they are testing
  safely or touching production data.

### 4. Put security where the decision happens

Ramp puts scopes, token storage, sensitive scopes, role requirements, and
support paths near authorization and setup. It does not hide them in a generic
security page only.

Doow equivalent:

- Agent rollout pages should keep privacy and permissions close to rollout
  steps.
- Provider setup pages should put required scopes near the step where the user
  creates credentials.
- Security notes should be short, concrete, and tied to an action.

### 5. Use workflow guides, not only endpoint/provider pages

Ramp's Bill Payments guide is not just "Bills API reference." It says what the
workflow accomplishes, what the reader will have by the end, what scopes and
configuration are required, how to verify IDs, how to recover when a bank
account is missing, and which related guides matter next.

Doow equivalent:

- Keep provider reference facts out of setup guides unless they help the task.
- Add workflow-style guides for jobs users actually have:
  - "Connect your first usage source"
  - "Roll out Doow Agent to a pilot group"
  - "Verify usage data is flowing"
  - "Map unresolved apps"
  - "Connect identity after usage"

### 6. Support and docs are part of one path

Ramp explicitly tells users how to submit a Developer API support ticket and
how to use Developer Assist inside the docs.

Doow equivalent:

- Troubleshooting sections should say what information to collect before
  contacting support.
- For integration pages, include the detail page, event log, user, app,
  provider account, timestamp, and error message when relevant.
- If Doow adds an assistant, docs should tell users when to use it and what it
  can answer.

### 7. Docs are built for humans and agents

Ramp publishes:

- `llms.txt`
- guide exports
- API reference export
- full export
- OpenAPI spec

Doow equivalent:

- Keep `llms.txt` and raw docs pages current.
- Make sure guide pages are readable without UI-only context.
- Add explicit routing guidance for agents: when to read guides, when to read
  API/reference pages, and when a claim needs product verification.

## What not to copy

Ramp's guide exports are highly compressed plain text. That is useful for
agents but not enough as human-facing prose. Doow should borrow the content
architecture, not the compressed style.

Some Ramp pages are very dense because the API surface is broad. Doow should
avoid density unless the page is truly a reference page.

## Doow decisions from Ramp

- Keep admin setup separate from implementation depth.
- Every setup guide needs a first success state.
- Put environment, credential, scope, and permission facts before the user
  starts setup.
- Keep privacy/security notes next to rollout actions.
- Use workflow pages for real user jobs, not only provider pages.
- Publish and maintain AI-readable docs surfaces.
- Troubleshooting should collect support-ready facts, not just list generic
  failure modes.

## Next comparison target

After Ramp, compare Stripe. Stripe is likely the best source for decision
routing and integration-option chooser pages.
