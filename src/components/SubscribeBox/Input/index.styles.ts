import { styled, Box } from '@mui/material';

export const Container = styled(Box)({
  position: 'relative',
  width: 541,

  '& .suffix': {
    position: 'absolute',
    top: 5,
    right: -40,
    fontWeight: 500,
    fontSize: '15px',
    lineHeight: '18px',
    borderRadius: 5,
    padding: 15,
  },

  '& .MuiTextField-root': {
    width: '100%',
    background: 'transparent',

    '& .MuiInputAdornment-root': {
      position: 'absolute',
      left: '20px',
    },

    '& input': {
      borderRadius: 5,
      background: 'transparent',
      color: '#fff',
      paddingLeft: 51,
      border: '1px solid #FFFFFF',
    },
  },
});
