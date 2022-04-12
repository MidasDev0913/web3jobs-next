import { ThemeOptions } from '@mui/material';
import { Border } from './job/index.styles';

export const customizedTheme: ThemeOptions = {
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 5,
          fontSize: '15px',
          lineHeight: '18px',
          textTransform: 'capitalize',
          background: '#B50000',
          border: '1px solid #B50000',
          color: '#fff',
          fontWeight: 500,
          '& *': {
            color: '#fff',
          },
          '&:hover': {
            background: '#F5F5F5',
            border: '1px solid #F5F5F5',
            color: '#120E0E',
            '& *': {
              color: '#120E0E',
            },
          },
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          fontSize: 15,
          lineHeight: 1.5,
          fontFamily: 'Inter',
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          background: '#05050D',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          background: '#131322',
          borderRadius: 10,
          '& .MuiOutlinedInput-root': {
            padding: 0,
          },
          '& .MuiOutlinedInput-input': {
            padding: '16.5px 14px',
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          outline: 'none',
          border: 'none',
          '&.Mui-focused': {
            border: 'none',
            '& .MuiOutlinedInput-notchedOutline': {
              border: 'none',
            },
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            border: 'none',
          },
          '&.Mui-error .MuiOutlinedInput-notchedOutline': {
            border: '0.4px solid #B50000',
            borderBottomLeftRadius: '0px !important',
            borderBottomRightRadius: '0px !important',
            borderRadius: 10,
          },
          '&.Mui-error .MuiOutlinedInput-input': {
            border: 'none',
          },
        },
        input: {
          color: 'white',
          border: '0.4px solid #131322',
          borderRadius: 10,
          background: '#131322',
          '&:focus': {
            border: '0.4px solid #B50000',
            borderRadius: 10,
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          '& .MuiList-root': {
            background: '#131322',
            border: '1px solid #B50000',
            borderRadius: 5,
          },
        },
      },
    },
    MuiMenu: {
      styleOverrides: {
        list: {
          padding: 0,
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          '&.Mui-selected:not(.Mui-disabled)': {
            background: '#B50000',
          },
          '&.Mui-selected:hover': {
            background: '#B50000',
          },
          '&:hover': {
            background: '#B50000',
          },
          '&.add-button-menuitem': {
            padding: 0,
            '& button': {
              background: '#131322',
              width: '100%',
              borderRadius: '0px',
              display: 'block',
              textAlign: 'left',
              padding: '6px 16px',
              fontSize: '16px',
              fontStyle: 'italic',
              textTransform: 'none',
              border: 'none',
              lineHeight: '24px',
              '&:hover': {
                color: '#fff',
              },
            },
          },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        select: {
          '& ~ .expand-icon': {
            position: 'absolute',
            right: 10,
          },
          '&[aria-expanded=true] ~ .expand-icon': {
            transform: 'rotate(180deg)',
          },
          '&[aria-expanded=true].MuiOutlinedInput-input': {
            border: '0.4px solid #B50000',
            borderRadius: 10,
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 5,
          background: '#131322',
          padding: 13,
          height: 'auto',
          border: '1px solid #199FD9',
          '@media (hover: hover)': {
            '&:hover': {
              background: 'transparent',
              border: '1px solid #ffffff40',
              padding: 13,
            },
            '&:hover .MuiChip-label': {
              color: '#fff',
            },
          },
        },
        label: {
          color: '#fff',
          fontSize: 12,
          lineHeight: '150%',
          padding: 0,
        },
        filled: {
          background: '#EBEFF8',
          '& .MuiChip-label': {
            color: '#131322',
          },
          '@media (hover: hover)': {
            '&:hover': {
              background: 'transparent',
              border: '1px solid #ffffff40',
              padding: 13,
            },
            '&:hover .MuiChip-label': {
              color: '#fff',
            },
          }
        },
      },
    },
    MuiFormControlLabel: {
      styleOverrides: {
        label: {
          color: '#fff',
        },
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          '& svg': {
            width: 30,
            height: 30,
          },
          '& svg path': {
            color: '#5e5e5e',
          },
          '&.Mui-checked': {
            '& svg path': {
              color: '#B50000',
            },
          },
        },
      },
    },
    MuiRadio: {
      styleOverrides: {
        root: {
          '& svg': {
            width: 30,
            height: 30,
          },
          '& svg path': {
            color: '#5e5e5e',
          },
          '&.Mui-checked': {
            '& svg path': {
              color: '#B50000',
            },
          },
        },
      },
    },
    MuiAutocomplete: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            padding: 0,
            '& .MuiAutocomplete-input': {
              padding: '16.5px 14px',
              color: '#fff',
              '&:focus': {
                border: '0.4px solid #131322',
              },
            },
          },
        },
        popperDisablePortal: {
          transform: 'none !important',
          inset: 'auto !important'
        },
        listbox: {
          padding: 0,
        },
        option: {
          '&:hover': {
            backgroundColor: '#B50000 !important',
          },
          '&[aria-selected=true]': {
            backgroundColor: '#B50000 !important',
          },
          '&[aria-selected=true].Mui-focused': {
            backgroundColor: '#B50000 !important',
          },
        },
        popper: {
          '& .MuiPaper-root': {
            background: '#131322',
          },
        },
        noOptions: {
          color: 'white',
        },
      },
    },
    MuiLinearProgress: {
      styleOverrides: {
        root: {
          backgroundColor: '#C4C4C4',
          height: 2,
          borderRadius: 8,
          width: '100%',
        },
        bar: {
          backgroundColor: '#B50000',
          borderRadius: 8,
        },
      },
    },
    MuiSkeleton: {
      styleOverrides: {
        root: {
          backgroundColor: '#ffffff26',
        },
      },
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          display: 'flex',
          alignItems: 'start',
          margin: 0,
          background: '#b50000',
          padding: '6px 16px',
          color: '#fff',
          fontsize: '14px',
          position: 'absolute',
          width: 'calc(100% - 32px)',
          bottom: 'auto',
          borderBottomLeftRadius: '4px',
          borderBottomRightRadius: '4px',
          fontSize: 14,
          zIndex: 1,

          '& img': {
            marginTop: 2,
            marginRight: 8,
          },
        },
      },
    },
    MuiPagination: {
      styleOverrides: {
        ul: {
          '& li': {
            borderRadius: 6,
            marginRight: 20,
            '&:last-child': {
              marginRight: 0,
            },
          },
        },
      },
    },
    MuiPaginationItem: {
      styleOverrides: {
        root: {
          border: '1px solid #BCBCBC',
          width: 50,
          height: 50,
          margin: 0,
          color: '#fff',
          '&.Mui-selected': {
            border: '1px solid #B50000',
            backgroundColor: '#B50000',
            '&:hover': {
              border: '1px solid #BCBCBC',
            },
          },
          '&.MuiPaginationItem-ellipsis': {
            border: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          },
        },
      },
    },
    MuiPopover: {
      styleOverrides: {
        paper: {
          background: '#131322',
          borderRadius: 5,
          minWidth: 147,
          marginTop: 5,
          boxShadow: 'none',
        },
      },
    },
    MuiSlider: {
      styleOverrides: {
        thumb: {
          '&::before': {
            width: 'calc(100% - 6px)',
            height: 'calc(100% - 6px)',
            background: '#B50000',
          },
        },
      },
    },
    MuiTableContainer: {
      styleOverrides: {
        root: {
          '& *': {
            color: '#FFFFFF',
          },
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          color: '#fff',
          background: 'transparent',
          fontWeight: 500,
          borderBottom: '1px solid rgba(255, 255, 255, 0)',
        },
        head: {
          fontSize: 12,
          lineHeight: '18px',
        },
      },
    },
  },
};
