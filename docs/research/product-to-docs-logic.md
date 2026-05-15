# Why these products need docs, and what Doow should learn

Research date: May 14, 2026.

This note looks one layer deeper than docs patterns. It asks what each company
actually does, why that creates a customer problem, and why the docs have to be
shaped as a product solution rather than an opinionated writing exercise.

The useful question is not "who has nice docs?" The useful question is:

> What product reality forces this docs shape to exist?

## The product-to-docs chain

Each company has the same broad challenge: customers must connect software to
something sensitive or important. But the actual problem is different for each
one.

| Company | What the product does | What that creates for customers | What the docs must solve |
| --- | --- | --- | --- |
| Ramp | Manages company spend, cards, procurement, expenses, bills, reimbursements, and financial workflows | Many teams touch one spend workflow: finance, admins, employees, developers, partners, and support | Coordinate ownership and move each reader from access to workflow to support |
| Stripe | Lets businesses build payments, billing, marketplace, banking, tax, and financial flows into products | The platform is powerful but the number of possible paths is overwhelming | Help the reader choose the right product and integration path before code |
| Stytch | Lets teams build authentication, user sessions, identity flows, fraud/risk controls, and agent auth | Customers need auth, but may not know which auth surface or method fits their app | Give a mental model first, then route to the correct implementation |
| Mercury | Lets companies bank and automate financial operations through accounts, API, CLI, sandbox, and MCP | Customers are connecting money and financial data, so trust, permissions, and safety come first | Make access, testing, revocation, and data boundaries obvious before action |
| Brex | Runs corporate cards, expense management, travel, bill pay, reimbursements, and spend APIs | Integrations must survive production realities: roles, scopes, errors, rate limits, approvals, webhooks, support | Turn a working API call into a production-ready integration |
| Doow | Uses integrations as connection paths for usage, app activity, identity, HRIS, SDK, observability, and financial signals | Customers need to connect sources after onboarding, or add more sources later, so Doow has the data its other features depend on | Make each connection path clear in its own nuance: what it is for, who can set it up, what it needs, how it works, and how to verify it |

## The Doow correction

Doow is not trying to copy these companies' docs models wholesale. Integrations
are one Doow feature area with many categories. They are ways to connect data
sources to Doow so other Doow features can work with useful customer data.

That matters because the docs should not make integrations sound like a
separate product or a developer platform. A customer may come to this section
right after signup and onboarding because they need to connect their first
source. Another customer may come back weeks later to connect another source.
Both users need the same basic clarity: how this specific connection works.

Doow can recommend useful sequences, but the customer chooses the order based
on their company, access, and current need. The categories already express the
right shape: usage data, Doow Agent, direct provider APIs, SDK, observability,
identity, HRIS, and accounting or finance data.

The docs job is therefore practical:

- make each connection category understandable
- explain the nuance of that source type
- show what the user needs before starting
- tell them who can complete the setup
- guide the connection steps
- show how to confirm the connection worked
- help them recover when it does not

Everything else should support that job.

## Ramp: docs as coordination infrastructure

Ramp is not just an API company. Ramp is a spend-management system where money,
approvals, cards, bills, reimbursements, accounting, vendors, and internal
finance workflows meet.

That product creates a coordination problem. A developer may write code, but
the developer is not always the person who can create the app, approve scopes,
understand finance policy, manage bills, or support the customer after launch.
Ramp's product sits inside company operations, so the docs must coordinate the
people around the operation.

That is why Ramp separates its surfaces:

- The help center handles admin access and dashboard setup.
- Developer docs handle API implementation.
- Product guides handle real finance workflows.
- Partner docs handle public integrations and launch expectations.
- Support paths help users know where to go when setup fails.
- `llms.txt`, guide exports, API exports, and OpenAPI support agents and tools.

Ramp's docs satisfy customers by making the handoff clear. They answer:

- Who creates credentials?
- Who chooses scopes?
- Who implements the integration?
- What workflow is being automated?
- How do we test safely?
- What happens when something fails?
- Where does support enter the loop?

The deep lesson for Doow: when a product crosses departments, docs must show
ownership. Doow crosses finance, IT, engineering, security, operations, and
people teams. We cannot write every page as if one developer owns the whole
journey.

Doow should borrow Ramp when a page needs to say:

- who owns this step
- what artifact they must produce
- where the next person continues
- what support needs if the handoff breaks

## Stripe: docs as path selection for a programmable platform

Stripe sells programmable financial infrastructure. That means the customer is
not only buying one product. They may be building checkout, subscriptions,
marketplaces, invoicing, embedded payments, payouts, tax, fraud prevention, or
platform onboarding.

Stripe's product power creates a choice problem. The customer can do many
things, but the wrong first choice creates wasted implementation work. A reader
can be technically capable and still not know whether they need Checkout,
Payment Element, Connect, hosted onboarding, embedded onboarding, webhooks, or
API-only flows.

