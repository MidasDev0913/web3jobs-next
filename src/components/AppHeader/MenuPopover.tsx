import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, styled, Stack, Typography } from '@mui/material';

import { NavigationLinkProps } from '../../interfaces';
import { useSelector } from 'react-redux';
import MetamaskIcon from '../../assets/icons/metamask_icon.svg';
import { RootState } from '../../redux/store';
import { getAbbrAddress } from '../../utils/helper';
import { NavigationLinks } from '../../utils/constants';
import { NavLink } from '../NavLink';

const ContainerBox = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  width: 209,
  background: '#10101E',
  borderRadius: 5,
  border: '0.5px solid rgba(25, 159, 217, 0.28)',

  '& .info-item--arrow-icon': {
    '&:hover': {
      '& svg': {
        transform: 'scale(1.2)',
      },
    },
  },

  '& .wapper': {
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    boxSizing: 'border-box',
    paddingTop: 12,
    paddingBottom: 54,

    '& .menu-wapper': {
      height: '100%',
      overflowY: 'hidden',
      overflowX: 'hidden',
      scrollbarWidth: 'none' /* Firefox */,
      width: '100%',

      '& > ul': {
        minHeight: '100%',
        margin: 0,

        '& li > div': {
          padding: '6px 20px',
          '& span': {
            fontSize: 12,
          },
        },
      },
    },
    '& .icon-wrapper': {
      width: 21,
      minWidth: 21,
      height: 21,
      '& svg': {
        width: 9,
        height: 9,
      },
    },

    '& img': {
      width: '74px',
      height: '32px',
      marginTop: '14px',
      marginLeft: '31px',
      marginBottom: '21px',
    },
  },
});

const MenuPopover = ({ onClose }: { onClose: () => void }) => {
  const { userInfo } = useSelector((state: RootState) => state.auth);

  const url = window.location.pathname;

  return (
    <ContainerBox>
      <Stack
        direction="row"
        alignItems="center"
        width="100%"
        padding="20px 20px 16px 15px"
        boxSizing="border-box"
        borderBottom="1px solid rgba(25, 159, 217, 0.28)"
      >
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          width={21}
          height={21}
          borderRadius="21px"
          border="0.5px solid #199FD9"
          bgcolor="#181824"
        >
          <img src={MetamaskIcon} style={{ width: '9px', height: '9px' }} />
        </Box>
        <Typography ml={1.5} fontSize={12} lineHeight={1} fontWeight={500}>
          {getAbbrAddress(userInfo.address, 5, 4)}
        </Typography>
      </Stack>
      <Stack>
        <Box className="wapper">
          <div className="menu-wapper">
            <ul>
              {NavigationLinks.map((link: NavigationLinkProps) => (
                <NavLink
                  href={link.link || '/'}
                  key={link.key}
                  id={link.key}
                  active={url === link.link}
                >
                  <Box className="icon-wrapper">{link.icon}</Box>
                  <span style={{ whiteSpace: 'nowrap' }}>{link.title}</span>
                </NavLink>
              ))}
            </ul>
          </div>
        </Box>
      </Stack>
    </ContainerBox>
  );
};

export default MenuPopover;
