import { styled, Box, BoxProps, Theme } from '@mui/material';

export const Container = styled(Box)(
  ({ selectedColor, theme }: { selectedColor?: string; theme: Theme }) => ({
    position: 'relative',
    '& .MuiInputBase-input': {
      width: 60,
      background: selectedColor,
      cursor: 'pointer',
      border: '4px solid #FFFFFF',
      height: 30,
      padding: '0px !important',
      borderRadius: 4,
      '&:focus': {
        border: '4px solid #FFFFFF',
        borderRadius: 4,
      },
    },
    '& .MuiInput-underline:after': {
      display: 'none',
    },
    '& .MuiInput-underline:before': {
      display: 'none',
    },
    '& .MuiInputAdornment-root': {
      marginRight: 0,
    },
    '& svg': {
      position: 'absolute',
      zIndex: 1,
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
    },
    [theme.breakpoints.down('md')]: {
      '& .MuiInputBase-input': {
        width: 49,
        borderWidth: 1.5,
        height: 1,
        '&:focus': {
          border: '2px solid #FFFFFF',
          borderRadius: 2,
        },
      },
    },
  })
);
