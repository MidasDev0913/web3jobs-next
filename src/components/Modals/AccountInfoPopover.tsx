import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { Box, styled, IconButton, Stack, Typography } from '@mui/material';

import SingOutIcon from '../SVGIcons/SingOut';
import ArrowRightIcon from '../SVGIcons/ArrowRightIcon_2';
import PersonalLogo from '../../assets/images/personal_logo.png';
import { TJob } from '../../interfaces';
import { auth } from '../../firebase';
import { useDispatch } from 'react-redux';
import { logout } from '../../redux/reducers/authReducer';

type AccountInfoPopoverProps = {
  account: string;
  isEmployer: boolean;
  jobs: TJob[];
  onClose: () => void;
};

const CloseButton = styled(IconButton)({
  background: '#9E9E9E20',
  borderRadius: '50%',
  cursor: 'pointer',
});

const ContainerBox = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  width: 270,
  background: '#10101E',
  borderRadius: 5,
  border: '0.5px solid rgba(25, 159, 217, 0.28)',

  '& .info-item--arrow-icon': {
    '&:hover': {
      '& svg': {
        transform: 'scale(1.2)',
      },
    },
  },
});

const InfoItem = ({ img, text, onClick, hiddenIcon, ...props }: any) => (
  <Box
    width="100%"
    display="flex"
    alignItems="center"
    justifyContent="space-between"
    className="cursor__pointer"
    onClick={onClick}
    {...props}
  >
    <Box display="flex" alignItems="center">
      {img ? (
        <Box
          width="25px"
          height="25px"
          borderRadius="25px"
          border="1px solid #B50000"
        >
          <Image
            src={img}
            width={25}
            height={25}
            style={{ borderRadius: '25px' }}
          />
        </Box>
      ) : (
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          width={25}
          height={25}
          borderRadius="25px"
          border="1px solid #B50000"
        >
          <Typography fontSize={16} lineHeight={1.5} fontWeight={700}>
            {(props.companyName || '')?.charAt(0).toUpperCase()}
          </Typography>
        </Box>
      )}

      <Typography fontWeight={500} fontSize={13} lineHeight="13px" ml="11px">
        {text}
      </Typography>
    </Box>
    {!hiddenIcon && (
      <Box className="info-item--arrow-icon">
        <ArrowRightIcon />
      </Box>
    )}
  </Box>
);

const AccountInfoPopover = ({
  isEmployer,
  jobs,
  onClose,
}: AccountInfoPopoverProps) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const handleSignOut = () => {
    auth.signOut();
    localStorage.clear();
    dispatch(logout());
    router.push('/');
    onClose();
  };

  const onClickAccount = () => {
    router.push('/dashboard');
  };

  return (
    <ContainerBox>
      <Stack
        width="100%"
        direction="column"
        padding="20px 20px 16px 12px"
        boxSizing="border-box"
        borderBottom="1px solid rgba(25, 159, 217, 0.28)"
      >
        {isEmployer ? (
          <InfoItem
            img={PersonalLogo}
            text={<Typography fontWeight={500}>Personal Dashboard</Typography>}
            onClick={onClickAccount}
          />
        ) : (
          <InfoItem
            img={PersonalLogo}
            text={<Typography fontWeight={500}>Jobseeker</Typography>}
            hiddenIcon
          />
        )}
      </Stack>
      <Stack
        width="100%"
        direction="column"
        padding="18px 20px 16px 12px"
        boxSizing="border-box"
        borderBottom="1px solid rgba(25, 159, 217, 0.28)"
      >
        <Typography color="#A3A3AD" fontSize={12} lineHeight="12px">
          Last {isEmployer ? 'posted' : 'saved'} jobs
        </Typography>
        {jobs.length ? (
          jobs.map((job) => (
            <InfoItem
              img={job.logo}
              text={<Typography color="#C4C4C4">{job.title}</Typography>}
              companyName={job.company_name}
              mt={2.75}
              key={job.id}
              onClick={() => {
                router.push({
                  pathname: `/job`,
                  query: {
                    id: job.id, // pass the id
                  },
                });
                onClose();
              }}
            />
          ))
        ) : (
          <Box
            width="100%"
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography
              fontStyle="italic"
              fontSize={13}
              lineHeight="13px"
              mt={1}
            >
              You currently have no {isEmployer ? 'posted' : 'saved'} jobs...
            </Typography>
          </Box>
        )}
      </Stack>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        padding="12px 18px 19px 16px"
        className="cursor__pointer"
        onClick={handleSignOut}
      >
        <Typography>Disconnect</Typography>
        <SingOutIcon />
      </Stack>
    </ContainerBox>
  );
};

export default AccountInfoPopover;
