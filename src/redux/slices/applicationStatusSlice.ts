import { createSlice } from '@reduxjs/toolkit';
import { getPasswordsFromFirebase, setPasswords } from 'reduxStore/slices/passwordSlice';

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
  extraReducers: (builder) => {
    builder.addCase(getPasswordsFromFirebase, (state, { payload }) => ({
      ...state,
      isRequest: true,
    })),
      builder.addCase(setPasswords, (state, { payload }) => ({
        ...state,
        isRequest: false,
      }));
  },
});

export const { setIsRequest, unsetIsRequest } = applicationStatusSlice.actions;

export const selectRequest = (state: { applicationStatus: { isRequest: boolean } }) =>
  state.applicationStatus.isRequest;