That is why Stripe's docs route before they teach:

- Quickstart indexes group work by customer job.
- Technical pages show exits for non-developers.
- Integration guides expose effort, integration type, and customization level.
- Configurable guides appear when implementation paths diverge.
- Legacy and live/test mode warnings appear before time is wasted.
- Verification is treated as part of the integration, not an afterthought.

Stripe's docs satisfy customers by preventing expensive wrong turns. They
answer:

- Which product or flow should I use?
- Am I the right reader for this page?
- How much control or customization do I need?
- Which platform, language, or account model applies?
- How do I know this is working before I go deeper?

The deep lesson for Doow: customers do not arrive saying "I need the OpenAI
direct provider API page." They arrive saying, "I need to understand AI usage
and spend." Our docs must help them choose the right data path before setup.

Doow should borrow Stripe when a page needs to say:

- choose this path if your goal is X
- do not choose this path if your goal is Y
- here is the effort, access, freshness, and verification model
- here is the next path if this one is wrong

## Stytch: docs as mental-model formation

Stytch sells auth and user infrastructure. Authentication is not a single
feature from the customer's point of view. It can mean login, signup, sessions,
passwords, passkeys, OAuth, magic links, MFA, fraud protection, bot defense,
connected apps, or agent authorization.

That product creates a vocabulary problem. A customer knows they need users to
sign in, but they may not yet know whether they need prebuilt UI, headless SDK,
backend APIs, passwords, passkeys, MFA, or connected-app flows.

That is why Stytch uses hub pages:

- The overview gives a map of what can be built.
- The build-auth path starts from the outcome, not the protocol.
- Stytch UI gets its own explanation before customization and reference.
- Setup guides put dashboard prerequisites before code.
- Method pages add one auth capability at a time.

Stytch's docs satisfy customers by giving language to the thing they are trying
to build. They answer:

- What kind of auth flow am I building?
- Should I use prebuilt UI, SDKs, or API-level control?
- What must be configured in the dashboard first?
- Which examples, demos, and references are nearby?
- How do I add one method without relearning the whole platform?

The deep lesson for Doow: "usage source" is also vocabulary. Provider API,
observability, SDK, browser agent, desktop agent, HRIS, identity, and
accounting are implementation words. The customer may only know the business
question.

Doow should borrow Stytch when a page needs to say:

- here is the plain-language map
- here are the source families
- here is what each source helps Doow answer
- here is the smallest useful first connection
- here is what to add later when the question changes

## Mercury: docs as trust-building for sensitive automation

Mercury provides banking and financial automation: accounts, transactions,
payments, API access, CLI workflows, sandbox testing, and MCP access for AI
tools.

That product creates a trust problem. The customer is not only asking, "How do
I make the request?" They are asking whether the system can move money, expose
banking data, leak credentials, run in the wrong environment, or give an AI
tool more access than intended.

That is why Mercury keeps safety near setup:

- Getting Started explains who can create API tokens.
- Token pages explain read-only, read-write, custom scopes, expiration,
  downgrades, deletion, IP allow-listing, and revocation.
- Sandbox docs separate sandbox tokens, sandbox URLs, sandbox UI, and
  production.
- OAuth docs separate own-account setup from integrations for shared customers.
- MCP docs explain read-only access, OAuth, official endpoint, session
  lifetime, prompt-injection risk, and data handling.

Mercury's docs satisfy customers by making sensitive automation feel bounded.
They answer:

- Who is allowed to connect this?
- What can this token do?
- Can I test without touching real money?
- How do I revoke access?
- What does the AI tool see?
- What risks remain even when access is read-only?

The deep lesson for Doow: Doow may not move money, but Doow still touches
sensitive company truth. It connects AI usage, employee identity, app activity,
provider data, HRIS context, and financial signals. That is enough to require
trust-building inside setup pages.

Doow should borrow Mercury when a page needs to say:

- what data this source gives Doow
- what Doow cannot do
- whether access is read-only
- who can revoke or pause the connection
- whether this is test, pilot, or production data
- what risk remains after setup

## Brex: docs as production-readiness for business operations

Brex runs spend operations: corporate cards, expenses, travel, bill pay,
reimbursements, team data, accounting data, payments, webhooks, and API/MCP
surfaces.

That product creates a production-readiness problem. A Brex integration can
make a first request quickly, but production success depends on many details:
roles, scopes, permissions, customer consent, staging data, rate limits,
idempotency, unknown fields, webhook signatures, expired tokens, trace IDs,
and support handoff.

That is why Brex documents the operational layer:

- Customer authentication and partner authentication are separate.
- Roles and scopes are grouped by API family.
- Launch checklist covers pre-development and development for customers and
  partners.
