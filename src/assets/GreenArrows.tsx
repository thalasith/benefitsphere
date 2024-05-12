import React from 'react';

const GreenArrows: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path fill="#009de0" d="M4.524 25.485l5.487-5.487 2.008 2.009-5.487 5.487z"/><path fill="#00ac41" d="M19.983 22.022l2.008-2.008 5.487 5.487-2.008 2.008zM4.524 6.506l2.008-2.008 5.487 5.487-2.008 2.009z"/><path fill="#009de0" d="M19.986 9.993l5.487-5.487 2.008 2.009-5.487 5.487z"/><path fill="#00ac41" d="M4 4v7l7-7H4z"/><path fill="#009de0" d="M4 28h7l-7-7v7z"/><path fill="#00ac41" d="M28 28v-7l-7 7h7z"/><path fill="#009de0" d="M28 4h-7l7 7V4z"/></svg>
);

export default GreenArrows;
