import React from 'react';
import { Modal, Box, styled, Button, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import WarningSVG from '../../assets/images/warning_circle.svg';

type JobTakenOfflinePopupProps = {
  open: boolean;
  onClose: () => void;
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
  background: '#B50000',
  display: 'flex',
  alignItems: 'center',
  margin: 'auto',
  borderRadius: 5,
  fontWeight: 500,
  fontSize: '15px',
  lineHeight: '100%',
  width: '100%',
  padding: '16px 0',
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
      fontSize: 15,
      lineHeight: '22.5px',
      color: '#fff',
      textAlign: 'center',
      marginTop: 7,
    },
  },
});

const JobTakenOfflinePopup = ({ open, onClose }: JobTakenOfflinePopupProps) => {
  return (
    <Modal open={open} onClose={onClose}>
      <ContainerBox>
        <Box className="modal-header">
          <span className="modal-header-title">Alert</span>
          <CloseButton aria-label="delete" size="small" onClick={onClose}>
            <CloseIcon fontSize="small" />
          </CloseButton>
        </Box>
        <Box className="modal-body">
          <img className="modal-body-logo" src={WarningSVG} />
          <Box className="modal-body-text">
            This job cannot be taken online because it has been taken offline by
            our moderators. You can appeal this decision by contacting support.
          </Box>
          <Box display="flex" mt="15px" width="100%">
            <CancelButton href="mailto:support@web3.jobs">
              Contact Support
            </CancelButton>
          </Box>
        </Box>
      </ContainerBox>
    </Modal>
  );
};

export default JobTakenOfflinePopup;
