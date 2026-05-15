# Mercury docs patterns for Doow

Research date: May 14, 2026.

This note captures the Mercury documentation patterns we inspected so Doow can
borrow finance-grade setup, permission, sandbox, recipe, and AI-agent patterns
without copying Mercury's product taxonomy.

## Pages reviewed

These pages were reviewed during the Mercury pass:

- `https://mercury.com/api`
- `https://docs.mercury.com/docs/welcome`
- `https://docs.mercury.com/docs/getting-started`
- `https://docs.mercury.com/docs/api-token-security-policies`
- `https://docs.mercury.com/docs/using-mercury-sandbox`
- `https://docs.mercury.com/docs/integrations-with-oauth2`
- `https://docs.mercury.com/docs/start-oauth2-flow`
- `https://docs.mercury.com/docs/obtain-the-tokens`
- `https://docs.mercury.com/docs/using-the-access-token`
- `https://docs.mercury.com/recipes`
- `https://docs.mercury.com/reference/getaccounts`
- `https://docs.mercury.com/docs/what-is-mercury-mcp`
- `https://docs.mercury.com/docs/connecting-mercury-mcp`
- `https://docs.mercury.com/docs/supported-tools-on-mercury-mcp`
- `https://docs.mercury.com/docs/security-best-practices`

## What Mercury is doing

Mercury's docs are reference-forward, but the surrounding guide pages do
important customer work. They explain who can create credentials, which token
type to choose, why sandbox credentials differ from production credentials, and
when a reader is connecting their own account versus building an OAuth
integration for shared customers.

Mercury also treats AI-agent access as a first-class surface. The marketing
page introduces API, CLI, and MCP as ways to automate financial operations. The
docs then explain MCP setup, read-only limits, OAuth login, supported tools,
session behavior, and security risks.

## Page jobs

| Page | Reader job | Pattern observed |
| --- | --- | --- |
| API marketing page | Understand what can be automated | Outcome-first product bridge: API, CLI, MCP, workflows, security, and sandbox |
| Welcome | Know what the API can do | Short overview with support path and next step |
| Getting Started | Create a token and make the first API call | Permission warning, token tiers, token storage, auth format, and sample calls |
| API Token Security Policies | Understand token lifecycle and risk | Downgrades, deletion, IP allow-listing, scopes, and least-privilege guidance |
| Sandbox | Test without moving real money | Separate sandbox account, sandbox token, sandbox base URL, and UI verification |
| OAuth2 integration overview | Know whether OAuth applies | Clear split between own-account setup and integrations built for Mercury customers |
| OAuth2 flow pages | Implement the authorization sequence | Stepwise protocol pages with scopes, state, PKCE, token exchange, refresh behavior, and bearer usage |
| Recipes | Complete common workflows | Task cards with step counts, inline code, language tabs, and "Open Recipe" flow |
| API reference | Look up exact endpoint facts | Endpoint method, URL, parameters, response schema, auth field, language tabs, and Try It panel |
| MCP overview and setup | Connect AI tools safely | Beta warning, OAuth setup, read-only scope, hosted-server statement, session lifetime, and supported tools |
| MCP security | Decide whether to trust the connection | Official endpoint, trusted clients, OAuth, read-access risk, prompt injection, and data handling |

## How Mercury connects to customers

Mercury connects by putting risk, access, and environment truth close to the
action. A reader does not have to discover later that they lack permission to
create an API token, used a production token against sandbox, or chose a
write-capable token that needs IP allow-listing.

Mercury also gives different reader types different paths. A customer who wants
to connect their own account starts with API tokens. A company building an
integration for Mercury customers starts with OAuth approval. A user connecting
an AI tool starts with MCP and OAuth, not raw API credentials.

That distinction is the important pattern for Doow. Our docs must not collapse
admins, engineers, IT/security reviewers, AI-agent users, provider-integrations
builders, and Doow Agent rollout owners into one generic "developer" reader.

## Strong patterns to borrow

### 1. Separate own-account setup from shared-customer integrations

Mercury's OAuth page says the OAuth2 flow is for companies building
integrations for Mercury customers. If the reader wants to connect their own
Mercury account, it routes them to Getting Started instead.

Doow equivalent:

- Provider setup pages should say whether the reader is connecting their own
  workspace, authorizing a customer workspace, or installing an agent for
  employees.
- SDK pages should say when the SDK is the right path and when a provider API
  or Doow Agent is a better fit.

### 2. Put permission blockers before setup

Mercury tells the reader that they may not see API-token creation unless their
user has the right permissions. It also explains that an admin controls this.

Doow equivalent:

- Every integration guide needs a "Before you start" block that names the
  required role: Doow admin, provider admin, workspace owner, IT admin,
  engineer, or employee.
