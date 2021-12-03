import { combineReducers } from '@reduxjs/toolkit';

import { userSlice } from './userSlice';
import { passwordsSlice } from './passwordsSlice';

const createRootReducer = () =>
  combineReducers({
    user: userSlice.reducer,
    task: passwordsSlice.reducer,
  });

export default createRootReducer;
