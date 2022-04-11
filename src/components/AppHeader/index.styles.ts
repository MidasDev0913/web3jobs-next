import { Box, Button, styled, MenuItem } from '@mui/material';
import { Link } from 'react-router-dom';

export const HeaderContainer = styled(Box)({
  width: '100%',
  display: 'flex',
  justifyContent: 'space-between',
  boxSizing: 'border-box',
});

export const LogoContainer = styled(Link)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  cursor: 'pointer',
  textDecoration: 'none',

  '& span': {
    fontSize: '25px',
    lineHeight: 1.5,
    color: '#ffffff',
    fontWeight: 700,
  },
  [theme.breakpoints.down('md')]: {
    '& span': {
      fontSize: '18px',
    },
  },
}));

export const MenuContainer = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  marginLeft: 220,
});

export const ButtonContainer = styled(Box)({
  display: 'flex',
  '& .sponsorship': {
    fontSize: '15px',
    lineHeight: '18.15px',
    fontWeight: 500,
    color: '#fff',
    textDecoration: 'none',
    cursor: 'pointer',
    padding: 15,
  },
});

export const ConnectWalletButton = styled(Button)(({ theme }) => ({
  padding: 15,
  border: '1px solid #B50000',
  background: '#B50000',

  '& svg': {
    marginRight: '10px !important',
  },
  '&:hover': {
    '& *': {
      fill: '#120E0E',
    },
  },
  [theme.breakpoints.down('md')]: {
    padding: '6px 10px',
    fontSize: 13,
  },
}));

export const WalletAddressBox = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  background: '#10101E',
  borderRadius: 5,
  padding: '14px 22px',
  cursor: 'pointer',

  '& img': {
    marginLeft: 11,
    '&:first-of-type': {
      marginRight: 16,
    },
  },
});

export const SubMenuItem = styled(MenuItem)({
  paddingLeft: 0,
  paddingRight: 0,
  width: '177px !important',
  background: '#1A1B1F',

  '&#composition-menu': {
    padding: 0,

    '& li:last-of-type': {
      borderBottomLeftRadius: 5,
      borderBottomRightRadius: 5,
    },
  },
});

export const SearchBarContainer = styled(Box)({
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

  '& .MuiTextField-root': {
    width: '100%',

    '& input': {
      borderRadius: 5,
      background: '#131322',
      color: '#fff',
      padding: '11px 14px',
      paddingLeft: 37,
      fontSize: 12,
    },
    '& .MuiInputAdornment-root': {
      '&.MuiInputAdornment-positionStart': {
        position: 'absolute',
        left: 14,
      },
      '&.MuiInputAdornment-positionEnd': {
        position: 'absolute',
        right: 35,
      },
    },
  },
});
