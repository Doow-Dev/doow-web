import type { ComponentType, SVGProps } from "react";

import { BambooAppIcon } from "@/components/custom/icons/bamboo-app-icon";
import { DeelAppIcon } from "@/components/custom/icons/deel-app-icon";
import { GoogleAppIcon } from "@/components/custom/icons/google-app-icon";
import { GustoAppIcon } from "@/components/custom/icons/gusto-app-icon";
import { NetSuiteAppIcon } from "@/components/custom/icons/netsuite-app-icon";
import { NotionAppIcon } from "@/components/custom/icons/notion-app-icon";
import { OktaAppIcon } from "@/components/custom/icons/okta-app-icon";
import { OneLoginAppIcon } from "@/components/custom/icons/onelogin-app-icon";
import { PlaidAppIcon } from "@/components/custom/icons/plaid-app-icon";
import { QuickBooksAppIcon } from "@/components/custom/icons/quickbooks-app-icon";
import { SageAppIcon } from "@/components/custom/icons/sage-app-icon";
import { SlackAppIcon } from "@/components/custom/icons/slack-app-icon";
import { WindowsAppIcon } from "@/components/custom/icons/windows-app-icon";
import { ZohoAppIcon } from "@/components/custom/icons/zoho-app-icon";
import { integrationLogoAssetManifest } from "@/lib/assets/integration-logos";

type IntegrationAppIconComponent = ComponentType<SVGProps<SVGSVGElement>>;

export type IntegrationAppAssetFormat = "raster" | "vector";
export type IntegrationAppStaticAsset = string | { format?: IntegrationAppAssetFormat; src: string };

export type IntegrationAppGraphicSource =
  | {
      component: IntegrationAppIconComponent;
      kind: "component";
    }
  | {
      format?: IntegrationAppAssetFormat;
      kind: "asset";
      src: string;
    };

function componentEntry(component: IntegrationAppIconComponent): IntegrationAppGraphicSource {
  return {
    component,
    kind: "component",
  };
}

function assetEntry(asset: IntegrationAppStaticAsset): IntegrationAppGraphicSource {
  return {
    format: typeof asset === "string" ? undefined : asset.format,
    kind: "asset",
    src: typeof asset === "string" ? asset : asset.src,
  };
}

const integrationAppIconRegistry: Record<string, IntegrationAppGraphicSource> = {
  asana: assetEntry(integrationLogoAssetManifest.asana),
  allycom: assetEntry(integrationLogoAssetManifest.plaidBanking.ally),
  authress: assetEntry(integrationLogoAssetManifest.authress),
  bamboo: componentEntry(BambooAppIcon),
  bamboohr: assetEntry(integrationLogoAssetManifest.bambooHr),
  bankofamericacom: assetEntry(integrationLogoAssetManifest.plaidBanking.bankOfAmerica),
  capitalonecom: assetEntry(integrationLogoAssetManifest.plaidBanking.capitalOne),
  chasecom: assetEntry(integrationLogoAssetManifest.plaidBanking.chase),
  citicom: assetEntry(integrationLogoAssetManifest.plaidBanking.citi),
  claude: assetEntry(integrationLogoAssetManifest.claude),
  codex: assetEntry(integrationLogoAssetManifest.codex),
  deel: componentEntry(DeelAppIcon),
  google: componentEntry(GoogleAppIcon),
  googleworkspace: componentEntry(GoogleAppIcon),
  gusto: componentEntry(GustoAppIcon),
  microsoftentra: assetEntry(integrationLogoAssetManifest.microsoftEntraId),
  microsoftentraid: assetEntry(integrationLogoAssetManifest.microsoftEntraId),
  netsuite: componentEntry(NetSuiteAppIcon),
  notion: componentEntry(NotionAppIcon),
  obsidian: assetEntry(integrationLogoAssetManifest.obsidian),
  okta: componentEntry(OktaAppIcon),
  onelogin: componentEntry(OneLoginAppIcon),
  plaid: componentEntry(PlaidAppIcon),
  quickbooks: componentEntry(QuickBooksAppIcon),
  sage: componentEntry(SageAppIcon),
  slack: componentEntry(SlackAppIcon),
  tdcom: assetEntry(integrationLogoAssetManifest.plaidBanking.td),
  tiptap: assetEntry(integrationLogoAssetManifest.tiptap),
  truistcom: assetEntry(integrationLogoAssetManifest.plaidBanking.truist),
  usbankcom: assetEntry(integrationLogoAssetManifest.plaidBanking.usBank),
  wellsfargocom: assetEntry(integrationLogoAssetManifest.plaidBanking.wellsFargo),
  windows: componentEntry(WindowsAppIcon),
  zoho: componentEntry(ZohoAppIcon),
  zohobooks: assetEntry(integrationLogoAssetManifest.zohoBooks),
  zohopeople: assetEntry(integrationLogoAssetManifest.zohoPeople),
};

function normalizeIntegrationAppName(name?: string) {
  return name?.trim().toLowerCase().replace(/[^a-z0-9]+/g, "") ?? "";
}

export function getIntegrationAppGraphic(...names: Array<string | undefined>) {
  for (const name of names) {
    const normalizedName = normalizeIntegrationAppName(name);

    if (!normalizedName) {
      continue;
    }

    const icon = integrationAppIconRegistry[normalizedName];

    if (icon) {
      return icon;
    }
  }

  return null;
}

export function getIntegrationAppIcon(...names: Array<string | undefined>) {
  const graphic = getIntegrationAppGraphic(...names);

  return graphic?.kind === "component" ? graphic.component : null;
}
