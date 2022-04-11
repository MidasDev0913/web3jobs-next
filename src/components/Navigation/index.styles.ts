import { styled, Box, IconButton } from '@mui/material';

export const NavigationContainer = styled(Box)(
  ({ collapsed }: { collapsed: boolean }) => ({
    '& .nav-logo': {
      fontWeight: '700',
      fontSize: '25px',
      lineHeight: '150%',
      textDecoration: 'none',
      textAlign: 'center',
      letterSpacing: '0.01em',
      marginLeft: collapsed ? 0 : 65,
      color: '#FFFFFF',

      '&:hover': {
        textDecoration: 'none',
      },
    },
    '& .wapper': {
      position: 'fixed',
      paddingTop: 33,
      height: '100%',
      width: collapsed ? 138 : 284,
      background: '#05050D',
      boxShadow: '0px 4px 120px rgba(0, 0, 0, 0.25)',
      borderRight: '1px solid #313145',
      zIndex: 2,
      display: collapsed ? 'flex' : 'block',
      flexDirection: 'column',
      alignItems: 'center',
      boxSizing: 'border-box',
      transition: 'width 0.3s',

      '& > .menu-wapper': {
        height: '100%',
        overflowY: 'hidden',
        overflowX: 'hidden',
        scrollbarWidth: 'none' /* Firefox */,
        width: '100%',

        '& > ul': {
          minHeight: '100%',
          margin: 0,
          padding: '70px 0',

          '& > li:last-child a svg': {
            color: 'red',
          },
        },
      },

      '& img': {
        width: '74px',
        height: '32px',
        marginTop: '14px',
        marginLeft: '31px',
        marginBottom: '21px',
      },
    },
  })
);

export const LoadingWrapper = styled(Box)({
  width: 250,
});

export const CollapseIconButton = styled(IconButton)`
  width: 23px;
  height: 23px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.15);
  border-radius: 24px;
`;
