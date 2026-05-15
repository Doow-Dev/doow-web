import { cn } from "@/lib/utils";

import type { ScrollThumbState } from "../hooks/use-scroll-thumb";

export interface ScrollThumbRailProps extends ScrollThumbState {
  orientation?: "horizontal" | "vertical";
  className?: string;
}

export function ScrollThumbRail({
  className,
  hidden,
  offsetPercentage,
  orientation = "horizontal",
  sizePercentage,
}: ScrollThumbRailProps) {
  const isHorizontal = orientation === "horizontal";

  return (
    <div
      aria-hidden="true"
      className={cn("landing-scroll-rail", `landing-scroll-rail--${orientation}`, className)}
      data-hidden={hidden}
    >
      <span
        className="landing-scroll-rail__thumb"
        style={
          isHorizontal
            ? {
                left: `${offsetPercentage}%`,
                width: `${sizePercentage}%`,
              }
            : {
                height: `${sizePercentage}%`,
                top: `${offsetPercentage}%`,
              }
        }
      />
    </div>
  );
}
