import React from 'react';

const PinkArrow: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path fill="#009fe5" d="M2 13h22v6H2z"/><path fill="#ee3d8b" d="M20 6l10 10-10 10V6z"/><path fill="#00267a" d="M20 13h4v6h-4z"/></svg>
);

export default PinkArrow;
