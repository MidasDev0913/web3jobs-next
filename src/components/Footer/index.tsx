import React from 'react';
import Image from 'next/image';
import { Typography, useTheme, useMediaQuery, Box, Link } from '@mui/material';

import { FooterContainer, UpButton } from './index.styles';
import UpArrowIcon from '../SVGIcons/UpArrowWhite';
import Logo from '../../assets/web3jobs_logo.svg';
import MobileLogo from '../../assets/web3jobs_logo_mobile.svg';
import TwitterIcon from '../../assets/icons/twitter.svg';
import SupportIcon from '../../assets/icons/support.svg';

const Footer = () => {
  const theme = useTheme();
  const matchDownMd = useMediaQuery(theme.breakpoints.down('md'));
  return (
    <FooterContainer
      flexDirection={{ xs: 'column', md: 'row' }}
      padding={{ xs: '13px 37px', md: '11px 77px' }}
    >
      {matchDownMd ? (
        <Image src={MobileLogo} width={35} height={35} />
      ) : (
        <Image src={Logo} width={180} height={48} />
      )}
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
          ml={1}
        >
          @yourweb3jobs
        </Typography>
      </Box>
      <Box display="flex" alignItems="center">
        <Box display="flex" alignItems="center" mt={{ xs: 1.5, md: 0 }}>
          <Image
            src={SupportIcon}
            width={matchDownMd ? 15 : 25}
            height={matchDownMd ? 14 : 22}
          />
          <Link
            color="#fff"
            fontSize={{ xs: 12, md: 15 }}
            lineHeight={1}
            fontWeight={300}
            ml={1}
            sx={{ textDecoration: 'none' }}
            href="mailto:support@web3.jobs"
          >
            support@web3.jobs
          </Link>
        </Box>
        <UpButton
          sx={{ display: { xs: 'none', md: 'block' }, marginLeft: '21px' }}
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
      </Box>
    </FooterContainer>
  );
};

export default Footer;
