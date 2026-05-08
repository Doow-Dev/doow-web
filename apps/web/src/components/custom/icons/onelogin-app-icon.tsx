import type { SVGProps } from "react";

import { cn } from "@/lib/utils";

export function OneLoginAppIcon({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      aria-hidden="true"
      className={cn(className)}
      fill="none"
      viewBox="0 0 50 50"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M25 50c13.807 0 25-11.193 25-25S38.807 0 25 0 0 11.193 0 25s11.193 25 25 25" fill="currentColor" />
      <path
        d="M22.25 17.115h-3.235a.923.923 0 0 0-.921.922v4.147a.923.923 0 0 0 .921.921h3.235v10.448a.923.923 0 0 0 .922.922h4.147a.923.923 0 0 0 .921-.922V18.037a.923.923 0 0 0-.921-.922z"
        fill="#fff"
      />
    </svg>
  );
}
