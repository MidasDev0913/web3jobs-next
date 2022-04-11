import { createSlice } from '@reduxjs/toolkit';
import { TCommonState } from '../../interfaces';

const initialState: TCommonState = {
  tags: [],
  filterSettings: {},
  suggestions: [],
};

const commonSlice = createSlice({
  name: 'common',
  initialState,
  reducers: {
    getTags(state: TCommonState) {},
    setTags(state: TCommonState, action: any) {
      state.tags = action.payload;
    },
    setFilterSettings(state: TCommonState, action: any) {
      state.filterSettings = action.payload;
    },
    setSearchSuggestions(state: TCommonState, action: any) {
      state.suggestions = action.payload;
    },
  },
});

export const { setTags, getTags, setFilterSettings, setSearchSuggestions } =
  commonSlice.actions;

export const commonReducer = commonSlice.reducer;
