import React from 'react';

const GreenCompass: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path fill="#00ac41" d="M16 4A12 12 0 1 1 4 16 12 12 0 0 1 16 4m0-2a14 14 0 1 0 14 14A14 14 0 0 0 16 2"/><path fill="#009de0" d="M13.53 13.53L23 9l-4.52 9.48L9 23l4.53-9.47"/><path fill="#009de0" d="M15.93 19.69L9 23l6.93-3.32m-2.41-6.16l-3.24 6.79 3.25-6.78"/><path fill="#0061c5" d="M13.53 13.54l-3.25 6.78L9.01 23l6.92-3.31 2.54-1.21-4.94-4.94"/></svg>
);

export default GreenCompass;
