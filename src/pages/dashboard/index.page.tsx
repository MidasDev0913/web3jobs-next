import React, { useState, useEffect, useMemo } from 'react';
import Box from '@mui/material/Box';
import axios from 'axios';
import { useAccount } from 'wagmi';
import { useRouter } from 'next/router';

import { TJob, TableColumn, PostedJobTableData } from '../../interfaces';
import { WeekDays } from '../../utils/constants';
import { getDaysOptions, createPostedJobTableData } from '../../utils/helper';
import {
  Stack,
  Typography,
  Tooltip,
  TooltipProps,
  tooltipClasses,
  styled,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { AppDropdown } from '../../components/Dropdown';
import { AppBarChart } from '../../components/BarChart';
import {
  ChartWrapper,
  DataTableContainer,
  TableWrapper,
  HeaderWrapper,
  TooltipIcon,
} from './index.styles';
import DataTable from '../../components/DataTable';
import InfoIcon from '../../components/SVGIcons/InfoIcon_italic';
import Header from '../../components/AppHeader/DashboardHeader';

enum HistoryPeriod {
  TODAY,
  THIS_WEEK,
  THIS_MONTH,
}

enum JobSortType {
  DATE,
  APPLY,
  CLICKS,
}

type JobStatusProps = {
  view: number;
  apply: number;
  name: string;
};

const HtmlTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: '#000000',
    color: '#A3A1A1',
    maxWidth: 225,
    padding: '7px 21.5px',
    borderRadius: 7,
  },

  [`& .${tooltipClasses.arrow}:before`]: {
    backgroundColor: '#131322',
  },
}));

