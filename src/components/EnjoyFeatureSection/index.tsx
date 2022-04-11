import React from 'react';
import { Box, Typography, Stack, Button } from '@mui/material';
import LazyLoad from 'react-lazyload';

import CheckIcon from '../SVGIcons/CheckIcon';
import ArrowRightIcon from '../SVGIcons/ArrowRightIcon_2';
import CompanyBgImg from '../../assets/images/feature-bg-company.png';
import ApplicantBgImg from '../../assets/images/feature-bg-applicant.png';

interface ComponentProps {
  onHireTalent: () => void;
  onGetJob: () => void;
}

const companyFeatures = [
  {
    label: 'Dashboard with real time data.',
    active: true,
  },
  {
    label: 'History to keep tracks on changes on job posts',
    active: true,
  },
  {
    label: 'Manage Jobs to be in charge of all job and processes',
    active: true,
  },
  {
    label: 'Invoices to manage finances and transactions',
    active: true,
  },
  {
    label: 'More features in the pipeline..',
    active: false,
  },
];

const applicantFeatures = [
  {
    label: 'Save Favorites jobs.',
    active: true,
  },
  {
    label: 'Features coming soon..',
    active: undefined,
  },
  {
    label: 'Job Applicant Dashboard.',
    active: false,
  },
  {
    label: 'Mail Notification.',
    active: false,
  },
  {
    label: 'One click apply.',
    active: false,
  },
  {
    label: 'Auto apply.',
    active: false,
  },
];

const EnjoyFeatureSection: React.FC<ComponentProps> = ({
  onHireTalent,
  onGetJob,
}) => {
  return (
    <Stack
      alignItems="center"
      width="100%"
      mt={{ xs: 0, md: 13 }}
      px={{ xs: 2, md: 20 }}
      boxSizing="border-box"
    >
      <Typography
        fontWeight={600}
        fontSize={{ xs: 20, md: 30 }}
        lineHeight={1.5}
        textAlign="center"
        px={4}
      >
        Connect your wallet and enjoy the features
      </Typography>
      <Typography
        color="#A3A1A1"
        mt={1}
        fontSize={{ xs: 12, md: 15 }}
        textAlign="center"
        px={4}
      >
        The best features for companies and workers to bring them together
        faster.
      </Typography>
      <Stack
        width="100%"
        direction={{ xs: 'column', md: 'row' }}
        spacing={{ xs: 5, md: 4 }}
        mt={{ xs: 4, md: 9 }}
      >
        <Box
          padding={{ xs: '48px 36px 36px', md: '48px' }}
          bgcolor="#10101E"
          borderRadius="10px"
          width={{ xs: '100%', md: '50%' }}
          boxSizing="border-box"
          sx={{
            backgroundImage: `url(${CompanyBgImg})`,
            backgroundRepeat: 'no-repeat',
            backgroundPositionX: 'right',
            backgroundPositionY: 'center',
          }}
        >
          <Typography
            fontWeight={700}
            fontSize={{ xs: 15, md: 20 }}
            lineHeight={1.4}
          >
            Company Features
          </Typography>
          {companyFeatures.map((feature, _i) => (
            <Box display="flex" alignItems="center" mt={3} key={_i}>
              <CheckIcon active={feature.active} />
              <Typography
                fontSize={{ xs: 12, md: 15 }}
                color="#C4C4C4"
                ml="10px"
              >
                {feature.label}
              </Typography>
            </Box>
          ))}
          <Box
            mt="29px"
            display="flex"
            justifyContent={{ xs: 'start', md: 'end' }}
          >
            <Button
              sx={{
                background: 'transparent',
                border: '1px solid #fff',
                width: '200px',
              }}
              onClick={onHireTalent}
            >
              <Typography fontSize={{ xs: 12, md: 15 }} mr={1}>
                Hire the best talents
              </Typography>{' '}
              <ArrowRightIcon />
            </Button>
          </Box>
        </Box>
        <Box
          display="flex"
          flexDirection="column"
          padding={{ xs: '48px 36px 36px', md: '48px' }}
          bgcolor="#10101E"
          borderRadius="10px"
          width={{ xs: '100%', md: '50%' }}
          boxSizing="border-box"
          sx={{
            backgroundImage: `url(${ApplicantBgImg})`,
            backgroundRepeat: 'no-repeat',
            backgroundPositionX: 'right',
            backgroundPositionY: 'center',
          }}
        >
          <Typography
            fontWeight={700}
            fontSize={{ xs: 15, md: 20 }}
            lineHeight={1.4}
            mb="6px"
          >
            Job Applicants Features
          </Typography>
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
            flex={1}
          >
            {applicantFeatures.map((feature, _i) => (
              <Box
                display="flex"
                alignItems="center"
                mt={feature.active === undefined ? '18px' : '15px'}
                key={_i}
              >
                {feature.active !== undefined && (
                  <CheckIcon active={feature.active} />
                )}
                <Typography
                  fontSize={{ xs: 12, md: 15 }}
                  color={feature.active === undefined ? '#fff' : '#C4C4C4'}
                  ml="10px"
                >
                  {feature.label}
                </Typography>
              </Box>
            ))}
          </Box>
          <Box
            mt="29px"
            display="flex"
            justifyContent={{ xs: 'start', md: 'end' }}
          >
            <Button
              sx={{
                background: 'transparent',
                border: '1px solid #fff',
                width: '200px',
              }}
              onClick={onGetJob}
            >
              <Typography fontSize={{ xs: 12, md: 15 }} mr={1}>
                Get your dream job{' '}
              </Typography>
              <ArrowRightIcon />
            </Button>
          </Box>
        </Box>
      </Stack>
    </Stack>
  );
};

export default EnjoyFeatureSection;
