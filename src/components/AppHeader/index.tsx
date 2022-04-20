import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import {
  styled,
  Box,
  useTheme,
  useMediaQuery,
  IconButton,
  ClickAwayListener,
  Typography,
} from '@mui/material';
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import axios from 'axios';
import { useAccount } from 'wagmi';

import {
  HeaderContainer,
  LogoContainer,
  ButtonContainer,
  ConnectWalletButton,
  WalletAddressBox,
} from './index.styles';
import { TMenuItem } from '../MenuItem';
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
import { maybeFixMetamaskConnection } from '../../provider/MetamaskProvider';
import JoinOptionModal from '../Modals/JoinOption';
import JoinEmployerConfirmModal from '../Modals/JoinEmployerConfirm';
import JoinJobseekerConfirmModal from '../Modals/JoinJobseekerConfirm';
import JobSeekerFailedModal from '../Modals/JobseekerFailed';
import AccountInfoPopover from '../Modals/AccountInfoPopover';
import { TJob } from '../../interfaces';
import AnnounceBar from './AnnounceBar';
import InstallMetamaskModal from '../Modals/InstallMetamask';
import useDetectMobile from '../../hooks/useDetectMobile';
import Logo from '../../assets/web3jobs_logo.svg';
import MobileLogo from '../../assets/web3jobs_logo_mobile.svg';
import { useAuth } from '../../hooks/useAuth';
import { connect } from '../../utils/web3';

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

type ComponentProps = {
  showBanner: boolean | undefined;
};

const Header: React.FC<ComponentProps> = ({ showBanner }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const pathName = router.pathname;
  const theme = useTheme();
  const matchDownMd = useMediaQuery(theme.breakpoints.down('md'));
  const { isMobile } = useDetectMobile();
  const { login: activate } = useAuth();
  const { address: account, isConnected } = useAccount();
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
  const [showAnnounceBar, setShowAnnounceBar] = useState<boolean>(!!showBanner);
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
    if (isLoggedIn && account) {
      dispatch(getViewedJobs({ account: account.toLowerCase() }));
    }
  }, [isLoggedIn]);

  useEffect(() => {
    if (isLoggedIn && account) {
      axios
        .get(
          `${process.env.NEXT_PUBLIC_API_URL}/job/${
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
      if (typeof window !== undefined && !window.ethereum) {
        window.open(
          `https://metamask.app.link/dapp/${
            process.env.NEXT_PUBLIC_ENV === 'prod' ? '' : 'staging.'
          }web3.jobs/`,
          '_blank',
          'noopener noreferrer'
        );
        return;
      }
    } else {
      if (typeof window !== undefined && !window.ethereum) {
        setOpenInstallMetamaskPopup(true);
        return;
      }
    }
    await maybeFixMetamaskConnection();
    if (isConnected) {
      dispatch(login({ openPopup: () => setOpenJoinOptionModal(true) }));
    } else {
      connect(activate)
        .then(() => {
          dispatch(login({ openPopup: () => setOpenJoinOptionModal(true) }));
        })
        .catch((err) => {
          connect(activate);
        });
    }
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

  return (
    <>
      {showAnnounceBar && (
        <AnnounceBar onClose={() => setShowAnnounceBar(false)} />
      )}
      <HeaderContainer p={{ xs: '17px 25px', md: '38px 115px 0' }}>
        <Box display="flex">
          <LogoContainer
            display={{ xs: 'flex', md: 'none' }}
            onClick={() =>
              router.push({
                pathname: '/',
                query: { goToJobs: pathName.includes('/job/') },
              })
            }
          >
            <Image src={MobileLogo} width={35} height={35} priority />
          </LogoContainer>

          <LogoContainer
            display={{ xs: 'none', md: 'flex' }}
            onClick={() =>
              router.push({
                pathname: '/',
                query: { goToJobs: pathName.includes('/job/') },
              })
            }
          >
            <Image src={Logo} width={180} height={48} priority />
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
              <ClickAwayListener onClickAway={handleCloseAccountInfoPopover}>
                <Box>
                  <HtmlTooltip
                    open={openAccountInfoPopup}
                    onClose={handleCloseAccountInfoPopover}
                    onOpen={handleOpenAccountInfoPopover}
                    placement="bottom-end"
                    enterDelay={10}
                    disableFocusListener
                    disableHoverListener
                    disableTouchListener
                    PopperProps={{
                      disablePortal: true,
                    }}
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
                    <IconButton
                      size="medium"
                      onClick={handleOpenAccountInfoPopover}
                      sx={{ backgroundColor: 'rgba(158, 158, 158, 0.25)' }}
                    >
                      <Image src={MetamaskIcon} width={28} height={27} />
                    </IconButton>
                  </HtmlTooltip>
                </Box>
              </ClickAwayListener>
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
                  <Image src={MetamaskIcon} width={28} height={27} />
                  <Typography mx={2}>
                    {getAbbrAddress(userInfo.address, 5, 4)}
                  </Typography>
                  <Image src={ArrowDownIcon} width={13} height={7} />
                </WalletAddressBox>
              </HtmlTooltip>
            </>
          ) : (
            <ConnectWalletButton
              id="header-connect-wallet-btn"
              onClick={handleConnectWallet}
            >
              <Box display={{ xs: 'hidden', md: 'block' }}>
                <ConnectWalletIcon />
              </Box>
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
