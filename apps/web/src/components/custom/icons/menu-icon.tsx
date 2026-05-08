import type { SVGProps } from "react";

import { cn } from "@/lib/utils";

export function MenuIcon({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      aria-hidden="true"
      className={cn(className)}
      fill="none"
      viewBox="0 0 19 19"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M2.04688 6.14572C2.04688 3.88307 3.88112 2.04883 6.14376 2.04883H11.777C14.0396 2.04883 15.8739 3.88307 15.8739 6.14572V12.163C15.8739 14.4257 14.0396 16.2599 11.777 16.2599H6.14377C3.88112 16.2599 2.04688 14.4257 2.04688 12.163V6.14572Z"
        fill="#D1D5DB"
        stroke="#6B7280"
        strokeWidth="1.53633"
      />
      <circle cx="5.88535" cy="5.88926" fill="#F43F5E" r="0.768167" />
      <circle cx="12.0338" cy="5.88926" fill="#10B981" r="0.768167" />
      <circle cx="8.95957" cy="5.88926" fill="#F59E0B" r="0.768167" />
    </svg>
  );
}
