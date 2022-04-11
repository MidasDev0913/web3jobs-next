import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  Modal,
  Box,
  styled,
  Button,
  IconButton,
  Autocomplete,
  TextField,
  InputAdornment,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { countries } from 'countries-list';

import { RootState } from '../../redux/store';
import { AppTextField } from '../TextField';
import { ErrorMessage } from '../ErrorMessage';
import { AppToggle } from '../ToggleButton';
import SmallCloseIcon from '../SVGIcons/CloseIcon';
import PlusIcon from '../SVGIcons/PlusIcon';
import SearchIcon from '../../assets/icons/search_icon.svg';
import { AppDropdown } from '../Dropdown';
import { TNewsLetterDuration } from '../../utils/constants';

type NewsletterConfirmModalProps = {
  open: boolean;
  onClose: () => void;
  onConfirm: (
    duration: TNewsLetterDuration,
    email: string,
    country: string,
    isRemote: boolean,
    tags: string[]
  ) => void;
  tags: string[];
};
const ConfirmButton = styled(Button)({
  display: 'flex',
  alignItems: 'center',
  margin: 'auto',
  marginTop: 19,
  borderRadius: 5,
  fontWeight: 500,
  fontSize: '18px',
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
  width: 467,
  background: '#05050D',
  borderRadius: 10,
  border: '1px solid #B50000',

  '& .MuiOutlinedInput-input': {
    padding: '10.5px 14px',
  },

  '& .MuiAutocomplete-root': {
    width: '100%',
    '& .MuiOutlinedInput-root': {
      '& input': {
        border: 'none',
        padding: '10.5px 14px',
      },
      '& .MuiInputAdornment-root': {
        position: 'absolute',
        left: 21,
      },
    },
  },

  '& .title': {
    fontWeight: 500,
    fontSize: '18px',
    lineHeight: '22px',
    color: '#fff',
  },
  '& .modal-header': {
    backgroundColor: '#131322',
    padding: '13px 30px 13px 24px',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  '& .modal-body': {
    padding: 24,
  },
  '& .tag-box': {
    position: 'relative',
    padding: '7px 28px 7px 7px',
    background: '#B50000',
    borderRadius: 5,
    marginRight: 7,
    marginBottom: 7,
    width: 'fit-content',
    display: 'flex',
    alignItems: 'center',
    fontSize: 15,
    lineHeight: '150%',
    fontWeight: 500,

    '& .MuiIconButton-root': {
      position: 'absolute',
      right: 6,
      background: 'rgba(11, 0, 0, 0.25)',
      padding: 4,
      width: 14,
      height: 14,
      top: 12,
    },
  },
  '& .interest': {
    '& .MuiSelect-select': {
      padding: '6px 32px 6px 6px',
      fontSize: 15,
      border: '1px solid #B50000',
    },
  },
  '& .add-tag': {
    display: 'flex',
    alignItems: 'center',
    marginBottom: 7,
    '& .MuiSelect-select': {
      borderRadius: '5px !important',
    },
    '& span': {
      marginLeft: 7,
      fontSize: 12,
      lineHeight: '150%',
      whiteSpace: 'nowrap',
    },
  },
});

const PlusButton = styled(Button)({
  width: 30,
  minWidth: 30,
  height: 30,
  borderRadius: 30,
  padding: 0,
  marginLeft: 7,

  '&:hover': {
    '& *': {
      fill: '#000',
    },
  },
});

const NewsletterConfirm = ({
  open,
  onClose,
  onConfirm,
  tags,
}: NewsletterConfirmModalProps) => {
  const { tags: storeTags } = useSelector((state: RootState) => state.common);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState<string>();
  const [isRemote, setIsRemote] = useState<boolean>(false);
  const [country, setCountry] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [error, setError] = useState<boolean>(false);
  const [duration, setDuration] = useState<TNewsLetterDuration>('daily');

  useEffect(() => {
    if (!open) {
      setError(false);
      setEmail('');
      setCountry('');
      setIsRemote(false);
      setNewTag('');
      setSelectedTags([]);
    } else {
      if (tags) {
        setSelectedTags(tags);
      }
    }
  }, [open]);

  const handleConfirm = () => {
    if (!email) {
      setError(true);
      return;
    }
    onConfirm(duration, email, country, isRemote, selectedTags);
  };

  const handleChangeCountry = (
    e: React.SyntheticEvent<Element, Event>,
    value: string | null
  ) => {
    setCountry(value as string);
  };

  const handleChangeRemote = (arg: boolean) => {
    setIsRemote(arg);
  };

  const handleRemove = (tag: string) => {
    const updatedTags = [...selectedTags];
    const index = updatedTags.findIndex((t) => t === tag);
    updatedTags.splice(index, 1);

    setSelectedTags(updatedTags);
  };

  const handleAdd = () => {
    if (!newTag) return;
    const updatedTags = [...selectedTags];
    updatedTags.push(newTag);

    setSelectedTags(updatedTags);
    setNewTag(undefined);
  };

  const countryOptionList = Object.values(countries).map((c) => c.name);
  const interestTagOptions = storeTags.filter((t) => !selectedTags.includes(t));

  return (
    <Modal open={open} onClose={onClose}>
      <ContainerBox>
        <Box className="modal-header">
          <span className="title">Confirmation</span>
          <CloseButton aria-label="delete" size="small" onClick={onClose}>
            <CloseIcon fontSize="small" />
          </CloseButton>
        </Box>
        <Box className="modal-body">
          <Box>
            <AppDropdown
              value={duration}
              label="Duration:"
              options={[
                { value: 'daily', text: 'Daily' },
                { value: 'weekly', text: 'Weekly' },
                { value: 'monthly', text: 'Monthly' },
              ]}
              onChange={(v) => setDuration(v as TNewsLetterDuration)}
            />
          </Box>
          <Box mt="23px" className="interest">
            <Box fontSize="16px" fontWeight={500} color="#fff" mb="11px">
              Interests:
            </Box>
            <Box display="flex" flexWrap="wrap">
              {selectedTags.map((tag) => (
                <Box className="tag-box" key={tag}>
                  {tag}
                  <IconButton
                    aria-label="delete"
                    size="small"
                    onClick={() => handleRemove(tag)}
                  >
                    <SmallCloseIcon />
                  </IconButton>
                </Box>
              ))}
              <Box className="add-tag">
                {selectedTags.length >= 5 ? null : (
                  <>
                    <AppDropdown
                      placeholder="Select"
                      options={interestTagOptions.map((tag) => ({
                        value: tag,
                        text: tag,
                      }))}
                      value={newTag}
                      onChange={setNewTag}
                    />
                    <PlusButton onClick={() => handleAdd()}>
                      <PlusIcon />
                    </PlusButton>
                    <span>(Max: 5)</span>
                  </>
                )}
              </Box>
            </Box>
          </Box>
          <Box mt="23px">
            <Box fontSize="16px" fontWeight={500} color="#fff" mb="11px">
              Location:
            </Box>
            <Box display="flex" alignItems="center" width="100%">
              <Autocomplete
                value={country}
                onChange={handleChangeCountry}
                options={countryOptionList}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    inputProps={{
                      ...params.inputProps,
                      startAdornment: (
                        <InputAdornment position="start">
                          <img src={SearchIcon} width="17px" height="17px" />
                        </InputAdornment>
                      ),
                      placeholder: 'country',
                      autoComplete: 'new-password', // disable autocomplete and autofill
                    }}
                  />
                )}
              />
              <AppToggle
                value={isRemote}
                onChange={handleChangeRemote}
                label="Remote"
              />
            </Box>
          </Box>
          <Box mt="23px">
            <AppTextField
              value={email}
              label="Email:"
              placeholder="mail@gmail.com"
              onChange={setEmail}
              error={error}
            />
            {error && <ErrorMessage />}
          </Box>
          <ConfirmButton onClick={handleConfirm}>
            <Box ml={2}>Subscribe Newsletter</Box>
          </ConfirmButton>
        </Box>
      </ContainerBox>
    </Modal>
  );
};

export default NewsletterConfirm;
