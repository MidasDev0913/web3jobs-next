import { styled, Box, Button, Link } from '@mui/material';

export const MainContainer = styled(Box)({
  background: '#05050D',
  padding: '30px 30px 100px',
  position: 'relative',
});

export const PostJobContainer = styled(Box)({
  marginTop: 31,
  borderRadius: 10,
  position: 'relative',
});

export const PostButton = styled(Button)({
  padding: '0px',
  height: '60px',
  width: 804,
  textTransform: 'none',
  fontSize: 20,
  lineHeight: '24.2px',
});

export const DraftLink = styled(Link)({
  color: '#fff',
  fontSize: 18,
  lineHeight: '100%',
  textDecorationColor: '#fff',
  cursor: 'pointer',
});

export const CheckButton = styled(Button)({
  marginLeft: 20,
  padding: '6px 16px',
  borderRadius: 2,
  backgroundColor: '#B50000',
  '& svg': {
    marginLeft: 5,
  },
  '&:hover': {
    '& svg path': {
      fill: '#120E0E',
    },
  },
});

export const UseCouponContainer = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  '& *': {
    color: '#F8F8F8',
  },
  '& .coupons': {
    display: 'flex',
    alignItems: 'center',
    border: '1px solid #8C7D7D',
    background: 'rgba(93, 93, 93, 0.09)',
    borderRadius: 2,
    marginLeft: 22,
    fontSize: 13,
    color: '#fff',
    lineHeight: '100%',
    padding: 9,

    '& svg': {
      marginLeft: 12,
    },
  },
});

export const UnlockButton = styled(Button)({
  padding: '10px 0',
  width: 335,
  fontSize: '18px',
  fontWeight: 700,
});
