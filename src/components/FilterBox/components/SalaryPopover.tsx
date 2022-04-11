import React, { useState, SyntheticEvent, useEffect } from 'react';
import { Popover, Box, Slider } from '@mui/material';

type PopoverProps = {
  open: boolean;
  anchorEl: HTMLButtonElement | null;
  onClose: () => void;
  onChange: (val: number) => void;
  value: number | undefined;
};

export const SalaryPopover = ({
  open,
  anchorEl,
  onClose,
  onChange,
  value,
}: PopoverProps) => {
  const [val, setValue] = useState<number>(0);

  useEffect(() => {
    setValue(value || 0);
  }, [value]);

  const handleChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number);
  };

  const handleChangeCommitted = (
    event: Event | SyntheticEvent<Element, Event>,
    newValue: number | number[]
  ) => {
    onChange(newValue as number);
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
      <Box padding="8px 11px" style={{ boxSizing: 'border-box' }}>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          width="100%"
          fontSize={13}
        >
          <span>Min Salary:</span>
          <span style={{ width: 80, fontWeight: 500 }}>${val}k/year</span>
        </Box>
        <Box mt="13px" ml="11px">
          <Slider
            aria-label="Volume"
            max={200}
            value={val}
            onChange={handleChange}
            onChangeCommitted={handleChangeCommitted}
          />
        </Box>
      </Box>
    </Popover>
  );
};
