import { styled, Box } from '@mui/material';

export const DataTableContainer = styled(Box)`
  & .MuiPaper-root {
    background: transparent;
  }
  & .MuiTable-root {
    border-collapse: separate;
    border-spacing: 0 5px;
  }
  & .MuiTableContainer-root {
    max-height: 100%;

    & .MuiTableHead-root {
      & .MuiTableRow-root {
        background: #313145;
      }
    }
    & .MuiTableRow-root {
      background: #10101e;
    }
  }
`;

export const AppToggleContainer = styled(Box)(({ theme }) => ({
  '& .MuiTypography-root': {
    fontSize: 14,
  },
  '& .MuiSwitch-root': {
    width: 36,
    height: 18,
    padding: 0,
    '& .MuiSwitch-switchBase': {
      padding: 0,
      margin: 2,
      transitionDuration: '300ms',
      '&.Mui-checked': {
        transform: 'translateX(18px)',
        color: '#fff',
        '& + .MuiSwitch-track': {
          backgroundColor: '#00AA25',
          opacity: 1,
          border: 0,
        },
        '&.Mui-disabled + .MuiSwitch-track': {
          opacity: 0.5,
        },
      },
      '&.Mui-focusVisible .MuiSwitch-thumb': {
        color: '#B50000',
        border: '6px solid #fff',
      },
      '&.Mui-disabled .MuiSwitch-thumb': {
        color: theme.palette.grey[600],
      },
      '&.Mui-disabled + .MuiSwitch-track': {
        opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
      },
    },
    '& .MuiSwitch-thumb': {
      boxSizing: 'border-box',
      width: 14,
      height: 14,
    },
    '& .MuiSwitch-track': {
      borderRadius: 18 / 2,
      backgroundColor: '#B50000',
      opacity: 1,
      transition: theme.transitions.create(['background-color'], {
        duration: 500,
      }),
    },
  },
}));

export const FilterWrapper = styled(Box)`
  & .MuiSelect-select {
    padding: 8px 16px;
    padding-right: 40px;
    font-size: 12px;
    line-height: 18px;
    background: transparent;
  }

  & .expand-icon {
    transform: scale(0.7);
  }
  & .MuiSelect-select.MuiOutlinedInput-input {
    border: none !important;
  }
  & .MuiSelect-select[aria-expanded='true'] ~ .expand-icon {
    transform: rotate(180deg) scale(0.7);
  }
  & .MuiOutlinedInput-notchedOutline {
    border: none;
  }
`;
