import React from 'react';
import { CardContainer, UserAvatar, LearnMoreButton } from './index.styles';
import { Box } from '@mui/material';

export type JobHolderCardProps = {
  title: string;
  description: string;
  holder: {
    avatar: any;
    name: string;
    role: string;
  };
};

export const JobHolderCard = ({
  title,
  description,
  holder,
}: JobHolderCardProps) => {
  return (
    <CardContainer>
      <Box className="card-title">For Companys</Box>
      <Box className="description">
        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi
        ut aliquip ex ea commodo consequat aute irure sint amet occaecat
        cupidatat non proident
      </Box>
      <Box marginTop="28px" display="flex" alignItems="center">
        <span className="holder-name">Organisation vs Personal</span>
        <LearnMoreButton>Learn more</LearnMoreButton>
      </Box>
    </CardContainer>
  );
};
