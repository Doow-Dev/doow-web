import { useId, type SVGProps } from "react";

import { cn } from "@/lib/utils";

const googleMaskPath =
  "M8.74125 3.70218H4.52488V5.45043H6.95186C6.72562 6.56108 5.77951 7.19867 4.52488 7.19867C3.04401 7.19867 1.85109 6.00575 1.85109 4.52488C1.85109 3.04401 3.04401 1.85109 4.52488 1.85109C5.16248 1.85109 5.73837 2.07734 6.19086 2.44755L7.50719 1.13122C6.70505 0.43192 5.67667 0 4.52488 0C2.01563 0 0 2.01563 0 4.52488C0 7.03413 2.01563 9.04976 4.52488 9.04976C6.78732 9.04976 8.84409 7.40435 8.84409 4.52488C8.84409 4.2575 8.80295 3.96955 8.74125 3.70218Z";

export function GoogleAppIcon({ className, ...props }: SVGProps<SVGSVGElement>) {
  const firstMaskId = useId();
  const secondMaskId = useId();
  const thirdMaskId = useId();
  const fourthMaskId = useId();

  return (
    <svg
      aria-hidden="true"
      className={cn(className)}
      fill="none"
      viewBox="0 0 9 10"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <mask id={firstMaskId} maskUnits="userSpaceOnUse" style={{ maskType: "luminance" }} x="0" y="0" width="9" height="10">
        <path d={googleMaskPath} fill="white" />
      </mask>
      <g mask={`url(#${firstMaskId})`}>
        <path d="M-0.412109 7.19915V1.85156L3.08439 4.52536L-0.412109 7.19915Z" fill="#FBBC05" />
      </g>
      <mask id={secondMaskId} maskUnits="userSpaceOnUse" style={{ maskType: "luminance" }} x="0" y="0" width="9" height="10">
        <path d={googleMaskPath} fill="white" />
      </mask>
      <g mask={`url(#${secondMaskId})`}>
        <path d="M-0.412109 1.8518L3.08439 4.52559L4.52412 3.27097L9.46036 2.46883V-0.410645H-0.412109V1.8518Z" fill="#EA4335" />
      </g>
      <mask id={thirdMaskId} maskUnits="userSpaceOnUse" style={{ maskType: "luminance" }} x="0" y="0" width="9" height="10">
        <path d={googleMaskPath} fill="white" />
      </mask>
      <g mask={`url(#${thirdMaskId})`}>
        <path d="M-0.412109 7.19938L5.75818 2.46883L7.38303 2.6745L9.46036 -0.410645V9.46182H-0.412109V7.19938Z" fill="#34A853" />
      </g>
      <mask id={fourthMaskId} maskUnits="userSpaceOnUse" style={{ maskType: "luminance" }} x="0" y="0" width="9" height="10">
        <path d={googleMaskPath} fill="white" />
      </mask>
      <g mask={`url(#${fourthMaskId})`}>
        <path d="M9.46235 9.46159L3.08638 4.52536L2.26367 3.90833L9.46235 1.85156V9.46159Z" fill="#4285F4" />
      </g>
    </svg>
  );
}
