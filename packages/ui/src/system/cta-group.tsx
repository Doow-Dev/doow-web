import type { ComponentPropsWithoutRef } from "react";

import { cn } from "../lib/utils";

export interface CtaGroupProps extends ComponentPropsWithoutRef<"div"> {
  align?: "start" | "center";
}

export function CtaGroup({ align = "start", className, ...props }: CtaGroupProps) {
  return (
    <div
      className={cn(
        "flex gap-3 flex-row",
        align === "center" ? "items-center justify-center" : "items-start",
        className
      )}
      {...props}
    />
  );
}
