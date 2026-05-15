import Image from "next/image";
import { createElement, type CSSProperties } from "react";

import { cn } from "@/lib/utils";
import { CodeIcon } from "@/components/custom/icons/code-icon";
import { DesignIcon } from "@/components/custom/icons/design-icon";
import { DollarIcon } from "@/components/custom/icons/dollar-icon";
import { getIntegrationAppGraphic } from "@/components/custom/icons/integration-app-icon-registry";

export type ApplicationsIllustrationDepartmentIconKey = "code" | "design" | "dollar";
export type ApplicationsIllustrationAvatarState = "active" | "muted";
export type ApplicationsIllustrationCostBarTone = "primary" | "secondary";

export interface ApplicationsIllustrationDuplicateToolsApp {
  id: string;
  names: readonly [string, ...string[]];
}

export interface ApplicationsIllustrationDepartmentNode {
  iconKey: ApplicationsIllustrationDepartmentIconKey;
  id: string;
  label: string;
}

export interface ApplicationsIllustrationAvatarSlot {
  assetKey: string;
  id: string;
  state: ApplicationsIllustrationAvatarState;
  x: number;
  y: number;
}

export interface ApplicationsIllustrationCostBar {
  height: number;
  id: string;
  tone: ApplicationsIllustrationCostBarTone;
  width: number;
  x: number;
}

export interface ApplicationsIllustrationCostMarker {
  id: string;
  x: number;
  y: number;
}

export interface ApplicationsIllustrationCostLinePoint {
  x: number;
  y: number;
}

type IllustrationDataProps = Record<string, string | undefined>;
type IllustrationInjectedProps = IllustrationDataProps & {
  className?: string;
};

const departmentIconMap = {
  code: CodeIcon,
  design: DesignIcon,
  dollar: DollarIcon,
} as const satisfies Record<ApplicationsIllustrationDepartmentIconKey, typeof DesignIcon>;

function prefixed(prefix: string, block: string) {
  return `${prefix}__${block}`;
}

function prefixedModifier(prefix: string, block: string, modifier: string) {
  return `${prefixed(prefix, block)} ${prefix}__${block}--${modifier}`;
}

function formatPercent(value: number, total: number) {
  return `${(value / total) * 100}%`;
}

function buildCostLinePath(points: readonly ApplicationsIllustrationCostLinePoint[]) {
  return points.map((point, index) => `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`).join(" ");
}

function splitInjectedProps(injectedProps?: IllustrationInjectedProps) {
  const {
    children: _children,
    className,
    key: _key,
    ref: _ref,
    ...domProps
  } = (injectedProps ?? {}) as IllustrationInjectedProps & {
    children?: unknown;
    key?: unknown;
    ref?: unknown;
  };
  void _children;
  void _key;
  void _ref;

  return {
    className,
    domProps: domProps as IllustrationDataProps,
  };
}

export function ApplicationsIllustrationWindowChrome({ className }: { className?: string }) {
  const chromeDots = ["start", "center", "end"] as const;

  return (
    <div className={className}>
      {chromeDots.map((dotId) => (
        <span key={dotId} />
      ))}
    </div>
  );
}

export function ApplicationsIllustrationBrandGraphic({
  className,
  names,
  style,
}: {
  className?: string;
  names: readonly [string, ...string[]];
  style?: CSSProperties;
}) {
  const graphic = getIntegrationAppGraphic(...names);

  if (!graphic) {
    return null;
  }

  if (graphic.kind === "component") {
    return createElement(graphic.component, {
      "aria-hidden": true,
      className,
      focusable: "false",
      style,
    });
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img alt="" aria-hidden="true" className={className} draggable={false} loading="lazy" src={graphic.src} style={style} />
  );
}

export interface ApplicationsDuplicateToolsIllustrationProps {
  apps: readonly ApplicationsIllustrationDuplicateToolsApp[];
  className?: string;
  classNamePrefix: string;
  getAppProps?: (app: ApplicationsIllustrationDuplicateToolsApp) => IllustrationInjectedProps;
  getNodeProps?: (node: ApplicationsIllustrationDepartmentNode) => IllustrationInjectedProps;
  nodes: readonly ApplicationsIllustrationDepartmentNode[];
}

