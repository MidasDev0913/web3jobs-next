import React from 'react';
import { Box, Typography } from '@mui/material';

import { Container } from './index.styles';
import ThunderIcon from '../../assets/icons/thunder_icon.svg';
import { AppColorPicker } from '../ColorPicker';

type OptionWithTagProps = {
  title: string;
  price: number;
  ratio?: number;
  color?: string;
  onChangeColor: (arg: string) => void;
  hiddenColor?: boolean;
};

export const OptionWithColorPicker = ({
  title,
  price,
  ratio,
  color,
  onChangeColor,
  hiddenColor,
}: OptionWithTagProps) => {
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
      {!hiddenColor && (
        <Box marginLeft={2} style={{ display: hiddenColor ? 'none' : 'block' }}>
          <AppColorPicker value={color} onChange={onChangeColor} />
        </Box>
      )}
      {ratio && (
        <Box
          className="views"
          display={{ xs: 'none', md: 'flex' }}
          alignItems="center"
        >
          {ratio}X more views
          <img src={ThunderIcon} />
        </Box>
      )}
    </Container>
  );
};
