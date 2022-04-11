import React from 'react';
import { FormHelperText, styled } from '@mui/material';
import InfoIcon from '../../assets/icons/info_icon.svg';

const CustomFormHelperText = styled(FormHelperText)(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    padding: '2px 10px',
    width: 'calc(100% - 20px)',
    fontSize: 12,
    '& img': {
      width: 12,
      height: 12,
      marginRight: 4,
    },
  },
}));

export const ErrorMessage = () => (
  <CustomFormHelperText>
    <img src={InfoIcon} />
    Please fill out this field.
  </CustomFormHelperText>
);
