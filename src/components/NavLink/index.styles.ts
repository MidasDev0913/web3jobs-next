import React from 'react';
import { styled, Link as NavLink, Box } from '@mui/material';

export const Wrapper = styled(Box)({
  '& > li': {
    listStyle: 'none',
  },
});

export const LinkWrapper = styled(Box)(
  ({ active, collapsed }: { active?: boolean; collapsed?: boolean }) => ({
    '& a': {
      display: 'flex',
      alignItems: 'center',
      justifyContent: collapsed ? 'center' : 'start',
      position: 'relative',
      height: '30px',
      textDecoration: 'none',
      overflow: 'hidden',
      cursor: 'pointer',
      padding: collapsed ? '12px 0' : '12px 51px',
      width: '100%',
      background: active
        ? collapsed
          ? 'transparent'
          : '#10101E'
        : 'transparent',

      '& .icon-wrapper': {
        width: 30,
        height: 30,
        minWidth: 30,
        background: active ? '#199FD9' : 'transparent',
        boxShadow: '0px 3.5px 5.5px rgba(0, 0, 0, 0.02)',
        borderRadius: 12,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',

        '& svg path': {
          fill: active ? '#fff' : '#A3A1A1',
        },
      },

      '&.active': {
        position: 'relative',
        backgroundColor: 'red',

        '& > span': {
          color: '#fff',
        },

        '&:before': {
          content: '""',
          backgroundColor: 'red',
          width: '2px',
          position: 'absolute',
          left: 0,
          top: 0,
          bottom: 0,
        },
      },

      '& > svg': {
        width: '14px',
        color: 'red',
        marginRight: '24px',
      },

      '& > span': {
        fontSize: 14,
        fontWeight: 500,
        lineHeight: '100%',
        marginLeft: 16,
        color: active ? '#fff' : '#A3A1A1',

        '&:only-child': {
          marginLeft: '38px',
        },
      },

      '&:hover': {
        '& span': {
          color: '#fff',
        },

        '& .icon-wrapper': {
          '& svg path': {
            fill: collapsed ? '#000' : '#fff',
          },
        },
      },
    },
  })
);
