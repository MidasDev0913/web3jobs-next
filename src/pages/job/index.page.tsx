import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Image from 'next/image';

import { useDispatch, useSelector } from 'react-redux';
import Moment from 'react-moment';
import { Box, Link, Stack, styled, Typography, Tooltip } from '@mui/material';
import { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';
import axios from 'axios';
// import { LinkedinShareButton, TwitterShareButton } from 'react-share';
import { logEvent } from 'firebase/analytics';

import { viewJob, setFavorite } from '../../redux/reducers/jobReducer';
import { RootState } from '../../redux/store';
import { TJob } from '../../interfaces';
import {
  PageContainer,
  BottomContainer,
  Border,
  CompanyInfoContainer,
  MobilePageContainer,
} from './index.styles';
import { WORKING_HOURS_MAPPING } from '../../utils/constants';
// import LinkedinIcon from '../../components/SVGIcons/LinkedinIcon';
// import TwitterIcon from '../../components/SVGIcons/TwitterIcon';

import ClockIcon from '../../assets/icons/clock_icon.svg';
// import NewsletterBgSvg from '../../assets/images/newsletter-bg.svg';
import FavIcon from '../../components/SVGIcons/FavIcon_large';
import ArrowRightIcon from '../../components/SVGIcons/ArrowRightIcon_small';
import ArrowRightIconHigh from '../../components/SVGIcons/ArrowRightIcon';
import ArrowLeftIcon from '../../components/SVGIcons/ArrowLeftIcon';
import { analytics } from '../../firebase';
import { formatPriceAmount, getLocationText } from '../../utils/helper';
import { NextPageContext } from 'next';
const JobItem = React.lazy(() => import('../../components/JobItem'));
// const SubscribeBox = React.lazy(() => import('../../components/SubscribeBox'));
const EnjoyFeatureSection = React.lazy(
  () => import('../../components/EnjoyFeatureSection')
);

const HtmlTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: '#131322',
    color: '#fff',
    maxWidth: 129,
    padding: '7px 21.5px',
  },

  [`& .${tooltipClasses.arrow}:before`]: {
    backgroundColor: '#131322',
  },
}));

type ComponentProps = {
  job: TJob;
};

