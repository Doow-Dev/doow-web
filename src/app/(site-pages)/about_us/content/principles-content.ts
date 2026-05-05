export type AboutUsPrincipleIcon = "lightbulb" | "route" | "rotate" | "book";

export interface AboutUsPrincipleCardContent {
  description: string;
  icon: AboutUsPrincipleIcon;
  id: string;
  tone: "subtle" | "base";
  title: string;
}

export interface AboutUsPrinciplesContent {
  cards: readonly AboutUsPrincipleCardContent[];
  id: string;
}

export const aboutUsPrinciplesContent = {
  cards: [
    {
      description:
        "Every tool, every contract, every seat or metered license visible without digging through invoices or chasing departments.",
      icon: "lightbulb",
      id: "about-us-principle-visibility",
      title: "You should know what you're paying for",
      tone: "subtle",
    },
    {
      description:
        "Payments shouldn't exist in a vacuum. Every charge should connect to a tool, a contract, and the people or agents using it.",
      icon: "route",
      id: "about-us-principle-traceability",
      title: "Every SaaS, cloud or infra dollar should be traceable",
      tone: "base",
    },
    {
      description:
        "You shouldn't renew because you forgot. You should renew because the data says it's worth it or cancel because it doesn't.",
      icon: "rotate",
      id: "about-us-principle-renewals",
      title: "Renewals should be decisions, not defaults",
      tone: "base",
    },
    {
      description:
        "Contracts, invoices, and usage data belong in one place ready when you need to review, negotiate, or cut.",
      icon: "book",
      id: "about-us-principle-sors",
      title: "Your dozen SORs should work together",
      tone: "subtle",
    },
  ] satisfies readonly AboutUsPrincipleCardContent[],
  id: "about-us-principles",
} as const satisfies AboutUsPrinciplesContent;
