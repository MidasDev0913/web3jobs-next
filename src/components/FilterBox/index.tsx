import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import { Box, Stack, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useSelector } from 'react-redux';

import {
  FilterBoxWrapper,
  FilterButton,
  SettingWrapper,
  SettingButton,
} from './index.styles';
import { SalaryPopover } from './components/SalaryPopover';
import { WorkingHoursPopover } from './components/WorkingHoursPopover';
import { LocationPopover } from './components/LocationPopover';

import FilterIcon from '../SVGIcons/FilterIcon';
import MoneyIcon from '../SVGIcons/FilledMoneyIcon';
import LocationIcon from '../SVGIcons/FilledLocationIcon';
import FavIcon from '../SVGIcons/FilledFavIcon';
import ClockIcon from '../SVGIcons/FilledClockIcon';
import ArrowDownIcon from '../../assets/icons/arrow_up_tri_icon.svg';
import { TPosition } from '../../interfaces';
import ConnectWalletModal from '../Modals/ConnectWalletConfirm';
import { WORKING_HOURS_MAPPING } from '../../utils/constants';
import { RootState } from '../../redux/store';

export type FilterBoxProps = {
  filterSettings: any;
  setFilterSettings: (arg: any, noScroll?: boolean) => void;
  handleClickTag: (arg: string) => void;
};

