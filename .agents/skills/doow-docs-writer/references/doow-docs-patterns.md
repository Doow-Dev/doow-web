# Doow Docs Patterns

Use these structures for Doow docs unless the page type clearly requires a
different pattern.

## Integrations hub

Use for `/integrations`.

```text
What integrations do for Doow
-> what source families are for
-> choose by outcome
-> compare paths when needed
-> exact setup pages
```

The hub must help users who do not yet know what to connect, while still
serving users who are returning to add another source. Do not start with a raw
catalog before orientation. Do not imply one universal setup sequence.

## Chooser page

Use for pages that help users choose a connection path.

```text
Decision this page helps with
-> what each source family is for
-> choice cards by outcome
-> comparison table only if needed
-> next setup page
```

Prefer cards for major choices. Use tables for detailed comparison.
Recommendations are allowed, but frame them as useful paths, not mandatory
order.

## Provider setup guide

Use for pages such as OpenAI, Okta, Google Workspace, BambooHR, Datadog, or
accounting integrations.

```text
When to use this source
-> what Doow reads
-> what Doow does not read
-> what you need
-> connect the source
-> confirm the sync worked
-> troubleshooting
-> disconnecting
-> next useful source
```

Rules:

- Put "When to use this source" near the top.
- Add "Choose another source when" if the source is easy to confuse with a
  neighboring path.
- Name who can connect the source when ownership or admin access is likely to
  block setup.
- Keep setup steps imperative and short.
- Use provider-specific troubleshooting where possible.
- Avoid saying "confirm it worked" without describing a visible success state.

## SDK or instrumentation guide

Use for SDK, sidecar, serverless, daemon, CLI, or OTLP setup pages.

```text
Use this method when
-> what this sends to Doow
-> before you start
-> install or configure
-> send a minimal test event
-> confirm Doow received it
-> production considerations
-> troubleshooting
-> next steps
```

Claims about package names, methods, env vars, endpoint URLs, auth headers,
retry, batching, shutdown, and event shape must come from implementation or
backend verification.

## Proof-state block

Use after setup steps.

```text
You are connected when:
- The integration shows Connected.
- The latest sync timestamp updates.
- The expected records appear.
- The event log has no credential, scope, or rate-limit errors.
```

Customize records by provider: users, departments, invoices, usage rows,
models, projects, services, metrics, or events.

## Troubleshooting section

Use a symptom table when there are provider-specific failures.

```text
| Symptom | Likely cause | Next action |
|---|---|---|
| Key is accepted but no usage appears | Wrong organization | Create a credential in the organization that owns the usage |
```

Use bullets only for generic checks.

## Next steps

Next steps should point to the next useful task. For integrations, common next
steps are:

- Connect an identity provider if usage needs to map to users.
- Connect HRIS if department, manager, or employment status matters.
- Connect accounting if finance-confirmed spend matters.
- Choose another usage source if this provider is not the main source.

Do not present these as a required global sequence.
