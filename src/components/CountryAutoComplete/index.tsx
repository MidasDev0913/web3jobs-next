import React from 'react';
import Image from 'next/image';
import { Autocomplete, TextField, InputAdornment } from '@mui/material';

import SearchIcon from '../../assets/icons/search_icon.svg';
import { getCountryNames } from '../../utils/helper';

type Props = {
  country: string;
  onChange: (arg: string) => void;
};

export const CountryAutoComplete = ({ country, onChange, ...props }: Props) => {
  const countryOptionList = getCountryNames();

  const handleChangeCountry = (
    e: React.SyntheticEvent<Element, Event>,
    value: string | null
  ) => {
    onChange(
      (value === 'United States'
        ? 'USA'
        : value === 'United Kingdom'
        ? 'UK'
        : value) as string
    );
  };

  return (
    <Autocomplete
      {...props}
      value={country}
      onChange={handleChangeCountry}
      options={countryOptionList}
      renderInput={(params) => (
        <TextField
          {...params}
          inputProps={{
            ...params.inputProps,
            startAdornment: (
              <InputAdornment position="start">
                <Image src={SearchIcon} width={17} height={17} />
              </InputAdornment>
            ),
            placeholder: 'country',
            autoComplete: 'new-password', // disable autocomplete and autofill
          }}
        />
      )}
    />
  );
};
