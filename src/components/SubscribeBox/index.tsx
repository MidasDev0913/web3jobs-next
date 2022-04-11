import React, { useState } from 'react';
import {
  Box,
  Autocomplete,
  TextField,
  InputAdornment,
  IconButton,
} from '@mui/material';
import { useSelector } from 'react-redux';
import { countries } from 'countries-list';

import { SubscribeContainer, PlusButton } from './index.styles';
import { SubscribeInput } from './Input';
import { AppDropdown } from '../Dropdown';
import { RootState } from '../../redux/store';
import { AppToggle } from '../ToggleButton';
import { TNewsLetterDuration } from '../../utils/constants';
import SmallCloseIcon from '../SVGIcons/CloseIcon';
import PlusIcon from '../SVGIcons/PlusIcon';
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '../../assets/icons/search_icon.svg';
import NewsletterPhonesSVG from '../../assets/images/newsletter-phones.svg';

interface SubscribeBoxProps {
  onSubscribe: (
    duration: TNewsLetterDuration,
    email: string,
    country: string,
    isRemote: boolean,
    tags: string[]
  ) => void;
}

const SubscribeBox = ({ onSubscribe }: SubscribeBoxProps) => {
  const { tags: storeTags } = useSelector((state: RootState) => state.common);
  const [duration, setDuration] = useState<TNewsLetterDuration>('daily');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [country, setCountry] = useState<string>('');
  const [isRemote, setIsRemote] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [newTag, setNewTag] = useState<string>();

  const countryOptionList = Object.values(countries).map((c) => c.name);
  const interestTagOptions = storeTags.filter((t) => !selectedTags.includes(t));

  const handleChangeCountry = (
    e: React.SyntheticEvent<Element, Event>,
    value: string | null
  ) => {
    setCountry(value as string);
  };

  const handleChangeRemote = (arg: boolean) => {
    setIsRemote(arg);
  };

  const handleAdd = () => {
    if (!newTag) return;
    const updatedTags = [...selectedTags];
    updatedTags.push(newTag);

    setSelectedTags(updatedTags);
    setNewTag(undefined);
  };

  const handleRemove = (tag: string) => {
    const updatedTags = [...selectedTags];
    const index = updatedTags.findIndex((t) => t === tag);
    updatedTags.splice(index, 1);

    setSelectedTags(updatedTags);
  };

  return (
    <SubscribeContainer>
      <Box className="main">
        <Box display="flex" alignItems="center">
          <span className="subscribe-text">A</span>
          <Box mx={2}>
            <AppDropdown
              placeholder="new tag"
              options={[
                { value: 'daily', text: 'Daily' },
                { value: 'weekly', text: 'Weekly' },
                { value: 'monthly', text: 'Monthly' },
              ]}
              value={duration}
              onChange={(v) => setDuration(v as TNewsLetterDuration)}
            />
          </Box>
          <span className="subscribe-text">newsletter of</span>
        </Box>
        <Box display="flex" flexWrap="wrap" mt="18px">
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
                <Box>
                  <AppDropdown
                    placeholder="new tag"
                    options={interestTagOptions.map((tag) => ({
                      value: tag,
                      text: tag,
                    }))}
                    value={newTag}
                    onChange={setNewTag}
                  />
                </Box>
                <PlusButton onClick={() => handleAdd()}>
                  <PlusIcon />
                </PlusButton>
                <span>(Max: 5)</span>
              </>
            )}
          </Box>
        </Box>
        <Box display="flex" alignItems="center" mt="18px">
          <span className="subscribe-text">in</span>
          <Box ml={2}>
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
          </Box>
          <AppToggle
            value={isRemote}
            onChange={handleChangeRemote}
            label="Remote"
          />
        </Box>
        <Box marginTop="55px" mb="24px">
          <SubscribeInput
            onSubscribe={(email) =>
              onSubscribe(duration, email, country, isRemote, selectedTags)
            }
          />
        </Box>
        <span>
          Join the <strong>10,000</strong> jobseekers that recieves our
          newsletter
        </span>
      </Box>
      <img src={NewsletterPhonesSVG} className="phones" />
    </SubscribeContainer>
  );
};

export default SubscribeBox;
