import React from 'react';

const GreenSquares: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path fill="#00ac41" d="M28 20H12V4h16v16"/><path fill="#009de0" d="M12 12H4v16h16v-8h-8v-8"/><path fill="#006a39" d="M20 12h-8v8h8v-8"/></svg>
);

export default GreenSquares;
