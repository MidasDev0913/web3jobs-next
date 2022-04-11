import { styled, Box, Button } from '@mui/material';

export const DataTableContainer = styled(Box)`
  & .MuiPaper-root {
    background: transparent;
  }
  & .MuiTable-root {
    border-collapse: separate;
    border-spacing: 0 5px;
  }
  & .MuiTableContainer-root {
    max-height: 800px;

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

export const DropdownWrapper = styled(Box)`
  display: flex;
  align-items: center;

  & .MuiSelect-select {
    padding: 8px 16px;
    padding-right: 40px;
    font-size: 12px;
    line-height: 18px;
    background: #b50000;
    border-radius: 5px;
  }

  & .expand-icon {
    transform: scale(0.7);
  }
  & .MuiSelect-select[aria-expanded='true'] ~ .expand-icon {
    transform: rotate(180deg) scale(0.7);
  }
  & .MuiSelect-select[aria-expanded='true'].MuiOutlinedInput-input {
    border-radius: 5px;
  }
  & .recharts-rectangle {
    border-radius: 12px 12px 0px 0px;
    &:hover {
      fill: #b50000;
    }
  }
`;

export const DownloadAllButton = styled(Button)`
  padding: 8px 18px;
  border-radius: 5px;
  margin-right: 16px;
  min-width: fit-content;

  &:hover {
    & * {
      fill: #120e0e;
    }
  }
`;
