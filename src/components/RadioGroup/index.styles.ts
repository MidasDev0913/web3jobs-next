import { styled, Box } from '@mui/material';

export const AppRadioGroupContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',

  [theme.breakpoints.down('md')]: {
    '& .MuiSvgIcon-root': {
      width: 24,
      height: 24,
    },
  },
}));
