import React from 'react';
import {
  Box,
  RadioGroup,
  Radio,
  FormControlLabel,
  Typography,
} from '@mui/material';
import { AppRadioGroupContainer } from './index.styles';
import { TOption } from '../../interfaces';

interface AppRadioGroupProps {
  label?: any;
  row?: boolean;
  options: TOption[];
  value?: string;
  onChange: (arg: string) => void;
}

export const AppRadioGroup = ({
  label,
  row,
  options,
  value,
  onChange,
}: AppRadioGroupProps) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange((event.target as HTMLInputElement).value);
  };
  return (
    <AppRadioGroupContainer>
      {label && (
        <Box
          mb="11px"
          fontSize={{ xs: 13, md: 18 }}
          fontWeight={500}
          color="#fff"
        >
          {label}
        </Box>
      )}
      <RadioGroup
        row={row}
        name="row-radio-buttons-group"
        value={value || ''}
        onChange={handleChange}
      >
        {options.map((option) => (
          <FormControlLabel
            value={option.value}
            control={<Radio />}
            label={
              <Typography fontSize={{ xs: 12, md: 15 }}>
                {option.text}
              </Typography>
            }
            key={option.value}
          />
        ))}
      </RadioGroup>
    </AppRadioGroupContainer>
  );
};
