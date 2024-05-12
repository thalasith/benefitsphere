import React from 'react';

const PinkCircles: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path fill="#009de0" d="M22 16A10 10 0 1 1 12 6a10 10 0 0 1 10 10"/><path fill="#ee3d8b" d="M20 6a10 10 0 0 0-4 .83 10 10 0 0 1 0 18.34A10 10 0 1 0 20 6"/><path fill="#00267a" d="M16 6.83a10 10 0 0 0 0 18.34 10 10 0 0 0 0-18.34"/></svg>
);

export default PinkCircles;
