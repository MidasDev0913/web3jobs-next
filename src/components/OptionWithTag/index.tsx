import React from 'react';
import { Box, Typography } from '@mui/material';
import { Container } from './index.styles';
import ThunderIcon from '../../assets/icons/thunder_icon.svg';

type OptionWithTagProps = {
  title: string;
  price: number;
  ratio?: number;
};

export const OptionWithTag = ({ title, price, ratio }: OptionWithTagProps) => {
  return (
    <Container display="flex" alignItems="center">
      <Box display="flex" alignItems="center" className="price">
        <Typography fontSize={{ xs: 13, md: 15 }} whiteSpace="nowrap">
          {title}:
        </Typography>
        <Box fontWeight={700} ml={1}>
          <Typography fontSize={{ xs: 13, md: 15 }}>
            {price ? `$${price}` : 'Free'}
          </Typography>
        </Box>
      </Box>
      {Boolean(ratio) && (
        <Box className="views" display="flex" alignItems="center">
          {ratio}X more views
          <img src={ThunderIcon} />
        </Box>
      )}
    </Container>
  );
};
