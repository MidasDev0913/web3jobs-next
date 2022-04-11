import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
  styled,
  Stack,
  Box,
  TextField,
  InputAdornment,
  Button,
  Slider,
  Typography,
  IconButton,
  Autocomplete,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import { RootState } from '../../redux/store';
import { areSameInSearchBox, insertItemToArray } from '../../utils/helper';
import SearchIcon from '../../assets/icons/search_icon.svg';
import { CountryAutoComplete } from '../../components/CountryAutoComplete';
import { AppDropdown } from '../../components/Dropdown';
import FavIcon from '../../components/SVGIcons/FavIcon';
import ArrowRightIcon from '../../components/SVGIcons/ArrowRightIcon_2';
const FilterTag = React.lazy(() => import('../../components/FilterTag'));
const ConnectWalletModal = React.lazy(
  () => import('../../components/Modals/ConnectWalletConfirm')
);

interface ComponentProps {
  onSearch: (arg: any) => void;
  onClose: () => void;
  settings: any;
}

const Container = styled(Stack)`
  & .MuiOutlinedInput-input,
  .MuiAutocomplete-input {
    padding: 12px 14px !important;
  }
  & .MuiOutlinedInput-root {
    background: #1a1a2c;
    & .MuiOutlinedInput-input {
      font-size: 12px;
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
  & .job-type-dropdown {
    & .MuiSelect-select.MuiOutlinedInput-input {
      padding: 10px 32px 10px 16px !important;
    }
    & .expand-icon {
      transform: scale(0.7);
    }
  }
  & .search-input {
    & input {
      padding-left: 48px !important;
    }
    & .MuiInputAdornment-root {
      &.MuiInputAdornment-positionEnd {
        position: absolute;
        right: 20px;
      }
      &.MuiInputAdornment-positionStart {
        position: absolute;
        left: 20px;
      }
    }
  }
`;

const FilterSidebar: React.FC<ComponentProps> = ({
  onSearch,
  onClose,
  settings,
}) => {
  const [filterSettings, setFilterSettings] = useState<any>({});
  const [openConnectWalletModal, setOpenConnectWalletModal] =
    useState<boolean>(false);
  const { tags, suggestions } = useSelector((state: RootState) => state.common);
  const { isLoggedIn } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    setFilterSettings(settings);
  }, [settings]);

  const handleClickTag = (tag: string) => {
    const tags = [...(filterSettings.activeTags || [])];
    setFilterSettings({
      ...filterSettings,
      activeTags: insertItemToArray(tags, tag),
    });
  };

  const handleChangeSearchKey = (e: any, value: any) => {
    setFilterSettings({
      ...filterSettings,
      searchKey: value,
    });
  };

  const handleChangeCountry = (value: string) => {
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

  const handleChangeSalary = (event: Event, newValue: number | number[]) => {
    setFilterSettings({
      ...filterSettings,
      salary: newValue as number,
    });
  };

  return (
    <Container
      width="100%"
      height="100%"
      bgcolor="#05050D"
      px={2}
      py={1}
      boxSizing="border-box"
    >
      <Box display="flex" width="100%" justifyContent="end">
        <IconButton
          aria-label="delete"
          size="large"
          sx={{ backgroundColor: 'rgba(158, 158, 158, 0.25)' }}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      </Box>
      <Box
        display="flex"
        alignItems="center"
        flexWrap="wrap"
        width={{ xs: '100%' }}
        position="relative"
        boxSizing="border-box"
      >
        {tags.map((tag: string, _i: number) => (
          <Box mx={{ xs: '2.5px' }} my={{ xs: '7.5px' }} key={_i}>
            <FilterTag
              text={tag}
              active={(filterSettings.activeTags || []).includes(tag)}
              onClick={() => handleClickTag(tag)}
              disabled={(filterSettings.activeTags || []).length === 2}
            />
          </Box>
        ))}
      </Box>
      <Box className="search-input" mt={4} width="100%">
        <Autocomplete
          freeSolo
          disableClearable
          value={filterSettings.searchKey || ''}
          onChange={handleChangeSearchKey}
          onInputChange={handleChangeSearchKey}
          filterOptions={areSameInSearchBox}
          options={suggestions}
          renderInput={(params) => (
            <TextField
              {...params}
              InputLabelProps={{
                shrink: false,
              }}
              InputProps={{
                ...params.InputProps,
                startAdornment: (
                  <InputAdornment position="start">
                    <img src={SearchIcon} width="17px" height="17px" />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment
                    position="end"
                    className="cursor__pointer"
                    style={{
                      visibility: filterSettings.searchKey
                        ? 'visible'
                        : 'hidden',
                    }}
                  >
                    <Box
                      display="flex"
                      alignItems="center"
                      onClick={() => {
                        setFilterSettings({
                          ...filterSettings,
                          searchKey: '',
                        });
                      }}
                    >
                      <CloseIcon fontSize="inherit" />
                    </Box>
                  </InputAdornment>
                ),
                placeholder: 'Search',
              }}
            />
          )}
        />
      </Box>
      <Stack direction="row" mt={3}>
        <Box flex={1} mr={1}>
          <CountryAutoComplete
            key="filterbar-country-autocomplete"
            country={filterSettings.location}
            onChange={handleChangeCountry}
          />
        </Box>
        <Box className="job-type-dropdown" width="106px">
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
        </Box>
      </Stack>
      <Box mt={3.5} style={{ boxSizing: 'border-box' }}>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          width="100%"
          fontSize={13}
        >
          <span>Min Salary:</span>
          <span style={{ width: 80, fontWeight: 500 }}>
            ${filterSettings.salary || 0}k/year
          </span>
        </Box>
        <Box mt="13px" ml="11px">
          <Slider
            aria-label="Volume"
            max={200}
            value={filterSettings.salary}
            onChange={handleChangeSalary}
          />
        </Box>
      </Box>
      <Button
        onClick={() => {
          onSearch(filterSettings);
          onClose();
        }}
        sx={{ py: '13px', fontSize: '12px' }}
      >
        Search
      </Button>
      <Typography
        fontSize={12}
        mt="20px"
        textAlign="center"
        onClick={() => {
          onSearch({});
          onClose();
        }}
      >
        Remove all filters
      </Typography>
      <Stack mt="auto">
        <Box
          width="100%"
          height="1px"
          bgcolor="rgba(25, 159, 217, 0.19)"
          mt={2.25}
        />
        <Box
          display="flex"
          justifyContent="space-between"
          py="13px"
          onClick={() => {
            if (isLoggedIn) {
              onSearch({ ...filterSettings, favorite: true });
              onClose();
            } else {
              setOpenConnectWalletModal(true);
            }
          }}
        >
          <Box display="flex">
            <FavIcon color={'#FFC700'} isFill />
            <Typography fontWeight={500} fontSize={13} ml={1}>
              My Favorites
            </Typography>
          </Box>
          <Box>
            <ArrowRightIcon />
          </Box>
        </Box>
      </Stack>
      <ConnectWalletModal
        open={openConnectWalletModal}
        onClose={() => setOpenConnectWalletModal(false)}
      />
    </Container>
  );
};

export default FilterSidebar;
