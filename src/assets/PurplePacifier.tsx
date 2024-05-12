import React from "react";

const PurplePacifier: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
    <g>
      <circle cx="16" cy="22" r="5" fill="none" />
      <path fill="#b8d3e5" d="M18 14v-2.42a5 5 0 1 0-4 0V14h4z" />
      <path
        fill="#8246af"
        d="M16 14H7.5a1.5 1.5 0 0 0 0 3h2.26A8 8 0 0 1 16 14zM24.5 14H16a8 8 0 0 1 6.24 3h2.26a1.5 1.5 0 0 0 0-3z"
      />
      <path
        fill="#009de0"
        d="M21 22a5 5 0 1 1-5-5H9.76a8 8 0 1 0 12.48 0H16a5 5 0 0 1 5 5z"
      />
      <path fill="#8246af" d="M16 14a8 8 0 0 0-6.24 3h12.48A8 8 0 0 0 16 14z" />
      <path fill="#421378" d="M16 14a8 8 0 0 0-6.24 3h12.48A8 8 0 0 0 16 14z" />
    </g>
  </svg>
);

export default PurplePacifier;
