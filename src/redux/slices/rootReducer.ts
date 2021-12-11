import { combineReducers } from '@reduxjs/toolkit';

import { userSlice } from './userSlice';
import { passwordSlice } from './passwordSlice';
import { configuratorSlice } from 'reduxStore/slices/configuratorSlice';

const createRootReducer = () =>
  combineReducers({
    user: userSlice.reducer,
    password: passwordSlice.reducer,
    configurator: configuratorSlice.reducer,
  });

export default createRootReducer;
