import React from 'react';
import Moment from 'react-moment';
import { Box, Stack, Typography } from '@mui/material';
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
  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      padding={4}
      bgcolor={selected ? '#10101E' : 'transparent'}
      borderLeft={selected ? '3px solid #B50000' : 'none'}
      width={354}
      className="cursor__pointer"
      onClick={onClick}
    >
      <Box display="flex" alignItems="center">
        <Typography width="24px">{index}.</Typography>
        <Box display="flex" alignItems="center" justifyContent="center">
          {history.job?.logo ? (
            <img
              src={history.job?.logo}
              width={48}
              height={48}
              style={{ borderRadius: '48px' }}
            />
          ) : (
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              width={48}
              height={48}
              borderRadius="24px"
              mr={2}
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
          ml={1}
        >
          <Typography
            fontWeight={600}
            fontSize="16px"
            lineHeight="19.2px"
            maxWidth={171}
          >
            {history.job?.title}
          </Typography>
          <Typography fontSize="14px" lineHeight="21px" color="#FFA51B">
            Edited
          </Typography>
        </Box>
      </Box>
      <Box display="flex" alignItems="start" height="100%">
        {/*
       @ts-ignore */}
        <Moment fromNow ago>
          {history.updated_at}
        </Moment>
      </Box>
    </Stack>
  );
};
