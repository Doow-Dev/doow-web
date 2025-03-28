import * as React from "react";
const NetSuiteSVG = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={75}
    height={19}
    fill="none"
    preserveAspectRatio="none"
    {...props}
  >
    <path
      fill="currentColor"
      d="M25.231 14.135H23.56v-7.8h2.182l2.565 4.483V6.336h1.666v7.8h-1.77l-2.97-5.312m11.306-2.488h-5.102v7.798h5.102v-1.5h-3.293v-1.896l3.044-.001V9.175h-3.034V7.868h3.283m1.059-1.532h6.174v1.532h-2.179v6.266H39.79V7.87l-2.191-.002m2.191.002-2.192-.002zm5.105 4.488c.436.258 1.138.921 2.33 1.046 1.428.149 2.028-.62 2.097-1.28.103-.975-.746-1.183-2.005-1.432-1.392-.274-2.286-.534-2.416-2.209-.098-1.256.964-2.384 3.03-2.298.791.033 1.627.268 2.047.543l-.005 1.219c-.307-.194-1.064-.792-2.428-.861-1.062-.055-1.643.634-1.647 1.215-.011 1.326 1.083 1.177 2.145 1.45 1.474.38 2.276.752 2.244 2.244-.03 1.389-1.247 2.292-3.072 2.292-.857 0-1.771-.295-2.32-.618m8.203-7.333v4.643c0 1.74.738 2.484 1.73 2.484 1.09 0 1.806-.766 1.806-2.484V6.336h.97v4.573c0 2.403-1.2 3.378-2.81 3.378-1.52 0-2.665-.905-2.665-3.343V6.336m8.289 7.798h.924V6.336h-.924zm2.532-7.798h5.95v.916h-2.518v6.882h-.927V7.252h-2.506"
    />
    <mask
      id="a"
      width={5}
      height={9}
      x={70}
      y={6}
      maskUnits="userSpaceOnUse"
      style={{
        maskType: "luminance",
      }}
    >
      <path fill="currentColor" d="M70.297 6.252h4.623v7.903h-4.623z" />
    </mask>
    <g mask="url(#a)">
      <path
        fill="currentColor"
        d="M74.915 6.337H70.34v7.798h4.575v-.9h-3.687v-2.904h3.687v-.914h-3.687V7.253h3.687"
      />
    </g>
    <path
      fill="currentColor"
      d="M0-.001h12.13v10.387l-4.724-5.99H0"
    />
    <mask
      id="b"
      width={13}
      height={11}
      x={7}
      y={8}
      maskUnits="userSpaceOnUse"
      style={{
        maskType: "luminance",
      }}
    >
      <path fill="currentColor" d="M7.316 8.256h12.267v10.42H7.316z" />
    </mask>
    <g mask="url(#b)">
      <path
        fill="currentColor"
        d="M7.383 8.347c1.575 1.948 3.086 3.96 4.644 5.925h7.446v4.403H7.383"
      />
    </g>
    <path
      fill="currentColor"
      d="M12.89 4.38V.892h5.726v12.61h-3.803V4.38m-10.107.765v9.048h1.881v3.562H.902V5.145"
    />
  </svg>
);
export default NetSuiteSVG;
