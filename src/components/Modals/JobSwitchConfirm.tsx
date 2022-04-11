import React from 'react';
import { Modal, Box, styled, Button, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import WarningSVG from '../../assets/images/warning_circle.svg';

type JobSwitchConfirmModalProps = {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
};
const ConfirmButton = styled(Button)({
  display: 'flex',
  alignItems: 'center',
  margin: 'auto',
  borderRadius: 5,
  fontWeight: 500,
  fontSize: '15px',
  lineHeight: '100%',
  width: '99px',
  color: '#fff',
  padding: '16px 0',
});

const CancelButton = styled(Button)({
  display: 'flex',
  alignItems: 'center',
  margin: 'auto',
  borderRadius: 5,
  fontWeight: 500,
  fontSize: '15px',
  lineHeight: '100%',
  width: '99px',
  color: '#000',
  background: '#fff',
  border: '1px solid #fff',
  padding: '16px 0',

  '&:hover': {
    color: '#fff',
    background: '#B50000',
    border: '1px solid #B50000',
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
    padding: '13px 30px 13px 24px',
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
    '& .modal-body-title': {
      marginTop: 18,
      fontWeight: 700,
      fontSize: 15,
      lineHeight: '22.5px',
    },
    '& .modal-body-text': {
      fontSize: 13,
      lineHeight: '19.5px',
      color: '#fff',
      textAlign: 'center',
      marginTop: 7,
    },
  },
});

const JobSwitchConfirmModal = ({
  open,
  onClose,
  onConfirm,
}: JobSwitchConfirmModalProps) => {
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
          <img className="modal-body-logo" src={WarningSVG} />
          <span className="modal-body-title">Are you sure?</span>
          <Box className="modal-body-text">
            You about to take this job post offline.
            <br />
            NOTE: Getting it back online counts as posting new job.
          </Box>
          <Box
            display="flex"
            mt="15px"
            width="100%"
            justifyContent="space-evenly"
          >
            <CancelButton onClick={onClose}>No</CancelButton>
            <ConfirmButton onClick={onConfirm}>Sure</ConfirmButton>
          </Box>
        </Box>
      </ContainerBox>
    </Modal>
  );
};

export default JobSwitchConfirmModal;
