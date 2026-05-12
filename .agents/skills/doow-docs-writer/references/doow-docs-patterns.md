# Doow Docs Patterns

Use these structures for Doow docs unless the page type clearly requires a
different pattern.

## Integrations hub

Use for `/integrations`.

```text
What integrations do for Doow
-> recommended first setup
-> choose by outcome
-> integration categories
-> next steps
```

The hub must help users who do not yet know what to connect. Do not start with
a raw catalog before orientation.

## Chooser page

Use for pages that help users choose a connection path.

```text
Decision this page helps with
-> recommendation for unsure users
-> choice cards by outcome
-> comparison table only if needed
-> next setup page
```

Prefer cards for major choices. Use tables for detailed comparison.

## Provider setup guide

Use for pages such as OpenAI, Okta, Google Workspace, BambooHR, Datadog, or
accounting integrations.

```text
Use this integration when
-> what Doow reads
-> what Doow does not read
-> before you start
-> setup steps
-> confirm the sync worked
-> troubleshooting
-> disconnecting
-> next steps
```

Rules:

- Put "Use this integration when" near the top.
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

- Connect an identity provider to map usage to users.
- Connect HRIS to add department and manager context.
- Connect accounting to verify spend.
- Choose another usage source if this provider is not the main source.
