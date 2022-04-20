import React, { useMemo, useEffect, useState } from 'react';
import axios from 'axios';
import { useAccount } from 'wagmi';
import { Box, Stack, Typography, useTheme, useMediaQuery } from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/router';

import {
  DataTableContainer,
  AppToggleContainer,
  FilterWrapper,
  CustomDrawer,
} from './index.styles';
import {
  TableColumn,
  JobFilterType,
  TJob,
  ManageJobTableData,
} from '../../interfaces';
import { AppToggle } from '../../components/ToggleButton';
import JobManageDataTable from '../../components/JobManageDataTable';
import { getCaptialized } from '../../utils/helper';
import { createManageJobTableData } from '../../utils/helper';
import JobDeleteConfirmModal from '../../components/Modals/JobDeleteConfirm';
import JobSwitchConfirmModal from '../../components/Modals/JobSwitchConfirm';
import JobTakenOfflinePopup from '../../components/Modals/JobTakenOfflinePopup';
import { AppDropdown } from '../../components/Dropdown';
import Header from '../../components/AppHeader/DashboardHeader';
import SearchIcon from '../../assets/icons/search_icon.svg';
import UpDownArrow from '../../assets/icons/up_down_arrow.svg';
import FilterDrawer from './FilterDrawer';
import SearchDrawer from './SearchDrawer';

export const formatStatus = ({
  status,
  setStatus,
}: {
  status: JobFilterType;
  setStatus: (value: string) => void;
}) => {
  if (status === 'active' || status === 'inactive') {
    return (
      <AppToggleContainer>
        <AppToggle
          value={status === 'active'}
          onChange={() =>
            setStatus(status === 'active' ? 'inactive' : 'active')
          }
          label={getCaptialized(status)}
          placement={'end'}
        />
      </AppToggleContainer>
    );
  } else if (status === 'pending') {
    return (
      <Box
        padding="4px 12px"
        borderRadius="3px"
        bgcolor="#FFA51B"
        width="fit-content"
      >
        <Typography fontSize={14}>Pending</Typography>
      </Box>
    );
  } else if (status === 'draft') {
    return (
      <Box
        padding="4px 12px"
        borderRadius="3px"
        bgcolor="#2684FF"
        width="fit-content"
      >
        <Typography fontSize={14}>Draft</Typography>
      </Box>
    );
  } else if (status === 'bin') {
    return (
      <Box
        padding="4px 12px"
        borderRadius="3px"
        bgcolor="#B50000"
        width="fit-content"
      >
        <Typography fontSize={14}>Declined</Typography>
      </Box>
    );
  } else {
    return 'N/A';
  }
};

