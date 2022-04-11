import { styled, Box } from '@mui/material';

export const Container = styled(Box)(({ theme }) => ({
  position: 'relative',
  width: 390,

  '& .suffix': {
    position: 'absolute',
    top: 5,
    right: -20,
    fontWeight: 500,
    fontSize: '15px',
    lineHeight: '18px',
    color: '#FFFFFF',
    background: '#B50000',
    borderRadius: 5,
    padding: 15,
  },

  '& .MuiOutlinedInput-root': {
    width: '100%',

    '& input': {
      borderRadius: 5,
      background: '#131322',
      color: '#A3A1A1',
      paddingLeft: '66px !important',
      fontSize: 15,
    },
    '& .MuiInputAdornment-root': {
      '&.MuiInputAdornment-positionStart': {
        position: 'absolute',
        left: 45,
      },
      '&.MuiInputAdornment-positionEnd': {
        position: 'absolute',
        right: 75,
      },
    },
  },
  [theme.breakpoints.down('md')]: {
    width: 236,
    '& .MuiTextField-root': {
      '& input': {
        fontSize: 12,
        paddingLeft: '45px !important',
        paddingTop: '12px',
        paddingBottom: '12px',
      },
      '& .MuiInputAdornment-root': {
        '&.MuiInputAdornment-positionStart': {
          left: 18,
        },
        '&.MuiInputAdornment-positionEnd': {
          position: 'absolute',
          right: 25,
        },
      },
    },
  },
}));
