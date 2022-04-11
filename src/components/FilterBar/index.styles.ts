import { styled, Stack, keyframes } from '@mui/material';

export const BarContainer = styled(Stack)`
  & .MuiOutlinedInput-root .MuiAutocomplete-input:focus {
    border: none;
  }
  & .MuiOutlinedInput-input,
  .MuiAutocomplete-input {
    padding: 8px 14px !important;
  }
  & .MuiOutlinedInput-root {
    background: #1a1a2c;
    & .MuiOutlinedInput-input {
      background: transparent;
      border: none;
    }
  }
  & .salary-section {
    & .MuiSlider-root {
      height: 8px;
      width: 205px;
    }
    & .MuiSlider-track {
      border: none;
    }
  }
  & .location-section {
    & .MuiAutocomplete-root {
      width: 156px;
    }
    & .MuiSwitch-root {
      width: 45px;
      height: 25px;
      & .MuiSwitch-track {
        background: #444444;
      }
      & .MuiSwitch-thumb {
        width: 17.5px;
        height: 17.5px;
      }
      & .MuiSwitch-switchBase.Mui-checked {
        transform: translateX(18px);
      }
    }
  }
  &
    .MuiOutlinedInput-input.MuiSelect-select[aria-expanded='true'].MuiOutlinedInput-input {
    border-radius: 5px;
  }
  & .MuiSelect-select.MuiOutlinedInput-input {
    padding-right: 32px !important;
    padding-left: 32px !important;
  }
`;
