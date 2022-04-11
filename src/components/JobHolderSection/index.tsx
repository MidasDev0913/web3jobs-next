import React, { useRef } from 'react';
import { Box } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react';
import 'swiper/swiper.min.css';
import 'swiper/modules/navigation/navigation.min.css';
import { Navigation } from 'swiper';

import { SectionContainer, TitleContainer } from './index.styles';
import { JobHolderCard, JobHolderCardProps } from '../JobHolderCard';
import ArrowRightIcon from '../SVGIcons/ArrowRightIcon';
import ArrowLeftIcon from '../SVGIcons/ArrowLeftIcon';

export const JobHolderSection = ({ data }: { data: JobHolderCardProps[] }) => {
  const navigationPrevRef = useRef(null);
  const navigationNextRef = useRef(null);
  return (
    <SectionContainer>
      <TitleContainer>
        <Box position="relative">
          <span className="section-title">What jobholders says</span>
          <div className="section-title-underline" />
        </Box>
        <span className="section-title-text">
          Here are few words from those that got jobs using our platform.
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
        <Swiper
          loop
          slidesPerView={2}
          navigation={{
            prevEl: navigationPrevRef.current,
            nextEl: navigationNextRef.current,
          }}
          modules={[Navigation]}
        >
          {data.map((item: JobHolderCardProps, _i: number) => (
            <SwiperSlide key={_i}>
              <JobHolderCard {...item} />
            </SwiperSlide>
          ))}
          <Box className="swiper-prev-btn" ref={navigationPrevRef}>
            <ArrowLeftIcon color="#fff" />
          </Box>
          <Box className="swiper-next-btn" ref={navigationNextRef}>
            <ArrowRightIcon color="#fff" />
          </Box>
        </Swiper>
      </Box>
    </SectionContainer>
  );
};
