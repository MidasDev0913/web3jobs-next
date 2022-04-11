import { styled, TextField, Box } from '@mui/material';

export const Container = styled(Box)(({ theme }) => ({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',

  '& .mui-editor': {
    '& .DraftEditor-root': {
      backgroundColor: '#131322',
      borderRadius: '10px',
      padding: 26,
      minHeight: 563,
      maxHeight: 563,
      overflowY: 'scroll',
    },
  },
  '& .mui-toolbar': {
    backgroundColor: 'transparent',
    padding: 0,
    border: 'none',
    '& .rdw-option-wrapper': {
      backgroundColor: '#131322',
    },
    '& *': {
      color: '#fff',
    },
    '& .rdw-history-wrapper': {
      marginLeft: 'auto',
    },
    '& .rdw-link-modal': {
      backgroundColor: '#131322',
      boxShadow: 'none',
      '& .rdw-link-modal-btn, input': {
        color: '#131322',
      },
    },
    '& .custom-tool-options': {
      width: 60,
      height: 57,
      border: '0.5px solid #8C7D7D',
      borderLeft: 'none',
      boxSizing: 'border-box',
      margin: 0,
      '&:hover': {
        boxShadow: 'none',
      },
      '&.bold': {
        borderTopLeftRadius: 5,
        borderBottomLeftRadius: 5,
        borderLeft: '0.5px solid #8C7D7D',
      },
      '&.link': {
        borderTopRightRadius: 5,
        borderBottomRightRadius: 5,
      },
      '&.outdent': {
        borderTopRightRadius: 5,
        borderBottomRightRadius: 5,
      },
      '&.redo': {
        borderTopRightRadius: 5,
        borderBottomRightRadius: 5,
      },
      '&.unordered': {
        borderTopLeftRadius: 5,
        borderBottomLeftRadius: 5,
        borderLeft: '0.5px solid #8C7D7D',
        marginLeft: 72,
      },
      '&.undo': {
        borderTopLeftRadius: 5,
        borderBottomLeftRadius: 5,
        borderLeft: '0.5px solid #8C7D7D',
      },
      '&.rdw-option-active': {
        boxShadow: '2px 2px 0px #bfbdbd inset',
      },
    },
  },
  [theme.breakpoints.down('md')]: {
    '& .mui-editor': {
      '& .DraftEditor-root': {
        borderRadius: '6px',
        padding: 11,
        minHeight: 311,
        maxHeight: 311,
        fontSize: 12,
      },
    },
    '& .mui-toolbar': {
      '& .custom-tool-options': {
        width: 24,
        height: 35,
        '& img': {
          transform: 'scale(0.7)',
        },
      },
    },
  },
}));
