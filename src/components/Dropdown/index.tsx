import React, { useRef } from 'react';
import {
  Box,
  FormControl,
  Select,
  MenuItem,
  SelectChangeEvent,
  Button,
} from '@mui/material';
import { AppDropdownContainer } from './index.styles';
import ArrowDownIcon from '../../assets/icons/arrow_down_icon.svg';
import { TOption } from '../../interfaces';

interface AppDropdownProps {
  value?: string;
  options: TOption[];
  label?: string;
  placeholder?: string;
  error?: boolean;
  disablePlaceholder?: boolean;
  enableAddButton?: boolean;
  addButtonText?: string;
  selectablePlaceholder?: boolean;
  onAdd?: () => void;
  onChange: (arg: string) => void;
}

export const AppDropdown = ({
  value,
  options,
  label,
  placeholder,
  error,
  disablePlaceholder,
  selectablePlaceholder,
  addButtonText,
  enableAddButton,
  onAdd,
  onChange,
}: AppDropdownProps) => {
  const selectRef = useRef(null);
  const handleChange = (event: SelectChangeEvent) => {
    onChange(event.target.value as string);
  };

  return (
    <AppDropdownContainer>
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
      <FormControl fullWidth error={error}>
        <Select
          ref={selectRef}
          displayEmpty
          value={value}
          label={label}
          onChange={handleChange}
          IconComponent={() => (
            <Box
              className="expand-icon cursor__pointer"
              style={{ pointerEvents: 'none' }}
            >
              <img src={ArrowDownIcon} width="16px" height="9px" />
            </Box>
          )}
          renderValue={(selected) => {
            const text = options.find((op) => op.value === selected)?.text;
            if (!text) {
              return <span style={{ color: '#ffffff70' }}>{placeholder}</span>;
            }

            return text;
          }}
        >
          {!disablePlaceholder && (
            <MenuItem disabled={!selectablePlaceholder} value="">
              <em style={{ color: '#ffffff70' }}>{placeholder}</em>
            </MenuItem>
          )}
          {options.map((option) => (
            <MenuItem value={option.value} key={option.value}>
              {option.text}
            </MenuItem>
          ))}
          {enableAddButton && (
            <MenuItem value="-1" key="add" className="add-button-menuitem">
              <Button onClick={() => onAdd && onAdd()}>{addButtonText}</Button>
            </MenuItem>
          )}
        </Select>
      </FormControl>
    </AppDropdownContainer>
  );
};
