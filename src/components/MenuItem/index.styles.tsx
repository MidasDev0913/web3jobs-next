import {
  styled,
  Box,
  Link,
  MenuItem as MuiMenuItem,
  Popper,
} from '@mui/material';

export const Container = styled(Box)({});

export const MenuItem = styled(Link)(({ active }: { active: boolean }) => ({
  fontSize: '18px',
  lineHeight: '22px',
  textDecoration: 'none',
  marginRight: '8px',
  padding: '8px 16px',
  borderRadius: '4px',
  color: '#ffffff',
}));

export const SubMenuItem = styled(MuiMenuItem)({});

export const MenuPopper = styled(Popper)({
  zIndex: 1000,

  '& .MuiPaper-root': {
    background: '#1B1B1B',
  },
  '& .MuiMenuItem-root': {
    display: 'flex',
    flexDirection: 'column',
    color: '#fff',
    width: '100%',

    '&#composition-menu': {
      padding: 0,
    },

    '&:hover': {
      background: 'transparent',
    },

    '& li:hover': {
      background: '#B50000',
    },
  },
});
