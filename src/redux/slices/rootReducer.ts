import { combineReducers } from '@reduxjs/toolkit';

import { userSlice } from './userSlice';
import { passwordSlice } from './passwordSlice';
import { configuratorSlice } from 'reduxStore/slices/configuratorSlice';
import { applicationStatusSlice } from 'reduxStore/slices/applicationStatusSlice';
import { socialMediaSlice } from 'reduxStore/slices/socialMediaSlice';
import { uiElementsSlice } from 'reduxStore/slices/uiElementsSlice';

const createRootReducer = () =>
  combineReducers({
    user: userSlice.reducer,
    password: passwordSlice.reducer,
    configurator: configuratorSlice.reducer,
    applicationStatus: applicationStatusSlice.reducer,
    socialMedia: socialMediaSlice.reducer,
    uiElements: uiElementsSlice.reducer,
  });

export default createRootReducer;
