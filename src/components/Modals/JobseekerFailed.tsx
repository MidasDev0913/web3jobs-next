import React from 'react';
import Image from 'next/image';
import { Modal, Box, styled, Button, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import FailedSVG from '../../assets/images/failed.svg';

type JobSeekerFailedModalProps = {
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
  fontSize: '15px',
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
    padding: '23px 21px 11px 21px',
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
    padding: '24px 20px',
    '& .modal-body-title': {
      marginTop: 9,
    },
    '& .modal-body-text': {
      fontSize: 15,
      lineHeight: '22.5px',
      color: '#fff',
      textAlign: 'center',
      marginTop: 24,
    },
  },
});

const JobSeekerFailedModal = ({
  open,
  onClose,
  onConfirm,
}: JobSeekerFailedModalProps) => {
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
          <img className="modal-body-logo" src={FailedSVG.src} />
          <Box className="modal-body-text">
            You have a jobseeker account, you cannot post jobs.
          </Box>
          <ConfirmButton onClick={onConfirm}>
            <Box ml={2}>Back to Homepage</Box>
          </ConfirmButton>
        </Box>
      </ContainerBox>
    </Modal>
  );
};

export default JobSeekerFailedModal;
