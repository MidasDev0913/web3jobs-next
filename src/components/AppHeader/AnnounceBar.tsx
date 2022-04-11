import React from 'react';
import { Box, Stack, Typography } from '@mui/material';

import AnnounceIcon from '../SVGIcons/AnnounceIcon';
import SmallCloseIcon from '../SVGIcons/CloseIcon';

type ComponentProps = {
  onClose: () => void;
};

const AnnounceBar: React.FC<ComponentProps> = ({ onClose }) => {
  return (
    <Stack
      width="100%"
      direction="row"
      alignItems="center"
      justifyContent="center"
      bgcolor="#05050D"
      border="1px solid #0C3C56"
      boxShadow="0px 0px 18px 2px #131322"
      position="relative"
      sx={{ backdropFilter: 'blur(10px)', boxSizing: 'border-box' }}
      py="6px"
    >
      <Box mr="20px">
        <AnnounceIcon />
      </Box>
      <Typography fontWeight={500}>Special Offer:</Typography>
      <Typography fontWeight={500} color="#199FD9" ml={0.5}>
        Free job posts until August 1st
      </Typography>
      <Box ml="20px">
        <AnnounceIcon />
      </Box>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        bgcolor="#B50000"
        width={21}
        height={21}
        borderRadius={21}
        position="absolute"
        top="50%"
        right={25}
        sx={{ transform: 'translate(0, -50%)' }}
        className="cursor__pointer"
        onClick={onClose}
      >
        <SmallCloseIcon />
      </Box>
    </Stack>
  );
};

export default AnnounceBar;
