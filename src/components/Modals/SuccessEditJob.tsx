import React from 'react';
import { Modal, Box, styled, Button, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

type SuccessEditJobProps = {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
};
const ConfirmButton = styled(Button)({
  display: 'flex',
  alignItems: 'center',
  margin: 'auto',
  marginTop: 30,
  borderRadius: 5,
  fontWeight: 500,
  fontSize: '18px',
  lineHeight: '100%',
  width: 'calc(100% - 32px)',
  color: '#fff',
  padding: '13px 0',
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
  background: '#101010',
  borderRadius: 20,

  '& .modal-header-title': {
    fontWeight: 500,
    fontSize: '18px',
    lineHeight: '22px',
    color: '#fff',
  },
  '& .modal-header': {
    backgroundColor: '#131322',
    padding: '25px 30px 13px 24px',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  '& .modal-body': {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    padding: 24,
    '& .modal-body-title': {
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

const SuccessEditJobPopup = ({
  open,
  onClose,
  onConfirm,
}: SuccessEditJobProps) => {
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
          <span className="modal-body-title">Success</span>
          <ConfirmButton onClick={onConfirm}>
            <Box ml={2}>Back</Box>
          </ConfirmButton>
        </Box>
      </ContainerBox>
    </Modal>
  );
};

export default SuccessEditJobPopup;
