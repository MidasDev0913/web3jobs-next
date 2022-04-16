import React, { useState, useMemo, useEffect } from 'react';
import {
  Stack,
  Typography,
  IconButton,
  Box,
  styled,
  InputAdornment,
  TextField,
} from '@mui/material';
import Image from 'next/image';
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '../../assets/icons/home_search_icon.svg';
import { TableColumn, ManageJobTableData, TJob } from '../../interfaces';
import { formatStatus } from './index.page';
import { createManageJobTableData } from '../../utils/helper';
import JobManageDataTable from '../../components/JobManageDataTable';
import next from 'next';

type ComponentProps = {
  onClose: () => void;
  jobs: TJob[];
  searchkey?: string;
  onSearch?: (arg: string) => void;
  handleManageJob: (type: number, id: string) => void;
  handleChangeAction: (id: string, val: any) => void;
};

export const SearchBarContainer = styled(Box)({
  position: 'relative',
  width: '100%',

  '& .suffix': {
    position: 'absolute',
    top: 5,
    right: -20,
    fontWeight: 500,
    fontSize: '15px',
    lineHeight: '18px',
    color: '#FFFFFF',
    background: '#B50000',
    borderRadius: 5,
    padding: 15,
  },

  '& .MuiTextField-root': {
    width: '100%',

    '& input': {
      borderRadius: 5,
      background: '#131322',
      color: '#fff',
      padding: '11px 14px',
      paddingLeft: 37,
      fontSize: 12,
    },
    '& .MuiInputAdornment-root': {
      '&.MuiInputAdornment-positionStart': {
        position: 'absolute',
        left: 14,
      },
      '&.MuiInputAdornment-positionEnd': {
        position: 'absolute',
        right: 35,
      },
    },
  },
});

export const DataTableContainer = styled(Box)`
  & .MuiPaper-root {
    background: transparent;
  }
  & .MuiTable-root {
    border-collapse: separate;
    border-spacing: 0 5px;
  }
  & .MuiTableContainer-root {
    max-height: 100%;
    & .MuiTableHead-root {
      display: none;
    }
    & .MuiTableRow-root {
      background: transparent !important;
    }
  }
  & .MuiTablePagination-root {
    display: none;
  }
`;

const SearchDrawer: React.FC<ComponentProps> = ({
  onClose,
  jobs,
  searchkey,
  onSearch,
  handleManageJob,
  handleChangeAction,
}) => {
  const [val, setValue] = useState<string>('');

  useEffect(() => {
    setValue(searchkey || '');
  }, [searchkey]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.keyCode === 13 && onSearch) {
      onSearch(val);
      onClose();
    }
  };

  const columns: TableColumn[] = useMemo(
    () => [
      { id: 'name', label: 'Jobs', minWidth: 80, align: 'left' },
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

  return (
    <Stack
      padding="17px 24px 24px"
      boxSizing="border-box"
      borderRadius="20px 20px 0px 0px"
    >
      <Stack
        direction="row"
        width="100%"
        alignItems="center"
        justifyContent="space-between"
        position="relative"
      >
        <Typography fontSize={15} lineHeight={1} fontWeight={700}>
          Search
        </Typography>
        <IconButton onClick={onClose}>
          <CloseIcon fontSize="small" />
        </IconButton>
      </Stack>

      <SearchBarContainer mt={2}>
        <TextField
          placeholder="search for job title..."
          value={val}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Image src={SearchIcon} width={15} height={17} />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment
                position="end"
                className="cursor__pointer"
                style={{ visibility: val ? 'visible' : 'hidden' }}
              >
                <Box
                  display="flex"
                  alignItems="center"
                  onClick={() => {
                    setValue('');
                    if (searchkey && onSearch) {
                      onSearch('');
                      onClose();
                    }
                  }}
                >
                  <CloseIcon fontSize="inherit" />
                </Box>
              </InputAdornment>
            ),
          }}
        />
      </SearchBarContainer>

      <DataTableContainer mt={2}>
        <JobManageDataTable
          columns={columns}
          rows={rows}
          handleManageJob={handleManageJob}
          handleChangeAction={handleChangeAction}
        />
      </DataTableContainer>
    </Stack>
  );
};

export default SearchDrawer;
