const APPLICATIONS_HERO_PILL_SCENE_WIDTH = 1425;
const APPLICATIONS_HERO_PILL_SCENE_HEIGHT = 585;
const APPLICATIONS_HERO_PILL_SCENE_TOP_OFFSET = 118.6;
const APPLICATIONS_HERO_PILL_HEIGHT = 56;

export type ApplicationsHeroPillLogoKey =
  | "asana"
  | "authress"
  | "bamboo"
  | "bamboohr"
  | "claude"
  | "codex"
  | "deel"
  | "google"
  | "gusto"
  | "microsoftentraid"
  | "netsuite"
  | "notion"
  | "obsidian"
  | "okta"
  | "onelogin"
  | "plaid"
  | "quickbooks"
  | "sage"
  | "salesforce"
  | "slack"
  | "tiptap"
  | "windows"
  | "yapily"
  | "zoho"
  | "zohobooks"
  | "zohopeople";

interface ApplicationsHeroPillMotionProfile {
  floatDelayMs: number;
  floatDistancePx: number;
  floatDurationMs: number;
  introDelayMs: number;
}

interface ApplicationsHeroPillBase extends ApplicationsHeroPillMotionProfile {
  hideOnMobile: boolean;
  id: string;
  label: string;
  opacity: number;
  width: number;
  x: number;
  y: number;
}

export interface ApplicationsHeroTextPill extends ApplicationsHeroPillBase {
  kind: "text";
}

export interface ApplicationsHeroBrandPill extends ApplicationsHeroPillBase {
  kind: "brand";
  logoGap?: number;
  logoHeight: number;
  logoKey: ApplicationsHeroPillLogoKey;
  logoWidth: number;
}

export type ApplicationsHeroPillItem = ApplicationsHeroTextPill | ApplicationsHeroBrandPill;

export interface ApplicationsHeroPillFieldContent {
  items: readonly ApplicationsHeroPillItem[];
  pillHeight: number;
  sceneHeight: number;
  sceneTopOffset: number;
  sceneWidth: number;
}

interface BasePillConfig {
  id?: string;
  label: string;
  showOnMobile?: boolean;
  width: number;
  x: number;
}

interface BrandPillConfig extends BasePillConfig {
  kind: "brand";
  logoGap?: number;
  logoHeight: number;
  logoKey: ApplicationsHeroPillLogoKey;
  logoWidth: number;
}

interface TextPillConfig extends BasePillConfig {
  kind?: "text";
}

type PillConfig = BrandPillConfig | TextPillConfig;

