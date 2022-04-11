import React from 'react';
import {
  Box,
  FormControlLabel,
  FormControl,
  FormGroup,
  Checkbox,
} from '@mui/material';
import { Container } from './index.styles';
import { TOption } from '../../interfaces';

interface AppCheckboxProps {
  label?: any;
  row?: boolean;
  options: TOption[];
  value?: string;
  onChange: (arg: string, v: boolean) => void;
}

export const AppCheckbox = ({
  label,
  row,
  options,
  value,
  onChange,
}: AppCheckboxProps) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.name, event.target.checked);
  };
  return (
    <Container>
      {label && (
        <Box mb="11px" fontSize="18px" fontWeight={500} color="#fff">
          {label}
        </Box>
      )}
      <FormControl component="fieldset" variant="standard">
        <FormGroup>
          {options.map((option) => (
            <FormControlLabel
              value={option.value}
              control={
                <Checkbox
                  checked={value === option.value}
                  onChange={handleChange}
                  name={option.value}
                />
              }
              label={option.text}
              key={option.value}
            />
          ))}
        </FormGroup>
      </FormControl>
    </Container>
  );
};
