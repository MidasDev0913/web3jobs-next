import React, { useState, useMemo } from 'react';
import { Box, Stack, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

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

export type FilterBoxProps = {
  account: string | undefined | null;
  filterSettings: any;
  setFilterSettings: (arg: any, noScroll?: boolean) => void;
  handleConnectWallet: (arg: () => void) => void;
};

const FilterBox = ({
  account,
  filterSettings,
  setFilterSettings,
  handleConnectWallet,
}: FilterBoxProps) => {
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
    if (!account) {
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
    setFilterSettings(
      {
        ...filterSettings,
        salary: value,
      }
    );
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
    setFilterSettings({});
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
    return Object.values(filterSettings).some(
      (v: any) => v && (v?.length || 0) > 0
    );
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
              <img src={ArrowDownIcon} width="13px" height="7px" />
            </SettingButton>
            <SettingButton
              active={Boolean(anchorLocationEl)}
              onClick={handleClickLocation}
              sx={{ mt: { xs: 1, md: 0 } }}
            >
              <LocationIcon />
              <span>location</span>
              <img src={ArrowDownIcon} width="13px" height="7px" />
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
              <img src={ArrowDownIcon} />
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
            {Boolean(filterSettings.searchKey) && (
              <SettingButton
                active
                width="auto"
                sx={{
                  height: 30,
                  textTransform: 'none',
                  marginTop: 1,
                }}
              >
                <span>{filterSettings.searchKey}</span>
                <IconButton
                  aria-label="delete"
                  size="small"
                  onClick={handleClear('searchKey')}
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
