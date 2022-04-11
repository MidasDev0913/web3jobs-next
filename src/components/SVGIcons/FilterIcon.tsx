import React from 'react';

const SvgIcon = ({ color }: { color?: string }) => (
  <svg
    width="23"
    height="16"
    viewBox="0 0 23 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect x="0.25" width="22.5" height="2.64706" fill={color || 'white'} />
    <rect
      x="3.62451"
      y="6.61719"
      width="15.75"
      height="2.64706"
      fill={color || 'white'}
    />
    <rect
      x="8.12549"
      y="13.2344"
      width="7.875"
      height="2.64706"
      fill={color || 'white'}
    />
  </svg>
);

export default SvgIcon;
