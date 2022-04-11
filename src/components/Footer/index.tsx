import React from 'react';
import { Box, Link, Typography } from '@mui/material';

import { FooterContainer, UpButton } from './index.styles';
import UpArrowIcon from '../SVGIcons/UpArrowWhite';

const Footer = () => {
  return (
    <FooterContainer
      flexDirection={{ xs: 'column', md: 'row' }}
      padding={{ xs: '13px 37px', md: '11px 77px' }}
    >
      <Typography fontSize={{ xs: 18, md: 25 }} fontWeight={700} lineHeight={1}>
        Web3Jobs
      </Typography>
      <Typography
        color="#C4C4C4"
        fontSize={{ xs: 13, md: 15 }}
        lineHeight={1}
        mt={{ xs: '10px', md: 0 }}
      >
        Copyright @web3jobs. All rights reserved
      </Typography>
      <UpButton
        sx={{ display: { xs: 'none', md: 'block' } }}
        onClick={() =>{
          if(typeof window !== undefined) {
            window.scrollTo({
              top: 0,
              behavior: 'smooth',
            })
          }
        }
        }
      >
        <UpArrowIcon />
      </UpButton>
    </FooterContainer>
  );
};

export default Footer;
