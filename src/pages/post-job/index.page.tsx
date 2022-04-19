import React, { useState, useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Box,
  CircularProgress,
  Typography,
  useMediaQuery,
  useTheme,
  Stack,
} from '@mui/material';
import { useWeb3React } from '@web3-react/core';

import { RootState } from '../../redux/store';
import { getTags } from '../../redux/reducers/commonReducer';
import { insertItemToArray } from '../../utils/helper';
import {
  MainContainer,
  PostJobContainer,
  PostButton,
  DraftLink,
  CheckButton,
  CustomFormHelperText,
  UseCouponContainer,
} from './index.styles';
import { AppTextField } from '../../components/TextField';
import { AppDropdown } from '../../components/Dropdown';
import { AppRichTextEditor } from '../../components/RichTextEditor';
import { AppRadioGroup } from '../../components/RadioGroup';
import { OptionWithTag } from '../../components/OptionWithTag';
import { OptionWithColorPicker } from '../../components/OptionWithTag/OptionWithColorPicker';
import { FilePicker } from '../../components/FilePicker';
import PaymentConfirmModal from '../../components/Modals/PaymentConfirm';
import { TJob, TSticky, TOption, THightlightColor } from '../../interfaces';
import {
  stickyOptions,
  hightlightColorOptions,
  DEFAULT_HIGHLIGHT_COLOR,
} from '../../utils/constants';
import { postNewJob } from '../../redux/reducers/jobReducer';
import {
  getOrganizations,
  getCompanies,
} from '../../redux/reducers/organizationReducer';
import { login } from '../../redux/reducers/authReducer';
import InfoIcon from '../../assets/icons/info_icon.svg';
import { AppToggle } from '../../components/ToggleButton';
import ArrowRightIcon from '../../components/SVGIcons/RightIcon';
import CouponIcon from '../../components/SVGIcons/CouponIcon';
import { useAlertMessage } from '../../hooks/useAlertMessage';
import { ErrorMessage } from '../../components/ErrorMessage';
import GooglePlaceAutoComplete from '../../components/GooglePlaceAutoComplete';
import { AppAutocomplete } from '../../components/Autocomplete';
import NewsletterBgSvg from '../../assets/images/newsletter-bg.svg';
import JobSeekerFailedModal from '../../components/Modals/JobseekerFailed';
import JoinOptionModal from '../../components/Modals/JoinOption';
import { PaymentProcessPopup } from '../../components/PaymentProcess';
import { FreePostJobSuccess } from '../../components/Modals/FreePostJobSuccess';
import DraftPostJobSuccess from '../../components/Modals/DraftPostJobSuccess';
import { connect } from '../../utils/web3';
import { useRouter } from 'next/router';

const FilterTag = React.lazy(() => import('../../components/FilterTag'));
const StickyPostCompareModal = React.lazy(
  () => import('../../components/Modals/StickyPostCompare')
);

const SecondaryLabel = ({ label, btnText, handleCheck }: any) => (
  <Box display="flex" alignItems="center">
    <Typography fontSize={{ xs: 12, md: 15 }}>{label}</Typography>
    <CheckButton onClick={handleCheck}>
      <Typography fontSize={{ xs: 12, md: 15 }}>{btnText}</Typography>
      <ArrowRightIcon color="#fff" />
    </CheckButton>
  </Box>
);

const PostJobPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const theme = useTheme();
  const matchDownMd = useMediaQuery(theme.breakpoints.down('md'));
  const { showAlertMessage } = useAlertMessage();
  const { account, library, chainId, activate } = useWeb3React();

  const { tags } = useSelector((state: RootState) => state.common);
  const { organizations, companies } = useSelector(
    (state: RootState) => state.organization
  );
  const { loading } = useSelector((state: RootState) => state.job);
  const { isLoggedIn, userInfo } = useSelector(
    (state: RootState) => state.auth
  );

  const [newJob, setNewJob] = useState<TJob>({
    organization: 'Personal',
    highlightCustomColor: DEFAULT_HIGHLIGHT_COLOR,
    applyBy: 'email',
  } as TJob);
  const [internalLoading, setInternalLoading] = useState<boolean>(false);
  const [isDraft, setIsDraft] = useState<boolean>(false);
  const [logo, setLogo] = useState<File>();
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
  const [leftCoupon, setLeftCoupon] = useState<number>(0);
  const [openStickyPostCompare, setOpenStickyPostCompare] =
    useState<boolean>(false);
  const [checkJob, setCheckJob] = useState<TJob>({} as TJob);
  const [isHiddenMask, setIsHiddenMask] = useState<boolean>(false);
  const [openJobseekerFailedModal, setOpenJobseekerFailedModal] =
    useState<boolean>(false);
  const [openJoinOptionModal, setOpenJoinOptionModal] =
    useState<boolean>(false);
  const [openSuccessFreeJobPost, setOpenSuccessFreeJobPost] =
    useState<boolean>(false);
  const [openSuccessDraftJobPost, setOpenSuccessDraftJobPost] =
    useState<boolean>(false);
  const [openSuccessPaidJobPost, setOpenSuccessPaidJobPost] =
    useState<boolean>(false);
  const [newJobId, setNewJobId] = useState<string>('');
  const [descriptions, setDescriptions] = useState<string[]>([]);

  const initalize = () => {
    setOpenConfirmPaymentPopup(false);
    setNewJob({
      organization: 'Personal',
      highlightCustomColor: DEFAULT_HIGHLIGHT_COLOR,
      isRemote: false,
    } as TJob);
    setPrice({
      sticky: 0,
      highlightColor: 0,
      newsletter: 0,
      organization: 0,
      total: 0,
    });
    setClickedPostJob(false);
    setIsDraft(false);
    setInternalLoading(false);
    setLogo(undefined);
  };

  useEffect(() => {
    dispatch(getTags());
  }, []);

  useEffect(() => {
    if (!loading && isLoggedIn) {
      dispatch(getOrganizations({ userId: userInfo.address }));
      dispatch(getCompanies({ userId: userInfo.address }));
    }
  }, [loading, isLoggedIn, userInfo]);

  useEffect(() => {
    if (isLoggedIn && clickedPostJob) {
      if (userInfo.type === 0) {
        dispatch(
          postNewJob({
            file: logo,
            newJob: { ...newJob, price: price.total || 0 },
            isDraft,
            userId: account?.toLowerCase(),
            setNewJobId: setNewJobId,
            onInitialize: () => {
              initalize();

              if (!price.total) {
                setOpenSuccessFreeJobPost(true);
              }
              if (isDraft) {
                setOpenSuccessDraftJobPost(true);
              }
            },
          })
        );
      } else {
        setOpenJobseekerFailedModal(true);
        setClickedPostJob(false);
      }
    }
  }, [isLoggedIn, clickedPostJob]);

  const handleClickTag = (tag: string) => {
    let updateTags = [...(newJob?.tags || [])];
    updateTags = insertItemToArray(updateTags, tag);
    setNewJob({
      ...(newJob || {}),
      tags: updateTags,
    } as TJob);
  };

  const handleChangeNewJob = (field: string) => (value: any) => {
    if (field === 'company_name') {
      setDescriptions(
        companies.find((item) => item.name === value)?.descriptions || []
      );
    }

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

    if (field === 'organization') {
      if (value === '-1') return;
      if (value !== 'Personal') {
        setNewJob({
          ...(newJob || {}),
          company_name: value,
        } as TJob);
      }
      const selectedOrg = organizations.find((org) => org.name === value);
      setLeftCoupon(Math.max(0, 2 - (selectedOrg?.jobCount || 0)));
      if ((selectedOrg?.jobCount || 0) <= 2) {
        setPrice((prev) => ({
          ...prev,
          organization: 0,
          total:
            prev.organization > 0
              ? (prev.total || 0) - prev.organization
              : prev.total || 0,
        }));
      } else {
        setPrice((prev) => ({
          ...prev,
          organization: 199,
          total:
            prev.organization > 0 ? prev.total || 0 : (prev.total || 0) + 199,
        }));
      }
    }

    if (
      [
        'organization',
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
        'location',
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

  // const handleChangeNewletter = (field: string, v: boolean) => {
  //   const newPrice = v ? newsletterPrice : 0;
  //   setPrice((prev) => ({
  //     ...price,
  //     newsletter: newPrice,
  //     total: prev.total - prev.newsletter + newPrice,
  //   }));
  //   setNewJob({
  //     ...(newJob || {}),
  //     newsletterBoost: v,
  //   } as TJob);
  // };

  // const handleChangeUseCoupon = (field: string, v: boolean) => {

  //   setNewJob({
  //     ...(newJob || {}),
  //     useCoupon: v,
  //   } as TJob);
  // };

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
    if (arg) {
      setErrors({
        ...errors,
        location: false,
      });
    }
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
      location: !realNewJob.location && !realNewJob.isRemote,
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
      if (checkErrors.organization) {
        fieldId = 'organization';
      } else if (checkErrors.company_name) {
        fieldId = 'company_name';
      } else if (checkErrors.title) {
        fieldId = 'title';
      } else if (checkErrors.position) {
        fieldId = 'position';
      } else if (checkErrors.location) {
        fieldId = 'location';
      } else if (checkErrors.description) {
        fieldId = 'description';
      } else if (checkErrors.short_description) {
        fieldId = 'short_description';
      } else if (checkErrors.salary?.max) {
        fieldId = 'salary';
      } else if (checkErrors.applyBy || checkErrors.applyByUrl) {
        fieldId = 'applyby';
      } else if (checkErrors.invoiceAddress) {
        fieldId = 'invoiceAddress';
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

  const handlePostNewJob = (isDraft: boolean) => {
    if (loading || internalLoading) return;
    setIsDraft(isDraft);
    let realNewJob: TJob = { ...newJob };

    const isPayedJob =
      (price.sticky || 0) > 0 ||
      (price.highlightColor || 0) > 0 ||
      (price.newsletter || 0) > 0;

    realNewJob = {
      ...realNewJob,
      sticky: realNewJob.sticky || '',
      stickInfo: {
        active: Boolean(realNewJob.sticky),
        period: Number(realNewJob.sticky || ''),
      },
      tags: (realNewJob.tags || []).filter((item) => item),
      highlightColor: realNewJob.highlightColor || '',
      status: isDraft ? 'draft' : isPayedJob ? 'active' : 'pending',
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

    if (!price.total || isDraft) {
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
            postNewJob({
              file: logo,
              newJob: realNewJob,
              isDraft,
              userId: account?.toLowerCase(),
              onInitialize: () => {
                initalize();
                if (!price.total) {
                  setOpenSuccessFreeJobPost(true);
                }
                if (isDraft) {
                  setOpenSuccessDraftJobPost(true);
                }
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

  const organizationList = useMemo(() => {
    const orgs = organizations.map((org) => ({
      value: org.name,
      text: org.name,
    }));
    orgs.unshift({
      value: 'Personal',
      text: 'Personal',
    });
    return orgs;
  }, [organizations]);

  const handleCheckOrCompare = (type: number) => {
    let realNewJob: TJob = { ...newJob };

    realNewJob = {
      ...realNewJob,
      location: realNewJob.location,
      sticky: realNewJob.sticky || '',
      highlightColor: realNewJob.highlightColor || '',
    };

    const { checkErrors, isValid } = checkValidationNewJob(realNewJob);

    if (!isValid) {
      showAlertMessage(`Please fill out required fields.`, {
        variant: 'error',
      });
      setErrors(checkErrors);
      return;
    }
    if (type === 1) {
      setCheckJob({ ...newJob, sticky: '1' });
    }

    if (type === 2) {
      setCheckJob({
        ...newJob,
        highlightColor: 'custom',
        highlightCustomColor: 'rgb(255, 199, 0)',
      });
      setIsHiddenMask(true);
    }

    if (type === 3) {
      setCheckJob({
        ...newJob,
        highlightColor: 'custom',
      });
    }

    setOpenStickyPostCompare(true);
  };

  const handleCheckNewsLetter = () => {
    console.log('handle newsletter check... ');
  };

  const handleAddNewOrganization = () => {
    console.log('handle add new organization...');
  };

  const handleDeleteFile = () => {
    setLogo(undefined);
  };

  const handleClickTagInMobile = (position: number) => (val: string) => {
    const updateTags = [...(newJob?.tags || [])];
    updateTags[position] = val;
    setNewJob({
      ...(newJob || {}),
      tags: updateTags,
    } as TJob);
  };

  return (
    <>
    <Box>
      <MainContainer padding={{ xs: '6px 11px 100px', md: '30px 120px 100px' }}>
        <img src={NewsletterBgSvg.src} className="post-job-bg" />
        <Typography
          fontSize={{ xs: 25, md: 40 }}
          lineHeight={1.5}
          fontWeight={600}
          textAlign="center"
          mt={{ xs: 0, md: '70px' }}
        >
          Post a Web3 Job
        </Typography>
        <PostJobContainer
          padding={{ xs: '8px 11px 53px', md: '50px 120px 100px' }}
        >
          <Box
            id="company_name"
            mt={errors.organization ? '44px' : '20px'}
            position="relative"
          >
            <AppAutocomplete
              freeSolo
              value={newJob?.company_name}
              label="Company Name:"
              placeholder="e.g. Coinbase, Binance, Palmswap"
              options={companies.map((item) => ({
                value: item.name,
                text: item.name,
              }))}
              onChange={handleChangeNewJob('company_name')}
              error={errors.company_name}
            />
            {errors.company_name && <ErrorMessage />}
          </Box>
          <Box
            id="title"
            mt={errors.company_name ? '44px' : '20px'}
            position="relative"
          >
            <AppTextField
              value={newJob?.title}
              label="Job Title:"
              placeholder="e.g. community manager, rust developer"
              disableSpecialCharacter
              onChange={handleChangeNewJob('title')}
              error={errors.title}
            />
            {errors.title && <ErrorMessage />}
          </Box>
          <Box
            id="position"
            mt={errors.title ? '44px' : '20px'}
            position="relative"
          >
            <AppDropdown
              label="Type of Position:"
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
            id="location"
            mt={errors.position ? '44px' : '20px'}
            position="relative"
          >
            <Box
              mb="11px"
              display="flex"
              alignItems="center"
              fontSize={{ xs: 13, md: 18 }}
              fontWeight={500}
              color="#fff"
            >
              Location:
            </Box>
            <Box display="flex" alignItems="center">
              <Box flex={{ xs: 1, md: 0.5 }}>
                <GooglePlaceAutoComplete
                  placeholder="type in the city your company is located or/and toggle remote"
                  value={newJob.location}
                  onChange={handleChangeNewJob('location')}
                />
              </Box>
              <Box
                display="flex"
                alignItems="center"
                marginLeft={{ xs: '16px', md: '51px' }}
              >
                <AppToggle
                  value={newJob?.isRemote}
                  onChange={handleChangeIsRemote}
                  label="Remote"
                />
              </Box>
            </Box>
            {errors.location && <ErrorMessage />}
          </Box>
          <Box
            id="description"
            mt={errors.location ? '44px' : '20px'}
            position="relative"
          >
            <AppRichTextEditor
              label="Job Description:"
              value={newJob?.description}
              onChange={handleChangeNewJob('description')}
              placeholder="Give a concise description of the job....."
              error={errors.description}
            />
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
          <Box
            mt={errors.short_description ? '44px' : '20px'}
            position="relative"
          >
            <Box
              mb="3px"
              display="flex"
              alignItems="center"
              fontSize={{ xs: 13, md: 18 }}
              fontWeight={500}
              color="#fff"
            >
              Tags:{' '}
              <Box
                ml={1}
                fontSize="12px"
                fontWeight={300}
                display={{ xs: 'none', md: 'block' }}
              >
                (Select up to 3 tags. Can be less than 3)
              </Box>
            </Box>
            <Box
              display={{ xs: 'none', md: 'flex' }}
              alignItems="center"
              flexWrap="wrap"
            >
              {tags.map((tag: string, _i: number) => (
                <Box mx={1} my={0.5} key={_i}>
                  <FilterTag
                    text={tag}
                    active={(newJob?.tags || []).includes(tag)}
                    onClick={() => handleClickTag(tag)}
                    disabled={newJob.tags?.length === 3}
                  />
                </Box>
              ))}
            </Box>
            <Stack
              direction="row"
              flex={1}
              flexWrap="wrap"
              display={{ xs: 'flex', md: 'none' }}
            >
              <Stack flex={0.33} mr={1} mt={1}>
                <AppDropdown
                  selectablePlaceholder
                  placeholder="-- Select --"
                  options={(tags || [])
                    .filter(
                      (tag) =>
                        !(newJob?.tags || []).includes(tag) ||
                        tag === (newJob?.tags || [])[0]
                    )
                    .map((tag) => ({
                      value: tag,
                      text: tag,
                    }))}
                  value={(newJob?.tags || [])[0] ?? ''}
                  onChange={handleClickTagInMobile(0)}
                />
              </Stack>
              <Stack flex={0.33} mr={1} mt={1}>
                <AppDropdown
                  selectablePlaceholder
                  placeholder="-- Select --"
                  options={(tags || [])
                    .filter(
                      (tag) =>
                        !(newJob?.tags || []).includes(tag) ||
                        tag === (newJob?.tags || [])[1]
                    )
                    .map((tag) => ({
                      value: tag,
                      text: tag,
                    }))}
                  value={(newJob?.tags || [])[1] ?? ''}
                  onChange={handleClickTagInMobile(1)}
                />
              </Stack>
              <Stack flex={0.33} mt={1}>
                <AppDropdown
                  selectablePlaceholder
                  placeholder="-- Select --"
                  options={(tags || [])
                    .filter(
                      (tag) =>
                        !(newJob?.tags || []).includes(tag) ||
                        tag === (newJob?.tags || [])[2]
                    )
                    .map((tag) => ({
                      value: tag,
                      text: tag,
                    }))}
                  value={(newJob?.tags || [])[2] ?? ''}
                  onChange={handleClickTagInMobile(2)}
                />
              </Stack>
            </Stack>
          </Box>
          <Box id="salary" mt="20px">
            <Box
              mb="11px"
              display="flex"
              alignItems="center"
              fontSize={{ xs: 13, md: 18 }}
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
                  <CustomFormHelperText>
                    <img src={InfoIcon.src} />
                    This field must be greater than minimum salary.
                  </CustomFormHelperText>
                )}
              </Box>
            </Box>
          </Box>
          <Box
            id="applyby"
            mt={errors.salary?.max ? { xs: '74px', md: '44px' } : '20px'}
          >
            <AppRadioGroup
              label="How to apply"
              row
              options={[
                {
                  text: 'Apply by email',
                  value: 'email',
                },
                {
                  text: 'Apply by website',
                  value: 'website',
                },
              ]}
              value={newJob?.applyBy}
              onChange={handleChangeNewJob('applyBy')}
            />
            <Box mt={{ xs: 2, md: 3 }} position="relative">
              <AppTextField
                placeholder={
                  newJob?.applyBy === 'website'
                    ? 'e.g. https://company.com'
                    : 'e.g. apply@company.com'
                }
                value={newJob?.applyByUrl}
                onChange={handleChangeNewJob('applyByUrl')}
                error={errors.applyByUrl || errors.applyBy}
              />
              {(errors.applyByUrl || errors.applyBy) && <ErrorMessage />}
            </Box>
          </Box>
          <Box
            id="invoiceAddress"
            mt={errors.applyByUrl || errors.applyBy ? '44px' : '20px'}
            position="relative"
          >
            <AppTextField
              label="Invoice Address:"
              placeholder="Company’s full name, full address and VAT number...."
              value={newJob?.invoiceAddress}
              onChange={handleChangeNewJob('invoiceAddress')}
              error={errors.invoiceAddress}
            />
            {errors.invoiceAddress && <ErrorMessage />}
          </Box>
          <Box mt={errors.invoiceAddress ? '44px' : '20px'} position="relative">
            <FilePicker
              label="Add a logo:"
              file={logo}
              onChangeFile={setLogo}
              onDeleteFile={handleDeleteFile}
            />
          </Box>
          <Box mt="20px" position="relative">
            <AppRadioGroup
              label={
                <SecondaryLabel
                  label="Stick post on top for:"
                  btnText="Compare"
                  handleCheck={() => handleCheckOrCompare(1)}
                />
              }
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
                      value: '',
                    }
              )}
              value={newJob?.sticky}
              onChange={handleChangeNewJob('sticky')}
            />
          </Box>
          <Box mt="20px" position="relative">
            <AppRadioGroup
              label={
                <SecondaryLabel
                  label="Highlight your post with colors:"
                  btnText="Compare"
                  handleCheck={() => handleCheckOrCompare(2)}
                />
              }
              options={hightlightColorOptions.map((option: THightlightColor) =>
                option.color
                  ? option.color === 'standard'
                    ? {
                        text: (
                          <OptionWithTag
                            title={option.text}
                            price={option.price}
                            ratio={matchDownMd ? 0 : option.views}
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
                              hiddenColor={newJob?.highlightColor !== 'custom'}
                            />
                            <CheckButton
                              onClick={() => handleCheckOrCompare(3)}
                            >
                              Check
                              <ArrowRightIcon color="#fff" />
                            </CheckButton>
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
          {/* <Box mt="20px">
            <AppCheckbox
              label={
                <SecondaryLabel
                  label="Send the job offer with mail:"
                  btnText="Compare"
                  handleCheck={handleCheckNewsLetter}
                />
              }
              options={[
                {
                  text: (
                    <OptionWithTag
                      title={'Newsletter Boost'}
                      price={89}
                      ratio={2}
                    />
                  ),
                  value: 'newsletter',
                },
              ]}
              value={newJob?.newsletterBoost ? 'newsletter' : ''}
              onChange={handleChangeNewletter}
            />
          </Box> */}
          {/* <Box mt="20px">
            <AppCheckbox
              label="Free Coupon:"
              options={[
                {
                  text: (
                    <UseCouponContainer>
                      <span>Use Coupon</span>
                      <Box
                        className="coupons"
                        display="flex"
                        alignItems="center"
                      >
                        <span>{leftCoupon} left</span>
                        <CouponIcon />
                      </Box>
                    </UseCouponContainer>
                  ),
                  value: 'useCoupon',
                },
              ]}
              value={newJob?.useCoupon ? 'useCoupon' : ''}
              onChange={handleChangeUseCoupon}
            />
          </Box> */}
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            mt={{ xs: '42px', md: '95px' }}
          >
            <PostButton
              onClick={() => handlePostNewJob(false)}
              disabled={loading || internalLoading}
            >
              {loading || internalLoading ? (
                <CircularProgress thickness={5} />
              ) : (
                <Box>
                  Post a Job{' '}
                  <strong>{price.total ? ` $${price.total}` : ''}</strong>
                </Box>
              )}
            </PostButton>
            <Box mt="34px">
              <DraftLink onClick={() => handlePostNewJob(true)}>
                Save as draft
              </DraftLink>
            </Box>
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
      <StickyPostCompareModal
        open={openStickyPostCompare}
        job={checkJob}
        isHiddenMask={isHiddenMask}
        logo={logo}
        onClose={() => {
          setOpenStickyPostCompare(false);
          setIsHiddenMask(false);
        }}
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
        newJob={{
          file: logo,
          newJob: { ...newJob, price: price.total, priceInfo: price },
          isDraft,
          userId: account?.toLowerCase(),
        }}
        onClose={() => setOpenSuccessPaidJobPost(false)}
        onInitialize={() => initalize()}
      />
      <FreePostJobSuccess
        open={openSuccessFreeJobPost}
        jobId={newJobId}
        onClose={() => setOpenSuccessFreeJobPost(false)}
        onBackToHomePage={() => {
          setOpenSuccessFreeJobPost(false);
          if(typeof window !== undefined) {

            window.scrollTo({
              top: 0,
              behavior: 'auto',
            });
          }
          router.push('/');
        }}
        onViewInManageJobs={() => {
          setOpenSuccessFreeJobPost(false);
          if(typeof window !== undefined ) {
            window.scrollTo({
              top: 0,
              behavior: 'auto',
            });
          }
          router.push('/manage-jobs');
        }}
      />
      <DraftPostJobSuccess
        open={openSuccessDraftJobPost}
        onClose={() => setOpenSuccessDraftJobPost(false)}
        onViewDashboard={() => {
          setOpenSuccessDraftJobPost(false);
          if(typeof window !== undefined ) {

            window.scrollTo({
              top: 0,
              behavior: 'auto',
            });
          }
          router.push('/dashboard');
        }}
        onBack={() => {
          setOpenSuccessDraftJobPost(false);
          if(typeof window !== undefined) {

            window.scrollTo({
              top: 0,
              behavior: 'auto',
            });
          }
          router.push('/');
        }}
      />
      <div id="pdf"></div>
    </Box>
    </>
  );
};

export default PostJobPage;
