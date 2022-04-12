import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useSelector, useDispatch } from 'react-redux';
import {
  Box,
  FormHelperText,
  CircularProgress,
  Typography,
  Stack,
} from '@mui/material';
import { useWeb3React } from '@web3-react/core';
import { useParams } from 'react-router-dom';
import { useRouter } from 'next/router';

import { RootState } from '../../redux/store';
import { getTags } from '../../redux/reducers/commonReducer';
import {
  MainContainer,
  PostJobContainer,
  PostButton,
  UnlockButton,
} from './index.styles';
import { AppDropdown } from '../../components/Dropdown';
import { AppRichTextEditor } from '../../components/RichTextEditor';
import { AppRadioGroup } from '../../components/RadioGroup';
import { OptionWithTag } from '../../components/OptionWithTag';
import { OptionWithColorPicker } from '../../components/OptionWithTag/OptionWithColorPicker';
import PaymentConfirmModal from '../../components/Modals/PaymentConfirm';
import { TJob, TSticky, TOption, THightlightColor } from '../../interfaces';
import {
  stickyOptions,
  hightlightColorOptions,
  DEFAULT_HIGHLIGHT_COLOR,
} from '../../utils/constants';
import { editJob, getOneJob } from '../../redux/reducers/jobReducer';
import { getCompanies } from '../../redux/reducers/organizationReducer';
import { login } from '../../redux/reducers/authReducer';
import InfoIcon from '../../assets/icons/info_icon.svg';
import MetamaskIcon from '../../assets/icons/metamask_icon.svg';
import ArrowLeftIcon from '../../components/SVGIcons/ArrowLeftIcon';
import { AppToggle } from '../../components/ToggleButton';
import { useAlertMessage } from '../../hooks/useAlertMessage';
import { ErrorMessage } from '../../components/ErrorMessage';
import GooglePlaceAutoComplete from '../../components/GooglePlaceAutoComplete';
import { AppAutocomplete } from '../../components/Autocomplete';
import JobSeekerFailedModal from '../../components/Modals/JobseekerFailed';
import JoinOptionModal from '../../components/Modals/JoinOption';
import { PaymentProcessPopup } from '../../components/PaymentProcess';
import EditInfoIcon from '../../components/SVGIcons/InfoIcon';
import { EditJobSuccess } from '../../components/Modals/EditJobSuccess';
import { connect } from '../../utils/web3';

const FilterTag = React.lazy(() => import('../../components/FilterTag'));

const PostJobPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { id } = useParams();
  const { selectedJob, loading } = useSelector((state: RootState) => state.job);
  const { showAlertMessage } = useAlertMessage();
  const { account, activate } = useWeb3React();

  const { companies } = useSelector((state: RootState) => state.organization);
  const { isLoggedIn, userInfo } = useSelector(
    (state: RootState) => state.auth
  );

  const [newJob, setNewJob] = useState<TJob>({
    organization: 'Personal',
    highlightCustomColor: DEFAULT_HIGHLIGHT_COLOR,
  } as TJob);
  const [internalLoading, setInternalLoading] = useState<boolean>(false);
  const [openConfirmPaymentPopup, setOpenConfirmPaymentPopup] =
    useState<boolean>(false);
  const [clickedPostJob, setClickedPostJob] = useState<boolean>(false);
  const [errors, setErrors] = useState<Record<string, any>>({});
  const [price, setPrice] = useState<Record<string, number>>({
    sticky: 0,
    highlightColor: 0,
    newsletter: 0,
    organization: 0,
    total: 0,
  });
  const [openJobseekerFailedModal, setOpenJobseekerFailedModal] =
    useState<boolean>(false);
  const [openJoinOptionModal, setOpenJoinOptionModal] =
    useState<boolean>(false);
  const [openSuccessFreeJobPost, setOpenSuccessFreeJobPost] =
    useState<boolean>(false);
  const [openSuccessPaidJobPost, setOpenSuccessPaidJobPost] =
    useState<boolean>(false);
  const [descriptions, setDescriptions] = useState<string[]>([]);
  const [openSuccessEditJob, setOpenSuccessEditJob] = useState<boolean>(false);
  const [saveHistory, setSaveHistory] = useState<boolean>(false);

  useEffect(() => {
    dispatch(getOneJob({ id }));
    dispatch(getTags());
  }, []);

  useEffect(() => {
    setDescriptions(
      companies.find((item) => item.name === selectedJob.company_name)
        ?.descriptions || []
    );
    setNewJob(
      selectedJob.company_name
        ? { ...selectedJob, sticky: '0' }
        : ({
            organization: 'Personal',
            highlightCustomColor: DEFAULT_HIGHLIGHT_COLOR,
          } as TJob)
    );
  }, [selectedJob, companies]);

  useEffect(() => {
    if (!loading && account) {
      dispatch(getCompanies({ userId: account.toLowerCase() }));
    }
  }, [loading, account]);

  useEffect(() => {
    if (isLoggedIn && clickedPostJob) {
      if (userInfo.type === 0) {
        dispatch(
          editJob({
            job: { ...newJob, price: price.total || 0 },
            userId: account?.toLowerCase(),
            saveHistory,
            onSuccess: () => {
              setOpenSuccessEditJob(true);
            },
          })
        );
      } else {
        setOpenJobseekerFailedModal(true);
        setClickedPostJob(false);
      }
    }
  }, [isLoggedIn, clickedPostJob]);

  const handleChangeNewJob = (field: string) => (value: any) => {
    if (field === 'sticky') {
      const newPrice = stickyOptions.find((o) => o.value === value)?.price || 0;
      setPrice((prev) => ({
        ...price,
        sticky: newPrice,
        total: prev.total - prev.sticky + newPrice,
      }));
    }

    if (field === 'highlightColor') {
      const newPrice =
        hightlightColorOptions.find((o) => o.color === value)?.price || 0;
      setPrice((prev) => ({
        ...price,
        highlightColor: newPrice,
        total: prev.total - prev.highlightColor + newPrice,
      }));
    }

    if (
      [
        'position',
        'description',
        'applyBy',
        'applyByUrl',
        'invoiceAddress',
        'sticky',
        'highlightColor',
        'title',
        'company_name',
        'short_description',
      ].includes(field)
    ) {
      setErrors({
        ...errors,
        [field]: false,
      });
    }

    setNewJob({
      ...(newJob || {}),
      [field]: value,
    } as TJob);
  };

  const handleChangeSalary = (field: string) => (v: any) => {
    if (
      (field === 'min' &&
        newJob.salary?.max &&
        Number(v) > Number(newJob.salary?.max)) ||
      (field === 'max' && Number(v) < Number(newJob.salary?.min))
    ) {
      setErrors({
        ...errors,
        salary: {
          ...errors.salary,
          min: false,
          max: true,
        },
      });
    } else {
      setErrors({
        ...errors,
        salary: {
          ...errors.salary,
          min: false,
          max: false,
        },
      });
    }
    setNewJob({
      ...(newJob || {}),
      salary: {
        ...newJob.salary,
        [field]: Number(v),
      },
    } as TJob);
  };

  const handleChangeIsRemote = (arg: boolean) => {
    setNewJob({
      ...(newJob || {}),
      isRemote: Boolean(arg),
    } as TJob);
  };

  const checkValidationNewJob = (realNewJob: TJob) => {
    let isValid = true;
    let checkErrors: any = {
      organization: !realNewJob.organization,
      position: !realNewJob.position,
      description: !realNewJob.description?.replace(/<[^>]+>/g, ''),
      applyBy: !realNewJob.applyBy,
      applyByUrl: Boolean(realNewJob.applyBy && !realNewJob.applyByUrl),
      invoiceAddress: !realNewJob.invoiceAddress,
      title: !realNewJob.title,
      company_name: !realNewJob.company_name,
      short_description: !realNewJob.short_description,
    };

    if (Object.values(checkErrors).includes(true)) {
      isValid = false;
    }

    // check validation of salary max
    if ((realNewJob.salary?.max || 0) < (realNewJob.salary?.min || 0)) {
      checkErrors = {
        ...checkErrors,
        salary: {
          ...checkErrors.salary,
          max: true,
        },
      };
      isValid = false;
    }

    if (!isValid) {
      let fieldId = '';
      if (checkErrors.position) {
        fieldId = 'position';
      } else if (checkErrors.description) {
        fieldId = 'description';
      } else if (checkErrors.short_description) {
        fieldId = 'short_description';
      } else if (checkErrors.salary.max) {
        fieldId = 'salary';
      }

      const obj = document.getElementById(fieldId);
      if(typeof window !== undefined) {
        window.scrollTo({
          top: obj?.offsetTop,
          behavior: 'smooth',
        });
      }
    }

    return { checkErrors, isValid };
  };

  const handleEditJob = () => {
    if (loading) return;
    let realNewJob: TJob = { ...newJob };
    const isSave = selectedJob.description !== newJob.description;
    setSaveHistory(isSave);

    const isPayedJob =
      (price.sticky || 0) > 0 ||
      (price.highlightColor || 0) > 0 ||
      (price.newsletter || 0) > 0;

    realNewJob = {
      ...realNewJob,
      sticky: realNewJob.sticky || '',
      stickInfo: {
        active:
          Boolean(Number(realNewJob.sticky || '')) ||
          Boolean(selectedJob.stickInfo?.active),
        period:
          (selectedJob.stickInfo?.period || 0) +
          Number(realNewJob.sticky || ''),
      },
      highlightColor: realNewJob.highlightColor || '',
      status: selectedJob.status === 'bin' ? 'pending' : 'active',
      edited: (realNewJob.edited || 0) + 1,
    };

    const { checkErrors, isValid } = checkValidationNewJob(realNewJob);

    if (!isValid) {
      showAlertMessage(`Please fill out required fields.`, {
        variant: 'error',
      });
      setErrors(checkErrors);
      return;
    }

    setNewJob(realNewJob);

    if (!price.total) {
      if (!isLoggedIn) {
        connect(activate)
          .then(() => {
            setClickedPostJob(true);
            dispatch(login({ openPopup: () => setOpenJoinOptionModal(true) }));
          })
          .catch((err) => {
            connect(activate);
          });
      } else {
        if (userInfo.type === 0) {
          dispatch(
            editJob({
              job: realNewJob,
              userId: account?.toLowerCase(),
              saveHistory: isSave,
              onSuccess: () => {
                setOpenSuccessEditJob(true);
              },
            })
          );
        } else {
          setOpenJobseekerFailedModal(true);
        }
      }
    } else {
      setOpenSuccessPaidJobPost(true);
    }
  };

  const handleChangeCustomColor = (color: string) => {
    setNewJob({
      ...(newJob || {}),
      highlightCustomColor: color,
    } as TJob);
  };

  const salaryOptionList: TOption[] = Array.from(
    { length: 81 },
    (_, i) => i * 5000
  ).map((item) => ({
    value: item.toString(),
    text: item.toString(),
  }));

  const handleConfirmPayment = async (priceInEth: number) => {
    setInternalLoading(true);
    if (!isLoggedIn) {
      connect(activate)
        .then(() => {
          dispatch(login({ openPopup: () => setOpenJoinOptionModal(true) }));
        })
        .catch((err) => {
          connect(activate);
        });
    }
  };

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

  return (
    <Stack direction="column">
      <Box ml="26px" display="flex" alignItems="center">
        <Box
          onClick={() => router.push('/manage-jobs')}
          className="cursor__pointer"
        >
          <ArrowLeftIcon />
        </Box>
        <Typography ml={3} fontWeight={700} fontSize="18px" lineHeight="21.5px">
          Edit Post
        </Typography>
      </Box>
      <MainContainer>
        <PostJobContainer>
          <Box position="relative">
            <Box
              mb="11px"
              display="flex"
              alignItems="center"
              fontSize="18px"
              fontWeight={500}
              color="#fff"
            >
              Job Title:
            </Box>
            <Typography>{newJob?.title}</Typography>
          </Box>
          <Box id="position" mt={4} position="relative">
            <AppDropdown
              label="Working Hours:"
              placeholder="select one..."
              options={[
                { value: 'full', text: 'Full time' },
                { value: 'part', text: 'Part time' },
                { value: 'contract', text: 'Contract' },
                { value: 'internship', text: 'Internship' },
              ]}
              value={newJob?.position || ''}
              onChange={handleChangeNewJob('position')}
              error={errors.position}
            />
            {errors.position && <ErrorMessage />}
          </Box>
          <Box
            id="description"
            mt={errors.position ? '44px' : '21px'}
            position="relative"
          >
            <AppRichTextEditor
              label="Job Description:"
              value={newJob?.description}
              onChange={handleChangeNewJob('description')}
              placeholder="Give a concise description of the job....."
              error={errors.description}
            />
            {(newJob.edited || 0) > 1 && (
              <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                position="absolute"
                width="100%"
                height="calc(100% - 100px)"
                bgcolor="rgba(16, 16, 30, 0.95)"
                zIndex={1}
                borderRadius="10px"
                sx={{ top: 100, left: 0 }}
              >
                <UnlockButton>Unlock (Free)</UnlockButton>
                <Box display="flex" mt="18px">
                  <EditInfoIcon />
                  <Typography ml="10px">First edits is free</Typography>
                </Box>
              </Box>
            )}
            {errors.description && <ErrorMessage />}
          </Box>
          <Box
            id="short_description"
            mt={errors.description ? '44px' : '20px'}
            position="relative"
          >
            <AppAutocomplete
              freeSolo
              displayLength
              maxLength={120}
              value={newJob?.short_description}
              label="Short Company Description:"
              placeholder="Will be displayed on the jobview page (max 120 letters)"
              options={descriptions.map((item) => ({
                value: item,
                text: item,
              }))}
              onChange={handleChangeNewJob('short_description')}
              error={errors.short_description}
            />
            {errors.short_description && <ErrorMessage />}
          </Box>
          <Box id="salary" mt={errors.short_description ? '44px' : '20px'}>
            <Box
              mb="11px"
              display="flex"
              alignItems="center"
              fontSize="18px"
              fontWeight={500}
              color="#fff"
            >
              Compensation (USD):
            </Box>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
            >
              <Box width="49%" position="relative">
                <AppDropdown
                  placeholder="Minimum annual salary"
                  options={salaryOptionList}
                  value={
                    newJob?.salary?.min ? newJob?.salary?.min.toString() : ''
                  }
                  onChange={handleChangeSalary('min')}
                />
              </Box>
              <Box width="49%" position="relative">
                <AppDropdown
                  placeholder="Maximum annual salary"
                  options={salaryOptionList}
                  value={
                    newJob?.salary?.max ? newJob?.salary?.max.toString() : ''
                  }
                  onChange={handleChangeSalary('max')}
                  error={errors.salary?.max}
                />
                {errors.salary?.max && (
                  <FormHelperText>
                    <img src={InfoIcon.src} />
                    This field must be greater than minimum salary.
                  </FormHelperText>
                )}
              </Box>
            </Box>
          </Box>
          <Box mt={errors.salary?.max ? '44px' : '20px'} position="relative">
            <Box
              mb="11px"
              display="flex"
              alignItems="center"
              fontSize="18px"
              fontWeight={500}
              color="#fff"
            >
              Location:
            </Box>
            <Box display="flex" alignItems="center">
              <Box width="50%">
                <GooglePlaceAutoComplete
                  placeholder="type in the city your company is located or/and toggle remote"
                  value={newJob.location}
                  onChange={handleChangeNewJob('location')}
                />
              </Box>
              <Box display="flex" alignItems="center" marginLeft="51px">
                <AppToggle
                  value={newJob?.isRemote}
                  onChange={handleChangeIsRemote}
                  label="Remote"
                />
              </Box>
            </Box>
          </Box>
          <Stack direction="row" mt="58px">
            <Box position="relative">
              <AppRadioGroup
                label="Stick post on top for:"
                options={stickyOptions.map((stick: TSticky) =>
                  stick.duration
                    ? {
                        text: (
                          <OptionWithTag
                            title={stick.duration}
                            price={stick.price || 0}
                            ratio={stick.views}
                          />
                        ),
                        value: stick.value,
                      }
                    : {
                        text: 'No sticky',
                        value: '0',
                      }
                )}
                value={newJob?.sticky || ''}
                onChange={handleChangeNewJob('sticky')}
              />
            </Box>
            <Box position="relative" ml={22}>
              <AppRadioGroup
                label="Highlight your post with colors:"
                options={hightlightColorOptions.map(
                  (option: THightlightColor) =>
                    option.color
                      ? option.color === 'standard'
                        ? {
                            text: (
                              <OptionWithTag
                                title={option.text}
                                price={option.price}
                                ratio={option.views}
                              />
                            ),
                            value: option.color,
                          }
                        : {
                            text: (
                              <Box display="flex" alignItems="center">
                                <OptionWithColorPicker
                                  title={option.text}
                                  price={option.price}
                                  ratio={option.views}
                                  color={newJob?.highlightCustomColor}
                                  onChangeColor={handleChangeCustomColor}
                                  hiddenColor={
                                    newJob?.highlightColor !== 'custom'
                                  }
                                />
                              </Box>
                            ),
                            value: 'custom',
                          }
                      : {
                          text: <OptionWithTag title={'No color'} price={0} />,
                          value: '',
                        }
                )}
                value={newJob?.highlightColor}
                onChange={handleChangeNewJob('highlightColor')}
              />
            </Box>
          </Stack>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            mt="95px"
          >
            <PostButton
              onClick={() => handleEditJob()}
              disabled={loading || internalLoading}
            >
              {loading || internalLoading ? (
                <CircularProgress thickness={5} />
              ) : price.total ? (
                <>
                  <Box>Proceed to Metamask</Box>
                  {/* <img src={MetamaskIcon} width="28px" height="27px" /> */}
                  <Image src={MetamaskIcon} width={28} height={27} />
                </>
              ) : (
                <Box ml={2}>Proceed free</Box>
              )}
            </PostButton>
          </Box>
        </PostJobContainer>
      </MainContainer>
      <PaymentConfirmModal
        open={openConfirmPaymentPopup}
        onClose={() => setOpenConfirmPaymentPopup(false)}
        onConfirm={handleConfirmPayment}
        price={price.total}
        loading={loading || internalLoading}
      />
      <JobSeekerFailedModal
        open={openJobseekerFailedModal}
        onClose={() => setOpenJobseekerFailedModal(false)}
        onConfirm={() => {
          setOpenJobseekerFailedModal(false);
          router.push('/');
        }}
      />
      <JoinOptionModal
        open={openJoinOptionModal}
        onClose={() => setOpenJoinOptionModal(false)}
        onConfirm={handleConfirmJoinOption}
      />
      <PaymentProcessPopup
        open={openSuccessPaidJobPost}
        price={price.total}
        isEdit
        newJob={{
          job: { ...newJob, price: price.total || 0, id },
          userId: account?.toLowerCase(),
          saveHistory,
        }}
        onClose={() => setOpenSuccessPaidJobPost(false)}
        onInitialize={() => {}}
      />
      <EditJobSuccess
        open={openSuccessEditJob}
        jobId={id}
        onClose={() => setOpenSuccessEditJob(false)}
      />
    </Stack>
  );
};

export default PostJobPage;
