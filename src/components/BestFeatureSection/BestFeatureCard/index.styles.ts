import { styled, Avatar, Box, Button } from '@mui/material';

export const CardContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: '#101010',
  borderRadius: '20px',
  boxShadow: '0px 5px 14px rgba(8, 15, 52, 0.04)',
  padding: 53,
  width: 450,

  '& .card-title': {
    fontWeight: 700,
    fontSize: 18,
    lineHeight: '28px',
  },
  '& .description': {
    fontSize: 15,
    lineHeight: '30px',
    marginTop: 13,
  },
  '& .holder-name': {
    fontWeight: 700,
    fontSize: 15,
    lineHeight: '20px',
    color: '#fff',
  },
  '& .holder-role': {
    marginTop: 8,
    fontSize: 15,
    lineHeight: '20px',
    color: '#fff',
  },
});

export const UserAvatar = styled(Avatar)({
  width: 60,
  height: 60,
});

export const LearnMoreButton = styled(Button)({
  padding: 16,
  background: 'transparent',
  border: '1px solid #FFFFFF',
  borderRadius: 5,
});
