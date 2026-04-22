import { useId, type SVGProps } from "react";

import { cn } from "@/lib/utils";

export function HeroSparkleIcon({ className, ...props }: SVGProps<SVGSVGElement>) {
  const firstGradientId = useId();
  const secondGradientId = useId();

  return (
    <svg
      aria-hidden="true"
      className={cn("hero-accent-sparkle", className)}
      fill="none"
      viewBox="0 0 34 34"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M0.414062 9.50977L33.4141 24.3164" stroke={`url(#${firstGradientId})`} strokeWidth="2.01909" />
      <path d="M24.3164 0.413086L9.50977 33.4131" stroke={`url(#${secondGradientId})`} strokeWidth="2.01909" />
      <defs>
        <linearGradient id={firstGradientId} gradientUnits="userSpaceOnUse" x1="1.28227" x2="32.5459" y1="9.90012" y2="23.9261">
          <stop stopColor="white" stopOpacity="0" />
          <stop offset="0.535" stopColor="white" />
          <stop offset="1" stopColor="white" stopOpacity="0" />
        </linearGradient>
        <linearGradient id={secondGradientId} gradientUnits="userSpaceOnUse" x1="23.9274" x2="9.90013" y1="1.28129" y2="32.5449">
          <stop stopColor="white" stopOpacity="0" />
          <stop offset="0.535" stopColor="white" />
          <stop offset="1" stopColor="white" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  );
}
