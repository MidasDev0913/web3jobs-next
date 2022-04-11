import React, { useState, useEffect, SyntheticEvent } from 'react';
import { useSelector } from 'react-redux';
import {
  Box,
  Slider,
  Stack,
  Typography,
  InputAdornment,
  TextField,
  Autocomplete,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import SearchIcon from '../../assets/icons/search_icon.svg';
import { AppDropdown } from '../Dropdown';
import { AppToggle } from '../ToggleButton';
import { CountryAutoComplete } from '../CountryAutoComplete';
import ClockIcon from '../SVGIcons/FilledClockIcon';
import { BarContainer } from './index.styles';
import { RootState } from '../../redux/store';
import { areSameInSearchBox } from '../../utils/helper';

type ComponentProps = {
  filterSettings: any;
  setFilterSettings: (arg: any) => void;
  onSearch: (arg: string) => void;
};

const FilterBar: React.FC<ComponentProps> = ({
  filterSettings,
  setFilterSettings,
  onSearch,
}) => {
  const [salary, setSalary] = useState<number>(0);
  const [country, setCountry] = useState<string>('');
  const [searchKey, setSearchKey] = useState<string>('');
  const { suggestions } = useSelector((state: RootState) => state.common);

  useEffect(() => {
    setSearchKey(filterSettings.searchKey || '');
  }, [filterSettings.searchKey]);

  useEffect(() => {
    setSalary(filterSettings.salary as number);
  }, [filterSettings.salary]);

  useEffect(() => {
    setCountry(filterSettings.location);
  }, [filterSettings.location]);

  const handleChange = (event: Event, newValue: number | number[]) => {
    setSalary(newValue as number);
  };

  const handleChangeCommitted = (
    event: Event | SyntheticEvent<Element, Event>,
    newValue: number | number[]
  ) => {
    setFilterSettings({
      ...filterSettings,
      salary: newValue as number,
    });
  };

  const handleChangeRemote = (arg: boolean) => {
    setFilterSettings({
      ...filterSettings,
      isRemote: arg,
    });
  };

  const handleChangeCountry = (value: string) => {
    setCountry(value);
    setFilterSettings({
      ...filterSettings,
      location: value,
    });
  };

  const handleChangePosition = (value: string) => {
    setFilterSettings({
      ...filterSettings,
      position: value,
    });
  };

  const handleKeydownSearch = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.keyCode === 13) {
      onSearch(searchKey);
    }
  };

  const handleChangeSearchKey = (e: any, value: any) => {
    onSearch(value);
  };

  const handleInputChangeSearchKey = (e: any, value: any) => {
    setSearchKey(value);
  };

  return (
    <BarContainer
      id="home-filter-bar"
      width="100%"
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      padding="12px 30px"
      bgcolor="#131322"
      zIndex={2}
      position="sticky"
      top={0}
      style={{ boxSizing: 'border-box', transition: 'top 0.3s, opacity 0.2s' }}
      display={{ xs: 'none', md: 'flex' }}
    >
      <Stack direction="row" className="salary-section">
        <Slider
          aria-label="Volume"
          max={200}
          value={salary}
          onChange={handleChange}
          onChangeCommitted={handleChangeCommitted}
        />
        <Box display="flex" alignItems="center" ml={1}>
          <Typography>Min:</Typography>
          <Typography fontWeight={700} ml={1}>
            ${salary || 0}k/year
          </Typography>
        </Box>
      </Stack>
      <Stack direction="row" className="location-section">
        <CountryAutoComplete
          key="filterbar-country-autocomplete"
          country={country}
          onChange={handleChangeCountry}
        />
        <AppToggle
          value={filterSettings.isRemote}
          onChange={handleChangeRemote}
          label="Remote"
        />
      </Stack>
      <Stack position="relative" width={177}>
        <Box
          position="absolute"
          top="50%"
          left={22}
          zIndex={2}
          sx={{ transform: 'translate(-50%, -50%)' }}
        >
          <ClockIcon />
        </Box>

        <AppDropdown
          key="filterbar-working-hours"
          placeholder="Type"
          options={[
            { value: 'full', text: 'Full time' },
            { value: 'part', text: 'Part time' },
            { value: 'contract', text: 'Contract' },
            { value: 'internship', text: 'Internship' },
          ]}
          value={filterSettings.position}
          onChange={handleChangePosition}
        />
      </Stack>
      <Stack width="244px">
        <Autocomplete
          freeSolo
          disableClearable
          value={searchKey || ''}
          onChange={handleChangeSearchKey}
          onInputChange={handleInputChangeSearchKey}
          filterOptions={areSameInSearchBox}
          options={suggestions}
          renderInput={(params) => (
            <TextField
              {...params}
              onKeyDown={handleKeydownSearch}
              InputLabelProps={{
                shrink: false,
              }}
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <InputAdornment position="start">
                    <Box
                      display="flex"
                      alignItems="center"
                      mr={1}
                      visibility={searchKey ? 'visible' : 'hidden'}
                      className="cursor__pointer"
                      onClick={() => {
                        setSearchKey('');
                        if (filterSettings.searchKey) {
                          onSearch('');
                        }
                      }}
                    >
                      <CloseIcon fontSize="inherit" />
                    </Box>
                    <img src={SearchIcon} width="17px" height="17px" />
                  </InputAdornment>
                ),
                placeholder: 'Search',
              }}
            />
          )}
        />
      </Stack>
    </BarContainer>
  );
};

export default FilterBar;
