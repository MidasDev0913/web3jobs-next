import React from 'react';
import { IOSSwitch } from './index.styles';
import { FormControlLabel, Typography } from '@mui/material';

type AppToggleProps = {
  label?: string;
  value: boolean;
  placement?: 'start' | 'end';
  onChange: (arg: boolean) => void;
};

export const AppToggle = ({
  label,
  value,
  placement,
  onChange,
}: AppToggleProps) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.checked);
  };
  return (
    <FormControlLabel
      control={
        <IOSSwitch sx={{ m: 1 }} checked={value} onChange={handleChange} />
      }
      label={<Typography fontSize={{ xs: 12, md: 15 }}>{label}</Typography>}
      labelPlacement={placement ?? 'start'}
    />
  );
};
