import { styled, Box } from '@mui/material';

export const DiffSection = styled(Box)`
  & * {
    color: currentcolor;
    font-family: inter;
  }
  & td[class*='marker']:nth-of-type(3) {
    border-left: 2px solid #a3a1a120;
  }
  & td[class*='title-block'] {
    padding-left: 20px;
  }
`;
