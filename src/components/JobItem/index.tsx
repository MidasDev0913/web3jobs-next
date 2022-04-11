import React from 'react';
import { Box, Tooltip, Typography, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
import { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import updateLocale from 'dayjs/plugin/updateLocale';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import LazyLoad from 'react-lazyload';

import { TJob, PositionMap } from '../../interfaces';
import { Container, ApplyButton } from './index.styles';
import MoneyIcon from '../SVGIcons/MoneyIcon';
import ClockIcon from '../SVGIcons/ClockIcon';
import FavIcon from '../SVGIcons/FavIcon';
import {
  getFontColorFromBG,
  formatPriceAmount,
  getLocationText,
} from '../../utils/helper';

dayjs.extend(relativeTime);
dayjs.extend(updateLocale);
dayjs.updateLocale('en', {
  relativeTime: {
    future: 'in %s',
    past: '%s ago',
    s: '%d s',
    m: '1 m',
    mm: '%d m',
    h: '1 h',
    hh: '%d h',
    d: '1 d',
    dd: '%d d',
    M: '1 month',
    MM: '%d months',
    y: '1 year',
    yy: '%d years',
  },
});

type JobItemProps = {
  job: TJob;
  enableFav?: boolean;
  userId?: string;
  viewed?: boolean;
  disabled?: boolean;
  onClickFav?: (e: React.MouseEvent<HTMLDivElement>) => void;
};

const HtmlTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: '#131322',
    color: '#fff',
    maxWidth: 129,
    padding: '7px 21.5px',
  },

  [`& .${tooltipClasses.arrow}:before`]: {
    backgroundColor: '#131322',
  },
}));

