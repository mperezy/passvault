import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
  password: '',
  length: 6,
  passwords: [],
};

export const passwordSlice = createSlice({
  name: 'password',
  initialState,
  reducers: {
    setPassword: (state, { payload }) => ({
      ...state,
      password: payload.password,
    }),
    setLength: (state, { payload }) => ({
      ...state,
      length: payload.length,
    }),
    setPasswords: (state, { payload }) => ({
      ...state,
      passwords: payload.passwords,
    }),
    unsetPasswords: () => ({ ...initialState }),
    getPasswordsFromFirebase: () => {},
    setPassword2Firebase: () => {},
    deletePasswordFromFirebase: () => {},
  },
});

export const {
  setPassword,
  setLength,
  setPasswords,
  unsetPasswords,
  getPasswordsFromFirebase,
  setPassword2Firebase,
  deletePasswordFromFirebase,
} = passwordSlice.actions;

export const selectPassword = (state) => state.password.password;
export const selectPasswordLength = (state) => state.password.length;
export const selectPasswords = (state) => state.password.passwords;
