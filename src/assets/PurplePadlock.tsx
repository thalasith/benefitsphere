import React from 'react';

const PurplePadlock: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path fill="#009de0" d="M28 28H4V12h24v16"/><path fill="#002b9a" d="M16 16a2 2 0 0 0-2 2 2 2 0 0 0 1 1.72V23a1 1 0 0 0 2 0v-3.28A2 2 0 0 0 18 18a2 2 0 0 0-2-2"/><path fill="#8246af" d="M16 4a7 7 0 0 0-7 7v1h2v-1a5 5 0 1 1 10 0v1h2v-1a7 7 0 0 0-7-7"/><path fill="#002b9a" d="M11 12H9v4h2v-4m12 0h-2v4h2v-4"/></svg>
);

export default PurplePadlock;
