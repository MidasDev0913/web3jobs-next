import React from 'react';
import {
  Modal,
  Box,
  styled,
  IconButton,
  Typography,
  Link,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import MetaMaskSvg from '../../assets/images/metamask.svg';

type InstallMetamaskModalProps = {
  open: boolean;
  onClose: () => void;
};
const ConfirmButton = styled(Link)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: '#B50000',
  margin: 'auto',
  marginTop: 16,
  borderRadius: 5,
  fontWeight: 500,
  lineHeight: '100%',
  width: 'calc(100% - 32px)',
  color: '#fff',
  padding: '13px 0',
  '&:hover': {
    background: '#fff',
    color: '#000',
  },
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
  width: 320,
  background: '#05050D',
  border: '0.7px solid #199FD9',
  borderRadius: '10px',

  '& .modal-header-title': {
    fontWeight: 500,
    fontSize: '18px',
    lineHeight: '22px',
    color: '#fff',
  },
  '& .modal-header': {
    backgroundColor: '#10101E',
    padding: '12px 30px 13px 24px',
    borderTopLeftRadius: '10px',
    borderTopRightRadius: '10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  '& .modal-body': {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    padding: 24,
    paddingTop: 69,
    '& .modal-body-title': {
      fontWeight: 500,
      marginTop: 9,
    },
    '& .modal-body-text': {
      fontSize: 15,
      lineHeight: '22.5px',
      color: '#fff',
      textAlign: 'center',
      marginTop: 17,
    },
  },
});

const InstallMetamaskModal = ({ open, onClose }: InstallMetamaskModalProps) => {
  return (
    <Modal open={open} onClose={onClose}>
      <ContainerBox>
        <Box className="modal-header">
          <span className="modal-header-title">Confirmation</span>
          <CloseButton aria-label="delete" size="small" onClick={onClose}>
            <CloseIcon fontSize="small" />
          </CloseButton>
        </Box>
        <Box className="modal-body">
          <img className="modal-body-logo" src={MetaMaskSvg} />
          <span className="modal-body-title">Metamask</span>
          <Box
            width="100%"
            height="1px"
            bgcolor="rgba(255, 255, 255, 0.5)"
            mb="19px"
            mt={9}
          />
          <Typography fontSize={14} fontWeight={500}>
            Haven&apos;t got a crypto wallet yet?
          </Typography>
          <ConfirmButton
            href="dapp://web3.jobs"
            target="_blank"
            rel="noreferrer"
            style={{ textDecoration: 'none' }}
            onClick={() => onClose()}
          >
            Learn how to connect
          </ConfirmButton>
        </Box>
      </ContainerBox>
    </Modal>
  );
};

export default InstallMetamaskModal;
