import type { SVGProps } from "react";

import { cn } from "@/lib/utils";

export function ReflectionIcon({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      aria-hidden="true"
      className={cn(className)}
      fill="none"
      viewBox="0 0 22 22"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M11.0013 16.5002C15.0514 16.5002 18.3346 13.2169 18.3346 9.16683C18.3346 5.11674 15.0514 1.8335 11.0013 1.8335C6.95121 1.8335 3.66797 5.11674 3.66797 9.16683C3.66797 13.2169 6.95121 16.5002 11.0013 16.5002Z"
        fill="currentColor"
      />
      <path
        d="M16.5 20.854H5.5C5.12417 20.854 4.8125 20.5423 4.8125 20.1665C4.8125 19.7907 5.12417 19.479 5.5 19.479H16.5C16.8758 19.479 17.1875 19.7907 17.1875 20.1665C17.1875 20.5423 16.8758 20.854 16.5 20.854Z"
        fill="currentColor"
      />
    </svg>
  );
}
