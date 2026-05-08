import { siteAssetManifest } from "@/lib/assets/site";

export interface LandingDemoVideoContent {
  id: string;
  title: string;
  description: string;
  playLabel: string;
  frame: (typeof siteAssetManifest)["demoFrame"];
  poster: (typeof siteAssetManifest)["demoPoster"];
  video: (typeof siteAssetManifest)["demoVideo"];
}

export const landingDemoVideoContent = {
  id: "demo",
  title: "See exactly what your team is paying for, in 2 minutes.",
  description:
    "Watch how Doow connects to your stack, surfaces every subscription, and shows you exactly where money is being wasted.",
  playLabel: "Play demo video: See exactly what your team is paying for in 2 minutes.",
  frame: siteAssetManifest.demoFrame,
  poster: siteAssetManifest.demoPoster,
  video: siteAssetManifest.demoVideo,
} satisfies LandingDemoVideoContent;
