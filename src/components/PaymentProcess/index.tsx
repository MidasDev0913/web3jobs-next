import React, { useState, useEffect, useMemo } from 'react';
import { useWeb3React } from '@web3-react/core';
import Web3 from 'web3';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import {
  Box,
  Drawer,
  Stack,
  Modal,
  Stepper,
  Step,
  StepLabel,
  StepIconProps,
  Typography,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import Check from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import StepConnector, {
  stepConnectorClasses,
} from '@mui/material/StepConnector';
import { useRouter } from 'next/router';
import { styled } from '@mui/material/styles';

import { Container, CloseButton } from './index.styles';
import { PaymentStep } from './steps/payment';
import { ConfirmationStep } from './steps/confirmation';
import { TJob } from '../../interfaces';
import { RootState } from '../../redux/store';
import { login } from '../../redux/reducers/authReducer';
import JoinOptionModal from '../Modals/JoinOption';
import {
  ETH_MAINNET_CHAIN_ID,
  ETH_TESTNET_CHAIN_ID,
} from '../../utils/constants';
import { connect } from '../../utils/web3';
import { postNewJob, editJob } from '../../redux/reducers/jobReducer';
import JobSeekerFailedModal from '../Modals/JobseekerFailed';
import { CompleteStep } from './steps/complete';
import { switchNetwork } from '../../utils/helper';

type ComponentProps = {
  open: boolean;
  price: number;
  newJob: any;
  isEdit?: boolean;
  onClose: () => void;
  onInitialize: () => void;
};

const CustomConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 8,
    left: 'calc(-50% + 11px)',
    right: 'calc(50% + 11px)',
  },
  [`& .${stepConnectorClasses.line}`]: {
    borderColor: '#C4C4C4',
    borderTopWidth: 8,
    borderRadius: 2,
  },
  [theme.breakpoints.down('md')]: {
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
      top: 4,
      left: 'calc(-50% + 5px)',
      right: 'calc(50% + 5px)',
    },
    [`& .${stepConnectorClasses.line}`]: {
      borderTopWidth: 4,
      borderRadius: 1,
    },
  },
}));

const CustomStepIconRoot = styled('div')<{
  ownerState: { active?: boolean; completed?: boolean };
}>(({ theme, ownerState }) => ({
  color: '#fff',
  display: 'flex',
  height: 22,
  alignItems: 'center',
  zIndex: 1,
  ...(ownerState.completed && {}),
  '& .QontoStepIcon-completedIcon': {
    width: 34,
    height: 34,
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#01B574',
  },
  '& .QontoStepIcon-circle': {
    width: 24,
    height: 24,
    borderRadius: '50%',
    backgroundColor: '#fff',
  },
  [theme.breakpoints.down('md')]: {
    height: 12,
    '& .QontoStepIcon-completedIcon': {
      width: 19,
      height: 19,
      '& svg': {
        fontSize: 13,
      },
    },
    '& .QontoStepIcon-circle': {
      width: 19,
      height: 19,
    },
  },
}));

function CustomStepIcon(props: StepIconProps) {
  const { active, completed, className } = props;

  return (
    <CustomStepIconRoot
      ownerState={{ active, completed }}
      className={className}
    >
      {completed ? (
        <Box className="QontoStepIcon-completedIcon">
          <Check />
        </Box>
      ) : (
        <div className="QontoStepIcon-circle" />
      )}
    </CustomStepIconRoot>
  );
}

