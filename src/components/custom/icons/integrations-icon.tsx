import type { SVGProps } from "react";

import { cn } from "@/lib/utils";

export function IntegrationsIcon({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      aria-hidden="true"
      className={cn(className)}
      fill="none"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M14.2359 6.925C15.0437 6.925 15.6984 6.27022 15.6984 5.4625C15.6984 4.65478 15.0437 4 14.2359 4C13.4282 4 12.7734 4.65478 12.7734 5.4625C12.7734 6.27022 13.4282 6.925 14.2359 6.925Z"
        stroke="#666B69"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
      <path
        d="M14.2359 11.9621C15.0437 11.9621 15.6984 11.3073 15.6984 10.4996C15.6984 9.69189 15.0437 9.03711 14.2359 9.03711C13.4282 9.03711 12.7734 9.69189 12.7734 10.4996C12.7734 11.3073 13.4282 11.9621 14.2359 11.9621Z"
        stroke="#666B69"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
      <path
        d="M5.4625 11.9621C6.27022 11.9621 6.925 11.3073 6.925 10.4996C6.925 9.69189 6.27022 9.03711 5.4625 9.03711C4.65478 9.03711 4 9.69189 4 10.4996C4 11.3073 4.65478 11.9621 5.4625 11.9621Z"
        stroke="#666B69"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
      <path
        d="M14.2359 17.0002C15.0437 17.0002 15.6984 16.3454 15.6984 15.5377C15.6984 14.73 15.0437 14.0752 14.2359 14.0752C13.4282 14.0752 12.7734 14.73 12.7734 15.5377C12.7734 16.3454 13.4282 17.0002 14.2359 17.0002Z"
        stroke="#666B69"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
      <path
        d="M12.7766 5.46289H11.1516C10.4333 5.46289 9.85156 6.04464 9.85156 6.76289V14.2379C9.85156 14.9561 10.4333 15.5379 11.1516 15.5379H12.7766"
        stroke="#666B69"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
      <path
        d="M12.7719 10.5H6.92188"
        stroke="#666B69"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    </svg>
  );
}
