import type { ComponentType, SVGProps } from "react";

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
}

const iconMap: Record<AppLogoKey, ComponentType<SVGProps<SVGSVGElement>>> = {
  google: GoogleAppIcon,
  notion: NotionAppIcon,
  salesforce: SalesforceAppIcon,
  slack: SlackAppIcon,
};

export function AppLogoAvatar({ logoKey, size = "panel", className }: AppLogoAvatarProps) {
  const Icon = iconMap[logoKey];

  return (
    <span
      aria-hidden="true"
      className={cn("alternative-apps-logo", `alternative-apps-logo--${size}`, className)}
      data-logo-key={logoKey}
    >
      <span className="alternative-apps-logo__inner">
        <Icon className="alternative-apps-logo__icon" />
      </span>
    </span>
  );
}
