import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
  isRequest: false,
};

export const applicationStatusSlice = createSlice({
  name: 'applicationStatus',
  initialState,
  reducers: {
    setIsRequest: (state, { payload }) => ({
      ...state,
      isRequest: payload.isRequest,
    }),
    unsetIsRequest: () => ({
      ...initialState,
    }),
  },
});

export const { setIsRequest, unsetIsRequest } = applicationStatusSlice.actions;

export const selectRequest = (state: { applicationStatus: { isRequest: boolean } }) =>
  state.applicationStatus.isRequest;
