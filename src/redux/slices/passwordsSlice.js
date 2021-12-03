import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
  passwords: [],
};

export const passwordsSlice = createSlice({
  name: 'passwords',
  initialState,
  reducers: {
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
  setPasswords,
  unsetPasswords,
  getPasswordsFromFirebase,
  setPassword2Firebase,
  deletePasswordFromFirebase,
} = passwordsSlice.actions;

export const selectPasswords = (state) => state.passwords.passwords;
