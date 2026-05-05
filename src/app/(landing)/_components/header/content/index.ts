import type { LandingActionLink, LandingNavItem } from "@/app/(landing)/_components/shared";
import { doowAppLinks } from "@/lib/site/app-links";

export interface LandingHeaderContent {
  primaryNavigation: LandingNavItem[];
  login: LandingActionLink;
  signUp: LandingActionLink;
}

export const landingHeaderContent = {
  primaryNavigation: [
    { href: "#product", label: "Product", hasDisclosure: true },
    { href: "/pricing", label: "Pricing" },
    { href: "/blog", label: "Blog" },
  ] satisfies LandingNavItem[],
  login: {
    href: doowAppLinks.login,
    label: "Login",
  } satisfies LandingActionLink,
  signUp: {
    href: doowAppLinks.signUp,
    label: "Sign Up",
  } satisfies LandingActionLink,
} satisfies LandingHeaderContent;
