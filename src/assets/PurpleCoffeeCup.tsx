import React from "react";

const PurpleCoffeeCup: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
    <path fill="#bed3e4" d="M25 8H7l2 22h14l2-22" />
    <path fill="#8246af" d="M26 8H6V5h20v3M23 2H9L8 5h16l-1-3" />
    <path fill="#421378" d="M24 5H8L7 8h18l-1-3" />
    <path fill="#8246af" d="M12 17a4 4 0 1 1 4 4 4 4 0 0 1-4-4" />
    <path fill="#0082c8" d="M24.18 17H20a4 4 0 0 1-8 0H7.82L9 30h14l1.18-13" />
    <path fill="#002b9a" d="M20 17h-8a4 4 0 0 0 8 0" />
  </svg>
);

export default PurpleCoffeeCup;
