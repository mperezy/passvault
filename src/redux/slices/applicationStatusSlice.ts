import { createSlice } from '@reduxjs/toolkit';
import { getPasswordsFromFirebase, setPasswords } from 'reduxStore/slices/passwordSlice';

export const initialState = {
  isRequest: false,
};

export const applicationStatusSlice = createSlice({
  name: 'applicationStatus',
  initialState,
  reducers: {
    setIsRequest: (state) => ({
      ...state,
      isRequest: true,
    }),
    unsetIsRequest: () => ({
      ...initialState,
    }),
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPasswordsFromFirebase, (state) => ({
        ...state,
        isRequest: true,
      }))
      .addCase(setPasswords, (state) => ({
        ...state,
        isRequest: false,
      }));
  },
});

export const { setIsRequest, unsetIsRequest } = applicationStatusSlice.actions;

export const selectRequest = (state: { applicationStatus: { isRequest: boolean } }) =>
  state.applicationStatus.isRequest;
