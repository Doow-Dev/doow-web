import { useId, type SVGProps } from "react";

import { cn } from "@/lib/utils";

export function DepartmentIcon({ className, ...props }: SVGProps<SVGSVGElement>) {
  const clipPathId = useId();

  return (
    <svg
      aria-hidden="true"
      className={cn(className)}
      fill="none"
      viewBox="0 0 10 10"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clipPath={`url(#${clipPathId})`}>
        <path d="M6.66602 4.16699L7.5616 4.43567C8.13376 4.60731 8.41984 4.69314 8.58459 4.91458C8.74935 5.13601 8.74935 5.43469 8.74935 6.03204L8.74935 9.16699" stroke="#00140A" strokeLinejoin="round" strokeWidth="0.833333" />
        <path d="M3.33398 3.75L4.58398 3.75M3.33398 5.41667L4.58398 5.41667" stroke="#00140A" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.833333" />
        <path d="M4.99935 9.16683V7.91683C4.99935 7.52399 4.99935 7.32757 4.87731 7.20553C4.75527 7.0835 4.55885 7.0835 4.16602 7.0835H3.74935C3.35651 7.0835 3.16009 7.0835 3.03805 7.20553C2.91602 7.32757 2.91602 7.52399 2.91602 7.91683L2.91602 9.16683" stroke="#00140A" strokeLinejoin="round" strokeWidth="0.833333" />
        <path d="M0.833984 9.16699H9.16732" stroke="#00140A" strokeLinecap="round" strokeWidth="0.833333" />
        <path d="M1.25 9.16683L1.25 2.79901C1.25 1.75287 1.25 1.22979 1.57966 0.970265C1.90932 0.710736 2.39476 0.851641 3.36563 1.13345L5.44897 1.73817C6.03485 1.90823 6.32779 1.99326 6.49723 2.22502C6.66667 2.45677 6.66667 2.77243 6.66667 3.40373L6.66667 9.16683" stroke="#00140A" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.833333" />
      </g>
      <defs>
        <clipPath id={clipPathId}>
          <rect fill="white" height="10" width="10" />
        </clipPath>
      </defs>
    </svg>
  );
}
