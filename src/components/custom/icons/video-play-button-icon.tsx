import type { SVGProps } from "react";

import { cn } from "@/lib/utils";

export function VideoPlayButtonIcon({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      aria-hidden="true"
      className={cn("demo-video-frame__play-icon", className)}
      fill="none"
      viewBox="0 0 59 59"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <circle cx="29.3039" cy="29.3039" fill="white" fillOpacity="0.4" r="29.3039" />
      <path d="M24 37.5V21L35 29.8453L24 37.5Z" fill="white" />
    </svg>
  );
}