const ManageJobsPage = () => {
  const router = useRouter();
  const theme = useTheme();
  const matchDownMd = useMediaQuery(theme.breakpoints.down('md'));
  const { address: account } = useAccount();
  const [jobs, setJobs] = useState<TJob[]>([]);
  const [selectedJob, setSelectedJob] = useState<any>(null);
  const [openJobDeleteModal, setOpenJobDeleteModal] = useState<boolean>(false);
  const [openJobSwitchModal, setOpenJobSwitchModal] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [filterBy, setFilterBy] = useState<JobFilterType>('active');
  const [searchKey, setSearchKey] = useState<string>('');
  const [openTakenOfflinePopup, setOpenTakenOfflinePopup] =
    useState<boolean>(false);
  const [openSearchDrawer, setOpenSearchDrawer] = useState<boolean>(false);
  const [openSortDrawer, setOpenSortDrawer] = useState<boolean>(false);

  useEffect(() => {
    if (!account) return;
    setLoading(true);
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/job/getJobsByCreator`, {
        params: {
          userId: account?.toLowerCase(),
          search: searchKey,
          filter: filterBy,
        },
      })
      .then(({ data }) => {
        if (data.success) {
          setJobs([...data.jobs]);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, [account, searchKey, filterBy]);

  const handleSearch = (val: string) => {
    setSearchKey(val);
  };

  const columns: TableColumn[] = useMemo(
    () => [
      {
        id: 'name',
        label: 'Jobs',
        minWidth: matchDownMd ? 70 : 100,
        align: 'left',
      },
      ...(matchDownMd
        ? []
        : [
            {
              id: 'price',
              label: 'Compensation',
              minWidth: 100,
            },
          ]),
      ...(matchDownMd
        ? []
        : [
            {
              id: 'date',
              label: 'Date Posted',
              minWidth: 50,
            },
          ]),
      {
        id: 'action',
        label: 'Status',
        minWidth: 50,
        format: formatStatus,
      },
      {
        id: 'menu',
        label: 'Action',
        minWidth: 70,
      },
    ],
    []
  );

  const rows: ManageJobTableData[] = useMemo(() => {
    return jobs.map((admin, _i) => createManageJobTableData(admin, _i));
  }, [jobs]);

  const handleManageJob = (type: number, id: string) => {
    setSelectedJob({ id });
    if (type === 0) {
      router.push({
        pathname: `/detail-job`,
        query: {
          id: id, // pass the id
        },
      });
    } else if (type === 1) {
      setOpenJobDeleteModal(true);
    } else {
      router.push({
        pathname: `/edit-job`,
        query: {
          id: id, // pass the id
        },
      });
    }
  };

  const handleChangeAction = (id: string, val: any) => {
    if (val === 'active') {
      const selJob = jobs.find((j) => j.id === id);
      if (selJob?.offlineByAdmin) {
        setOpenTakenOfflinePopup(true);
      } else {
        handleConfirmSwitchJob({ status: val, id });
      }
    } else {
      setSelectedJob({ status: val, id });
      setOpenJobSwitchModal(true);
    }
  };

  const handleConfirmSwitchJob = (job: any) => {
    const idToken = localStorage.getItem('jwt_token');
    axios
      .put(
        `${process.env.NEXT_PUBLIC_API_URL}/job/editJob`,
        {
          job: job,
        },
        {
          headers: {
            Authorization: 'Bearer ' + idToken,
          },
        }
      )
      .then(({ data }) => {
        if (data.success) {
          const newJob = data.newJob;
          const updateJobs = [...jobs];
          const index = updateJobs.findIndex((item) => item.id === job?.id);
          updateJobs.splice(index, 1, newJob);
          setJobs(updateJobs);
          setOpenJobSwitchModal(false);
        }
      });
  };

  const handleConfirmDeleteJob = () => {
    const idToken = localStorage.getItem('jwt_token');
    axios
      .delete(
        `${process.env.NEXT_PUBLIC_API_URL}/job/deleteJob/${selectedJob?.id}`,
        {
          headers: {
            Authorization: 'Bearer ' + idToken,
          },
        }
      )
      .then(({ data }) => {
        if (data.success) {
          const updateJobs = [...jobs];
          const index = updateJobs.findIndex(
            (item) => item.id === selectedJob?.id
          );
          updateJobs.splice(index, 1);
          setJobs(updateJobs);
          setOpenJobDeleteModal(false);
        }
      });
  };

  return (
    <>
      <Header
        searchkey={searchKey}
        onSearch={handleSearch}
        visibleSearchBar={!matchDownMd}
      />
      <Stack p={{ xs: '60px 0 0', md: '44px 0 0 47px' }}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography
            fontWeight={700}
            fontSize={{ xs: 15, md: 22 }}
            lineHeight={1.2}
            ml={{ xs: 2, md: 0 }}
          >
            Manage Jobs
          </Typography>
          <Box display={{ xs: 'none', md: 'flex' }} alignItems="center">
            <Typography color="#A3A1A1" mr={1} whiteSpace="nowrap">
              Filter by:
            </Typography>
            <FilterWrapper>
              <AppDropdown
                options={[
                  { value: 'active', text: 'Active' },
                  { value: 'inactive', text: 'Inactive' },
                  { value: 'pending', text: 'Pending' },
                  { value: 'draft', text: 'Draft' },
                  { value: 'bin', text: 'Decline' },
                ]}
                value={filterBy}
                onChange={(v: string) => setFilterBy(v as JobFilterType)}
              />
            </FilterWrapper>
          </Box>
          <Box display={{ xs: 'flex', md: 'none' }}>
            <Box
              display="flex"
              alignItems="center"
              onClick={() => setOpenSearchDrawer(true)}
            >
              <Image src={SearchIcon} width={11} height={11} />
              <Typography ml="6px" fontSize={12} lineHeight={1.2}>
                Search
              </Typography>
            </Box>
            <Box
              display="flex"
              alignItems="center"
              ml="21px"
              onClick={() => setOpenSortDrawer(true)}
            >
              <Image src={UpDownArrow} width={11} height={14} />
              <Typography ml="6px" fontSize={12} lineHeight={1.2}>
                Sort
              </Typography>
            </Box>
          </Box>
        </Stack>
        <DataTableContainer mt={{ xs: 2, md: 5 }}>
          <JobManageDataTable
            loading={loading}
            columns={columns}
            rows={rows}
            handleManageJob={handleManageJob}
            handleChangeAction={handleChangeAction}
          />
        </DataTableContainer>
        <JobDeleteConfirmModal
          open={openJobDeleteModal}
          onClose={() => setOpenJobDeleteModal(false)}
          onConfirm={handleConfirmDeleteJob}
        />
        <JobSwitchConfirmModal
          open={openJobSwitchModal}
          onClose={() => setOpenJobSwitchModal(false)}
          onConfirm={() => handleConfirmSwitchJob(selectedJob)}
        />
        <JobTakenOfflinePopup
          open={openTakenOfflinePopup}
          onClose={() => setOpenTakenOfflinePopup(false)}
        />
        <CustomDrawer
          anchor={'bottom'}
          open={Boolean(openSortDrawer)}
          onClose={() => setOpenSortDrawer(false)}
        >
          <FilterDrawer
            onClose={() => setOpenSortDrawer(false)}
            filterBy={filterBy}
            setFilterBy={setFilterBy}
          />
        </CustomDrawer>
        <CustomDrawer
          anchor={'bottom'}
          open={Boolean(openSearchDrawer)}
          onClose={() => setOpenSearchDrawer(false)}
        >
          <SearchDrawer
            onClose={() => setOpenSearchDrawer(false)}
            searchkey={searchKey}
            onSearch={handleSearch}
            jobs={jobs.slice(0, 4)}
            handleManageJob={handleManageJob}
            handleChangeAction={handleChangeAction}
          />
        </CustomDrawer>
      </Stack>
    </>
  );
};

export default ManageJobsPage;
