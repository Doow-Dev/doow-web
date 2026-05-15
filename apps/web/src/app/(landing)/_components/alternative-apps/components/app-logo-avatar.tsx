import type { ComponentType, SVGProps } from "react";
import Image from "next/image";

import { GoogleAppIcon } from "@/components/custom/icons/google-app-icon";
import { NotionAppIcon } from "@/components/custom/icons/notion-app-icon";
import { SalesforceAppIcon } from "@/components/custom/icons/salesforce-app-icon";
import { SlackAppIcon } from "@/components/custom/icons/slack-app-icon";
import { cn } from "@/lib/utils";

import type { AppLogoKey } from "../content";

interface AppLogoAvatarProps {
  logoKey: AppLogoKey;
  size?: "pill" | "panel";
  className?: string;
  logoUrl?: string;
  name?: string;
}

const iconMap: Record<AppLogoKey, ComponentType<SVGProps<SVGSVGElement>>> = {
  google: GoogleAppIcon,
  notion: NotionAppIcon,
  salesforce: SalesforceAppIcon,
  slack: SlackAppIcon,
};

function passthroughImageLoader({ src }: { src: string }) {
  return src;
}

function getInitials(name: string | undefined) {
  const words = name?.trim().split(/\s+/).filter(Boolean) ?? [];

  if (!words.length) {
    return "?";
  }

  if (words.length === 1) {
    return words[0].slice(0, 2).toUpperCase();
  }

  return `${words[0]?.[0] ?? ""}${words[1]?.[0] ?? ""}`.toUpperCase();
}

export function AppLogoAvatar({ logoKey, size = "panel", className, logoUrl, name }: AppLogoAvatarProps) {
  const Icon = iconMap[logoKey];
  const imageSize = size === "panel" ? 36 : 20;

  return (
    <span
      aria-hidden="true"
      className={cn("alternative-apps-logo", `alternative-apps-logo--${size}`, className)}
      data-logo-key={logoUrl ? "image" : logoKey}
    >
      <span className="alternative-apps-logo__inner">
        {logoUrl ? (
          <Image
            alt=""
            aria-hidden="true"
            className="alternative-apps-logo__image"
            height={imageSize}
            loader={passthroughImageLoader}
            src={logoUrl}
            unoptimized
            width={imageSize}
          />
        ) : Icon ? (
          <Icon className="alternative-apps-logo__icon" />
        ) : (
          <span className="alternative-apps-logo__fallback">{getInitials(name)}</span>
        )}
      </span>
    </span>
  );
}