const FilterBox = ({
  filterSettings,
  setFilterSettings,
  handleClickTag,
}: FilterBoxProps) => {
  console.log("midas Filtersettings", filterSettings)
  const { isLoggedIn } = useSelector((state: RootState) => state.auth);
  const [isExpanded, setIsExpanded] = useState<boolean>(true);
  const [anchorSalaryEl, setAnchorSalaryEl] =
    React.useState<HTMLButtonElement | null>(null);
  const [anchorLocationEl, setAnchorLocationEl] =
    React.useState<HTMLButtonElement | null>(null);
  const [anchorWorkingHoursEl, setAnchorWorkingHoursEl] =
    React.useState<HTMLButtonElement | null>(null);
  const [openConnectWalletModal, setOpenConnectWalletModal] =
    useState<boolean>(false);

  const handleToggleExpand = () => {
    setIsExpanded((prev) => !prev);
  };

  const handleClickSalary = (e: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorSalaryEl(e.currentTarget);
  };

  const handleClickLocation = (e: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorLocationEl(e.currentTarget);
  };

  const handleClickFav = () => {
    if (!isLoggedIn) {
      setOpenConnectWalletModal(true);
      return;
    }
    setFilterSettings({
      ...filterSettings,
      favorite: !filterSettings.favorite,
    });
  };

  const handleClickWorkingHours = (e: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorWorkingHoursEl(e.currentTarget);
  };

  const handleChangeSalary = (value: number) => {
    setFilterSettings({
      ...filterSettings,
      salary: value,
    });
  };

  const handleChangeLocation = (value: string) => {
    setFilterSettings({
      ...filterSettings,
      location: value,
    });
  };

  const handleChangeRemote = (value: boolean) => {
    setFilterSettings({
      ...filterSettings,
      isRemote: value,
    });
  };

  const handleChangePosition = (value: TPosition) => {
    setFilterSettings({
      ...filterSettings,
      position: value,
    });
  };

  const handleClearAllSettings = () => {
    setFilterSettings({
      salary: undefined,
      location: undefined,
      isRemote: undefined,
      position: undefined,
      favorite: undefined,
      city: undefined,
      company: undefined,
      search: undefined,
      tags: undefined,
    });
  };

  const handleClear =
    (field: string) => (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      setFilterSettings({
        ...filterSettings,
        [field]: undefined,
      });
    };

  const isVisibleRemoveAll = useMemo(() => {
    return Object.values(filterSettings).some((v: any) => {
      if (typeof v === 'boolean') return v;
      if (typeof v === 'string') return Boolean(v);
      if (typeof v === 'number') return Boolean(v);
      if (Array.isArray(v)) return v.length > 0;
      return false;
    });
  }, [filterSettings]);

  return (
    <FilterBoxWrapper
      id="home-filter-box"
      style={{
        justifyContent: isExpanded ? 'center' : 'flex-end',
        alignItems: 'flex-start',
      }}
    >
      {isExpanded && (
        <Stack direction="column" alignItems="center" zIndex={1}>
          <SettingWrapper display={{ xs: 'none', md: 'flex' }}>
            <SettingButton
              active={Boolean(anchorSalaryEl)}
              onClick={handleClickSalary}
              sx={{ mt: { xs: 1, md: 0 } }}
            >
              <MoneyIcon />
              <span>salary</span>
              <Image src={ArrowDownIcon} width={13} height={7} />
            </SettingButton>
            <SettingButton
              active={Boolean(anchorLocationEl)}
              onClick={handleClickLocation}
              sx={{ mt: { xs: 1, md: 0 } }}
            >
              <LocationIcon />
              <span>location</span>
              <Image src={ArrowDownIcon} width={13} height={7} />
            </SettingButton>
            <SettingButton
              onClick={handleClickFav}
              sx={{ mt: { xs: 1, md: 0 } }}
            >
              <FavIcon />
              <span>favorite</span>
            </SettingButton>
            <SettingButton
              active={Boolean(anchorWorkingHoursEl)}
              width={'210px'}
              onClick={handleClickWorkingHours}
              sx={{ mt: { xs: 1, md: 0 } }}
            >
              <ClockIcon />
              <span style={{ whiteSpace: 'nowrap' }}>Type</span>
              <img src={ArrowDownIcon.src} />
            </SettingButton>
            <SalaryPopover
              value={filterSettings.salary}
              open={Boolean(anchorSalaryEl)}
              anchorEl={anchorSalaryEl}
              onClose={() => setAnchorSalaryEl(null)}
              onChange={handleChangeSalary}
            />
            <LocationPopover
              value={filterSettings.location}
              isRemote={filterSettings.isRemote}
              open={Boolean(anchorLocationEl)}
              anchorEl={anchorLocationEl}
              onClose={() => setAnchorLocationEl(null)}
              onChange={handleChangeLocation}
              onChangeRemote={handleChangeRemote}
            />
            <WorkingHoursPopover
              value={filterSettings.position}
              open={Boolean(anchorWorkingHoursEl)}
              anchorEl={anchorWorkingHoursEl}
              onClose={() => setAnchorWorkingHoursEl(null)}
              onChange={handleChangePosition}
            />
          </SettingWrapper>
          <Stack direction="row" flexWrap="wrap" justifyContent="center">
            {Boolean(filterSettings.salary) && (
              <SettingButton
                active
                width="auto"
                sx={{ height: 30, marginTop: 1 }}
              >
                <MoneyIcon />
                <span>{`${filterSettings.salary}k`}</span>
                <IconButton
                  aria-label="delete"
                  size="small"
                  onClick={handleClear('salary')}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              </SettingButton>
            )}
            {Boolean(filterSettings.location) && (
              <SettingButton
                active
                width="auto"
                sx={{ height: 30, marginTop: 1 }}
              >
                <LocationIcon />
                <span>{filterSettings.location}</span>
                <IconButton
                  aria-label="delete"
                  size="small"
                  onClick={handleClear('location')}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              </SettingButton>
            )}
            {Boolean(filterSettings.favorite) && (
              <SettingButton
                active
                width="auto"
                sx={{ height: 30, marginTop: 1 }}
              >
                <FavIcon />
                <span>favorite</span>
                <IconButton
                  aria-label="delete"
                  size="small"
                  onClick={handleClear('favorite')}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              </SettingButton>
            )}
            {Boolean(filterSettings.position) && (
              <SettingButton
                active
                width="auto"
                sx={{ height: 30, marginTop: 1 }}
              >
                <ClockIcon />
                <span>
                  {WORKING_HOURS_MAPPING[filterSettings.position as TPosition]}
                </span>
                <IconButton
                  aria-label="delete"
                  size="small"
                  onClick={handleClear('position')}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              </SettingButton>
            )}
            {Boolean(filterSettings.city) && (
              <SettingButton
                active
                width="auto"
                sx={{ height: 30, marginTop: 1 }}
              >
                <span>{filterSettings.city}</span>
                <IconButton
                  aria-label="delete"
                  size="small"
                  onClick={handleClear('city')}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              </SettingButton>
            )}
            {Boolean(filterSettings.company) && (
              <SettingButton
                active
                width="auto"
                sx={{ height: 30, marginTop: 1 }}
              >
                <span>{filterSettings.company}</span>
                <IconButton
                  aria-label="delete"
                  size="small"
                  onClick={handleClear('company')}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              </SettingButton>
            )}
            {Boolean(filterSettings.search) && (
              <SettingButton
                active
                width="auto"
                sx={{
                  height: 30,
                  textTransform: 'none',
                  marginTop: 1,
                }}
              >
                <span>{filterSettings.search}</span>
                <IconButton
                  aria-label="delete"
                  size="small"
                  onClick={handleClear('search')}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              </SettingButton>
            )}
            {Boolean(filterSettings.isRemote) && (
              <SettingButton
                active
                width="auto"
                sx={{
                  height: 30,
                  textTransform: 'none',
                  marginTop: 1,
                }}
              >
                <span>Remote</span>
                <IconButton
                  aria-label="delete"
                  size="small"
                  onClick={handleClear('isRemote')}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              </SettingButton>
            )}
            {filterSettings.tags &&
              (filterSettings.tags || []).length > 0 &&
              (filterSettings.tags || []).map((tag: string) => (
                <SettingButton
                  active
                  width="auto"
                  sx={{
                    height: 30,
                    textTransform: 'none',
                    marginTop: 1,
                  }}
                  key={tag}
                >
                  <span>{tag}</span>
                  <IconButton
                    aria-label="delete"
                    size="small"
                    onClick={() => handleClickTag(tag)}
                  >
                    <CloseIcon fontSize="inherit" />
                  </IconButton>
                </SettingButton>
              ))}
          </Stack>

          {isVisibleRemoveAll && (
            <Box
              fontSize={14}
              fontWeight={500}
              lineHeight="14px"
              mt={2}
              style={{ cursor: 'pointer' }}
              onClick={handleClearAllSettings}
            >
              Remove all filters
            </Box>
          )}
        </Stack>
      )}
      <Box
        className="filter-wapper"
        zIndex={10}
        onClick={handleToggleExpand}
        display={{ xs: 'none', md: 'flex' }}
      >
        <FilterButton>
          <FilterIcon />
        </FilterButton>
        <span>Filter</span>
      </Box>
      <ConnectWalletModal
        open={openConnectWalletModal}
        onClose={() => setOpenConnectWalletModal(false)}
      />
    </FilterBoxWrapper>
  );
};

export default FilterBox;
