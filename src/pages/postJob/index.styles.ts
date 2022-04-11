import { styled, Box, Button, Link, FormHelperText, Theme } from '@mui/material';

export const MainContainer = styled(Box)({
  background: '#05050D',
  position: 'relative',
  '& .post-job-bg': {
    position: 'absolute',
    top: 180,
    width: '100%',
    left: 0,
  },
});

export const PostJobContainer = styled(Box)(({ theme }) => ({
  marginTop: 31,
  borderRadius: 10,
  background: 'rgba(5, 5, 13, 0.02)',
  border: '1px solid #0C3C56',
  boxShadow: '0px 0px 10px 4px #0C3C56',
  backdropFilter: 'blur(10px)',
  position: 'relative',

  [theme.breakpoints.down('md')]: {
    boxShadow: '0px 0px 18px #0C3C56',
    backdropFilter: 'none',
    marginTop: 25,

    '& .MuiOutlinedInput-root input, .MuiSelect-select.MuiOutlinedInput-input':
      {
        fontSize: 12,
        lineHeight: 1.5,
        paddingTop: '13px !important',
        paddingBottom: '13px !important',
        borderRadius: 6,
      },
  },
}));

export const PostButton = styled(Button)(({ theme }) => ({
  width: 804,
  height: '60px',
  textTransform: 'none',
  fontSize: 20,
  lineHeight: '24.2px',

  [theme.breakpoints.down('md')]: {
    width: 'calc(100% - 48px)',
  },
}));

export const DraftLink = styled(Link)({
  color: '#fff',
  fontSize: 18,
  lineHeight: '100%',
  textDecorationColor: '#fff',
  cursor: 'pointer',
});

export const CheckButton = styled(Button)(({theme}: {theme: Theme}) => ({
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
  [theme.breakpoints.down('md')]: {
    marginLeft: 10,
  }
}));

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

export const CustomFormHelperText = styled(FormHelperText)(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    padding: '2px 10px',
    width: 'calc(100% - 20px)',
    fontSize: 12,
    '& img': {
      width: 12,
      height: 12,
      marginRight: 4,
    },
  },
}));
