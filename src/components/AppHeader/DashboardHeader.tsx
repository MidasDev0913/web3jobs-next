import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Tooltip,
  styled,
  TooltipProps,
  tooltipClasses,
  TextField,
  InputAdornment,
  useTheme,
  useMediaQuery,
  IconButton,
  ClickAwayListener,
} from '@mui/material';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { useDispatch } from 'react-redux';
import { useAccount } from 'wagmi';
import CloseIcon from '@mui/icons-material/Close';

import {
  HeaderContainer,
  ButtonContainer,
  WalletAddressBox,
  SearchBarContainer,
  LogoContainer,
} from './index.styles';
import { auth } from '../../firebase';
import { getAbbrAddress } from '../../utils/helper';
import { connect } from '../../utils/web3';
import MetamaskIcon from '../../assets/icons/metamask_icon.svg';
import MenuIcon from '../../assets/icons/menu.svg';
import { privateUrls } from '../../utils/constants';
import { loginWithToken, logout } from '../../redux/reducers/authReducer';
import InfoIcon from '../../components/SVGIcons/InfoIcon_italic';
import SearchIcon from '../../assets/icons/home_search_icon.svg';
import MobileLogo from '../../assets/web3jobs_logo_mobile.svg';
import MenuPopover from './MenuPopover';
import { useAuth } from '../../hooks/useAuth';

const HtmlTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: '#000000',
    color: '#A3A1A1',
    maxWidth: 601,
    padding: '7px 21.5px',
    borderRadius: 7,
  },

  [`& .${tooltipClasses.arrow}:before`]: {
    backgroundColor: '#131322',
  },
}));

const TooltipIcon = styled(Box)`
  &:hover {
    & path {
      fill: #fff;
    }
  }
`;

type ComponentProps = {
  searchkey?: string;
  onSearch?: (arg: string) => void;
  visibleSearchBar?: boolean;
  hiddenBackLink?: boolean;
};

const MenuHtmlTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: 'transparent',
    padding: '4px 0',
    marginTop: 0,
  },
}));

const Header: React.FC<ComponentProps> = ({
  searchkey,
  onSearch,
  visibleSearchBar,
  hiddenBackLink,
}) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const theme = useTheme();
  const matchDownMd = useMediaQuery(theme.breakpoints.down('md'));
  const { address: account } = useAccount();
  const { login: activate } = useAuth();
  const [val, setValue] = useState<string>('');
  const [openMenuPopover, setOpenMenuPopover] = useState<boolean>(false);

  useEffect(() => {
    setValue(searchkey || '');
  }, [searchkey]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.keyCode === 13 && onSearch) {
      onSearch(val);
    }
  };

  useEffect(() => {
    auth.onAuthStateChanged((user: any) => {
      //   if (typeof window !== 'undefined') {
      //     const { pathname } = window.location;
      //     if (!user && privateUrls.includes(pathname)) {
      //       dispatch(logout());
      //       router.push('/');
      //     }
      //   }
      const pathname = router.pathname;
      if (!user && privateUrls.includes(pathname)) {
        dispatch(logout());
        router.push('/');
      }
    });
  }, [auth]);

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

  const handleGoToMain = () => {
    router.push('/');
  };

  const handleOpenMenuPopover = () => {
    setOpenMenuPopover(true);
  };

  const handleCloseMenuPopover = () => {
    setOpenMenuPopover(false);
  };

  return (
    <HeaderContainer width="100%">
      <ButtonContainer justifyContent="space-between" width="100%" pr={2}>
        {matchDownMd ? (
          <LogoContainer
            onClick={() =>
              router.push({
                pathname: '/',
              })
            }
          >
            <Image src={MobileLogo} width={35} height={35} />
          </LogoContainer>
        ) : (
          <Box display="flex" alignItems="center">
            <Box
              bgcolor="#199FD9"
              padding="3px 25px 4px 14px"
              mr="6px"
              sx={{ clipPath: 'polygon(0 0, 85% 0%, 100% 100%, 0 100%)' }}
            >
              <Typography>Beta</Typography>
            </Box>

            <HtmlTooltip
              arrow
              placement="right-end"
              title={
                <React.Fragment>
                  <Typography fontSize={12} lineHeight="18px">
                    Welcome{' '}
                    <strong>
                      {getAbbrAddress(account?.toLowerCase() ?? '', 7, 7)}
                    </strong>{' '}
                    to your dashboard.
                    <br />
                    <br />
                    The dashboard is in beta phase and is currently being
                    developed. You can see your job statistics, edit job offers,
                    take job offers offline and download your invoices in your
                    dashboard.
                  </Typography>
                </React.Fragment>
              }
            >
              <TooltipIcon>
                <InfoIcon />
              </TooltipIcon>
            </HtmlTooltip>
          </Box>
        )}
        {!hiddenBackLink && (
          <Typography
            color="#A3A1A1"
            fontWeight={500}
            fontSize="14px"
            className="cursor__pointer"
            position="absolute"
            ml={{ xs: 0, md: '47px' }}
            mt={{ xs: 7, md: 7 }}
            onClick={() => router.push('/')}
          >
            Back to landing page
          </Typography>
        )}
        <Box display="flex" alignItems="center">
          {visibleSearchBar && (
            <SearchBarContainer mr="35px">
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
          )}
          {matchDownMd ? (
            <Box display="flex" alignItems="center">
              <IconButton
                size="medium"
                sx={{ backgroundColor: 'rgba(158, 158, 158, 0.25)' }}
              >
                <Image src={MetamaskIcon} width={28} height={27} />
              </IconButton>
              <ClickAwayListener onClickAway={handleCloseMenuPopover}>
                <div>
                  <MenuHtmlTooltip
                    open={openMenuPopover}
                    onClose={handleCloseMenuPopover}
                    onOpen={handleOpenMenuPopover}
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
                        <MenuPopover onClose={handleCloseMenuPopover} />
                      </React.Fragment>
                    }
                  >
                    <Box ml="21px" onClick={handleOpenMenuPopover}>
                      <Image src={MenuIcon} width={28} height={27} />
                    </Box>
                  </MenuHtmlTooltip>
                </div>
              </ClickAwayListener>
            </Box>
          ) : (
            <WalletAddressBox>
              <Image src={MetamaskIcon} width={28} height={27} />
              <Typography ml={2}>
                {getAbbrAddress(account || '', 5, 4)}
              </Typography>
            </WalletAddressBox>
          )}
        </Box>
      </ButtonContainer>
    </HeaderContainer>
  );
};

export default Header;
