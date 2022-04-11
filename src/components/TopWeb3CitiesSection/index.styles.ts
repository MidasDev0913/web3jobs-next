import { styled, Box } from '@mui/material';

export const SectionContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '100%',

  '& .city-link': {
    fontSize: 18,
    lineHeight: '150%',
    color: '#FFFFFF',
    cursor: 'pointer',
    textDecoration: 'none',
  },
  '& .underline': {
    position: 'absolute',
    background: '#DD3F3F',
    height: 9,
    width: 142,
    bottom: 7,
    left: -33,
    zIndex: 0,
  },
  '& .job-count': {
    padding: '4px 7px',
    border: '0.4px solid #8C7D7D',
    borderRadius: 2,
    background: 'rgba(93, 93, 93, 0.09)',
    fontSize: 9,
    fontWeight: 600,
    width: 'fit-content',
    marginLeft: 5,
  },
});
