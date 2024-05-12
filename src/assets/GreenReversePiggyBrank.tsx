import React from "react";

const GreenReversePiggyBrank: React.FC<React.SVGProps<SVGSVGElement>> = (
  props,
) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
    <g>
      <path
        fill="#fff"
        d="M9.5 12a2.5 2.5 0 0 0 0-5H7v2.5A2.5 2.5 0 0 0 9.5 12z"
      />
      <path
        fill="none"
        d="M18.19 9A.58.58 0 0 0 18 9h-4a.58.58 0 0 0-.19 0 3 3 0 0 0 4.38 0z"
      />
      <path
        fill="#fff"
        d="M19 7.51A9 9 0 1 0 25 16a9.05 9.05 0 0 0-6-8.49zM18 11h-4a1 1 0 0 1-1-1 1 1 0 0 1 .81-1A.58.58 0 0 1 14 9h4a.58.58 0 0 1 .19 0 1 1 0 0 1 .81 1 1 1 0 0 1-1 1z"
      />
      <path
        fill="#275d38"
        d="M16 4a3 3 0 0 0-3 3 2.84 2.84 0 0 0 .05.51A3 3 0 0 0 13.81 9a3 3 0 0 0 4.38 0A3 3 0 0 0 19 7.51 2.84 2.84 0 0 0 19 7a3 3 0 0 0-3-3z"
      />
      <path
        fill="#00ac41"
        d="M14 9h4a.58.58 0 0 1 .19 0A3 3 0 0 0 19 7.51a8.79 8.79 0 0 0-5.9 0A3 3 0 0 0 13.81 9 .58.58 0 0 1 14 9z"
      />
      <rect width="5" height="5" x="4" y="15" fill="#fff" rx="1" />
      <circle cx="10" cy="15" r="1" fill="#275d38" />
      <rect
        width="3"
        height="7"
        x="10"
        y="21"
        fill="#fff"
        rx="1.5"
        transform="rotate(180 11.5 24.5)"
      />
      <rect
        width="3"
        height="7"
        x="19"
        y="21"
        fill="#fff"
        rx="1.5"
        transform="rotate(180 20.5 24.5)"
      />
      <path
        fill="#fff"
        d="M25 18a1 1 0 0 1 0-2 1 1 0 0 0 1-1 1 1 0 0 1 2 0 3 3 0 0 1-3 3z"
      />
    </g>
  </svg>
);

export default GreenReversePiggyBrank;
