import { styled, Box } from '@mui/material';

export const FooterContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  padding: '100px 110px 43px',
  background: '#131322',

  '& .section-title': {
    fontWeight: 700,
    fontSize: 25,
    lineHeight: '150%',
    color: '#FFFFFF',
  },
  '& .section-link': {
    marginTop: 21,
    fontSize: 15,
    lineHeight: '150%',
    color: '#fff',
    textDecoration: 'none',
    cursor: 'pointer',

    '&:hover': {
      textDecoration: 'underline',
    },
  },
  '& .section-text': {
    marginTop: 23,
    fontSize: 15,
    lineHeight: '150%',
    color: '#BCBCBC',
    width: 355,
  },
  '& .social-icons': {
    marginTop: 65,
    '& img': {
      marginRight: 8,
      cursor: 'pointer',
    },
  },
  '& .footer-text': {
    marginTop: 100,
    fontSize: 15,
    lineHeight: '150%',
    color: '#FFFFFF',
  },
});
