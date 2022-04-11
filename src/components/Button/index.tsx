import React from 'react';
import { Button, ButtonProps, styled } from '@mui/material';

interface AppButtonProps extends ButtonProps {
  customVariant?: 'primary' | 'secondary';
}

export const AppButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== 'customVariant',
})<AppButtonProps>(({ customVariant, theme }) => ({
  padding: 15,
  border: `1px solid ${
    customVariant === 'primary' || customVariant === undefined
      ? '#B50000'
      : '#ffffff'
  }`,
  background:
    customVariant === 'primary' || customVariant === undefined
      ? '#B50000'
      : 'transparent',

  '& img': {
    marginRight: '10px !important',
  },
}));
