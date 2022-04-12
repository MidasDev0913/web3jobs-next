import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import {
  styled,
  Box,
  Grow,
  Paper,
  useTheme,
  useMediaQuery,
  IconButton,
} from '@mui/material';
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { useWeb3React } from '@web3-react/core';
import axios from 'axios';

import {
  HeaderContainer,
  LogoContainer,
  MenuContainer,
  ButtonContainer,
  ConnectWalletButton,
  WalletAddressBox,
  SubMenuItem,
} from './index.styles';
import { auth } from '../../firebase';
import { AppMenuItem, TMenuItem } from '../MenuItem';
import { AppButton } from '../Button';
import {
  login,
  getViewedJobs,
  loginWithToken,
} from '../../redux/reducers/authReducer';
import { RootState } from '../../redux/store';
import { getAbbrAddress } from '../../utils/helper';
import ConnectWalletIcon from '../SVGIcons/ConnectWalletIcon';
import MetamaskIcon from '../../assets/icons/metamask_icon.svg';
import ArrowDownIcon from '../../assets/icons/arrow_up_tri_icon.svg';
import { MenuPopper } from '../MenuItem/index.styles';
import { maybeFixMetamaskConnection } from '../../provider/MetamaskProvider';
import JoinOptionModal from '../Modals/JoinOption';
import JoinEmployerConfirmModal from '../Modals/JoinEmployerConfirm';
import JoinJobseekerConfirmModal from '../Modals/JoinJobseekerConfirm';
import JobSeekerFailedModal from '../Modals/JobseekerFailed';
import AccountInfoPopover from '../Modals/AccountInfoPopover';
import { TJob } from '../../interfaces';
import AnnounceBar from './AnnounceBar';
import InstallMetamaskModal from '../Modals/InstallMetamask';
import { connect } from '../../utils/web3';
import useDetectMobile from '../../hooks/useDetectMobile';
import Logo from '../../assets/web3jobs_logo.svg';
import MobileLogo from '../../assets/web3jobs_logo_mobile.svg';

const HtmlTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: 'transparent',
    padding: '4px 0',
    marginTop: 0,
  },
}));

