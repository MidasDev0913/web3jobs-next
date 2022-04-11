import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Stack, Modal, Typography, IconButton, Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { styled } from '@mui/material/styles';

import SuccessSVG from '../../assets/images/success_circle.svg';

type ComponentProps = {
  jobId: string;
  open: boolean;
  onClose: () => void;
  onBackToHomePage: () => void;
  onViewInManageJobs: () => void;
};

const CloseButton = styled(IconButton)({
  position: 'absolute',
  background: '#9E9E9E20',
  borderRadius: '50%',
  cursor: 'pointer',
  top: 10,
  right: 14,
});

const Container = styled(Stack)`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 868px;
  background: #05050d;
  border: 0.7px solid #199FD9;
  border-radius: 20px;

  ${(props) => props.theme.breakpoints.down('md')} {
    width: 375px;
  }
`;

const ConfirmButton = styled(Button)(({theme}) => ({
  display: 'flex',
  alignItems: 'center',
  marginTop: 46,
  borderRadius: 5,
  fontWeight: 500,
  fontSize: '18px',
  lineHeight: '100%',
  color: '#fff',
  width: '100%',
  padding: '14px 0',

  [theme.breakpoints.down('md')]: {
    fontSize: '15px',
  }
}));

export const FreePostJobSuccess: React.FC<ComponentProps> = ({
  jobId,
  open,
  onClose,
  onBackToHomePage,
  onViewInManageJobs,
}) => {
  const navigate = useNavigate();

  return (
    <Modal open={open} onClose={onClose}>
      <Container>
        <Stack
          direction="row"
          width="100%"
          alignItems="center"
          justifyContent="center"
          position="relative"
        >
          <Typography
            fontSize={20}
            lineHeight="20px"
            fontWeight={600}
            mt="25px"
          >
            Confirmation
          </Typography>
          <CloseButton aria-label="delete" size="small" onClick={onClose}>
            <CloseIcon fontSize="small" />
          </CloseButton>
        </Stack>
        <Stack alignItems="center" padding={{ xs: "38px 51px 51px", md: "95px 99px 48px" }}>
          <img src={SuccessSVG} />
          <Typography
            fontSize={18}
            lineHeight="22px"
            fontWeight={500}
            mt="13px"
          >
            Success
          </Typography>
          <Typography color="#A3A1A1" mt={{xs: 3, md: "37px"}} textAlign="center">
            Your job post will be reviewed by our team.
          </Typography>
          <Typography color="#A3A1A1" textAlign="center">
            (Takes on average thirty minutes until your job post is live).
          </Typography>
          <ConfirmButton onClick={onBackToHomePage}>
            Back to homepage
          </ConfirmButton>
          <Typography
            mt={{xs: 1, md: "21px"}}
            fontSize={{xs: 12, md: 15}}
            className="cursor__pointer"
            onClick={onViewInManageJobs}
          >
            View in Manage Jobs
          </Typography>
        </Stack>
      </Container>
    </Modal>
  );
};
