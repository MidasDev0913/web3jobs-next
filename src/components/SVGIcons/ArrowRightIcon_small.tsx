import React from 'react';

const SvgIcon = ({ color }: { color?: string }) => (
  <svg
    width="6"
    height="10"
    viewBox="0 0 6 10"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M1 1L5 5L1 9"
      stroke={color || 'white'}
      strokeLinecap="square"
      strokeLinejoin="round"
    />
  </svg>
);

export default SvgIcon;
