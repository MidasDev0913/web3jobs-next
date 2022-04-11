import { styled, Box } from '@mui/material';

export const SectionContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '100%',
  margin: '104px 0 110px',

  '& .swiper': {
    width: '100%',
    position: 'initial',
  },
  '& .swiper-container': {
    position: 'initial',
  },
  '& .swiper-slide': {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  '& .swiper-next-btn': {
    width: 56,
    height: 56,
    background: '#fff',
    borderRadius: 28,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    position: 'absolute',
    right: 48,
    top: 'calc(50% - 28px)',
    zIndex: 1,

    '& svg': {
      marginLeft: 4,
    },
    '& path': {
      stroke: '#B50000',
    },

    '&:hover': {
      background: '#B50000',
      '& path': {
        stroke: '#fff',
      },
    },
  },

  '& .swiper-prev-btn': {
    width: 56,
    height: 56,
    background: '#fff',
    borderRadius: 28,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    position: 'absolute',
    left: 48,
    top: 'calc(50% - 28px)',
    zIndex: 1,

    '& svg': {
      marginRight: 4,
    },

    '& path': {
      stroke: '#B50000',
    },

    '&:hover': {
      background: '#B50000',
      '& path': {
        stroke: '#fff',
      },
    },
  },
});

export const TitleContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',

  '& .section-title': {
    fontSize: 30,
    lineHeight: '150%',
    color: '#fff',
    zIndex: 1,
    position: 'relative',
  },
  '& .section-title-underline': {
    position: 'absolute',
    background: '#DD3F3F',
    height: 9,
    width: 142,
    bottom: 7,
    left: -33,
    zIndex: 0,
  },
  '& .section-title-text': {
    fontSize: 15,
    lineHeight: '200%',
    color: '#fff',
  },
});
