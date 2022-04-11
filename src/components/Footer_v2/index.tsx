import React from 'react';
import { Box, Link } from '@mui/material';

import { FooterContainer } from './index.styles';
import FacebookIcon from '../../assets/icons/facebook_footer.svg';
import LinkedinIcon from '../../assets/icons/linkedin_footer.svg';
import InstagramIcon from '../../assets/icons/instagram_footer.svg';
import TwitterIcon from '../../assets/icons/twitter_footer.svg';

const linkItems = [
  {
    text: 'Home',
    link: '/',
  },
  {
    text: 'About Us',
    link: '/about-us',
  },
  {
    text: 'Sponsorship',
    link: '/sponsorship',
  },
  {
    text: 'Post Job',
    link: '/post-job',
  },
  {
    text: 'Contact Us',
    link: '/contact-us',
  },
  {
    text: 'Careers',
    link: '/careers',
  },
];

const communityItems = [
  {
    text: 'Go Premium',
    link: 'premium',
  },
  {
    text: 'Team Plans',
    link: 'team-plans',
  },
  {
    text: 'Salaries',
    link: 'salaries',
  },
  {
    text: 'Startup Directory',
    link: 'startup-directory',
  },
];

const Footer = () => {
  return (
    <FooterContainer>
      <Box display="flex">
        <Box display="flex" flexDirection="column" width="50%">
          <span className="section-title">LOGO</span>
          <span className="section-text">
            Phasellus nisi ipsum, fermentum eget consequat non, molestie at
            augue. Proin rutrum sem a rutrum ultricies. Nunc felis neque, dictum
            ut porta a, ullamcorper vel ante.
          </span>
          <Box display="flex" alignItems="center" className="social-icons">
            <img src={FacebookIcon} />
            <img src={TwitterIcon} />
            <img src={InstagramIcon} />
            <img src={LinkedinIcon} />
          </Box>
        </Box>
        <Box display="flex" flexDirection="column" width="25%">
          <span className="section-title">Links</span>
          {linkItems.map((item, _i) => (
            <Link className="section-link" key={item.text}>
              {item.text}
            </Link>
          ))}
        </Box>
        <Box display="flex" flexDirection="column" width="25%">
          <span className="section-title">Community</span>
          {communityItems.map((item, _i) => (
            <Link className="section-link" key={item.text}>
              {item.text}
            </Link>
          ))}
        </Box>
      </Box>
      <span className="footer-text">
        Copyright @web3jobs. All rights reserved
      </span>
    </FooterContainer>
  );
};

export default Footer;
