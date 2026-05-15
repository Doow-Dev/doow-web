import type { SVGProps } from "react";

import { cn } from "@/lib/utils";

export function ApplicationIcon({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      aria-hidden="true"
      className={cn(className)}
      fill="none"
      viewBox="0 0 18 18"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M7.51051 1.5C4.67713 1.5 3.26044 1.5 2.38022 2.37868C1.5 3.25736 1.5 4.67157 1.5 7.5C1.5 10.3284 1.5 11.7426 2.38022 12.6213C3.26044 13.5 4.67713 13.5 7.51051 13.5H10.5158C13.3491 13.5 14.7658 13.5 15.646 12.6213C16.2532 12.0152 16.4416 11.1542 16.5 9.75"
        stroke="#6B7280"
        strokeLinecap="round"
        strokeWidth="1.5"
      />
      <path d="M9 13.5V16.5" stroke="#6B7280" strokeWidth="1.5" />
      <path d="M6 16.5H12" stroke="#6B7280" strokeLinecap="round" strokeWidth="1.5" />
      <path
        d="M8.25 11.25H9.75"
        stroke="#6B7280"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
      <path
        d="M13.5 3H12C11.2929 3 10.9393 3 10.7197 3.21967C10.5 3.43934 10.5 3.79289 10.5 4.5V6C10.5 6.70711 10.5 7.06066 10.7197 7.28033C10.9393 7.5 11.2929 7.5 12 7.5H13.5C14.2071 7.5 14.5607 7.5 14.7803 7.28033C15 7.06066 15 6.70711 15 6V4.5C15 3.79289 15 3.43934 14.7803 3.21967C14.5607 3 14.2071 3 13.5 3Z"
        stroke="#6B7280"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
      <path
        d="M11.625 7.5V9M13.875 7.5V9M11.625 1.5V3M13.875 1.5V3M10.5 4.125H9M10.5 6.375H9M16.5 4.125H15M16.5 6.375H15"
        stroke="#6B7280"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    </svg>
  );
}
