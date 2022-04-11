import { styled, Box, Button } from '@mui/material';

export const HomePageWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  position: 'relative',

  '& .bg-animation': {
    position: 'fixed',
    width: '100%',
    top: '50%',
    left: 0,
    transform: 'translateY(-50%)',
  },

  '& .wave-bg': {
    position: 'absolute',
    width: '100%',
    top: 90,
    left: 0,
  },

  '& .title': {
    zIndex: 1,
    marginTop: 70,

    '& > span': {
      fontSize: '20px',
      lineHeight: '150%',
      textAlign: 'center',
      color: '#FFFFFF',
      display: 'block',
      marginTop: 10,
    },
  },
  '& .sub-title': {
    zIndex: 1,
    position: 'relative',

    '& .filter-mask': {
      position: 'absolute',
      top: '-75%',
      left: '50%',
      transform: 'translate(-50%, 0)',
      zIndex: -1,
    },
    '& h1': {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontWeight: 600,
      fontSize: '48px',
      lineHeight: 1,
      textAlign: 'center',
      margin: 0,
    },
  },
  '& .home-newsletter': {
    position: 'relative',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    '& > img': {
      position: 'absolute',
      top: 90,
      width: '100%',
    },
  },
  [theme.breakpoints.down('md')]: {
    '& .title': {
      marginTop: 32,
    },
    '& .filter-mask': {
      width: 360,
    },
    '& .sub-title': {
      '& h1': {
        fontSize: '25px',
      },
    },
  },
}));

export const SubscribeContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '26px 0 56px',
  background: '#101010',
  width: '100%',

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
    fontSize: 15,
    lineHeight: '200%',
    color: '#fff',
  },
});

export const NewsletterButton = styled(Button)({
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
