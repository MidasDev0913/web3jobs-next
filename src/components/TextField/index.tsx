import React, { useState, useEffect } from 'react';
import { TextField, TextFieldProps, Box } from '@mui/material';
import { AppTextFieldContainer, CustomTextField } from './index.styles';

interface AppTextFieldProps {
  label?: string;
  placeholder?: string;
  multiline?: boolean;
  rows?: number;
  value?: string;
  error?: boolean;
  displayLength?: boolean;
  maxLength?: number;
  disableSpecialCharacter?: boolean;
  onChange: (arg: string) => void;
}

export const AppTextField = ({
  label,
  placeholder,
  multiline,
  rows,
  value,
  maxLength,
  error,
  displayLength,
  disableSpecialCharacter,
  onChange,
}: AppTextFieldProps) => {
  const [state, setState] = useState<string>('');
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    if (maxLength && newValue.length > maxLength) return;
    if (disableSpecialCharacter) {
      const val = event.target.value;
      setState(val.replace(/[^\w\s]/gi, ''));
    } else {
      setState(event.target.value);
    }
  };
  const handleBlur = () => {
    onChange(state);
  };

  useEffect(() => {
    setState(value || '');
  }, [value]);

  return (
    <AppTextFieldContainer>
      {label && (
        <Box
          mb="11px"
          fontSize={{ xs: 13, md: 18 }}
          fontWeight={500}
          color="#fff"
          display="flex"
          alignItems="center"
        >
          {label}
          {displayLength && (
            <Box ml="16px" fontSize="16px" fontWeight={500} color="#fff">
              ({state.length} / {maxLength || 100})
            </Box>
          )}
        </Box>
      )}
      <CustomTextField
        placeholder={placeholder}
        multiline={multiline}
        rows={rows || 20}
        value={state}
        onChange={handleChange}
        onBlur={handleBlur}
        error={error}
      />
    </AppTextFieldContainer>
  );
};
