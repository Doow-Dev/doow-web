import type { SVGProps } from "react";

import { cn } from "@/lib/utils";

export function EyeIcon({ className, ...props }: SVGProps<SVGSVGElement>) {
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
        clipRule="evenodd"
        d="M19.3701 12.9682C20.4331 11.8498 20.4331 10.1506 19.3701 9.03217C17.5773 7.14588 14.4982 4.5835 11.0007 4.5835C7.50309 4.5835 4.42402 7.14588 2.63121 9.03217C1.56824 10.1506 1.56824 11.8498 2.63121 12.9682C4.42402 14.8544 7.5031 17.4168 11.0007 17.4168C14.4982 17.4168 17.5773 14.8544 19.3701 12.9682ZM11.0007 13.7502C12.5194 13.7502 13.7507 12.5189 13.7507 11.0002C13.7507 9.48138 12.5194 8.25016 11.0007 8.25016C9.48187 8.25016 8.25065 9.48138 8.25065 11.0002C8.25065 12.5189 9.48187 13.7502 11.0007 13.7502Z"
        fill="currentColor"
        fillRule="evenodd"
      />
    </svg>
  );
}
