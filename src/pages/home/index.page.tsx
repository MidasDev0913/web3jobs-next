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
import { setSearchSuggestions } from '../../redux/reducers/commonReducer';
import { setFavorite } from '../../redux/reducers/jobReducer';
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
import { TJob, TJobCountyOfCity } from '../../interfaces';

type ComponentProps = {
  tags: string[];
  jobsInCities: TJobCountyOfCity[];
  jobData: any;
};

const HomePage: React.FC<ComponentProps> = ({
  tags,
  jobsInCities,
  jobData,
}) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const {
    search: searchKey,
    company,
    tags: tagsInQuery,
    city,
    page,
    isRemote,
    location,
    salary,
    position,
    goToJobs,
    favorite,
  } = router.query;
  const currentPage = Number(page || '0');
  const activeTags =
    typeof tagsInQuery === 'string'
      ? [tagsInQuery]
      : Array.isArray(tagsInQuery)
      ? tagsInQuery
      : [];

  const theme = useTheme();
  const matchDownMd = useMediaQuery(theme.breakpoints.down('md'));
  const countryNameList = getCountryNames();
  const { account, activate } = useWeb3React();
  const { userInfo } = useSelector((state: RootState) => state.auth);
  const { viewedJobs, isLoggedIn } = useSelector(
    (state: RootState) => state.auth
  );
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
    if (goToJobs === 'true') {
      goToJobBoard();
    }
  }, [goToJobs]);

  useEffect(() => {
    const newQuery: any = {
      ...router.query,
      account: userInfo.address,
    };

    for (const key in newQuery) {
      if (newQuery[key] === undefined) {
        delete newQuery[key];
      }
    }

    router.push(
      {
        pathname: '/',
        query: {
          ...newQuery,
        },
      },
      undefined,
      {
        scroll: false,
      }
    );
  }, [userInfo]);

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/getSearchSuggestions`)
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
    router.push(
      {
        pathname: '/',
        query: {
          ...router.query,
          page: 0,
          city,
        },
      },
      undefined,
      {
        scroll: false,
      }
    );
    goToJobBoard();
  };

  const handleClickTag = (tag: string) => {
    const newTags = insertItemToArray(activeTags, tag);
    router.push({
      pathname: '/',
      query: {
        ...router.query,
        page: 0,
        tags: newTags,
      },
    });
  };

  const handleClickFav = (
    e: React.MouseEvent<HTMLDivElement>,
    jobId: string
  ) => {
    e.stopPropagation();
    if (isLoggedIn) {
      dispatch(
        setFavorite({
          jobId,
          userId: account?.toLowerCase(),
          reload: () => {
            router.replace(router.asPath, undefined, {
              scroll: false,
            });
          },
        })
      );
    } else {
      setOpenConnectWalletModal(true);
    }
  };

  const handleSearch = (key: string) => {
    router.push(
      {
        pathname: '/',
        query: {
          ...router.query,
          page: 0,
          search: key,
        },
      },
      undefined,
      {
        scroll: false,
      }
    );
  };

  const goToJobBoard = () => {
    const obj = document.getElementById('job-board');
    if (typeof window !== undefined) {
      window.scrollTo({
        top: (obj?.offsetTop ?? 0) + 560,
        behavior: 'smooth',
      });
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
    router.push(
      {
        pathname: '/',
        query: {
          ...router.query,
          page: currentPage - 1,
        },
      },
      undefined,
      {
        scroll: false,
      }
    );
  };

  const handleApplyFilter = (arg: any, noScroll?: boolean) => {
    const newQuery = {
      ...router.query,
      ...arg,
      page: 0,
    };
    for (const key in newQuery) {
      if (newQuery[key] === undefined) {
        delete newQuery[key];
      }
    }

    router.push(
      {
        pathname: '/',
        query: {
          ...newQuery,
        },
      },
      undefined,
      {
        scroll: !noScroll,
      }
    );
  };

  const handleToggleExpand = (e: React.MouseEvent<HTMLDivElement>) => {
    setFilterSidebarAnchor(e.currentTarget);
  };

  const FilterTagList = React.useMemo(() => {
    const MyComp = () => (
      <>
        {(tags || []).map((tag: string, _i: number) => (
          <Box
            mx={{ xs: '2.5px', md: 1 }}
            my={{ xs: '2.5px', md: 0.5 }}
            key={_i}
          >
            <FilterTag
              text={tag}
              active={(router.query.tags || []).includes(tag)}
              onClick={() => handleClickTag(tag)}
              disabled={(router.query.tags || []).length === 2}
            />
          </Box>
        ))}
      </>
    );
    MyComp.displayName = 'FilterTagList';
    return MyComp;
  }, [tags, router.query.tags]);

  return (
    <HomePageWrapper position="relative">
      <img src={WaveBgSVG.src} className="wave-bg" loading="lazy" />
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
          component="h1"
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
          Browse {jobData?.totalJobs || 0} jobs at{' '}
          {jobData?.totalCompanies || 0} Web3 Projects
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
        {(router.query.tags || []).length > 0 && !matchDownMd && (
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
        <SearchBox onSearch={handleSearch} value={searchKey as string} />
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
            <img
              src={FilterMaskSVG.src}
              className="filter-mask"
              loading="lazy"
            />
          </Box>
          <h1>
            {searchKey &&
            !countryNameList.includes(
              makeWordsUpperCase(searchKey as string) as string
            )
              ? searchKey
              : (activeTags || []).length
              ? ((activeTags as string[]) || [])
                  .map((tag: string) => getCaptialized(tag))
                  .join(' & ')
              : company
              ? company
              : 'All'}{' '}
            Jobs
            {location
              ? ` in ${location}`
              : city
              ? ` in ${city}`
              : countryNameList.includes(
                  makeWordsUpperCase(searchKey as string) as string
                )
              ? ` in ${makeWordsUpperCase(searchKey as string)}`
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
              {jobData?.filterJobsCount || 0} Jobs found
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
                Average Salary ${jobData?.averagePrice || 0}
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
            filterSettings={{
              search: searchKey,
              company,
              isRemote: isRemote && isRemote === 'true',
              location,
              salary: Number(salary || '0'),
              position,
              city,
              favorite: favorite === 'true',
            }}
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
              filterSettings={{
                search: searchKey,
                company,
                isRemote: isRemote && isRemote === 'true',
                location,
                salary: Number(salary || '0'),
                position,
                city,
                favorite: favorite === 'true',
              }}
              setFilterSettings={handleApplyFilter}
              onSearch={handleSearch}
            />
            {(jobData?.jobs || []).length > 0 ? (
              (jobData?.jobs || []).map((job: TJob) => (
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
                <Image
                  src={EmptyIcon}
                  width={140}
                  height={127}
                  loading="lazy"
                />
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
          {(jobData?.jobs || []).length > 0 && (
            <Box display="flex" justifyContent="center" marginTop="52px">
              <Pagination
                count={Math.ceil(jobData?.filterJobsCount / JOB_PAGE_SIZE)}
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
          settings={{
            search: searchKey,
            company,
            tags: activeTags,
            isRemote: isRemote && isRemote === 'true',
            location,
            salary: Number(salary || '0'),
            position,
            favorite: favorite === 'true',
            city,
          }}
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
        cities={jobsInCities || []}
        onClick={handleClickTopCity}
      />
      <NewsletterConfirmModal
        open={openNewsletterConfirmModal}
        tags={(activeTags as string[]) || []}
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
