import { styled, Box, Button, keyframes, Theme } from '@mui/material';

export const FilterBoxWrapper = styled(Box)({
  display: 'flex',
  justifyContent: 'flex-end',
  width: '100%',
  boxSizing: 'border-box',
  animationTimingFunction: 'linear',
  position: 'relative',

  '& .filter-wapper': {
    position: 'absolute',
    alignItems: 'center',
    top: 0,
    right: 0,

    '& span': {
      fontSize: 16,
      lineHeight: '16px',
      fontWeight: 600,
    },
  },
});

export const FilterButton = styled(Button)({
  width: 45,
  minWidth: 45,
  height: 45,
  borderRadius: 45,
  padding: 0,
  marginRight: 10,

  '&:hover': {
    '& *': {
      fill: '#000',
    },
  },
});

export const SettingWrapper = styled(Box)({
  backgroundColor: '#131322',
  display: 'flex',
  alignItems: 'center',
  padding: 4,
  borderRadius: 45,
  marginLeft: 29,
  zIndex: 1,
});

export const SettingButton = styled(Button)(
  ({ active, width }: { active?: boolean; width?: string }) => ({
    width: `${width || '170px'} !important`,
    display: 'flex',
    alignItems: 'center',
    backgroundColor: active ? '#B50000' : 'transparent',
    height: 40,
    borderRadius: 40,
    border: 'none',
    padding: '0 40px',
    marginRight: 30,
    '&:last-of-type': {
      marginRight: 0,
    },
    '& span': {
      margin: '0 4px',
      fontSize: 14,
    },
    '&:hover': {
      border: 'none',
      backgroundColor: active ? '#B50000' : 'transparent',
      '& span': {
        color: '#fff',
      },
    },
    '& .MuiIconButton-root': {
      position: 'absolute',
      right: 6,
      background: 'rgba(11, 0, 0, 0.25)',
      '& svg': {
        width: 10,
        height: 10,
      },
    },
  })
);
