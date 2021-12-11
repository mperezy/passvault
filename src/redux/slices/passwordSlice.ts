import { createSlice } from '@reduxjs/toolkit';

export const initialState: {
  password: string;
  length: number;
  passwords: any;
} = {
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
    generatePassword: () => {},
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
  generatePassword,
  getPasswordsFromFirebase,
  setPassword2Firebase,
  deletePasswordFromFirebase,
} = passwordSlice.actions;

export const selectPassword = (state: { password: { password: any } }) => state.password.password;
export const selectPasswordLength = (state: { password: string | any[] }) => state.password.length;
export const selectPasswords = (state: { password: { passwords: any } }) =>
  state.password.passwords;
