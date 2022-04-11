import React from 'react';
import { Box, Stack, Typography } from '@mui/material';

import loadingAnimatinoData from '../../../assets/lotties/loading.json';
import { ConfirmButton } from '../index.styles';
import { getAbbrAddress } from '../../../utils/helper';

const LottieAnimation = React.lazy(
  () => import('../../../components/Animation')
);

type ComponentProps = {
  txnHash: string;
  ethPrice: number;
  error: boolean;
  onRetry: () => void;
  onClose: () => void;
};

export const ConfirmationStep: React.FC<ComponentProps> = ({
  ethPrice,
  txnHash,
  error,
  onRetry,
  onClose,
}) => {
  return (
    <Stack
      width="100%"
      direction="column"
      alignItems="center"
      boxSizing="border-box"
      px={{ xs: 3.75, md: 4.5 }}
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
      {error ? (
        <>
          <Typography color="#A3A1A1">Oops! Something went wrong :(</Typography>
          <ConfirmButton onClick={onRetry}>
            <Box>Retry</Box>
          </ConfirmButton>
          <Typography
            fontSize={{ xs: 12, md: 15 }}
            mt={{ xs: '11px', md: 2 }}
            className="cursor__pointer"
            onClick={onClose}
          >
            Return to post a job
          </Typography>
        </>
      ) : (
        <>
          <LottieAnimation
            width="121"
            height="102"
            url={loadingAnimatinoData}
            loop={true}
          />
          <Typography fontSize={{ xs: 12, md: 15 }} color="#A3A1A1">
            This can take up to 1 min
          </Typography>
        </>
      )}
    </Stack>
  );
};
