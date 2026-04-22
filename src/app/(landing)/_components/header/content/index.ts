import type { LandingActionLink, LandingNavItem } from "@/app/(landing)/_components/shared";

export interface LandingHeaderContent {
  primaryNavigation: LandingNavItem[];
  login: LandingActionLink;
  signUp: LandingActionLink;
}

export const landingHeaderContent = {
  primaryNavigation: [
    { href: "#product", label: "Product", hasDisclosure: true },
    { href: "#pricing", label: "Pricing" },
    { href: "#blog", label: "Blog" },
  ] satisfies LandingNavItem[],
  login: {
    href: "/signin",
    label: "Login",
  } satisfies LandingActionLink,
  signUp: {
    href: "/signin",
    label: "Sign Up",
  } satisfies LandingActionLink,
} satisfies LandingHeaderContent;
