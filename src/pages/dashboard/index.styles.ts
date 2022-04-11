import { styled, Stack, Box, Popover } from '@mui/material';

export const ChartWrapper = styled(Stack)`
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

export const TableWrapper = styled(Stack)`
  & .MuiSelect-select {
    padding: 8px 16px;
    padding-right: 40px;
    font-size: 12px;
    line-height: 18px;
    background: transparent;
    width: 80px;
  }

  & .MuiSelect-select.MuiOutlinedInput-input {
    border: none !important;
  }

  & .expand-icon {
    transform: scale(0.7);
  }
  & .MuiSelect-select[aria-expanded='true'] ~ .expand-icon {
    transform: rotate(180deg) scale(0.7);
  }
  & .MuiOutlinedInput-notchedOutline {
    border: none;
  }
`;

export const DataTableContainer = styled(Box)`
  & .MuiPaper-root {
    background: transparent;
  }
  & .MuiTableContainer-root {
    max-height: 325px;
    & .MuiTableCell-root {
      padding: 8px 0px;
    }
  }
`;

export const HeaderWrapper = styled(Box)`
  & .MuiPopover-paper {
    width: 147px;
  }
`;

export const MenuWrapper = styled(Stack)`
  background: #05050d;
  box-shadow: 0px 12px 40px rgba(0, 0, 0, 0.35);
  border-radius: 8px;
  padding: 16px 0;
  width: 100%;
  box-sizing: border-box;
  width: 147px;
  cursor: pointer;

  & .menu-item {
    display: flex;
    align-items: center;
    padding: 4px 16px;
    background: transparent;
    font-size: 14px;
    line-height: 21px;
    & svg {
      margin-right: 8px;
    }

    &:hover {
      background: #b50000;
    }
  }
`;

export const TooltipIcon = styled(Box)`
  &:hover {
    & path {
      fill: #fff;
    }
  }
`;
