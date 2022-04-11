import React, { useEffect, useState } from 'react';
import { Modal, Box, styled, Button, IconButton, Theme } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import EmployerLogo from '../SVGIcons/Employer';
import JobSeekerLogo from '../SVGIcons/JobSeeker';

type JoinOptionModalProps = {
  open: boolean;
  onClose: () => void;
  onConfirm: (type: number) => void;
};
const ConfirmButton = styled(Button)(({ theme }: { theme: Theme }) => ({
  display: 'flex',
  alignItems: 'center',
  margin: 'auto',
  marginTop: 30,
  borderRadius: 5,
  fontWeight: 500,
  fontSize: '18px',
  lineHeight: '100%',
  color: '#fff',
  padding: '13px 0',
  textTransform: 'none',
  width: '100%',

  [theme.breakpoints.down('md')]: {
    fontSize: 12,
  },
}));

const ContainerBox = styled(Box)(({ theme }: { theme: Theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 540,
  background: '#05050D',
  border: '1px solid #199FD9',
  borderRadius: 10,

  '& .modal-header-title': {
    fontWeight: 500,
    fontSize: '18px',
    lineHeight: '22px',
    color: '#fff',
  },
  '& .modal-header': {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'end',
    position: 'relative',
    '& button': {
      position: 'absolute',
      top: 10,
      right: 10,
    },
  },
  '& .modal-body': {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    padding: '37px 51px',
  },
  [theme.breakpoints.down('md')]: {
    width: 320,
    '& .modal-body': {
      padding: '34px 26px',
    },
  },
}));

const OptionBoxContainer = styled(Box)(
  ({ theme, active }: { theme: Theme; active: boolean }) => ({
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    position: 'relative',
    padding: active ? '42px 32px 32px' : '42px 32px 31px 31px',
    border: active ? '1px solid #199FD9' : '2px solid #A3A1A1',
    borderRadius: 10,
    cursor: 'pointer',
    background: active ? '#10101E' : 'transparent',

    '& .active-icon': {
      position: 'absolute',
      top: 9,
      right: 9,
      height: 20,
      width: 20,
      borderRadius: 20,
      border: '2px solid #B50000',
      padding: 2,
      boxSizing: 'border-box',
      '& *': {
        background: '#B50000',
        width: '100%',
        height: '100%',
        borderRadius: '50%',
      },
    },
    '& .box-text': {
      fontSize: 15,
      lineHeight: '150%',
      color: '#F8F8F8',
      textAlign: 'center',
      marginTop: 15,
      width: 134,
      minHeight: 54
    },
    [theme.breakpoints.down('md')]: {
      padding: active ? '34px 14px 30px' : '34px 14px 29px 13px',
      '& .active-icon': {
        top: 7,
        right: 7,
        height: 16,
        width: 16,
        borderRadius: 16,
      },
      '& .box-text': {
        fontSize: 12,
        marginTop: 9,
        width: 96,
      },
    },
  })
);

const OptionBox = ({
  active,
  icon,
  text,
  onClick,
}: {
  active?: boolean;
  icon: any;
  text: string;
  onClick: () => void;
}) => {
  return (
    //@ts-ignore
    <OptionBoxContainer active={Boolean(active)} onClick={onClick}>
      {icon}
      <span className="box-text">{text}</span>
      {active && (
        <Box className="active-icon">
          <Box />
        </Box>
      )}
    </OptionBoxContainer>
  );
};

const JoinOptionModal = ({
  open,
  onClose,
  onConfirm,
}: JoinOptionModalProps) => {
  const [type, setType] = useState<number>(0);

  return (
    <Modal open={open} onClose={onClose}>
      <ContainerBox>
        <Box className="modal-body">
          <Box
            width="100%"
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <OptionBox
              active={type === 0}
              icon={<EmployerLogo />}
              text="I'm an employer looking to hire"
              onClick={() => setType(0)}
            />

            <OptionBox
              active={type === 1}
              icon={<JobSeekerLogo />}
              text="I'm a job applicant looking for work"
              onClick={() => setType(1)}
            />
          </Box>
          <ConfirmButton onClick={() => onConfirm(type)}>
            <Box ml={2}>Join as a {type === 0 ? 'Employer' : 'Job Applicant'}</Box>
          </ConfirmButton>
        </Box>
      </ContainerBox>
    </Modal>
  );
};

export default JoinOptionModal;
