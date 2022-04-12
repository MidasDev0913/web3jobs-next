import React, { useState } from 'react';
import {
  Link,
  Box,
  IconButton,
  Typography,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { useRouter } from 'next/router';

import {
  NavigationContainer,
  LoadingWrapper,
  CollapseIconButton,
} from './index.styles';
import { NavigationLinks } from '../../utils/constants';
import { NavigationLinkProps } from '../../interfaces';
import { NavLink } from '../NavLink';
import ArrowLeftIcon from '../../components/SVGIcons/ArrowLeftIcon_small';
import Logo from '../../assets/web3jobs_logo.svg';
import MobileLogo from '../../assets/web3jobs_logo_mobile.svg';

const Navigation = ({
  collapsed,
  setCollapsed,
}: {
  collapsed: boolean;
  setCollapsed: (arg: boolean) => void;
}) => {
  const router = useRouter();
  const theme = useTheme();
  const matchDownMd = useMediaQuery(theme.breakpoints.down('md'));
  const url = router.pathname;

  const handleCollapse = () => {
    setCollapsed(!collapsed);
  };

  const renderNavigation = () => (
    <>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        height="fit-content"
        width="calc(100% - 24px)"
        padding={collapsed ? '0 8px 0 16px' : '0px'}
        mr={collapsed ? 0 : 3}
        position="relative"
      >
        <Link href="/" className="nav-logo">
          <img src={matchDownMd ? MobileLogo : Logo} />
        </Link>
        <CollapseIconButton
          onClick={handleCollapse}
          style={{ transform: collapsed ? 'rotate(180deg)' : 'none' }}
        >
          <ArrowLeftIcon />
        </CollapseIconButton>
      </Box>
      <div className="menu-wapper">
        <ul>
          {NavigationLinks.map((link: NavigationLinkProps) => (
            <NavLink
              href={link.link || '/'}
              key={link.key}
              id={link.key}
              active={url === link.link}
              collapsed={collapsed}
            >
              <Box className="icon-wrapper">{link.icon}</Box>
              {!collapsed && (
                <span style={{ whiteSpace: 'nowrap' }}>{link.title}</span>
              )}
            </NavLink>
          ))}
        </ul>
      </div>
    </>
  );

  return (
    <NavigationContainer collapsed={collapsed}>
      <nav className="wapper">{renderNavigation()}</nav>
    </NavigationContainer>
  );
};

Navigation.displayName = 'Navigation';

export { Navigation };
