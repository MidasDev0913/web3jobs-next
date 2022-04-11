import { createSlice } from '@reduxjs/toolkit';
import { TJobState, TJob } from '../../interfaces';

const initialState: TJobState = {
  jobs: [],
  selectedJob: {} as TJob,
  jobData: {
    totalJobsCount: 0,
    totalProjectCount: 0,
    filterJobsCount: 0,
    averagePrice: 0,
    lastId: '',
  },
  hasMore: false,
  loading: false,
  fetchLoading: false,
  jobCountOfCities: [],
};

const jobSlice = createSlice({
  name: 'job',
  initialState,
  reducers: {
    postNewJob(state: TJobState, action: any) {
      state.loading = true;
    },
    getJobs(state: TJobState, action: any) {
      state.fetchLoading = true;
    },
    setJobs(state: TJobState, action: any) {
      if (action.payload) {
        state.jobs = action.payload;
      }
      state.fetchLoading = false;
    },
    setHasMore(state: TJobState, action: any) {
      state.hasMore = action.payload as boolean;
    },
    getOneJob(state: TJobState, action: any) {
      state.loading = true;
    },
    setSelectedJob(state: TJobState, action: any) {
      if (action.payload) {
        state.selectedJob = action.payload;
      }
      state.loading = false;
    },
    addNewJob(state: TJobState, action: any) {
      if (action.payload) {
        state.jobs.push(action.payload as TJob);
      }
      state.loading = false;
    },
    setFavorite(state: TJobState, action: any) {
      state.loading = true;
    },
    setNewJob(state: TJobState, action: any) {
      const newJob = action.payload;

      const index = state.jobs.findIndex((job) => job.id === newJob.id);
      if (index === -1) {
        state.jobs.push(newJob);
      } else {
        state.jobs.splice(index, 1, newJob);
      }
      state.loading = false;
    },
    setJobData(state: TJobState, action: any) {
      state.jobData = action.payload;
    },
    getJobCountOfCities(state: TJobState) {},
    setJobInCities(state: TJobState, action: any) {
      state.jobCountOfCities = action.payload;
    },
    editJob(state: TJobState, action: any) {
      state.loading = true;
    },
    viewJob(state: TJobState, action: any) {},
  },
});

export const {
  postNewJob,
  getJobs,
  setJobs,
  addNewJob,
  setSelectedJob,
  getOneJob,
  setHasMore,
  setNewJob,
  setFavorite,
  setJobData,
  setJobInCities,
  getJobCountOfCities,
  viewJob,
  editJob,
} = jobSlice.actions;

export const jobReducer = jobSlice.reducer;
