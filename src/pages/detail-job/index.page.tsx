import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import Moment from 'react-moment';
import { Box, Link, Stack, Typography } from '@mui/material';

import { getOneJob } from '../../redux/reducers/jobReducer';
import { RootState } from '../../redux/store';
import {
  PageContainer,
  CompanyInfoContainer,
  MobilePageContainer,
} from './index.styles';
import { WORKING_HOURS_MAPPING } from '../../utils/constants';

import MoneyIcon from '../../assets/icons/money_icon.svg';
import ClockIcon from '../../assets/icons/clock_icon.svg';
import LocationIcon from '../../assets/icons/place_icon.svg';
import ArrowRightIcon from '../../assets/icons/arrow_right.svg';
import BriefIconIcon from '../../assets/icons/briefbag_icon.svg';
import { getLocationText, formatPriceAmount } from '../../utils/helper';
import Header from '../../components/AppHeader/DashboardHeader';

const DetailJobPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { id } = router.query;
  const { selectedJob, loading } = useSelector((state: RootState) => state.job);

  useEffect(() => {
    if (typeof window !== undefined) {
      window.scrollTo({
        top: 0,
        behavior: 'auto',
      });
    }
    dispatch(getOneJob({ id }));
  }, []);

  return (
    <>
      <Header hiddenBackLink />
      <PageContainer
        direction="row"
        margin="32px 127px 0 115px"
        flex={1}
        display={{ xs: 'none', md: 'flex' }}
      >
        <Stack
          padding="33px 48px 48px 40px"
          bgcolor="rgba(16, 16, 30, 0.3)"
          border="1px solid #131322"
          boxShadow="0px 0px 10px #131322"
          borderRadius="10px"
          flex={1}
          sx={{ backdropFilter: 'blur(10px)' }}
        >
          <Box
            width="100%"
            display="flex"
            alignItems="center"
            position="relative"
          >
            <Typography fontSize={30} lineHeight={1.5} fontWeight={600}>
              {selectedJob.title}
            </Typography>
            <Box display="flex" alignItems="center" ml="41px">
              <Box display="flex" alignItems="center" mr={1.5}>
                <img src={ClockIcon} />
              </Box>
              {/*
              // @ts-ignore */}
              <Moment fromNow>{selectedJob.posted_at}</Moment>
            </Box>
          </Box>
          <Box display="flex" alignItems="center" mt={2.25}>
            {selectedJob.tags?.map((tag) => (
              <Box
                padding="7px"
                borderRadius="3px"
                border="1px solid #fff"
                color="#fff"
                mr={1}
                fontSize={12}
                lineHeight="18px"
                key={tag}
              >
                {tag}
              </Box>
            ))}
          </Box>
          <Box mt={4} className="apply-job-description">
            <div
              dangerouslySetInnerHTML={{ __html: selectedJob.description }}
            />
          </Box>
        </Stack>
        <CompanyInfoContainer
          flex={0.33}
          direction="column"
          padding="33px 38px 19px 39px"
          bgcolor="rgba(16, 16, 30, 0.3)"
          border="1px solid #10101E"
          borderRadius="10px"
          height="fit-content"
          position="sticky"
          top={18}
          ml={2.25}
        >
          <Box display="flex" alignItems="start">
            {selectedJob.logo ? (
              <Image
                src={selectedJob.logo}
                className="apply-job-logo"
                width={35}
                height={35}
              />
            ) : (
              <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                width={35}
                minWidth={35}
                height={35}
                borderRadius={18}
                fontSize={30}
                lineHeight={1.5}
                fontWeight={700}
                border="1px solid #fff"
              >
                {selectedJob.company_name?.charAt(0).toUpperCase()}
              </Box>
            )}
            <Typography fontSize="30px" lineHeight={1.5} ml={1}>
              {selectedJob.company_name}
            </Typography>
          </Box>
          {Boolean(selectedJob.salary?.min || selectedJob.salary?.max) && (
            <Box display="flex" flexDirection="column" mt={3}>
              <Typography fontWeight={300}>COMPENSATION:</Typography>
              <Typography fontWeight={500} mt={1}>{`$${formatPriceAmount(
                selectedJob.salary?.min
              )} - $${formatPriceAmount(selectedJob.salary?.max)}`}</Typography>
            </Box>
          )}
          <Box display="flex" flexDirection="column" mt={2.5}>
            <Typography fontWeight={300}>JOB TYPE:</Typography>
            <Typography fontWeight={500} mt={1}>
              {WORKING_HOURS_MAPPING[selectedJob.position]}
            </Typography>
          </Box>
          <Box display="flex" flexDirection="column" mt={2.5}>
            <Typography fontWeight={300}>LOCATION:</Typography>
            <Typography fontWeight={500} mt={1}>
              {getLocationText(selectedJob)}
            </Typography>
          </Box>
          <Typography mt={2.5}>{selectedJob.short_description}</Typography>
        </CompanyInfoContainer>
      </PageContainer>
      <MobilePageContainer display={{ xs: 'flex', md: 'none' }} px={1} mt={5}>
        <Box position="sticky" top={0} bgcolor="#05050d" pb="18px" pt={1}>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            pb="5px"
            borderBottom="1px solid rgba(25, 159, 217, 0.35)"
            mx="6px"
          >
            <Typography fontSize={20} lineHeight={1.5} fontWeight={600}>
              {selectedJob.title}
            </Typography>
          </Box>
          <Box display="flex" alignItems="center" mt="15px">
            {selectedJob.logo ? (
              <Image
                src={selectedJob.logo}
                width={23}
                height={23}
                className="apply-job-logo"
              />
            ) : (
              <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                width={23}
                minWidth={23}
                height={23}
                borderRadius={12}
                fontSize={18}
                lineHeight={1.5}
                fontWeight={700}
                border="1px solid #fff"
              >
                {selectedJob.company_name?.charAt(0).toUpperCase()}
              </Box>
            )}
            <Typography fontSize={15} lineHeight={1.5} ml={1}>
              {selectedJob.company_name}
            </Typography>
          </Box>
        </Box>
        <Box display="flex" alignItems="center" mt="1px" ml="2px">
          {selectedJob.tags?.map((tag) => (
            <Box
              padding="5.5px"
              borderRadius="3px"
              color="#fff"
              mr="10px"
              fontSize={10}
              lineHeight="15px"
              sx={{ outline: '1px solid #fff' }}
              key={tag}
            >
              {tag}
            </Box>
          ))}
        </Box>
        {Boolean(selectedJob.salary?.min || selectedJob.salary?.max) && (
          <Box display="flex" flexDirection="column" mt={3}>
            <Typography fontSize={12} fontWeight={300}>
              COMPENSATION:
            </Typography>
            <Typography fontWeight={500} mt={1}>{`$${formatPriceAmount(
              selectedJob.salary?.min
            )} - $${formatPriceAmount(selectedJob.salary?.max)}`}</Typography>
          </Box>
        )}
        <Box display="flex" flexDirection="column" mt={2.5}>
          <Typography fontSize={12} fontWeight={300}>
            JOB TYPE:
          </Typography>
          <Typography fontWeight={500} mt={1}>
            {WORKING_HOURS_MAPPING[selectedJob.position]}
          </Typography>
        </Box>
        <Box display="flex" flexDirection="column" mt={2.5}>
          <Typography fontSize={12} fontWeight={300}>
            LOCATION:
          </Typography>
          <Typography fontWeight={500} mt={1}>
            {getLocationText(selectedJob)}
          </Typography>
        </Box>
        <Box mt={5.25} className="apply-job-description">
          <div dangerouslySetInnerHTML={{ __html: selectedJob.description }} />
        </Box>
      </MobilePageContainer>
    </>
  );
};

export default DetailJobPage;