function ApplicationsDuplicateToolsAppChip({
  app,
  classNamePrefix,
  injectedProps,
}: {
  app: ApplicationsIllustrationDuplicateToolsApp;
  classNamePrefix: string;
  injectedProps?: IllustrationInjectedProps;
}) {
  const { className, domProps } = splitInjectedProps(injectedProps);

  return (
    <span
      {...domProps}
      className={cn(
        "applications-duplicate-tools-illustration__duplicate-app-chip",
        prefixed(classNamePrefix, "duplicate-app-chip"),
        className,
      )}
      data-app-position={app.id}
    >
      <ApplicationsIllustrationBrandGraphic
        className={cn(
          "applications-duplicate-tools-illustration__duplicate-app-logo",
          prefixed(classNamePrefix, "duplicate-app-logo"),
        )}
        names={app.names}
        style={app.id === "asana" ? { height: "16px", width: "17px" } : { height: "16px", width: "16px" }}
      />
    </span>
  );
}

function ApplicationsDuplicateToolsNode({
  classNamePrefix,
  injectedProps,
  node,
}: {
  classNamePrefix: string;
  injectedProps?: IllustrationInjectedProps;
  node: ApplicationsIllustrationDepartmentNode;
}) {
  const Icon = departmentIconMap[node.iconKey];
  const { className, domProps } = splitInjectedProps(injectedProps);

  return (
    <div
      {...domProps}
      className={cn(
        "applications-duplicate-tools-illustration__duplicate-node",
        prefixed(classNamePrefix, "duplicate-node"),
        className,
      )}
      data-node-id={node.id}
    >
      <span
        className={cn(
          "applications-duplicate-tools-illustration__duplicate-node-icon-shell",
          prefixed(classNamePrefix, "duplicate-node-icon-shell"),
        )}
      >
        <Icon
          className={cn(
            "applications-duplicate-tools-illustration__duplicate-node-icon",
            prefixed(classNamePrefix, "duplicate-node-icon"),
          )}
        />
      </span>

      <span
        className={cn(
          "applications-duplicate-tools-illustration__duplicate-node-label",
          prefixed(classNamePrefix, "duplicate-node-label"),
        )}
      >
        {node.label}
      </span>
    </div>
  );
}

