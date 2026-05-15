# Brex docs patterns for Doow

Research date: May 14, 2026.

This note captures the Brex documentation patterns we inspected so Doow can
borrow production-readiness, role, scope, support, webhook, and AI-agent
patterns without copying Brex's spend-management taxonomy.

## Pages reviewed

These pages were reviewed during the Brex pass:

- `https://developer.brex.com/`
- `https://developer.brex.com/guides/quickstart`
- `https://developer.brex.com/guides/authentication`
- `https://developer.brex.com/guides/partner_authentication`
- `https://developer.brex.com/guides/roles_permissions_scopes`
- `https://developer.brex.com/guides/checklist`
- `https://developer.brex.com/guides/webhooks`
- `https://developer.brex.com/guides/rate_limits`
- `https://developer.brex.com/guides/error_codes`
- `https://developer.brex.com/guides/versioning`
- `https://developer.brex.com/guides/api-launch-stages`
- `https://developer.brex.com/openapi/expenses_api`
- `https://developer.brex.com/openapi/team_api`
- `https://developer.brex.com/openapi/team_api/users`
- `https://developer.brex.com/docs/mcp`
- `https://developer.brex.com/docs/postman`
- `https://developer.brex.com/docs/support`
- `https://developer.brex.com/examples/onboarding_examples`

## What Brex is doing

Brex uses a compact developer hub, then separates guides, examples, API
reference, no-code options, support, changelog, and MCP. The overview gives the
reader a product map before implementation: Accounting API, Budgets API,
Expenses API, Fields API, Onboarding API, Payments API, Team API, Transactions
API, Travel API, and Webhooks API.

The strongest Brex pattern is production readiness. Their docs do not stop at
"make one request." They document roles, scopes, token storage, launch stages,
rate limits, error fixes, idempotency, versioning, webhooks, support trace IDs,
and a launch checklist for customers and partners.

Brex also treats AI and agents as a real docs surface. Every page exposes
"Copy for LLM," "View as Markdown," and options to open in ChatGPT or Claude.
The MCP page explains prerequisites, server URL, client-specific setup, OAuth,
API-key fallback, security guidance, available tools, example prompts, and
troubleshooting.

## Page jobs

| Page | Reader job | Pattern observed |
| --- | --- | --- |
| Overview | Understand what Brex APIs can do | Compact hub with API families, quickstart, status, Slack, and AI/Markdown actions |
| Quickstart | Make the first API call | Admin assumption, dashboard token creation, first Team API call, examples, and next steps |
| Authentication | Use a Brex customer token safely | Dashboard path, agreement requirement, roles, scopes, token storage, revocation, expiration, and production base URL |
| Partner authentication | Build for Brex customers | Wrong-reader note, staging and production URLs, OpenID Connect, grant-type choice, token refresh, and redirect URI rules |
| Roles and permissions | Choose access correctly | Role rules and scope tables grouped by API family |
| Launch checklist | Prepare for production | Separate customer and partner checklists for pre-development and development |
| Webhooks | Receive real-time events safely | Event catalog, registration, endpoint requirements, signature verification, timestamp checks, partner token mapping, and IP allow-listing |
| Rate limits | Avoid and recover from throttling | Specific limits, 429 behavior, webhook alternative, exponential backoff, and token-bucket throttling |
| Error codes | Recover from common failures | Status-code model, response shape, common errors, and concrete fixes |
| Versioning | Build resilient clients | Defines non-breaking changes and warns clients to handle unknown fields and enum values |
| API launch stages | Know stability and access | Alpha, Beta, and GA table with target audience, access, stability, support, and intended use |
| API reference | Look up exact API families and endpoints | OpenAPI-backed pages with downloadable JSON/YAML and endpoint groups |
| MCP | Connect AI assistants safely | Prerequisites, OAuth, API-key fallback, available tools, access capabilities, prompts, and troubleshooting |
| Postman | Test without writing code | Postman workspace, customer collections, partner environments, and token-refresh scripts |
| Support | Escalate with useful context | Email, Slack, request trace ID, and warning not to send tokens |
| Examples | Test small payloads quickly | Short request/response examples with links back to full guides |

