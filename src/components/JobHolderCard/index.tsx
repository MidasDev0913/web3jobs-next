import React from 'react';
import { CardContainer, UserAvatar } from './index.styles';
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
      <Box className="card-title">&quot;{title}&quot;</Box>
      <Box className="description">{description}</Box>
      <Box marginTop="28px" display="flex" alignItems="center">
        <UserAvatar src={holder.avatar} />
        <Box ml={2} display="flex" flexDirection="column">
          <span className="holder-name">{holder.name}</span>
          <span className="holder-role">{holder.role}</span>
        </Box>
      </Box>
    </CardContainer>
  );
};