export const PaymentProcessPopup: React.FC<ComponentProps> = ({
  price,
  open,
  newJob,
  isEdit,
  onClose,
  onInitialize,
}) => {
  const steps = ['Payment', 'Waiting for confirmation', 'Job Live'];
  const url = 'https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD';

  const dispatch = useDispatch();
  const router = useRouter();
  const theme = useTheme();
  const matchDownMd = useMediaQuery(theme.breakpoints.down('md'));
  const { account, library, chainId, activate } = useWeb3React();
  const { isLoggedIn, userInfo } = useSelector(
    (state: RootState) => state.auth
  );

  const [activeStep, setActiveStep] = useState<number>(0);
  const [priceInEth, setPriceInEth] = useState<number>(0);
  const [txnHash, setTxnHash] = useState<string>('');
  const [txnError, setTxnError] = useState<boolean>(false);
  const [openJoinOptionModal, setOpenJoinOptionModal] =
    useState<boolean>(false);
  const [postingJob, setPostingJob] = useState<boolean>(false);
  const [openJobseekerFailedModal, setOpenJobseekerFailedModal] =
    useState<boolean>(false);
  const [isLoadingLive, setIsLoadingLive] = useState<boolean>(false);
  const [newJobId, setNewJobId] = useState<string>('');

  useEffect(() => {
    if (!open) {
      setPriceInEth(0);
      setPostingJob(false);
      setActiveStep(0);
      setTxnHash('');
      setNewJobId('');
    }
  }, [open]);

  useEffect(() => {
    if (price && open) {
      axios.get(url).then(({ data }) => {
        setPriceInEth(price / data['USD']);
      });
    }
  }, [price, open]);

  useEffect(() => {
    (async () => {
      if (open && isLoggedIn && postingJob && chainId) {
        if (userInfo.type === 0) {
          const availableChains =
            process.env.NEXT_PUBLIC_ENV === 'prod'
              ? [ETH_MAINNET_CHAIN_ID]
              : [ETH_TESTNET_CHAIN_ID];
          if (chainId && !availableChains.includes(chainId as number)) {
            const isCorrectChain = await switchNetwork(availableChains[0]);
            if (!isCorrectChain) {
              return;
            }
          }

          const web3 = new Web3(library.provider);
          web3.eth
            .sendTransaction(
              {
                to: process.env.NEXT_PUBLIC_PAYMENT_RECEIVER,
                from: account as string,
                value: web3.utils.toWei(priceInEth.toString()),
              },
              (error, txnHash) => {
                console.log(error, txnHash);
              }
            )
            .on('transactionHash', (hash) => {
              setTxnHash(hash);
              setActiveStep(1);
            })
            .on('receipt', () => {
              setPostingJob(false);
              setIsLoadingLive(true);
              if (isEdit) {
                dispatch(
                  editJob({
                    ...newJob,
                    onSuccess: () => {
                      setNewJobId(newJob.job.id);
                      setIsLoadingLive(false);
                      setActiveStep(2);
                    },
                  })
                );
              } else {
                dispatch(
                  postNewJob({
                    ...newJob,
                    setNewJobId: setNewJobId,
                    onInitialize: () => {
                      onInitialize();
                      setIsLoadingLive(false);
                      setActiveStep(2);
                    },
                  })
                );
              }
            })
            .on('error', () => {
              setTxnError(true);
              setPostingJob(false);
            });
        } else {
          setOpenJobseekerFailedModal(true);
        }
      }
    })();
  }, [isLoggedIn, open, postingJob]);

  const title = useMemo(() => {
    return activeStep === 0
      ? 'Payment'
      : activeStep === 1
      ? 'Confirmation'
      : 'Transaction Complete';
  }, [activeStep]);

  const handleConfirmJoinOption = (type: number) => {
    dispatch(
      login({
        onClose: () => {
          setOpenJoinOptionModal(false);
        },
        type,
        openPopup: () => setOpenJoinOptionModal(true),
      })
    );
  };

  const handleProcessPayment = () => {
    if (!isLoggedIn) {
      connect(activate)
        .then(() => {
          setPostingJob(true);
          dispatch(login({ openPopup: () => setOpenJoinOptionModal(true) }));
        })
        .catch((err) => {
          connect(activate);
        });
    } else {
      setPostingJob(true);
    }
  };

  const Content = () => (
    <>
      <Container
        width={{ xs: 'calc(100% - 6px)', md: '868px' }}
        height={{ xs: '100%', md: 'auto' }}
      >
        <Stack
          direction="row"
          width="100%"
          alignItems="center"
          justifyContent={{ xs: 'start', md: 'center' }}
          position="relative"
          pl={5.25}
          boxSizing="border-box"
        >
          <Typography
            fontSize={{ xs: 15, md: 20 }}
            lineHeight="20px"
            fontWeight={{ xs: 700, md: 600 }}
            mt="25px"
          >
            {title}
          </Typography>
          {activeStep === 0 && (
            <CloseButton aria-label="delete" size="small" onClick={onClose}>
              <CloseIcon fontSize="small" />
            </CloseButton>
          )}
        </Stack>
        <Stack padding={{ xs: '16px 0', md: '39px 64px 90px' }}>
          <Box sx={{ width: '100%' }}>
            <Stepper
              activeStep={activeStep + 1}
              alternativeLabel
              connector={<CustomConnector />}
            >
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel StepIconComponent={CustomStepIcon}>
                    {label}
                  </StepLabel>
                </Step>
              ))}
            </Stepper>
          </Box>
          <Stack
            direction="column"
            mt={{ xs: 4, md: 9.25 }}
            alignItems="center"
          >
            {activeStep === 0 && (
              <PaymentStep
                price={price}
                ethPrice={priceInEth}
                onClick={handleProcessPayment}
                onClose={onClose}
              />
            )}
            {activeStep === 1 && (
              <ConfirmationStep
                ethPrice={priceInEth}
                txnHash={txnHash}
                error={txnError}
                onRetry={() => {
                  setTxnError(false);
                  handleProcessPayment();
                }}
                onClose={onClose}
              />
            )}
            {activeStep === 2 && (
              <CompleteStep
                isEdit={isEdit}
                ethPrice={priceInEth}
                txnHash={txnHash}
                onViewJob={() =>
                  isEdit
                    ? router.push({
                        pathname: `/detail-job`,
                        query: {
                          id: newJobId, // pass the id
                        },
                      })
                    : router.push({
                        pathname: `/job`,
                        query: {
                          id: newJobId, // pass the id
                        },
                      })
                }
                onGotoHomePage={() => {
                  if (typeof window !== undefined) {
                    window.scrollTo({
                      top: 0,
                      behavior: 'auto',
                    });
                  }
                  if (isEdit) {
                    router.push('/manage-jobs');
                    return;
                  }
                  router.push('/');
                }}
              />
            )}
          </Stack>
        </Stack>
      </Container>
      <JoinOptionModal
        open={openJoinOptionModal}
        onClose={() => setOpenJoinOptionModal(false)}
        onConfirm={handleConfirmJoinOption}
      />
      <JobSeekerFailedModal
        open={openJobseekerFailedModal}
        onClose={() => setOpenJobseekerFailedModal(false)}
        onConfirm={() => {
          setOpenJobseekerFailedModal(false);
          router.push('/');
        }}
      />
    </>
  );

  if (matchDownMd) {
    return (
      <Drawer anchor={'bottom'} open={open} onClose={onClose}>
        <Stack width="100%" height="fit-content" bgcolor="#05050D">
          <Content />
        </Stack>
      </Drawer>
    );
  }

  return (
    <Modal open={open} onClose={onClose}>
      <Content />
    </Modal>
  );
};