const ApplyJobPage: React.FC<ComponentProps> = (props) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { id } = router.query;
  const { job } = props;
  const selectedJob = job || {};

  const { isLoggedIn, userInfo } = useSelector(
    (state: RootState) => state.auth
  );
  const [similarJobs, setSimilarJobs] = useState<TJob[]>([]);
  const [companyJobs, setCompanyJobs] = useState<TJob[]>([]);
  const JOBDESCRIPTION = selectedJob.description
    .replace(/<\/?[^>]+(>|$)/g, '')
    .split('.')[0];
  const JOBSALARY = `$${formatPriceAmount(
    selectedJob.salary?.min
  )} - $${formatPriceAmount(selectedJob.salary?.max)}`;

  // const shareButtonProps = {
  //   url: window.location.href,
  // };

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'auto',
    });
    logEvent(analytics, 'view_job', { id });
  }, [id]);

  useEffect(() => {
    if (id) {
      if (userInfo.address) {
        dispatch(
          viewJob({ account: userInfo.address?.toLowerCase(), jobId: id })
        );
      } else {
        dispatch(viewJob({ jobId: id }));
      }
    }
  }, [userInfo.address, id]);

  useEffect(() => {
    if (selectedJob.tags && selectedJob.tags?.length) {
      axios
        .get(`${process.env.NEXT_PUBLIC_API_URL}/job/getSimilarJobsByTags`, {
          params: { tags: selectedJob.tags },
        })
        .then(({ data }) => {
          setSimilarJobs(
            (data.jobs || []).filter((item: TJob) => item.id !== id)
          );
        });
    }

    if (selectedJob.company_name) {
      axios
        .get(`${process.env.NEXT_PUBLIC_API_URL}/job/getMoreJobsInCompany`, {
          params: {
            company: selectedJob.company_name,
          },
        })
        .then(({ data }) => {
          setCompanyJobs(
            (data.jobs || []).filter((item: TJob) => item.id !== id)
          );
        });
    }
  }, [selectedJob]);

  const handleSubscribe = () => {};

  const handleApplyJob = () => {
    axios.post(`${process.env.NEXT_PUBLIC_API_URL}/job/applyJob`, {
      jobId: id,
    });
  };

  const handleGoToCompany = () => {
    router.push({
      pathname: '/',
      query: {
        ...router.query,
        company: selectedJob.company_name,
        goToJobs: true,
      },
    });
  };

  const handleClickFav = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isLoggedIn || !userInfo.address) {
      document.getElementById('header-connect-wallet-btn')?.click();
    } else {
      e.stopPropagation();

      dispatch(
        setFavorite({
          jobId: id,
          userId: userInfo.address?.toLowerCase(),
          reload: () => {
            router.replace(router.asPath, undefined, {
              scroll: false,
            });
          },
        })
      );
    }
  };

  return (
    <>
      <Head>
        <meta
          name="description"
          content={
            JOBDESCRIPTION + '. ' + JOBSALARY + ', ' + selectedJob.company_name
          }
        />
        <meta
          name="og:description"
          content={
            JOBDESCRIPTION + '. ' + JOBSALARY + ', ' + selectedJob.company_name
          }
        />
        <meta
          property="twitter:description"
          content={
            JOBDESCRIPTION + '. ' + JOBSALARY + ', ' + selectedJob.company_name
          }
        />
      </Head>
      <Box
        display={{ xs: 'none', md: 'flex' }}
        alignItems="center"
        ml="115px"
        mt={2.5}
        className="cursor__pointer"
        onClick={() => {
          router.back();
        }}
      >
        <ArrowLeftIcon />
        <Typography ml="15px">Back to Web3Jobs</Typography>
      </Box>
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
            <Typography
              fontSize={30}
              lineHeight={1.5}
              fontWeight={600}
              component="h1"
            >
              {selectedJob.title}
            </Typography>
            <Box display="flex" alignItems="center" ml="41px">
              <Box display="flex" alignItems="center" mr={1.5}>
                <img src={ClockIcon.src} />
              </Box>
              {/*
              // @ts-ignore */}
              <Moment fromNow>{selectedJob.posted_at}</Moment>
            </Box>
            <HtmlTooltip
              arrow
              placement="top"
              title={
                <React.Fragment>
                  <Typography fontSize={12} lineHeight="18px">
                    Add to favorite
                  </Typography>
                </React.Fragment>
              }
            >
              <Box
                position="absolute"
                top="13px"
                right={0}
                className="cursor__pointer"
                onClick={handleClickFav}
              >
                <FavIcon
                  color="#FFC700"
                  isFill={selectedJob.likes?.includes(
                    userInfo.address?.toLowerCase() || ''
                  )}
                />
              </Box>
            </HtmlTooltip>
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
          {/* <Box
            display="hidden"
            alignItems="center"
            width="calc(100% - 130px)"
            mt="46px"
          >
            <span>Share this job:</span>
            <Box ml="30px">
              <TwitterShareButton {...shareButtonProps}>
                <Box className="twitter-share-button">
                  <TwitterIcon />
                  <span>Twitter</span>
                </Box>
              </TwitterShareButton>
              <LinkedinShareButton {...shareButtonProps}>
                <Box className="linkedin-share-button">
                  <LinkedinIcon />
                  <span>Linkedin</span>
                </Box>
              </LinkedinShareButton>
            </Box>
          </Box> */}
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
              <div className="apply-job-logo">
                <Image
                  src={selectedJob.logo}
                  width={35}
                  height={35}
                  style={{ borderRadius: 18 }}
                />
              </div>
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
          <a
            href={
              selectedJob.applyBy === 'email'
                ? `mailto:${selectedJob.applyByUrl}?subject=${selectedJob.title} via Web3.jobs`
                : selectedJob.applyByUrl?.includes('http')
                ? selectedJob.applyByUrl
                : `https://${selectedJob.applyByUrl}`
            }
            target="_blank"
            rel="noreferrer"
            onClick={handleApplyJob}
            className="apply-button"
          >
            Apply Now
          </a>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            mt={2}
          >
            <Link className="link-to-company" onClick={handleGoToCompany}>
              Company Profile
            </Link>
            <ArrowRightIcon />
          </Box>
        </CompanyInfoContainer>
      </PageContainer>
      <MobilePageContainer display={{ xs: 'flex', md: 'none' }} px={3}>
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
            <Box className="cursor__pointer" onClick={handleClickFav}>
              <FavIcon
                color="#FFC700"
                isFill={selectedJob.likes?.includes(
                  userInfo.address?.toLowerCase() || ''
                )}
              />
            </Box>
          </Box>
          <Box display="flex" alignItems="center" mt="15px">
            {selectedJob.logo ? (
              <div className="apply-job-logo">
                <Image
                  src={selectedJob.logo}
                  width={23}
                  height={23}
                  style={{ borderRadius: 12 }}
                />
              </div>
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
        <a
          href={
            selectedJob.applyBy === 'email'
              ? `mailto:${selectedJob.applyByUrl}?subject=${selectedJob.title} via Web3.jobs`
              : selectedJob.applyByUrl?.includes('http')
              ? selectedJob.applyByUrl
              : `https://${selectedJob.applyByUrl}`
          }
          target="_blank"
          rel="noreferrer"
          onClick={handleApplyJob}
          className="apply-button"
        >
          Apply Now
        </a>
        <Box mt={5.25} className="apply-job-description">
          <div dangerouslySetInnerHTML={{ __html: selectedJob.description }} />
        </Box>
        {/* <Box display="flex" alignItems="center" width="100%" mt="40px">
          <span>Share this job:</span>
          <Box ml="30px">
            <TwitterShareButton {...shareButtonProps}>
              <Box className="twitter-share-button">
                <TwitterIcon />
              </Box>
            </TwitterShareButton>
            <LinkedinShareButton {...shareButtonProps}>
              <Box className="linkedin-share-button">
                <LinkedinIcon />
              </Box>
            </LinkedinShareButton>
          </Box>
        </Box> */}
        <a
          href={
            selectedJob.applyBy === 'email'
              ? `mailto:${selectedJob.applyByUrl}?subject=${selectedJob.title} via Web3.jobs`
              : selectedJob.applyByUrl?.includes('http')
              ? selectedJob.applyByUrl
              : `https://${selectedJob.applyByUrl}`
          }
          target="_blank"
          rel="noreferrer"
          onClick={handleApplyJob}
          className="apply-button"
        >
          Apply Now
        </a>
        <Stack
          direction="row"
          width="100%"
          justifyContent="space-between"
          mt={2}
        >
          <Box display="flex" alignItems="center" justifyContent="center">
            <Link className="link-to-company" onClick={handleGoToCompany}>
              Company Profile
            </Link>
            <ArrowRightIcon />
          </Box>
          <Box display="flex" alignItems="center" fontSize={13}>
            <Box display="flex" alignItems="center" mr={1.5}>
              <img src={ClockIcon.src} />
            </Box>
            {/*
              // @ts-ignore */}
            <Moment fromNow>{selectedJob.posted_at}</Moment>
          </Box>
        </Stack>
      </MobilePageContainer>
      <Border
        width={{ xs: 'calc(100% - 74px)', md: 'calc(100% - 254px)' }}
        margin={{ xs: '33px 37px 0', md: '60px 127px 0' }}
      />
      <BottomContainer
        mt={{ xs: '33px', md: '100px' }}
        mb={{ xs: '37px', md: '120px' }}
      >
        {companyJobs.length > 0 && (
          <Box
            width="100%"
            padding={{ xs: '0 16px', md: '0 89px' }}
            marginBottom="52px"
            display="flex"
            flexDirection="column"
            alignItems="center"
            style={{ boxSizing: 'border-box' }}
          >
            <Typography
              lineHeight={1.5}
              fontSize={{ xs: 18, md: 30 }}
              fontWeight={600}
            >
              More jobs from {selectedJob.company_name}
            </Typography>
            <Typography
              color="#A3A1A1"
              lineHeight={2}
              fontSize={{ xs: 13, md: 15 }}
            >
              Check out these similar jobs from {selectedJob.company_name}
            </Typography>
            {companyJobs.map((job) => (
              <Box key={job.id} width="100%" marginTop="5px">
                <JobItem job={job} />
              </Box>
            ))}
            <Box
              display="flex"
              alignItems="center"
              justifyContent="end"
              width="100%"
              mt="41px"
            >
              <Link className="link-to-jobs" onClick={handleGoToCompany}>
                Company Profile
              </Link>
              <ArrowRightIconHigh />
            </Box>
          </Box>
        )}
        {similarJobs.length > 0 && (
          <Box
            width="100%"
            padding={{ xs: '0 16px', md: '0 89px' }}
            marginBottom="52px"
            display="flex"
            flexDirection="column"
            alignItems="center"
            style={{ boxSizing: 'border-box' }}
          >
            <Typography
              lineHeight={1.5}
              fontSize={{ xs: 18, md: 30 }}
              fontWeight={600}
            >
              Similar {selectedJob.title} jobs
            </Typography>
            <Typography
              color="#A3A1A1"
              lineHeight={2}
              fontSize={{ xs: 13, md: 15 }}
            >
              Check out these similar jobs
            </Typography>
            {similarJobs.map((job) => (
              <Box key={job.id} width="100%" marginTop="5px">
                <JobItem job={job} />
              </Box>
            ))}
            <Box
              display="flex"
              alignItems="center"
              justifyContent="end"
              width="100%"
              mt="41px"
            >
              <Link className="link-to-jobs" href="/">
                Back to all jobs
              </Link>
              <ArrowRightIconHigh />
            </Box>
          </Box>
        )}
        <EnjoyFeatureSection
          onHireTalent={() => router.push('/post-job')}
          onGetJob={() =>
            router.push({ pathname: '/', query: { goToJobs: true } })
          }
        />
        {/* <Box marginTop="86px" className="home-newsletter">
          <SubscribeBox onSubscribe={handleSubscribe} />
          <img src={NewsletterBgSvg} />
        </Box> */}

        {/* <JobHolderSection data={JobHolderDummyData} /> */}
      </BottomContainer>
    </>
  );
};

export const getServerSideProps = async (ctx: NextPageContext) => {
  const { query } = ctx;
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/job/getJobById`,
    {
      params: { id: query.id },
    }
  );

  return {
    props: {
      job: data.job,
    },
  };
};

export default ApplyJobPage;
