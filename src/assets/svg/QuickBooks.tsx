import * as React from "react";
const QuickBooksSVG = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={42}
    height={42}
    fill="none"
    {...props}
  >
    <g clipPath="url(#a)">
      <path
        fill="currentColor"
        d="M21 42c11.598 0 21-9.402 21-21S32.598 0 21 0 0 9.402 0 21s9.402 21 21 21"
      />
      <path
        fill="#fff"
        d="M5.06 20.993a8.655 8.655 0 0 0 8.579 8.65h1.214V26.47H13.64a5.52 5.52 0 0 1-6.781-3.876l-.018-.07a5.646 5.646 0 0 1 3.874-6.93h.606a5.4 5.4 0 0 1 2.31 0h2.95v16.848a3.23 3.23 0 0 0 3.2 3.258V12.257h-6.123a8.656 8.656 0 0 0-8.61 8.702v.002l.013.032Zm23.31-8.733h-1.214v3.342h1.214a5.51 5.51 0 0 1 6.768 3.864q.008.034.018.067a5.63 5.63 0 0 1-3.862 6.906h-.607a5.4 5.4 0 0 1-2.31 0h-2.95V9.592a3.23 3.23 0 0 0-3.2-3.257v23.476h6.123a8.736 8.736 0 0 0 0-17.467z"
      />
    </g>
    <defs>
      <clipPath id="a">
        <path fill="#fff" d="M0 0h42v42H0z" />
      </clipPath>
    </defs>
  </svg>
);
export default QuickBooksSVG;
