import type { LandingActionLink } from "@/app/(landing)/_components/shared";
import { globalSiteNavContent, type GlobalSiteNavEntry } from "@/app/_components/global-site-navbar/content";
import { doowAppLinks } from "@/lib/site/app-links";

export interface LandingHeaderContent {
  primaryNavigation: readonly GlobalSiteNavEntry[];
  login: LandingActionLink;
  signUp: LandingActionLink;
}

export const landingHeaderContent = {
  primaryNavigation: globalSiteNavContent.primaryNavigation,
  login: {
    href: doowAppLinks.login,
    label: "Login",
  } satisfies LandingActionLink,
  signUp: {
    href: doowAppLinks.signUp,
    label: "Sign Up",
  } satisfies LandingActionLink,
} satisfies LandingHeaderContent;
