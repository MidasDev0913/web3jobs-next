import React from 'react';
import { Box, Stack, Typography } from '@mui/material';

import { ConfirmButton } from '../index.styles';
import UpArrowImage from '../../../assets/images/up-arrow-yellow.svg';
import MetamaskIcon from '../../../assets/icons/metamask_icon.svg';
import { Link } from 'react-router-dom';

type ComponentProps = {
  price: number;
  ethPrice: number;
  onClick: () => void;
  onClose: () => void;
};

export const PaymentStep: React.FC<ComponentProps> = ({
  ethPrice,
  price,
  onClick,
  onClose,
}) => {
  return (
    <Stack direction="column" alignItems="center">
      <img src={UpArrowImage} className="payment-step-up-arrow" />
      <Typography
        fontWeight={500}
        fontSize={{ xs: 15, md: 18 }}
        lineHeight="22px"
        mt={1.5}
      >
        -{ethPrice.toFixed(4)} ETH
      </Typography>
      <Typography color="#A3A1A1">≈ ${price}</Typography>
      <ConfirmButton onClick={onClick}>
        <Box fontSize={{ xs: 10, md: 18 }} ml={2}>
          Proceed to Metamask
        </Box>
        <img
          src={MetamaskIcon}
          width="28px"
          height="27px"
          style={{ marginLeft: '12px' }}
        />
      </ConfirmButton>
      <Typography
        sx={{ textDecoration: 'underline' }}
        mt={{ xs: '11px', md: 2 }}
        fontSize={{ xs: 10, md: 15 }}
        className="cursor__pointer"
        onClick={onClose}
      >
        Make changes
      </Typography>
    </Stack>
  );
};
