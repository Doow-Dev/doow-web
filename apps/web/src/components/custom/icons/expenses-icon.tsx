import type { SVGProps } from "react";

import { cn } from "@/lib/utils";

export function ExpensesIcon({ className, ...props }: SVGProps<SVGSVGElement>) {
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
        d="M16.125 9.7125V8.2875C16.125 5.26462 16.125 3.75318 15.0816 2.81409C14.0381 1.875 12.3588 1.875 9 1.875C5.64124 1.875 3.96186 1.875 2.91843 2.81409C1.875 3.75318 1.875 5.26462 1.875 8.2875V9.7125C1.875 12.7354 1.875 14.2468 2.91843 15.1859C3.96186 16.125 5.64124 16.125 9 16.125C12.3588 16.125 14.0381 16.125 15.0816 15.1859C16.125 14.2468 16.125 12.7354 16.125 9.7125Z"
        stroke="#6B7280"
        strokeWidth="1.5"
      />
      <path
        d="M13.5 6H10.5M12 4.5L12 7.5"
        stroke="#6B7280"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
      <path
        d="M13.5 13.125H10.5"
        stroke="#6B7280"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
      <path
        d="M13.5 10.875H10.5"
        stroke="#6B7280"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
      <path
        d="M7.5 13.125L6.1875 11.8125M6.1875 11.8125L4.875 10.5M6.1875 11.8125L7.5 10.5M6.1875 11.8125L4.875 13.125"
        stroke="#6B7280"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
      <path
        d="M7.5 6H4.5"
        stroke="#6B7280"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    </svg>
  );
}