export function ApplicationsDuplicateToolsIllustration({
  apps,
  className,
  classNamePrefix,
  getAppProps,
  getNodeProps,
  nodes,
}: ApplicationsDuplicateToolsIllustrationProps) {
  return (
    <div
      className={cn(
        "applications-duplicate-tools-illustration",
        classNamePrefix && prefixedModifier(classNamePrefix, "figure", "duplicate-tools"),
        className,
      )}
    >
      <div
        className={cn(
          "applications-duplicate-tools-illustration__window",
          classNamePrefix && prefixedModifier(classNamePrefix, "window", "duplicate-tools"),
        )}
      >
        <ApplicationsIllustrationWindowChrome
          className={cn(
            "applications-duplicate-tools-illustration__window-chrome",
            classNamePrefix && prefixedModifier(classNamePrefix, "window-chrome", "duplicate-tools"),
          )}
        />

        <div
          className={cn(
            "applications-duplicate-tools-illustration__duplicate-apps",
            classNamePrefix && prefixed(classNamePrefix, "duplicate-apps"),
          )}
        >
          {apps.map((app) => {
            return (
              <ApplicationsDuplicateToolsAppChip
                app={app}
                classNamePrefix={classNamePrefix}
                injectedProps={getAppProps?.(app)}
                key={app.id}
              />
            );
          })}
        </div>

        <svg
          aria-hidden="true"
          className={cn(
            "applications-duplicate-tools-illustration__duplicate-connectors",
            classNamePrefix && prefixed(classNamePrefix, "duplicate-connectors"),
          )}
          fill="none"
          viewBox="0 0 200 33"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M100 0V12.5" />
          <path d="M100 12.5V16.5C100 20.6421 96.6421 24 92.5 24H7.5C3.35786 24 0 27.3579 0 31.5V33" />
          <path d="M100 12.5V33" />
          <path d="M100 12.5V16.5C100 20.6421 103.358 24 107.5 24H192.5C196.642 24 200 27.3579 200 31.5V33" />
        </svg>

        <div
          className={cn(
            "applications-duplicate-tools-illustration__duplicate-nodes",
            classNamePrefix && prefixed(classNamePrefix, "duplicate-nodes"),
          )}
        >
          {nodes.map((node) => {
            return (
              <ApplicationsDuplicateToolsNode
                classNamePrefix={classNamePrefix}
                injectedProps={getNodeProps?.(node)}
                key={node.id}
                node={node}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export interface ApplicationsBudgetsBleedPlaceholderIllustrationProps {
  className?: string;
}

export interface ProgressiveSplitPlaceholderIllustrationProps {
  className?: string;
}

export function ProgressiveSplitPlaceholderIllustration({ className }: ProgressiveSplitPlaceholderIllustrationProps) {
  return (
    <div className={cn("progressive-split-placeholder-illustration", className)} data-progressive-split-placeholder="true">
      <div className="progressive-split-placeholder-illustration__card progressive-split-placeholder-illustration__card--primary">
        <span className="progressive-split-placeholder-illustration__tag">Unused licenses</span>
        <div className="progressive-split-placeholder-illustration__lines">
          <span />
          <span />
          <span />
        </div>
        <div className="progressive-split-placeholder-illustration__footer">
          <span className="progressive-split-placeholder-illustration__total">$12k</span>
          <span className="progressive-split-placeholder-illustration__pill">42 seats</span>
        </div>
      </div>

      <div className="progressive-split-placeholder-illustration__card progressive-split-placeholder-illustration__card--secondary">
        <div className="progressive-split-placeholder-illustration__lines">
          <span />
          <span />
          <span />
        </div>
        <div className="progressive-split-placeholder-illustration__footer">
          <span className="progressive-split-placeholder-illustration__total">$4.8k</span>
          <span className="progressive-split-placeholder-illustration__pill">Overlap</span>
        </div>
      </div>

      <div className="progressive-split-placeholder-illustration__card progressive-split-placeholder-illustration__card--tertiary">
        <div className="progressive-split-placeholder-illustration__lines">
          <span />
          <span />
        </div>
      </div>
    </div>
  );
}

export function ApplicationsBudgetsBleedPlaceholderIllustration({ className }: ApplicationsBudgetsBleedPlaceholderIllustrationProps) {
  return <ProgressiveSplitPlaceholderIllustration className={className} />;
}

export interface ApplicationsVisibilityBoardIllustrationProps {
  avatarAssetMap: Record<string, string>;
  className?: string;
  classNamePrefix: string;
  getSlotProps?: (slot: ApplicationsIllustrationAvatarSlot) => IllustrationInjectedProps;
  slots: readonly ApplicationsIllustrationAvatarSlot[];
}

function ApplicationsVisibilityAvatarSlot({
  avatarAssetMap,
  classNamePrefix,
  injectedProps,
  slot,
}: {
  avatarAssetMap: Record<string, string>;
  classNamePrefix: string;
  injectedProps?: IllustrationInjectedProps;
  slot: ApplicationsIllustrationAvatarSlot;
}) {
  const visibilityBoardInsetX = 8;
  const visibilitySlotFieldWidth = 314;
  const visibilitySlotFieldHeight = 110;
  const { className, domProps } = splitInjectedProps(injectedProps);

  return (
    <span
      {...domProps}
      className={cn(prefixed(classNamePrefix, "avatar-slot"), className)}
      data-state={slot.state}
      style={{
        left: formatPercent(slot.x - visibilityBoardInsetX, visibilitySlotFieldWidth),
        top: formatPercent(slot.y, visibilitySlotFieldHeight),
      }}
    >
      <span className={prefixed(classNamePrefix, "avatar-status-dot")} />
      <span className={prefixed(classNamePrefix, "avatar-image-shell")}>
        <Image
          alt=""
          className={prefixed(classNamePrefix, "avatar-image")}
          height={26}
          src={avatarAssetMap[slot.assetKey]}
          unoptimized
          width={26}
        />
      </span>
    </span>
  );
}

export function ApplicationsVisibilityBoardIllustration({
  avatarAssetMap,
  className,
  classNamePrefix,
  getSlotProps,
  slots,
}: ApplicationsVisibilityBoardIllustrationProps) {
  return (
    <div className={cn(prefixedModifier(classNamePrefix, "figure", "visibility-disappears"), className)}>
      <div className={prefixed(classNamePrefix, "visibility-figure")}>
        <div className={prefixed(classNamePrefix, "visibility-board")}>
          <div className={prefixed(classNamePrefix, "visibility-slots")}>
            {slots.map((slot) => (
              <ApplicationsVisibilityAvatarSlot
                avatarAssetMap={avatarAssetMap}
                classNamePrefix={classNamePrefix}
                injectedProps={getSlotProps?.(slot)}
                key={slot.id}
                slot={slot}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export interface ApplicationsCostSpiralsIllustrationProps {
  bars: readonly ApplicationsIllustrationCostBar[];
  className?: string;
  classNamePrefix: string;
  getBarProps?: (bar: ApplicationsIllustrationCostBar) => IllustrationDataProps;
  getMarkerProps?: (marker: ApplicationsIllustrationCostMarker) => IllustrationDataProps;
  linePoints: readonly ApplicationsIllustrationCostLinePoint[];
  markers: readonly ApplicationsIllustrationCostMarker[];
}

export function ApplicationsCostSpiralsIllustration({
  bars,
  className,
  classNamePrefix,
  getBarProps,
  getMarkerProps,
  linePoints,
  markers,
}: ApplicationsCostSpiralsIllustrationProps) {
  const costPlotWidth = 302.9565;
  const costPlotHeight = 257.0068;
  const costLinePath = buildCostLinePath(linePoints);

  return (
    <div className={cn(prefixedModifier(classNamePrefix, "figure", "cost-spirals"), className)}>
      <div className={prefixed(classNamePrefix, "cost-figure")}>
        <div className={prefixed(classNamePrefix, "cost-card")}>
          <div className={prefixed(classNamePrefix, "cost-plot")}>
            <div className={prefixed(classNamePrefix, "cost-grid")} />

            <div className={prefixed(classNamePrefix, "cost-bars")}>
              {bars.map((bar) => (
                <span
                  {...(getBarProps?.(bar) ?? {})}
                  className={prefixed(classNamePrefix, "cost-bar")}
                  data-tone={bar.tone}
                  key={bar.id}
                  style={{
                    height: formatPercent(bar.height, costPlotHeight),
                    left: formatPercent(bar.x, costPlotWidth),
                    width: formatPercent(bar.width, costPlotWidth),
                  }}
                />
              ))}
            </div>

            <svg
              aria-hidden="true"
              className={prefixed(classNamePrefix, "cost-line")}
              fill="none"
              viewBox={`0 0 ${costPlotWidth} ${costPlotHeight}`}
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d={costLinePath} />
            </svg>

            {markers.map((marker) => (
              <span
                {...(getMarkerProps?.(marker) ?? {})}
                className={prefixed(classNamePrefix, "cost-marker")}
                key={marker.id}
                style={{
                  left: formatPercent(marker.x, costPlotWidth),
                  top: formatPercent(marker.y, costPlotHeight),
                }}
              >
                $
              </span>
            ))}
          </div>
        </div>

        <span className={prefixed(classNamePrefix, "figure-caption")}>Cost Spirals</span>
      </div>
    </div>
  );
}
