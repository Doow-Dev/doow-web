"use client";

import type { CSSProperties } from "react";
import { createElement, useState } from "react";
import Image from "next/image";

import {
  getIntegrationAppGraphic,
  type IntegrationAppAssetFormat,
  type IntegrationAppStaticAsset,
} from "@/components/custom/icons/integration-app-icon-registry";
import { cn } from "@/lib/utils";

import type { IntegrationAppLogo } from "../content";

export interface IntegrationLogoProps {
  app: IntegrationAppLogo;
  className?: string;
  chrome?: "none" | "surface";
  decorative?: boolean;
  size?: "orbit" | "provider";
  style?: CSSProperties;
}

function getIntegrationLogoTooltip(app: IntegrationAppLogo) {
  return app.name.trim();
}

function getInitials(name: string) {
  const words = name.trim().split(/\s+/).filter(Boolean);

  if (!words.length) {
    return "?";
  }

  if (words.length === 1) {
    return words[0].slice(0, 2).toUpperCase();
  }

  return `${words[0]?.[0] ?? ""}${words[1]?.[0] ?? ""}`.toUpperCase();
}

interface ResolvedLogoAsset {
  format: IntegrationAppAssetFormat;
  src: string;
}

const VECTOR_LOGO_PATTERN = /\.svg(?:[?#].*)?$/i;
const RASTER_LOGO_PATTERN = /\.(avif|gif|jpe?g|png|webp)(?:[?#].*)?$/i;

function inferLogoAssetFormat(src: string): IntegrationAppAssetFormat {
  if (VECTOR_LOGO_PATTERN.test(src)) {
    return "vector";
  }

  if (RASTER_LOGO_PATTERN.test(src)) {
    return "raster";
  }

  return "raster";
}

function resolveLogoAsset(asset?: IntegrationAppStaticAsset): ResolvedLogoAsset | null {
  if (!asset) {
    return null;
  }

  if (typeof asset === "string") {
    return {
      format: inferLogoAssetFormat(asset),
      src: asset,
    };
  }

  return {
    format: asset.format ?? inferLogoAssetFormat(asset.src),
    src: asset.src,
  };
}

function renderLogoAsset(
  asset: ResolvedLogoAsset,
  className: string,
  onError: () => void,
  rasterDimensions: { sizes: string; width: number; height: number },
) {
  if (asset.format === "raster") {
    return (
      <Image
        alt=""
        aria-hidden="true"
        className={className}
        draggable={false}
        height={rasterDimensions.height}
        onError={onError}
        sizes={rasterDimensions.sizes}
        src={asset.src}
        width={rasterDimensions.width}
      />
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      alt=""
      aria-hidden="true"
      className={className}
      draggable={false}
      loading="lazy"
      onError={onError}
      src={asset.src}
    />
  );
}

export interface IntegrationLogoGraphicProps {
  app: IntegrationAppLogo;
  className?: string;
  decorative?: boolean;
  style?: CSSProperties;
}

export function IntegrationLogoGraphic({
  app,
  className,
  decorative = false,
  style,
}: IntegrationLogoGraphicProps) {
  const [failedStaticSrc, setFailedStaticSrc] = useState("");
  const graphic = getIntegrationAppGraphic(app.domain, app.name, app.brandNameFallback);
  const LocalIcon = graphic?.kind === "component" ? graphic.component : null;
  const staticAsset = resolveLogoAsset(app.logoAsset) ?? (graphic?.kind === "asset" ? resolveLogoAsset(graphic) : null);
  const resolvedStaticAsset = staticAsset && failedStaticSrc !== staticAsset.src ? staticAsset : null;
  const handleImageError = () => {
    if (resolvedStaticAsset) {
      setFailedStaticSrc(resolvedStaticAsset.src);
    }
  };

  return (
    <span
      aria-hidden={decorative ? true : undefined}
      aria-label={decorative ? undefined : `${app.name} logo`}
      className={cn("integration-logo-graphic", className)}
      data-tooltip={getIntegrationLogoTooltip(app)}
      role={decorative ? undefined : "img"}
      style={style}
    >
      {resolvedStaticAsset ? (
        renderLogoAsset(resolvedStaticAsset, "integration-logo-graphic__image", handleImageError, {
          height: 96,
          sizes: "96px",
          width: 96,
        })
      ) : LocalIcon ? (
        createElement(LocalIcon, { className: "integration-logo-graphic__svg", focusable: "false" })
      ) : (
        <span aria-hidden="true" className="integration-logo-graphic__fallback">
          {getInitials(app.name)}
        </span>
      )}
    </span>
  );
}

export function IntegrationLogo({
  app,
  chrome = "surface",
  className,
  decorative = false,
  size = "orbit",
  style,
}: IntegrationLogoProps) {
  const [failedStaticSrc, setFailedStaticSrc] = useState("");
  const graphic = getIntegrationAppGraphic(app.domain, app.name, app.brandNameFallback);
  const LocalIcon = graphic?.kind === "component" ? graphic.component : null;
  const staticAsset = resolveLogoAsset(app.logoAsset) ?? (graphic?.kind === "asset" ? resolveLogoAsset(graphic) : null);
  const resolvedStaticAsset = staticAsset && failedStaticSrc !== staticAsset.src ? staticAsset : null;
  const hasGraphic = Boolean(resolvedStaticAsset) || Boolean(LocalIcon);
  const handleImageError = () => {
    if (resolvedStaticAsset) {
      setFailedStaticSrc(resolvedStaticAsset.src);
    }
  };

  return (
    <span
      aria-hidden={decorative ? true : undefined}
      aria-label={decorative ? undefined : `${app.name} logo`}
      className={cn("integration-logo", `integration-logo--${size}`, `integration-logo--chrome-${chrome}`, className)}
      data-has-graphic={hasGraphic ? "true" : "false"}
      data-tooltip={getIntegrationLogoTooltip(app)}
      role={decorative ? undefined : "img"}
      style={style}
    >
      {resolvedStaticAsset ? (
        renderLogoAsset(resolvedStaticAsset, "integration-logo__image", handleImageError, {
          height: size === "provider" ? 48 : 96,
          sizes: size === "provider" ? "28px" : "78px",
          width: size === "provider" ? 48 : 96,
        })
      ) : LocalIcon ? (
        createElement(LocalIcon, { className: "integration-logo__svg", focusable: "false" })
      ) : (
        <span aria-hidden="true" className="integration-logo__fallback">
          {getInitials(app.name)}
        </span>
      )}
    </span>
  );
}
