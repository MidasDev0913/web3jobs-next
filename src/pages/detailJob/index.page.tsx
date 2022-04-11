import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Moment from 'react-moment';
import { Box, Link } from '@mui/material';

import { getOneJob } from '../../redux/reducers/jobReducer';
import { RootState } from '../../redux/store';
import { PageContainer } from './index.styles';
import { WORKING_HOURS_MAPPING } from '../../utils/constants';

import MoneyIcon from '../../assets/icons/money_icon.svg';
import ClockIcon from '../../assets/icons/clock_icon.svg';
import LocationIcon from '../../assets/icons/place_icon.svg';
import ArrowRightIcon from '../../assets/icons/arrow_right.svg';
import BriefIconIcon from '../../assets/icons/briefbag_icon.svg';
import { getLocationText } from '../../utils/helper';

const DetailJobPage = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { selectedJob, loading } = useSelector((state: RootState) => state.job);

  useEffect(() => {
    if(typeof window !== undefined) {
      window.scrollTo({
        top: 0,
        behavior: 'auto',
      });
    }
    dispatch(getOneJob({ id }));
  }, []);

  return (
    <>
      <PageContainer>
        <Box className="job-description" flex={1} px="130px">
          <Box display="flex" alignItems="center">
            {selectedJob.logo ? (
              <img src={selectedJob.logo} className="apply-job-logo" />
            ) : (
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  width={119}
                  minWidth={119}
                  height={119}
                  borderRadius={60}
                  fontSize={60}
                  lineHeight={1.5}
                  fontWeight={700}
                  border="1px solid #fff"
                >
                  {selectedJob.company_name?.charAt(0).toUpperCase()}
                </Box>
              )}
            <Box display="flex" marginLeft="27px" flexDirection="column">
              <Box className="apply-job-title">{selectedJob.title}</Box>
              <Box className="organization">{selectedJob.company_name}</Box>
              <Box display="flex" alignItems="center" mt={1}>
                {Boolean(selectedJob.salary?.min || selectedJob.salary?.max) && (
                  <Box className="salary">
                    <img src={MoneyIcon} />
                    <span>
                      ${selectedJob.salary?.min} - ${selectedJob.salary?.max}
                    </span>
                  </Box>
                )}
                <Box className="location" marginLeft="35px">
                  <img src={LocationIcon} />
                  <span>{getLocationText(selectedJob)}</span>
                </Box>
                <Box className="location" marginLeft="35px">
                  <img src={BriefIconIcon} />
                  <span>{WORKING_HOURS_MAPPING[selectedJob.position]}</span>
                </Box>
              </Box>
            </Box>
          </Box>
          <Box mt={6} className="apply-job-description">
            <div
              dangerouslySetInnerHTML={{ __html: selectedJob.description }}
            />
          </Box>
        </Box>
        <Box display="flex" alignItems="center" marginTop="35px">
          <Box className="time">
            <img src={ClockIcon} />
            {/*
        // @ts-ignore */}
            <Moment fromNow>{selectedJob.created_at}</Moment>
          </Box>
          <Box display="flex" alignItems="center" ml="47px">
            {selectedJob.tags?.map((tag) => (
              <span className="tag" key={tag}>
                {tag}
              </span>
            ))}
          </Box>
          <Box display="flex" alignItems="center" ml="47px">
            <Link className="link-to-company">Company Profile</Link>
            <img src={ArrowRightIcon} />
          </Box>
        </Box>
      </PageContainer>
    </>
  );
};

export default DetailJobPage;
