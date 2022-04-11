import { styled, Box } from '@mui/material';

export const Container = styled(Box)({
  '& *': {
    color: '#fff',
  },
  '& .price': {
    fontSize: 15,
    lineHeight: '100%',
  },
  '& .views': {
    border: '1px solid #8C7D7D',
    background: 'rgba(93, 93, 93, 0.09)',
    borderRadius: 2,
    marginLeft: 15,
    fontSize: 9,
    color: '#fff',
    lineHeight: '100%',
    padding: 9,

    '& img': {
      marginLeft: 6,
    },
  },
});
