import React, { ReactNode, useState } from 'react';
import { Box } from '@mui/material';

import { Wrapper, MainContainer } from './index.styles';
import { Navigation } from '../Navigation';
import Header from '../AppHeader/DashboardHeader';

export type Props = {
  children?: ReactNode;
};

const PersonalDashboardLayout = ({ children }: Props) => {
  const [collapsed, setCollapsed] = useState<boolean>(false);

  return (
    <Wrapper>
      <Navigation collapsed={collapsed} setCollapsed={setCollapsed} />
      <MainContainer collapsed={collapsed}>
        <Box>{children}</Box>
      </MainContainer>
    </Wrapper>
  );
};

export default PersonalDashboardLayout;
