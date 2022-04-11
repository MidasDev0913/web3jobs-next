import { styled, Box, Button } from '@mui/material';
import BgSvg from '../../assets/images/subscribe_bg.svg';

export const SubscribeContainer = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: 'calc(100% - 172px)',
  backgroundColor: '#131322',
  position: 'relative',
  boxSizing: 'border-box',
  padding: '43px 71px',
  backdropFilter: 'blur(10px)',
  background: 'rgba(5, 5, 13, 0.02)',
  border: '1px solid #0C3C56',
  boxShadow: '0px 0px 18px 2px #0C3C56',
  borderRadius: '10px',
  zIndex: 1,

  '& .main': {
    padding: '70px 0',
    display: 'flex',
    flexDirection: 'column',
  },

  '& .subscribe-title': {
    fontSize: 30,
    lineHeight: '150%',
    color: '#fff',
    zIndex: 1,
    position: 'relative',
  },
  '& .subscribe-underline': {
    position: 'absolute',
    background: '#DD3F3F',
    height: 9,
    width: 142,
    bottom: 7,
    left: -33,
    zIndex: 0,
  },
  '& .subscribe-text': {
    fontWeight: 700,
    fontSize: 50,
    lineHeight: '150%',
  },
  '& .MuiSelect-select': {
    padding: '8.5px 32px 8.5px 14px',
    border: '1px solid #B50000',
    borderRadius: 5,
    background: 'transparent',
  },
  '& div.MuiSelect-select[aria-expanded=true].MuiOutlinedInput-input': {
    borderRadius: 5,
  },
  '& .MuiTextField-root': {
    background: 'transparent',
  },
  '& .MuiAutocomplete-root': {
    '& .MuiTextField-root': {
      border: '1px solid #B50000',
      borderRadius: 5,
    },
    '& .MuiAutocomplete-input': {
      padding: '8.5px 14px !important',
      width: 'min-content !important',
      background: 'transparent',
      border: 'none',
    },
  },
  '& .tag-box': {
    position: 'relative',
    padding: '7px 28px 7px 7px',
    background: '#B50000',
    borderRadius: 5,
    marginRight: 7,
    marginBottom: 7,
    width: 'fit-content',
    display: 'flex',
    alignItems: 'center',
    fontSize: 15,
    lineHeight: '150%',
    fontWeight: 500,

    '& .MuiIconButton-root': {
      position: 'absolute',
      right: 6,
      background: 'rgba(11, 0, 0, 0.25)',
      padding: 4,
      width: 14,
      height: 14,
      top: 14,
    },
  },
  '& .add-tag': {
    display: 'flex',
    alignItems: 'center',
    marginBottom: 7,
    '& .MuiSelect-select': {
      borderRadius: '5px !important',
      color: '#B50000',
    },
    '& span': {
      marginLeft: 7,
      whiteSpace: 'nowrap',
    },
  },
});

export const PlusButton = styled(Button)({
  width: 30,
  minWidth: 30,
  height: 30,
  borderRadius: 30,
  padding: 0,
  marginLeft: 7,

  '&:hover': {
    '& *': {
      fill: '#000',
    },
  },
});
