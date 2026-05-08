export interface OrbitSlotLike {
  leftPx: number;
  sizePx: number;
  topPx: number;
}

export interface OrbitPoint {
  x: number;
  y: number;
}

export interface OrbitEllipse {
  cx: number;
  cy: number;
  rx: number;
  ry: number;
}

export type OrbitCardVariant = "upwardArc" | "downwardArc";

export interface OrbitAnimatedState {
  anchorIndex: number;
  opacity: number;
  progress: number;
}

export function getOrbitSlotCenter(slot: OrbitSlotLike): OrbitPoint;
export function getOrbitEllipseFromSlots(visibleSlots: readonly OrbitSlotLike[], cardVariant: OrbitCardVariant): OrbitEllipse;
export function getOrbitProgressForPoint(point: OrbitPoint, ellipse: OrbitEllipse, cardVariant: OrbitCardVariant): number;
export function getOrbitPointAtProgress(progress: number, ellipse: OrbitEllipse, cardVariant: OrbitCardVariant): OrbitPoint;
export function getOrbitAnchorProgresses(
  visibleSlots: readonly OrbitSlotLike[],
  cardVariant: OrbitCardVariant,
  totalApps: number,
  visibleCount?: number,
): number[];
export function getOrbitAnimatedState(
  anchorProgresses: readonly number[],
  appIndex: number,
  phase: number,
  visibleCount?: number,
): OrbitAnimatedState;