function slugifyLabel(value: string) {
  return value.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-");
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function getRowBaseOpacity(y: number) {
  if (y <= 72) {
    return 0.12;
  }

  if (y <= 144) {
    return 0.21;
  }

  if (y <= 216) {
    return 0.23;
  }

  if (y <= 288) {
    return 0.3;
  }

  if (y <= 360) {
    return 0.34;
  }

  if (y <= 432) {
    return 0.28;
  }

  if (y <= 504) {
    return 0.23;
  }

  return 0.18;
}

function getPillOpacity(config: PillConfig, y: number) {
  const sceneCenter = APPLICATIONS_HERO_PILL_SCENE_WIDTH / 2;
  const pillCenter = config.x + config.width / 2;
  const centerDistance = Math.abs(sceneCenter - pillCenter) / sceneCenter;
  const edgeMultiplier = 0.55 + (1 - centerDistance) * 0.45;
  const brandBoost = config.kind === "brand" ? 0.08 : 0;

  return Number(clamp(getRowBaseOpacity(y) * edgeMultiplier + brandBoost, 0.08, 0.46).toFixed(3));
}

function getMotionProfile(rowIndex: number, itemIndex: number, isBrand: boolean): ApplicationsHeroPillMotionProfile {
  return {
    introDelayMs: 80 + rowIndex * 48 + itemIndex * 18,
    floatDelayMs: (rowIndex * 90 + itemIndex * 120) % 1400,
    floatDistancePx: Number((isBrand ? 4.6 : 3.6 + ((rowIndex + itemIndex) % 3) * 0.55).toFixed(2)),
    floatDurationMs: 4200 + ((rowIndex * 180 + itemIndex * 230) % 1800),
  };
}

function createPill(y: number, rowIndex: number, itemIndex: number, config: PillConfig): ApplicationsHeroPillItem {
  const motion = getMotionProfile(rowIndex, itemIndex, config.kind === "brand");
  const id = config.id ?? slugifyLabel(config.label);
  const opacity = getPillOpacity(config, y);

  if (config.kind === "brand") {
    return {
      ...motion,
      hideOnMobile: config.showOnMobile !== true,
      id,
      kind: "brand",
      label: config.label,
      logoGap: config.logoGap,
      logoHeight: config.logoHeight,
      logoKey: config.logoKey,
      logoWidth: config.logoWidth,
      opacity,
      width: config.width,
      x: config.x,
      y,
    };
  }

  return {
    ...motion,
    hideOnMobile: config.showOnMobile !== true,
    id,
    kind: "text",
    label: config.label,
    opacity,
    width: config.width,
    x: config.x,
    y,
  };
}

function createRow(y: number, rowIndex: number, items: readonly PillConfig[]) {
  return items.map((item, itemIndex) => createPill(y, rowIndex, itemIndex, item));
}

const applicationsHeroPillItems = [
  ...createRow(72, 0, [
    { kind: "brand", label: "Bamboo", logoGap: 6, logoHeight: 20, logoKey: "bamboo", logoWidth: 20, width: 170.41, x: -124.328125 },
    { kind: "brand", label: "BambooHR", logoGap: 6, logoHeight: 22, logoKey: "bamboohr", logoWidth: 22, width: 201.73, x: 62.078125 },
    {
      kind: "brand",
      label: "Deel",
      logoGap: 6,
      logoHeight: 20,
      logoKey: "deel",
      logoWidth: 20,
      showOnMobile: true,
      width: 212.17,
      x: 279.80859375,
    },
    { kind: "brand", label: "Gusto", logoGap: 6, logoHeight: 20, logoKey: "gusto", logoWidth: 20, width: 201.73, x: 507.98046875 },
    {
      kind: "brand",
      label: "Microsoft Entra ID",
      logoGap: 6,
      logoHeight: 20,
      logoKey: "microsoftentraid",
      logoWidth: 20,
      width: 201.73,
      x: 725.71875,
    },
    { kind: "brand", label: "NetSuite", logoGap: 6, logoHeight: 20, logoKey: "netsuite", logoWidth: 20, showOnMobile: true, width: 201.73, x: 943.44921875 },
    { kind: "brand", label: "Notion", logoGap: 6, logoHeight: 20, logoKey: "notion", logoWidth: 20, width: 212.17, x: 1161.19140625 },
    { kind: "brand", label: "Okta", logoGap: 6, logoHeight: 20, logoKey: "okta", logoWidth: 20, width: 159.97, x: 1389.359375 },
  ]),
  ...createRow(144, 1, [
    { kind: "brand", label: "OneLogin", logoGap: 6, logoHeight: 20, logoKey: "onelogin", logoWidth: 20, width: 243.48, x: -160.83999633789062 },
    { kind: "brand", label: "Plaid", logoGap: 6, logoHeight: 20, logoKey: "plaid", logoWidth: 20, width: 212.17, x: 98.640625 },
    { kind: "brand", label: "Obsidian", logoGap: 4, logoHeight: 22, logoKey: "obsidian", logoWidth: 22, width: 201.73, x: 326.80859375 },
    {
      kind: "brand",
      label: "QuickBooks",
      logoGap: 6,
      logoHeight: 20,
      logoKey: "quickbooks",
      logoWidth: 20,
      showOnMobile: true,
      width: 243.48,
      x: 544.55078125,
    },
    { kind: "brand", label: "Claude", logoGap: 5, logoHeight: 21, logoKey: "claude", logoWidth: 21, showOnMobile: true, width: 212.17, x: 804.03125 },
    { kind: "brand", label: "Sage", logoGap: 6, logoHeight: 20, logoKey: "sage", logoWidth: 20, width: 170.41, x: 1032.19921875 },
    { kind: "brand", label: "Salesforce", logoGap: 6, logoHeight: 17, logoKey: "salesforce", logoWidth: 22, width: 180.84, x: 1218.609375 },
  ]),
  ...createRow(216, 2, [
    { kind: "brand", label: "Windows", logoGap: 6, logoHeight: 20, logoKey: "windows", logoWidth: 20, width: 180.84, x: -87.75 },
    { kind: "brand", label: "Yapily", logoGap: 6, logoHeight: 21, logoKey: "yapily", logoWidth: 21, width: 253.92, x: 109.08999633789062 },
    {
      id: "zoho-brand",
      kind: "brand",
      label: "Zoho",
      logoGap: 6,
      logoHeight: 20,
      logoKey: "zoho",
      logoWidth: 20,
      showOnMobile: true,
      width: 180.84,
      x: 586.30078125,
    },
    { kind: "brand", label: "Zoho Books", logoGap: 6, logoHeight: 21, logoKey: "zohobooks", logoWidth: 21, showOnMobile: true, width: 170.41, x: 783.140625 },
    { kind: "brand", label: "Zoho People", logoGap: 6, logoHeight: 21, logoKey: "zohopeople", logoWidth: 21, width: 191.28, x: 969.55078125 },
    { label: "Microsoft", width: 159.97, x: 1176.828125 },
    { label: "OpenAI", width: 159.97, x: 1352.80078125 },
  ]),
  ...createRow(288, 3, [
    { label: "ChatGPT", width: 212.17, x: -93.75 },
    { label: "Google Workspace", showOnMobile: true, width: 274.81, x: 134.421875 },
    { kind: "brand", label: "Slack", logoGap: 5, logoHeight: 14, logoKey: "slack", logoWidth: 14, width: 212.17, x: 425.23046875 },
    { label: "Atlassian", width: 191.28, x: 653.4099731445312 },
    { kind: "brand", label: "TipTap", logoGap: 0, logoHeight: 33, logoKey: "tiptap", logoWidth: 33, width: 233.05, x: 860.69140625 },
    { label: "GitHub", showOnMobile: true, width: 191.28, x: 1109.73046875 },
    { label: "Twilio", width: 201.73, x: 1317.01953125 },
  ]),
  ...createRow(360, 4, [
    { label: "Cursor", width: 212.17, x: -88.53125 },
    { label: "Xero", width: 222.61, x: 139.640625 },
    {
      kind: "brand",
      label: "Authress",
      logoGap: 4,
      logoHeight: 24,
      logoKey: "authress",
      logoWidth: 14,
      showOnMobile: true,
      width: 191.28,
      x: 378.25,
    },
    { label: "Adobe Creative Cloud", width: 285.25, x: 585.53125 },
    { kind: "brand", label: "Google", logoGap: 5, logoHeight: 14, logoKey: "google", logoWidth: 14, showOnMobile: true, width: 191.28, x: 886.78125 },
    { label: "Cledara", width: 201.73, x: 1094.05859375 },
    { label: "Webflow", width: 201.73, x: 1311.80078125 },
  ]),
  ...createRow(432, 5, [
    { label: "Adobe", width: 180.84, x: -78.078125 },
    { label: "Anthropic", width: 212.17, x: 118.76953125 },
    { kind: "brand", label: "Codex", logoGap: 1, logoHeight: 35, logoKey: "codex", logoWidth: 35, showOnMobile: true, width: 222.61, x: 346.94140625 },
    { label: "Mailchimp", width: 233.05, x: 585.55078125 },
    {
      id: "asana-brand",
      kind: "brand",
      label: "Asana",
      logoGap: 8,
      logoHeight: 20,
      logoKey: "asana",
      logoWidth: 20,
      showOnMobile: true,
      width: 285.25,
      x: 834.5900268554688,
    },
    { label: "HubSpot", width: 170.41, x: 1135.8399658203125 },
    { label: "JetBrains", width: 180.84, x: 1322.25 },
  ]),
  ...createRow(504, 6, [
    { label: "Sentry", width: 212.17, x: -130.28125 },
    { label: "LinkedIn Sales Nav", showOnMobile: true, width: 295.69, x: 97.890625 },
    { label: "1Password", width: 233.05, x: 409.578125 },
    { label: "CircleCI", width: 243.48, x: 658.62890625 },
    { label: "Zapier", showOnMobile: true, width: 212.17, x: 918.109375 },
    { label: "Miro", width: 222.61, x: 1146.28125 },
    { label: "Canva", width: 170.41, x: 1384.890625 },
  ]),
  ...createRow(576, 7, [
    { label: "Typeform", width: 201.73, x: -72.87109375 },
    { label: "SendGrid", width: 222.61, x: 144.859375 },
    { label: "Loom", showOnMobile: true, width: 191.28, x: 383.46875 },
    { label: "Calendly", width: 222.61, x: 590.75 },
    { label: "Vercel", showOnMobile: true, width: 233.05, x: 829.359375 },
    { label: "Intercom", width: 201.73, x: 1078.4100341796875 },
    { label: "Zendesk", width: 201.73, x: 1296.140625 },
  ]),
] as const satisfies readonly ApplicationsHeroPillItem[];

export const applicationsHeroPillFieldContent = {
  items: applicationsHeroPillItems,
  pillHeight: APPLICATIONS_HERO_PILL_HEIGHT,
  sceneHeight: APPLICATIONS_HERO_PILL_SCENE_HEIGHT,
  sceneTopOffset: APPLICATIONS_HERO_PILL_SCENE_TOP_OFFSET,
  sceneWidth: APPLICATIONS_HERO_PILL_SCENE_WIDTH,
} as const satisfies ApplicationsHeroPillFieldContent;
