import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Modal,
  Box,
  Typography,
  styled,
  Button,
  IconButton,
  CircularProgress,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import UpArrowImage from '../../assets/images/up_arrow_green.svg';
import MetamaskIcon from '../../assets/icons/metamask_icon.svg';

type PaymentConfirmModalProps = {
  open: boolean;
  onClose: () => void;
  onConfirm: (arg: number) => void;
  price: number;
  loading: boolean;
};
const ConfirmButton = styled(Button)({
  display: 'flex',
  alignItems: 'center',
  marginTop: 81,
  borderRadius: 5,
  fontWeight: 500,
  fontSize: '18px',
  lineHeight: '100%',
  color: '#fff',
});

const CloseButton = styled(IconButton)({
  background: '#9E9E9E20',
  borderRadius: '50%',
  cursor: 'pointer',
});

const ContainerBox = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 598,
  background: '#101010',
  padding: '31px 31px 63px 31px',
  borderRadius: 20,

  '& .title': {
    fontWeight: 500,
    fontSize: '18px',
    lineHeight: '22px',
    color: '#fff',
  },
  '& .eth_price': {
    fontWeight: 500,
    fontSize: '26px',
    lineHeight: '31px',
    color: '#fff',
    marginTop: '26px',
  },
  '& .dollar_price': {
    fontSize: '20px',
    lineHeight: '24px',
    color: '#A3A1A1',
    marginTop: 7,
  },
});

const PaymentConfirmModal = ({
  open,
  onClose,
  onConfirm,
  price,
  loading,
}: PaymentConfirmModalProps) => {
  const url = 'https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD';
  const [ethPrice, setEthPrice] = useState<number>();

  useEffect(() => {
    axios.get(url).then(({ data }) => {
      setEthPrice(data['USD']);
    });
  }, []);

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <ContainerBox>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          padding="0 20px"
        >
          <span className="title">Payment Summary</span>
          <CloseButton aria-label="delete" size="small" onClick={onClose}>
            <CloseIcon fontSize="small" />
          </CloseButton>
        </Box>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          mt="73px"
        >
          <img src={UpArrowImage} />
          <span className="eth_price">
            -{ethPrice ? price / ethPrice : 0} ETH
          </span>
          <span className="dollar_price">≈ ${price}</span>
        </Box>
        <ConfirmButton
          onClick={() => onConfirm(ethPrice ? price / ethPrice : 0)}
          disabled={loading}
        >
          {loading && <CircularProgress thickness={5} size={24} />}
          <Box ml={2}>Proceed to Metamask</Box>
          <img
            src={MetamaskIcon}
            width="28px"
            height="27px"
            style={{ marginLeft: '12px' }}
          />
        </ConfirmButton>
      </ContainerBox>
    </Modal>
  );
};

export default PaymentConfirmModal;
