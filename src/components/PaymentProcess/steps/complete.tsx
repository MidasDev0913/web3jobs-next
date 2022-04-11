import React from 'react';
import { Box, Stack, Typography } from '@mui/material';

import { ConfirmButton } from '../index.styles';
import { getAbbrAddress } from '../../../utils/helper';

type ComponentProps = {
  isEdit: boolean | undefined;
  txnHash: string;
  ethPrice: number;
  onViewJob: () => void;
  onGotoHomePage: () => void;
};

export const CompleteStep: React.FC<ComponentProps> = ({
  isEdit,
  ethPrice,
  txnHash,
  onViewJob,
  onGotoHomePage,
}) => {
  return (
    <Stack
      width="100%"
      direction="column"
      alignItems="center"
      boxSizing="border-box"
      px={4.5}
    >
      <Stack
        width="100%"
        direction="row"
        mb={{ xs: 1, md: 4 }}
        padding={{ xs: '24px 17px', md: '43px 48px 39px 31px' }}
        justifyContent="space-between"
        boxSizing="border-box"
        border="1px solid #131322"
      >
        <Box display="flex" flexDirection="column">
          <Typography fontSize={{ xs: 12, md: 15 }}>Amount</Typography>
          <Typography fontSize={{ xs: 12, md: 15 }} mt={{ xs: 2.25, md: 3 }}>
            -{ethPrice.toFixed(4).trim()}
          </Typography>
        </Box>
        <Box display="flex" flexDirection="column">
          <Typography fontSize={{ xs: 12, md: 15 }}>
            transaction hash
          </Typography>
          <Typography fontSize={{ xs: 12, md: 15 }} mt={{ xs: 2.25, md: 3 }}>
            {getAbbrAddress(txnHash, 26, 0)}
          </Typography>
        </Box>
      </Stack>
      <ConfirmButton onClick={onViewJob}>
        <Box>View Job</Box>
      </ConfirmButton>
      <Typography
        fontSize={{ xs: 12, md: 15 }}
        mt={{ xs: '11px', md: 2 }}
        className="cursor__pointer"
        onClick={onGotoHomePage}
      >
        Back to {isEdit ? 'Manage jobs' : 'homepage'}
      </Typography>
    </Stack>
  );
};