## How Brex connects to customers

Brex connects by making the reader's status explicit. A Brex customer with an
admin dashboard follows one path. A partner building for Brex customers follows
another. A no-code tester uses Postman. An AI-tool user connects through MCP.
A developer looking for exact behavior uses OpenAPI reference.

The docs repeatedly protect the reader from hidden blockers. They say when an
admin role is required, when an agreement must be accepted, when staging data
can be purged, when a beta must be enabled, when a customer can deny scopes,
and when a role can block an otherwise valid API request.

This is the main Brex lesson for Doow: production docs should not only explain
how to connect. They should explain who can connect, what can block them, what
state they should verify, what failures to expect, and what support needs if
the connection fails.

## Strong patterns to borrow

### 1. Use the overview as a compact map

Brex's overview lists API families and gives the reader quick exits to the
quickstart, API status, and Slack community. It does not force a long product
essay before action.

Doow equivalent:

- `/integrations` should list source families and the job each one serves:
  usage data, identity, HRIS, finance, browser activity, desktop activity,
  SDK instrumentation, and provider APIs.
- The hub should include quick exits to "connect first source," "choose a
  source," "verify data," "troubleshoot," and "contact support."

### 2. Put the first success state in the quickstart

Brex's quickstart tells the reader they will create a user token and call the
Team API to see the current user associated with the token.

Doow equivalent:

- Every setup guide should state the first success before steps begin.
- Examples:
  - Provider API: "By the end, Doow shows one recent usage record from this
    provider."
  - SDK: "By the end, Doow receives one test usage event."
  - Doow Agent: "By the end, one pilot user appears with recent activity."

### 3. Separate customer auth from partner auth

Brex's partner authentication page opens with a wrong-reader note: partners
building for Brex customers should stay there, while Brex clients connecting
their own account should use the standard authentication page.

Doow equivalent:

- Provider pages should distinguish customer-owned setup, partner-style OAuth,
  and internal Doow admin setup.
- If an integration is for a customer's own workspace, say that.
- If an integration authorizes many customer workspaces, say that and document
  consent, refresh, revocation, and insufficient-scope behavior.

### 4. Add role and scope matrices

Brex groups roles and scopes by API family. It explains that scopes define what
the integration can access, while permissions define what the user can access.

Doow equivalent:

- Each integration family should have a clear access table:
  - required Doow role
  - required provider role
  - minimum provider scopes
  - whether an employee can self-connect
  - whether an admin must approve
  - what happens when the role is insufficient

### 5. Add a production launch checklist

Brex consolidates production-readiness into one checklist for customers and
one for partners. It covers agreements, prohibited activities, rate limits,
community/support, Postman, changelog, secrets, idempotency, versioning,
errors, rate limits, OAuth security, scope denial, and demo handoff.

Doow equivalent:

- Add a production-readiness checklist for integration rollout.
- Split it by reader:
  - Admin rollout checklist.
  - Engineer SDK checklist.
  - IT/security agent rollout checklist.
  - Partner/OAuth checklist if Doow supports partner-style integrations.

### 6. Make webhooks and real-time events implementation-safe

Brex's webhook guide starts with what webhooks are, lists the event catalog,
then gives implementation steps: register URL, expose POST endpoint, verify
signature, parse payload, handle business logic, verify timestamp, map company
IDs to access tokens, and allow-list IPs.

Doow equivalent:

- If Doow publishes webhooks, event exports, or ingestion callbacks, each page
  should include event catalog, verification, replay/timestamp behavior,
  security requirements, and sample failure handling.
- If Doow consumes provider webhooks, provider setup pages should state which
  events are needed and how to verify they are arriving.

