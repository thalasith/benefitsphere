import React from 'react';

const GreenUmbrella: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path fill="#009de0" d="M15 4.05A12 12 0 0 0 4 16h11V4.05m2 0V16h11A12 12 0 0 0 17 4.05"/><path fill="#00ac41" d="M16 2a1 1 0 0 0-1 1v24a1 1 0 0 1-2 0h-2a3 3 0 0 0 6 0V3a1 1 0 0 0-1-1z"/><path fill="#006a39" d="M16 4h-1v12h2V4.05h-1"/></svg>
);

export default GreenUmbrella;
