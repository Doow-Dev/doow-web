import { siteAssetManifest } from "@/lib/assets/site";

export const siteFaqChrome = {
  backgroundIllustration: siteAssetManifest.faqBackgroundIllustration,
  categoryAriaLabel: "Browse frequently asked question categories",
  contactEmail: "doowbusiness@gmail.com",
  descriptionPrefix: "Didn't find what you were looking for? We're here to help! Drop us a message at ",
  descriptionSuffix: ", and we'll get back to you soon.",
  eyebrow: "FAQ",
  sectionId: "faq",
  stickyCtaHref: "/doow-ai",
  stickyCtaLabel: "Continue with Doow AI",
  stickyPrompt: "Have Questions Unanswered?",
  threadAriaLabel: "Frequently asked questions conversation",
  title: "Your Questions, Answered",
  userAvatar: siteAssetManifest.faqUserAvatar,
} as const;
