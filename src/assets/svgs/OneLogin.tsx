import * as React from "react";
const OneLoginSVG = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={50}
    height={40}
    fill="none"
    {...props}
  >
    <g clipPath="url(#a)">
      <path
        fill="currentColor"
        d="M25 50c13.807 0 25-11.193 25-25S38.807 0 25 0 0 11.193 0 25s11.193 25 25 25"
      />
      <path
        fill="#fff"
        d="M22.25 17.115h-3.235a.923.923 0 0 0-.921.922v4.147a.923.923 0 0 0 .921.921h3.235v10.448a.923.923 0 0 0 .922.922h4.147a.923.923 0 0 0 .921-.922V18.037a.923.923 0 0 0-.921-.922z"
      />
    </g>
    <defs>
      <clipPath id="a">
        <path fill="#fff" d="M0 0h50v50H0z" />
      </clipPath>
    </defs>
  </svg>
);
export default OneLoginSVG;
