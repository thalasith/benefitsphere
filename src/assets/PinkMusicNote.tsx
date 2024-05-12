import React from 'react';

const PinkMusicNote: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><circle cx="9" cy="23" r="5" fill="#009de0"/><circle cx="23" cy="21" r="5" fill="#009de0"/><path fill="#ee3d8b" d="M25 4.529999999999999L11 7l3-.53v5l11-1.94L28 9l-3 .53v-5"/><path fill="#009de0" d="M11 23h3V11.47L11 12v11M25 21h3V9l-3 .53V21"/><path fill="#009de0" d="M11 7v5l3-.53v-5L11 7"/><path fill="#00267a" d="M14 6.47L11 7v5l3-.53v-5"/><path fill="#009de0" d="M25 9.53L28 9V4l-3 .53v5"/><path fill="#00267a" d="M28 4l-3 .53v5L28 9V4"/></svg>
);

export default PinkMusicNote;
