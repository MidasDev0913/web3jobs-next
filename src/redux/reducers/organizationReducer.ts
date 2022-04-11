import { createSlice } from '@reduxjs/toolkit';
import { TOrganizationState } from '../../interfaces';

const initialState: TOrganizationState = {
  organizations: [],
  companies: [],
};

const organizationSlice = createSlice({
  name: 'organization',
  initialState,
  reducers: {
    getOrganizations(state: TOrganizationState, action: any) {},
    setOrganizations(state: TOrganizationState, action: any) {
      state.organizations = action.payload;
    },
    getCompanies(state: TOrganizationState, action: any) {},
    setComapnies(state: TOrganizationState, action: any) {
      state.companies = action.payload;
    },
  },
});

export const {
  setOrganizations,
  getOrganizations,
  getCompanies,
  setComapnies,
} = organizationSlice.actions;

export const organizationReducer = organizationSlice.reducer;
