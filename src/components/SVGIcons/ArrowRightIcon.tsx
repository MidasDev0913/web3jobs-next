import React from 'react';

const SvgIcon = ({ color }: { color?: string }) => (
  <svg
    width="11"
    height="20"
    viewBox="0 0 11 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M1.01664 1.56299L9.45361 9.99996L1.01664 18.4369"
      stroke={color || 'white'}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default SvgIcon;
