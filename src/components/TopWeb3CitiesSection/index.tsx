import React, { useState } from 'react';
import { Box, Link, Typography } from '@mui/material';

import { SectionContainer } from './index.styles';
import { TJobCountyOfCity } from '../../interfaces';
import ArrowDownIcon from '../../assets/icons/arrow_down_small.svg';

const TopWeb3CitiesSection = ({
  cities,
  onClick,
}: {
  cities: TJobCountyOfCity[];
  onClick: (city: string) => void;
}) => {
  const [seeMore, setSeeMore] = useState<boolean>(false);
  return (
    <SectionContainer
      marginTop={{ xs: 12, md: 16 }}
      marginBottom={{ xs: 5, md: 10 }}
    >
      <Box position="relative">
        <Typography
          fontWeight={600}
          fontSize={{ xs: 20, md: 30 }}
          lineHeight={1.5}
          zIndex={1}
          position="relative"
        >
          Top Web3 Cities
        </Typography>
      </Box>
      <Box
        display={{ xs: 'none', md: 'flex' }}
        mt="30px"
        width="calc(100% - 240px)"
        height="255px"
        padding="0 120px"
      >
        <Box display="flex" flexDirection="column" flex="1 0 25%">
          {cities.slice(0, 5).map((item, _i) => (
            <Box display="flex" alignItems="center" mb="30px" key={item.id}>
              <Link className="city-link" onClick={() => onClick(item.city)}>
                Web3 Jobs in {item.city}
              </Link>
              <Box className="job-count">{item.jobCount}</Box>
            </Box>
          ))}
        </Box>

        <Box display="flex" flexDirection="column" flex="1 0 25%">
          {cities.slice(5, 10).map((item, _i) => (
            <Box display="flex" alignItems="center" mb="30px" key={item.id}>
              <Link className="city-link" onClick={() => onClick(item.city)}>
                Web3 Jobs in {item.city}
              </Link>
              <Box className="job-count">{item.jobCount}</Box>
            </Box>
          ))}
        </Box>

        <Box display="flex" flexDirection="column" flex="1 0 25%">
          {cities.slice(10, 15).map((item, _i) => (
            <Box display="flex" alignItems="center" mb="30px" key={item.id}>
              <Link className="city-link" onClick={() => onClick(item.city)}>
                Web3 Jobs in {item.city}
              </Link>
              <Box className="job-count">{item.jobCount}</Box>
            </Box>
          ))}
        </Box>

        <Box display="flex" flexDirection="column" flex="1 0 25%">
          {cities.slice(15, 20).map((item, _i) => (
            <Box display="flex" alignItems="center" mb="30px" key={item.id}>
              <Link className="city-link" onClick={() => onClick(item.city)}>
                Web3 Jobs in {item.city}
              </Link>
              <Box className="job-count">{item.jobCount}</Box>
            </Box>
          ))}
        </Box>
      </Box>
      <Box
        display={{ xs: 'flex', md: 'none' }}
        flexDirection="column"
        alignItems="center"
        mt="19px"
      >
        {cities.slice(0, seeMore ? cities.length : 10).map((item, _i) => (
          <Box display="flex" alignItems="center" mb="20px" key={item.id}>
            <Link
              color="#fff"
              fontSize={12}
              lineHeight={1.5}
              className="cursor__pointer"
              sx={{ textDecoration: 'none' }}
              onClick={() => onClick(item.city)}
            >
              Web3 Jobs in {item.city}
            </Link>
            <Box className="job-count">{item.jobCount}</Box>
          </Box>
        ))}
        {cities.length > 10 && (
          <Box
            display="flex"
            alignItems="center"
            padding="5px 10px"
            bgcolor="#10101E"
            borderRadius="5px"
            onClick={() => setSeeMore(!seeMore)}
          >
            <Typography fontSize={13} mr={1}>
              See {seeMore ? 'less' : 'more'}
            </Typography>
            <img
              src={ArrowDownIcon}
              style={{ transform: `rotate(${seeMore ? '180' : '0'}deg)` }}
            />
          </Box>
        )}
      </Box>
    </SectionContainer>
  );
};

export default TopWeb3CitiesSection;
