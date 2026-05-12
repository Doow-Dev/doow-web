# MDX Components

Allowed Doow docs MDX components are defined in
`apps/docs/src/lib/docs/mdx-config.ts` and implemented in
`apps/docs/src/components/docs/mdx-components.tsx`.

Current allowed components:

- `Callout`
- `Steps`
- `Card`
- `Cards`
- `CodeBlock`
- `Tabs`
- `Tooltip`

## Callout

Use for important context, warnings, and successful-state emphasis.

```mdx
<Callout title="Admin key required">
  Doow needs an organization-level Admin key, not a standard user API key.
</Callout>
```

Use `tone="warning"` for risks or destructive actions. Use `tone="success"`
only when emphasizing a verified success state.

## Steps

Use around short ordered setup steps when the steps are the central task.

```mdx
<Steps>

1. Open **Company Settings -> Integrations**.
2. Select **OpenAI**.
3. Paste the Admin API key.

</Steps>
```

Keep each step imperative and scoped to one action.

## Cards and Cards

Use for decision choices, hub links, and routing surfaces.

```mdx
<Cards>
  <Card title="Connect usage data" href="/integrations/usage/choose-source">
    Best first step when you need consumption visibility.
  </Card>
</Cards>
```

Do not use cards to wrap ordinary paragraphs.

## CodeBlock

Use when code or payloads need a copy button and language label.

```mdx
<CodeBlock language="json" code={`{"provider":"openai","requests":42}`} />
```

Prefer fenced code blocks for simple static examples that do not need the docs
toolbar.

## Tabs

Use for equivalent alternatives such as npm/pnpm/yarn, framework variants, or
provider modes. Do not use tabs for unrelated content.

## Tooltip

Use sparingly for short definitions that would interrupt the sentence. Do not
hide required setup information in a tooltip.

## Tables

Tables are allowed through Markdown and are wrapped by the docs renderer. Use
them for comparison, fields, symptoms, and reference facts. Do not use tables
as the primary UI for major decisions when cards would reduce cognitive load.
