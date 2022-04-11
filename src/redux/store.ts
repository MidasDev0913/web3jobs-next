import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';

import { commonReducer } from './reducers/commonReducer';
import { jobReducer } from './reducers/jobReducer';
import { organizationReducer } from './reducers/organizationReducer';
import { authReducer } from './reducers/authReducer';
import { watcherSaga } from './rootsaga';

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    common: commonReducer,
    job: jobReducer,
    organization: organizationReducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware: any) => {
    return [
      ...getDefaultMiddleware({
        thunk: false,
        serializableCheck: false,
      }),
      sagaMiddleware,
    ];
  },
});

sagaMiddleware.run(watcherSaga);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
