import { createSlice } from '@reduxjs/toolkit';
import { getPasswordsFromFirebase, setPasswords } from 'reduxStore/slices/passwordSlice';
import { setUserData, unsetUserData } from 'reduxStore/slices/userSlice';
import { getSocialMediaListFromFirebase } from 'reduxStore/slices/socialMediaSlice';

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
      }))
      .addCase(getSocialMediaListFromFirebase, (state) => ({
        ...state,
        isRequest: true,
      }))
      .addCase(setUserData, (state) => ({
        ...state,
        isRequest: true,
      }))
      .addCase(unsetUserData, (state) => ({
        ...state,
        isRequest: false,
      }));
  },
});

export const { setIsRequest, unsetIsRequest } = applicationStatusSlice.actions;

export const selectRequest = (state: { applicationStatus: { isRequest: boolean } }) =>
  state.applicationStatus.isRequest;
