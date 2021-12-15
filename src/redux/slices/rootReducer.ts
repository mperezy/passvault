import { combineReducers } from '@reduxjs/toolkit';

import { userSlice } from './userSlice';
import { passwordSlice } from './passwordSlice';
import { configuratorSlice } from 'reduxStore/slices/configuratorSlice';
import { applicationStatusSlice } from 'reduxStore/slices/applicationStatusSlice';

const createRootReducer = () =>
  combineReducers({
    user: userSlice.reducer,
    password: passwordSlice.reducer,
    configurator: configuratorSlice.reducer,
    applicationStatus: applicationStatusSlice.reducer,
  });

export default createRootReducer;
