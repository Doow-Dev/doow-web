import * as React from "react";
const WindowsSVG = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={50}
    height={50}
    fill="none"
    {...props}
  >
    <path
      fill="currentColor"
      d="m0 6.88 20.481-2.82v19.787H.001zm20.481 19.5v19.562L.003 43.128 0 26.381h20.48v-.001Zm2.266-22.63L50 0v23.848H22.747zM50 26.38V50l-27.253-3.747V26.38z"
    />
  </svg>
);
export default WindowsSVG;
