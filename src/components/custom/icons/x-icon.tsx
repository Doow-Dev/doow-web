import type { SVGProps } from "react";

import { cn } from "@/lib/utils";

export function XIcon({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      aria-hidden="true"
      className={cn(className)}
      fill="none"
      viewBox="0 0 23 20"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M18.1138 0.0012207H21.6407L13.9356 8.47215L23 19.9992H15.9027L10.3437 13.0081L3.98314 19.9992H0.454158L8.69552 10.9386L0 0.0012207H7.27748L12.3022 6.39135L18.1138 0.0012207ZM16.8761 17.9686H18.8303L6.21566 1.92511H4.11852L16.8761 17.9686Z"
        fill="white"
      />
    </svg>
  );
}
