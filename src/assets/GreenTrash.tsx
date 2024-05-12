import React from 'react';

const GreenTrash: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path fill="#00ac41" d="M20 8V6a4 4 0 0 0-8 0v2h2V6a2 2 0 0 1 4 0v2h2"/><path fill="#009de0" d="M22 30H10a2 2 0 0 1-2-2V6h16v22a2 2 0 0 1-2 2"/><path fill="#00ac41" d="M12 6H6v4h2V6h4m14 0h-2v4h2V6"/><path fill="#006a39" d="M24 6H8v4h16V6"/></svg>
);

export default GreenTrash;
