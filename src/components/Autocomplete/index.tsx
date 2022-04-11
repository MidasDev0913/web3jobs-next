import React, { useState, useEffect } from 'react';
import { Box, Autocomplete, TextField } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';

import ClearIcon from '@mui/icons-material/Clear';

import { AppDropdownContainer } from './index.styles';
import { TOption } from '../../interfaces';

type AppAutocompleteProps = {
  freeSolo?: boolean;
  value?: string;
  options: TOption[];
  label?: string;
  placeholder?: string;
  error?: boolean;
  maxLength?: number;
  displayLength?: boolean;
  onChange: (arg: string) => void;
};

const useStyles = makeStyles(() => ({
  root: {
    backgroundColor: 'yellow',
  },
  clearIndicator: {
    backgroundColor: 'gray',
    '& span': {
      '& svg': {
        '& path': {
          d: "path('M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z')", // your svg icon path here
        },
      },
    },
  },
  popupIndicator: {
    backgroundColor: 'blue',
  },
}));

export const AppAutocomplete = ({
  freeSolo,
  options,
  label,
  placeholder,
  onChange,
  error,
  maxLength,
  displayLength,
  value,
  ...props
}: AppAutocompleteProps) => {
  const classes = useStyles();
  const [val, setVal] = useState<string | undefined>();

  useEffect(() => {
    setVal(value);
  }, [value]);

  const handleChangeOption = (e: any, value: any) => {
    setVal(value);
  };
  const handleChangeInput = (e: any, value: any) => {
    setVal(value);
  };
  const handleBlur = () => {
    onChange(val as string);
  };

  return (
    <AppDropdownContainer>
      {label && (
        <Box
          mb="11px"
          fontSize={{ xs: 13, md: '18px' }}
          fontWeight={500}
          color="#fff"
        >
          {label +
            (displayLength ? ` (${val?.length || 0} / ${maxLength || 0})` : '')}
        </Box>
      )}
      <Autocomplete
        freeSolo={freeSolo}
        disableClearable
        value={val || ''}
        onChange={handleChangeOption}
        onInputChange={handleChangeInput}
        options={options.map((option) => option.text)}
        getOptionDisabled={(option) => {
          if (option === 'No organization') {
            return true;
          }

          return false;
        }}
        classes={{
          clearIndicator: classes.clearIndicator,
          popupIndicator: classes.popupIndicator,
        }}
        clearIcon={<ClearIcon fontSize="small" />}
        renderInput={(params) => (
          <TextField
            {...params}
            onBlur={handleBlur}
            error={error}
            placeholder={placeholder}
            InputLabelProps={{
              shrink: false,
            }}
            inputProps={{
              ...params.inputProps,
              maxLength: maxLength,
            }}
          />
        )}
      />
    </AppDropdownContainer>
  );
};
