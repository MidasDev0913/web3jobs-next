import { styled, Link, Box, Button, keyframes, Theme } from '@mui/material';

export const Container = styled(Link)(({ color }: { color?: string }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '6px 33px',
  paddingRight: 101,
  flex: 1,
  cursor: 'pointer',
  position: 'relative',
  textDecoration: 'none',
  '&:hover': {
    opacity: 0.8,
  },
  '& .carousel-root': {
    width: '100%',
    '& .control-dots': {
      margin: 0,
      '& .dot': {
        width: 4,
        height: 4,
        margin: '0 2px',
      },
    },
  },

  '& .is-viewed': {
    position: 'absolute',
    top: 2,
    right: 3.25,
    fontSize: 10,
    lineHeight: '10px',
    fontWeight: 500,
    padding: 2,
    backgroundColor: '#00000036',
  },
  '& .logo': {
    width: 48,
    minWidth: 48,
    height: 56,
  },
  '& .logo-text': {
    fontFamily: 'Space Mono',
    border: '1px solid #fff',
    width: 48,
    minWidth: 48,
    height: 56,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 30,
    lineHeight: '45px',
    fontWeight: 700,
  },
  '& .salary': {
    '& > span': {
      fontSize: 13,
      lineHeight: '19.5px',
      color: color,
      marginLeft: 5,
      '& span': {
        color: color,
      },
    },
  },
  '& .tag': {
    fontSize: 12,
    lineHeight: '150%',
    color: '#fff',
    whiteSpace: 'nowrap',
    border: `0.5px solid ${color}`,
    borderRadius: 3,
    padding: 7,
    marginRight: 9,
    marginTop: 9,
    background: color === '#000' ? color : 'transparent',
  },
  '& .created-time': {
    '& time': {
      fontSize: 13,
      lineHeight: '150%',
      color: color,
      marginLeft: 10,
    },
  },
}));

export const ApplyButton = styled(Link)({
  background: '#B50000',
  padding: '10px 15px',
  borderRadius: 5,
  marginLeft: 65,
  color: '#fff',
  textDecoration: 'none',
});
