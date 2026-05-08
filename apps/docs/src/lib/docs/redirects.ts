export interface DocsRedirect {
  from: string;
  reason: string;
  to: string;
}

export const docsRedirects: readonly DocsRedirect[] = [
  {
    from: "/start",
    reason: "Launch docs use /getting-started as the canonical onboarding URL.",
    to: "/getting-started",
  },
];
