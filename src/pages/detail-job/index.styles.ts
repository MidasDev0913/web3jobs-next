import { styled, Box, Button } from '@mui/material';
import NoiseBg from '../../assets/images/bg_noise.svg';

export const PageContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'space-between',
  margin: '0 127px',
  padding: '37px 0 50px',
  backgroundImage: `url(${NoiseBg})`,
  backgroundColor: '#131322',
  borderRadius: 20,

  '& .apply-job-title': {
    fontWeight: 600,
    fontSize: 50,
    lineHeight: '50px',
    color: '#fff',
  },
  '& .apply-job-logo': {
    width: 119,
    height: 119,
    border: '1px solid white',
    borderRadius: 60,
  },
  '& .organization': {
    fontWeight: 500,
    fontSize: 30,
    lineHeight: '42px',
  },
  '& .location, .salary, .time': {
    display: 'flex',
    alignItems: 'center',
    '& span, time': {
      fontSize: 15,
      lineHeight: '22.5px',
      marginLeft: 6,
      color: '#fff',
    },
  },
  '& .tag': {
    fontSize: 12,
    lineHeight: '18px',
    color: '#fff',
    padding: 7,
    borderRadius: 3,
    border: '0.5px solid #fff',
    marginRight: 8,
  },
  '& .link-to-company': {
    fontSize: 15,
    lineHeight: '150%',
    textDecoration: 'none',
    color: '#fff',
    cursor: 'pointer',
    marginRight: 11,
  },
});

export const Border = styled(Box)({
  height: 1,
  width: 'calc(100% - 254px)',
  background: '#D1342F',
  margin: '60px 127px 0',
});

export const BottomContainer = styled(Box)({
  marginTop: '100px',
  marginBottom: '120px',
  '& .similar-jobs-title': {
    fontSize: 30,
    lineHeight: '150%',
    color: '#fff',
    zIndex: 1,
    position: 'relative',
  },
  '& .similar-jobs-underline': {
    position: 'absolute',
    background: '#DD3F3F',
    height: 9,
    width: 142,
    bottom: 7,
    left: -33,
    zIndex: 0,
  },
  '& .similar-jobs-text': {
    fontSize: 15,
    lineHeight: '200%',
    color: '#fff',
    marginBottom: 35,
  },
  '& .link-to-jobs': {
    fontSize: 15,
    lineHeight: '150%',
    textDecoration: 'none',
    color: '#fff',
    cursor: 'pointer',
    marginRight: 11,
  },
});
