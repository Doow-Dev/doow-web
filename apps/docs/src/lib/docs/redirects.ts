export interface DocsRedirect {
  from: string;
  reason: string;
  to: string;
}

export const docsRedirects: readonly DocsRedirect[] = [
  {
    from: "/start",
    reason: "The live docs now start from the integrations hub.",
    to: "/integrations",
  },
];
