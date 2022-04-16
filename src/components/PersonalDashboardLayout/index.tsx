import React, { ReactNode, useState } from 'react';
import { Box, useTheme, useMediaQuery } from '@mui/material';

import { Wrapper, MainContainer } from './index.styles';
import { Navigation } from '../Navigation';

export type Props = {
  children?: ReactNode;
};

const PersonalDashboardLayout = ({ children }: Props) => {
  const theme = useTheme();
  const matchDownMd = useMediaQuery(theme.breakpoints.down('md'));
  const [collapsed, setCollapsed] = useState<boolean>(false);

  return (
    <Wrapper>
      {!matchDownMd && (
        <Navigation collapsed={collapsed} setCollapsed={setCollapsed} />
      )}
      <MainContainer
        padding={{
          xs: '27px 15px',
          md: collapsed ? '32px 36px 90px 137px' : '32px 36px 90px 283px',
        }}
      >
        <Box>{children}</Box>
      </MainContainer>
    </Wrapper>
  );
};

export default PersonalDashboardLayout;
