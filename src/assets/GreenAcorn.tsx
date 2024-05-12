import React from "react";

const GreenAcorn: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
    <path fill="#00ac41" d="M14 13V2h4v11h-4" />
    <path fill="#00ac41" d="M6 16a10 10 0 0 1 20 0H6" />
    <path fill="#009de0" d="M23 16H9v7a7 7 0 0 0 14 0v-7" />
    <path fill="#006a39" d="M16 9a7 7 0 0 0-7 7h14a7 7 0 0 0-7-7" />
  </svg>
);

export default GreenAcorn;
