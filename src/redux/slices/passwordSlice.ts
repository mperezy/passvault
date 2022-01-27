import { createSlice } from '@reduxjs/toolkit';

export const initialState: {
  password: string;
  passwordIdPicked: string;
  passwordPicked: string;
  passwordDescriptionPicked: string;
  length: number;
  isCreateMode: boolean;
  isEditMode: boolean;
  passwords: any;
} = {
  password: '',
  passwordIdPicked: '',
  passwordPicked: '',
  passwordDescriptionPicked: '',
  length: 6,
  isCreateMode: false,
  isEditMode: false,
  passwords: [],
};

const resetPasswordState = (state: any) => ({
  ...state,
  password: '',
  passwordIdPicked: '',
  passwordPicked: '',
  passwordDescriptionPicked: '',
  length: 6,
  isCreateMode: false,
  isEditMode: false,
});

export const passwordSlice = createSlice({
  name: 'password',
  initialState,
  reducers: {
    setPassword: (state, { payload }) => ({
      ...state,
      password: payload.password,
    }),
    setPasswordPicked: (state, { payload }) => ({
      ...state,
      passwordPicked: payload.passwordPicked,
    }),
    setPasswordIdPicked: (state, { payload }) => ({
      ...state,
      passwordIdPicked: payload.passwordIdPicked,
    }),
    setPasswordDescriptionPicked: (state, { payload }) => ({
      ...state,
      passwordDescriptionPicked: payload.passwordDescriptionPicked,
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
    resetPasswordGeneratorState: (state) => resetPasswordState(state),
    unsetPasswords: () => ({ ...initialState }),
    generatePassword: () => {},
    getPasswordsFromFirebase: () => {},
    savePassword2Firebase: (state, { payload }) => {},
    deletePasswordFromFirebase: (state, { payload }) => {},
    editPasswordFromFirebase: (state, { payload }) => {},
  },
});

export const {
  setPassword,
  setPasswordPicked,
  setPasswordIdPicked,
  setPasswordDescriptionPicked,
  setLength,
  setIsCreateMode,
  setIsEditMode,
  setPasswords,
  resetPasswordGeneratorState,
  unsetPasswords,
  generatePassword,
  getPasswordsFromFirebase,
  savePassword2Firebase,
  deletePasswordFromFirebase,
  editPasswordFromFirebase,
} = passwordSlice.actions;

export const selectPassword = (state: { password: { password: any } }) => state.password.password;
export const selectPasswordIdPicked = (state: { password: { passwordIdPicked: any } }) =>
  state.password.passwordIdPicked;
export const selectPasswordPicked = (state: { password: { passwordPicked: any } }) =>
  state.password.passwordPicked;
export const selectPasswordDescriptionPicked = (state: {
  password: { passwordDescriptionPicked: any };
}) => state.password.passwordDescriptionPicked;
export const selectIsCreateMode = (state: { password: { isCreateMode: boolean } }) =>
  state.password.isCreateMode;
export const selectIsEditMode = (state: { password: { isEditMode: boolean } }) =>
  state.password.isEditMode;
export const selectPasswordLength = (state: { password: string | any[] }) => state.password.length;
export const selectPasswords = (state: { password: { passwords: any } }) =>
  state.password.passwords;
