import { Box, styled } from '@mui/material';

export const Wrapper = styled(Box)({});

export const MainContainer = styled(Box)(
  ({ collapsed }: { collapsed: boolean }) => ({
    padding: collapsed ? '32px 36px 90px 137px' : '32px 36px 90px 283px',
    transition: 'padding 0.4s',
  })
);
