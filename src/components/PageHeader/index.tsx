import React from 'react';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { Typography, Link } from '@mui/material';

import {
  PageHeaderContainer,
  AppBreadcrumbs,
  Desription,
} from './index.styles';

type PageHeaderProps = {
  Title: React.FC;
  description: string;
  pageTitle: string;
};

export const PageHeader = ({
  Title,
  pageTitle,
  description,
}: PageHeaderProps) => {
  const breadcrumbs = [
    <Link underline="hover" key="1" color="inherit" href="/">
      home
    </Link>,
    <span key="2" color="text.primary">
      {pageTitle}
    </span>,
  ];
  return (
    <PageHeaderContainer>
      <Title />
      <Desription>{description}</Desription>
      <AppBreadcrumbs
        separator={<NavigateNextIcon fontSize="small" />}
        aria-label="breadcrumb"
      >
        {breadcrumbs}
      </AppBreadcrumbs>
    </PageHeaderContainer>
  );
};
