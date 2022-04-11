import React from 'react';
import { Box, Stack, Skeleton, useMediaQuery, useTheme } from '@mui/material';
import { Container, ApplyButton } from './index.styles';

const JobItemSkeleton = () => {
  const theme = useTheme();
  const matchDownMd = useMediaQuery(theme.breakpoints.down('md'));

  if (matchDownMd) {
    return (
      <Container
        style={{
          width: '100%',
          height: 70,
          boxSizing: 'border-box',
          padding: '12px 8px',
        }}
      >
        <Skeleton
          variant="rectangular"
          animation="wave"
          width="100%"
          height={78}
          style={{
            backgroundColor: '#05050D',
            position: 'absolute',
            left: 0,
            zIndex: 0,
          }}
        />
        <Skeleton
          variant="rectangular"
          animation="wave"
          width={48}
          height={56}
          style={{
            backgroundColor: '#313131',
            zIndex: 1,
          }}
        />
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
          height="58px"
          ml={1}
          flex={1}
        >
          <Skeleton
            variant="text"
            animation="wave"
            width={70}
            height={12}
            style={{
              backgroundColor: '#313131',
              zIndex: 1,
            }}
          />
          <Skeleton
            variant="text"
            animation="wave"
            width={140}
            height={12}
            style={{
              backgroundColor: '#313131',
              zIndex: 1,
            }}
          />
          <Skeleton
            variant="text"
            animation="wave"
            width={140}
            height={12}
            style={{
              backgroundColor: '#313131',
              zIndex: 1,
            }}
          />
        </Box>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="end"
          className="location"
        >
          <Skeleton
            variant="rectangular"
            animation="wave"
            width={35}
            height={20}
            style={{
              backgroundColor: '#313131',
              zIndex: 1,
            }}
          />
        </Box>
      </Container>
    );
  }

  return (
    <Container
      style={{
        width: '100%',
        height: 77,
        boxSizing: 'border-box',
      }}
    >
      <Skeleton
        variant="rectangular"
        animation="wave"
        width="100%"
        height={87}
        style={{
          backgroundColor: '#05050D',
          position: 'absolute',
          left: 0,
          zIndex: 0,
        }}
      />
      <Stack
        direction="row"
        alignItems="center"
        minWidth={{ xs: 416, xl: 616 }}
      >
        <Skeleton
          variant="rectangular"
          animation="wave"
          width={50}
          height={58}
          style={{
            backgroundColor: '#313131',
            zIndex: 1,
          }}
        />
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
          height="66px"
          ml={4}
          flex={1}
        >
          <Skeleton
            variant="text"
            animation="wave"
            width={100}
            height={18}
            style={{
              backgroundColor: '#313131',
              zIndex: 1,
            }}
          />
          <Skeleton
            variant="text"
            animation="wave"
            width={200}
            height={18}
            style={{
              backgroundColor: '#313131',
              zIndex: 1,
            }}
          />
          <Skeleton
            variant="text"
            animation="wave"
            width={50}
            height={20}
            style={{
              backgroundColor: '#313131',
              zIndex: 1,
            }}
          />
        </Box>
      </Stack>
      <Box
        display="flex"
        alignItems="center"
        className="location"
        minWidth={240}
      >
        <Skeleton
          variant="text"
          animation="wave"
          width={120}
          height={20}
          style={{
            backgroundColor: '#313131',
            zIndex: 1,
          }}
        />
      </Box>
      <Box display="flex" flexWrap="wrap" width={300}>
        <Skeleton
          variant="rectangular"
          animation="wave"
          width={70}
          height={36}
          style={{
            backgroundColor: '#313131',
            zIndex: 1,
          }}
        />
        <Skeleton
          variant="rectangular"
          animation="wave"
          width={70}
          height={36}
          style={{
            backgroundColor: '#313131',
            marginLeft: 8,
            zIndex: 1,
          }}
        />
      </Box>
      <Box display="flex" alignItems="center" className="created-time" mr={8}>
        <Skeleton
          variant="text"
          animation="wave"
          width={58}
          height={20}
          style={{
            backgroundColor: '#313131',
            zIndex: 1,
          }}
        />
      </Box>
      <Skeleton
        variant="rectangular"
        animation="wave"
        width={70}
        height={42}
        style={{
          backgroundColor: '#313131',
          zIndex: 1,
        }}
      />
    </Container>
  );
};

export default JobItemSkeleton;
