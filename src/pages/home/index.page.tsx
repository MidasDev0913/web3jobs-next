import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import Image from 'next/image';
import {
  Box,
  Pagination,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
  Drawer,
} from '@mui/material';
import { useWeb3React } from '@web3-react/core';
import LazyLoad from 'react-lazyload';
import axios from 'axios';

import { HomePageWrapper } from './index.styles';
import {
  insertItemToArray,
  getCaptialized,
  getCountryNames,
  makeWordsUpperCase,
} from '../../utils/helper';
import { JOB_PAGE_SIZE, TNewsLetterDuration } from '../../utils/constants';
import { RootState } from '../../redux/store';
import {
  getTags,
  setFilterSettings,
  setSearchSuggestions,
} from '../../redux/reducers/commonReducer';
import {
  getJobs,
  setFavorite,
  getJobCountOfCities,
} from '../../redux/reducers/jobReducer';
import SearchBox from '../../components/SearchBox';
import FilterTag from '../../components/FilterTag';
import JobItem from '../../components/JobItem';
import TopWeb3CitiesSection from '../../components/TopWeb3CitiesSection';
import FilterBox from '../../components/FilterBox';
import ConnectWalletModal from '../../components/Modals/ConnectWalletConfirm';
import FilterSidebar from './FilterSidebar.page';
import EnjoyFeatureSection from '../../components/EnjoyFeatureSection';
import MoneyIcon from '../../components/SVGIcons/MoneyIcon';
import FilterIcon from '../../components/SVGIcons/FilterIcon';
import FilterBar from '../../components/FilterBar';
import LottieAnimation from '../../components/Animation';
import NewsletterConfirmModal from '../../components/Modals/NewletterConfirm';

import JobItemSkeleton from '../../components/JobItem/skeleton';
import WaveBgSVG from '../../assets/images/home_wave.svg';
import FilterMaskSVG from '../../assets/images/filter_mask.svg';
import upperArrowAnimationData from '../../assets/lotties/upper_arrow.json';
// import NewsletterBgSvg from '../../assets/images/newsletter-bg.svg';
import EmptyIcon from '../../assets/images/home-empty-icon.svg';

import { login } from '../../redux/reducers/authReducer';
import { FilterButton } from '../../components/FilterBox/index.styles';
import { connect } from '../../utils/web3';

