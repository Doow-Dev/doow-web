import * as React from "react";
const YapilySVG = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={70}
    height={16}
    fill="none"
    {...props}
  >
    <g fill="currentColor" clipPath="url(#a)">
      <path d="M50.28 0h-2.882v15.4h6.812l1.667-2.511H50.28zm-6.906 0h-2.882v15.4h2.906V0zM7.883 15.4h3.168l2.048-3.104h6.36V15.4h2.881V0h-4.263zm6.86-5.591 4.691-7.084v7.084zm21.128-8.411C34.728.379 33.394 0 31.393 0H26.32v15.4h2.906V2.511h2.334c.977 0 1.739.214 2.31.782.477.474.763 1.137.763 1.99 0 .83-.31 1.564-.81 2.038-.572.545-1.31.734-2.263.734h-2.334l2.382 2.44c1.858 0 3.144-.402 4.263-1.373 1.072-.948 1.667-2.299 1.667-3.886s-.595-2.914-1.667-3.838M56.566 0l5.097 7.7-5.097 7.7h3.216l5.097-7.7L59.782 0zm10.22 0-3.5 5.26h3.238L70.002 0zM3.24 0H0l5.097 7.7L0 15.4h3.24l5.096-7.7z" />
      <path d="M13.431 0h-3.215L6.715 5.26h3.239z" />
    </g>
    <defs>
      <clipPath id="a">
        <path fill="currentColor" d="M0 0h70v15.4H0z" />
      </clipPath>
    </defs>
  </svg>
);
export default YapilySVG;
