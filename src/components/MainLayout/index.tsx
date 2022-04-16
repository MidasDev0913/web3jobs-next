import React, { ReactNode } from 'react';
import { Box } from '@mui/material';

import Header from '../AppHeader';
import Footer from '../Footer';
import { Wrapper } from './MainLayout.styles';

export type MainLayoutProps = {
  children?: ReactNode;
  showBanner: boolean | undefined;
};

const MainLayout = ({ children, showBanner }: MainLayoutProps) => {
  return (
    <Wrapper>
      <Header showBanner={showBanner} />
      {children}
      <Footer />
    </Wrapper>
  );
};

export default MainLayout;