const HomePage = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  // const [params] : any = router.query;
  interface paramsType {
    [key: string]: string
  }
  const params: paramsType = router.query as paramsType;
  // const { state } : any = router.asPath;
  const { state }: any = router.pathname;
  const theme = useTheme();
  const matchDownMd = useMediaQuery(theme.breakpoints.down('md'));
  const countryNameList = getCountryNames();
  // const company = params.get('company');
  const company = params.company;
  const { goToJobs }: { goToJobs: boolean } = (state as any) ?? {
    goToJobs: false,
  };
  const { account, activate } = useWeb3React();
  const { tags, filterSettings } = useSelector(
    (state: RootState) => state.common
  );
  const { userInfo } = useSelector((state: RootState) => state.auth);
  const { viewedJobs, isLoggedIn } = useSelector(
    (state: RootState) => state.auth
  );
  const { jobs, jobData, fetchLoading, jobCountOfCities } = useSelector(
    (state: RootState) => state.job
  );
  const [page, setPage] = useState<number>(0);
  const [filterSidebarAnchor, setFilterSidebarAnchor] = useState<any>(null);
  const [openNewsletterConfirmModal, setOpenNewsletterConfirmModal] =
    useState<boolean>(false);
  const [openConnectWalletModal, setOpenConnectWalletModal] =
    useState<boolean>(false);

  const handleScroll = () => {
    const filterBarObj = document.getElementById('home-filter-bar');
    const filterBoxObj = document.getElementById('job-list');
    const filterBoxY = filterBoxObj?.offsetTop;
    if (typeof window !== undefined) {
      const scrollY = window.pageYOffset;

      if (filterBarObj !== undefined && filterBoxY) {
        if (scrollY > filterBoxY + 680) {
          filterBarObj?.style.setProperty('opacity', '1');
          filterBarObj?.style.setProperty('top', '0px');
        } else {
          filterBarObj?.style.setProperty('opacity', '0');
          filterBarObj?.style.setProperty('top', '-100px');
        }
      }

    }
  };

  useEffect(() => {
    window?.addEventListener('scroll', handleScroll);

    return () => {
      window?.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    if (goToJobs) {
      goToJobBoard();
    }
  }, [goToJobs]);

  useEffect(() => {
    dispatch(getTags());
    dispatch(getJobCountOfCities());

    axios
      .get(`${process.env.REACT_APP_API_URL}/getSearchSuggestions`)
      .then(({ data }) => {
        if (data.success) {
          dispatch(
            setSearchSuggestions([
              ...new Set([...data.data, ...countryNameList]),
            ])
          );
        }
      });
  }, [dispatch]);

  useEffect(() => {
    if (company || (!company && filterSettings.company)) {
      goToJobBoard();
      dispatch(
        setFilterSettings({
          company,
        })
      );
    }
  }, [company]);

  useEffect(() => {
    dispatch(
      getJobs({
        search:
          (filterSettings.searchKey || '').toLowerCase() === 'united states'
            ? 'USA'
            : (filterSettings.searchKey || '').toLowerCase() ===
              'united kingdom'
              ? 'UK'
              : filterSettings.searchKey,
        page: page,
        pageSize: JOB_PAGE_SIZE,
        tags: filterSettings.activeTags || [],
        userId: account?.toLowerCase(),
        ...filterSettings,
        position:
          filterSettings.position === 'all' ? '' : filterSettings.position,
        salary: (filterSettings.salary || 0) * 1000,
      })
    );
  }, [filterSettings, page]);

  const handleConnectWallet = (onClose?: () => void) => {
    connect(activate)
      .then(() => {
        dispatch(login({ onClose }));
      })
      .catch((err) => {
        connect(activate);
      });
  };

  const handleClickTopCity = (city: string) => {
    goToJobBoard();
    setPage(0);
    dispatch(
      setFilterSettings({
        city,
      })
    );
  };

  const handleClickTag = (tag: string) => {
    const tags = [...(filterSettings.activeTags || [])];
    setPage(0);
    dispatch(
      setFilterSettings({
        ...filterSettings,
        activeTags: insertItemToArray(tags, tag),
      })
    );
  };

  const handleClickFav = (
    e: React.MouseEvent<HTMLDivElement>,
    jobId: string
  ) => {
    e.stopPropagation();
    if (isLoggedIn) {
      dispatch(setFavorite({ jobId, userId: account?.toLowerCase() }));
    } else {
      setOpenConnectWalletModal(true);
    }
  };

  const handleSearch = (key: string) => {
    goToJobBoard();
    setPage(0);
    dispatch(
      setFilterSettings({
        searchKey: key,
      })
    );
  };

  const goToJobBoard = () => {
    const obj = document.getElementById('job-board');
    if (obj?.offsetTop) {
      if (typeof window !== undefined) {

        window.scrollTo({
          top: (obj?.offsetTop ?? 0) + 560,
          behavior: 'smooth',
        });
      }
    } else {
      setTimeout(() => {
        goToJobBoard();
      }, 1000);
    }
  };

  const handleSubscribe = (
    duration: TNewsLetterDuration,
    email: string,
    country: string,
    isRemote: boolean,
    tags: string[]
  ) => {
    console.log('subscribe... ', duration, email, country, isRemote, tags);
  };

  const handleChangePage = (e: any, value: number) => {
    goToJobBoard();
    setPage(value - 1);
  };

  const handleApplyFilter = (arg: any, noScroll?: boolean) => {
    if (!noScroll) {
      goToJobBoard();
    }

    setPage(0);
    dispatch(setFilterSettings(arg));
  };

  const handleToggleExpand = (e: React.MouseEvent<HTMLDivElement>) => {
    setFilterSidebarAnchor(e.currentTarget);
  };

  const FilterTagList = React.useMemo(() => {
    const MyComp = () => (
      <>
        {tags.map((tag: string, _i: number) => (
          <Box
            mx={{ xs: '2.5px', md: 1 }}
            my={{ xs: '2.5px', md: 0.5 }}
            key={_i}
          >
            <FilterTag
              text={tag}
              active={(filterSettings.activeTags || []).includes(tag)}
              onClick={() => handleClickTag(tag)}
              disabled={(filterSettings.activeTags || []).length === 2}
            />
          </Box>
        ))}
      </>
    );
    MyComp.displayName = 'FilterTagList';
    return MyComp;
  }, [tags, filterSettings]);


  return (
    <HomePageWrapper position="relative">
      <LazyLoad once>
        <img src={WaveBgSVG.src} className="wave-bg" loading="lazy" />
      </LazyLoad>
      {/* <LottieAnimation
        url={HomeWaveData}
        loop={true}
        speed={0.3}
        style={{
          width: '100%',
          position: 'absolute',
          opacity: 0.1,
        }}
      /> */}
      {/* <iframe src="https://public.tableau.com/views/public_exercise/Dashboard1?:showVizHome=no&:embed=true"
 width="645" height="955"></iframe> */}
      <Box
        className="title"
        id="landing-page-title"
        width={{ xs: '100%', md: 862 }}
      >
        <Typography
          fontSize={{ xs: 35, md: 50 }}
          lineHeight={1.5}
          letterSpacing="0.03em"
          fontWeight={700}
          textAlign="center"
          px="37px"
        >
          Web3 Jobs all over the <span style={{ color: '#199FD9' }}>World</span>
        </Typography>
        <Typography
          fontSize={{ xs: 15, md: 20 }}
          lineHeight={1.5}
          textAlign="center"
          display="block"
          mt={4}
          px={9}
        >
          Browse {jobData.totalJobsCount} jobs in Web3 at{' '}
          {jobData.totalProjectCount} Web3 Projects
        </Typography>
      </Box>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexWrap="wrap"
        mt={{ xs: 5.5, md: 5 }}
        px={{ xs: 3, md: 0 }}
        width={{ xs: '100%', md: 1000 }}
        position="relative"
        boxSizing="border-box"
      >
        {(filterSettings.activeTags || []).length > 0 && !matchDownMd && (
          <LazyLoad height={158} once>
            <LottieAnimation
              width="158"
              height="158"
              url={upperArrowAnimationData}
              loop={true}
              style={{
                position: 'absolute',
                left: -150,
                cursor: 'pointer',
              }}
              onClick={() => goToJobBoard()}
            />
          </LazyLoad>
        )}
        <FilterTagList />
      </Box>
      <Box
        height="1px"
        width={373}
        bgcolor="#199FD9"
        mt={3}
        display={{ xs: 'none', md: 'block' }}
      />
      <Box display="flex" flexDirection="column" alignItems="center" mt="20px">
        <SearchBox onSearch={handleSearch} value={filterSettings.searchKey} />
      </Box>
      <Box
        height="1px"
        width={200}
        bgcolor="#199FD9"
        mt={2.2}
        display={{ xs: 'block', md: 'none' }}
      />

      <Box width="100%" position="relative">
        <Box className="sub-title" id="job-board" mt={{ xs: 7, md: 16 }}>
          <Box>
            <LazyLoad once>
              <img src={FilterMaskSVG.src} className="filter-mask" loading="lazy" />
            </LazyLoad>
          </Box>
          <h1>
            {filterSettings.searchKey &&
              !countryNameList.includes(
                makeWordsUpperCase(filterSettings.searchKey) as string
              )
              ? filterSettings.searchKey
              : (filterSettings.activeTags || []).length
                ? (filterSettings.activeTags || [])
                  .map((tag: string) => getCaptialized(tag))
                  .join(' & ')
                : filterSettings.company
                  ? filterSettings.company
                  : 'All'}{' '}
            Jobs
            {filterSettings.location
              ? ` in ${filterSettings.location}`
              : filterSettings.city
                ? ` in ${filterSettings.city}`
                : countryNameList.includes(
                  makeWordsUpperCase(filterSettings.searchKey) as string
                )
                  ? ` in ${makeWordsUpperCase(filterSettings.searchKey)}`
                  : ''}
            {/* <Box ml={3}>
            <NewsletterButton
              onClick={() => setOpenNewsletterConfirmModal(true)}
            >
              <MailIcon />
            </NewsletterButton>
          </Box> */}
          </h1>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            flexDirection={{ xs: 'column', md: 'row' }}
          >
            <Typography
              fontSize={{ xs: 15, md: 20 }}
              lineHeight={1}
              textAlign="center"
              mt={{ xs: '16px', md: '27px' }}
            >
              {jobData.filterJobsCount || 0} Jobs found
            </Typography>
            <Box display="flex" alignItems="center" ml={{ xs: 0, md: 11 }}>
              <Box mt={{ xs: '10px', md: '30px' }} mr={1}>
                <MoneyIcon />
              </Box>
              <Typography
                fontSize={{ xs: 15, md: 20 }}
                lineHeight={1}
                textAlign="center"
                mt={{ xs: '10px', md: '27px' }}
              >
                Average Salary ${jobData.averagePrice || 0}
              </Typography>
            </Box>
          </Box>
        </Box>
        <Box
          padding={{ xs: '0 15px', md: '0 85px' }}
          marginTop="33px"
          width="100%"
          style={{ boxSizing: 'border-box' }}
        >
          <FilterBox
            account={account}
            filterSettings={filterSettings}
            setFilterSettings={(v) => handleApplyFilter(v, true)}
            handleConnectWallet={handleConnectWallet}
          />
        </Box>
        <Box
          width="100%"
          marginTop="33px"
          padding={{ xs: '0 15px', md: '0 85px' }}
          style={{ boxSizing: 'border-box' }}
        >
          <Box position="relative" id="job-list">
            <FilterBar
              filterSettings={filterSettings}
              setFilterSettings={handleApplyFilter}
              onSearch={handleSearch}
            />
            {fetchLoading ? (
              new Array(4)
                .fill(0)
                .map((item, _i) => <JobItemSkeleton key={_i} />)
            ) : jobs.length > 0 ? (
              jobs.map((job) => (
                <Box key={job.id} marginTop="5px">
                  <JobItem
                    job={job}
                    userId={userInfo.address?.toLowerCase()}
                    onClickFav={(e) => handleClickFav(e, job.id as string)}
                    viewed={viewedJobs.includes(job.id as string)}
                  />
                </Box>
              ))
            ) : (
              <Stack alignItems="center">
                <LazyLoad once>
                <Image
                    src={EmptyIcon}
                    width={140}
                    height={127}
                    loading="lazy"
                  />
                  {/* <img
                    src={EmptyIcon}
                    width={140}
                    height={127}
                    loading="lazy"
                  /> */}
                </LazyLoad>
                <Typography
                  fontSize={{ xs: 14, md: 20 }}
                  lineHeight={1.5}
                  mt={{ xs: 2, md: 3.5 }}
                >
                  We’re sorry :( we couldn’t find results for your search
                </Typography>
                <Typography
                  fontSize={{ xs: 14, md: 20 }}
                  lineHeight={1.5}
                  mt={{ xs: 2, md: 3.5 }}
                  textAlign="center"
                >
                  Suggestions: <br />
                  <br />
                  Check your spelling Try using fewer tags, different, or more
                  general keywords.
                </Typography>
              </Stack>
            )}
          </Box>
          {jobs.length > 0 && (
            <Box display="flex" justifyContent="center" marginTop="52px">
              <Pagination
                count={Math.ceil(jobData.filterJobsCount / JOB_PAGE_SIZE)}
                variant="outlined"
                shape="rounded"
                siblingCount={0}
                boundaryCount={0}
                onChange={handleChangePage}
              />
            </Box>
          )}
        </Box>
        <Box
          mt="18px"
          mr="10px"
          justifyContent="flex-end"
          position="sticky"
          bottom="74px"
          zIndex={10}
          onClick={handleToggleExpand}
          display={{ xs: 'flex', md: 'none' }}
        >
          <FilterButton>
            <FilterIcon />
          </FilterButton>
        </Box>
      </Box>
      <Drawer
        anchor={'right'}
        open={Boolean(filterSidebarAnchor)}
        onClose={() => setFilterSidebarAnchor(null)}
      >
        <FilterSidebar
          onSearch={handleApplyFilter}
          onClose={() => setFilterSidebarAnchor(null)}
          settings={filterSettings}
        />
      </Drawer>
      {/* <Box marginTop="86px" className="home-newsletter">
        <SubscribeBox onSubscribe={handleSubscribe} />
        <img src={NewsletterBgSvg} />
      </Box> */}
      {/* <JobHolderSection data={JobHolderDummyData} /> */}
      <EnjoyFeatureSection
        onHireTalent={() => router.push('/post-job')}
        onGetJob={() => goToJobBoard()}
      />
      <TopWeb3CitiesSection
        cities={jobCountOfCities}
        onClick={handleClickTopCity}
      />
      <NewsletterConfirmModal
        open={openNewsletterConfirmModal}
        tags={filterSettings.activeTags || []}
        onClose={() => setOpenNewsletterConfirmModal(false)}
        onConfirm={handleSubscribe}
      />
      <ConnectWalletModal
        open={openConnectWalletModal}
        onClose={() => setOpenConnectWalletModal(false)}
      />
    </HomePageWrapper>
  );
};

export default HomePage;
