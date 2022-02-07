import { createSlice } from '@reduxjs/toolkit';

interface PasswordI {
  id: string;
  passwordGenerated: string;
  socialMedia: string;
  description: string;
  createdAt: number;
}

export const initialState: {
  password: string;
  passwordIdPicked: string;
  passwordPicked: string;
  passwordDescriptionPicked: string;
  length: number;
  isCreateMode: boolean;
  isEditMode: boolean;
  isDeleteMode: boolean;
  passwords: Array<PasswordI>;
} = {
  password: '',
  passwordIdPicked: '',
  passwordPicked: '',
  passwordDescriptionPicked: '',
  length: 6,
  isCreateMode: false,
  isEditMode: false,
  isDeleteMode: false,
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
  isDeleteMode: false,
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
    resetPasswordPicked: (state) => ({
      ...state,
      passwordPicked: '',
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
    setIsDeleteMode: (state, { payload }) => ({
      ...state,
      isDeleteMode: payload.isDeleteMode,
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
    deletePasswordFromFirebase: () => {},
    editPasswordFromFirebase: () => {},
  },
});

export const {
  setPassword,
  setPasswordPicked,
  setPasswordIdPicked,
  resetPasswordPicked,
  setPasswordDescriptionPicked,
  setLength,
  setIsCreateMode,
  setIsEditMode,
  setIsDeleteMode,
  setPasswords,
  resetPasswordGeneratorState,
  unsetPasswords,
  generatePassword,
  getPasswordsFromFirebase,
  savePassword2Firebase,
  deletePasswordFromFirebase,
  editPasswordFromFirebase,
} = passwordSlice.actions;

export const selectPassword = (state: { password: { password: string } }) =>
  state.password.password;
export const selectPasswordIdPicked = (state: { password: { passwordIdPicked: string } }) =>
  state.password.passwordIdPicked;
export const selectPasswordPicked = (state: { password: { passwordPicked: string } }) =>
  state.password.passwordPicked;
export const selectPasswordDescriptionPicked = (state: {
  password: { passwordDescriptionPicked: string };
}) => state.password.passwordDescriptionPicked;
export const selectIsCreateMode = (state: { password: { isCreateMode: boolean } }) =>
  state.password.isCreateMode;
export const selectIsEditMode = (state: { password: { isEditMode: boolean } }) =>
  state.password.isEditMode;
export const selectIsDeleteMode = (state: { password: { isDeleteMode: boolean } }) =>
  state.password.isDeleteMode;
export const selectPasswordLength = (state: { password: { length: number } }) =>
  state.password.length;
export const selectPasswords = (state: { password: { passwords: Array<PasswordI> } }) =>
  state.password.passwords;
