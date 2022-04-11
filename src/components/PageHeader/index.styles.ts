import { styled, Breadcrumbs, Box } from '@mui/material';

export const PageHeaderContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  padding: '42px 90px 48px',

  '& h5': {
    fontSize: '30px',
    lineHeight: '36px',
    letterSpacing: '0.05em',
    color: '#fff',
    fontWeight: 500,
    margin: 0,

    '& span': {
      color: '#B50000',
    },
  },
});

export const AppBreadcrumbs = styled(Breadcrumbs)({
  '& li *': {
    fontSize: '13px',
    lineHeight: '19.5px',
    color: '#5E5E5E',
    fontWeight: 300,
  },
});

export const Desription = styled(Box)({
  margin: '14px 0 20px',
  color: '#fff',
  fontSize: '20px',
  lineHeight: '170%',
  paddingRight: 250,
});
