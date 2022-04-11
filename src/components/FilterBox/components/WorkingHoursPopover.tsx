import React, { useState, useEffect } from 'react';
import { Popover, MenuItem, styled, Box } from '@mui/material';
import { TPosition } from '../../../interfaces';

type PopoverProps = {
  open: boolean;
  anchorEl: HTMLButtonElement | null;
  onClose: () => void;
  onChange: (val: TPosition) => void;
  value: TPosition | undefined;
};

const Container = styled(Box)({
  padding: '8px 0',
});

const CustomMenuItem = styled(MenuItem)(({ active }: { active: boolean }) => ({
  background: active ? '#B50000' : 'transparent',
}));

export const WorkingHoursPopover = ({
  open,
  anchorEl,
  onClose,
  onChange,
  value,
}: PopoverProps) => {
  const [type, setType] = useState<TPosition>();

  useEffect(() => {
    setType(value);
  }, [value]);

  const handleChange = (val: string) => {
    setType(val as TPosition);
    onChange(val as TPosition);
    onClose();
  };

  const options = [
    { value: 'full', text: 'Full time' },
    { value: 'part', text: 'Part time' },
    { value: 'contract', text: 'contract' },
    { value: 'internship', text: 'internship' },
  ];

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
      <Container>
        {options.map((option) => (
          <CustomMenuItem
            value={option.value}
            key={option.value}
            onClick={() => handleChange(option.value)}
            active={option.value === type}
          >
            {option.text}
          </CustomMenuItem>
        ))}
      </Container>
    </Popover>
  );
};
