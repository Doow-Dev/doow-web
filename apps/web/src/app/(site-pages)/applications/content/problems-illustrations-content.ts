export type ApplicationsProblemDepartmentIconKey = "code" | "design" | "dollar";
export type ApplicationsProblemDuplicateToolsAppId = "asana" | "notion" | "slack";
export type ApplicationsProblemDuplicateToolsNodeId = "design" | "engineering" | "marketing";
export type ApplicationsProblemAvatarAssetKey = "user1" | "user2" | "user3" | "user4";
export type ApplicationsProblemAvatarState = "active" | "muted";
export type ApplicationsProblemCostBarTone = "primary" | "secondary";

export interface ApplicationsProblemDuplicateToolsApp {
  id: ApplicationsProblemDuplicateToolsAppId;
  label: string;
  names: readonly [string, ...string[]];
}

export interface ApplicationsProblemDuplicateToolsNode {
  iconKey: ApplicationsProblemDepartmentIconKey;
  id: ApplicationsProblemDuplicateToolsNodeId;
  label: string;
}

export interface ApplicationsProblemAvatarSlot {
  assetKey: ApplicationsProblemAvatarAssetKey;
  id: string;
  state: ApplicationsProblemAvatarState;
  x: number;
  y: number;
}

export interface ApplicationsProblemCostBar {
  height: number;
  id: string;
  tone: ApplicationsProblemCostBarTone;
  width: number;
  x: number;
}

export interface ApplicationsProblemCostMarker {
  id: string;
  x: number;
  y: number;
}

export interface ApplicationsProblemCostLinePoint {
  x: number;
  y: number;
}

export const applicationsProblemAvatarAssetMap = {
  user1: "/assets/icons/user1.svg",
  user2: "/assets/icons/user2.svg",
  user3: "/assets/icons/user3.svg",
  user4: "/assets/icons/user4.svg",
} as const satisfies Record<ApplicationsProblemAvatarAssetKey, string>;

export const applicationsProblemDuplicateToolsApps = [
  {
    id: "slack",
    label: "Slack",
    names: ["slack", "Slack"],
  },
  {
    id: "notion",
    label: "Notion",
    names: ["notion", "Notion"],
  },
  {
    id: "asana",
    label: "Asana",
    names: ["asana", "Asana"],
  },
] as const satisfies readonly ApplicationsProblemDuplicateToolsApp[];

export const applicationsProblemDuplicateToolsNodes = [
  {
    iconKey: "design",
    id: "design",
    label: "Design",
  },
  {
    iconKey: "dollar",
    id: "marketing",
    label: "Marketing",
  },
  {
    iconKey: "code",
    id: "engineering",
    label: "Engineering",
  },
] as const satisfies readonly ApplicationsProblemDuplicateToolsNode[];

export const applicationsProblemVisibilityAvatarSlots = [
  { assetKey: "user4", id: "slot-1", state: "active", x: 8, y: 0 },
  { assetKey: "user1", id: "slot-2", state: "muted", x: 44, y: 0 },
  { assetKey: "user3", id: "slot-3", state: "active", x: 80, y: 0 },
  { assetKey: "user2", id: "slot-4", state: "muted", x: 116, y: 0 },
  { assetKey: "user4", id: "slot-5", state: "active", x: 152, y: 0 },
  { assetKey: "user1", id: "slot-6", state: "muted", x: 188, y: 0 },
  { assetKey: "user2", id: "slot-7", state: "active", x: 224, y: 0 },
  { assetKey: "user1", id: "slot-8", state: "muted", x: 260, y: 0 },
  { assetKey: "user1", id: "slot-9", state: "muted", x: 296, y: 0 },
  { assetKey: "user4", id: "slot-10", state: "active", x: 8, y: 40 },
  { assetKey: "user3", id: "slot-11", state: "active", x: 44, y: 40 },
  { assetKey: "user4", id: "slot-12", state: "active", x: 80, y: 40 },
  { assetKey: "user4", id: "slot-13", state: "active", x: 116, y: 40 },
  { assetKey: "user1", id: "slot-14", state: "muted", x: 152, y: 40 },
  { assetKey: "user2", id: "slot-15", state: "active", x: 188, y: 40 },
  { assetKey: "user3", id: "slot-16", state: "active", x: 224, y: 40 },
  { assetKey: "user4", id: "slot-17", state: "active", x: 260, y: 40 },
  { assetKey: "user2", id: "slot-18", state: "active", x: 296, y: 40 },
  { assetKey: "user3", id: "slot-19", state: "active", x: 8, y: 80 },
  { assetKey: "user1", id: "slot-20", state: "muted", x: 44, y: 80 },
  { assetKey: "user2", id: "slot-21", state: "active", x: 80, y: 80 },
  { assetKey: "user3", id: "slot-22", state: "active", x: 116, y: 80 },
  { assetKey: "user2", id: "slot-23", state: "active", x: 152, y: 80 },
  { assetKey: "user1", id: "slot-24", state: "muted", x: 188, y: 80 },
  { assetKey: "user4", id: "slot-25", state: "active", x: 224, y: 80 },
  { assetKey: "user2", id: "slot-26", state: "active", x: 260, y: 80 },
  { assetKey: "user1", id: "slot-27", state: "muted", x: 296, y: 80 },
] as const satisfies readonly ApplicationsProblemAvatarSlot[];

export const applicationsProblemCostBars = [
  { height: 43.6133, id: "bar-1", tone: "primary", width: 21.0278, x: 40.0898 },
  { height: 84.1113, id: "bar-2", tone: "primary", width: 21.0278, x: 89.1563 },
  { height: 118.3789, id: "bar-3", tone: "primary", width: 21.0278, x: 138.2188 },
  { height: 146.416, id: "bar-4", tone: "primary", width: 21.0278, x: 187.2852 },
  { height: 181.4624, id: "bar-5", tone: "secondary", width: 21.0278, x: 236.3516 },
  { height: 240.6519, id: "bar-6", tone: "primary", width: 21.0278, x: 285.4141 },
] as const satisfies readonly ApplicationsProblemCostBar[];

export const applicationsProblemCostMarkers = [
  { id: "marker-1", x: 39.7031, y: 187.1006 },
  { id: "marker-2", x: 94.2188, y: 146.6025 },
  { id: "marker-3", x: 145.6211, y: 98.3164 },
  { id: "marker-4", x: 192.3477, y: 58.5972 },
  { id: "marker-5", x: 240.2461, y: 21.9932 },
] as const satisfies readonly ApplicationsProblemCostMarker[];

export const applicationsProblemCostLinePoints = [
  { x: 22, y: 203 },
  { x: 59, y: 180 },
  { x: 109, y: 145 },
  { x: 158, y: 108 },
  { x: 208, y: 67 },
  { x: 268, y: 26 },
] as const satisfies readonly ApplicationsProblemCostLinePoint[];
