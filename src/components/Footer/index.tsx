import React from 'react';
import Image from 'next/image';
import { Typography, useTheme, useMediaQuery, Box } from '@mui/material';

import { FooterContainer, UpButton } from './index.styles';
import UpArrowIcon from '../SVGIcons/UpArrowWhite';
import Logo from '../../assets/web3jobs_logo.svg';
import MobileLogo from '../../assets/web3jobs_logo_mobile.svg';
import TwitterIcon from '../../assets/icons/twitter.svg';

const Footer = () => {
  const theme = useTheme();
  const matchDownMd = useMediaQuery(theme.breakpoints.down('md'));
  return (
    <FooterContainer
      flexDirection={{ xs: 'column', md: 'row' }}
      padding={{ xs: '13px 37px', md: '11px 77px' }}
    >
      <Image
        src={matchDownMd ? MobileLogo : Logo}
        width={matchDownMd ? 35 : 180}
        height={matchDownMd ? 35 : 48}
      />
      <Box display="flex" alignItems="center" mt={{ xs: '10px', md: 0 }}>
        <Image
          src={TwitterIcon}
          width={matchDownMd ? 13 : 15}
          height={matchDownMd ? 13 : 15}
        />
        <Typography
          color="#C4C4C4"
          fontSize={{ xs: 13, md: 15 }}
          lineHeight={1}
        >
          @yourweb3jobs
        </Typography>
      </Box>
      <UpButton
        sx={{ display: { xs: 'none', md: 'block' } }}
        onClick={() => {
          if (typeof window !== undefined) {
            window.scrollTo({
              top: 0,
              behavior: 'smooth',
            });
          }
        }}
      >
        <UpArrowIcon />
      </UpButton>
    </FooterContainer>
  );
};

export default Footer;
