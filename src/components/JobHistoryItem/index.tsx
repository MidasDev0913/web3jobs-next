import React from 'react';
import Image from 'next/image';
import Moment from 'react-moment';
import { Box, Stack, Typography, useTheme, useMediaQuery } from '@mui/material';
import { THistory } from '../../interfaces';

export type JobHistoryItemProps = {
  index: number;
  history: THistory;
  selected?: boolean;
  onClick: () => void;
};

export const JobHistoryItem = ({
  index,
  history,
  selected,
  onClick,
}: JobHistoryItemProps) => {
  const theme = useTheme();
  const matchDownMd = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      padding="27px 17px 27px 13px"
      bgcolor={selected ? '#10101E' : 'transparent'}
      borderLeft={selected ? '3px solid #B50000' : 'none'}
      width={{ xs: '100%', md: 282 }}
      boxSizing="border-box"
      className="cursor__pointer"
      onClick={onClick}
    >
      <Box display="flex" alignItems="center">
        <Typography width="24px">{index}.</Typography>
        <Box display="flex" alignItems="center" justifyContent="center">
          {history.job?.logo ? (
            <div style={{ borderRadius: '48px' }}>
              <Image src={history.job?.logo} width={48} height={48} />
            </div>
          ) : (
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              width={{ xs: 40, md: 48 }}
              height={{ xs: 40, md: 48 }}
              borderRadius={{ xs: '20px', md: '24px' }}
              border="1px solid #fff"
            >
              <Typography fontSize={30} lineHeight={1.5} fontWeight={700}>
                {history.job?.company_name?.charAt(0).toUpperCase()}
              </Typography>
            </Box>
          )}
        </Box>
        <Box
          display="flex"
          justifyContent="center"
          flexDirection="column"
          ml={{ xs: 1.5, md: 1 }}
        >
          <Typography
            fontWeight={600}
            fontSize={{ xs: 13, md: 16 }}
            lineHeight={1.2}
            maxWidth={{ xs: 171, md: 120 }}
          >
            {history.job?.title}
          </Typography>
          <Typography
            fontSize={{ xs: 12, md: 14 }}
            lineHeight={1.5}
            color="#FFA51B"
            mt={{ xs: 0.5, md: 0 }}
          >
            Edited
          </Typography>
        </Box>
      </Box>
      <Box display="flex" alignItems="start" height="100%" fontSize="14px">
        {/*
       @ts-ignore */}
        <Moment fromNow ago>
          {history.updated_at}
        </Moment>
      </Box>
    </Stack>
  );
};
