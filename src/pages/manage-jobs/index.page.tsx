import React, { useMemo, useEffect, useState } from 'react';
import axios from 'axios';
import { useWeb3React } from '@web3-react/core';
import { Box, Stack, Typography } from '@mui/material';
import { useRouter } from 'next/router';

import {
  DataTableContainer,
  AppToggleContainer,
  FilterWrapper,
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

const formatStatus = ({
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
  const { account, activate } = useWeb3React();
  const [jobs, setJobs] = useState<TJob[]>([]);
  const [selectedJob, setSelectedJob] = useState<any>(null);
  const [openJobDeleteModal, setOpenJobDeleteModal] = useState<boolean>(false);
  const [openJobSwitchModal, setOpenJobSwitchModal] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [filterBy, setFilterBy] = useState<JobFilterType>('active');
  const [searchKey, setSearchKey] = useState<string>('');
  const [openTakenOfflinePopup, setOpenTakenOfflinePopup] =
    useState<boolean>(false);

  useEffect(() => {
    if (!account) return;
    setLoading(true);
    axios
      .get(`${process.env.REACT_APP_API_URL}/job/getJobsByCreator`, {
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
      { id: 'name', label: 'Jobs', minWidth: 100, align: 'left' },
      {
        id: 'price',
        label: 'Compensation',
        minWidth: 100,
      },
      {
        id: 'date',
        label: 'Date Posted',
        minWidth: 50,
      },
      {
        id: 'action',
        label: 'Status',
        minWidth: 50,
        format: formatStatus,
      },
      {
        id: 'menu',
        label: 'Action',
        minWidth: 50,
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
        pathname: `/detail-job`,
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
        `${process.env.REACT_APP_API_URL}/job/editJob`,
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
        `${process.env.REACT_APP_API_URL}/job/deleteJob/${selectedJob?.id}`,
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
      <Header searchkey={searchKey} onSearch={handleSearch} visibleSearchBar />
      <Stack p="44px 0 0 47px">
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography fontWeight={700} fontSize={22} lineHeight="26.4px">
            Manage Jobs
          </Typography>
          <Box display="flex" alignItems="center">
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
        </Stack>

        <DataTableContainer mt={5}>
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
      </Stack>
    </>
  );
};

export default ManageJobsPage;
