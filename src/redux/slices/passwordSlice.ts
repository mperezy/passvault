import { createSlice } from '@reduxjs/toolkit';

export const initialState: {
  password: string;
  length: number;
  isCreateMode: boolean;
  isEditMode: boolean;
  passwords: any;
} = {
  password: '',
  length: 6,
  isCreateMode: false,
  isEditMode: false,
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
    setIsCreateMode: (state, { payload }) => ({
      ...state,
      isCreateMode: payload.isCreateMode,
    }),
    setIsEditMode: (state, { payload }) => ({
      ...state,
      isEditMode: payload.isEditMode,
    }),
    setPasswords: (state, { payload }) => ({
      ...state,
      passwords: payload.passwords,
    }),
    unsetPasswords: () => ({ ...initialState }),
    generatePassword: () => {},
    getPasswordsFromFirebase: () => {},
    savePassword2Firebase: (state, { payload }) => {},
    deletePasswordFromFirebase: () => {},
  },
});

export const {
  setPassword,
  setLength,
  setIsCreateMode,
  setIsEditMode,
  setPasswords,
  unsetPasswords,
  generatePassword,
  getPasswordsFromFirebase,
  savePassword2Firebase,
  deletePasswordFromFirebase,
} = passwordSlice.actions;

export const selectPassword = (state: { password: { password: any } }) => state.password.password;
export const selectIsCreateMode = (state: { password: { isCreateMode: boolean } }) =>
  state.password.isCreateMode;
export const selectIsEditMode = (state: { password: { isEditMode: boolean } }) =>
  state.password.isEditMode;
export const selectPasswordLength = (state: { password: string | any[] }) => state.password.length;
export const selectPasswords = (state: { password: { passwords: any } }) =>
  state.password.passwords;
