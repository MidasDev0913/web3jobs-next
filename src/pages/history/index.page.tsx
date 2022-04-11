import React, { useState, useEffect, useMemo } from 'react';
import Box from '@mui/material/Box';
import { Stack, Typography, Skeleton } from '@mui/material';
import { useWeb3React } from '@web3-react/core';
import axios from 'axios';

import { JobHistoryItem } from '../../components/JobHistoryItem';
import { JobHistoryItemSkeleton } from '../../components/JobHistoryItem/skeleton';
import { StringDiff } from '../../components/DisplayDiff';
import { THistory } from '../../interfaces';
import { DiffSection } from './index.styles';
import Header from '../../components/AppHeader/DashboardHeader';

const HistoryPage = () => {
  const { account, activate } = useWeb3React();
  const [jobHistory, setJobHistory] = useState<THistory[]>([]);
  const [selectedHistory, setSelectedHistory] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${process.env.REACT_APP_API_URL}/job/getJobEditHistory`, {
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
  };

  return (
    <>
      <Header />
      <Stack
        direction="row"
        width="100%"
        p="44px 0 0 47px"
        boxSizing="border-box"
      >
        {jobHistory.length <= 0 && !loading ? (
          <Stack direction="column" width="100%">
            <Typography fontWeight={700} fontSize="18px" lineHeight="21.6px">
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
            <Stack direction="column">
              <Typography fontWeight={700} fontSize="18px" lineHeight="21.6px">
                History
              </Typography>

              <Box display="flex" flexDirection="column" mt="38px">
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
              direction="column"
              ml={7.5}
              width="100%"
              boxSizing="border-box"
            >
              <Typography fontWeight={700} fontSize="18px" lineHeight="21.6px">
                Changes
              </Typography>
              <Box display="flex" flexDirection="column" mt={3}>
                <Typography fontWeight={500} fontSize="15px" lineHeight="30px">
                  Job Description:
                </Typography>
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
                  <DiffSection
                    p={4}
                    borderRadius="10px"
                    bgcolor="#10101E"
                    fontSize="15px"
                    lineHeight="30px"
                    maxHeight="614px"
                    overflow="auto"
                    width="100%"
                    boxSizing="border-box"
                  >
                    <StringDiff
                      dangerouslySetInnerHTML
                      oldValue={currentHistory?.old || ''}
                      newValue={currentHistory?.new || ''}
                      styles={{
                        added: {
                          backgroundColor: 'transparent',
                          color: '#B50000',
                        },
                        removed: {
                          backgroundColor: 'transparent',
                          color: '#FFA51B',
                        },
                        default: {},
                      }}
                    />
                  </DiffSection>
                )}
              </Box>
            </Stack>
          </>
        )}
      </Stack>
    </>
  );
};

export default HistoryPage;
