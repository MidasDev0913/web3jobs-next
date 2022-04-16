import { styled, Box, Stack } from '@mui/material';

export const PageContainer = styled(Stack)({
  '& .apply-job-description': {
    '& p, li': {
      fontSize: 15,
      lineHeight: '30px',
    },
  },
});

export const Border = styled(Box)({
  height: 1,
  width: 'calc(100% - 254px)',
  background: '#D1342F',
  margin: '60px 127px 0',
});

export const CompanyInfoContainer = styled(Stack)({
  '& .apply-job-logo': {
    width: 35,
    height: 35,
    borderRadius: 18,
  },
});
export const MobilePageContainer = styled(Stack)({
  '& .apply-job-description': {
    '& p, li': {
      fontSize: 13,
      lineHeight: '26px',
    },
  },
});
