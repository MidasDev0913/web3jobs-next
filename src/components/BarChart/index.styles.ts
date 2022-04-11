import { styled, Box } from '@mui/material';

export const CustomToolTip = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  background: '#1A1B1F',
  padding: '0px 12px',
  borderRadius: 3,

  '& .desc': {
    fontSize: 12,
    display: 'flex',
    flexDirection: 'column',
    marginTop: -10,
  },
});
