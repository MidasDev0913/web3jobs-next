import { takeLatest } from 'redux-saga/effects';
import { getTags } from './reducers/commonReducer';
import {
  postNewJob,
  getJobs,
  getOneJob,
  setFavorite,
  getJobCountOfCities,
  viewJob,
  editJob,
} from './reducers/jobReducer';
import { getOrganizations, getCompanies } from './reducers/organizationReducer';
import { login, loginWithToken, getViewedJobs } from './reducers/authReducer';

import { getFilterTags } from './actions/commonAction';
import {
  handlePostNewJob,
  getAllJobs,
  getJobById,
  handleSetFavorite,
  getJobCountByCity,
  handleViewJob,
  handleEditJob,
} from './actions/jobAction';
import {
  getAllOrganizations,
  getAllCompanies,
} from './actions/organizationAction';
import {
  handleConnectWallet,
  handleGetViewedJobs,
  handleLoginWithToken,
} from './actions/authAction';

export function* watcherSaga() {
  // auth
  yield takeLatest(login.type, handleConnectWallet);
  yield takeLatest(loginWithToken.type, handleLoginWithToken);
  yield takeLatest(getViewedJobs.type, handleGetViewedJobs);

  // common
  yield takeLatest(getTags.type, getFilterTags);

  // organization
  yield takeLatest(getOrganizations.type, getAllOrganizations);
  yield takeLatest(getCompanies.type, getAllCompanies);

  // job
  yield takeLatest(getJobs.type, getAllJobs);
  yield takeLatest(getOneJob.type, getJobById);
  yield takeLatest(postNewJob.type, handlePostNewJob);
  yield takeLatest(setFavorite.type, handleSetFavorite);
  yield takeLatest(getJobCountOfCities.type, getJobCountByCity);
  yield takeLatest(viewJob.type, handleViewJob);
  yield takeLatest(editJob.type, handleEditJob);
}
