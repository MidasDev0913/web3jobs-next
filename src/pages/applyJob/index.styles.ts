import { styled, Box, Stack } from '@mui/material';
import NoiseBg from '../../assets/images/bg_noise.svg';

export const PageContainer = styled(Stack)({
  '& .apply-job-description': {
    '& p, li': {
      fontSize: 15,
      lineHeight: '30px',
    },
  },
  '& .twitter-share-button': {
    padding: 10,
    background: '#55ACEE',
    borderRadius: 3,
    display: 'flex',
    alignItems: 'center',
    fontSize: 14,
    lineHeight: '150%',

    '& span': {
      fontSize: 14,
      lineHeight: '14px',
      marginLeft: 10,
      display: 'block',
    },
  },
  '& .linkedin-share-button': {
    padding: 10,
    background: '#0F01B3',
    borderRadius: 3,
    display: 'flex',
    alignItems: 'center',
    marginLeft: 7,

    '& span': {
      fontSize: 14,
      lineHeight: '14px',
      marginLeft: 10,
      display: 'block',
    },
  },
});

export const MobilePageContainer = styled(Stack)({
  '& .apply-job-logo': {
    width: 23,
    height: 23,
    borderRadius: 12,
  },
  '& .apply-button': {
    padding: '15px 0',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textTransform: 'none',
    fontSize: 15,
    lineHeight: '18.15px',
    fontWeight: 500,
    marginTop: 16,
    textDecoration: 'none',
    background: '#B50000',
    borderRadius: 5,
    '&:hover': {
      background: '#ffffff',
      color: '#120E0E',
    },
  },
  '& .apply-job-description': {
    '& p, li': {
      fontSize: 13,
      lineHeight: '26px',
    },
  },
  '& .twitter-share-button': {
    padding: 10,
    background: '#55ACEE',
    borderRadius: 3,
    display: 'flex',
    alignItems: 'center',
    fontSize: 14,
    lineHeight: '150%',
  },
  '& .linkedin-share-button': {
    padding: 10,
    background: '#0F01B3',
    borderRadius: 3,
    display: 'flex',
    alignItems: 'center',
    marginLeft: 7,
  },
  '& .link-to-company': {
    fontSize: 13,
    lineHeight: '150%',
    textDecoration: 'none',
    color: '#fff',
    cursor: 'pointer',
    marginRight: 11,
  },
});

export const Border = styled(Box)({
  height: 1,
  background: '#199FD9',
});

export const CompanyInfoContainer = styled(Stack)({
  '& .apply-job-logo': {
    width: 35,
    height: 35,
    borderRadius: 18,
  },
  '& .apply-button': {
    padding: '18px 0',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textTransform: 'none',
    fontSize: 15,
    lineHeight: '18.15px',
    fontWeight: 500,
    marginTop: 16,
    textDecoration: 'none',
    background: '#B50000',
    borderRadius: 5,
    '&:hover': {
      background: '#ffffff',
      color: '#120E0E',
    },
  },
  '& .link-to-company': {
    fontSize: 13,
    lineHeight: '150%',
    textDecoration: 'none',
    color: '#fff',
    cursor: 'pointer',
    marginRight: 11,
  },
});

export const BottomContainer = styled(Box)({
  '& .link-to-jobs': {
    fontSize: 15,
    lineHeight: '150%',
    textDecoration: 'none',
    color: '#fff',
    cursor: 'pointer',
    marginRight: 11,
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
});
