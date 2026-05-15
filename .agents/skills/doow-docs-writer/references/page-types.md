# Page Types

Use page type to choose the reader promise. Do not mix all promises into every
page.

## Tutorial

Purpose: teach a learner through a safe, guided path.

Use when the reader wants to learn a workflow for the first time and the exact
production task matters less than building understanding.

Pattern:

```text
What you will build or learn
-> prerequisites
-> guided steps
-> check your work
-> what you learned
-> next lesson
```

Avoid turning tutorials into reference dumps. Keep choices constrained.

## How-to guide

Purpose: help a user complete a real task.

Use for provider setup pages, SDK setup pages, integration connection tasks,
and recovery tasks.

Pattern:

```text
When to use this
-> what you need
-> steps
-> confirm it worked
-> troubleshooting
-> next step
```

Keep how-to pages practical. Move long explanations and broad concepts into
explanation pages.

## Explanation

Purpose: help the reader understand concepts, architecture, tradeoffs, and
mental models.

Use for pages such as "how integrations work" or "what Doow needs."

Pattern:

```text
The problem
-> the model
-> how the parts relate
-> tradeoffs or constraints
-> where to go next
```

Avoid step-by-step setup unless the page intentionally becomes a how-to guide.

## Reference

Purpose: provide precise facts.

Use for schemas, API fields, config options, permissions, routes, events,
limits, and compatibility.

Pattern:

```text
What this reference covers
-> exact fields/options
-> constraints/defaults
-> examples
-> related guides
```

Do not bury facts in narrative. Make values, requiredness, defaults, and
constraints scannable.

## Decision guide

Purpose: route an unsure user to the right task.

Use for `/integrations`, "choose what to connect first," and source chooser
pages.

Pattern:

```text
What decision this page helps with
-> recommended path for unsure users
-> choices by outcome
-> comparison details
-> next task
```

Decision guides should reduce choices, not expose the whole catalog first.
