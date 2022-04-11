import React, { useState, useEffect } from 'react';
import { Popover, styled, Box } from '@mui/material';
import { AppToggle } from '../../ToggleButton';
import { CountryAutoComplete } from '../../CountryAutoComplete';

type PopoverProps = {
  open: boolean;
  anchorEl: HTMLButtonElement | null;
  value: string | undefined;
  isRemote: boolean | undefined;
  onClose: () => void;
  onChange: (val: string) => void;
  onChangeRemote: (val: boolean) => void;
};

const Container = styled(Box)({
  padding: '8px 11px',
  '& .MuiAutocomplete-root': {
    background: '#05050D',
    width: 221,
    height: 36,
  },
  '& .MuiOutlinedInput-root': {
    width: '100%',
    background: '#05050D',
    height: 36,

    '& input': {
      border: 'none',
      background: 'transparent',
      height: 24,
      padding: '6px 6px 6px 6px !important',
      '&::placeholder': {
        color: '#A3A1A1',
      },
    },
    '& .MuiInputAdornment-root': {
      position: 'absolute',
      left: 19,
    },
  },
  '& .MuiSwitch-root': {
    width: 45,
    height: 25,

    '& .MuiSwitch-track': {
      background: '#444',
    },
    '& .MuiSwitch-switchBase.Mui-checked': {
      transform: 'translateX(18px)',
    },
    '& .MuiSwitch-thumb': {
      width: 17,
      height: 17,
    },
  },
});

export const LocationPopover = ({
  open,
  anchorEl,
  value,
  isRemote,
  onClose,
  onChange,
  onChangeRemote,
}: PopoverProps) => {
  const [country, setCountry] = useState<string>('');
  const [remote, setIsRemote] = useState<boolean>(false);

  useEffect(() => {
    setCountry(value || '');
  }, [value]);

  useEffect(() => {
    setIsRemote(Boolean(isRemote));
  }, [isRemote]);

  const handleChangeCountry = (value: string) => {
    setCountry(value as string);
    onChange(value as string);
  };

  const handleChangeRemote = (arg: boolean) => {
    setIsRemote(arg);
    onChangeRemote(arg);
  };

  return (
    <Popover
      open={open}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
    >
      <Container display="flex" alignItems="center">
        <CountryAutoComplete
          key="filterbox-country-autocomplete"
          country={country}
          onChange={handleChangeCountry}
        />
        <AppToggle
          value={remote}
          onChange={handleChangeRemote}
          label="Remote"
        />
      </Container>
    </Popover>
  );
};
