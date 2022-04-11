import React, { useEffect, useState } from 'react';
import {
  Modal,
  Box,
  styled,
  Button,
  IconButton,
  useTheme,
  useMediaQuery,
  Drawer,
  Stack,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import CloseIcon from '@mui/icons-material/Close';
import { getJobs } from '../../redux/reducers/jobReducer';
import { RootState } from '../../redux/store';
const JobItem = React.lazy(() => import('../JobItem'));
const JobItemSkeleton = React.lazy(() => import('../JobItem/skeleton'));
import FilterIcon from '../SVGIcons/FilterIcon';
import { TJob } from '../../interfaces';

type StickyPostCompareModalProps = {
  open: boolean;
  job: TJob;
  isHiddenMask: boolean;
  logo: File | undefined;
  onClose: () => void;
};

const CloseButton = styled(IconButton)({
  background: '#9E9E9E20',
  borderRadius: '50%',
  cursor: 'pointer',
  marginLeft: 'auto',
});

const ContainerBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  background: '#05050D',
  borderRadius: 20,
  border: '1px solid #199fd9',

  '& .modal-header-title': {
    fontWeight: 500,
    fontSize: '18px',
    lineHeight: '22px',
    color: '#fff',
  },
  '& .modal-header': {
    backgroundColor: '#131322',
    padding: '14px 58px 14px 24px',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  '& .modal-body': {
    display: 'flex',
    flexDirection: 'column',
    padding: 24,

    '& .filter-button': {
      marginLeft: 'auto',
      marginBottom: 29,
    },
    '& .modal-body-title': {
      marginTop: 9,
    },
    '& .modal-body-text': {
      fontSize: 15,
      lineHeight: '22.5px',
      color: '#fff',
      textAlign: 'center',
      marginTop: 17,
    },
  },
  [theme.breakpoints.down('md')]: {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    borderWidth: '1px 1px 0px',
    position: 'relative',
    top: 0,
    left: 0,
    transform: 'translate(0%, 0%)',
    '& .modal-header': {
      backgroundColor: '#05050D',
      paddingRight: 14,
    },
    '& .modal-body': {
      padding: '24px 8px',
    },
  },
}));

export const FilterButton = styled(Button)({
  width: 45,
  minWidth: 45,
  height: 45,
  borderRadius: 45,
  padding: 0,
  marginRight: 10,

  '&:hover': {
    '& *': {
      fill: '#000',
    },
  },
});

const StickyPostCompare = ({
  open,
  job,
  logo,
  isHiddenMask,
  onClose,
}: StickyPostCompareModalProps) => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const matchDownMd = useMediaQuery(theme.breakpoints.down('md'));
  const { jobs, fetchLoading } = useSelector((state: RootState) => state.job);

  useEffect(() => {
    dispatch(
      getJobs({
        page: 0,
        pageSize: 1,
      })
    );
  }, []);

  const fr = new FileReader();
  if (logo) fr.readAsDataURL(logo);

  const Container = () => (
    <ContainerBox
      width={{ xs: 'calc(100% - 6px)', md: 1400 }}
      height={{ xs: '100%', md: 'auto' }}
    >
      <Box className="modal-header">
        <CloseButton aria-label="delete" size="small" onClick={onClose}>
          <CloseIcon fontSize="small" />
        </CloseButton>
      </Box>
      <Box className="modal-body">
        {matchDownMd ? (
          <Box height="8px" />
        ) : (
            <Box className="filter-button">
              <FilterButton>
                <FilterIcon />
              </FilterButton>
              <span>Filter</span>
            </Box>
          )}
        {fetchLoading ? (
          <>
            <JobItemSkeleton />
            <Box marginBottom={{ xs: '23px', md: '114px' }} position="relative">
              <JobItemSkeleton />
              {!isHiddenMask && (
                <Box
                  bgcolor="rgba(5, 5, 13, 0.85)"
                  position="absolute"
                  top={0}
                  left={0}
                  width="100%"
                  height="100%"
                />
              )}
            </Box>
          </>
        ) : (
            <>
              <Box style={{ border: '1px solid #fff' }}>
                <JobItem
                  job={{ ...job, logo: logo ? URL.createObjectURL(logo) : '' }}
                  disabled={true}
                />
              </Box>
              {jobs.length > 0 && (
                <Box
                  marginTop="5px"
                  marginBottom={{ xs: '23px', md: '114px' }}
                  position="relative"
                >
                  <JobItem job={jobs[0]} disabled={true} />
                  {!isHiddenMask && (
                    <Box
                      bgcolor="rgba(5, 5, 13, 0.85)"
                      position="absolute"
                      top={0}
                      left={0}
                      width="100%"
                      height="100%"
                    />
                  )}
                </Box>
              )}
            </>
          )}
      </Box>
    </ContainerBox>
  );

  if (matchDownMd) {
    return (
      <Drawer anchor={'bottom'} open={open} onClose={onClose}>
        <Stack width="100%" height="fit-content" bgcolor="#05050D" overflow="hidden">
          <Container />
        </Stack>
      </Drawer>
    );
  }
  return (
    <Modal open={open} onClose={onClose}>
      <Container />
    </Modal>
  );
};

export default StickyPostCompare;
