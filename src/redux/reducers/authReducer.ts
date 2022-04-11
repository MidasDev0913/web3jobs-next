import { createSlice } from '@reduxjs/toolkit';
import { TAuthState, TUserInfo } from '../../interfaces';

const initialState: TAuthState = {
  loading: false,
  isLoggedIn: false,
  userInfo: {} as TUserInfo,
  viewedJobs: [],
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    getViewedJobs(state: TAuthState, action: any) {},
    login(state: TAuthState, action: any) {},
    loginWithToken(state: TAuthState, action: any) {},
    setLoggedIn(state: TAuthState, action: any) {
      const { isLoggedIn, userInfo, viewedJobs } = action.payload;
      state.isLoggedIn = isLoggedIn as boolean;
      state.viewedJobs = viewedJobs ?? state.viewedJobs;
      state.userInfo = userInfo || {};
    },
    setViewedJobs(state: TAuthState, action: any) {
      state.viewedJobs = action.payload;
    },
    logout(state: TAuthState) {
      state.isLoggedIn = false;
      state.userInfo = {} as TUserInfo;
      state.viewedJobs = [];
    },
  },
});

export const {
  getViewedJobs,
  login,
  loginWithToken,
  setLoggedIn,
  setViewedJobs,
  logout,
} = authSlice.actions;

export const authReducer = authSlice.reducer;
