import React from 'react';

const SvgIcon = ({ color }: { color?: string }) => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 12 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M4.85889 11.7142V0.285645H7.13277V11.7142H4.85889ZM0.285767 7.13264V4.85876H11.7143V7.13264H0.285767Z"
      fill={color || 'white'}
    />
  </svg>
);

export default SvgIcon;
