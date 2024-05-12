import React from "react";

const GreenBalloon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
    <path fill="#00ac41" d="M14 27v1a2 2 0 0 0 4 0v-1" />
    <path fill="#cddced" d="M18 26.99h-4V24h4v2.99" />
    <path
      fill="#009de0"
      d="M23.07 4.91A10 10 0 0 0 18 2.2a10.36 10.36 0 0 0-2-.2 10.36 10.36 0 0 0-2 .2 10 10 0 0 0-5.07 2.71 9.88 9.88 0 0 0 0 14.09L14 24h4l5.05-5a9.86 9.86 0 0 0 0-14"
    />
    <path
      fill="#00ac41"
      d="M16 2a6.13 6.13 0 0 0-3.17 2.73 14.67 14.67 0 0 0 0 14.19L16 24V2"
    />
    <path
      fill="#007411"
      d="M16 2a6.13 6.13 0 0 0-3.17 2.73A13.66 13.66 0 0 0 11 11.82a13.68 13.68 0 0 0 1.83 7.1L16 24V2"
    />
    <path
      fill="#00ac41"
      d="M16 2a6.13 6.13 0 0 1 3.17 2.73 14.67 14.67 0 0 1 0 14.19L16 24V2"
    />
    <path
      fill="#007411"
      d="M16 2v22l3.17-5.08a13.68 13.68 0 0 0 1.83-7.1 13.66 13.66 0 0 0-1.83-7.09A6.13 6.13 0 0 0 16 2"
    />
  </svg>
);

export default GreenBalloon;