- If a setup can fail because of role or workspace policy, say that before the
  first step.

### 3. Teach scope choice as a decision, not trivia

Mercury explains read-only, read-write, and custom tokens in the setup path.
It also tells readers to choose the smallest scope that fits the work.

Doow equivalent:

- Provider pages should show the minimum permissions needed for Doow to read
  usage data.
- Agent pages should distinguish read-only observation, activity collection,
  and any future control actions.
- SDK pages should name the smallest event payload needed for first success.

### 4. Make sandbox and production impossible to mix up

Mercury's sandbox guide separates sandbox environment, sandbox-created tokens,
sandbox base URLs, OAuth sandbox URL, and UI verification.

Doow equivalent:

- If Doow supports staging, sandbox, demo workspaces, or pilot mode, every
  relevant guide should say which environment the reader is in.
- Verification steps should say where test data appears in Doow.
- Production-impacting steps should be labeled before the user performs them.

### 5. Use recipes for real workflows

Mercury's recipe page shows concrete jobs such as sending an ACH payment,
retrieving accounts, retrieving recipients, creating recipients, and bulk
uploading documents. Each recipe exposes the number of steps and shows code in
language tabs.

Doow equivalent:

- Add workflow-style docs for jobs users actually perform:
  - Connect your first usage source.
  - Roll out Doow Agent to a pilot group.
  - Send your first SDK usage event.
  - Verify usage data is flowing.
  - Resolve unmapped apps.
- Keep endpoint, schema, and field detail in reference pages.

### 6. Keep reference exact and dense

Mercury's endpoint reference is not a guide. It gives method, URL, query
parameters, response fields, status codes, authentication, code samples, and a
Try It panel.

Doow equivalent:

- Setup pages should stay task-first.
- Event schemas, provider field mappings, API limits, sync intervals, and
  error codes should live in reference-like pages.
- Reference pages still need escape hatches back to setup guides.

### 7. Treat AI-agent access as a trust surface

Mercury's MCP docs do not stop at "connect this URL." They explain beta state,
hosted MCP, OAuth login, read-only access, session lifetime, supported tools,
official endpoint verification, prompt-injection risk, and data-retention
questions.

Doow equivalent:

- Doow Agent docs should explain what data is collected, where it runs, how it
  authenticates, what it cannot do, and how admins can revoke or limit access.
- Any AI-readable or agent-facing Doow docs should include trust boundaries and
  verification steps, not only installation commands.

### 8. Put recovery and support close to risk

Mercury tells readers what happens when tokens are downgraded, deleted, leaked,
or created with the wrong scopes. It also names support contact paths.

Doow equivalent:

- Troubleshooting should be tied to real failure states: missing permissions,
  wrong environment, stale token, no data after connection, blocked employee
  install, unsupported browser, or provider API scope missing.
- Support handoff should tell the reader which provider account, Doow
  workspace, user, timestamp, event, source, or error to collect.

## What not to copy

Doow should not copy Mercury's reference-first landing behavior. Opening a docs
site directly into an endpoint reference works for a narrow API audience, but
Doow's integration docs need to orient unsure admins and engineers first.

Doow should not make tiny pages that only contain one protocol fact unless they
are part of a clearly sequenced flow. Mercury's "Using the access token" page
is useful in context, but it would feel too thin if reached cold.

Doow should avoid realistic-looking secret values in examples. Use clear
placeholders such as `DOOW_API_KEY` or `YOUR_PROVIDER_TOKEN`.

## Doow decisions from Mercury

- Keep `/integrations` as a decision hub before exact setup pages.
- Add role and permission requirements before every setup flow.
- Separate "connect your own workspace" from "build/authorize an integration
  for customer workspaces."
- Add environment labels for pilot, sandbox, staging, and production wherever
  they apply.
- Use recipe-style workflow pages for real customer jobs.
- Keep setup guides separate from reference detail.
- For Doow Agent and AI-adjacent surfaces, document trust boundaries, data
  access, revocation, and verification near setup.
- Add support-ready troubleshooting sections that collect the facts support
  needs.

## Open questions for Doow

- Which integration paths are customer-admin setup versus engineer setup?
- Which provider integrations require approval before OAuth or token creation?
- Which Doow sources have sandbox, staging, demo, or pilot modes?
- Which Doow Agent capabilities are read-only today, and how should that be
  stated in docs?
- What support payload should each integration guide ask the user to collect?

## Next comparison target

Review Brex next if we want another finance-docs pattern for admin
permissions, accounting/expense integrations, and customer-facing setup.
Review Ramp again only when we need deeper partner-integration launch patterns.
