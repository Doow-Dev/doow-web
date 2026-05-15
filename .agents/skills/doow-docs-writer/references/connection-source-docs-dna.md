# Connection Source Docs DNA

Use this reference before rewriting Doow integration pages. It captures the
product-shaped docs standard for integrations.

## Core frame

Doow integrations docs cover one feature area: connecting customer data sources
to Doow so the rest of the product has useful data.

They are not the full Doow docs system. They are not a developer platform
catalog. They are connection-source docs.

The reader may be:

- connecting the first source after onboarding
- returning later to add another source
- comparing source categories before asking an admin for access
- fixing a connection that did not produce usable data
- checking what Doow reads before approving access

Doow can recommend useful paths, but it must not imply one universal sequence.
The customer chooses the source based on the data outcome they need, the access
they have, and the systems their company uses.

## Reader anxiety

Every integration page must reduce the specific uncertainty that blocks the
reader from connecting a source.

Use these questions as the working checklist:

- What source is this?
- When is this the right source?
- When is another source better?
- Who can connect it?
- What access, credential, permission, or rollout artifact is needed?
- What does Doow read?
- What does Doow not read?
- How does the reader connect it?
- How does the reader prove it worked?
- What should the reader check if it fails?
- What is the next useful source, if any?

Do not open with a generic claim that all integrations connect data to Doow.
That is true, but it does not help the reader choose or complete this specific
connection.

## Borrowed professional patterns

Borrow exact patterns, not brand vibes.

| Source | Pattern | Use in Doow |
| --- | --- | --- |
| Ramp | Ownership and handoff | Name who owns setup, approval, rollout, support, or credentials when the work crosses teams. |
| Stripe | Path selection before setup | Help the reader choose the right source family before asking them to configure anything. |
| Stytch | Orientation before vocabulary | Explain source families in plain language before using implementation terms. |
| Mercury | Trust near setup | Put scopes, data boundaries, revocation, and safety close to the connection step. |
| Brex | Production readiness | Include proof, common failures, support handoff, and later operational risks. |

Doow needs all five patterns, but not every page needs the same weight. A hub
page leans on Stytch and Stripe. A provider setup page leans on Mercury and
Brex. A rollout page such as Doow Agent leans on Ramp, Mercury, and Brex.

## Preferred heading spine

Use this spine for provider, agent, SDK, observability, HRIS, identity, and
accounting pages unless the page type clearly needs a different structure.

```text
When to use this source
-> What Doow reads
-> What Doow does not read
-> What you need
-> Connect the source
-> Confirm it worked
-> Troubleshooting
-> Disconnecting
-> Next useful source
```

Use plain variants when they fit better:

- `Before rollout` for agent deployment pages.
- `Send a test event` for SDK, OTLP, CLI, sidecar, serverless, or daemon pages.
- `Who can connect this source` when ownership is the main blocker.
- `Choose another source when` when the page needs a wrong-path exit.

## Hub and chooser spine

Hub and chooser pages should help the reader choose without pretending every
customer starts from the same place.

```text
What this section helps you do
-> what each source family is for
-> choose by outcome
-> compare source paths when needed
-> go to the exact setup page
```

Avoid titles and copy that over-index on "first" unless the page is only for
first-time onboarding. Prefer `Choose what to connect` or `Choose a usage
source` over `Choose what to connect first` when the page also serves returning
customers.

## Word and tone rules

Use calm, exact, concrete language.

Prefer:

- `connect`
- `read`
- `sync`
- `send`
- `verify`
- `revoke`
- `requires`
- `use this when`
- `this source shows`
- `this source does not show`

Avoid:

- `seamless`
- `powerful`
- `robust`
- `unlock`
- `leverage`
- `all-in-one`
- `just connect`
- `easy setup`
- `complete visibility`

Do not write a technical article unless the page is explicitly an explanation
or reference page. Setup pages should move from decision to action to proof.

## Anti-patterns

Cut or rewrite these patterns:

- A raw provider catalog before the reader understands the source families.
- A fake universal sequence such as usage first, identity second, HRIS third,
  accounting later.
- Repeating "integrations connect data to Doow" on every page.
- Explaining implementation details before the reader knows whether the source
  fits.
- Treating trust, scopes, or revocation as afterthoughts.
- Ending with generic exploration instead of the next useful setup or recovery
  task.
- Turning provider pages into technical articles about how the provider works.

## Production bar

A page is ready only when a reader can say:

```text
I know why I am here.
I know whether this source is right for me.
I know who needs access.
I know what Doow will and will not read.
I know how to connect it.
I know how to verify it.
I know what to do if it fails.
```