### 7. Put operational failure guidance near setup

Brex has focused pages for rate limits, error codes, versioning, and launch
stages. These are not abstract essays; they explain what the integration should
do when reality gets messy.

Doow equivalent:

- Provider setup pages should link to specific recovery paths for missing
  permissions, stale tokens, rate limits, no recent data, unsupported provider
  plans, and disabled workspace features.
- SDK pages should include retries, idempotency if applicable, unknown fields,
  and payload validation behavior.

### 8. Make support handoff concrete

Brex tells users to include the request trace ID from `X-Brex-Trace-Id` and not
send tokens or authorization headers.

Doow equivalent:

- Every troubleshooting page should tell the user what to collect:
  - Doow workspace.
  - Source or provider.
  - Integration detail page URL.
  - User or account affected.
  - Timestamp.
  - Error message or event ID.
  - Request ID or trace ID if available.
- It should also say what not to send, such as API keys, tokens, passwords, or
  raw authorization headers.

### 9. Treat AI-readable docs as part of the product

Brex exposes "Copy for LLM," "View as Markdown," and actions to open pages in
ChatGPT or Claude. Their MCP page also gives client-specific setup for Claude
Code, Claude Desktop, ChatGPT, Cursor, Codex, and generic MCP clients.

Doow equivalent:

- Keep `llms.txt`, raw Markdown, and docs metadata current.
- Add agent-consumable docs for integration selection, setup, verification,
  and troubleshooting.
- If Doow exposes agent or MCP-like functionality, include capability tables,
  authentication options, revocation, security guidance, example prompts, and
  troubleshooting.

### 10. Provide no-code test paths

Brex uses Postman to help readers test API calls without writing code. It also
separates customer collections from partner environments and explains token
refresh scripts.

Doow equivalent:

- Where possible, offer a no-code or low-code verification path:
  - dashboard connection test
  - sample event sender
  - curl request
  - Postman collection
  - built-in integration health check

## What not to copy

Doow should not copy Brex's API-family density onto a user-facing integration
hub. Brex can list many API families because its audience is explicitly
developer-focused. Doow needs to guide admins and operators as well as
engineers.

Doow should not use realistic-looking secret tokens in examples. Use obvious
placeholders such as `DOOW_API_KEY`, `YOUR_PROVIDER_TOKEN`, or
`YOUR_DOOW_WORKSPACE_ID`.

Doow should not make OpenAPI reference pages the first experience for unsure
readers. Reference pages are useful after the reader knows what they are
building.

Doow should avoid burying launch-stage or beta status inside deep pages. If a
source is beta, limited, opt-in, or workspace-gated, say that at the top of the
relevant setup page.

## Doow decisions from Brex

- Keep `/integrations` as a compact decision hub with clear exits.
- Add "first success" to every setup guide.
- Add role and scope tables to provider and agent setup pages.
- Separate customer-owned setup from partner/customer OAuth setup.
- Add a production-readiness checklist for integration rollout.
- Add support-ready troubleshooting with request IDs and "do not send secrets"
  guidance.
- Keep reference exact and downloadable where possible.
- Add no-code test paths where they reduce time to first verification.
- For Doow Agent and AI-adjacent docs, document prerequisites, access model,
  capability table, revocation, example prompts, and troubleshooting.

## Open questions for Doow

- Which Doow integration sources need a role and scope matrix first?
- Does Doow have request IDs, integration run IDs, sync IDs, or event IDs that
  support should ask for?
- Which integration paths deserve a production-readiness checklist?
- Which Doow pages should expose raw Markdown or `llms.txt` entries first?
- Do any Doow sources have beta, opt-in, or limited-availability status that
  must appear at the top of setup pages?

## Next comparison target

Now that Ramp, Stripe, Stytch, Mercury, and Brex have been reviewed, the next
highest-value step is synthesis. Combine the patterns into a Doow integration
docs playbook before changing live docs pages.
