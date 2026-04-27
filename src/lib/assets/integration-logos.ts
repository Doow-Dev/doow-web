import { assetUrl } from "@/lib/assets/blob";

export interface IntegrationLogoAssetEntry {
  format: "raster" | "vector";
  id: string;
  src: string;
}

export const integrationLogoAssetManifest = {
  asana: {
    format: "vector",
    id: "integration-logo-asana",
    src: "/assets/icons/asana-app-icon.svg",
  },
  authress: {
    format: "vector",
    id: "integration-logo-authress",
    src: "/assets/icons/authress.svg",
  },
  bambooHr: {
    format: "vector",
    id: "integration-logo-bamboohr",
    src: "/assets/icons/bamboo.svg",
  },
  claude: {
    format: "vector",
    id: "integration-logo-claude",
    src: "/assets/icons/claude.svg",
  },
  codex: {
    format: "vector",
    id: "integration-logo-codex",
    src: "/assets/icons/codex.svg",
  },
  microsoftEntraId: {
    format: "vector",
    id: "integration-logo-microsoft-entra-id",
    src: "/assets/icons/microsoft-entra.svg",
  },
  obsidian: {
    format: "vector",
    id: "integration-logo-obsidian",
    src: "/assets/icons/obsidian.svg",
  },
  plaidBanking: {
    ally: {
      format: "raster",
      id: "integration-logo-ally-bank",
      src: assetUrl("ally.com.webp"),
    },
    bankOfAmerica: {
      format: "raster",
      id: "integration-logo-bank-of-america",
      src: assetUrl("bankofamerica.com.webp"),
    },
    capitalOne: {
      format: "raster",
      id: "integration-logo-capital-one",
      src: assetUrl("capitalone.com.webp"),
    },
    chase: {
      format: "raster",
      id: "integration-logo-chase",
      src: assetUrl("chase.com.webp"),
    },
    citi: {
      format: "raster",
      id: "integration-logo-citi",
      src: assetUrl("citi.com.webp"),
    },
    pnc: {
      format: "raster",
      id: "integration-logo-pnc-bank",
      src: assetUrl("pnc.com.webp"),
    },
    td: {
      format: "raster",
      id: "integration-logo-td-bank",
      src: assetUrl("td.com.webp"),
    },
    truist: {
      format: "raster",
      id: "integration-logo-truist",
      src: assetUrl("truist.com.webp"),
    },
    usBank: {
      format: "raster",
      id: "integration-logo-us-bank",
      src: assetUrl("usbank.com.webp"),
    },
    wellsFargo: {
      format: "raster",
      id: "integration-logo-wells-fargo",
      src: assetUrl("wellsfargo.com.webp"),
    },
  },
  zohoBooks: {
    format: "vector",
    id: "integration-logo-zohobooks",
    src: "/assets/icons/zohobooks.svg",
  },
  zohoPeople: {
    format: "vector",
    id: "integration-logo-zohopeople",
    src: "/assets/icons/zohopeople.svg",
  },
  tiptap: {
    format: "vector",
    id: "integration-logo-tiptap",
    src: "/assets/icons/tiptap.svg",
  },
  // Temporary local fallback exported from Figma node 605:59602 until the canonical blob URL is published.
  yapily: {
    format: "raster",
    id: "integration-logo-yapily",
    src: "/assets/icons/yapily.jpg",
  },
} as const satisfies {
  asana: IntegrationLogoAssetEntry;
  authress: IntegrationLogoAssetEntry;
  bambooHr: IntegrationLogoAssetEntry;
  claude: IntegrationLogoAssetEntry;
  codex: IntegrationLogoAssetEntry;
  microsoftEntraId: IntegrationLogoAssetEntry;
  obsidian: IntegrationLogoAssetEntry;
  plaidBanking: {
    ally: IntegrationLogoAssetEntry;
    bankOfAmerica: IntegrationLogoAssetEntry;
    capitalOne: IntegrationLogoAssetEntry;
    chase: IntegrationLogoAssetEntry;
    citi: IntegrationLogoAssetEntry;
    pnc: IntegrationLogoAssetEntry;
    td: IntegrationLogoAssetEntry;
    truist: IntegrationLogoAssetEntry;
    usBank: IntegrationLogoAssetEntry;
    wellsFargo: IntegrationLogoAssetEntry;
  };
  tiptap: IntegrationLogoAssetEntry;
  yapily: IntegrationLogoAssetEntry;
  zohoBooks: IntegrationLogoAssetEntry;
  zohoPeople: IntegrationLogoAssetEntry;
};
