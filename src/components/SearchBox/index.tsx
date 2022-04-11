import React, { useState, useEffect } from 'react';
import { Box, TextField, InputAdornment, Autocomplete } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import { Container } from './index.styles';
import SearchIcon from '../../assets/icons/home_search_icon.svg';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { areSameInSearchBox } from '../../utils/helper';

interface SearchBoxProps {
  value: string;
  onSearch: (arg: string) => void;
}

const SearchBox = ({ onSearch, value }: SearchBoxProps) => {
  const [val, setValue] = useState<string>('');
  const { suggestions } = useSelector((state: RootState) => state.common);

  useEffect(() => {
    setValue(value || '');
  }, [value]);

  const handleChangeOption = (e: any, value: any) => {
    onSearch(value);
  };

  const handleInputChangeOption = (e: any, value: any) => {
    setValue(value);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.keyCode === 13) {
      onSearch(val);
    }
  };

  return (
    <Container>
      <Autocomplete
        freeSolo
        disablePortal
        disableClearable
        value={value || ''}
        onChange={handleChangeOption}
        onInputChange={handleInputChangeOption}
        options={suggestions}
        filterOptions={areSameInSearchBox}
        renderInput={(params) => (
          <TextField
            {...params}
            onKeyDown={handleKeyDown}
            InputLabelProps={{
              shrink: false,
            }}
            InputProps={{
              ...params.InputProps,
              startAdornment: (
                <InputAdornment position="start">
                  <img src={SearchIcon} width="15px" height="17px" />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment
                  position="end"
                  className="cursor__pointer"
                  style={{ visibility: val ? 'visible' : 'hidden' }}
                >
                  <Box
                    display="flex"
                    alignItems="center"
                    onClick={() => {
                      setValue('');
                      if (value) {
                        onSearch('');
                      }
                    }}
                  >
                    <CloseIcon fontSize="inherit" />
                  </Box>
                </InputAdornment>
              ),
              placeholder: 'try title, company name, tag or location',
            }}
          />
        )}
      />
    </Container>
  );
};

export default SearchBox;
