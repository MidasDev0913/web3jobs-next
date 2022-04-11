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
            Connect your wallet and enjoy the features
          </span>
          <div className="section-title-underline" />
        </Box>
        <span className="section-title-text">
          The best features for companies and workers to bring them together
          faster.
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
