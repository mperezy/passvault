import { combineReducers } from '@reduxjs/toolkit';

import { userSlice } from './userSlice';
import { passwordSlice } from './passwordSlice';

const createRootReducer = () =>
  combineReducers({
    user: userSlice.reducer,
    password: passwordSlice.reducer,
  });

export default createRootReducer;
