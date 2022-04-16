import React from 'react';
import {
  Stack,
  Typography,
  IconButton,
  Box,
  FormControlLabel,
  styled,
  Radio,
  RadioGroup,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { JobFilterType } from '../../interfaces';

type ComponentProps = {
  onClose: () => void;
  filterBy: JobFilterType;
  setFilterBy: (arg: JobFilterType) => void;
};

const ColorsByType: any = {
  pending: '#FFA51B',
  inactive: '#B50000',
  active: '#00AA25',
  draft: '#2684FF',
};

const RadioWrapper = styled(Stack)({
  '& .MuiFormControlLabel-root': {
    width: '100%',
    justifyContent: 'space-between',
    margin: 0,
  },
});

const FilterDrawer: React.FC<ComponentProps> = ({
  filterBy,
  setFilterBy,
  onClose,
}) => {
  const options = [
    { value: 'pending', text: 'Pending' },
    { value: 'inactive', text: 'Offline' },
    { value: 'active', text: 'Online' },
    { value: 'draft', text: 'Draft' },
  ];

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilterBy((event.target as HTMLInputElement).value as JobFilterType);
    onClose();
  };

  return (
    <Stack
      padding="17px 31px 38px"
      boxSizing="border-box"
      borderRadius="20px 20px 0px 0px"
    >
      <Stack
        direction="row"
        width="100%"
        alignItems="center"
        justifyContent="space-between"
        position="relative"
      >
        <Typography fontSize={15} lineHeight={1} fontWeight={700}>
          Filter by
        </Typography>
        <IconButton onClick={onClose}>
          <CloseIcon fontSize="small" />
        </IconButton>
      </Stack>
      <RadioWrapper mt="29px">
        <RadioGroup value={filterBy || ''} onChange={handleChange}>
          {options.map((option) => (
            <FormControlLabel
              value={option.value}
              control={<Radio />}
              labelPlacement="start"
              label={
                <Box display="flex" alignItems="center">
                  <Box
                    width="9px"
                    height="9px"
                    borderRadius="9px"
                    bgcolor={ColorsByType[option.value]}
                  />
                  <Typography ml="21px" fontSize={14} lineHeight={1}>
                    {option.text}
                  </Typography>
                </Box>
              }
              key={option.value}
            />
          ))}
        </RadioGroup>
      </RadioWrapper>
    </Stack>
  );
};

export default FilterDrawer;
