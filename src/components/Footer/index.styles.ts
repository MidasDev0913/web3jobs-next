import { styled, Box, Button } from '@mui/material';

export const FooterContainer = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  background: '#131322',
});

export const UpButton = styled(Button)({
  width: 52,
  minWidth: 52,
  height: 47,
  borderRadius: 5,
  padding: 0,

  '&:hover': {
    '& *': {
      fill: '#000',
    },
  },
});
