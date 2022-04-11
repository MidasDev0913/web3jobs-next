import React from 'react';
import { Container } from './index.styles';
import ColorPicker from '../MaterialColorPicker';
import { DEFAULT_HIGHLIGHT_COLOR } from '../../utils/constants';

type ColorPickerProps = {
  value?: string;
  onChange: (arg: string) => void;
  disabled?: boolean;
};

export const AppColorPicker = ({ value, onChange }: ColorPickerProps) => {
  const defaultColor = DEFAULT_HIGHLIGHT_COLOR;
  return (
    // @ts-ignore
    <Container selectedColor={value || defaultColor}>
      <ColorPicker
        name="color"
        defaultValue={defaultColor}
        value={value}
        onChange={onChange}
      />
    </Container>
  );
};
