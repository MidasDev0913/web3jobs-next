import React, { useRef } from 'react';
import { Box } from '@mui/material';
import { Navigation } from 'swiper';

import { SectionContainer, TitleContainer } from './index.styles';
import { JobHolderCard, JobHolderCardProps } from '../JobHolderCard';

export const BestFeatureSection = () => {
  const navigationPrevRef = useRef(null);
  const navigationNextRef = useRef(null);
  return (
    <SectionContainer>
      <TitleContainer>
        <Box position="relative">
          <span className="section-title">
            Connect your wallet and get access to all features
          </span>
          <div className="section-title-underline" />
        </Box>
        <span className="section-title-text">
          Get your dream job. Find the best employees
        </span>
      </TitleContainer>
      {/*
      // @ts-ignore */}
      <Box
        width="calc(100% - 274px)"
        marginTop="50px"
        padding="0 112px"
        position="relative"
      >
        {/* <BestFeatureForCompanyCard />
        <BestFeatureForWorkerCard /> */}
      </Box>
    </SectionContainer>
  );
};
