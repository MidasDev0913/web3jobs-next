import React from 'react';
import { Stack, Skeleton } from '@mui/material';

export const JobHistoryItemSkeleton = () => (
  <Stack mt="5px" position="relative" width={421} height={112}>
    <Skeleton
      variant="rectangular"
      animation="wave"
      width="100%"
      height="100%"
      style={{
        backgroundColor: '#131322',
        position: 'absolute',
      }}
    />

    <Skeleton
      variant="circular"
      animation="wave"
      width={48}
      height={48}
      style={{
        backgroundColor: '#313131',
        position: 'absolute',
        left: 32,
        top: 32,
      }}
    />
    <Skeleton
      variant="rectangular"
      animation="wave"
      width={150}
      height={20}
      style={{
        backgroundColor: '#313131',
        position: 'absolute',
        left: 85,
        top: 32,
      }}
    />
    <Skeleton
      variant="rectangular"
      animation="wave"
      width={50}
      height={20}
      style={{
        backgroundColor: '#313131',
        position: 'absolute',
        left: 85,
        top: 57,
      }}
    />
    <Skeleton
      variant="rectangular"
      animation="wave"
      width={50}
      height={20}
      style={{
        backgroundColor: '#313131',
        position: 'absolute',
        right: 32,
        top: 32,
      }}
    />
  </Stack>
);