const JobItem = ({
  job,
  viewed,
  userId,
  disabled,
  onClickFav,
}: JobItemProps) => {
  const mainColor =
    job.highlightColor === 'custom'
      ? getFontColorFromBG(job.highlightCustomColor ?? 'rgb(80, 0, 0)')
      : '#fff';
  return (
    <>
      <Box position="relative" display={{ xs: 'none', md: 'block' }}>
        <Container
          style={{
            background:
              job.highlightColor === 'standard'
                ? '#131322'
                : job.highlightColor === 'custom'
                ? job.highlightCustomColor || '#500000'
                : '#05050D',
            pointerEvents: disabled ? 'none' : 'auto',
          }}
          color={mainColor}
          href={`/job/${job.id}`}
        >
          {viewed && <Box className="is-viewed">Viewed</Box>}
          <Stack
            direction="row"
            alignItems="center"
            minWidth={{ xs: 416, xl: 616 }}
          >
            {job.logo ? (
              <LazyLoad height={48}>
                <img
                  src={job.logo}
                  className="logo"
                  style={{
                    objectFit: 'cover',
                    border: '1px solid #fff',
                  }}
                />
              </LazyLoad>
            ) : (
              <Box className="logo-text">{job.company_name?.charAt(0)}</Box>
            )}

            <Box
              display="flex"
              flexDirection="column"
              justifyContent="space-between"
              height="66px"
              ml={4}
              flex={1}
            >
              <Box display="flex" flexDirection="column">
                <Typography
                  color={mainColor}
                  fontFamily="Space Mono"
                  fontWeight={700}
                  fontSize={17}
                  lineHeight="20px"
                  textOverflow="ellipsis"
                  whiteSpace="nowrap"
                  overflow="hidden"
                  textAlign="left"
                  maxWidth={300}
                >
                  {job.title}
                </Typography>
                <Typography
                  color={mainColor}
                  fontWeight={300}
                  fontSize={14}
                  lineHeight={1.5}
                  mt={0.5}
                >
                  {job.company_name}
                </Typography>
              </Box>
              {Boolean(job.salary?.min || job.salary?.max) && (
                <Box
                  display="flex"
                  alignItems="center"
                  className="salary"
                  mt={0.3}
                >
                  <MoneyIcon color={mainColor} />
                  <span>
                    ${formatPriceAmount(job.salary?.min)}
                    <span> - </span>${formatPriceAmount(job.salary?.max)}
                  </span>
                </Box>
              )}
            </Box>
          </Stack>
          <Box display="flex" alignItems="center" minWidth={240}>
            <Typography
              color={mainColor}
              fontWeight={400}
              fontSize={14}
              lineHeight={1.5}
              sx={{ overflowWrap: 'break-word' }}
            >
              {getLocationText(job)}
            </Typography>
          </Box>
          <Box display="flex" flexWrap="wrap" width={300} ml={3}>
            {(job.tags || []).slice(0, 5).map((tag) => (
              <span className="tag" key={tag}>
                {tag}
              </span>
            ))}
          </Box>
          <Box
            display="flex"
            alignItems="center"
            className="created-time"
            width={100}
          >
            <ClockIcon color={mainColor} />
            <Typography fontSize={13} ml={1.5} color={mainColor}>
              {dayjs(job.posted_at).fromNow(true).replace(' ', '')}
            </Typography>
          </Box>
          <ApplyButton href={`/job/${job.id}`}>Apply</ApplyButton>
        </Container>
        <HtmlTooltip
          arrow
          placement="top"
          title={
            <React.Fragment>
              <Typography fontSize={12} lineHeight="18px">
                Add to favorite
              </Typography>
            </React.Fragment>
          }
        >
          <Box
            className="cursor__pointer"
            onClick={onClickFav}
            position="absolute"
            top="50%"
            right="33px"
            sx={{ transform: 'translate(0, -50%)' }}
          >
            <FavIcon
              color={mainColor === '#fff' ? '#FFC700' : mainColor}
              isFill={job.likes?.includes(userId || '')}
            />
          </Box>
        </HtmlTooltip>
      </Box>
      <Stack display={{ xs: 'block', md: 'none' }}>
        <Container
          style={{
            padding: 0,
            background:
              job.highlightColor === 'standard'
                ? '#131322'
                : job.highlightColor === 'custom'
                ? job.highlightCustomColor || '#500000'
                : '#05050D',
            pointerEvents: disabled ? 'none' : 'auto',
          }}
          color={mainColor}
          href={`/job/${job.id}`}
        >
          {/*
        // @ts-ignore */}
          <Carousel
            showArrows={false}
            showStatus={false}
            infiniteLoop={false}
            autoPlay={false}
            showThumbs={false}
            preventMovementUntilSwipeScrollTolerance
          >
            <Box
              display="flex"
              justifyContent="space-between"
              padding="12px 8px"
              paddingRight={5}
            >
              <Stack direction="row" alignItems="center">
                {job.logo ? (
                  <img
                    src={job.logo}
                    className="logo"
                    style={{
                      objectFit: 'cover',
                      border: '1px solid #fff',
                      width: '40px',
                      maxWidth: '40px',
                      height: '48px',
                    }}
                  />
                ) : (
                  <Box
                    className="logo-text"
                    width={40}
                    height={48}
                    maxWidth={40}
                  >
                    {job.company_name?.charAt(0)}
                  </Box>
                )}
                <Box
                  display="flex"
                  flexDirection="column"
                  alignItems="start"
                  justifyContent="space-between"
                  ml={1.25}
                  flex={1}
                >
                  <Box display="flex" flexDirection="column" alignItems="start">
                    <Typography
                      color={mainColor}
                      fontFamily="Space Mono"
                      fontWeight={700}
                      fontSize={{ xs: 12, md: 17 }}
                      lineHeight={1}
                      whiteSpace="break-spaces"
                      textAlign="left"
                      maxWidth={195}
                    >
                      {job.title}
                    </Typography>
                    <Typography
                      color={mainColor}
                      fontWeight={300}
                      fontSize={{ xs: 10, md: 14 }}
                      lineHeight={1.5}
                      mt={0.3}
                      whiteSpace="nowrap"
                    >
                      {job.company_name}
                    </Typography>
                  </Box>
                  {Boolean(job.salary?.min || job.salary?.max) && (
                    <Typography
                      color={mainColor}
                      fontWeight={300}
                      fontSize={{ xs: 10, md: 14 }}
                      lineHeight={1.5}
                      whiteSpace="nowrap"
                    >
                      ${formatPriceAmount(job.salary?.min)}
                      <span style={{ color: mainColor }}> - </span>$
                      {formatPriceAmount(job.salary?.max)}
                    </Typography>
                  )}
                  <Typography
                    fontSize={10}
                    color={mainColor}
                    textAlign="left"
                    whiteSpace="nowrap"
                  >
                    {getLocationText(job)}
                  </Typography>
                </Box>
              </Stack>
              <Box
                display="flex"
                alignItems="center"
                className="created-time"
                width="46px"
              >
                <ClockIcon color={mainColor} size={10} />
                <Typography
                  fontSize={10}
                  ml={0.5}
                  fontWeight={500}
                  color={mainColor}
                >
                  {dayjs(job.posted_at).fromNow(true).replace(' ', '')}
                </Typography>
              </Box>
            </Box>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              height="100%"
              padding="12px 8px"
              paddingRight={12}
            >
              <Box display="flex" flexWrap="wrap" width={250}>
                {(job.tags || []).slice(0, 5).map((tag) => (
                  <Box
                    fontSize={12}
                    lineHeight={1.5}
                    color="#fff"
                    border={`0.5px solid ${mainColor}`}
                    borderRadius="2px"
                    padding="5px"
                    mr="5px"
                    mt="5px"
                    bgcolor={mainColor === '#000' ? mainColor : 'transparent'}
                    key={tag}
                  >
                    {tag}
                  </Box>
                ))}
              </Box>
              <Typography
                fontSize="10px"
                fontWeight={500}
                color={mainColor}
                whiteSpace="nowrap"
              >
                {PositionMap[job.position]}
              </Typography>
            </Box>
          </Carousel>
          {viewed && <Box className="is-viewed">Viewed</Box>}
          <Box
            className="cursor__pointer"
            onClick={onClickFav}
            position="absolute"
            top="50%"
            right="8px"
            sx={{ transform: 'translate(0, -50%)' }}
          >
            <FavIcon
              color={mainColor === '#fff' ? '#FFC700' : mainColor}
              isFill={job.likes?.includes(userId || '')}
            />
          </Box>
        </Container>
      </Stack>
    </>
  );
};

export default JobItem;