- Webhook docs include event catalog, signature verification, timestamp checks,
  token mapping, and IP allow-listing.
- Rate-limit and error pages give recovery patterns.
- Support docs ask for the request trace ID and warn against sending tokens.
- MCP docs include prerequisites, OAuth, API-key fallback, capability table,
  example prompts, revocation, and troubleshooting.

Brex's docs satisfy customers by preparing them for what happens after the
quickstart. They answer:

- What must be true before production launch?
- What role and scope must the user have?
- How do we handle consent denial or insufficient permissions?
- How do we handle duplicate actions?
- How do we handle unknown response shapes?
- How do we debug failures with support?

The deep lesson for Doow: connection is not the finish line. A Doow
integration must keep producing useful, trustworthy data after setup. The user
needs to know how to verify, monitor, troubleshoot, and escalate.

Doow should borrow Brex when a page needs to say:

- what production readiness means
- what support evidence to collect
- what not to send to support
- what failures are normal
- what role/scope mismatch looks like
- what must be monitored after connection

## What Doow actually has

Doow has one integrations area with many connection paths. Those paths exist
because different customer data lives in different systems:

- Direct provider APIs for usage and billing data from AI providers.
- Cloud platforms for usage reported through cloud monitoring or billing.
- Doow Agent for browser and desktop app activity when provider APIs do not
  show enough.
- Instrumentation SDK and OTLP for custom usage events from the customer's own
  applications.
- Observability sources for metrics already collected elsewhere.
- Identity providers for users, groups, assignments, and app access.
- HRIS for department, employment status, and worker context.
- Accounting and finance sources for expense and transaction data.

This means Doow's integration docs are mostly setup and connection-path docs.
They help the customer after onboarding, during first setup, or later when the
customer wants to connect another source. Without these docs, the customer may
not know:

- which source fits the current need
- why usage alone is not enough
- why identity helps connect usage to people
- why HRIS helps explain department ownership
- why accounting helps confirm spend
- when an agent is better than a provider API
- when the SDK is better than an agent
- who inside the company must approve each source
- how to prove data is flowing
- how to recover when data is missing

The customer is not trying to admire an integrations catalog. The customer is
trying to make Doow useful for questions like:

- Which AI tools are being used?
- Who is using them?
- Which teams own the usage?
- What does it cost?
- Which activity is visible through provider APIs?
- Which activity only appears through browser or desktop usage?
- Which apps are unmapped or unresolved?
- Which sources are trusted enough for decisions?

The docs must exist because Doow's other features depend on connected signals.
If the customer cannot connect the right source or verify that the connection
worked, those features cannot show useful answers.

## The Doow integration docs thesis

Doow integration docs should not be an encyclopedia of providers or a copied
developer-platform model. They should be clear connection-path docs.

Each page should help the customer move through this chain:

1. "What is this connection for?"
2. "When would I use it instead of another connection?"
3. "Who can set it up?"
4. "What should I have ready?"
5. "How do I connect it?"
6. "How do I know it worked?"
7. "What do I check if it does not work?"

The docs can recommend what to connect first, but they should not force a
single sequence. First-time users and returning users both need to understand
the connection in front of them.

## How the outside examples map to Doow

Use each company when Doow faces the same product reality, not because their
docs look good.

| Doow connection-docs need | Outside model to borrow |
| --- | --- |
| Multiple people may own one setup path | Ramp |
| The customer needs help choosing between source categories | Stripe |
| The customer does not yet know the category vocabulary | Stytch |
| The source touches sensitive data or revocation questions | Mercury |
| The connection must keep working after launch | Brex |
| Agents or LLMs need to read the docs | Ramp and Brex |
| Exact API fields, events, or schemas matter | Stripe, Mercury, and Brex |

## The intentional shape for Doow integration docs

The integration docs should be designed as a clear setup area:

1. **Category clarity:** Explain what this kind of connection is for.
2. **Fit:** Say when to use this path and when another path is better.
3. **Ownership:** Say who must do the work.
4. **Readiness:** Say what access, credentials, permissions, or accounts are
   needed before starting.
5. **Setup:** Give exact connection steps.
6. **Proof:** Show what success looks like in Doow.
7. **Recovery:** Explain common failure modes and what to check.
8. **Optional next source:** Suggest useful next connections without making the
   sequence feel mandatory.
9. **Reference:** Keep exact fields, events, limits, and API behavior separate
   from the setup guide.

If a page does not help the customer understand or complete that connection, it
is probably not serving this docs area.

## The key standard

Before writing or restructuring a Doow integration docs page, ask:

> What connection path is this page helping the customer understand or complete?

Then ask:

> What is unclear, risky, or blocked about this connection without this page?

Only after those answers are clear should the page structure be chosen.
