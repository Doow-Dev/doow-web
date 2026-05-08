import { siteAssetManifest, type SiteVideoEntry } from "@/lib/assets/site";

export type FeaturePointId = "discover" | "eliminate" | "renewals" | "consolidate";

export type FeaturePointStageKind = "placeholder" | "video";

export interface FeaturePointContent {
  id: FeaturePointId;
  order: number;
  title: string;
  description: string;
  stageKind: FeaturePointStageKind;
  visualVideo?: SiteVideoEntry;
}

export interface FeatureSplitSectionContent {
  id: string;
  title: string;
  description: string;
  points: readonly FeaturePointContent[];
  defaultPointId: FeaturePointId;
}

export const featureSplitSectionContent = {
  id: "product",
  title: "Total visibility into every tool your team is using.",
  description:
    "Doow gives finance teams a clear view of every subscription, every renewal, and every wasted license in one place. You no longer have to pay twice for the same thing.",
  points: [
    {
      id: "discover",
      order: 1,
      title: "Discover every tool your team is using",
      description:
        "Uncover the apps employees are signing up for. Get a complete, real-time map of your SaaS stack, including the ones flying under the radar.",
      stageKind: "video",
      visualVideo: siteAssetManifest.featureSplitDiscoverVideo,
    },
    {
      id: "eliminate",
      order: 2,
      title: "Eliminate licenses nobody is using",
      description:
        "See exactly which seats are inactive and which tools are underused. Identify subscriptions that no longer justify their cost and cut waste instantly.",
      stageKind: "video",
      visualVideo: siteAssetManifest.featureSplitEliminateVideo,
    },
    {
      id: "renewals",
      order: 3,
      title: "Never get blindsided by a renewal again",
      description:
        "Auto-renewals should not be a surprise. Get proactive alerts before charges hit, so you always have time to cancel, negotiate, or renew on your terms.",
      stageKind: "video",
      visualVideo: siteAssetManifest.subscriptionsRenewalsVideo,
    },
    {
      id: "consolidate",
      order: 4,
      title: "Consolidate duplicate tools and cut overlap",
      description:
        "Three teams, three project management tools, all on your bill. Spot redundant apps across departments and make confident consolidation decisions in one click.",
      stageKind: "video",
      visualVideo: siteAssetManifest.featureSplitConsolidateVideo,
    },
  ] satisfies readonly FeaturePointContent[],
  defaultPointId: "discover",
} as const satisfies FeatureSplitSectionContent;
