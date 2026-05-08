import type { SiteAssetEntry } from "@/lib/assets/site";
import { siteAssetManifest } from "@/lib/assets/site";

export const FIGMA_INTEGRATION_CARD_FRAME = {
  height: 382,
  width: 523,
} as const;

export type IntegrationCardVariant = "upwardArc" | "downwardArc";

export interface IntegrationOrbitSlotRecipe {
  id: string;
  leftPx: number;
  sizePx: number;
  topPx: number;
}

export interface IntegrationCopyFrameRecipe {
  descriptionWidthPx: number;
  topPx: number;
  widthPx: number;
}

export interface IntegrationCenterBrandRecipe {
  gapPx: number;
  hideRegionLabel?: boolean;
  logoSizePx: number;
  topPx: number;
}

export interface IntegrationTabRailRecipe {
  activeInsetPx: number;
  bottomPx: number;
  gapPx: number;
  heightPx: number;
  paddingPx: number;
  widthPx: number;
}

export interface IntegrationDescriptionEmphasisRecipe {
  mode: "providerName" | "text";
  text?: string;
}

export interface IntegrationCardVisualRecipe {
  arcFrame: {
    artHeightPx: number;
    asset: SiteAssetEntry;
    heightPx: number;
    leftPx: number;
    rotationDeg?: number;
    topPx: number;
    widthPx: number;
  };
  cardVariant: IntegrationCardVariant;
  centerBrand?: IntegrationCenterBrandRecipe;
  copyFrame: IntegrationCopyFrameRecipe;
  descriptionEmphasis?: IntegrationDescriptionEmphasisRecipe;
  hiddenOrbitRange: {
    endLeftPx: number;
    endTopPx: number;
    startLeftPx: number;
    startTopPx: number;
  };
  tabRail?: IntegrationTabRailRecipe;
  visibleSlots: readonly IntegrationOrbitSlotRecipe[];
}

const integrationCardVisualRecipes: Record<string, IntegrationCardVisualRecipe> = {
  "banking-and-accounting": {
    arcFrame: {
      artHeightPx: 224.309,
      asset: siteAssetManifest.integrationsUpwardArcOuter,
      heightPx: 471,
      leftPx: 23,
      topPx: 20,
      widthPx: 476,
    },
    cardVariant: "upwardArc",
    centerBrand: {
      gapPx: 8,
      hideRegionLabel: true,
      logoSizePx: 31,
      topPx: 140,
    },
    copyFrame: {
      descriptionWidthPx: 315,
      topPx: 200,
      widthPx: 415,
    },
    descriptionEmphasis: {
      mode: "providerName",
    },
    hiddenOrbitRange: {
      endLeftPx: 46,
      endTopPx: 278,
      startLeftPx: 372,
      startTopPx: 276,
    },
    tabRail: {
      activeInsetPx: 3,
      bottomPx: 14.5,
      gapPx: 4,
      heightPx: 33,
      paddingPx: 3,
      widthPx: 160,
    },
    visibleSlots: [
      {
        id: "left-mid",
        leftPx: 12,
        sizePx: 108.384,
        topPx: 163,
      },
      {
        id: "top-left",
        leftPx: 138,
        sizePx: 108.384,
        topPx: 20,
      },
      {
        id: "top-right",
        leftPx: 283.99,
        sizePx: 108.384,
        topPx: 20,
      },
      {
        id: "right-mid",
        leftPx: 400,
        sizePx: 108.384,
        topPx: 158,
      },
    ],
  },
  "direct-integration": {
    arcFrame: {
      artHeightPx: 226.691,
      asset: siteAssetManifest.integrationsDownwardArcOuter,
      heightPx: 476,
      leftPx: 24,
      rotationDeg: 180,
      topPx: -130,
      widthPx: 476,
    },
    cardVariant: "downwardArc",
    copyFrame: {
      descriptionWidthPx: 315,
      topPx: 96,
      widthPx: 252,
    },
    hiddenOrbitRange: {
      endLeftPx: 42,
      endTopPx: 52,
      startLeftPx: 374,
      startTopPx: 52,
    },
    visibleSlots: [
      {
        id: "left-mid",
        leftPx: 11.63,
        sizePx: 108.384,
        topPx: 88.35,
      },
      {
        id: "bottom-left",
        leftPx: 107,
        sizePx: 108.384,
        topPx: 225,
      },
      {
        id: "bottom-right",
        leftPx: 306,
        sizePx: 108.384,
        topPx: 225,
      },
      {
        id: "right-mid",
        leftPx: 403.61,
        sizePx: 108.384,
        topPx: 90.44,
      },
    ],
  },
  hris: {
    arcFrame: {
      artHeightPx: 226.691,
      asset: siteAssetManifest.integrationsDownwardArcOuter,
      heightPx: 476,
      leftPx: 24,
      rotationDeg: 180,
      topPx: -130,
      widthPx: 476,
    },
    cardVariant: "downwardArc",
    copyFrame: {
      descriptionWidthPx: 295,
      topPx: 87,
      widthPx: 295,
    },
    hiddenOrbitRange: {
      endLeftPx: 42,
      endTopPx: 52,
      startLeftPx: 374,
      startTopPx: 52,
    },
    visibleSlots: [
      {
        id: "left-mid",
        leftPx: 11.63,
        sizePx: 108.384,
        topPx: 88.35,
      },
      {
        id: "bottom-left",
        leftPx: 107,
        sizePx: 108.384,
        topPx: 225,
      },
      {
        id: "bottom-right",
        leftPx: 306,
        sizePx: 108.384,
        topPx: 225,
      },
      {
        id: "right-mid",
        leftPx: 403.61,
        sizePx: 108.384,
        topPx: 90.44,
      },
    ],
  },
  sso: {
    arcFrame: {
      artHeightPx: 224.309,
      asset: siteAssetManifest.integrationsUpwardArcOuter,
      heightPx: 471,
      leftPx: 23,
      topPx: 20,
      widthPx: 476,
    },
    cardVariant: "upwardArc",
    copyFrame: {
      descriptionWidthPx: 315,
      topPx: 200,
      widthPx: 292,
    },
    descriptionEmphasis: {
      mode: "text",
      text: "Your Company",
    },
    hiddenOrbitRange: {
      endLeftPx: 46,
      endTopPx: 278,
      startLeftPx: 372,
      startTopPx: 276,
    },
    visibleSlots: [
      {
        id: "left-mid",
        leftPx: 12,
        sizePx: 108.384,
        topPx: 163,
      },
      {
        id: "top-left",
        leftPx: 138,
        sizePx: 108.384,
        topPx: 20,
      },
      {
        id: "top-right",
        leftPx: 283.99,
        sizePx: 108.384,
        topPx: 20,
      },
      {
        id: "right-mid",
        leftPx: 400,
        sizePx: 108.384,
        topPx: 158,
      },
    ],
  },
};

export function getIntegrationCardVisualRecipe(cardId: string) {
  return integrationCardVisualRecipes[cardId];
}