const menus = [
  {
    text: 'Salaries',
    subMenus: [
      {
        text: 'Tech Salaries',
        link: '/tech-salaries',
      },
      {
        text: 'Non-Tech Salaries',
        link: '/nontech-salaries',
      },
    ],
  },
  {
    text: 'Learn Web3',
    link: '/learn',
  },
  {
    text: 'Highest Paid',
    subMenus: [
      {
        text: 'Tech Salaries',
        link: '/tech-salaries',
      },
      {
        text: 'Non-Tech Salaries',
        link: '/nontech-salaries',
      },
    ],
  },
];
const Header = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const pathName = router.pathname;
  const theme = useTheme();
  const matchDownMd = useMediaQuery(theme.breakpoints.down('md'));
  const { isMobile } = useDetectMobile();
  const { account, activate } = useWeb3React();
  const { isLoggedIn, userInfo } = useSelector(
    (state: RootState) => state.auth
  );
  const [openSubmenu, setOpenSubmenu] = useState<string>('');
  const [openJoinOptionModal, setOpenJoinOptionModal] =
    useState<boolean>(false);
  const [openAccountInfoPopup, setOpenAccountInfoPopup] =
    useState<boolean>(false);
  const [openJoinSuccessModal, setOpenJoinSuccessModal] =
    useState<boolean>(false);
  const [accountType, setAccountType] = useState<number>(0);
  const [openJobseekerFailedModal, setOpenJobseekerFailedModal] =
    useState<boolean>(false);
  const [latestPostJobs, setLatestPostJobs] = useState<TJob[]>([]);
  const [showAnnounceBar, setShowAnnounceBar] = useState<boolean>(false);
  const [openInstallMetamaskPopup, setOpenInstallMetamaskPopup] =
    useState<boolean>(false);

  useEffect(() => {
    const token = localStorage.getItem('custom_token');
    if (token) {
      dispatch(
        loginWithToken({
          token,
          connect: () => connect(activate),
        })
      );
    }
  }, []);

  useEffect(() => {
    if (pathName === '/' || pathName === '/post-job') {
      setShowAnnounceBar(true);
    } else {
      setShowAnnounceBar(false);
    }
  }, [pathName]);

  useEffect(() => {
    if (isLoggedIn && account) {
      dispatch(getViewedJobs({ account: account.toLowerCase() }));
    }
  }, [isLoggedIn]);

  useEffect(() => {
    if (isLoggedIn && account) {
      axios
        .get(
          `${process.env.REACT_APP_API_URL}/job/${
            userInfo.type === 0
              ? 'getPostedJobsByCreator'
              : 'getFavoriteJobsByUser'
          }`,
          {
            params: {
              userId: account.toLowerCase(),
              pageSize: 3,
              limit: 3,
            },
          }
        )
        .then(({ data }) => {
          if (data.success) {
            setLatestPostJobs(data.jobs);
          }
        });
    }
  }, [isLoggedIn, account, userInfo]);

  const handleGoToPage = (url: string | undefined) => {
    if (url) {
      router.push(url);
    }
  };

  const handleConnectWallet = async () => {
    if (isMobile) {
      if (typeof window !== undefined) {
        window.open(
          `dapp://${
            process.env.REACT_APP_ENV === 'prod' ? '' : 'staging.'
          }web3.jobs`
        );
      }
    } else {
      if (typeof window !== undefined && !window.ethereum) {
        setOpenInstallMetamaskPopup(true);
        return;
      }
    }
    await maybeFixMetamaskConnection();
    connect(activate)
      .then(() => {
        dispatch(login({ openPopup: () => setOpenJoinOptionModal(true) }));
      })
      .catch((err) => {
        connect(activate);
      });
  };

  const handleOpenSubmenu = (menu: TMenuItem | null) => {
    setOpenSubmenu(menu?.text || '');
  };

  const handleConfirmJoinOption = (type: number) => {
    setAccountType(type);
    dispatch(
      login({
        onClose: () => {
          setOpenJoinOptionModal(false);
          setOpenJoinSuccessModal(true);
        },
        type,
        openPopup: () => setOpenJoinOptionModal(true),
      })
    );
  };

  const handlePostJob = () => {
    if (isLoggedIn && userInfo?.type === 1) {
      setOpenJobseekerFailedModal(true);
    } else {
      handleGoToPage('/post-job');
    }
  };

  const handleOpenAccountInfoPopover = () => {
    setOpenAccountInfoPopup(true);
  };

  const handleCloseAccountInfoPopover = () => {
    setOpenAccountInfoPopup(false);
  };

  const url = router.pathname;

  return (
    <>
      {showAnnounceBar && !matchDownMd && (
        <AnnounceBar onClose={() => setShowAnnounceBar(false)} />
      )}
      <HeaderContainer p={{ xs: '17px 25px', md: '38px 115px 0' }}>
        <Box display="flex">
          <LogoContainer
            onClick={() =>
              router.push({
                pathname: '/',
                query: { goToJobs: url.includes('/job/') },
              })
            }
          >
            <Image
              src={matchDownMd ? MobileLogo : Logo}
              width={matchDownMd ? 35 : 180}
              height={matchDownMd ? 35 : 48}
            />
          </LogoContainer>
          {/* <MenuContainer>
            {menus.map((menu: TMenuItem, _i: number) => (
            <Box key={_i}>
              <AppMenuItem
                item={menu}
                handleGoToPage={handleGoToPage}
                openSubmenu={openSubmenu === menu.text}
                setOpenSubmenu={handleOpenSubmenu}
              />
            </Box>
          ))}
          </MenuContainer> */}
        </Box>
        <ButtonContainer alignItems="center">
          {/* <Box mr={3}>
          <a className="sponsorship">Sponsorship</a>
        </Box> */}
          <Box mr={{ xs: 1, md: 3 }}>
            <AppButton
              customVariant="secondary"
              onClick={handlePostJob}
              sx={{
                padding: { xs: '6px 10px', md: '15px' },
                fontSize: { xs: 13, md: 15 },
              }}
            >
              Post Job
            </AppButton>
          </Box>
          {matchDownMd ? (
            isLoggedIn ? (
              <Box>
                <IconButton
                  size="medium"
                  sx={{ backgroundColor: 'rgba(158, 158, 158, 0.25)' }}
                >
                  <Image src={MetamaskIcon} width={28} height={27} />
                </IconButton>
              </Box>
            ) : (
              <ConnectWalletButton
                id="header-connect-wallet-btn"
                onClick={handleConnectWallet}
              >
                Connect Wallet
              </ConnectWalletButton>
            )
          ) : isLoggedIn ? (
            <>
              <HtmlTooltip
                open={openAccountInfoPopup}
                onClose={handleCloseAccountInfoPopover}
                onOpen={handleOpenAccountInfoPopover}
                placement="bottom-end"
                enterDelay={10}
                title={
                  <React.Fragment>
                    <AccountInfoPopover
                      isEmployer={userInfo.type === 0}
                      account={account || ''}
                      jobs={latestPostJobs}
                      onClose={handleCloseAccountInfoPopover}
                    />
                  </React.Fragment>
                }
              >
                <WalletAddressBox>
                  <img src={MetamaskIcon.src} />
                  {getAbbrAddress(userInfo.address, 5, 4)}
                  <Image src={ArrowDownIcon} width={13} height={7} />
                </WalletAddressBox>
              </HtmlTooltip>
            </>
          ) : (
            <ConnectWalletButton
              id="header-connect-wallet-btn"
              onClick={handleConnectWallet}
            >
              <ConnectWalletIcon />
              Connect Wallet
            </ConnectWalletButton>
          )}
        </ButtonContainer>
        <JoinOptionModal
          open={openJoinOptionModal}
          onClose={() => setOpenJoinOptionModal(false)}
          onConfirm={handleConfirmJoinOption}
        />
        <JoinEmployerConfirmModal
          open={accountType === 0 && openJoinSuccessModal}
          onClose={() => setOpenJoinSuccessModal(false)}
          onConfirm={() => {
            setOpenJoinSuccessModal(false);
            router.push('/');
          }}
        />
        <JoinJobseekerConfirmModal
          open={accountType === 1 && openJoinSuccessModal}
          onClose={() => setOpenJoinSuccessModal(false)}
          onConfirm={() => {
            setOpenJoinSuccessModal(false);
            router.push('/');
          }}
        />
        <JobSeekerFailedModal
          open={openJobseekerFailedModal}
          onClose={() => setOpenJobseekerFailedModal(false)}
          onConfirm={() => {
            setOpenJobseekerFailedModal(false);
            router.push('/');
          }}
        />
        <InstallMetamaskModal
          open={openInstallMetamaskPopup}
          onClose={() => setOpenInstallMetamaskPopup(false)}
        />
      </HeaderContainer>
    </>
  );
};

export default Header;
