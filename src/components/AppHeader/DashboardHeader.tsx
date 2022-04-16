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
} from '@mui/material';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { useDispatch } from 'react-redux';
import { useWeb3React } from '@web3-react/core';
import CloseIcon from '@mui/icons-material/Close';

import {
  HeaderContainer,
  ButtonContainer,
  WalletAddressBox,
  SearchBarContainer,
} from './index.styles';
import { auth } from '../../firebase';
import { getAbbrAddress } from '../../utils/helper';
import { connect } from '../../utils/web3';
import MetamaskIcon from '../../assets/icons/metamask_icon.svg';
import { privateUrls } from '../../utils/constants';
import { injected } from '../../provider/MetamaskProvider';
import { loginWithToken, logout } from '../../redux/reducers/authReducer';
import InfoIcon from '../../components/SVGIcons/InfoIcon_italic';
import SearchIcon from '../../assets/icons/home_search_icon.svg';

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
};

const Header: React.FC<ComponentProps> = ({
  searchkey,
  onSearch,
  visibleSearchBar,
}) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { account, activate } = useWeb3React();
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
    }
  };

  useEffect(() => {
    auth.onAuthStateChanged((user: any) => {
      if (typeof window !== 'undefined') {
        //added by midas start
        const { pathname } = window.location;
        if (!user && privateUrls.includes(pathname)) {
          dispatch(logout());
          router.push('/');
        }
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

  return (
    <HeaderContainer width="100%">
      <ButtonContainer justifyContent="space-between" width="100%">
        <Box display="flex" alignItems="center" padding="0px 16px">
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
        <Typography
          color="#A3A1A1"
          fontWeight={500}
          fontSize="14px"
          className="cursor__pointer"
          position="absolute"
          ml="47px"
          mt={6}
          onClick={() => router.push('/')}
        >
          Back to landing page
        </Typography>
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
          <WalletAddressBox>
            <Image src={MetamaskIcon} width={28} height={27} />
            <Typography ml={2}>
              {getAbbrAddress(account || '', 5, 4)}
            </Typography>
          </WalletAddressBox>
        </Box>
      </ButtonContainer>
    </HeaderContainer>
  );
};

export default Header;
