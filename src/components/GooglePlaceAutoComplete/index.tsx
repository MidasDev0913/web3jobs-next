import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import parse from 'autosuggest-highlight/parse';
import throttle from 'lodash/throttle';

import { TLocation } from '../../interfaces';
import { Container } from './index.styles';

const autocompleteService: any = { current: null };

type AutocompletePrediction = google.maps.places.AutocompletePrediction;
type GeocoderResult = google.maps.GeocoderResult;

interface MainTextMatchedSubstrings {
  offset: number;
  length: number;
}
interface StructuredFormatting {
  main_text: string;
  secondary_text: string;
  main_text_matched_substrings: readonly MainTextMatchedSubstrings[];
}
interface PlaceType {
  place_id: string;
  description: string;
  structured_formatting: StructuredFormatting;
}

interface Props {
  value: TLocation;
  placeholder: string;
  onChange: (arg: TLocation | undefined) => void;
}

export default function GooglePlaceAutoComplete({
  value,
  placeholder,
  onChange,
}: Props) {
  const [val, setValue] = React.useState<PlaceType | null>(null);
  const [inputValue, setInputValue] = React.useState('');
  const [options, setOptions] = React.useState<readonly PlaceType[]>([]);

  const fetch = React.useMemo(
    () =>
      throttle(
        (request: any, callback: (results?: readonly PlaceType[]) => void) => {
          (autocompleteService.current as any).getPlacePredictions(
            request,
            callback
          );
        },
        200
      ),
    []
  );

  React.useEffect(() => {
    if (value) {
      setValue({
        description: `${value.city}, ${value.country}` ?? '',
      } as AutocompletePrediction);
    } else {
      setValue(null);
    }
  }, [value]);

  React.useEffect(() => {
    let active = true;

    if (!autocompleteService.current && (window as any).google) {
      autocompleteService.current = new (
        window as any
      ).google.maps.places.AutocompleteService();
    }
    if (!autocompleteService.current) {
      return undefined;
    }

    if (inputValue === '') {
      setOptions(val ? [val] : []);
      return undefined;
    }

    fetch(
      { input: inputValue, types: ['(cities)'] },
      (results?: readonly PlaceType[]) => {
        if (active) {
          let newOptions: readonly PlaceType[] = [];

          if (val) {
            newOptions = [val];
          }

          if (results) {
            newOptions = [...newOptions, ...results];
          }

          setOptions(newOptions);
        }
      }
    );

    return () => {
      active = false;
    };
  }, [val, inputValue, fetch]);

  return (
    <Container>
      <Autocomplete
        sx={{ width: 300 }}
        getOptionLabel={(option) =>
          typeof option === 'string' ? option : option.description
        }
        filterOptions={(x) => x}
        options={options}
        autoComplete
        includeInputInList
        filterSelectedOptions
        value={val}
        onChange={(event: any, newValue: PlaceType | null) => {
          setOptions(newValue ? [newValue, ...options] : options);
          setValue(newValue);
          if (newValue?.structured_formatting.main_text) {
            onChange({
              placeId: newValue?.place_id,
              city: newValue?.structured_formatting.main_text as string,
              country:
                (newValue?.structured_formatting.secondary_text || '')
                  .split(', ')
                  .pop() || '',
            });
          } else {
            onChange(undefined);
          }
        }}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            InputLabelProps={{
              shrink: false,
            }}
            InputProps={{
              ...params.InputProps,
              placeholder,
            }}
            fullWidth
          />
        )}
        renderOption={(props, option) => {
          const matches =
            option.structured_formatting?.main_text_matched_substrings || [];
          const parts = parse(
            option.structured_formatting?.main_text,
            matches.map((match: any) => [
              match.offset,
              match.offset + match.length,
            ])
          );

          return (
            <li {...props}>
              <Grid container alignItems="center">
                <Grid item>
                  <Box
                    component={LocationOnIcon}
                    sx={{ color: 'text.secondary', mr: 2 }}
                  />
                </Grid>
                <Grid item xs>
                  {parts.map((part, index) => (
                    <span
                      key={index}
                      style={{
                        fontWeight: part.highlight ? 700 : 400,
                      }}
                    >
                      {part.text}
                    </span>
                  ))}
                  <Typography variant="body2">
                    {option.structured_formatting?.secondary_text}
                  </Typography>
                </Grid>
              </Grid>
            </li>
          );
        }}
      />
    </Container>
  );
}
