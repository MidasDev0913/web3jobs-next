import { styled, Stack } from '@mui/material';

export const MenuWrapper = styled(Stack)`
  background: #05050d;
  box-shadow: 0px 12px 40px rgba(0, 0, 0, 0.35);
  border-radius: 8px;
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
