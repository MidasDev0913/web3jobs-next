import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { Stack, Modal, Typography, IconButton, Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { styled } from '@mui/material/styles';

import SuccessSVG from '../../assets/images/success_circle.svg';

type ComponentProps = {
  jobId: string | undefined;
  open: boolean;
  onClose: () => void;
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
`;

const ConfirmButton = styled(Button)({
  display: 'flex',
  alignItems: 'center',
  marginTop: 46,
  borderRadius: 5,
  fontWeight: 500,
  fontSize: '18px',
  lineHeight: '100%',
  color: '#fff',
  width: 670,
  padding: '14px 0',
});

export const EditJobSuccess: React.FC<ComponentProps> = ({
  jobId,
  open,
  onClose,
}) => {
  const router = useRouter();

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
        <Stack alignItems="center" padding="95px 99px 48px">
          <img src={SuccessSVG.src} />
          <Typography
            fontSize={18}
            lineHeight="22px"
            fontWeight={500}
            mt="13px"
          >
            Success
          </Typography>
          <Typography color="#A3A1A1" mt="37px">
            Your edit was successfull
          </Typography>
          <ConfirmButton
            onClick={() => {
              onClose();
              router.push({
                pathname: `/detail-job`,
                query: {
                  id: jobId, // pass the id 
                },
              });
            }}
          >
            View Job
          </ConfirmButton>
          <Typography
            mt="21px"
            className="cursor__pointer"
            onClick={() => {
              onClose();
              router.push('/manage-jobs');
            }}
          >
            Back to Manage jobs
          </Typography>
        </Stack>
      </Container>
    </Modal>
  );
};
