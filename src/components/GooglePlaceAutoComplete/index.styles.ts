import { styled, Box } from '@mui/material';

export const Container = styled(Box)({
  width: '100%',
  '& .MuiAutocomplete-root': {
    width: '100%',
  },
  '& .MuiOutlinedInput-root': {
    '& input': {
      '&:focus': {
        border: 'none',
      },
    },
  },
});
