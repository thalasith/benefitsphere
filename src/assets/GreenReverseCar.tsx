import React from 'react';

const GreenReverseCar: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path fill="#275d38" d="M27 18H5a3 3 0 0 0 0 6h1a2 2 0 0 1 4 0h12a2 2 0 0 1 4 0h1a3 3 0 0 0 0-6"/><path fill="#fff" d="M10 24H6a2 2 0 0 0 4 0"/><path fill="#00ac41" d="M8 22a2 2 0 0 0-2 2h4a2 2 0 0 0-2-2"/><path fill="#fff" d="M26 24h-4a2 2 0 0 0 4 0"/><path fill="#00ac41" d="M24 22a2 2 0 0 0-2 2h4a2 2 0 0 0-2-2"/><path fill="#fff" d="M8 18a8 8 0 0 1 16 0"/></svg>
);

export default GreenReverseCar;
