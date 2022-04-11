import React from 'react';
import { Typography } from '@mui/material';
import { ChipBox } from './index.styles';

export type FilterTagProps = {
  text: string;
  active: boolean | undefined;
  disabled?: boolean;
  onClick: () => void;
};

const FilterTag = ({ text, active, disabled, onClick }: FilterTagProps) => {
  return (
    <ChipBox
      p={{xs: 1, md: '13px'}}
      bgcolor={active ? '#EBEFF8' : '#131322'}
      borderRadius="5px"
      disabled={Boolean(disabled && !active)}
      onClick={onClick}
    >
      <Typography fontSize={12} lineHeight={1.5} color={active ? '#131322' : '#EBEFF8'}>{text}</Typography>
    </ChipBox>
  );
};

export default FilterTag;
