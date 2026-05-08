export interface AboutUsTeamLogoContent {
  height: number;
  id: string;
  label: string;
  src: string;
  width: number;
}

export interface AboutUsTeamLinkContent {
  href: string;
  iconHeight: number;
  iconSrc: string;
  iconWidth: number;
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
      iconHeight: 20,
      iconSrc: "/assets/about-us/linkedin-icon.png",
      iconWidth: 20,
      id: "about-us-team-link-linkedin",
      label: "Linkedin",
      platform: "linkedin",
    },
    {
      href: "https://x.com/doowco",
      iconHeight: 20,
      iconSrc: "/assets/about-us/x-icon.png",
      iconWidth: 23,
      id: "about-us-team-link-x",
      label: "X(Twitter)",
      platform: "x",
    },
  ] satisfies readonly AboutUsTeamLinkContent[],
  logos: [
    {
      height: 15,
      id: "about-us-team-logo-clerk",
      label: "clerk",
      src: "/assets/about-us/clerk-logo.png",
      width: 52,
    },
    {
      height: 20,
      id: "about-us-team-logo-traqq",
      label: "traqq",
      src: "/assets/about-us/traqq-logo.png",
      width: 48,
    },
    {
      height: 23,
      id: "about-us-team-logo-sytch",
      label: "Sytch",
      src: "/assets/about-us/sytch-logo.png",
      width: 45,
    },
  ] satisfies readonly AboutUsTeamLogoContent[],
  title: "Built by humans who've seen it firsthand",
} as const satisfies AboutUsTeamContent;
