import React, { ReactNode } from 'react';
import { Box } from '@mui/material';

import Header from '../AppHeader';
import Footer from '../Footer';
import { Wrapper } from './MainLayout.styles';

export type MainLayoutProps = {
  children?: ReactNode;
};

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <Wrapper>
      <Header />
      {children}
      <Footer />
    </Wrapper>
  );
};

export default MainLayout;
