import React, { useState, useEffect, useMemo } from 'react';
import Box from '@mui/material/Box';
import {
  Stack,
  Typography,
  Skeleton,
  Drawer,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { useWeb3React } from '@web3-react/core';
import axios from 'axios';

import { JobHistoryItem } from '../../components/JobHistoryItem';
import { JobHistoryItemSkeleton } from '../../components/JobHistoryItem/skeleton';
import { StringDiff } from '../../components/DisplayDiff';
import { THistory } from '../../interfaces';
import { DiffSection } from './index.styles';
import Header from '../../components/AppHeader/DashboardHeader';

const HistoryPage = () => {
  const theme = useTheme();
  const matchDownMd = useMediaQuery(theme.breakpoints.down('md'));
  const { account, activate } = useWeb3React();
  const [jobHistory, setJobHistory] = useState<THistory[]>([]);
  const [selectedHistory, setSelectedHistory] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [openDiffDrawer, setOpenDiffDrawer] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/job/getJobEditHistory`, {
        params: {
          userId: account?.toLowerCase(),
        },
      })
      .then(({ data }) => {
        if (data.success) {
          setJobHistory(data.history);
          setSelectedHistory(data.history?.[0]?.id || '');
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, [account]);

  const currentHistory = useMemo(() => {
    return jobHistory.find((item) => item.id === selectedHistory);
  }, [jobHistory, selectedHistory]);

  const handleClickHistory = (val: string) => {
    setSelectedHistory(val);
    if (matchDownMd) setOpenDiffDrawer(true);
  };

  return (
    <>
      <Header />
      <Stack direction="row" width="100%" p="44px 0 0 0" boxSizing="border-box">
        {jobHistory.length <= 0 && !loading ? (
          <Stack direction="column" width="100%">
            <Typography
              fontWeight={700}
              fontSize="18px"
              lineHeight="21.6px"
              ml={4}
            >
              History
            </Typography>
            <Typography
              width="100%"
              mt="61px"
              fontWeight={500}
              color="#A3A1A1"
              textAlign="center"
            >
              NO DATA AVAILABLE
            </Typography>
          </Stack>
        ) : (
          <>
            <Stack direction="column" width={{ xs: '100%', md: 'auto' }}>
              <Typography
                fontWeight={700}
                fontSize="18px"
                lineHeight="21.6px"
                ml={{ xs: 0, md: 4 }}
              >
                History
              </Typography>

              <Box
                display="flex"
                flexDirection="column"
                mt={{ xs: 1.5, md: '38px' }}
              >
                {loading
                  ? new Array(3)
                      .fill(0)
                      .map((item, _i) => <JobHistoryItemSkeleton key={_i} />)
                  : jobHistory.map((history, _i) => (
                      <JobHistoryItem
                        index={_i + 1}
                        history={history}
                        selected={history.id === selectedHistory}
                        key={history.id}
                        onClick={() => handleClickHistory(history.id)}
                      />
                    ))}
              </Box>
            </Stack>
            <Stack
              display={{ xs: 'none', md: 'flex' }}
              direction="column"
              ml={1}
              width="100%"
              boxSizing="border-box"
            >
              <Box display="flex" flexDirection="column" mt={3}>
                {loading ? (
                  <Skeleton
                    variant="rectangular"
                    animation="wave"
                    width="100%"
                    height={600}
                    style={{
                      backgroundColor: '#131322',
                    }}
                  />
                ) : (
                  <Box>
                    <Box display="flex" mb="10px">
                      <Box flex={1}>Old Version:</Box>
                      <Box flex={1}>New Version:</Box>
                    </Box>
                    <DiffSection
                      padding="32px 32px 32px 10px"
                      borderRadius="10px"
                      bgcolor="#090913"
                      border="0.5px solid #8C7D7D"
                      fontSize="15px"
                      lineHeight="30px"
                      maxHeight="614px"
                      overflow="auto"
                      width="100%"
                      boxSizing="border-box"
                    >
                      <StringDiff
                        oldValue={currentHistory?.old || ''}
                        newValue={currentHistory?.new || ''}
                        splitView
                      />
                    </DiffSection>
                  </Box>
                )}
              </Box>
            </Stack>
          </>
        )}
      </Stack>
      <Drawer
        anchor={'bottom'}
        open={Boolean(openDiffDrawer)}
        onClose={() => setOpenDiffDrawer(false)}
      >
        <Box width="100vw" padding="12px" boxSizing="border-box">
          <Box display="flex" mb="10px">
            <Box flex={1}>New Version:</Box>
          </Box>
          <DiffSection
            padding="16px 6px 16px 6px"
            border="1px solid #8C7D7D"
            borderRadius="5px"
            bgcolor="#090913"
            fontSize="15px"
            lineHeight="30px"
            maxHeight="614px"
            overflow="auto"
            width="100%"
            boxSizing="border-box"
          >
            <StringDiff
              oldValue={currentHistory?.old || ''}
              newValue={currentHistory?.new || ''}
            />
          </DiffSection>
        </Box>
      </Drawer>
    </>
  );
};

export default HistoryPage;
