import React, { FC, useState } from 'react';
import compose from 'recompose/compose';
import withState from 'recompose/withState';

import { TextField, TextFieldProps, InputAdornment } from '@mui/material';

import { DEFAULT_CONVERTER, converters } from './transformers';
import PickerDialog from './PickerDialog';
import PencilIcon from '../SVGIcons/PencilIcon';

type props = {
  defaultValue?: string;
  onChange: (color: string) => void;
  convert?: 'rgba' | 'rgb' | 'hex' | 'rgba_rgb' | 'rgba_hex';
  hintText?: string;
  floatingLabelText?: string;
  showPicker?: boolean;
  internalValue?: string;
  setShowPicker?: (open: boolean) => void;
  setValue?: (value: string) => void;
} & Omit<TextFieldProps, 'onChange'>;

const DefaultColorPicker = ({
  // ColorPicker
  onChange,
  convert,

  // Text field
  name,
  id,
  hintText,
  placeholder,
  floatingLabelText,
  label,
  value,
  defaultValue,

  ...custom
}: props) => {
  const [showPicker, setShowPicker] = useState<boolean>();
  const [internalValue, setValue] = useState<string>(defaultValue as string);

  return (
    <>
      {/*
      @ts-ignore */}
      <TextField
        name={name}
        id={id}
        label={floatingLabelText || label}
        placeholder={hintText || placeholder}
        onClick={() => setShowPicker(true)}
        onChange={(e) => {
          setValue(e.target.value);
          onChange(e.target.value);
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <PencilIcon />
            </InputAdornment>
          ),
          style: {
            color: value === undefined ? internalValue : (value as string),
          },
        }}
        {...custom}
      />
      {showPicker && (
        <PickerDialog
          value={value === undefined ? internalValue : (value as string)}
          onClick={() => {
            setShowPicker && setShowPicker(false);
            onChange(value as string);
          }}
          onChange={(c) => {
            const newValue = converters[convert || 'rgb'](c);
            setValue && setValue(newValue);
            onChange(newValue);
          }}
        />
      )}
    </>
  );
};

export default DefaultColorPicker;
