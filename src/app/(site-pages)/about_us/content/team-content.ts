export interface AboutUsTeamLogoContent {
  id: string;
  label: string;
  tone?: "accent";
}

export interface AboutUsTeamLinkContent {
  href: string;
  id: string;
  label: string;
  platform: "linkedin" | "x";
}

export interface AboutUsTeamContent {
  description: string;
  id: string;
  links: readonly AboutUsTeamLinkContent[];
  logos: readonly AboutUsTeamLogoContent[];
  title: string;
}

export const aboutUsTeamContent = {
  description:
    "We have the right mix of hands-on experience across financial services, developer tooling and enterprise software.",
  id: "about-us-team",
  links: [
    {
      href: "https://www.linkedin.com/company/doow",
      id: "about-us-team-link-linkedin",
      label: "Linkedin",
      platform: "linkedin",
    },
    {
      href: "https://x.com/doowco",
      id: "about-us-team-link-x",
      label: "X(Twitter)",
      platform: "x",
    },
  ] satisfies readonly AboutUsTeamLinkContent[],
  logos: [
    {
      id: "about-us-team-logo-clerk",
      label: "clerk",
    },
    {
      id: "about-us-team-logo-traqq",
      label: "traqq",
      tone: "accent",
    },
    {
      id: "about-us-team-logo-sytch",
      label: "Sytch",
    },
  ] satisfies readonly AboutUsTeamLogoContent[],
  title: "Built by humans who've seen it firsthand",
} as const satisfies AboutUsTeamContent;
