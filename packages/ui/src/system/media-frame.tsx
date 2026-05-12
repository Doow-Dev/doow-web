import type { ComponentPropsWithoutRef, CSSProperties, ReactNode } from "react";

import { cn } from "../lib/utils";

const aspectClasses = {
  auto: "",
  square: "aspect-square",
  landscape: "aspect-[4/3]",
  video: "aspect-video",
} as const;

export interface MediaFrameProps extends ComponentPropsWithoutRef<"div"> {
  aspect?: keyof typeof aspectClasses;
  ratio?: number;
  frame?: ReactNode;
  mediaClassName?: string;
  padded?: boolean;
}

export function MediaFrame({
  aspect = "video",
  ratio,
  frame,
  mediaClassName,
  padded = true,
  className,
  children,
  style,
  ...props
}: MediaFrameProps) {
  const mediaFrameStyle: CSSProperties | undefined = ratio ? { ...style, aspectRatio: ratio } : style;

  return (
    <div
      className={cn(
        "media-frame-shell",
        aspectClasses[aspect],
        className
      )}
      style={mediaFrameStyle}
      {...props}
    >
      {frame ? <div className="media-frame-layer">{frame}</div> : null}
      <div className={cn("media-frame-media", padded && "p-3 sm:p-4", mediaClassName)}>{children}</div>
    </div>
  );
}