const DashboardPage = () => {
  const router = useRouter();
  const theme = useTheme();
  const matchDownMd = useMediaQuery(theme.breakpoints.down('md'));
  const curYear = new Date().getFullYear();
  const curMonth = new Date().getMonth();
  const curDate = new Date().getDate();
  const curWeekDay = new Date().getDay();

  const { address: account } = useAccount();
  const [jobStatusData, setJobStatusData] = useState<JobStatusProps[]>([]);
  const [postedJobs, setPostedJobs] = useState<TJob[]>([]);

  const [period, setPeriod] = useState<HistoryPeriod>(HistoryPeriod.TODAY);
  const [jobSortBy, setJobSortBy] = useState<JobSortType>(JobSortType.DATE);
  const [loadingChartData, setLoadingChartData] = useState<boolean>(false);
  const [loadingTableData, setLoadingTableData] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      setLoadingChartData(true);
      if (period === HistoryPeriod.TODAY) {
        const date: number = new Date(curYear, curMonth, curDate).getTime();
        const { data } = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/job/getJobStatusHistoryByDate`,
          {
            params: {
              userId: (account || '').toLowerCase(),
              fromDate: date,
              endDate: date + 24 * 3600000 - 1,
            },
          }
        );

        if (data.success) {
          const history = data.data;
          const statusData: JobStatusProps[] = [];

          for (let i = 0; i < 24; i++) {
            const historyItem =
              (history || []).find(
                (item: any) => Number(item.date) === date + i * 3600000
              ) || {};
            statusData.push({
              view: historyItem.view || 0,
              apply: historyItem.apply || 0,
              name: i.toString(),
            });
          }
          setJobStatusData(statusData);
        }
      } else if (period === HistoryPeriod.THIS_WEEK) {
        const date: number =
          new Date(curYear, curMonth, curDate).getTime() -
          24 * 3600 * 1000 * curWeekDay;
        const { data } = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/job/getJobStatusHistoryByDate`,
          {
            params: {
              userId: (account || '').toLowerCase(),
              fromDate: date,
              endDate: date + 24 * 3600000 * 7 - 1,
            },
          }
        );

        if (data.success) {
          const history = data.data;
          const statusData: JobStatusProps[] = [];

          for (let i = 0; i < 7; i++) {
            const filteredHistories = (history || []).filter(
              (item: any) =>
                Number(item.date) >= date + i * 3600000 * 24 &&
                Number(item.date) < date + (i + 1) * 3600000 * 24
            );
            statusData.push({
              view:
                filteredHistories
                  .map((item: any) => item.view)
                  .reduce((a: number, b: number) => a + (b || 0), 0) || 0,
              apply:
                filteredHistories
                  .map((item: any) => item.apply)
                  .reduce((a: number, b: number) => a + (b || 0), 0) || 0,
              name: WeekDays[i],
            });
          }
          setJobStatusData(statusData);
        }
      } else if (period === HistoryPeriod.THIS_MONTH) {
        const dayOptions = getDaysOptions(curYear, curMonth + 1);
        const date: number = new Date(curYear, curMonth, 1).getTime();
        const endDate: number =
          new Date(curYear, curMonth + 1, 1).getTime() - 1;

        const { data } = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/job/getJobStatusHistoryByDate`,
          {
            params: {
              userId: (account || '').toLowerCase(),
              fromDate: date,
              endDate,
            },
          }
        );

        if (data.success) {
          const history = data.data;
          const statusData: JobStatusProps[] = [];

          for (let i = 0; i < dayOptions.length; i++) {
            const filteredHistories = (history || []).filter(
              (item: any) =>
                Number(item.date) >=
                  new Date(curYear, curMonth, i + 1).getTime() &&
                Number(item.date) < new Date(curYear, curMonth, i + 2).getTime()
            );
            statusData.push({
              view:
                filteredHistories
                  .map((item: any) => item.view)
                  .reduce((a: number, b: number) => a + (b || 0), 0) || 0,
              apply:
                filteredHistories
                  .map((item: any) => item.apply)
                  .reduce((a: number, b: number) => a + (b || 0), 0) || 0,
              name: (i + 1).toString(),
            });
          }

          setJobStatusData(statusData);
        }
      }

      setLoadingChartData(false);
    })();
  }, [period, account]);

  useEffect(() => {
    if (!account) return;
    setLoadingTableData(true);
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/job/getPostedJobsByCreator`, {
        params: {
          userId: account?.toLowerCase(),
          limit: 10,
          sort: jobSortBy,
        },
      })
      .then(({ data }) => {
        if (data.success) {
          setPostedJobs(data.jobs);
        }
      })
      .finally(() => {
        setLoadingTableData(false);
      });
  }, [account, jobSortBy]);

  const columns: TableColumn[] = useMemo(
    () => [
      {
        id: 'name',
        label: 'Details',
        minWidth: 100,
        align: matchDownMd ? 'center' : 'left',
        clickable: true,
      },
      {
        id: 'date',
        label: 'Date',
        minWidth: 100,
        align: 'center',
        clickable: true,
      },
      {
        id: 'applies',
        label: 'Apply',
        minWidth: 50,
        align: 'center',
        clickable: true,
      },
      {
        id: 'views',
        label: 'Clicks',
        minWidth: 50,
        align: 'center',
        clickable: true,
      },
    ],
    []
  );

  const rows: PostedJobTableData[] = useMemo(() => {
    return postedJobs.map((admin) =>
      createPostedJobTableData(admin, matchDownMd)
    );
  }, [postedJobs]);

  const totalViews = jobStatusData
    .map((item) => item.view)
    .reduce((a, b) => (a ?? 0) + (b ?? 0), 0);
  const totalApplies = jobStatusData
    .map((item) => item.apply)
    .reduce((a, b) => (a ?? 0) + (b ?? 0), 0);

  const isEmptyBarChart = jobStatusData.every(
    (item) => !item.view && !item.apply
  );

  return (
    <>
      <Header />
      <Stack
        direction="column"
        justifyContent="space-between"
        width="100%"
        p={{ xs: '40px 0 0', md: '44px 0 0 47px' }}
        boxSizing="border-box"
      >
        <ChartWrapper
          direction="column"
          width="100%"
          bgcolor={{ xs: 'transparent', md: '#131322' }}
          boxSizing="border-box"
          borderRadius="10px"
          p={{ xs: 0, md: '27px 62px 47px 46px' }}
        >
          <Box display="flex" justifyContent="space-between" px={2}>
            <Typography
              fontWeight={700}
              fontSize={{ xs: 18, md: 22 }}
              lineHeight={1.2}
            >
              {matchDownMd ? 'Statistic' : 'Performance Overview'}
            </Typography>
            <Box display="flex" alignItems="center">
              <Typography
                color="#A3A1A1"
                mr={1}
                whiteSpace="nowrap"
                fontSize={{ xs: 12, md: 15 }}
              >
                Filter by:
              </Typography>
              <AppDropdown
                options={[
                  { value: '0', text: 'Today' },
                  { value: '1', text: 'This Week' },
                  { value: '2', text: 'This Month' },
                ]}
                value={period.toString()}
                onChange={(v: string) => setPeriod(Number(v) as HistoryPeriod)}
              />
            </Box>
          </Box>
          <Stack
            display="flex"
            direction={{ xs: 'column', md: 'row' }}
            bgcolor={{ xs: '#131322', md: 'transparent' }}
            mt={{ xs: 1.5, md: 4 }}
            padding={{ xs: '27px 19px', md: 0 }}
          >
            <Box
              display="flex"
              flexDirection="column"
              justifyContent="space-between"
              alignItems={{ xs: 'center', md: 'start' }}
              width={{ xs: '100%', md: '230px' }}
              height={{ xs: 'auto', md: '142px' }}
              border={{ xs: '0.7px solid #DBDBDB', md: '0.7px solid #FFFFFF' }}
              borderRadius={{ xs: '3px', md: '5px' }}
              padding={{ xs: '12px 45px', md: '15px 25px' }}
              bgcolor="#181824"
              boxSizing="border-box"
              mt={1}
            >
              <Box
                display="flex"
                width="100%"
                flexDirection={{ xs: 'row', md: 'column' }}
                flex={1}
                justifyContent="space-between"
                mt={{ xs: '11px', md: '0' }}
              >
                <Box display="flex">
                  <Box
                    bgcolor="#B50000"
                    width={16}
                    height={16}
                    borderRadius={16}
                    mt={{ xs: '2px', md: '7px' }}
                  />
                  <Box
                    display="flex"
                    flexDirection="column"
                    ml={{ xs: 1, md: '14px' }}
                  >
                    <Typography fontWeight={600} fontSize={{ xs: 15, md: 20 }}>
                      {totalViews}
                    </Typography>
                    <Typography fontWeight={300} fontSize={12}>
                      Views
                    </Typography>
                  </Box>
                </Box>
                <Box display="flex">
                  <Box
                    bgcolor="#DBDBDB"
                    width={16}
                    height={16}
                    borderRadius={16}
                    mt={{ xs: '2px', md: '7px' }}
                  />
                  <Box
                    display="flex"
                    flexDirection="column"
                    justifyContent="start"
                    ml={{ xs: 1, md: '14px' }}
                  >
                    <Box display="flex" alignItems="center">
                      <Typography
                        fontWeight={600}
                        fontSize={{ xs: 15, md: 20 }}
                        mr={1}
                      >
                        {totalApplies}
                      </Typography>
                      <HtmlTooltip
                        arrow
                        placement="right-end"
                        title={
                          <React.Fragment>
                            <Typography fontSize={12} lineHeight="18px">
                              The data on the dashboard may differ from actual
                              applications.
                            </Typography>
                          </React.Fragment>
                        }
                      >
                        <TooltipIcon>
                          <InfoIcon size={16} />
                        </TooltipIcon>
                      </HtmlTooltip>
                    </Box>
                    <Typography fontWeight={300} fontSize={12}>
                      Applications
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
            <Box
              width={{ xs: 'calc(100% + 64px)', md: 'calc(100% - 230px)' }}
              ml={{ xs: -8, md: 0 }}
              mt={{ xs: 2, md: 0 }}
              height={{ xs: 300, md: 340 }}
              position="relative"
            >
              <AppBarChart
                loading={loadingChartData}
                isEmpty={isEmptyBarChart}
                data={jobStatusData.map((item) => ({
                  name: item.name,
                  view: item.view.toString(),
                  apply: item.apply.toString(),
                }))}
              />
            </Box>
          </Stack>
        </ChartWrapper>
        <TableWrapper
          direction="column"
          width="100%"
          bgcolor={{ xs: 'transparent', md: '#131322' }}
          boxSizing="border-box"
          borderRadius={3}
          p={{ xs: 0, md: '25px 55px 37px 46px' }}
          mt={4}
        >
          <HeaderWrapper
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            px={1.5}
          >
            <Typography fontWeight={500} fontSize={18}>
              {matchDownMd ? 'Job Posted' : 'Recent Posted Jobs'}
            </Typography>
            <Box display="flex" alignItems="center">
              <Typography
                color="#A3A1A1"
                fontSize={{ xs: 12, md: 15 }}
                mr={1}
                whiteSpace="nowrap"
              >
                Sort by:
              </Typography>
              <AppDropdown
                options={[
                  { value: '0', text: 'Posted Date' },
                  { value: '1', text: 'Apply' },
                  { value: '2', text: 'Click' },
                ]}
                value={jobSortBy.toString()}
                onChange={(v: string) =>
                  setJobSortBy(v as unknown as JobSortType)
                }
              />
            </Box>
          </HeaderWrapper>
          <DataTableContainer mt={3} height={360}>
            <DataTable
              loading={loadingTableData}
              columns={columns}
              rows={rows}
              onClickRow={(id) =>
                router.push({
                  pathname: `/detail-job`,
                  query: {
                    id: id, // pass the id
                  },
                })
              }
            />
          </DataTableContainer>
        </TableWrapper>
      </Stack>
    </>
  );
};

export default DashboardPage;
